import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Stack, Redirect } from "expo-router";
import AuthContext from "@/context/AuthContext";

const ProtextedLayout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Redirect href="/Login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtextedLayout;

const styles = StyleSheet.create({});
