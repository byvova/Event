import React from "react";
import { View, Text, Pressable } from "react-native";
import { ArrowLeft } from "lucide-react-native";

export function RegistrationHeader({ currentStep, onBack, theme, insets }) {
  return (
    <View
      style={{
        paddingTop: insets.top + 16,
        paddingHorizontal: 20,
        paddingBottom: 16,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.cardBorder,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 12,
            padding: 8,
            marginRight: 16,
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={onBack}
        >
          <ArrowLeft size={20} color={theme.colors.text} />
        </Pressable>

        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: theme.colors.text,
            flex: 1,
          }}
        >
          Contractor Registration
        </Text>
      </View>
    </View>
  );
}
