import React from "react";
import { Pressable, Text } from "react-native";

export function SelectableChip({ label, isSelected, onPress, theme }) {
  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: isSelected
          ? theme.colors.primary
          : theme.colors.cardBackground,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
        opacity: pressed ? 0.7 : 1,
        ...theme.colors.shadow,
      })}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color: isSelected ? "#FFFFFF" : theme.colors.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
