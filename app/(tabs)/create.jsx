import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"; // Core React Native components.
import { SafeAreaView } from "react-native-safe-area-context"; // Ensures content respects device's safe areas (e.g., notches).
import { ResizeMode, Video } from "expo-av"; // Expo's Video component for playing videos with different resize modes.
import * as ImagePicker from "expo-image-picker"; // Expo's ImagePicker for selecting images and videos from the device's media library.

import FormField from "../../components/FormField"; // Custom form field component for input fields.
import CustomButton from "../../components/CustomButton"; // Custom button component.
import { icons } from "../../constants"; // Predefined icons used in the app.
import { router } from "expo-router"; // Expo router for programmatic navigation.
import { createVideo } from "../../lib/appwrite"; // Function for creating a video entry in Appwrite.
import { useGlobalContext } from "../../context/GlobalProvider"; // Global context to access user information.

const Create = () => {
  const { user } = useGlobalContext(); // Access current user information from global context.
  const [uploading, setUploading] = useState(false); // State to manage the uploading/loading process.
  const [form, setForm] = useState({
    title: "Test",
    video: null, // Initial video state is null, will be updated after selection.
    thumbnail: null, // Initial thumbnail state is null.
    prompt: "Test",
  });

  const openPicker = async (selectType) => {
    // Function to open the image or video picker based on the 'selectType' argument.
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images // Allow only image selection if 'selectType' is 'image'.
          : ImagePicker.MediaTypeOptions.Videos, // Allow only video selection if 'selectType' is 'video'.
      aspect: [4, 3], // Set aspect ratio for the picker.
      quality: 1, // Set quality of the media.
    });

    if (!result.canceled) {
      // If the user selects an image/video and doesn't cancel.
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] }); // Update video in form state.
      }
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] }); // Update thumbnail in form state.
      }
    }
  };

  const handleSubmit = async () => {
    // Form submission handler.
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      // Check if all form fields are filled in.
      return Alert.alert("All fields are required");
    }
    setUploading(true); // Set loading state to true while submitting.

    try {
      await createVideo({ ...form, userId: user.$id }); // Submit the form data to create a video.

      router.push("/home"); // Redirect to the home screen after successful submission.
    } catch (error) {
      Alert.alert("Error", error.message); // Show an error alert if submission fails.
    } finally {
      setUploading(false); // Reset the uploading state after submission.
      // Optionally, reset form fields after submission.
      // setForm({ title: "", video: null, thumbnail: null, prompt: "" });
    }
  };

  return (
    <SafeAreaView className=" bg-primary h-full">
      {/* SafeAreaView ensures that the content avoids system elements like the status bar and notch. */}

      <ScrollView className=" px-4 my-6">
        {/* ScrollView allows scrolling for cases where the form content exceeds screen height. */}

        <Text className=" text-2xl text-white font-psemibold">
          Upload Video
        </Text>

        <FormField
          title="Video Title" // Input field for the video title.
          placeholder="Give your video title..."
          value={form.title} // Bind form state to the input.
          handleChangeText={(text) => setForm({ ...form, title: text })} // Update title state on input change.
          otherStyle="mt-10"
        />

        <View className=" mt-6 space-y-2">
          <Text className=" text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {/* Button to trigger video picker. */}
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }} // If a video is selected, display it using the Expo Video component.
                className="w-full h-40 rounded-2xl"
                resizeMode={ResizeMode.COVER} // Resize mode for how the video fits inside the container.
              />
            ) : (
              <View className=" w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                {/* Placeholder view with upload icon for when no video is selected. */}
                <Image
                  source={icons.upload} // Upload icon.
                  resizeMode="contain" // Icon should fit within the container without being stretched.
                  className="w-10 h-10 "
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className=" mt-6 space-y-2">
          <Text className=" text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {/* Button to trigger image picker. */}
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }} // If a thumbnail is selected, display it.
                className="w-full h-60 rounded-2xl"
                resizeMode="cover" // Resize mode for how the image fits inside the container.
              />
            ) : (
              <View className=" w-full h-20 px-4 bg-black-100 rounded-2xl justify-center items-center">
                {/* Placeholder view with upload icon for when no image is selected. */}
                <Image
                  source={icons.upload} // Upload icon for the thumbnail.
                  resizeMode="contain"
                  className="w-8 h-8"
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt" // Input field for the AI prompt.
          placeholder="Prompt used to create this video"
          value={form.prompt} // Bind form state to the input.
          handleChangeText={(e) => setForm({ ...form, prompt: e })} // Update prompt state on input change.
          otherStyle="mt-7"
        />

        <CustomButton
          title="Submit" // Button for submitting the form.
          containerStyle=" mt-7"
          handlePress={handleSubmit} // Trigger form submission.
          isLoading={uploading} // Show loading state when submitting.
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
