"use client";

import React, { useActionState, useEffect, useState } from "react";

function UseActionStateExample1() {
  type FormStateType = { name: string; age?: number | null };
  const [userList, newUserList] = useState<FormStateType[]>([]);
  const initialState: FormStateType = { name: "", age: null };
  const UserLists = React.memo((props: {users: FormStateType[]}) => {
    return (
      <>
        <ul style={{color: "red"}}>
          {props.users.length > 0 ? props.users.map((e, i) => <li key={i}>Name: {e.name} Age: {e.age}</li>) : <p>No Users</p>}
        </ul>
      </>
    );
  });

  const [state, formAction, isPending] = useActionState<
    FormStateType,
    FormData
  >(async (prev, formData) => {
    await new Promise((res) => setTimeout(res, 5000));
    const name = String(formData.get("name"));
    const age = Number(formData.get("age"));
    newUserList(prev => [...prev, {name: name, age: age}]);
    return {
      name,
      age: isNaN(age) ? null : age,
    };
  }, initialState);
  
  return (
    <>
      {isPending ? <p style={{color: "green"}}>Loading users...</p> : <UserLists users={userList} />}
      <form action={formAction}>
        <input type="text" name="name" placeholder="Enter username..."/>
        <input type="number" name="age" id="Enter age..." />
        <button type="submit">
          Submit
        </button>
      </form>
    </>
  )
}

export default function UseActionStateExamples() {
  return (
    <>
      <UseActionStateExample1 />
    </>
  );
}
