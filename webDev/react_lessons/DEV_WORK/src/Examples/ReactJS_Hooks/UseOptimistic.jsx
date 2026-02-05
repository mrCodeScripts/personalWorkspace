import { useState, useOptimistic, useActionState, useEffect } from "react";

// Simulated server action (async)
async function postComment(prevState, formData) {

  useEffect(() => {
    // ... this part of the code will run after right during mounting and will re-run after unmounting; will only run after rendering shit or like if the dependencyToWatch changes or is set/declared via useState or just normal variable declaration
    return () => {} // will run when the user or client leave the browser or like if the component unmounts before mounting a new shit again. Most of the time I can put socket io disconnect here after the user leaves the browser for cleanup
  }, [dependencyToWatch]);

  const newComment = formData.get("comment");
  await new Promise(r => setTimeout(r, 2000)); // simulate delay
  return newComment;
}

function CommentSection() {
  const [comments, setComments] = useState(["Nice post!", "I love it!"]);

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );

  const [_, formAction, isPending] = useActionState(async (prev, formData) => {
    const comment = await postComment(prev, formData);
    setComments(prev => [...prev, comment]);
    return comment;
  }, null);

  return (
    <form
      action={async (formData) => {
        const comment = formData.get("comment");
        addOptimisticComment(comment); // instantly add to UI
        await formAction(formData);    // actually send to server
      }}
      className="flex flex-col gap-3"
    >
      <input
        name="comment"
        placeholder="Write a comment..."
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-green-500 text-white p-2 rounded"
      >
        {isPending ? "Posting..." : "Post Comment"}
      </button>

      <ul className="mt-4">
        {optimisticComments.map((c, i) => (
          <li key={i} className="p-2 border-b">{c}</li>
        ))}
      </ul>
    </form>
  );
}

// PSEUDO TYPE CODE TO SIMULATE FACEBOOK LIKES VIA useOptimistic HOOK
function LikesComponent () { 
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    // connect to socket.io for like updates
    // simulate likes fetched from server
    const likesFromServer = 1;
    setLikes(likesFromServer);
  }, []); // this will execute once at the beginning to ensure fetching of current number of likes)
  // useOptimistic returns [state, functionToUpdateOptimistically]
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, newLike) => currentLikes + newLike
  );
  async function handleLike() {
    // show optimistic update first; this will update the likes UI for the current user, does not matter if its still not like accurate number of likes on his/her UI as long as its correct and accurate on the server it can be re-rendered later on.
    addOptimisticLike(1); 
    // simulate delay (like waiting for a server)
    await new Promise(r => setTimeout(r, 2000));
    // then confirm it (actually update state)
    setLikes(prev => prev + 1);
  }
  return (
    <button
      onClick={handleLike}
      className="p-3 bg-blue-500 text-white rounded"
    >
      ❤️ Likes: {optimisticLikes}
    </button>
  );
}

export default function TryUseOptimistic () {
  return (
    <>
      {/* <CommentSection /> */}
      <LikesComponent />
    </>
  )
}

/*
🧠 useOptimistic() — React's built-in hook for "instant UI updates"

------------------------------------------------------------
🔹 PURPOSE:
------------------------------------------------------------
useOptimistic() allows you to instantly update a part of your UI
before the actual async action (like a server request) is completed.

It's used to make your app feel *fast and responsive* — giving the user
immediate feedback that their action worked, even though the server might
still be processing it in the background.

In short:
 → "Show it now, fix it later if needed."

------------------------------------------------------------
🔹 BASIC USAGE:
------------------------------------------------------------
const [optimisticValue, addOptimisticUpdate] = useOptimistic(
  initialValue,
  (currentValue, newValue) => {
    // Return the updated optimistic state here
    return currentValue + newValue;
  }
);

Example:
const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (currentLikes, newLike) => currentLikes + newLike
);

// When user clicks the like button:
addOptimisticLike(1);  // UI instantly updates (+1 like)

------------------------------------------------------------
🔹 HOW IT WORKS INTERNALLY:
------------------------------------------------------------
- `useOptimistic(initialState, updateFn)` returns two things:
    1️⃣ The current optimistic state
    2️⃣ A function to trigger optimistic updates

- When you call the update function (like addOptimisticLike(1)):
    → React runs your update function (updateFn)
    → It passes in:
        • current optimistic state → (first parameter)
        • argument you passed in   → (second parameter)
    → It calculates the "pretend" state (optimistic update)
    → UI re-renders instantly showing the new optimistic value

- Meanwhile, your async/server action still runs in the background.
- When the real data comes back (like from an API or socket),
  you update the actual source of truth (ex: useState, context, etc.),
  and React automatically reconciles the real and optimistic states.

------------------------------------------------------------
🔹 WHY IT'S USEFUL:
------------------------------------------------------------
- Makes your UI feel lightning-fast ⚡
- Perfect for actions like:
    💬 posting comments
    ❤️ liking posts
    📝 adding tasks
    🗑️ deleting items
- Avoids that annoying "waiting" lag between click → server → UI

------------------------------------------------------------
🔹 COMBINE IT WITH:
------------------------------------------------------------
✅ useState() — to hold the real, server-synced state
✅ useActionState() — to handle async form submissions or actions
✅ socket.io — to receive real-time updates from the server

------------------------------------------------------------
🔹 FACEBOOK-STYLE EXAMPLE (MENTAL MODEL):
------------------------------------------------------------
1️⃣ useOptimistic → instantly updates the like count for the user
2️⃣ Async action → sends "like" request to server
3️⃣ Server updates DB → emits "likesUpdated" event via socket.io
4️⃣ All clients (including the one who liked) receive the event
5️⃣ useState updates real "likes" count → keeps UI accurate

Even if multiple layers overlap (optimistic + server + socket),
it doesn't matter — React will always show the correct number eventually.
This layered approach guarantees the UI is:
  - Instant (optimistic layer)
  - Accurate (server truth)
  - Live (socket.io)

------------------------------------------------------------
🔹 TL;DR SUMMARY:
------------------------------------------------------------
✅ useOptimistic() = instant fake update
✅ Async function = real update (confirmation)
✅ Socket / useEffect = live server sync

Together → "Fast, Accurate, and Real-Time UI"

React built this hook because devs kept manually faking it anyway 😂
Now it’s official, built-in, and React-safe.

------------------------------------------------------------
🧩 SIMPLE EXAMPLE:
------------------------------------------------------------
const [likes, setLikes] = useState(0);
const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (cur, newLike) => cur + newLike
);

async function handleLike() {
  addOptimisticLike(1);          // instant UI feedback
  await sendLikeToServer();      // simulate async action
  setLikes(prev => prev + 1);    // confirm real data
}

return (
  <button onClick={handleLike}>
    ❤️ Likes: {optimisticLikes}
  </button>
);

------------------------------------------------------------
🚀 In short:
useOptimistic() lets you “predict” the UI outcome before the
actual confirmation — making your app feel blazing fast.

*/

