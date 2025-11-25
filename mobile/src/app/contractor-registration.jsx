import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import { useTheme } from "@/utils/theme";
import { useLanguage } from "@/utils/LanguageContext";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useContractorRegistration } from "@/hooks/useContractorRegistration";
import { ProgressBar } from "@/components/ContractorRegistration/ProgressBar";
import { PersonalInfoStep } from "@/components/ContractorRegistration/PersonalInfoStep";
import { BusinessDetailsStep } from "@/components/ContractorRegistration/BusinessDetailsStep";
import { VerificationStep } from "@/components/ContractorRegistration/VerificationStep";
import { ProfileSetupStep } from "@/components/ContractorRegistration/ProfileSetupStep";
import { RegistrationHeader } from "@/components/ContractorRegistration/RegistrationHeader";
import { BottomActionBar } from "@/components/ContractorRegistration/BottomActionBar";
import { steps } from "@/utils/contractorRegistrationSteps";

export default function ContractorRegistrationScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const {
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    toggleSpecialty,
    toggleAvailability,
    handlePhotoUpload,
    handleNext,
    handleBack,
    handleSubmitRegistration,
  } = useContractorRegistration();

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

  const handleHeaderBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            theme={theme}
          />
        );
      case 2:
        return (
          <BusinessDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            toggleSpecialty={toggleSpecialty}
            theme={theme}
          />
        );
      case 3:
        return (
          <VerificationStep
            formData={formData}
            updateFormData={updateFormData}
            handlePhotoUpload={handlePhotoUpload}
            theme={theme}
          />
        );
      case 4:
        return (
          <ProfileSetupStep
            formData={formData}
            updateFormData={updateFormData}
            toggleAvailability={toggleAvailability}
            theme={theme}
          />
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
      <RegistrationHeader
        currentStep={currentStep}
        onBack={handleHeaderBack}
        theme={theme}
        insets={insets}
      />

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
        <ProgressBar steps={steps} currentStep={currentStep} theme={theme} />
        {renderStepContent()}
      </ScrollView>

      <BottomActionBar
        currentStep={currentStep}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={() => handleSubmitRegistration(router)}
        theme={theme}
        insets={insets}
      />
    </KeyboardAvoidingAnimatedView>
  );
}
