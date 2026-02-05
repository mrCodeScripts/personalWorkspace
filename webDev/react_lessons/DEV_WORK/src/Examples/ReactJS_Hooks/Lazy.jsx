// App.js
import React, { Suspense, lazy } from "react";

const Users = lazy(() => import("./Users"));

export default function UserApp() {
  return (
    <div>
      <h1>Lazy Loaded Users</h1>
      <Suspense fallback={<p>Loading users...</p>}>
        <Users />
      </Suspense>
    </div>
  );
}
