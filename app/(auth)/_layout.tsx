import AuthContext from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export default function AuthLayout() {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
