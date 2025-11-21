import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Wrench,
  Search,
  ArrowRight,
  Shield,
  Star,
  Users,
  Globe,
} from "lucide-react-native";
import { useTheme } from "../utils/theme";
import { useLanguage } from "../utils/LanguageContext";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function WelcomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, changeLanguage, currentLanguage } = useLanguage();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleContractorPath = () => {
    // Navigate to contractor registration/signup
    router.push("/contractor-registration");
  };

  const handleCustomerPath = () => {
    // Navigate to customer services
    router.push("/(tabs)/home");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="dark" />

      {/* Background Image */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60%",
        }}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=800&fit=crop",
          }}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.1,
          }}
          contentFit="cover"
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: `${theme.colors.primary}15`,
          }}
        />
      </View>

      {/* Content */}
      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
        }}
      >
        {/* Language Switcher */}
        <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
          <Pressable
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              opacity: pressed ? 0.7 : 1,
              ...theme.colors.shadow,
            })}
            onPress={() =>
              changeLanguage(currentLanguage === "en" ? "uk" : "en")
            }
          >
            <Globe size={16} color={theme.colors.primary} />
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: theme.colors.text,
                marginLeft: 6,
              }}
            >
              {currentLanguage === "en" ? "EN" : "УК"}
            </Text>
          </Pressable>
        </View>

        {/* Logo and Title */}
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 24,
              padding: 16,
              marginBottom: 20,
              ...theme.colors.shadow,
            }}
          >
            <Wrench size={32} color="#FFFFFF" />
          </View>

          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 32,
              color: theme.colors.text,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {t("appName")}
          </Text>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: theme.colors.textSecondary,
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            {t("tagline")}
          </Text>
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 40,
            paddingVertical: 20,
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 16,
            ...theme.colors.shadow,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: theme.colors.iconBackground.verified,
                borderRadius: 20,
                padding: 8,
                marginBottom: 8,
              }}
            >
              <Shield size={16} color={theme.colors.verified} />
            </View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.text,
              }}
            >
              2,500+
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
              }}
            >
              {t("verifiedPros")}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: `${theme.colors.orange}20`,
                borderRadius: 20,
                padding: 8,
                marginBottom: 8,
              }}
            >
              <Star size={16} color={theme.colors.orange} />
            </View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.text,
              }}
            >
              4.9★
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
              }}
            >
              {t("avgRating")}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: `${theme.colors.blue}20`,
                borderRadius: 20,
                padding: 8,
                marginBottom: 8,
              }}
            >
              <Users size={16} color={theme.colors.blue} />
            </View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.text,
              }}
            >
              50K+
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
              }}
            >
              {t("happyCustomers")}
            </Text>
          </View>
        </View>

        {/* User Type Selection */}
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            {t("howCanWeHelp")}
          </Text>

          {/* Customer Option */}
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.primary,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              opacity: pressed ? 0.9 : 1,
              ...theme.colors.shadow,
            })}
            onPress={handleCustomerPath}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 12,
                  padding: 12,
                  marginRight: 16,
                }}
              >
                <Search size={24} color="#FFFFFF" />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 18,
                    color: "#FFFFFF",
                    marginBottom: 4,
                  }}
                >
                  {t("needService")}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {t("needServiceDesc")}
                </Text>
              </View>

              <ArrowRight size={20} color="#FFFFFF" />
            </View>
          </Pressable>

          {/* Contractor Option */}
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: theme.colors.primary,
              padding: 20,
              marginBottom: 32,
              opacity: pressed ? 0.7 : 1,
              ...theme.colors.shadow,
            })}
            onPress={handleContractorPath}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: theme.colors.primarySoft,
                  borderRadius: 12,
                  padding: 12,
                  marginRight: 16,
                }}
              >
                <Wrench size={24} color={theme.colors.primary} />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 18,
                    color: theme.colors.text,
                    marginBottom: 4,
                  }}
                >
                  {t("imContractor")}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {t("imContractorDesc")}
                </Text>
              </View>

              <ArrowRight size={20} color={theme.colors.primary} />
            </View>
          </Pressable>

          {/* Terms */}
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.colors.textMuted,
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            {t("termsAgree")}{" "}
            <Text style={{ color: theme.colors.primary }}>
              {t("termsOfService")}
            </Text>{" "}
            and{" "}
            <Text style={{ color: theme.colors.primary }}>
              {t("privacyPolicy")}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
