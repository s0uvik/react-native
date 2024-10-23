import { Image, Text, View } from "react-native"; // Core React Native components.
import React from "react";
import PropTypes from "prop-types"; // Used for type-checking props.
import { Tabs } from "expo-router"; // 'Tabs' is used for tab-based navigation in Expo.

import { icons } from "../../constants"; // Importing icon assets for the tab icons.

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center">
      {/* Image component to display the tab icon. The tintColor is applied via the 'color' prop. */}
      <Image
        source={icon} // Icon source passed as a prop.
        resizeMode="contain" // Ensures the icon fits within the bounds without distortion.
        tintColor={color} // Color applied to the icon (based on whether the tab is active or inactive).
        className="w-6 h-6" // Utility classes for width and height.
      />

      {/* Text label for the tab, styled differently when the tab is focused. */}
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} // Apply bold or regular font based on whether the tab is focused.
        style={{ color: color }} // The text color is dynamically set based on the active state.
      >
        {name}
      </Text>
    </View>
  );
};

// Add PropTypes validation for TabIcon to ensure correct prop types are passed.
TabIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired, // Ensures icon prop is either an object (for asset) or a number (for require statement).
  color: PropTypes.string.isRequired, // Color for the icon and label text.
  name: PropTypes.string.isRequired, // Name of the tab, displayed under the icon.
  focused: PropTypes.bool.isRequired, // Boolean to determine if the tab is currently focused/active.
};

const tabs = ["home", "create", "profile"]; // Define the tabs (routes) for the bottom tab navigation.

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false, // Disable default tab labels, custom label (Text component) is used inside TabIcon.
          tabBarActiveTintColor: "#FFA001", // Active tab icon and label color.
          tabBarInactiveTintColor: "#CDCDE0", // Inactive tab icon and label color.
          tabBarStyle: {
            backgroundColor: "#161622", // Background color for the tab bar.
            borderTopWidth: 1, // Add top border to the tab bar.
            borderTopColor: "#232533", // Color for the top border.
            height: 60, // Set tab bar height.
          },
        }}
      >
        {tabs.map((item) => {
          // Map through each tab to create a Tab.Screen.
          const capItem = item.charAt(0).toUpperCase() + item.slice(1); // Capitalize the first letter of each tab name.
          return (
            <Tabs.Screen
              key={item} // Key is the unique name of the tab.
              name={item} // Name of the screen/tab route.
              options={{
                title: capItem, // Title displayed on the screen (if headers were shown).
                headerShown: false, // Disable screen header for tabs.
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={item === "create" ? icons.plus : icons[item]} // Display 'plus' icon for the 'create' tab, and respective icons for other tabs.
                    color={color} // The color for the icon and label (based on active/inactive state).
                    name={capItem} // The capitalized tab name displayed below the icon.
                    focused={focused} // Boolean to indicate if the tab is focused (active).
                  />
                ),
              }}
            />
          );
        })}
      </Tabs>
    </>
  );
};

export default TabsLayout;
