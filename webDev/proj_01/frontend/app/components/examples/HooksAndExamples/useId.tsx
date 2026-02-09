"use client";
import { useId, useEffect, useState } from "react";

function UseIdExample1() {
  const InputLabelComponent = () => {
    const [inputVal, setInputVal] = useState<string>("");
    const inpt_id: string = useId();
    useEffect(() => {
      console.log(`Input value of ${inpt_id}: `, inputVal);
      return () => console.log("Clean-up");
    }, [inputVal]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    };
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <label htmlFor={inpt_id} style={{ color: "#303030" }}>
          Input Username:{" "}
        </label>
        <input
          type="text"
          id={inpt_id}
          placeholder="Username..."
          style={{
            border: "1px solid #303030",
            backgroundColor: "#F1F1F1",
            borderRadius: "5px",
            padding: "10px",
          }}
          value={inputVal}
          onChange={handleInput}
        />
      </div>
    );
  };

  return (
    <>
      <form style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px"}} >
        <InputLabelComponent />
        <InputLabelComponent />
        <InputLabelComponent />
      </form>
    </>
  );
}

export default function UseIdExamples() {
  return (
    <>
      <UseIdExample1 />
    </>
  );
}
