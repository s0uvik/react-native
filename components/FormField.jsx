import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={` space-y-2 ${otherStyle}`}>
      <Text className=" text-base text-gray-100 font-pmedium">{title}</Text>
      <View className=" flex-row border-2 w-full h-16 px-4 bg-black-100 rounded-2xl border-black-200 focus:border-secondary items-center">
        <TextInput
          className=" flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        ></TextInput>

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
