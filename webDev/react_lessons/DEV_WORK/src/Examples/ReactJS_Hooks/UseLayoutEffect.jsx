import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const WrappedComponent = forwardRef((prop, ref) => {
  return (
    <p
      ref={ref}
      className="border-2 border-green-300 bg-green-200 w-50 h-50 bg-gree-300 transition-all duration-500"
    >
      Done!
    </p>
  );
});

function UsingUseLayoutEffectForLayoutManipulation() {
  const item = useRef(null);
  useLayoutEffect(() => {
    item.current.style.transform = "translateX(10%)";
  });
  return (
    <>
      {" "}
      <WrappedComponent ref={item} />{" "}
    </>
  );
}

function UsingUseEffectForLayoutManipulation() {
  const item = useRef(null);
  useEffect(() => {
    item.current.style.transform = "translateX(10%)";
  }, []);
  return (
    <>
      <WrappedComponent ref={item} />
    </>
  );
}

function NotificationList() {
  const [messages, setMessages] = useState([]);
  const [msgPos, setNewMsgPos] = useState([]);
  const msgNotifStyle = useRef({
    padding: 10,
    height: 30,
    width: 250,
    borderWidth: 0,
    marginT: 1,
    marginB: 1,
    marginL: 0,
    marginR: 0,
  });
  const notifAdjustmentCalc =
    msgNotifStyle.current.padding * 2 +
    msgNotifStyle.current.height +
    msgNotifStyle.current.marginT +
    msgNotifStyle.current.marginB +
    msgNotifStyle.current.borderWidth;

  useEffect(() => {
    let counter = 1;
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        text: `New Notification ${counter++}`,
      };
      setMessages((prev) => [newMessage, ...prev]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const newPos = messages.map((msg, i) => {
      const el = document.getElementById(`notif-${msg.id}`);
      const elHeight = el ? el.offsetHeight : notifAdjustmentCalc;
      return { id: msg.id, yPos: i * elHeight };
    });
    setNewMsgPos(newPos);
  }, [messages]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "250px",
          margin: "50px auto",
          position: "relative",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`${i == 0 ? "animate-show-in" : "none"}`}
            style={{
              transform: `translateY(${msgPos[i]?.yPos ?? 0}px)`,
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: `${msgNotifStyle.height}px`,
              padding: `${msgNotifStyle.padding}px`,
              marginTop: `${msgNotifStyle.marginT}px`,
              marginBottom: `${msgNotifStyle.marginB}px`,
              marginLeft: `${msgNotifStyle.marginL}px`,
              marginRight: `${msgNotifStyle.marginR}px`,
              border: `${msgNotifStyle.borderWidth}px solid red`,
              backgroundColor: "lightblue",
              borderRadius: "8px",
              transition:
                "transform 0.3s cubic-bezier(0.42, 0, 1, 1), opacity 0.3s ease",
              boxSizing: "border-box",
              willChange: "transform",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </>
  );
}

export default function TryUseLayoutEffect() {
  return (
    <>
      <UsingUseEffectForLayoutManipulation />
      <UsingUseLayoutEffectForLayoutManipulation />
      <NotificationList />
    </>
  );
}

/*
function NotificationList() {
  const [messages, setMessages] = useState([]);
  const [msgPos, setMsgPos] = useState([]);
  const msgNotifStyle = {
    padding: 10,
    height: 40,
    width: 250,
    borderWidth: 0,
    marginT: 5,
    marginB: 5,
  };

  const notifAdjustmentCalc =
    msgNotifStyle.height +
    msgNotifStyle.padding * 2 +
    msgNotifStyle.marginT +
    msgNotifStyle.marginB +
    msgNotifStyle.borderWidth;

  useEffect(() => {
    let counter = 1;
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        text: `New Notification ${counter++}`,
      };
      setMessages(prev => [newMessage, ...prev]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;

    const prevPos = [...msgPos];

    const newPos = messages.map((msg, i) => {
      if (i === 0) return { id: msg.id, yPos: -notifAdjustmentCalc }; // slide-in from top
      const prevIndex = prevPos.findIndex(p => p.id === msg.id);
      return { id: msg.id, yPos: prevIndex !== -1 ? prevPos[prevIndex].yPos : i * notifAdjustmentCalc };
    });
    setMsgPos(newPos);

    requestAnimationFrame(() => {
      const finalPos = messages.map((msg, i) => ({
        id: msg.id,
        yPos: i * notifAdjustmentCalc,
      }));
      setMsgPos(finalPos);
    });
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: `${msgNotifStyle.width}px`,
        margin: "50px auto",
        position: "relative",
      }}
    >
      {messages.map((msg, i) => (
        <div
          key={msg.id}
          className={`${i == 0 ? "animate-show-in" : "none"}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${msgPos[i]?.yPos ?? 0}px)`,
            height: `${msgNotifStyle.height}px`,
            padding: `${msgNotifStyle.padding}px`,
            marginTop: `${msgNotifStyle.marginT}px`,
            marginBottom: `${msgNotifStyle.marginB}px`,
            border: `${msgNotifStyle.borderWidth}px solid red`,
            backgroundColor: "lightblue",
            borderRadius: "8px",
            transition: "transform 0.3s cubic-bezier(0.42, 0, 1, 1)",
            boxSizing: "border-box",
          }}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
*/

/*
===========================================
🧠 React Hook: useLayoutEffect()
===========================================
- The `useLayoutEffect` hook is almost identical to `useEffect`, 
  but it runs **synchronously after the DOM has been updated** 
  (i.e., after React commits all changes) and **before the browser repaints**.

- In other words:
  🔹 React renders → commits changes to the DOM → 
  🔹 `useLayoutEffect` runs (DOM is accessible here, but screen not yet painted) → 
  🔹 Browser paints the final frame.

- This allows you to:
  ✅ Read layout information (element size, position, etc.)
  ✅ Apply DOM mutations, styles, or measurements
  ✅ Prevent flickering by updating layout synchronously before the user sees it

-------------------------------------------
🚫 Difference from `useEffect`:
-------------------------------------------
- `useEffect` runs **after the browser paints** (asynchronously). 
  This means users can see the DOM in its pre-effect state for a split second 
  — great for performance, but bad for layout-critical changes.

- `useLayoutEffect` runs **before paint**, 
  which ensures the DOM is measured or styled *before* it’s visible.
  This is useful when you’re animating, measuring, or synchronizing layout.

-------------------------------------------
🧩 Syntax:
-------------------------------------------
useLayoutEffect(() => {
  // Code here runs right after the DOM is updated but before painting.
  const box = boxRef.current;
  const width = box.offsetWidth;
  box.style.transform = `translateX(${width / 2}px)`;

  return () => {
    // Cleanup runs before the next layout effect or unmount.
  };
}, [dependencies]);

-------------------------------------------
⚙️ Common Use Cases:
-------------------------------------------
- Measuring element positions/sizes before animation.
- Adjusting scroll positions after render.
- Applying CSS transforms/transitions before the screen updates.
- Synchronizing layout-based calculations (e.g., tooltips, modals).

-------------------------------------------
⚖️ useEffect vs useLayoutEffect Summary:
-------------------------------------------
| Hook              | Timing                        | Access to DOM | Typical Use               |
|-------------------|-------------------------------|----------------|----------------------------|
| useEffect         | After paint (async)           | ✅ Yes         | APIs, event listeners, async work |
| useLayoutEffect   | Before paint (sync)           | ✅ Yes         | Layout reads, style updates, measurements |

⚠️ NOTE:
- Overusing `useLayoutEffect` can block painting and cause performance issues.
- Use it *only* when you need to block paint to fix flickers or align layouts.


useLayoutEffect is powerful but blocks rendering until it finishes.
Only use it for quick DOM reads/writes needed before paint (e.g. measuring, syncing scroll).
If you use it for slow or async work (like fetching or loops), the app will lag or flash blank.
Keep heavy logic in useEffect instead.

----

🧠 Example of Overuse (BAD)
Here’s a bad example that “overuses” useLayoutEffect:

import { useLayoutEffect, useState } from "react";
export default function BadLayoutEffect() {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    // ❌ BAD: blocking layout with a long operation
    for (let i = 0; i < 1e9; i++) {} // heavy loop, blocks the UI

    // ❌ BAD: doing data fetching here instead of useEffect
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(setData);
  }, []);

  return <p>Rendering {data.length} items...</p>;
}

🧩 What happens here:
1. The loop blocks painting — you’ll stare at a white screen until it finishes.
2. The fetch call isn’t layout-related — it doesn’t need to block the browser, so it should’ve been in useEffect instead.

✅ Better Approach
import { useEffect, useLayoutEffect, useState } from "react";

export default function GoodLayoutEffect() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ✅ Fetching is async and non-blocking
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(setData);
  }, []);

  useLayoutEffect(() => {
    // ✅ Only for small DOM reads/writes
    document.body.style.background = "lightblue";
    return () => document.body.style.background = "";
  }, []);

  return <p>Rendering {data.length} items...</p>;
}

⚖️ Summary Rule-of-Thumb
| Task Type                                      | Recommended Hook                                    |
| ---------------------------------------------- | --------------------------------------------------- |
| DOM measurement or small layout tweak (no lag) | `useLayoutEffect`                                   |
| Fetching, subscriptions, or async side effects | `useEffect`                                         |
| CPU-heavy or time-consuming operations         | **Move outside React** (e.g., worker, lazy loading) |

===========================================

✅ useLayoutEffect with dependencies:
Use it when your layout or DOM measurement must stay in sync
with props or state changes that affect the visual structure.
This ensures DOM reads/writes happen before paint (no flicker).

🚫 Avoid using it for async work or non-layout side effects.
Those belong in useEffect instead.
*/

/**
 * Objectives for today:
 * 1. Shut the fuck up and work and avoid chit-chatting.
 * 2. Complete 1 full-body (core, back, arms & shoulders, legs, and calisthenics skill training) training today.
 * 3. Complete and finish leanring ReactJS Hooks.
 * 4. Complete 1 session of in-depth C++ study.
 */
