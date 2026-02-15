"use client";

export default function ClientComponent2(props: {status: string, message: string}) {
  return (
    <>
      <p style={{color: "red"}}>Status: {props.status}, Message: {props.message}</p>
    </>
  );
}
