import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native"; // Core React Native components.
import { SafeAreaView } from "react-native-safe-area-context"; // Ensures content respects the safe areas of the screen.
import { StatusBar } from "expo-status-bar"; // Allows customization of the status bar appearance.

import { images } from "../../constants"; // Importing image assets (e.g., logo).
import SearchInput from "../../components/SearchInput"; // Custom search input component.
import Trending from "../../components/Trending"; // Custom component to display trending videos.
import EmptyState from "../../components/EmptyState"; // Custom component to display when no data is available.
import { getAllPosts, getLatestPosts } from "../../lib/appwrite"; // Fetching posts from the backend (Appwrite).
import useAppwrite from "../../lib/useAppwrite"; // Custom hook to manage fetching and caching from Appwrite.
import VideoCard from "../../components/VideoCard"; // Custom component to display individual videos.

import { useGlobalContext } from "../../context/GlobalProvider"; // Accessing global context for shared state (e.g., user info).

const Home = () => {
  const [refreshing, setRefreshing] = useState(false); // State to manage the "pull-to-refresh" action.

  const { user } = useGlobalContext(); // Access the logged-in user's information from global context.

  const { data: posts, refetch } = useAppwrite(getAllPosts); // Fetch all posts using a custom hook.
  const { data: latestPosts } = useAppwrite(getLatestPosts); // Fetch latest posts.

  const onRefresh = async () => {
    // Function to handle the refresh action (pull-to-refresh).
    setRefreshing(true); // Start the refreshing state.
    await refetch(); // Re-fetch the posts.
    setRefreshing(false); // End the refreshing state.
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* SafeAreaView ensures that the content fits within safe area boundaries. */}

      <FlatList
        data={posts} // The data for the FlatList (the list of posts).
        keyExtractor={(item) => item.$id} // Unique key for each item in the list, using Appwrite's item ID.
        renderItem={({ item }) => (
          <View key={item.$id}>
            <VideoCard video={item} />{" "}
            {/* Renders each video using the custom VideoCard component. */}
          </View>
        )}
        ListHeaderComponent={() => {
          // Content at the top of the FlatList.
          return (
            <View className=" my-6 px-4 space-y-6">
              <View className=" justify-between items-start flex-row mb-3">
                {/* Display a welcome message and the user's name. */}
                <View>
                  <Text className=" font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className=" text-2xl font-pmedium text-white">
                    {user?.username}{" "}
                    {/* Display the username of the logged-in user. */}
                  </Text>
                </View>
                <View>
                  <Image
                    source={images.logoSmall} // Logo image.
                    className=" w-9 h-10"
                    resizeMethod="contain" // Ensures the image is resized correctly.
                  />
                </View>
              </View>
              <SearchInput /> {/* Search input component. */}
              {/* Latest videos section */}
              <View className=" w-full flex-1 pt-3 pb-6">
                <Text className=" text-gray-100 font-psemibold text-lg mb-3">
                  Latest Videos
                </Text>
                <Trending posts={latestPosts ?? []} />{" "}
                {/* Trending component to display latest videos. */}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          // Display this when no data is available (i.e., the list is empty).
          return (
            <EmptyState
              title="No videos Found"
              subtitle="Be the first one to upload a video"
            />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // Enables pull-to-refresh functionality.
        }
      />

      <StatusBar backgroundColor="#161622" style="light" />
      {/* Customizing the status bar background color and text style to match the app's theme. */}
    </SafeAreaView>
  );
};

export default Home;
