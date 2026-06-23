import { useState } from "react";

import Login from "./Login";
import MigrationPage from "./MigrationPage";

function App() {

  const [loggedIn, setLoggedIn] =
    useState(false);

  if (!loggedIn) {
    return (
      <Login
        onLogin={() =>
          setLoggedIn(true)
        }
      />
    );
  }

  return <MigrationPage />;
}

export default App;