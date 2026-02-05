import { useId } from "react"

function UseIdExample1 () {
  const username_input_id = useId();
  const pwd_input_id = useId();

  return (
    <>
      <form>
        <label htmlFor={username_input_id}>Username:</label>
        <input type="text" id={username_input_id} placeholder="Username..." />
        <label htmlFor={pwd_input_id}>Password:</label>
        <input type="password" id={pwd_input_id} placeholder="Username..." />
      </form>
    </>
  )
}

function Tabs({ tabs }) {
  const id = useId();
  return (
    <div>
      <ul role="tablist">
        {tabs.map((tab, idx) => {
          const tabId = `${id}-tab-${idx}`;
          const panelId = `${id}-panel-${idx}`;
          return (
            <li key={idx}>
              <button id={tabId} aria-controls={panelId} role="tab">
                {tab.title}
              </button>
              <div id={panelId} aria-labelledby={tabId} role="tabpanel">
                {tab.content}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function TryUsedID () {
  return (
    <>
      <Tabs tabs={[
        {title: "Shit", content: "Hello shit!"},
        {title: "Shit", content: "Hello shit!"},
        {title: "Shit", content: "Hello shit!"},
      ]} />
    </>
  )
}

/*
  useId() - React Hook for generating stable, unique IDs per component instance

  Purpose:
  - Generates a unique ID that is stable across re-renders of the same component instance.
  - Primarily used for accessibility (linking labels, ARIA attributes) and SVG elements.
  - Avoids manual ID management and collisions, especially when rendering multiple instances.

  Syntax:
  const id = useId();

  Key Mechanics:
  1. Each component instance gets a unique ID, stable across re-renders.
  2. Does NOT change on every render (unlike generating a random ID inside render).
  3. Works with ARIA attributes like:
     - aria-controls: links a controller element (button/tab) to the controlled element (panel/modal)
     - aria-labelledby: specifies the main label of an element
     - aria-describedby: links to descriptive/help text
  4. Can be used for SVG IDs (clipPath, masks, filters) to prevent collisions.
  
  Best Practices / Professional Use Cases:
  - Forms and inputs: link <label htmlFor={id}> to <input id={id}>
  - Tabs / Panels: unique ID per tab-panel pair for accessibility
  - Tooltips / Popovers: aria-describedby + role="tooltip"
  - Component libraries: reusable components with automatically unique IDs
  - Avoid relying on useId for styling; use className or CSS modules/Tailwind for design
  - Can prefix the ID if you need predictable strings for targeting in JS or CSS selectors
    (e.g., const inputId = `username-${id}`)

  Example:
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </>
  );

  Summary:
  - useId ensures unique, stable IDs for accessibility and element linking.
  - Perfect for forms, dynamic components, SVGs, and ARIA attributes.
  - Not intended for generating new random IDs on every render.
  - Always combine with className or other styling techniques for design purposes.
*/
