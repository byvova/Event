import React from "react";
import { View, Text, Pressable } from "react-native";

export function BottomActionBar({
  currentStep,
  onBack,
  onNext,
  onSubmit,
  theme,
  insets,
}) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: insets.bottom + 16,
        borderTopWidth: 1,
        borderTopColor: theme.colors.cardBorder,
      }}
    >
      <View style={{ flexDirection: "row", gap: 12 }}>
        {currentStep > 1 && (
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.cardBackground,
              borderWidth: 1,
              borderColor: theme.colors.cardBorder,
              borderRadius: 12,
              paddingVertical: 16,
              paddingHorizontal: 24,
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={onBack}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.text,
              }}
            >
              Back
            </Text>
          </Pressable>
        )}

        <Pressable
          style={({ pressed }) => ({
            flex: 1,
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={currentStep === 4 ? onSubmit : onNext}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#FFFFFF",
            }}
          >
            {currentStep === 4 ? "Submit Application" : "Continue"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
