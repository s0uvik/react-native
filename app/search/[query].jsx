import { useLocalSearchParams } from "expo-router"; // Hook from expo-router to access query parameters.
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native"; // React Native core components for layout and text display.
import { SafeAreaView } from "react-native-safe-area-context"; // Ensures the content respects device safe areas.

import SearchInput from "../../components/SearchInput"; // Custom search input component.
import EmptyState from "../../components/EmptyState"; // Custom component to show when no data is found.
import { StatusBar } from "expo-status-bar"; // Expo component to control the device's status bar.
import useAppwrite from "../../lib/useAppwrite"; // Custom hook to interact with Appwrite (backend).
import VideoCard from "../../components/VideoCard"; // Custom component to display video information.
import { searchPosts } from "../../lib/appwrite"; // Function to search posts in Appwrite backend.

const Search = () => {
  const { query } = useLocalSearchParams(); // Retrieve query parameters (e.g., search terms) from the URL.

  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));
  // `useAppwrite` is a custom hook to fetch posts based on the search query.
  // `refetch` is used to reload the data when the query changes.

  useEffect(() => {
    refetch(); // Refetch the posts whenever the search query changes.
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* SafeAreaView ensures that the layout doesn't overlap the status bar or other system UI elements. */}
      <FlatList
        data={posts} // The data to display in the list (in this case, posts returned from the search).
        keyExtractor={(item) => item.$id} // Unique key for each item in the list (using Appwrite's unique ID).
        renderItem={({ item }) => (
          <View key={item.$id}>
            <VideoCard video={item} />{" "}
            {/* Rendering each video using a custom VideoCard component. */}
          </View>
        )}
        ListHeaderComponent={() => {
          // This renders content at the top of the list (before the video results).
          return (
            <View className="my-6 px-4">
              <Text className=" font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className=" text-2xl font-pmedium text-white">{query}</Text>
              {/* Displaying the search query. */}
              <View className=" mt-6 mb-8">
                <SearchInput initialQuery={query} />{" "}
                {/* Search input field for user interaction. */}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          // This renders when the search results are empty (no videos found).
          return (
            <EmptyState
              title="No videos Found"
              subtitle="No video found for this search query"
            />
          );
        }}
      />
      <StatusBar backgroundColor="#161622" style="light" />
      {/* StatusBar component for controlling the appearance of the status bar. */}
    </SafeAreaView>
  );
};

export default Search;
