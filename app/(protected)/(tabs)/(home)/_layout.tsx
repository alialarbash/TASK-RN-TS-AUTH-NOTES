import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../data/styling/colors";
import { Stack } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";

const HomeLayout = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.white,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => {
            return (
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity
                  onPress={async () => {
                    await deleteToken();
                    setIsAuthenticated(false);
                  }}
                >
                  <MaterialIcons name="logout" color={"#ff0f0f"} size={32} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="[noteId]"
        options={{
          title: "Note Details",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
