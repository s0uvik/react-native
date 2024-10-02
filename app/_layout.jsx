import { Slot, Stack } from "expo-router";
import { Text } from "react-native";

const RootLayout = () => {
  return (
    // <>
    //   <Text>Header</Text>
    //   <Slot />
    //   <Text>Footer</Text>
    // </>
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};

export default RootLayout;
