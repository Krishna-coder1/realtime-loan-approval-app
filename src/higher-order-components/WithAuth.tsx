"use client";

import Logout from "@/components/Logout";
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
type Props = { children: ReactNode };
const WithAuth: React.FC<Props> = ({ children }) => {
  const [na, sna] = React.useState(true);
  React.useEffect(() => {
    if (btoa(localStorage.getItem("password") ?? "") !== "password") {
      sna(false);
    }
  }, []);
  return (
    <div>
      <div>
        <Logout />
        {!na ? (
          <div>
            <Typography variant="h6" component="div" sx={{ mb: 3 }}>
              You are not authorized to view this page
            </Typography>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default WithAuth;
