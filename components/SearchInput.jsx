import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";
import { router, usePathname } from "expo-router";
import PropTypes from "prop-types";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className=" flex-row border-2 w-full h-16 px-4 bg-black-100 rounded-2xl border-black-200 focus:border-secondary items-center space-x-4">
      <TextInput
        className="text-base mt-1 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      ></TextInput>

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          className=" w-5 h-5"
          resizeMethod="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

// Define PropTypes for SearchInput
SearchInput.propTypes = {
  initialQuery: PropTypes.string, // initialQuery is an optional string
};

export default SearchInput;
