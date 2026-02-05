import { forwardRef, useRef } from "react";

const Button = forwardRef((props, ref) => {
  return (
    <button ref={ref}>
      {props.label}
    </button>
  )
});

function AccessDomFromChildComp () {
  const reference = useRef(null);

  return (
    <>
      <Button ref={reference}  label={"Click this!"} />
    </>
  )
}

const RichTextEditor = forwardRef((prop, ref) => {
  return <textarea
    className="p-2 m-2 bg-gray-200 rounded-xl border-2 border-blue-200 resize-none"
    placeholder={prop.placeholder} 
    ref={ref} 
  />
});

function ExposeInternalDOMNode () {
  const textAreaRef = useRef(null);

  const exposeTextAreaValue = () => {
    console.log("Printed: ", textAreaRef.current.value);
  };

  return (
    <>
      <div className="flex flex-col">
        <RichTextEditor placeholder={"Enter texts..."} ref={textAreaRef} />
        <button 
          className="p-2 m-2 bg-green-300 border-2 border-green-200 rounded-xl text-white font-bold"
          onClick={exposeTextAreaValue}
        >Expose Print</button>
        </div>
    </>
  ) 
}

export default function TryForwardRef () {
  return (
    <>
      {/* <AccessDomFromChildComp /> */}
      <ExposeInternalDOMNode />
    </>
  )
}

/*
-------------------------------------------------------------
🧠 COMPLETE DESCRIPTION OF forwardRef()
-------------------------------------------------------------

-------------------------------------------------------------
🔹 Purpose:
-------------------------------------------------------------
- forwardRef is a React higher-order function that allows a parent 
  component to pass a ref down to a child function component.
- Normally, refs cannot be attached to function components; they 
  only work with DOM elements or class components.
- With forwardRef, you can expose a reference to a DOM element or 
  some imperative methods to the parent.

-------------------------------------------------------------
🔹 Syntax:
-------------------------------------------------------------
const Child = forwardRef((props, ref) => {
  return <div ref={ref}>Hello</div>;
});

- `props` → normal component props
- `ref` → the ref passed from parent
- The child can now assign the ref to a DOM element or expose methods via useImperativeHandle

-------------------------------------------------------------
🔹 Basic Example:
-------------------------------------------------------------
import { forwardRef, useRef } from "react";

const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} placeholder="Type here..." />;
});

export default function App() {
  const inputRef = useRef(null);

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </>
  );
}

- Parent can now access the input DOM node directly using the ref.

-------------------------------------------------------------
🔹 Common Use Cases:
-------------------------------------------------------------
1️⃣ Access child DOM elements for focus, scroll, select, or style.
2️⃣ Pass refs to third-party libraries (GSAP, D3, Canvas, etc.).
3️⃣ Enable parent-controlled imperative actions on child components.
4️⃣ Animate elements directly via ref without triggering React re-renders.
5️⃣ Access form inputs for validation or controlled actions.

-------------------------------------------------------------
🔹 Advanced Usage with Props & State:
-------------------------------------------------------------
- Child component can still have props and internal state.
- Parent can manipulate child DOM or exposed methods without breaking encapsulation.

Example:
const ColorBox = forwardRef(({ color }, ref) => {
  return <div ref={ref} style={{ width: 50, height: 50, backgroundColor: color }} />;
});

- Parent can directly update style via ref while child retains its props.

-------------------------------------------------------------
🔹 Notes / Best Practices:
-------------------------------------------------------------
- forwardRef is mostly used with useImperativeHandle to expose 
  controlled methods.
- It keeps the child component encapsulated, exposing only what 
  you want the parent to access.
- Avoid overusing refs for state-driven UI updates; useState/useReducer 
  should be used when rendering changes are needed.
- Excellent for libraries, animations, form controls, and focus management.

-------------------------------------------------------------
🔹 TL;DR Summary:
-------------------------------------------------------------
- forwardRef = lets a function component accept a ref from parent.
- Enables parent to access DOM nodes or expose imperative methods.
- Works best with useImperativeHandle for controlled access.
- Commonly used for:
    • Focus management
    • Animations
    • Third-party library integrations
    • Form input manipulation
    • Custom UI components requiring parent control
-------------------------------------------------------------
*/

