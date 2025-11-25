import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  RefreshControl,
  Alert,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  User,
  Settings,
  Bell,
  Shield,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit3,
  LogOut,
  HelpCircle,
  FileText,
  DollarSign,
  Clock,
  Award,
  ChevronRight,
  MoreHorizontal,
  Camera,
} from "lucide-react-native";
import { useTheme } from "../../utils/theme";
import { useLanguage } from "../../utils/LanguageContext";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function ContractorProfile() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [availabilityEnabled, setAvailabilityEnabled] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const contractorProfile = {
    name: "John Smith",
    email: "john@smith-electrical.com",
    phone: "(555) 123-4567",
    businessName: "Smith Electrical Services",
    specialties: ["Electrical", "HVAC", "General Contractor"],
    location: "San Francisco, CA",
    rating: 4.9,
    totalJobs: 387,
    joinDate: "March 2022",
    licenseNumber: "C-10 123456",
    verified: true,
    profileCompletion: 95,
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleEditPhoto = () => {
    Alert.alert("Change Profile Photo", "Choose an option", [
      { text: "Cancel", style: "cancel" },
      { text: "Take Photo", onPress: () => {} },
      { text: "Choose from Library", onPress: () => {} },
    ]);
  };

  const handleEditEmail = () => {
    Alert.prompt(
      "Update Email",
      "Enter your new email address",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Update",
          onPress: (text) => {
            if (text) {
              Alert.alert("Success", "Email updated successfully!");
            }
          },
        },
      ],
      "plain-text",
      contractorProfile.email,
    );
  };

  const handleEditPhone = () => {
    Alert.prompt(
      "Update Phone",
      "Enter your new phone number",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Update",
          onPress: (text) => {
            if (text) {
              Alert.alert("Success", "Phone number updated successfully!");
            }
          },
        },
      ],
      "phone-pad",
      contractorProfile.phone,
    );
  };

  const handleEditLocation = () => {
    Alert.alert(
      "Update Service Area",
      "Update the areas where you provide services",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Update", onPress: () => {} },
      ],
    );
  };

  const handleManageAvailability = () => {
    Alert.alert("Manage Availability", "Set your working hours and days", [
      { text: "Cancel", style: "cancel" },
      { text: "Edit Schedule", onPress: () => {} },
    ]);
  };

  const handlePricingServices = () => {
    Alert.alert(
      "Pricing & Services",
      "Update your service rates and specialties",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Edit", onPress: () => {} },
      ],
    );
  };

  const handleLicenseInsurance = () => {
    Alert.alert(
      "License & Insurance",
      "Manage your certifications and insurance documents",
      [
        { text: "Cancel", style: "cancel" },
        { text: "View Documents", onPress: () => {} },
        { text: "Upload New", onPress: () => {} },
      ],
    );
  };

  const handleNotifications = () => {
    Alert.alert(
      "Notification Settings",
      "Manage your notification preferences",
      [{ text: "OK" }],
    );
  };

  const handleAppPreferences = () => {
    Alert.alert("App Preferences", "Customize your app experience", [
      { text: "Cancel", style: "cancel" },
      { text: "Language", onPress: () => {} },
      { text: "Theme", onPress: () => {} },
    ]);
  };

  const handleHelpSupport = () => {
    Alert.alert("Help & Support", "How can we help you?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Email Support",
        onPress: () =>
          Linking.openURL("mailto:contractor-support@licenfind.com"),
      },
      { text: "View FAQs", onPress: () => {} },
    ]);
  };

  const handleTermsPrivacy = () => {
    Alert.alert("Terms & Privacy", "View our legal documents", [
      { text: "Cancel", style: "cancel" },
      { text: "Terms of Service", onPress: () => {} },
      { text: "Privacy Policy", onPress: () => {} },
    ]);
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          router.replace("/");
        },
      },
    ]);
  };

  const handleMoreOptions = () => {
    Alert.alert("More Options", "Additional settings", [
      { text: "Cancel", style: "cancel" },
      { text: "Export Data", onPress: () => {} },
      { text: "Account Settings", onPress: () => {} },
    ]);
  };

  const ProfileSection = ({ children, title, style }) => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...theme.colors.shadow,
        ...style,
      }}
    >
      {title && (
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: theme.colors.text,
            marginBottom: 16,
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </View>
  );

  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightElement,
  }) => (
    <Pressable
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        opacity: pressed ? 0.7 : 1,
      })}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: theme.colors.primarySoft,
          borderRadius: 8,
          padding: 8,
          marginRight: 12,
        }}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            color: theme.colors.text,
            marginBottom: subtitle ? 2 : 0,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightElement ||
        (showArrow && (
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        ))}
    </Pressable>
  );

  const StatItem = ({ icon, label, value, color }) => (
    <View style={{ alignItems: "center", flex: 1 }}>
      <View
        style={{
          backgroundColor: `${color}20`,
          borderRadius: 12,
          padding: 12,
          marginBottom: 8,
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          fontFamily: "Inter_700Bold",
          fontSize: 20,
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

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: theme.colors.surface,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 24,
              color: theme.colors.text,
            }}
          >
            Profile
          </Text>

          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 12,
              padding: 12,
              opacity: pressed ? 0.7 : 1,
              ...theme.colors.shadow,
            })}
            onPress={handleMoreOptions}
          >
            <MoreHorizontal size={24} color={theme.colors.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Profile Header */}
        <ProfileSection>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            {/* Profile Photo */}
            <View style={{ position: "relative", marginBottom: 16 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: theme.colors.primarySoft,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 28,
                    color: theme.colors.primary,
                  }}
                >
                  {contractorProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => ({
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 12,
                  padding: 6,
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={handleEditPhoto}
              >
                <Camera size={16} color="#FFFFFF" />
              </Pressable>
            </View>

            {/* Name and Verification */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 22,
                  color: theme.colors.text,
                  marginRight: 8,
                }}
              >
                {contractorProfile.name}
              </Text>
              {contractorProfile.verified && (
                <View
                  style={{
                    backgroundColor: theme.colors.verified,
                    borderRadius: 10,
                    padding: 4,
                  }}
                >
                  <Shield size={12} color="#FFFFFF" />
                </View>
              )}
            </View>

            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.textSecondary,
                marginBottom: 8,
              }}
            >
              {contractorProfile.businessName}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Star
                size={16}
                color={theme.colors.orange}
                fill={theme.colors.orange}
              />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginLeft: 4,
                  marginRight: 12,
                }}
              >
                {contractorProfile.rating}
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                ({contractorProfile.totalJobs} jobs)
              </Text>
            </View>

            {/* Specialties */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {contractorProfile.specialties.map((specialty) => (
                <View
                  key={specialty}
                  style={{
                    backgroundColor: theme.colors.primarySoft,
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 12,
                      color: theme.colors.primary,
                    }}
                  >
                    {specialty}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Profile Completion */}
          <View
            style={{
              backgroundColor: theme.colors.primarySoft,
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.text,
                }}
              >
                Profile Completion
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.colors.primary,
                }}
              >
                {contractorProfile.profileCompletion}%
              </Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: theme.colors.cardBorder,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${contractorProfile.profileCompletion}%`,
                  backgroundColor: theme.colors.primary,
                }}
              />
            </View>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: "row", gap: 20 }}>
            <StatItem
              icon={<Award size={20} color={theme.colors.blue} />}
              label="Total Jobs"
              value={contractorProfile.totalJobs}
              color={theme.colors.blue}
            />
            <StatItem
              icon={<Star size={20} color={theme.colors.orange} />}
              label="Rating"
              value={`${contractorProfile.rating}★`}
              color={theme.colors.orange}
            />
            <StatItem
              icon={<Calendar size={20} color={theme.colors.purple} />}
              label="Since"
              value={contractorProfile.joinDate.split(" ")[0]}
              color={theme.colors.purple}
            />
          </View>
        </ProfileSection>

        {/* Contact Information */}
        <ProfileSection title="Contact Information">
          <MenuItem
            icon={<Mail size={18} color={theme.colors.primary} />}
            title="Email"
            subtitle={contractorProfile.email}
            onPress={handleEditEmail}
          />
          <MenuItem
            icon={<Phone size={18} color={theme.colors.primary} />}
            title="Phone"
            subtitle={contractorProfile.phone}
            onPress={handleEditPhone}
          />
          <MenuItem
            icon={<MapPin size={18} color={theme.colors.primary} />}
            title="Location"
            subtitle={contractorProfile.location}
            onPress={handleEditLocation}
          />
        </ProfileSection>

        {/* Business Settings */}
        <ProfileSection title="Business Settings">
          <MenuItem
            icon={<Clock size={18} color={theme.colors.primary} />}
            title="Availability"
            subtitle="Manage your working hours"
            rightElement={
              <Switch
                value={availabilityEnabled}
                onValueChange={setAvailabilityEnabled}
                trackColor={{
                  false: theme.colors.cardBorder,
                  true: theme.colors.primary,
                }}
                thumbColor={availabilityEnabled ? "#FFFFFF" : "#FFFFFF"}
              />
            }
            showArrow={false}
            onPress={handleManageAvailability}
          />
          <MenuItem
            icon={<DollarSign size={18} color={theme.colors.primary} />}
            title="Pricing & Services"
            subtitle="Update your rates and specialties"
            onPress={handlePricingServices}
          />
          <MenuItem
            icon={<Shield size={18} color={theme.colors.primary} />}
            title="License & Insurance"
            subtitle={`License: ${contractorProfile.licenseNumber}`}
            onPress={handleLicenseInsurance}
          />
        </ProfileSection>

        {/* App Settings */}
        <ProfileSection title="App Settings">
          <MenuItem
            icon={<Bell size={18} color={theme.colors.primary} />}
            title="Notifications"
            subtitle="Push notifications and alerts"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{
                  false: theme.colors.cardBorder,
                  true: theme.colors.primary,
                }}
                thumbColor={notificationsEnabled ? "#FFFFFF" : "#FFFFFF"}
              />
            }
            showArrow={false}
            onPress={handleNotifications}
          />
          <MenuItem
            icon={<Settings size={18} color={theme.colors.primary} />}
            title="App Preferences"
            subtitle="Language, theme, and more"
            onPress={handleAppPreferences}
          />
        </ProfileSection>

        {/* Support & Legal */}
        <ProfileSection title="Support & Legal">
          <MenuItem
            icon={<HelpCircle size={18} color={theme.colors.primary} />}
            title="Help & Support"
            subtitle="FAQs and contact support"
            onPress={handleHelpSupport}
          />
          <MenuItem
            icon={<FileText size={18} color={theme.colors.primary} />}
            title="Terms & Privacy"
            subtitle="Legal documents"
            onPress={handleTermsPrivacy}
          />
        </ProfileSection>

        {/* Logout */}
        <ProfileSection>
          <MenuItem
            icon={<LogOut size={18} color={theme.colors.red} />}
            title="Log Out"
            onPress={handleLogout}
            showArrow={false}
          />
        </ProfileSection>
      </ScrollView>
    </View>
  );
}
