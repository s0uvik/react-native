import React from "react";
import { Stack } from "expo-router"; // 'Stack' is used to create a stack-based navigation flow in the app.
import { StatusBar } from "expo-status-bar"; // 'StatusBar' component to manage the status bar appearance.

const AuthLayout = () => {
  return (
    <>
      <Stack>
        {/* Stack.Screen is used to define each screen in the stack. 
            These screens represent different routes in the authentication flow. */}
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false, // Hides the header for the sign-in screen.
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false, // Hides the header for the sign-up screen.
          }}
        />
      </Stack>

      {/* StatusBar component to control the appearance of the device's status bar. 
          The background color is set to a dark shade, and the text/icons are light. */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
