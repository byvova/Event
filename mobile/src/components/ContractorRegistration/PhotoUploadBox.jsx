import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Upload, X } from "lucide-react-native";

export function PhotoUploadBox({
  label,
  photo,
  onPress,
  type,
  updateFormData,
  theme,
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 16,
          color: theme.colors.text,
          marginBottom: 8,
        }}
      >
        {label}{" "}
        {type !== "profilePhoto" && (
          <Text style={{ color: theme.colors.red }}>*</Text>
        )}
      </Text>

      {photo ? (
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: photo.uri }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
              backgroundColor: theme.colors.cardBackground,
            }}
          />
          <Pressable
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: theme.colors.red,
              borderRadius: 12,
              width: 24,
              height: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => updateFormData(type, null)}
          >
            <X size={12} color="#FFFFFF" />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 12,
            padding: 32,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            borderStyle: "dashed",
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={onPress}
        >
          <View
            style={{
              backgroundColor: theme.colors.primarySoft,
              borderRadius: 20,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <Upload size={24} color={theme.colors.primary} />
          </View>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.colors.text,
              textAlign: "center",
            }}
          >
            Tap to upload
          </Text>
        </Pressable>
      )}
    </View>
  );
}
