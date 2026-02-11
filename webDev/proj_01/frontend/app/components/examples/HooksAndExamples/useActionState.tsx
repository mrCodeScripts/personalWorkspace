"use client";

import { useActionState } from "react";

function UseActionStateExample1 () {
  type FormStateType = {name: string; age: number};
  type FormDataType = {name: string; age: number};
  const [formState, formAction, isLoading] = useActionState<FormStateType, FormDataType>((async (state, formData) => {
    await new Promise((res) => setTimeout(res, 3000));
    return state;
  }), {name: "", age: 0}, "/shit");

  return (
    <>
      <form>
        <input type="text" />
      </form>
    </>
  );
}

export default function UseActionStateExamples() {
  return (
    <>
      <div></div>
    </>
  );
}
