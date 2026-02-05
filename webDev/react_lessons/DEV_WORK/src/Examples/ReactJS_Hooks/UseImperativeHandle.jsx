import { forwardRef, useRef, useState, useImperativeHandle, useActionState, useEffect } from "react"

const TextEditor = forwardRef((props, ref) => {
  const textareaRef = useRef(null);
  const [textAreaVal, setTextAreaVal] = useState('');

  useImperativeHandle(ref, () => ({
    exposeTextAreaVal: () => console.log(textareaRef.current.value),
    focusTextArea: () => textareaRef.current.focus(),
  }), [textAreaVal]);

  return (
    <textarea 
      placeholder={props.placeholder}
      className={props.classStyle}
      ref={textareaRef} 
      onInput={(e) => {setTextAreaVal(e.target.value)}}
    />
  )
});

function ImperativeHandleExample1 () {
  const textEditorRef = useRef(null);
  return (
    <>
      <div className="flex flex-col">
        <TextEditor 
          ref={textEditorRef} 
          classStyle="p-2 m-3 bg-gray-200 border-2 border-blue-200 resize-none rounded rounded-xl"
        />
        <button
          type="button"
          onClick={() => textEditorRef.current.exposeTextAreaVal()}
          className="p-2 m-3 bg-blue-300 outline-none border-2 border-green-500 rounded rounded-xl text-white font-bold"
        >
          Expose TextArea Value
        </button>
        <button
          type="button"
          onClick={() => textEditorRef.current.focusTextArea()}
          className="p-2 m-3 bg-blue-300 outline-none border-2 border-green-500 rounded rounded-xl text-white font-bold"
        >
          Focus TextArea
        </button>
      </div>
    </>
  )
}

const Form = forwardRef((props, ref) => {
  const formErrorTypes = {
    empty_username_input: "Empty username!",
    empty_password_input: "Empty password!",
  };
  const form = useRef(null);
  const [formError, addNewFormErr] = useState({input_username_err_msg: '', input_pwd_err_msg: ''});
  const [hasError, setHasError] = useState(false);
  const [state, formAction, isLoading] = useActionState(async (state, formData) => {
    if (formData.get("input-username") === "") {
      setHasError(true);
      addNewFormErr(prev => ({
        ...prev,
        input_username_err_msg: formErrorTypes.empty_username_input
      }));
    }
    if (formData.get("input-password") === "") {
      setHasError(true);
      addNewFormErr(prev => ({
        ...prev,
        input_username_err_msg: formErrorTypes.empty_username_input
      }));
    }
    if (hasError.current) return {};
    await new Promise(res => setTimeout(res, 2000));
    console.log(formData);
  }, {}, "/form-example");

  useImperativeHandle(ref, () => ({
    focusFirstChild: () => form.current.firstChild.focus(),
  }), []);

  return (
    <form 
      className="flex flex-col gap-1 p-3"
      action={formAction}
      ref={form}
    >
      <input 
        className="p-3 border-2 border-blue-3 font-bold text-gray-500 rounded"
        placeholder="Input username..."
        type="text"
        name="input-username"
      />
      {hasError && formError.input_username_err_msg ? 
      <span className="animate-show-in text-sm font-bold text-red-500 px-1 px-1">
        {formError.input_username_err_msg}
      </span> :
      null}
      <input 
        className="p-3 border-2 border-blue-3 font-bold text-gray-500 rounded"
        placeholder="Input password..."
        type="password"
        name="input-password"
      />
      {hasError && formError.input_username_err_msg ? 
      <span className="animate-show-in text-sm font-bold text-red-500 px-1 px-1">
        {formError.input_username_err_msg}
      </span> :
      null}
      <button
        disabled={isLoading}
        className="p-3 border-2 border-green-500 font-bold tex-white bg-green-200 disabled:opacity-50 font-bold text-green-700 rounded"
        type="submit"
      >
        {isLoading ? "Loading..." : "Submit Form"}
      </button>
    </form>
  )
});

function ImperativeHandleExample2 () {
  const form = useRef(null);

  useEffect(() => {
    form.current.focusFirstChild();
  }, []);

  return (
    <>
      <Form ref={form} />
    </>
  )
}

function ImperativeHandleExample3ToggleExample () {
  const [showModal, setShowModal] = useState(false);
  const theRef  = useRef();

  const InputComponent = forwardRef((props, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus_input: () => inputRef.current.focus(),
    }), [ref]);

    return (
      <>
        <input
          ref={inputRef}
          className="p-3 m-3 border border-blue-200 outline-green-300 outline-2 outline-solid rounded-xl"
        />
      </>
    )
  });

  const clickModal = () => {
    showModal ? setShowModal(false) : 
    setShowModal(true);
  }

  useEffect(() => {
    if (showModal) theRef.current.focus_input();
  }, [showModal]);

  return (
    <>
      {
        showModal ? <InputComponent ref={theRef} /> : ''
      }
      <div
        className="px-5 py-3 m-3 cursor-pointer bg-green-300 text-white w-fit font-bold rounded-xl"
        onClick={clickModal}
      >Modal</div>
    </>
  )
}

export default function TryImperativeHandle () {
  return (
    <>
      {/* <ImperativeHandleExample1 /> */}
      {/* <ImperativeHandleExample2 /> */}
      <ImperativeHandleExample3ToggleExample />
    </>
  )
}

/*
  useImperativeHandle is a React hook that lets a child component customize 
  what a parent can access via a ref. It is almost always used together with 
  forwardRef to expose only specific methods or values from the child.

  Mechanics:
  1. The child component must be wrapped in forwardRef to accept a ref from the parent.
  2. The parent passes a ref to the child like: <Child ref={myRef} />.
  3. Inside the child, useImperativeHandle(ref, () => { ... }, [deps]) defines 
     which methods/properties are exposed to the parent.
  4. The first argument is the ref from the parent.
  5. The second argument is a function returning an object with methods/properties 
     that the parent can call.
  6. The third argument is a dependency array (like useEffect) to ensure the 
     exposed handle is updated when certain values change.
  7. Any internal refs inside the child remain private and are not accessible 
     unless explicitly exposed.
  
  Typical Use Cases:
  - Focus a specific input/textarea programmatically.
  - Trigger animations or other imperative actions in the child.
  - Expose controlled APIs for reusable components (like reset(), submit(), etc.).
  - Maintain encapsulation while still allowing the parent to call certain actions.

  Important Notes:
  - Only the methods/properties returned in the object are accessible to the parent.
  - Always wrap method calls from the parent in a function or anonymous callback 
    to avoid calling them immediately.
  - The dependency array ensures the handle reflects the latest state or props 
    if those values change.
  - Prevents leaking the entire DOM node or unnecessary internal details.
  - Works hand-in-hand with useRef and forwardRef to build clean, maintainable 
    component APIs.

  Example Pattern:
    const Child = forwardRef((props, ref) => {
      const internalRef = useRef(null);
      useImperativeHandle(ref, () => ({
        focusInput: () => internalRef.current.focus(),
        getValue: () => internalRef.current.value,
      }));
      return <input ref={internalRef} />;
    });
    
    const Parent = () => {
      const childRef = useRef(null);
      return <Child ref={childRef} />;
    };
*/
