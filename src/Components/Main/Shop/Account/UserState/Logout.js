import { Box, Title } from "@mantine/core";
import alertify from "alertifyjs";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../../../../Firebase-config";

export default function Logout({ children }) {
  const [user, loading, error] = useAuthState(auth);

  function warningNotifier(message) {
    alertify.set("notifier", "position", "top-center");
    alertify.warning(message, 2);
  }

  const logout = async () => {
    await signOut(auth);
    warningNotifier("Logged out of Peaceful Nature");
  };

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  return (
    <Box sx={{ width: "100%" }}>
      <div>
        <Title>
          Hi<b> {user?.displayName}!</b>
        </Title>
      </div>
      {children}
    </Box>
  );
}
