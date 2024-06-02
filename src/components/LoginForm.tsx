"use client";
import React, { FormEvent, useState } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Roles } from "@/enums/Roles";
type Props = {
  htmlHashProps: React.ReactElement;
};

const LoginForm = (props: Props) => {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (username !== Roles.VENDOR && username !== Roles.BFB) {
      alert("Incorrect username");
      return;
    }
    if (password !== "password") {
      alert("Incorrect password");
      return;
    }
    localStorage.setItem("username", username);
    localStorage.setItem("password", atob(password));
    router.push("/loan-request");
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            BFB Bank Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                {/* You can add a forgot password link here */}
              </Grid>
              <Grid item>{/* You can add a signup link here */}</Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      ;
    </div>
  );
};

export default LoginForm;
