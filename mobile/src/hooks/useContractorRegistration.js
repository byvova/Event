import { useState } from "react";
import { Alert } from "react-native";

export function useContractorRegistration() {
  const [currentStep, setCurrentStep] = useState(1);

  // Individual state for each field to prevent re-renders
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [serviceArea, setServiceArea] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const [licenseNumber, setLicenseNumber] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [insurancePhoto, setInsurancePhoto] = useState(null);

  const [bio, setBio] = useState("");
  const [availability, setAvailability] = useState([]);
  const [emergencyServices, setEmergencyServices] = useState(false);

  // Create a formData object for compatibility with existing components
  const formData = {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    businessName,
    businessType,
    yearsExperience,
    specialties,
    serviceArea,
    hourlyRate,
    licenseNumber,
    insuranceProvider,
    profilePhoto,
    licensePhoto,
    insurancePhoto,
    bio,
    availability,
    emergencyServices,
  };

  // Simple update function that maps to individual setters
  const updateFormData = (field, value) => {
    switch (field) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "businessName":
        setBusinessName(value);
        break;
      case "businessType":
        setBusinessType(value);
        break;
      case "yearsExperience":
        setYearsExperience(value);
        break;
      case "serviceArea":
        setServiceArea(value);
        break;
      case "hourlyRate":
        setHourlyRate(value);
        break;
      case "licenseNumber":
        setLicenseNumber(value);
        break;
      case "insuranceProvider":
        setInsuranceProvider(value);
        break;
      case "profilePhoto":
        setProfilePhoto(value);
        break;
      case "licensePhoto":
        setLicensePhoto(value);
        break;
      case "insurancePhoto":
        setInsurancePhoto(value);
        break;
      case "bio":
        setBio(value);
        break;
      case "emergencyServices":
        setEmergencyServices(value);
        break;
      default:
        break;
    }
  };

  const toggleSpecialty = (specialty) => {
    setSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty],
    );
  };

  const toggleAvailability = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
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

  const handlePhotoUpload = (type) => {
    Alert.alert("Upload Photo", "Choose how to add your photo", [
      { text: "Camera", onPress: () => uploadPhoto(type, "camera") },
      { text: "Photo Library", onPress: () => uploadPhoto(type, "library") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return firstName && lastName && email && phone;
      case 2:
        return businessName && specialties.length > 0 && hourlyRate;
      case 3:
        return licenseNumber && insuranceProvider;
      case 4:
        return bio && availability.length > 0;
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

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitRegistration = (router) => {
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
          onPress: () => router.replace("/(contractor-tabs)/dashboard"),
        },
      ],
    );
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    toggleSpecialty,
    toggleAvailability,
    handlePhotoUpload,
    validateStep,
    handleNext,
    handleBack,
    handleSubmitRegistration,
  };
}
