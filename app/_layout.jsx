import { Slot, Stack } from "expo-router";
import { Text } from "react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }}></Stack.Screen>
    </Stack>
  );
};

export default RootLayout;
