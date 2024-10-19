import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../../components/EmptyState";
import { StatusBar } from "expo-status-bar";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { getUserPosts, signOut } from "../../lib/appwrite";

import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
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
            <View className=" w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className=" w-full items-end mb-6"
                onPress={handleLogout}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className=" w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <InfoBox
                title={user?.username}
                containerStyle="mt-5"
                titleStyle="text-lg"
              />
              <View className="flex-row">
                <InfoBox
                  title={posts?.length || 0}
                  subTitle="Posts"
                  containerStyle="mr-10"
                  titleStyle="text-xl"
                />
                <InfoBox
                  title="1.2k"
                  subTitle="Followers"
                  titleStyle="text-xl"
                />
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

export default Profile;
