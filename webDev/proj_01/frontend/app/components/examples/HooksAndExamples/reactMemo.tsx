"use client";

import React, { memo, useCallback, useId, useMemo } from "react";

function ReactMemoExample1() {
  const InputComponent = React.memo(
    (props: { label?: string; placeholder: string; type: string, onInput: (e: React.InputEvent<HTMLInputElement>) => void }) => {
      const inputComponentId = useId();
      return (
        <>
          <div style={{display:"flex", flexDirection: "column", width: "200px"}}>
            <label style={{color: "#303030", fontSize: "13px", padding: "5px"}} htmlFor={inputComponentId}>{props.label}</label>
            <input
              type={props.type}
              placeholder={props.placeholder}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid gray",
              }}
              onInput={props.onInput}
              id={inputComponentId}
            />
          </div>
        </>
      );
    },
  );

  const usernameOnInput = useCallback((e: React.InputEvent<HTMLInputElement>) => {
    console.log("Username Input: ", e.currentTarget.value);
  }, []);

  const passwordOnInput = useCallback((e: React.InputEvent<HTMLInputElement>) => {
    console.log("Password Input: ", e.currentTarget.value);
  }, []);

  return (
    <>
      <div style={{display: "flex",flexDirection: "column", gap: "10px"}}>
        <InputComponent type="text" label="Enter Username: " placeholder="Username..." onInput={usernameOnInput} />
        <InputComponent type="password" label="Enter Password: " placeholder="Password..." onInput={passwordOnInput} />
      </div>
    </>
  );
}

export default function ReactMemoExamples() {
  return (
    <>
      <ReactMemoExample1 />
    </>
  );
}
