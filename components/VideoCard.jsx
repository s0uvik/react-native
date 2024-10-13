import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import PropTypes from "prop-types";

import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ video }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className=" flex-col items-center px-4 mb-14">
      <View className=" flex-row gap-3 items-start">
        <View className=" justify-center items-center flex-row flex-1">
          <View className=" w-[45px] h-[45px] rounded-lg border border-secondary justify-center items-center p-1">
            <Image
              source={{ uri: video.creator.avatar }}
              className=" w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className=" justify-center flex-1 ml-3 gap-y-1">
            <Text
              className=" text-white text-sm font-psemibold"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text className=" text-gray-100 text-xs font-pregular">
              {video.creator.username}
            </Text>
          </View>
        </View>
        <View className=" pt-2">
          <Image
            source={icons.menu}
            className=" w-5 h-5"
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video.video }}
          className=" w-full h-60 rounded-xl my-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Define PropTypes for validation
VideoCard.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default VideoCard;
