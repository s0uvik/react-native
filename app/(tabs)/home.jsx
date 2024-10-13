import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { StatusBar } from "expo-status-bar";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
            <View className=" my-6 px-4 space-y-6">
              <View className=" justify-between items-start flex-row mb-3">
                <View>
                  <Text className=" font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className=" text-2xl font-pmedium text-white">
                    Souvik
                  </Text>
                </View>
                <View>
                  <Image
                    source={images.logoSmall}
                    className=" w-9 h-10"
                    resizeMethod="contain"
                  />
                </View>
              </View>
              <SearchInput />

              {/* latest video section */}
              <View className=" w-full flex-1 pt-3 pb-6">
                <Text className=" text-gray-100 font-psemibold text-lg mb-3">
                  Latest Videos
                </Text>
                <Trending posts={latestPosts ?? []} />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No videos Found"
              subtitle="Be the first one to upload a video"
            />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;
