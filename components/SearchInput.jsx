import { Image, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className=" flex-row border-2 w-full h-16 px-4 bg-black-100 rounded-2xl border-black-200 focus:border-secondary items-center space-x-4">
      <TextInput
        className="text-base mt-1 text-white flex-1 font-pregular"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      ></TextInput>

      <TouchableOpacity>
        <Image
          source={icons.search}
          className=" w-5 h-5"
          resizeMethod="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
