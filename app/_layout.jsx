import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";

// Import fonts using ES6 module syntax
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

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
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
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
