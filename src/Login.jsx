import {
    Box,
    Paper,
    Typography,
    TextField,
    Button
  } from "@mui/material";
  
  import { useState } from "react";
  
  function Login({ users,onLogin }) {
  
    const [username, setUsername] =
      useState("");
  
    const [password, setPassword] =
      useState("");
  
      const handleLogin = () => {

        console.log("Users:", users);
        console.log("Entered username:", username);
        console.log("Entered password:", password);
      
        const user = users.find(
          (u) =>
            u.username === username &&
            u.password === password
        );
      
        console.log("Matched user:", user);
      
        if (user) {
          console.log("LOGIN SUCCESS");
          onLogin();
        } else {
          console.log("LOGIN FAILED");
          alert("Invalid Credentials");
        }
      };
  
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Paper sx={{ p: 4, width: 400 }}>
  
          <Typography
            variant="h5"
            gutterBottom
          >
            Migration Platform Login
          </Typography>
  
          <TextField
            fullWidth
            label="Username"
            sx={{ mb: 2 }}
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
  
          <TextField
            fullWidth
            type="password"
            label="Password"
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
  
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
  
        </Paper>
      </Box>
    );
  }
  
  export default Login;