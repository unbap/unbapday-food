import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
import Login from "./components/Login";
import app from "./firebaseApp";
import FavMenu from "./components/FavMenu";

function App() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <div>Loading Auth...</div>;
  else if (error) return <div>Error Auth</div>;

  if (!user) return <Login />;

  return (
    <div className="App">
      <h1
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        언밥일 메뉴
      </h1>
      <p
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        2021. 09. 15. 수요일 1시
      </p>
      <FavMenu />
    </div>
  );
}

export default App;
