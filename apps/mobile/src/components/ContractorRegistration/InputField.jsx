import React from "react";
import { View, Text, TextInput } from "react-native";

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  required = true,
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
        {label} {required && <Text style={{ color: theme.colors.red }}>*</Text>}
      </Text>
      <TextInput
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 12,
          padding: 16,
          fontFamily: "Inter_400Regular",
          fontSize: 16,
          color: theme.colors.text,
          borderWidth: 1,
          borderColor: theme.colors.cardBorder,
          minHeight: multiline ? 100 : "auto",
          textAlignVertical: multiline ? "top" : "center",
          ...theme.colors.shadow,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType={keyboardType}
        multiline={multiline}
        autoCorrect={false}
        autoCapitalize="words"
        blurOnSubmit={false}
      />
    </View>
  );
}
