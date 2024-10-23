import React from "react";
import { Redirect, router } from "expo-router"; // 'expo-router' is used for navigation in Expo apps.
import { StatusBar } from "expo-status-bar"; // 'StatusBar' from Expo to control the status bar appearance on mobile.
import { Image, ScrollView, Text, View } from "react-native"; // Importing core React Native components.
import { SafeAreaView } from "react-native-safe-area-context"; // Ensures content stays within the safe area boundaries (like around the notch).

import { images } from "../constants"; // Importing images from a constants file (this likely holds references to assets).
import CustomButton from "../components/CustomButton"; // Custom button component.

import { useGlobalContext } from "../context/GlobalProvider"; // Access global context (for app-wide state).

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext(); // Accessing global state to check if the user is logged in or if data is still loading.

  // If the app is not loading and the user is logged in, redirect them to the '/home' route.
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className=" bg-primary h-full">
      {/* Using SafeAreaView to make sure content avoids areas like the notch or status bar. */}

      <ScrollView contentContainerStyle={{ height: "100%" }}>
        {/* ScrollView allows for vertical scrolling, useful for longer content. 
            'contentContainerStyle' ensures the full height is used. */}
        <View className=" w-full justify-center items-center min-h-[90vh] px-4">
          {/* View component used for layout. className comes from Tailwind or a similar utility class library, defining layout and styles. */}

          <Image
            source={images.logo} // 'source' defines the image to display, pulled from the 'images' object.
            className=" w-[130px] h-[84px]" // Using utility classes to set width and height.
            resizeMode="contain" // 'resizeMode' ensures the image fits within the specified width and height without being stretched.
          />
          <Image
            source={images.cards}
            className=" max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className=" relative mt-5">
            {/* Relative positioning is used here to allow the next Image to be positioned absolutely within this View. */}
            <Text className=" text-3xl text-white font-bold text-center">
              Discover Endless Possibility with{" "}
              <Text className=" text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className=" w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className=" text-xs font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/sign-in"); // Navigates to the sign-in page when the button is pressed.
            }}
            containerStyle=" w-full mt-7" // Style passed to the button's container.
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
      {/* 'StatusBar' to control the appearance of the status bar. Here it sets the background color and text style. */}
    </SafeAreaView>
  );
}
