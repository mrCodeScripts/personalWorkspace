"use client";
import { useId, useEffect, useState } from "react";

function UseIdExample1 () {
  const [password, setPassword] = useState<string>("");
  const username_inpt_id: string = useId();
  const password_input_id: string = useId();

  useEffect(() => {
    console.log("Password input: ", password);
    return () => console.log("Clean-up");
  }, [password]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form style={{display: "flex", flexDirection: "column", width: "300px"}}>
        <label htmlFor={username_inpt_id} style={{color: "#303030"}}>Input Username: </label>
        <input type="text" id={username_inpt_id} placeholder="Username..." style={{border: "1px solid #303030", backgroundColor: "#F1F1F1", borderRadius: "5px", padding: "10px"}} value={password!} onChange={handleInput}/>
      </form>
    </>
  )
}

export default function UseIdExamples() {
  return (
    <>
      <UseIdExample1 />
    </>
  )
}
