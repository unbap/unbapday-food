import { getAuth } from "firebase/auth";
import React from "react";
import app from "../firebaseApp";

import "./userdata.css";

function UserData() {
  const auth = getAuth(app);
  return (
    <div className="userData">
      <h3>{auth.currentUser.email}</h3>
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
}

export default UserData;
