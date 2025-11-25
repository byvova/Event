import React from "react";
import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../utils/theme";

export default function ScreenContainer({
  children,
  scrollable = true,
  centered = false,
  showsVerticalScrollIndicator = false,
  contentContainerStyle,
  style,
  ...props
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const defaultContentStyle = {
    paddingTop: insets.top + 40,
    paddingHorizontal: 16,
    paddingBottom: 120,
    ...(centered && {
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100%",
    }),
  };

  const mergedContentStyle = {
    ...defaultContentStyle,
    ...contentContainerStyle,
  };

  return (
    <View
      style={[{ flex: 1, backgroundColor: theme.colors.background }, style]}
    >
      <StatusBar style={theme.colors.statusBarStyle} />

      {scrollable ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={mergedContentStyle}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          {...props}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={mergedContentStyle}>{children}</View>
      )}
    </View>
  );
}
