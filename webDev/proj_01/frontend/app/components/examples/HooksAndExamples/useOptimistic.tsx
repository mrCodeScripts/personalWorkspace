"use client";

import {
  useState,
  useEffect,
  useOptimistic,
  useCallback,
  useTransition,
  startTransition,
} from "react";

function UseOptimisticExample1() {
  const [likes, setLikes] = useState<number>(0);

  const [optimisticLikes, addOptimisticLikes] = useOptimistic<number, number>(
    likes,
    (currentLikes, newLike) => currentLikes + newLike,
  );

  // ✅ Separate server logic
  const sendLikeToServer = async (newLike: number) => {
    await new Promise((res) => setTimeout(res, 3000));
    console.log(`Server Update Likes: ${likes} ❤️`);
  };

  const reactionHandler = useCallback((props: { newLike: number }) => {
    // ✅ Optimistic update (must be in transition)
    startTransition(() => {
      addOptimisticLikes(props.newLike);
    });

    setLikes(prev => prev + props.newLike);

    // ✅ Server sync runs separately
    // sendLikeToServer(props.newLike);
  }, []);

  // fetch likes from server
  useEffect(() => {
    setLikes(1); // simulate server fetch
  }, []);

  useEffect(() => {
    sendLikeToServer(likes);
  }, [likes]);

  return (
    <>
      <div>
        <button
          type="button"
          style={{
            padding: "5px 10px",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #303030",
          }}
          onClick={() => reactionHandler({ newLike: 1 })}
        >
          {optimisticLikes}❤️
        </button>
      </div>
    </>
  );
}

function UseOptimisticExample2() {
  const [likes, setLikes] = useState<number>(0);

  const [optimisticLikes, addOptimisticLikes] = useOptimistic<number, number>(
    likes,
    (currentLikes, newLike) => currentLikes + newLike
  );

  // ✅ Server sync
  const sendLikeToServer = async (newLike: number) => {
    try {
      await new Promise((res) => setTimeout(res, 3000)); // simulate server
      setLikes((prev) => prev + newLike); // merge server-confirmed update
    } catch (error) {
      // rollback if server fails
      startTransition(() => addOptimisticLikes(-newLike));
    }
  };

  // ✅ User clicks
  const reactionHandler = (newLike: number) => {
    // optimistic update
    startTransition(() => addOptimisticLikes(newLike));

    // background server sync
    sendLikeToServer(newLike);
  };

  // fetch initial likes
  useEffect(() => {
    setLikes(1);
  }, []);

  return (
    <div>
      <button
        type="button"
        style={{
          padding: "5px 10px",
          borderRadius: "10px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #303030",
        }}
        onClick={() => reactionHandler(1)}
      >
        {optimisticLikes} ❤️
      </button>
    </div>
  );
}

// Imagine a form for updating user profile
function UseOptimisticExample3() {
  // Base state from server
  interface User {
    name?: string;
    bio?: string;
    location?: string;
  };
  const [serverProfile, setServerProfile] = useState<User>({name: "Alice", bio: "I love React", location: "Earth"});
  // const [serverProfile, setServerProfile] = useState({
  //   name: "Alice",
  //   bio: "I love React",
  //   location: "Earth",
  // });

  // Optimistic state
  const [optimisticProfile, updateProfile] = useOptimistic<User, User>(serverProfile!, (current, updates) => ({
    ...current,
    ...updates,
  }));

  // Async server update function
  const sendProfileUpdate = async (updates: typeof serverProfile) => {
    try {
      // Simulate slow server
      await new Promise((res) => setTimeout(res, 3000));

      // Merge confirmed server data
      setServerProfile((prev) => ({ ...prev!, ...updates! }));
    } catch {
      // Rollback on error
      startTransition(() => updateProfile(serverProfile!));
      alert("Failed to save profile. Changes rolled back.");
    }
  };

  // Handler for form input changes
  const handleChange = useCallback((field: keyof typeof serverProfile, value: string) => {
    // ✅ Optimistic update immediately
    startTransition(() => updateProfile({ [field]: value }));

    // ✅ Fire server update in background
    sendProfileUpdate({ [field]: value });
  }, [serverProfile]);

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>User Profile</h2>
      <label>
        Name:
        <input
          type="text"
          value={optimisticProfile.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </label>
      <br />
      <label>
        Bio:
        <input
          type="text"
          value={optimisticProfile.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          value={optimisticProfile.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </label>

      <div style={{ marginTop: "1rem", fontStyle: "italic", color: "#555" }}>
        Server state: {JSON.stringify(serverProfile)}
      </div>
    </div>
  );
}

function ExtraExample1 () {
  interface User {name: string};
  const [state, newState] = useState<string>("");
  const user: User = {name: "John Doe"};

  const handleInput = useCallback((e: React.InputEvent<HTMLInputElement>) => {
    const i: string = e.currentTarget.value;
    newState(i);
    if (i in user) 
      console.log(`Property exist in user: ${user[i as keyof User]}`);
    else
      console.log(`Property does not exist in user.`);
  }, []);

  return (
    <>
      <div>
        <input type="text" placeholder="text" value={state} onInput={(e) => handleInput(e)}/>
      </div>
    </>
  )
}

export default function UseOptimisticExamples() {
  return (
    <>
      {/* <UseOptimisticExample1 /> */}
      {/* <UseOptimisticExample2 /> */}
      {/* <UseOptimisticExample3 /> */}
      <ExtraExample1 />
    </>
  );
}
