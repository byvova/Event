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
import { ArrowLeft, CheckCircle2, Camera, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import KeyboardAvoidingAnimatedView from "../components/KeyboardAvoidingAnimatedView";
import { useTheme } from "../utils/theme";
import { useLanguage } from "../utils/LanguageContext";
import { useAuth } from "../utils/auth/useAuth";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function CustomerRegistrationScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const { signUp, signIn } = useAuth();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Individual state for each field to prevent re-renders
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [servicePreferences, setServicePreferences] = useState([]);
  const [communicationPrefs, setCommunicationPrefs] = useState([]);

  const steps = [
    { id: 1, title: "Personal Info", subtitle: "Tell us about yourself" },
    { id: 2, title: "Address", subtitle: "Where you need services" },
    { id: 3, title: "Profile Setup", subtitle: "Complete your profile" },
  ];

  const propertyTypes = [
    "Single Family Home",
    "Apartment",
    "Condo",
    "Townhouse",
    "Mobile Home",
    "Other",
  ];

  const serviceOptions = [
    "Electrical",
    "Plumbing",
    "HVAC",
    "Cleaning",
    "Landscaping",
    "Handyman",
    "Appliance Repair",
    "Pest Control",
  ];

  const communicationOptions = [
    "Email",
    "SMS",
    "Phone Calls",
    "In-App Messages",
  ];

  const togglePreference = (preference) => {
    setServicePreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    );
  };

  const toggleCommunication = (option) => {
    setCommunicationPrefs((prev) =>
      prev.includes(option)
        ? prev.filter((p) => p !== option)
        : [...prev, option]
    );
  };

  const handlePhotoUpload = () => {
    Alert.alert("Upload Photo", "Choose how to add your photo", [
      { text: "Camera", onPress: () => uploadPhoto("camera") },
      { text: "Photo Library", onPress: () => uploadPhoto("library") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const uploadPhoto = (source) => {
    // Mock photo URLs
    const mockPhotos = [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    ];

    const photo = {
      uri: mockPhotos[Math.floor(Math.random() * mockPhotos.length)],
      type: "image/jpeg",
      name: "profile-photo.jpg",
    };

    setProfilePhoto(photo);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!firstName || !lastName || !email || !phone) {
          return false;
        }
        if (!password || password.length < 6) {
          Alert.alert(
            "Invalid Password",
            "Password must be at least 6 characters long."
          );
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Alert.alert("Invalid Email", "Please enter a valid email address.");
          return false;
        }
        return true;
      case 2:
        return street && city && state && zipCode;
      case 3:
        return true; // All fields optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields before continuing."
      );
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmitRegistration = async () => {
    if (!validateStep(3)) {
      Alert.alert(
        "Missing Information",
        "Please complete all required fields."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/customer-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          phone,
          dateOfBirth,
          profilePhoto: profilePhoto?.uri || null,
          street,
          city,
          state,
          zipCode,
          propertyType,
          emergencyContactName: emergencyContact,
          emergencyContactPhone: emergencyPhone,
          servicePreferences,
          communicationPreferences: communicationPrefs,
          notificationsEnabled: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      Alert.alert(
        "Account Created Successfully!",
        "Welcome to LicenFind! Your account has been created. Please sign in to start finding trusted contractors for your home services.",
        [
          {
            text: "Sign In Now",
            onPress: () => {
              router.replace("/home");
              setTimeout(() => {
                signIn();
              }, 1000);
            },
          },
        ]
      );
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert(
        "Error",
        error.message ||
          "There was a problem creating your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.colors.text }}>Loading...</Text>
      </View>
    );
  }

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 12,
              padding: 8,
              marginRight: 16,
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => {
              if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
              } else {
                router.back();
              }
            }}
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
            Create Account
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Progress Bar */}
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
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            {steps.map((step, index) => (
              <View key={step.id} style={{ alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor:
                      currentStep >= step.id
                        ? theme.colors.primary
                        : theme.colors.cardBorder,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 size={16} color="#FFFFFF" />
                  ) : (
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 14,
                        color:
                          currentStep >= step.id
                            ? "#FFFFFF"
                            : theme.colors.textMuted,
                      }}
                    >
                      {step.id}
                    </Text>
                  )}
                </View>

                {index < steps.length - 1 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 16,
                      left: "50%",
                      width: "100%",
                      height: 2,
                      backgroundColor:
                        currentStep > step.id
                          ? theme.colors.primary
                          : theme.colors.cardBorder,
                      zIndex: -1,
                    }}
                  />
                )}
              </View>
            ))}
          </View>

          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {steps[currentStep - 1]?.title}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
              }}
            >
              {steps[currentStep - 1]?.subtitle}
            </Text>
          </View>
        </View>

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 16,
                      color: theme.colors.text,
                      marginBottom: 8,
                    }}
                  >
                    First Name{" "}
                    <Text style={{ color: theme.colors.red }}>*</Text>
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
                      ...theme.colors.shadow,
                    }}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="John"
                    placeholderTextColor={theme.colors.textSecondary}
                    autoCorrect={false}
                    autoCapitalize="words"
                    blurOnSubmit={false}
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 16,
                      color: theme.colors.text,
                      marginBottom: 8,
                    }}
                  >
                    Last Name <Text style={{ color: theme.colors.red }}>*</Text>
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
                      ...theme.colors.shadow,
                    }}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Smith"
                    placeholderTextColor={theme.colors.textSecondary}
                    autoCorrect={false}
                    autoCapitalize="words"
                    blurOnSubmit={false}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Email Address <Text style={{ color: theme.colors.red }}>*</Text>
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
                  ...theme.colors.shadow,
                }}
                value={email}
                onChangeText={setEmail}
                placeholder="john@example.com"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Password <Text style={{ color: theme.colors.red }}>*</Text>
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
                  ...theme.colors.shadow,
                }}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a secure password"
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Phone Number <Text style={{ color: theme.colors.red }}>*</Text>
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
                  ...theme.colors.shadow,
                }}
                value={phone}
                onChangeText={setPhone}
                placeholder="(555) 123-4567"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="phone-pad"
                autoCorrect={false}
                blurOnSubmit={false}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Date of Birth
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
                  ...theme.colors.shadow,
                }}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="MM/DD/YYYY"
                placeholderTextColor={theme.colors.textSecondary}
                autoCorrect={false}
                blurOnSubmit={false}
              />
            </View>
          </View>
        )}

        {/* Step 2: Address */}
        {currentStep === 2 && (
          <View>
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Street Address{" "}
                <Text style={{ color: theme.colors.red }}>*</Text>
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
                  ...theme.colors.shadow,
                }}
                value={street}
                onChangeText={setStreet}
                placeholder="123 Main Street"
                placeholderTextColor={theme.colors.textSecondary}
                autoCorrect={false}
                autoCapitalize="words"
                blurOnSubmit={false}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 2 }}>
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 16,
                      color: theme.colors.text,
                      marginBottom: 8,
                    }}
                  >
                    City <Text style={{ color: theme.colors.red }}>*</Text>
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
                      ...theme.colors.shadow,
                    }}
                    value={city}
                    onChangeText={setCity}
                    placeholder="San Francisco"
                    placeholderTextColor={theme.colors.textSecondary}
                    autoCorrect={false}
                    autoCapitalize="words"
                    blurOnSubmit={false}
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 16,
                      color: theme.colors.text,
                      marginBottom: 8,
                    }}
                  >
                    State <Text style={{ color: theme.colors.red }}>*</Text>
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
                      ...theme.colors.shadow,
                    }}
                    value={state}
                    onChangeText={setState}
                    placeholder="CA"
                    placeholderTextColor={theme.colors.textSecondary}
                    autoCorrect={false}
                    autoCapitalize="characters"
                    blurOnSubmit={false}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                ZIP Code <Text style={{ color: theme.colors.red }}>*</Text>
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
                  ...theme.colors.shadow,
                }}
                value={zipCode}
                onChangeText={setZipCode}
                placeholder="94102"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="numeric"
                autoCorrect={false}
                blurOnSubmit={false}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Property Type
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {propertyTypes.map((type) => (
                  <Pressable
                    key={type}
                    style={({ pressed }) => ({
                      backgroundColor:
                        propertyType === type
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
                    onPress={() => setPropertyType(type)}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 14,
                        color:
                          propertyType === type ? "#FFFFFF" : theme.colors.text,
                      }}
                    >
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Step 3: Profile Setup */}
        {currentStep === 3 && (
          <View>
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Profile Photo (Optional)
              </Text>

              {profilePhoto ? (
                <View style={{ position: "relative", alignItems: "center" }}>
                  <Image
                    source={{ uri: profilePhoto.uri }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 60,
                      backgroundColor: theme.colors.cardBackground,
                    }}
                  />
                  <Pressable
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: theme.colors.red,
                      borderRadius: 12,
                      width: 24,
                      height: 24,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => setProfilePhoto(null)}
                  >
                    <X size={12} color="#FFFFFF" />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: theme.colors.cardBackground,
                    borderRadius: 12,
                    padding: 32,
                    borderWidth: 2,
                    borderColor: theme.colors.primary,
                    borderStyle: "dashed",
                    alignItems: "center",
                    opacity: pressed ? 0.7 : 1,
                  })}
                  onPress={handlePhotoUpload}
                >
                  <View
                    style={{
                      backgroundColor: theme.colors.primarySoft,
                      borderRadius: 20,
                      padding: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Camera size={24} color={theme.colors.primary} />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color: theme.colors.text,
                      textAlign: "center",
                    }}
                  >
                    Add Profile Photo
                  </Text>
                </Pressable>
              )}
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Emergency Contact Name
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
                  ...theme.colors.shadow,
                }}
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                placeholder="Jane Doe"
                placeholderTextColor={theme.colors.textSecondary}
                autoCorrect={false}
                autoCapitalize="words"
                blurOnSubmit={false}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Emergency Contact Phone
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
                  ...theme.colors.shadow,
                }}
                value={emergencyPhone}
                onChangeText={setEmergencyPhone}
                placeholder="(555) 987-6543"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="phone-pad"
                autoCorrect={false}
                blurOnSubmit={false}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Service Interests (Optional)
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {serviceOptions.map((service) => (
                  <Pressable
                    key={service}
                    style={({ pressed }) => ({
                      backgroundColor: servicePreferences.includes(service)
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
                    onPress={() => togglePreference(service)}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 14,
                        color: servicePreferences.includes(service)
                          ? "#FFFFFF"
                          : theme.colors.text,
                      }}
                    >
                      {service}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                How would you like us to contact you?
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {communicationOptions.map((option) => (
                  <Pressable
                    key={option}
                    style={({ pressed }) => ({
                      backgroundColor: communicationPrefs.includes(option)
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
                    onPress={() => toggleCommunication(option)}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 14,
                        color: communicationPrefs.includes(option)
                          ? "#FFFFFF"
                          : theme.colors.text,
                      }}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View
              style={{
                backgroundColor: theme.colors.primarySoft,
                borderRadius: 12,
                padding: 16,
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Ready to get started!
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  lineHeight: 20,
                }}
              >
                Once you complete registration, you'll be able to browse trusted
                contractors, get instant quotes, and book services for your
                home.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Bar */}
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
              onPress={() => setCurrentStep(currentStep - 1)}
              disabled={loading}
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
              opacity: pressed || loading ? 0.7 : 1,
            })}
            onPress={currentStep === 3 ? handleSubmitRegistration : handleNext}
            disabled={loading}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              {loading
                ? "Creating Account..."
                : currentStep === 3
                ? "Create Account"
                : "Continue"}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}