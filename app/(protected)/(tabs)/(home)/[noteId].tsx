import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../data/styling/colors";
import { useQuery } from "@tanstack/react-query";
import { getNote } from "@/api/notes";
import { useLocalSearchParams } from "expo-router";
const NoteDetails = () => {
  const { noteId } = useLocalSearchParams();
  const { data, isPending } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNote(noteId as string),
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
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: colors.secondary,
          padding: 20,
          borderRadius: 15,
          minHeight: 200,
          elevation: 5,
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          {data?.title}
          {/* {"Note Title"} */}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {data?.topic?.map((topic: string) => (
            <Text style={{ color: colors.white }}>{topic}</Text>
          ))}
          {/* <Text style={{ color: colors.white }}>{"Topic1"}</Text>
          <Text style={{ color: colors.white }}>{"Topic2"}</Text> */}
        </View>

        <Text
          style={{
            color: colors.white,
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          {/* {"Note Body"} */}
          {data?.body}
        </Text>
      </View>
    </View>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({});
