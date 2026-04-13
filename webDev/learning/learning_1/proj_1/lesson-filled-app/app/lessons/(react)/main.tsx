import DynamicComponentMapping from "./dynamic-component-mapping";
import UseReducerLesson from "./react-hooks/useReducer";
import UseStateNotes from "./react-hooks/useState";
import ReactMechanicsLesson from "./react-mechanics";
import UseEffectLesson from "./use-effect";
import UseEffectMountedPatternLoadingWebAPIs from "./web-api-useEffect";

export default function ReactLesson() { 
  return (
    <>
      <h1 className="text-3xl font-bold text-center p-10">React Lessons</h1>
      {/* <ReactMechanicsLesson /> */}
      {/* <UseEffectLesson /> */}
      {/* <DynamicComponentMapping /> */}
      {/* <UseEffectMountedPatternLoadingWebAPIs /> */}
      {/* <UseStateNotes /> */}
      <UseReducerLesson />
    </>
  );
}