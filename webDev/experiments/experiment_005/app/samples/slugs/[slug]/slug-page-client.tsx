'use client'

export default function SlugPageClient(props: {slugParam: string}) {
  return (
    <>
      <h1 >Slug Data: {props.slugParam}</h1>
    </>
  );
};