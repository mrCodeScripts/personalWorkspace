import { Chat } from "./Chat";
import { SocketProvider } from "./SocketProvider";
import { TryUseState } from "./Examples/ReactJS_Hooks/UseState";
import { TryUseEffect } from "./Examples/ReactJS_Hooks/UseEffect";
import { TryUseContext } from "./Examples/ReactJS_Hooks/UseContext_CreateContext";
import TryUseMemo from "./Examples/ReactJS_Hooks/UseMemo";
import UserApp from "./Examples/ReactJS_Hooks/Lazy";
import { TryUseActionState } from "./Examples/ReactJS_Hooks/UseActionState";
import { TheCart } from "./components/addToCartComponent/addtoCart";
import TryReactMemo from "./Examples/ReactJS_Hooks/ReactMemo";
import TryTaskManager from "./components/taskManagerComponent/taskManagerApp";
import TryUseOptimistic from "./Examples/ReactJS_Hooks/UseOptimistic";
import TryUseCallback from "./Examples/ReactJS_Hooks/UseCallback";
import TryUseRef from "./Examples/ReactJS_Hooks/UseRef";
import SnakeGame from "./components/snakeGameComponent/snakeGame";
import TryForwardRef from "./Examples/ReactJS_Hooks/ForwardRef";
import TryImperativeHandle from "./Examples/ReactJS_Hooks/UseImperativeHandle";
import TryUseLayoutEffect from "./Examples/ReactJS_Hooks/UseLayoutEffect";
import TryUsedID from "./Examples/ReactJS_Hooks/UseId";
import TryUseTransition from "./Examples/ReactJS_Hooks/UseTransition";
import TryUseDeferredValue from "./Examples/ReactJS_Hooks/UseDeferredValue";
import TryUseDebounce from "./Examples/ReactJS_Hooks/UseDebounce";
import TryUseSyncExternalStore from "./Examples/ReactJS_Hooks/UseSyncExternalStorage";
import { useContext, useRef, useSyncExternalStore } from "react";
import TryUseInsertionEffect from "./Examples/ReactJS_Hooks/UseInsertionEffect";
import { createContext } from "react";
import { TryUseReducer } from "./Examples/ReactJS_Hooks/UseReducer";

export default function App() {
  return (
    <>
      {/* <SocketProvider>
      <Chat></Chat>
      </SocketProvider>
      <TryUseState />
      <TryUseEffect />
      <TryUseContext />
      <TaskManager />
      {/* <TryUseEffect /> */}
      {/* <UseMemoExample></UseMemoExample> */}
      {/* <UserApp></UserApp> */}
      {/* <TryUseActionState /> */}
      {/* <TheCart /> */}
      {/* <TryReactMemo /> */}
      {/* <TryUseMemo /> */}
      {/* <TryTaskManager /> */}
      {/* <TryUseOptimistic /> */}
      {/* <TryUseCallback /> */}
      {/* <TryUseRef /> */}
      {/* <SnakeGame /> */}
      {/* <TryForwardRef /> */}
      {/* <TryImperativeHandle /> */}
      {/* <TryUseLayoutEffect /> */}
      {/* <TryUsedID /> */}
      {/* <TryUseState /> */}
      {/* <TryUseTransition /> */}
      {/* <TryUseDeferredValue /> */}
      {/* <TryUseDebounce /> */}
      {/* <TryUseSyncExternalStore /> */}
      {/* <TryUseInsertionEffect /> */}
      {/* <TryUseReducer /> */}
    </>
  );
}
