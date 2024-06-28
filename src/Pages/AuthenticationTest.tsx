import React from "react";
import { withAuth } from "../HOC";

function AuthenticationTest() {
  return <div>This page can be accessed nu amy logged in</div>;
}
export default withAuth(AuthenticationTest);
