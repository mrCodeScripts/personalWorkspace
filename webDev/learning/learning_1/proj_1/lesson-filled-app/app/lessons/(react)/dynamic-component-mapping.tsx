"use client";
import { useState } from "react";

/**
 * ============================================================
 *  DYNAMIC COMPONENT MAPPING — NOTES
 *  Storing, listing, and rendering components dynamically
 *  Stack: Next.js + TypeScript + TSX
 * ============================================================
 *
 *  THE CONCEPT:
 *  In React, components are just functions.
 *  And in JavaScript/TypeScript, functions are just values.
 *  So you can store components in arrays, objects, variables —
 *  and render them dynamically just like any other data.
 *
 *  This is powerful for:
 *    - Tab systems (click tab → render different component)
 *    - Settings pages (list of sections, each is a component)
 *    - Dashboards (widgets mapped from a config)
 *    - Step-by-step forms / wizards
 *    - Any UI that's data-driven
 *
 * ============================================================
 *  WHICH "React.something" TYPE TO USE?
 * ============================================================
 *
 *  React.ComponentType   → a REFERENCE to a component (the function itself)
 *                          use when you want to store it and render it later
 *                          with <Component />
 *                          e.g. const C: React.ComponentType = MyComponent
 *                               <C />  ← renders it
 *
 *  React.ReactElement    → a specific JSX INSTANCE (already created)
 *                          use when you already called the component with JSX
 *                          e.g. const el: React.ReactElement = <MyComponent />
 *
 *  React.ReactNode       → ANYTHING renderable
 *                          strings, numbers, elements, null, fragments, arrays
 *                          use for children props or anything going into JSX
 *                          e.g. const content: React.ReactNode = "hello"
 *                               const content: React.ReactNode = <MyComponent />
 *                               const content: React.ReactNode = null
 *
 *  QUICK RULE:
 *    Storing a component to render later   → React.ComponentType
 *    Storing a JSX element already made    → React.ReactElement
 *    Storing anything that can be rendered → React.ReactNode
 *
 * ============================================================
 */




// ============================================================
//  DUMMY COMPONENTS — used in examples below
// ============================================================

const HomeTab    = () => <div className="p-3 bg-blue-50">🏠 Home content here</div>;
const ProfileTab = () => <div className="p-3 bg-green-50">👤 Profile content here</div>;
const SettingsTab = () => <div className="p-3 bg-yellow-50">⚙️ Settings content here</div>;
const NotificationsTab = () => <div className="p-3 bg-red-50">🔔 Notifications here</div>;




// ============================================================
//  EXAMPLE 1 — Basic component list (what you already did)
// ============================================================
//
//  Store components in an array with metadata.
//  Map over the array and render each one.
//  <item.component /> works because React.ComponentType is just a function
//  and React knows how to render functions that return JSX.
//

function BasicComponentList() {
  type ComponentConfig = {
    title: string;
    component: React.ComponentType; // reference to the function, not an instance
  };

  const sections: ComponentConfig[] = [
    { title: "Home",          component: HomeTab          },
    { title: "Profile",       component: ProfileTab       },
    { title: "Settings",      component: SettingsTab      },
    { title: "Notifications", component: NotificationsTab },
  ];

  return (
    <div className="space-y-3">
      {sections.map((section, index) => (
        // ⚠️ always use a unique key — index is fine for static lists
        // use a real id if the list can be reordered or filtered
        <div key={index}>
          <p className="font-semibold text-sm">{section.title}</p>
          <section.component />
          {/*
            ↑ This is the magic.
            section.component is just a reference to the function.
            Capitalizing it (or using dot notation) tells React
            "treat this as a component, not a string tag"
          */}
        </div>
      ))}
    </div>
  );
}




// ============================================================
//  EXAMPLE 2 — Tab system (dynamic active component)
// ============================================================
//
//  Store the currently active tab ID in state.
//  Look up which component to render from a config object.
//  Only one component renders at a time.
//

type TabId = "home" | "profile" | "settings" | "notifications";

function TabSystem() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  // config object — key is the tab id, value is component reference
  const tabComponents: Record<TabId, React.ComponentType> = {
    home:          HomeTab,
    profile:       ProfileTab,
    settings:      SettingsTab,
    notifications: NotificationsTab,
  };

  // tab labels for the buttons
  const tabs: { id: TabId; label: string }[] = [
    { id: "home",          label: "Home"          },
    { id: "profile",       label: "Profile"       },
    { id: "settings",      label: "Settings"      },
    { id: "notifications", label: "Notifications" },
  ];

  // grab the active component from the config
  const ActiveComponent = tabComponents[activeTab];
  // ↑ MUST be capitalized — React needs a capitalized name
  //   to know it's a component and not a plain HTML tag

  return (
    <div className="space-y-3">
      {/* Tab buttons */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 rounded text-sm font-medium border
              ${activeTab === tab.id
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-600 border-gray-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render the active component */}
      <ActiveComponent />
    </div>
  );
}




// ============================================================
//  EXAMPLE 3 — Components WITH props (React.ComponentType<Props>)
// ============================================================
//
//  If your components need props, type it with a generic:
//    React.ComponentType<YourPropsType>
//
//  This makes TypeScript enforce that you pass the right props
//  when rendering the component dynamically.
//

interface CardProps {
  title: string;
  description: string;
  color: string;
}

const BlueCard  = ({ title, description, color }: CardProps) => (
  <div className={`p-3 rounded border-l-4`} style={{ borderColor: color }}>
    <p className="font-semibold">{title}</p>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const BoldCard  = ({ title, description, color }: CardProps) => (
  <div className={`p-3 rounded font-bold`} style={{ backgroundColor: color + "22" }}>
    <p className="text-lg">{title}</p>
    <p className="text-xs">{description}</p>
  </div>
);

function ComponentsWithProps() {
  type CardConfig = {
    id: string;
    component: React.ComponentType<CardProps>; // ← generic with prop type
    props: CardProps;
  };

  const cards: CardConfig[] = [
    {
      id: "card1",
      component: BlueCard,
      props: { title: "Blue Card", description: "This uses BlueCard component", color: "#3b82f6" },
    },
    {
      id: "card2",
      component: BoldCard,
      props: { title: "Bold Card", description: "This uses BoldCard component", color: "#10b981" },
    },
    {
      id: "card3",
      component: BlueCard,
      props: { title: "Another Blue", description: "Reusing BlueCard with different props", color: "#f59e0b" },
    },
  ];

  return (
    <div className="space-y-2">
      {cards.map(card => {
        const Card = card.component; // capitalize before rendering
        return <Card key={card.id} {...card.props} />;
        // ↑ spread the props object directly — clean and dynamic
      })}
    </div>
  );
}




// ============================================================
//  EXAMPLE 4 — Step wizard (ordered component flow)
// ============================================================
//
//  A multi-step form or wizard is just an array of components
//  with a current step index tracked in state.
//  Next/back buttons move through the array.
//

const Step1 = () => <div className="p-4 bg-blue-50 rounded">Step 1: Enter your name</div>;
const Step2 = () => <div className="p-4 bg-green-50 rounded">Step 2: Enter your email</div>;
const Step3 = () => <div className="p-4 bg-yellow-50 rounded">Step 3: Review your info</div>;
const Step4 = () => <div className="p-4 bg-purple-50 rounded">Step 4: Done! 🎉</div>;

function StepWizard() {
  const [step, setStep] = useState<number>(0);

  const steps: React.ComponentType[] = [Step1, Step2, Step3, Step4];
  const CurrentStep = steps[step]; // grab component at current index

  const isFirst = step === 0;
  const isLast  = step === steps.length - 1;

  return (
    <div className="space-y-3">
      {/* Progress indicator */}
      <p className="text-sm text-gray-500">
        Step {step + 1} of {steps.length}
      </p>

      {/* Render current step */}
      <CurrentStep />

      {/* Navigation */}
      <div className="flex gap-2">
        <button
          onClick={() => setStep(p => p - 1)}
          disabled={isFirst}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={() => setStep(p => p + 1)}
          disabled={isLast}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}




// ============================================================
//  EXAMPLE 5 — Component registry (object map, not array)
// ============================================================
//
//  Instead of an array, use a plain object as a lookup table.
//  Great for routing-like behavior, feature flags, or
//  rendering different components based on a string key
//  (like a type field from an API response).
//

type BlockType = "text" | "image" | "video" | "cta";

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

// Each block type has its own component
const TextBlock  = ({ content }: { content: string }) => <p className="p-2">{content}</p>;
const ImageBlock = ({ content }: { content: string }) => <div className="p-2 bg-gray-100">[Image: {content}]</div>;
const VideoBlock = ({ content }: { content: string }) => <div className="p-2 bg-black text-white">[Video: {content}]</div>;
const CTABlock   = ({ content }: { content: string }) => <button className="p-2 bg-blue-500 text-white rounded">{content}</button>;

// Registry — maps block type string to component
const blockRegistry: Record<BlockType, React.ComponentType<{ content: string }>> = {
  text:  TextBlock,
  image: ImageBlock,
  video: VideoBlock,
  cta:   CTABlock,
};

function BlockRenderer() {
  // Imagine this came from an API
  const blocks: Block[] = [
    { id: "1", type: "text",  content: "Welcome to my page" },
    { id: "2", type: "image", content: "hero.jpg"           },
    { id: "3", type: "cta",   content: "Sign up now"        },
    { id: "4", type: "video", content: "intro.mp4"          },
    { id: "5", type: "text",  content: "Thanks for reading" },
  ];

  return (
    <div className="space-y-2">
      {blocks.map(block => {
        const Block = blockRegistry[block.type]; // look up component by type
        return <Block key={block.id} content={block.content} />;
        // ↑ each block knows its own component — zero if/else needed
      })}
    </div>
  );
}




// ============================================================
//  COMMON MISTAKES
// ============================================================
//
//  ❌ MISTAKE 1 — not capitalizing before rendering
//
//    const component = MyComponent;
//    return <component />;         // React thinks this is an HTML tag → wrong
//
//  ✅ FIX — capitalize the variable
//
//    const Component = MyComponent;
//    return <Component />;         // React knows it's a component ✅
//
//
//  ❌ MISTAKE 2 — missing key prop in map
//
//    items.map(item => <item.component />)  // React warning, potential bugs
//
//  ✅ FIX — always add key
//
//    items.map((item, i) => <item.component key={i} />)
//    // use a real unique id if available, index only for static lists
//
//
//  ❌ MISTAKE 3 — using React.ReactNode when you mean React.ComponentType
//
//    type Config = { component: React.ReactNode }  // this is an instance/value
//    const c: Config = { component: MyComponent }  // MyComponent is a function, not a node
//    → TypeScript error
//
//  ✅ FIX
//
//    type Config = { component: React.ComponentType }  // reference to the function
//    const c: Config = { component: MyComponent }  // ✅
//

// ============================================================
//  QUICK REFERENCE
// ============================================================
//
//  Store a component reference:    React.ComponentType
//  Store with typed props:         React.ComponentType<Props>
//  Store a JSX instance:           React.ReactElement
//  Store anything renderable:      React.ReactNode
//
//  Render from variable:           const C = item.component; <C />
//  Render with spread props:       const C = item.component; <C {...item.props} />
//  Lookup from object:             const C = registry[key]; <C />
//
// ============================================================




export default function DynamicComponentMapping() {
  type ExampleConfig = {
    title: string;
    description: string;
    component: React.ComponentType;
  };

  const examples: ExampleConfig[] = [
    {
      title: "1. Basic Component List",
      description: "Store components in an array, render all of them",
      component: BasicComponentList,
    },
    {
      title: "2. Tab System",
      description: "Render one component at a time based on active tab",
      component: TabSystem,
    },
    {
      title: "3. Components with Props",
      description: "Dynamic components that receive typed props",
      component: ComponentsWithProps,
    },
    {
      title: "4. Step Wizard",
      description: "Move through components step by step",
      component: StepWizard,
    },
    {
      title: "5. Block Registry",
      description: "Object map — render different components by type string",
      component: BlockRenderer,
    },
  ];

  return (
    <div className="flex flex-col p-3 space-y-8">
      <p className="font-semibold text-xl">
        PATTERN: <span className="text-green-700">Dynamic Component Mapping</span>
      </p>
      {examples.map((example, index) => (
        <div key={index} className="border rounded p-3 space-y-1">
          <p className="font-semibold">{example.title}</p>
          <p className="text-xs text-gray-400 mb-2">{example.description}</p>
          <example.component />
        </div>
      ))}
    </div>
  );
}
