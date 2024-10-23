import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";

// Importing custom fonts to be used in the application.
// In React Native, we need to load fonts manually using expo-font.

import PoppinsBlack from "../assets/fonts/Poppins-Black.ttf";
import PoppinsBold from "../assets/fonts/Poppins-Bold.ttf";
import PoppinsExtraBold from "../assets/fonts/Poppins-ExtraBold.ttf";
import PoppinsExtraLight from "../assets/fonts/Poppins-ExtraLight.ttf";
import PoppinsLight from "../assets/fonts/Poppins-Light.ttf";
import PoppinsMedium from "../assets/fonts/Poppins-Medium.ttf";
import PoppinsRegular from "../assets/fonts/Poppins-Regular.ttf";
import PoppinsSemiBold from "../assets/fonts/Poppins-SemiBold.ttf";
import PoppinsThin from "../assets/fonts/Poppins-Thin.ttf";
import GlobalProvider from "../context/GlobalProvider";

// Prevent the splash screen from auto-hiding until fonts are loaded.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // Loading custom fonts using useFonts hook from 'expo-font'.
  // It returns an array where fontsLoaded is a boolean and error is the error state.
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": PoppinsBlack,
    "Poppins-Bold": PoppinsBold,
    "Poppins-ExtraBold": PoppinsExtraBold,
    "Poppins-ExtraLight": PoppinsExtraLight,
    "Poppins-Light": PoppinsLight,
    "Poppins-Medium": PoppinsMedium,
    "Poppins-Regular": PoppinsRegular,
    "Poppins-SemiBold": PoppinsSemiBold,
    "Poppins-Thin": PoppinsThin,
  });

  useEffect(() => {
    if (error) throw error; // Handle any errors that occur while loading fonts.

    if (fontsLoaded) {
      // Once fonts are loaded, hide the splash screen.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // If fonts haven't loaded and there's no error, return null (no UI is rendered).
  if (!fontsLoaded && !error) {
    return null;
  }

  // Stack.Navigator manages a stack-based navigation flow in the app.
  return (
    <GlobalProvider>
      {/* https://docs.expo.dev/router/advanced/stack/ */}
      <Stack>
        {/* Define different screens in the app using Stack.Screen.
            Each screen corresponds to a different part of the app's navigation.
            The 'headerShown: false' option hides the header for these screens. */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
