import { TouchableOpacity, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={` bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading && " opacity-50"
      }`}
      disabled={isLoading}
    >
      <Text className={` text-primary font-psemibold text-lg ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Define PropTypes for CustomButton
CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
  containerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  textStyle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default CustomButton;
