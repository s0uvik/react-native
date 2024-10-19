import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      presentationStyle: "fullScreen",
      type:
        selectType === "video"
          ? ["video/mp4", "video/gif"]
          : ["image/png", "image/jpg", "image/jpeg"],
    });

    if (!result.canceled) {
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    }
  };

  const handleSubmit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("All fields are required");
    }
    setUploading(true);

    try {
      await createVideo({ ...form, userId: user.$id });

      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setUploading(false);
      setForm({ title: "", video: null, thumbnail: null, prompt: "" });
    }
  };
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView className=" px-4 my-6">
        <Text className=" text-2xl text-white font-psemibold">
          Upload Video
        </Text>
        <FormField
          title="Video Title"
          placeholder="Give your video title..."
          value={form.title}
          handleChangeText={(text) => setForm({ ...form, title: text })}
          otherStyle="mt-10"
        />
        <View className=" mt-6 space-y-2">
          <Text className=" text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-40 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className=" w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
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
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-60 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className=" w-full h-20 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-8 h-8"
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          placeholder="Prompt use to create this video"
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyle="mt-7"
        />
        <CustomButton
          title="Submit"
          containerStyle=" mt-7"
          handlePress={handleSubmit}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
