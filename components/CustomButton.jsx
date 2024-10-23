import { TouchableOpacity, Text } from "react-native"; // Core React Native components for touchable areas and text.
import React from "react";
import PropTypes from "prop-types"; // PropTypes for type-checking props passed to the component.

const CustomButton = ({
  title, // The text displayed on the button.
  handlePress, // Function to be called when the button is pressed.
  containerStyle, // Custom styles applied to the button container.
  textStyle, // Custom styles applied to the text inside the button.
  isLoading, // Boolean to indicate whether the button is in a loading state (disables the button and reduces opacity).
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress} // Trigger the provided press handler function when the button is pressed.
      activeOpacity={0.7} // Set the opacity of the button when it's pressed (for visual feedback).
      className={` bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading && " opacity-50" // Apply a reduced opacity when the button is in the loading state.
      }`}
      disabled={isLoading} // Disable the button when in a loading state to prevent additional presses.
    >
      <Text className={` text-primary font-psemibold text-lg ${textStyle}`}>
        {title} {/* Display the button's title text */}
      </Text>
    </TouchableOpacity>
  );
};

// Define PropTypes for CustomButton
CustomButton.propTypes = {
  title: PropTypes.string.isRequired, // The title must be a string and is required.
  handlePress: PropTypes.func.isRequired, // handlePress must be a function and is required.
  containerStyle: PropTypes.oneOfType([
    // containerStyle can be an object or an array of objects (for styling).
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  textStyle: PropTypes.string.isRequired, // textStyle must be a string and is required.
  isLoading: PropTypes.bool, // isLoading is optional and must be a boolean if provided.
};

export default CustomButton;
