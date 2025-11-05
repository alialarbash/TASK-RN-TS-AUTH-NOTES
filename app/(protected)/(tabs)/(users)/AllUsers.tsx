import { ScrollView, StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import colors from "../../../../data/styling/colors";
import UserProfileCard from "../../../../components/UserProfileCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/auth";

const Users = () => {
  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (isPending) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
        }}
      >
        <ActivityIndicator size={64} color={colors.white} />
      </View>
    );
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.primary }}>
      {data?.map((user: any) => (
        <UserProfileCard
          key={user._id}
          imageUrl={user.image}
          email={user.email}
          username={user.name}
        />
      ))}
      {/* <UserProfileCard
        imageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        email="test@test.com"
        username="test"
      /> */}
    </ScrollView>
  );
};

export default Users;

const styles = StyleSheet.create({});
