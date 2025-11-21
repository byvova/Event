import React, { useState } from "react";
import { View, Text, Pressable, Image, Switch } from "react-native";
import {
  User,
  Settings,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  MapPin,
} from "lucide-react-native";
import ScreenContainer from "../../components/ScreenContainer";
import { useTheme } from "../../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function ProfileScreen() {
  const theme = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const userProfile = {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    memberSince: "March 2024",
    totalBookings: 12,
    averageRating: 4.8,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          id: "edit-profile",
          label: "Edit Profile",
          icon: User,
          color: theme.colors.blue,
          hasChevron: true,
        },
        {
          id: "payment-methods",
          label: "Payment Methods",
          icon: CreditCard,
          color: theme.colors.green,
          hasChevron: true,
        },
        {
          id: "notifications",
          label: "Notifications",
          icon: Bell,
          color: theme.colors.orange,
          hasSwitch: true,
          switchValue: notificationsEnabled,
          onSwitchChange: setNotificationsEnabled,
        },
      ],
    },
    {
      title: "Security & Privacy",
      items: [
        {
          id: "privacy-settings",
          label: "Privacy Settings",
          icon: Shield,
          color: theme.colors.purple,
          hasChevron: true,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          id: "help-center",
          label: "Help Center",
          icon: HelpCircle,
          color: theme.colors.blue,
          hasChevron: true,
        },
      ],
    },
    {
      title: "Account Actions",
      items: [
        {
          id: "logout",
          label: "Log Out",
          icon: LogOut,
          color: theme.colors.red,
          hasChevron: false,
        },
      ],
    },
  ];

  const StatCard = ({ label, value, icon: IconComponent }) => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        flex: 1,
        alignItems: "center",
        ...theme.colors.shadow,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.primarySoft,
          borderRadius: 20,
          padding: 8,
          marginBottom: 8,
        }}
      >
        <IconComponent size={20} color={theme.colors.primary} />
      </View>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: theme.colors.text,
          marginBottom: 4,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: theme.colors.textSecondary,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </View>
  );

  const MenuItem = ({ item }) => {
    const IconComponent = item.icon;

    return (
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 12,
          padding: 16,
          marginBottom: 8,
          flexDirection: "row",
          alignItems: "center",
          opacity: pressed ? 0.7 : 1,
          ...theme.colors.shadow,
        })}
        onPress={() => {
          if (item.id === "logout") {
            // Handle logout
            console.log("Logout pressed");
          } else {
            // Handle other menu items
            console.log(`${item.id} pressed`);
          }
        }}
      >
        <View
          style={{
            backgroundColor: `${item.color}15`,
            borderRadius: 8,
            padding: 8,
            marginRight: 12,
          }}
        >
          <IconComponent size={20} color={item.color} />
        </View>

        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            color: theme.colors.text,
            flex: 1,
          }}
        >
          {item.label}
        </Text>

        {item.hasSwitch && (
          <Switch
            value={item.switchValue}
            onValueChange={item.onSwitchChange}
            trackColor={{
              false: theme.colors.cardBorder,
              true: theme.colors.primary,
            }}
            thumbColor={item.switchValue ? "#FFFFFF" : "#FFFFFF"}
          />
        )}

        {item.hasChevron && (
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        )}
      </Pressable>
    );
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={{ marginBottom: 32 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 28,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          Profile
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.textSecondary,
          }}
        >
          Manage your account settings
        </Text>
      </View>

      {/* Profile Card */}
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
            marginBottom: 20,
          }}
        >
          <Image
            source={{ uri: userProfile.image }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              marginRight: 16,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 20,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {userProfile.name}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                marginBottom: 2,
              }}
            >
              {userProfile.email}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MapPin size={12} color={theme.colors.textSecondary} />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  marginLeft: 4,
                }}
              >
                {userProfile.location}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <StatCard
            label="Total Bookings"
            value={userProfile.totalBookings}
            icon={Settings}
          />
          <StatCard
            label="Average Rating"
            value={userProfile.averageRating}
            icon={Star}
          />
        </View>

        <View
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: theme.colors.cardBorder,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
              textAlign: "center",
            }}
          >
            Member since {userProfile.memberSince}
          </Text>
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={section.title} style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
              marginBottom: 12,
            }}
          >
            {section.title}
          </Text>

          {section.items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>
      ))}

      {/* App Version */}
      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 40 }}>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: theme.colors.textMuted,
          }}
        >
          LicenFind v1.0.0
        </Text>
      </View>
    </ScreenContainer>
  );
}
