import {
    Paper,
    TextField,
    Button,
    Typography,
    Box
  } from "@mui/material";
  
  import { useState } from "react";
  
  function CreateUser({ addUser }) {
  
    const [username, setUsername] =
      useState("");
  
    const [password, setPassword] =
      useState("");
  
    const handleCreate = () => {
  
      addUser({
        username,
        password
      });
  
      alert("User Created");
  
      setUsername("");
      setPassword("");
    };
  
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
  
        <Typography variant="h6">
          Create User
        </Typography>
  
        <TextField
          fullWidth
          label="Username"
          sx={{ mt: 2 }}
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />
  
        <TextField
          fullWidth
          type="password"
          label="Password"
          sx={{ mt: 2 }}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
  
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleCreate}
        >
          Create User
        </Button>
  
      </Paper>
    );
  }
  
  export default CreateUser;