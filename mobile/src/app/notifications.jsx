import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Switch } from "react-native";
import {
  ArrowLeft,
  Bell,
  MessageCircle,
  Calendar,
  DollarSign,
  Star,
  AlertTriangle,
  Smartphone,
  Mail,
  BellRing,
  Volume2,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function NotificationSettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Notification settings state
  const [settings, setSettings] = useState({
    // Push Notifications
    pushNotifications: true,

    // Booking Related
    bookingConfirmations: true,
    bookingReminders: true,
    bookingUpdates: true,

    // Messages
    newMessages: true,

    // Payments
    paymentConfirmations: true,
    paymentReminders: false,

    // Reviews
    reviewRequests: true,
    reviewResponses: true,

    // Marketing
    promotions: false,
    newFeatures: true,
    contractorUpdates: true,

    // Emergency
    emergencyAlerts: true,

    // Delivery Methods
    emailNotifications: true,
    smsNotifications: false,

    // Timing
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",

    // Sounds & Vibration
    soundEnabled: true,
    vibrationEnabled: true,
  });

  if (!fontsLoaded) {
    return null;
  }

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const notificationCategories = [
    {
      title: "Booking Notifications",
      icon: Calendar,
      settings: [
        {
          key: "bookingConfirmations",
          title: "Booking Confirmations",
          description: "When your booking is confirmed by a contractor",
          value: settings.bookingConfirmations,
        },
        {
          key: "bookingReminders",
          title: "Booking Reminders",
          description: "Reminders before your scheduled service",
          value: settings.bookingReminders,
        },
        {
          key: "bookingUpdates",
          title: "Booking Updates",
          description: "Changes to your booking time or status",
          value: settings.bookingUpdates,
        },
      ],
    },
    {
      title: "Messages",
      icon: MessageCircle,
      settings: [
        {
          key: "newMessages",
          title: "New Messages",
          description: "When contractors send you messages",
          value: settings.newMessages,
        },
      ],
    },
    {
      title: "Payments",
      icon: DollarSign,
      settings: [
        {
          key: "paymentConfirmations",
          title: "Payment Confirmations",
          description: "When payments are processed successfully",
          value: settings.paymentConfirmations,
        },
        {
          key: "paymentReminders",
          title: "Payment Reminders",
          description: "Reminders for pending payments",
          value: settings.paymentReminders,
        },
      ],
    },
    {
      title: "Reviews & Ratings",
      icon: Star,
      settings: [
        {
          key: "reviewRequests",
          title: "Review Requests",
          description: "Requests to rate completed services",
          value: settings.reviewRequests,
        },
        {
          key: "reviewResponses",
          title: "Review Responses",
          description: "When contractors respond to your reviews",
          value: settings.reviewResponses,
        },
      ],
    },
    {
      title: "Emergency & Safety",
      icon: AlertTriangle,
      settings: [
        {
          key: "emergencyAlerts",
          title: "Emergency Service Alerts",
          description: "Critical updates for emergency services",
          value: settings.emergencyAlerts,
          required: true,
        },
      ],
    },
    {
      title: "Marketing & Updates",
      icon: BellRing,
      settings: [
        {
          key: "promotions",
          title: "Promotions & Offers",
          description: "Special deals and discounts",
          value: settings.promotions,
        },
        {
          key: "newFeatures",
          title: "New Features",
          description: "Updates about new app features",
          value: settings.newFeatures,
        },
        {
          key: "contractorUpdates",
          title: "Contractor Updates",
          description: "News from your favorite contractors",
          value: settings.contractorUpdates,
        },
      ],
    },
  ];

  const SettingItem = ({ setting, onToggle }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.cardBorder,
      }}
    >
      <View style={{ flex: 1, marginRight: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 16,
              color: theme.colors.text,
              marginRight: 8,
            }}
          >
            {setting.title}
          </Text>
          {setting.required && (
            <View
              style={{
                backgroundColor: theme.colors.red,
                borderRadius: 8,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 10,
                  color: "#FFFFFF",
                }}
              >
                REQUIRED
              </Text>
            </View>
          )}
        </View>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.colors.textSecondary,
            lineHeight: 20,
          }}
        >
          {setting.description}
        </Text>
      </View>

      <Switch
        value={setting.value}
        onValueChange={onToggle}
        trackColor={{
          false: theme.colors.cardBorder,
          true: theme.colors.primary + "40",
        }}
        thumbColor={setting.value ? theme.colors.primary : "#f4f3f4"}
        disabled={setting.required}
      />
    </View>
  );

  const CategorySection = ({ category }) => {
    const IconComponent = category.icon;

    return (
      <View
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          ...theme.colors.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.iconBackground.default,
              borderRadius: 10,
              padding: 8,
              marginRight: 12,
            }}
          >
            <IconComponent size={20} color={theme.colors.text} />
          </View>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
            }}
          >
            {category.title}
          </Text>
        </View>

        {category.settings.map((setting, index) => (
          <SettingItem
            key={setting.key}
            setting={setting}
            onToggle={(value) => updateSetting(setting.key, value)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
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
            onPress={() => router.back()}
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
            Notification Settings
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Master Toggle */}
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            ...theme.colors.shadow,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View
                style={{
                  backgroundColor: settings.pushNotifications
                    ? theme.colors.iconBackground.success
                    : theme.colors.iconBackground.default,
                  borderRadius: 10,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <Bell
                  size={20}
                  color={
                    settings.pushNotifications
                      ? theme.colors.green
                      : theme.colors.text
                  }
                />
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
                  Push Notifications
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {settings.pushNotifications
                    ? "All notifications enabled"
                    : "All notifications disabled"}
                </Text>
              </View>
            </View>

            <Switch
              value={settings.pushNotifications}
              onValueChange={(value) =>
                updateSetting("pushNotifications", value)
              }
              trackColor={{
                false: theme.colors.cardBorder,
                true: theme.colors.green + "40",
              }}
              thumbColor={
                settings.pushNotifications ? theme.colors.green : "#f4f3f4"
              }
            />
          </View>
        </View>

        {/* Notification Categories */}
        {settings.pushNotifications &&
          notificationCategories.map((category, index) => (
            <CategorySection key={index} category={category} />
          ))}

        {/* Delivery Methods */}
        {settings.pushNotifications && (
          <View
            style={{
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              ...theme.colors.shadow,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: theme.colors.iconBackground.default,
                  borderRadius: 10,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <Smartphone size={20} color={theme.colors.text} />
              </View>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: theme.colors.text,
                }}
              >
                Delivery Methods
              </Text>
            </View>

            <SettingItem
              setting={{
                title: "Email Notifications",
                description: "Receive important updates via email",
                value: settings.emailNotifications,
              }}
              onToggle={(value) => updateSetting("emailNotifications", value)}
            />

            <SettingItem
              setting={{
                title: "SMS Notifications",
                description: "Receive urgent updates via text message",
                value: settings.smsNotifications,
              }}
              onToggle={(value) => updateSetting("smsNotifications", value)}
            />
          </View>
        )}

        {/* Sound & Vibration */}
        {settings.pushNotifications && (
          <View
            style={{
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              ...theme.colors.shadow,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: theme.colors.iconBackground.default,
                  borderRadius: 10,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <Volume2 size={20} color={theme.colors.text} />
              </View>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: theme.colors.text,
                }}
              >
                Sound & Vibration
              </Text>
            </View>

            <SettingItem
              setting={{
                title: "Notification Sounds",
                description: "Play sounds for notifications",
                value: settings.soundEnabled,
              }}
              onToggle={(value) => updateSetting("soundEnabled", value)}
            />

            <SettingItem
              setting={{
                title: "Vibration",
                description: "Vibrate for notifications",
                value: settings.vibrationEnabled,
              }}
              onToggle={(value) => updateSetting("vibrationEnabled", value)}
            />
          </View>
        )}

        {/* Quiet Hours */}
        {settings.pushNotifications && (
          <View
            style={{
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              ...theme.colors.shadow,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: theme.colors.iconBackground.default,
                  borderRadius: 10,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <BellRing size={20} color={theme.colors.text} />
              </View>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: theme.colors.text,
                }}
              >
                Quiet Hours
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: theme.colors.text,
                    marginBottom: 4,
                  }}
                >
                  Enable Quiet Hours
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                  }}
                >
                  Reduce notifications during set hours
                </Text>
              </View>

              <Switch
                value={settings.quietHours}
                onValueChange={(value) => updateSetting("quietHours", value)}
                trackColor={{
                  false: theme.colors.cardBorder,
                  true: theme.colors.primary + "40",
                }}
                thumbColor={
                  settings.quietHours ? theme.colors.primary : "#f4f3f4"
                }
              />
            </View>

            {settings.quietHours && (
              <View
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color: theme.colors.textSecondary,
                      marginBottom: 4,
                    }}
                  >
                    Start
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 18,
                      color: theme.colors.text,
                    }}
                  >
                    {settings.quietStart}
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: theme.colors.textSecondary,
                  }}
                >
                  to
                </Text>

                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color: theme.colors.textSecondary,
                      marginBottom: 4,
                    }}
                  >
                    End
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 18,
                      color: theme.colors.text,
                    }}
                  >
                    {settings.quietEnd}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
