import { Container, Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const Logout = (props: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing tokens, user data, etc.
    localStorage.clear();
    router.push("/"); // Redirect to login page after logout
  };
  return (
    <div>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",

            padding: "1rem 0",
          }}
        >
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Logout;
