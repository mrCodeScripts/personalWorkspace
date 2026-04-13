import DynamicComponentMapping from "./dynamic-component-mapping";
import ReactMechanicsLesson from "./react-mechanics";
import UseEffectLesson from "./use-effect";
import UseEffectMountedPatternLoadingWebAPIs from "./web-api-useEffect";

export default function ReactLesson() { 
  return (
    <>
      <h1 className="text-3xl font-bold text-center">React Lessons</h1>
      {/* <ReactMechanicsLesson /> */}
      <UseEffectLesson />
      {/* <DynamicComponentMapping /> */}
      {/* <UseEffectMountedPatternLoadingWebAPIs /> */}
    </>
  );
}