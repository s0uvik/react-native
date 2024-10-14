import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

import { images } from "../constants";
import { router } from "expo-router";
import PropTypes from "prop-types";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className=" justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className=" text-2xl font-pmedium text-white">{title}</Text>
      <Text className=" font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton
        title="Create Video"
        containerStyle="w-full mt-4"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default EmptyState;
