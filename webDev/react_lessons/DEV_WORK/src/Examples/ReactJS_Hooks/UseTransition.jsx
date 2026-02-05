import { useState, useTransition } from "react";

function FilterList({ items }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();
  const queryHandler = (e) => {
    const v = e.target.value;
    setQuery(v);
    startTransition(async () => {
      const filter = items.filter((item) =>
        item.toLowerCase().includes(v.toLowerCase())
      );
      await new Promise((res) => setTimeout(res, 1000));
      setFiltered(filter);
    });
  };

  return (
    <>
      <input
        type="text"
        className="p-2 m-2 bg-gray-100 rounded-xl text-gray-900"
        onInput={queryHandler}
      />
      <div className="p-2 flex flex-col gap2">
        {isPending
          ? "Pending..."
          : filtered.map((v, i) => <span key={i}>{v}</span>)}
      </div>
    </>
  );
}

export default function TryUseTransition() {
  return (
    <>
      <FilterList items={["John Doe", "Shit", "Item", "JavaScript"]} />
    </>
  );
}

/*
  -> const [isPending, startTransition] = useTransition(); - React Hook for managing non-urgent UI updates (Concurrent Mode)
  -> Recommendation: Use this not for fetching data on the server (it spamms) but for 
  filtering local data (already fetched data)

  Purpose:
  - Allows you to mark certain state updates as "transitions" (non-urgent) 
    so that React can keep the UI responsive while rendering heavy updates.
  - Keeps urgent interactions (typing, clicking buttons) instant.
  - Commonly used for search bars, live filtering, lazy-loading heavy components, 
    large tables, charts, and any expensive UI rendering.

  Syntax:
  const [isPending, startTransition] = useTransition();
    - isPending: boolean indicating whether the transition is still in progress
    - startTransition(callback): wrap your non-urgent state updates inside this function

  Mechanics:
  1. React schedules the updates inside startTransition as low-priority.
  2. Urgent updates (typing, clicks) take priority and render immediately.
  3. Low-priority updates continue rendering in the background.
  4. isPending can be used to show feedback (e.g., loading spinners) during the transition.
  
  Key Points / Best Practices:
  - Use startTransition for any updates that are expensive or could block the UI.
    Examples: filtering large lists, updating heavy components, lazy-loaded content.
  - Urgent updates (like input values, button clicks) should remain outside startTransition.
  - Often combined with React.lazy and Suspense for lazy-loading large components 
    without freezing the UI.
  - Perfect for accessibility-friendly, responsive UIs where smoothness is critical.
  - Helps maintain "instant feedback" UX even when rendering multiple heavy elements.

  Example Use Cases:
  1. Search Bars / Live Filters:
     - Typing stays instant while filtering thousands of items happens in the background.
  2. Lazy-loading Components:
     - Heavy dashboards, charts, or tables can render without freezing the page.
  3. Tooltips / Expensive UI Updates:
     - Non-critical UI updates can be deferred without blocking user interaction.

  Summary:
  - useTransition separates urgent vs non-urgent work.
  - Improves perceived performance of complex or heavy UI.
  - Must still handle JS logic to actually update the DOM; useTransition only 
    tells React which updates can be lower priority.
  - Combine with isPending to provide user feedback during transitions.
*/
