import {
    Box,
    Paper,
    Typography,
    TextField,
    Button
  } from "@mui/material";
  
  import { useState } from "react";
  
  function Login({ onLogin }) {
  
    const [username, setUsername] =
      useState("");
  
    const [password, setPassword] =
      useState("");
  
    const handleLogin = () => {
  
      if (
        username === "admin" &&
        password === "admin123"
      ) {
        onLogin();
      } else {
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