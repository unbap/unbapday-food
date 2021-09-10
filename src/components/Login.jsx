import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebaseApp";

function Login() {
  return (
    <div>
      <h1>Please Login</h1>
      <button
        onClick={() => {
          const auth = getAuth(app);
          signInWithPopup(auth, new GoogleAuthProvider());
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
