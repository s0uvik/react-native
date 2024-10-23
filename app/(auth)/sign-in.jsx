import { Alert, Image, ScrollView, Text, View } from "react-native"; // Core React Native components.
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; // Ensures the content respects the safe areas on mobile devices.

import { images } from "../../constants"; // Importing images (likely logos and other assets).
import FormField from "../../components/FormField"; // Custom form field component.
import CustomButton from "../../components/CustomButton"; // Custom button component.
import { Link, router } from "expo-router"; // 'Link' for navigation and 'router' for programmatic navigation.
import { getCurrentUser, signIn } from "../../lib/appwrite"; // Functions for authentication using Appwrite.
import { useGlobalContext } from "../../context/GlobalProvider"; // Custom context for global app state.

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  }); // useState hook for managing form input data (email and password).

  const [isSubmitting, setIsSubmitting] = useState(false); // useState to manage loading state when submitting.
  const { setUser, setIsLoggedIn } = useGlobalContext(); // Global context to set user and login state.

  const submit = async () => {
    if (!form.email || !form.password) {
      // Alert is a native way to show alerts or prompts in React Native apps.
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true); // Set the loading state when the form is being submitted.

    try {
      await signIn(form.email, form.password); // Attempt to sign in using the email and password provided.
      const result = await getCurrentUser(); // Retrieve the current logged-in user's data.
      setUser(result); // Set the user in global context.
      setIsLoggedIn(true); // Update global state to reflect the login status.

      router.replace("/home"); // Redirect to the home screen after successful login.
    } catch (error) {
      Alert.alert("Error", error.message); // Show an error message if login fails.
    } finally {
      setIsSubmitting(false); // Turn off the loading state after submission attempt.
    }
  };

  return (
    <SafeAreaView className=" bg-primary h-full">
      {/* SafeAreaView ensures content fits within the visible area of the screen (avoiding notches, etc.). */}

      <ScrollView>
        {/* ScrollView allows the user to scroll through the form, helpful on smaller screens. */}

        <View className=" w-full justify-center h-[80vh] px-4 my-6">
          {/* A container for the form fields and content, vertically centered with padding. */}

          <Image
            source={images.logo} // Using the imported logo image.
            resizeMode="contain" // Ensures the image fits without distortion.
            className=" w-[115px] h-[35px]"
          />

          <Text className=" text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email" // Form input for email.
            value={form.email} // Binding form state to the input field.
            handleChangeText={(e) => setForm({ ...form, email: e })} // Update form state on change.
            otherStyle="mt-7" // Additional styling for margin-top.
            keyboardType="email-address" // Specifies the keyboard type for email input.
            placeholder="Enter email"
          />

          <FormField
            title="Password" // Form input for password.
            value={form.password} // Binding form state to the input field.
            handleChangeText={(e) => setForm({ ...form, password: e })} // Update form state on change.
            otherStyle="mt-7" // Additional styling for margin-top.
            placeholder="Password" // Placeholder text for the input field.
          />

          <CustomButton
            title="Sign in" // Button for submitting the form.
            containerStyle="mt-7" // Margin applied to the button.
            handlePress={submit} // Calls the submit function when pressed.
            isLoading={isSubmitting} // Shows a loading state when the form is submitting.
          />

          <View className=" justify-center pt-5 flex-row gap-2">
            {/* A row with text and a link for navigating to the sign-up page. */}
            <Text className=" text-md text-gray-100 font-pregular">
              Don&apos;t have account?
            </Text>
            <Link
              className="text-md text-secondary font-psemibold"
              href="/sign-up" // Navigates to the sign-up screen.
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
