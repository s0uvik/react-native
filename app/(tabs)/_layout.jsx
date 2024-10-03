import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className=" items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? " font-psemibold" : " font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const tabs = ["home", "bookmark", "create", "profile"];

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 60,
          },
        }}
      >
        {tabs.map((item) => {
          const capItem = item.charAt(0).toUpperCase() + item.slice(1);
          return (
            <Tabs.Screen
              key={item}
              name={item}
              options={{
                title: capItem,
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={item === "create" ? icons.plus : icons[item]}
                    color={color}
                    name={capItem}
                    focused={focused}
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
