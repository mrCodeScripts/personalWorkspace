import { useActionState, useReducer, useTransition } from "react";

function performWhenFormSubmitted (prevState, formData) {
  console.log(formData);
  return prevState + 1;
}

function UseActionStateFormExample () {
  const initialState = 0;
  const [state, formAction] = useActionState(performWhenFormSubmitted, initialState);

  return (
    <>
      <p>
        Submited forms: {state}
      </p>
      <form 
        className="border-2 border-gray-500 rounded-md p-5 w-fit m-auto flex flex-col"
      >
        <input 
          className="border-2 border-gray-500 my-3 rounded-md outline-1 outline-offset-2 outline-blue-300"
          type="text" 
          name="username"
          placeholder="Username"
        />
        <input 
          className="border-2 border-gray-500 my-3 rounded-md outline-1 outline-offset-2 outline-blue-300"
          type="date" 
          name="user-birth-date"
          placeholder="Birthdate"
        />
        <input 
          className="border-2 border-gray-500 my-3 rounded-md outline-1 outline-offset-2 outline-blue-300"
          type="int" 
          name="user-age"
          placeholder="Age"
        />
        <div className="flex flex-col">
          <div className="flex flex-row">
            <input type="checkbox" name="selected_lang" className="selected_lang" value={"JavaScript"} />
            <span>
              JavaScript
            </span>
          </div>
          <div className="flex flex-row">
            <input type="checkbox" name="selected_lang" className="selected_lang" value={"CSS"} />
            <span>
              CSS
            </span>
          </div>
          <div className="flex flex-row">
            <input type="checkbox" name="selected_lang" className="selected_lang" value={"HTML"} />
            <span>
              HTML
            </span>
          </div>
        </div>
        <button 
          className="border-2 border-green-500 text-sm font-bold text-white bg-green-500 p-3 rounded"
          formAction={formAction}
        >
          Submit
        </button>
      </form>
    </>
  )
}

function UseActionStateLoading () {
  const [state, actionStateFunc, isLoading] = useActionState(async (state, formData) => {
    await new Promise(r => {
      window.setInterval(r, 3000);
    });
    return state;
  }, {}, "/loading-link");

  return (
    <>
      {isLoading ? <b className="p-3 m-3 text-red-300">Loading...</b> : <b className="p-3 m-3 text-green-300">Done!</b>}
      <form action={actionStateFunc}>
        <button type="submit" className="p-3 m-3 bg-green-300 rounded-xl text-white font-bold border-2 border-green-500">Click This</button>
      </form>
    </>
  )
}

function UseActionStateExample4 () {
  const [state, actionState, isLoading] = useActionState(async (state, formData) => {
    const name = formData.get("button_name") ?? null;
    return name;
  }, "", "/useActionStateExample4");

  const [loading, startTransition] = useTransition();

  const handler = (i) => {
    const formData = new FormData();
    formData.append("button_name", `BUTTON ${i}`);
    startTransition(() => {
      actionState(formData);
    });
  };

  const btns = [ "Button", "Button", "Button", "Button", "Button" ];

  return (
    <>
      <p>Button Name: {state ?? <span className="text-red-300">No Button Clicked</span>}</p>
      {
        btns.map((v, i) => <button key={i} onClick={(i) => {handler(i)}}>{v} {i}</button>)
      }
    </>
  )
}

export function TryUseActionState () {
  return (
    <>
      {/* <UseActionStateLoading /> */}
      {/* <UseActionStateFormExample /> */}
      <UseActionStateExample4 />
    </>
  )
}

/**
 * 
 * const [state, formAction, isPending] = useActionState(formActionFunction, initialState, permalink);
 * 
 * state - whatever your action function returns.
 * formAction - function you attach to <form action={}> or call manually
 * isPending - boolean true while async action runs.
 * permalink - unique state identifier (per form or route).
 * Works with server actions? -> "Yes, built for them"
 * Prevents double submits? -> "Yes, automatically"
 * Replaces useState + fetch? -> "Yes, ellegantly"
 * Combine with useOptimistic? -> "For real-time UIs"
 * 
 * ==========================================================
 * DIFFERENT ACTION YOU CAN DO USING THE SUBMITTED FORM DATA
 * ==========================================================
 * 
 * +========================================================+
 * | 1. formData.get(name);                                 |
 * | - access a data submitted from the form using the key  |
 * | (e.g., name='username').                               |
 * | Example:                                               |
 * | const value = formData.get('input-key');               |
 * +========================================================+
 * 
 * +========================================================+
 * | 2. formData.getAll(name);                              |
 * | - can be used for accessing multiple selected radio    |
 * | elements                                               |
 * | Exxample:                                              |
 * | const hobbies = formData.getAll('hobbies');            |
 * |                                                        |
 * | <input type="checkbox" name="hobbies" value="coding">  | 
 * | <input type="checkbox" name="hobbies" value="reading"> |
 * +========================================================+
 * 
 * +========================================================+
 * | 3. formData.has(name);                                 |
 * | - checks if a key was exists in the submission.        |
 * | Example:                                               |
 * | if (formData.has('subscribe')) {                       |
 * |   console.log('user subscribed'); }                    |
 * +========================================================+
 * 
 * +========================================================+
 * | 4. formData.append(name, value);                       |
 * | - adds a new value to a key, does not overwrite        |
 * | existing ones.                                         |
 * | Example:                                               |
 * |  <input type='checkbox' value='html' name='tags'>      |
 * |  <input type='checkbox' value='c++' name='tags'>       |
 * |                                                        |
 * |  formData.append("tags", "javascript");                |
 * |  formData.append("tags", "php");                       |
 * |  // shows ['html', 'c++', 'javascript, 'php']          |
 * |  console.log(formData.get('tags'));                    |
 * +========================================================+
 * 
 * +========================================================+
 * | 5. formData.set(name, value);                          |
 * | - sets or updates a new key/value pair. Overwrites     |
 * | if it exists.                                          |
 * | Example:                                               |                     
 * |  <input type='text' name='username' />                 |
 * |  formData.set('username', 'new_username');             |
 * +========================================================+
 *
 * +========================================================+
 * | 6. formData.delete(name);                              |
 * | - deletes a key from the formData.                     |
 * | Example:                                               |
 * |  formData.delete('username');                          |
 * +========================================================+
 * 
 * +========================================================+
 * | 7. .entries()                                          |
 * | - get [key, value] pairs.                              |
 * | Example:                                               |
 * |  for (let [key, value] of formData.entries())          |
 * |  console.log(key, value);                              |
 * +========================================================+
 * 
 * +========================================================+
 * | 8. .keys()                                             |
 * | - get only keys.                                       |
 * | Example:                                               |
 * |  for (let key of formData.keys()) console.log(key);    |
 * +========================================================+
 * 
 * +========================================================+
 * | 9. .values();                                          |
 * | - get only values.                                     |
 * | Ex:                                                    |
 * |  for (let value of formData.values())                  |
 * |  console.log(value);                                   |
 * +========================================================+
 */


