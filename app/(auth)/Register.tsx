import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../../data/styling/colors";
import { useMutation } from "@tanstack/react-query";
import UserInfo from "@/types/UserInfo";
import { register } from "@/api/auth";
import { useRouter } from "expo-router";
import * as imagePicker from "expo-image-picker";
import { storeToken } from "@/api/storage";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { setIsAuthenticated } = useContext(AuthContext);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await imagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to upload images!");
        return;
      }
    }

    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: async () => {
      return await register({ email, password }, image || "", name);
    },
    onSuccess: async (data) => {
      await storeToken(data.token);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      console.log(error);
      setIsAuthenticated(false);
    },
  });

  const handleRegister = () => {
    if (email && password && image && name) {
      mutate();
    } else {
      alert("Please fill in all fields");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", padding: 20 }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Register
          </Text>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Create your account
          </Text>

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onChangeText={setName}
            value={name}
            autoCapitalize="none"
            placeholder="Name"
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
          />

          <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150, borderRadius: 100 }}
              />
            ) : (
              <Text style={{ color: colors.white, fontSize: 16 }}>
                Upload Profile Image
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={() => {
              handleRegister();
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center" }}
            onPress={() => {
              router.push("/Login");
            }}
          >
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Already have an account?{" "}
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({});
