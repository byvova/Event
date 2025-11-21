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
  CheckCircle2,
  Camera,
  Upload,
  MapPin,
  Phone,
  Mail,
  User,
  Briefcase,
  DollarSign,
  Shield,
  Calendar,
  Clock,
  Star,
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

export default function ContractorRegistrationScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",

    // Business Info
    businessName: "",
    businessType: "",
    yearsExperience: "",
    specialties: [],
    serviceArea: "",
    hourlyRate: "",

    // Verification
    licenseNumber: "",
    insuranceProvider: "",
    profilePhoto: null,
    licensePhoto: null,
    insurancePhoto: null,

    // Additional
    bio: "",
    availability: [],
    emergencyServices: false,
  });

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const steps = [
    { id: 1, title: "Personal Info", subtitle: "Tell us about yourself" },
    { id: 2, title: "Business Details", subtitle: "Your services & expertise" },
    { id: 3, title: "Verification", subtitle: "License & insurance" },
    { id: 4, title: "Profile Setup", subtitle: "Complete your profile" },
  ];

  const specialtyOptions = [
    "Electrical",
    "Plumbing",
    "HVAC",
    "Carpentry",
    "Painting",
    "Roofing",
    "Flooring",
    "Landscaping",
    "General Contractor",
    "Handyman",
    "Appliance Repair",
    "Pest Control",
  ];

  const businessTypes = [
    "Sole Proprietorship",
    "LLC",
    "Corporation",
    "Partnership",
    "Independent Contractor",
  ];

  const availabilityOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSpecialty = (specialty) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const toggleAvailability = (day) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
  };

  const handlePhotoUpload = (type) => {
    Alert.alert("Upload Photo", "Choose how to add your photo", [
      { text: "Camera", onPress: () => uploadPhoto(type, "camera") },
      { text: "Photo Library", onPress: () => uploadPhoto(type, "library") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const uploadPhoto = (type, source) => {
    // Mock photo URLs
    const mockPhotos = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    ];

    const photo = {
      uri: mockPhotos[Math.floor(Math.random() * mockPhotos.length)],
      type: "image/jpeg",
      name: `${type}-photo.jpg`,
    };

    updateFormData(type, photo);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      case 2:
        return (
          formData.businessName &&
          formData.specialties.length > 0 &&
          formData.hourlyRate
        );
      case 3:
        return formData.licenseNumber && formData.insuranceProvider;
      case 4:
        return formData.bio && formData.availability.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields before continuing.",
      );
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmitRegistration = () => {
    if (!validateStep(4)) {
      Alert.alert(
        "Missing Information",
        "Please complete all required fields.",
      );
      return;
    }

    Alert.alert(
      "Registration Submitted!",
      "Thank you for applying to join LicenFind. We'll review your application and get back to you within 24-48 hours. You'll receive an email confirmation shortly.",
      [
        {
          text: "Done",
          onPress: () => router.replace("/"),
        },
      ],
    );
  };

  const ProgressBar = () => (
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
  );

  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    multiline,
    required = true,
  }) => (
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
      />
    </View>
  );

  const SelectableChip = ({ label, isSelected, onPress }) => (
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

  const PhotoUploadBox = ({ label, photo, onPress, type }) => (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 16,
          color: theme.colors.text,
          marginBottom: 8,
        }}
      >
        {label}{" "}
        {type !== "profilePhoto" && (
          <Text style={{ color: theme.colors.red }}>*</Text>
        )}
      </Text>

      {photo ? (
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: photo.uri }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
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
            onPress={() => updateFormData(type, null)}
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
          onPress={onPress}
        >
          <View
            style={{
              backgroundColor: theme.colors.primarySoft,
              borderRadius: 20,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <Upload size={24} color={theme.colors.primary} />
          </View>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.colors.text,
              textAlign: "center",
            }}
          >
            Tap to upload
          </Text>
        </Pressable>
      )}
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <InputField
                  label="First Name"
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData("firstName", text)}
                  placeholder="John"
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputField
                  label="Last Name"
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData("lastName", text)}
                  placeholder="Smith"
                />
              </View>
            </View>

            <InputField
              label="Email Address"
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
              placeholder="john@example.com"
              keyboardType="email-address"
            />

            <InputField
              label="Phone Number"
              value={formData.phone}
              onChangeText={(text) => updateFormData("phone", text)}
              placeholder="(555) 123-4567"
              keyboardType="phone-pad"
            />

            <InputField
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChangeText={(text) => updateFormData("dateOfBirth", text)}
              placeholder="MM/DD/YYYY"
              required={false}
            />
          </View>
        );

      case 2:
        return (
          <View>
            <InputField
              label="Business Name"
              value={formData.businessName}
              onChangeText={(text) => updateFormData("businessName", text)}
              placeholder="ABC Electrical Services"
            />

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Business Type <Text style={{ color: theme.colors.red }}>*</Text>
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {businessTypes.map((type) => (
                  <SelectableChip
                    key={type}
                    label={type}
                    isSelected={formData.businessType === type}
                    onPress={() => updateFormData("businessType", type)}
                  />
                ))}
              </View>
            </View>

            <InputField
              label="Years of Experience"
              value={formData.yearsExperience}
              onChangeText={(text) => updateFormData("yearsExperience", text)}
              placeholder="5"
              keyboardType="numeric"
            />

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Service Specialties{" "}
                <Text style={{ color: theme.colors.red }}>*</Text>
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {specialtyOptions.map((specialty) => (
                  <SelectableChip
                    key={specialty}
                    label={specialty}
                    isSelected={formData.specialties.includes(specialty)}
                    onPress={() => toggleSpecialty(specialty)}
                  />
                ))}
              </View>
            </View>

            <InputField
              label="Service Area"
              value={formData.serviceArea}
              onChangeText={(text) => updateFormData("serviceArea", text)}
              placeholder="San Francisco, CA (25 mile radius)"
            />

            <InputField
              label="Hourly Rate"
              value={formData.hourlyRate}
              onChangeText={(text) => updateFormData("hourlyRate", text)}
              placeholder="75"
              keyboardType="numeric"
            />
          </View>
        );

      case 3:
        return (
          <View>
            <InputField
              label="License Number"
              value={formData.licenseNumber}
              onChangeText={(text) => updateFormData("licenseNumber", text)}
              placeholder="C-10 123456"
            />

            <InputField
              label="Insurance Provider"
              value={formData.insuranceProvider}
              onChangeText={(text) => updateFormData("insuranceProvider", text)}
              placeholder="State Farm Commercial Insurance"
            />

            <PhotoUploadBox
              label="Profile Photo"
              photo={formData.profilePhoto}
              onPress={() => handlePhotoUpload("profilePhoto")}
              type="profilePhoto"
            />

            <PhotoUploadBox
              label="License Documentation"
              photo={formData.licensePhoto}
              onPress={() => handlePhotoUpload("licensePhoto")}
              type="licensePhoto"
            />

            <PhotoUploadBox
              label="Insurance Certificate"
              photo={formData.insurancePhoto}
              onPress={() => handlePhotoUpload("insurancePhoto")}
              type="insurancePhoto"
            />
          </View>
        );

      case 4:
        return (
          <View>
            <InputField
              label="Professional Bio"
              value={formData.bio}
              onChangeText={(text) => updateFormData("bio", text)}
              placeholder="Tell potential customers about your experience, specialties, and what sets you apart..."
              multiline={true}
            />

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Availability <Text style={{ color: theme.colors.red }}>*</Text>
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {availabilityOptions.map((day) => (
                  <SelectableChip
                    key={day}
                    label={day}
                    isSelected={formData.availability.includes(day)}
                    onPress={() => toggleAvailability(day)}
                  />
                ))}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Pressable
                style={({ pressed }) => ({
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  backgroundColor: formData.emergencyServices
                    ? theme.colors.primary
                    : theme.colors.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.colors.cardBorder,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() =>
                  updateFormData(
                    "emergencyServices",
                    !formData.emergencyServices,
                  )
                }
              >
                {formData.emergencyServices && (
                  <CheckCircle2 size={16} color="#FFFFFF" />
                )}
              </Pressable>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                I offer emergency services (24/7 availability)
              </Text>
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
                What happens next?
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  lineHeight: 20,
                }}
              >
                After you submit your application, our team will review your
                credentials and verify your license and insurance. You'll
                receive an email confirmation within 24-48 hours with next
                steps.
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

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
            Contractor Registration
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
      >
        <ProgressBar />
        {renderStepContent()}
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
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={currentStep === 4 ? handleSubmitRegistration : handleNext}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              {currentStep === 4 ? "Submit Application" : "Continue"}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
