import { Alert, Image, ScrollView, Text, View } from "react-native"; // Core React Native components.
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; // SafeAreaView ensures content is within safe bounds (like around the notch).
import { Link, router } from "expo-router"; // 'Link' for navigation and 'router' for programmatic navigation.

import { images } from "../../constants"; // Importing image assets, such as logos.
import FormField from "../../components/FormField"; // Custom form field component.
import CustomButton from "../../components/CustomButton"; // Custom button component.
import { createUser, getCurrentUser } from "../../lib/appwrite"; // Functions for creating a user and fetching the current user from Appwrite backend.
import { useGlobalContext } from "../../context/GlobalProvider"; // Global context for managing app-wide state.

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  }); // useState to manage form fields (username, email, and password).

  const [isSubmitting, setIsSubmitting] = useState(false); // useState to manage the submission state (loading).
  const { setUser, setIsLoggedIn } = useGlobalContext(); // Global context methods to set user and login status.

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      // Check if all form fields are filled in, if not show an error alert.
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsSubmitting(true); // Set loading state when the form is being submitted.

    try {
      await createUser(form.email, form.password, form.username); // Attempt to create a new user using the Appwrite API.

      const result = await getCurrentUser(); // After successful sign up, get the current user's details.
      setUser(result); // Set the current user in the global context.
      setIsLoggedIn(true); // Update global login state to true.

      router.push("/home"); // Redirect to the home screen after successful sign up.
    } catch (error) {
      Alert.alert("Error", error.message); // Display an error alert if user creation fails.
    } finally {
      setIsSubmitting(false); // Reset the loading state after the form submission attempt.
    }
  };

  return (
    <SafeAreaView className=" bg-primary h-full">
      {/* SafeAreaView ensures the content respects the device's safe areas (like notches or status bar). */}

      <ScrollView>
        {/* ScrollView allows scrolling through the form, especially useful on smaller screens. */}

        <View className=" w-full justify-center h-full px-4 my-6">
          {/* Vertically centered view for the form content. */}

          <Image
            source={images.logo} // The logo image for the app.
            resizeMode="contain" // Ensures the image fits well without distortion.
            className=" w-[115px] h-[35px]"
          />

          <Text className=" text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          <FormField
            title="Username" // Input field for the username.
            value={form.username} // Binding the input value to the form state.
            handleChangeText={(e) => setForm({ ...form, username: e })} // Update the username in the form state.
            otherStyle="mt-7" // Additional margin-top styling.
            placeholder="Enter username" // Placeholder text for the input.
          />

          <FormField
            title="Email" // Input field for the email.
            value={form.email} // Binding the input value to the form state.
            handleChangeText={(e) => setForm({ ...form, email: e })} // Update the email in the form state.
            otherStyle="mt-7"
            keyboardType="email-address" // Specifies the email keyboard type for mobile devices.
            placeholder="Enter email"
          />

          <FormField
            title="Password" // Input field for the password.
            value={form.password} // Binding the input value to the form state.
            handleChangeText={(e) => setForm({ ...form, password: e })} // Update the password in the form state.
            otherStyle="mt-7"
            placeholder="Password"
          />

          <CustomButton
            title="Sign up" // Button for submitting the sign-up form.
            containerStyle="mt-7" // Additional margin-top styling.
            handlePress={submit} // Calls the submit function when the button is pressed.
            isLoading={isSubmitting} // Shows a loading indicator while the form is submitting.
          />

          <View className=" justify-center pt-5 flex-row gap-2">
            {/* Row for displaying a link to sign in if the user already has an account. */}
            <Text className=" text-md text-gray-100 font-pregular">
              Have an account?
            </Text>
            <Link
              className="text-md text-secondary font-psemibold"
              href="/sign-in" // Link to navigate to the sign-in screen.
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
