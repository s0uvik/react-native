import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { StatusBar } from "expo-status-bar";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { searchPosts } from "../../lib/appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View key={item.$id}>
            <VideoCard video={item} />
          </View>
        )}
        ListHeaderComponent={() => {
          return (
            <View className=" my-6 px-4">
              <Text className=" font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className=" text-2xl font-pmedium text-white">{query}</Text>
              <View className=" mt-6 mb-8">
                <SearchInput initialQuery={query} />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No videos Found"
              subtitle="No video found for this search query"
            />
          );
        }}
      />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Search;
