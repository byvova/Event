import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    isDark,
    colors: {
      // Background colors
      background: isDark ? "#121212" : "#F8F9FA",
      surface: isDark ? "#1E1E1E" : "#FFFFFF",
      surfaceElevated: isDark ? "#262626" : "#FFFFFF",

      // Text colors
      text: isDark ? "#FFFFFF" : "#1A1A1A",
      textSecondary: isDark ? "rgba(255, 255, 255, 0.70)" : "#6B7280",
      textMuted: isDark ? "rgba(255, 255, 255, 0.60)" : "#9CA3AF",

      // Card and component colors
      cardBackground: isDark ? "#1E1E1E" : "#FFFFFF",
      cardBorder: isDark ? "#2A2A2A" : "#E5E7EB",

      // Brand colors for LicenFind
      primary: isDark ? "#3B82F6" : "#2563EB", // Professional blue
      primarySoft: isDark ? "#1A1A1A" : "#F1F5F9",

      // Trust/verification colors
      verified: isDark ? "#10B981" : "#059669", // Green for verified
      warning: isDark ? "#F59E0B" : "#D97706", // Orange for pending
      danger: isDark ? "#EF4444" : "#DC2626", // Red for issues

      // Accent colors
      accent: isDark ? "#8B5CF6" : "#7C3AED",
      green: isDark ? "#10B981" : "#059669",
      blue: isDark ? "#3B82F6" : "#2563EB",
      orange: isDark ? "#F59E0B" : "#D97706",
      purple: isDark ? "#8B5CF6" : "#7C3AED",
      red: isDark ? "#EF4444" : "#DC2626",

      // Status bar
      statusBarStyle: isDark ? "light" : "dark",

      // Tab bar
      tabBarBackground: isDark ? "#1E1E1E" : "#FFFFFF",
      tabBarBorder: isDark ? "#2A2A2A" : "#E5E7EB",
      tabBarActive: isDark ? "#3B82F6" : "#2563EB",
      tabBarInactive: isDark ? "rgba(255, 255, 255, 0.60)" : "#6B7280",

      // Icon backgrounds
      iconBackground: {
        blue: isDark ? "#1E3A8A" : "#DBEAFE",
        green: isDark ? "#064E3B" : "#D1FAE5",
        orange: isDark ? "#92400E" : "#FED7AA",
        purple: isDark ? "#581C87" : "#E9D5FF",
        gray: isDark ? "#374151" : "#F3F4F6",
        verified: isDark ? "#064E3B" : "#D1FAE5",
      },

      // Shadows
      shadow: isDark
        ? {
            shadowColor: "transparent",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }
        : {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
          },

      // Heavy shadows for important elements
      heavyShadow: isDark
        ? {
            shadowColor: "transparent",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.15)",
          }
        : {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
          },
    },
  };

  return theme;
};
