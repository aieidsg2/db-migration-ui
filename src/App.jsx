import { useState, useEffect } from "react";

import Login from "./Login";
import MigrationPage from "./MigrationPage";
import CreateUser from "./CreateUser";

function App() {

  const [loggedIn, setLoggedIn] =
  useState(false);

  const [users, setUsers] = useState(() => {

    const savedUsers =
      localStorage.getItem("users");
  
    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          {
            username: "admin",
            password: "admin123"
          }
        ];
  })
  useEffect(() => {

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  
  }, [users]);;


  const addUser = (newUser) => {

    const existingUser = users.find(
      (u) => u.username === newUser.username
    );
  
    if (existingUser) {
      alert("Username already exists");
      return;
    }
  
    setUsers([
      ...users,
      newUser
    ]);
  
    alert("User created successfully");
  };

if (!loggedIn) {
  return (
    <>
      <Login
        users={users}
        onLogin={() => setLoggedIn(true)}
      />

      <CreateUser
        addUser={addUser}
      />
    </>
  );
}

return <MigrationPage />;
}

export default App;