import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native"; // Core React Native components.
import { SafeAreaView } from "react-native-safe-area-context"; // Ensures content fits within the safe areas of the screen.
import { StatusBar } from "expo-status-bar"; // Allows customization of the status bar appearance.

import EmptyState from "../../components/EmptyState"; // Custom component to display when no data is available.
import useAppwrite from "../../lib/useAppwrite"; // Custom hook to fetch data from Appwrite backend.
import VideoCard from "../../components/VideoCard"; // Custom component to display individual videos.
import { getUserPosts, signOut } from "../../lib/appwrite"; // Function to get user posts and sign out from Appwrite.
import { useGlobalContext } from "../../context/GlobalProvider"; // Access global context to manage user state.
import { icons } from "../../constants"; // Predefined icons used in the app.
import InfoBox from "../../components/InfoBox"; // Custom component for displaying information (username, stats).
import { router } from "expo-router"; // Expo router for programmatic navigation.

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext(); // Access the current user and global state management.

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id)); // Fetch the current user's posts from Appwrite.

  const handleLogout = async () => {
    // Function to handle user logout.
    await signOut(); // Call the sign-out function to log the user out.
    setUser(null); // Clear the user data in global state.
    setIsLoggedIn(false); // Set the global logged-in state to false.
    router.replace("/sign-in"); // Navigate to the sign-in screen after logging out.
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* SafeAreaView ensures that the content fits within the safe area boundaries. */}

      <FlatList
        data={posts} // The data for the FlatList (list of user's posts).
        keyExtractor={(item) => item.$id} // Unique key for each item in the list, using Appwrite's item ID.
        renderItem={({ item }) => (
          <View key={item.$id}>
            <VideoCard video={item} />{" "}
            {/* Render each video using the VideoCard component. */}
          </View>
        )}
        ListHeaderComponent={() => {
          // Render content at the top of the FlatList (user info).
          return (
            <View className=" w-full justify-center items-center mt-6 mb-12 px-4">
              {/* Logout button */}
              <TouchableOpacity
                className=" w-full items-end mb-6"
                onPress={handleLogout} // Trigger the logout function on press.
              >
                <Image
                  source={icons.logout} // Logout icon.
                  resizeMode="contain" // Ensure the icon fits without being stretched.
                  className="w-6 h-6"
                />
              </TouchableOpacity>

              {/* User Avatar */}
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }} // Display the user's avatar from the URI.
                  className=" w-[90%] h-[90%] rounded-lg" // Style for the avatar image.
                  resizeMode="cover" // Resize mode to cover the full container.
                />
              </View>

              {/* Username and additional information */}
              <InfoBox
                title={user?.username} // Display the username.
                containerStyle="mt-5"
                titleStyle="text-lg"
              />
              <View className="flex-row">
                {/* Number of posts */}
                <InfoBox
                  title={posts?.length || 0} // Display the number of posts (or 0 if undefined).
                  subTitle="Posts" // Subtitle for posts.
                  containerStyle="mr-10"
                  titleStyle="text-xl"
                />
                {/* Placeholder for followers */}
                <InfoBox
                  title="1.2k" // Placeholder value for followers.
                  subTitle="Followers" // Subtitle for followers.
                  titleStyle="text-xl"
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          // Display this component when there are no posts.
          return (
            <EmptyState
              title="No videos Found" // Message displayed when no videos are available.
              subtitle="No video found for this search query" // Subtitle message for the empty state.
            />
          );
        }}
      />

      {/* StatusBar customization */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
