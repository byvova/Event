import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import {
  ArrowLeft,
  Camera,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import KeyboardAvoidingAnimatedView from "../components/KeyboardAvoidingAnimatedView";
import { useTheme } from "../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function EditProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "03/15/1985",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    emergencyContact: "Jane Doe",
    emergencyPhone: "(555) 987-6543",
    profilePhoto:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [hasChanges, setHasChanges] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const updateProfileData = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handlePhotoUpload = () => {
    Alert.alert("Change Profile Photo", "Choose an option", [
      { text: "Camera", onPress: () => uploadPhoto("camera") },
      { text: "Photo Library", onPress: () => uploadPhoto("library") },
      {
        text: "Remove Photo",
        onPress: () => removePhoto(),
        style: "destructive",
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const uploadPhoto = (source) => {
    const mockPhotos = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    ];

    const newPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];
    updateProfileData("profilePhoto", newPhoto);
  };

  const removePhoto = () => {
    updateProfileData("profilePhoto", null);
  };

  const handleSave = () => {
    Alert.alert(
      "Save Changes",
      "Are you sure you want to save your profile changes?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          onPress: () => {
            setHasChanges(false);
            Alert.alert(
              "Success",
              "Your profile has been updated successfully!",
              [{ text: "OK", onPress: () => router.back() }],
            );
          },
        },
      ],
    );
  };

  const handleBack = () => {
    if (hasChanges) {
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. What would you like to do?",
        [
          {
            text: "Discard",
            style: "destructive",
            onPress: () => router.back(),
          },
          { text: "Save", onPress: handleSave },
          { text: "Cancel", style: "cancel" },
        ],
      );
    } else {
      router.back();
    }
  };

  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    icon: IconComponent,
  }) => (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 16,
          color: theme.colors.text,
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.colors.cardBorder,
          ...theme.colors.shadow,
        }}
      >
        <View
          style={{
            padding: 16,
            borderRightWidth: 1,
            borderRightColor: theme.colors.cardBorder,
          }}
        >
          <IconComponent size={20} color={theme.colors.textSecondary} />
        </View>
        <TextInput
          style={{
            flex: 1,
            padding: 16,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.text,
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );

  const PhotoSection = () => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 24,
        ...theme.colors.shadow,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: theme.colors.text,
          marginBottom: 16,
        }}
      >
        Profile Photo
      </Text>

      <View style={{ position: "relative", marginBottom: 16 }}>
        {profileData.profilePhoto ? (
          <Image
            source={{ uri: profileData.profilePhoto }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
        ) : (
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: theme.colors.primarySoft,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <User size={40} color={theme.colors.primary} />
          </View>
        )}

        <Pressable
          style={({ pressed }) => ({
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: theme.colors.primary,
            borderRadius: 16,
            padding: 8,
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={handlePhotoUpload}
        >
          <Camera size={16} color="#FFFFFF" />
        </Pressable>
      </View>

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 14,
          color: theme.colors.textSecondary,
          textAlign: "center",
        }}
      >
        Tap the camera icon to change your photo
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingAnimatedView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior="padding"
    >
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
              onPress={handleBack}
            >
              <ArrowLeft size={20} color={theme.colors.text} />
            </Pressable>

            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
              }}
            >
              Edit Profile
            </Text>
          </View>

          {hasChanges && (
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 8,
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={handleSave}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}
              >
                Save
              </Text>
            </Pressable>
          )}
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
        <PhotoSection />

        {/* Personal Information */}
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            ...theme.colors.shadow,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            Personal Information
          </Text>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 4 }}>
            <View style={{ flex: 1 }}>
              <InputField
                label="First Name"
                value={profileData.firstName}
                onChangeText={(text) => updateProfileData("firstName", text)}
                placeholder="John"
                icon={User}
              />
            </View>
            <View style={{ flex: 1 }}>
              <InputField
                label="Last Name"
                value={profileData.lastName}
                onChangeText={(text) => updateProfileData("lastName", text)}
                placeholder="Smith"
                icon={User}
              />
            </View>
          </View>

          <InputField
            label="Email"
            value={profileData.email}
            onChangeText={(text) => updateProfileData("email", text)}
            placeholder="john@example.com"
            keyboardType="email-address"
            icon={Mail}
          />

          <InputField
            label="Phone"
            value={profileData.phone}
            onChangeText={(text) => updateProfileData("phone", text)}
            placeholder="(555) 123-4567"
            keyboardType="phone-pad"
            icon={Phone}
          />

          <InputField
            label="Date of Birth"
            value={profileData.dateOfBirth}
            onChangeText={(text) => updateProfileData("dateOfBirth", text)}
            placeholder="MM/DD/YYYY"
            icon={Calendar}
          />
        </View>

        {/* Address Information */}
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            ...theme.colors.shadow,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            Address Information
          </Text>

          <InputField
            label="Street Address"
            value={profileData.address}
            onChangeText={(text) => updateProfileData("address", text)}
            placeholder="123 Main Street"
            icon={MapPin}
          />

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 4 }}>
            <View style={{ flex: 2 }}>
              <InputField
                label="City"
                value={profileData.city}
                onChangeText={(text) => updateProfileData("city", text)}
                placeholder="San Francisco"
                icon={MapPin}
              />
            </View>
            <View style={{ flex: 1 }}>
              <InputField
                label="State"
                value={profileData.state}
                onChangeText={(text) => updateProfileData("state", text)}
                placeholder="CA"
                icon={MapPin}
              />
            </View>
          </View>

          <InputField
            label="ZIP Code"
            value={profileData.zipCode}
            onChangeText={(text) => updateProfileData("zipCode", text)}
            placeholder="94102"
            keyboardType="numeric"
            icon={MapPin}
          />
        </View>

        {/* Emergency Contact */}
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            ...theme.colors.shadow,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            Emergency Contact
          </Text>

          <InputField
            label="Contact Name"
            value={profileData.emergencyContact}
            onChangeText={(text) => updateProfileData("emergencyContact", text)}
            placeholder="Jane Doe"
            icon={User}
          />

          <InputField
            label="Contact Phone"
            value={profileData.emergencyPhone}
            onChangeText={(text) => updateProfileData("emergencyPhone", text)}
            placeholder="(555) 987-6543"
            keyboardType="phone-pad"
            icon={Phone}
          />
        </View>
      </ScrollView>

      {/* Bottom Save Button */}
      {hasChanges && (
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
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.primary,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={handleSave}
          >
            <Save size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              Save Changes
            </Text>
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingAnimatedView>
  );
}
