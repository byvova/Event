import React from "react";
import { View } from "react-native";
import { InputField } from "./InputField";
import { PhotoUploadBox } from "./PhotoUploadBox";

export function VerificationStep({
  formData,
  updateFormData,
  handlePhotoUpload,
  theme,
}) {
  return (
    <View>
      <InputField
        label="License Number"
        value={formData.licenseNumber}
        onChangeText={(text) => updateFormData("licenseNumber", text)}
        placeholder="C-10 123456"
        theme={theme}
      />

      <InputField
        label="Insurance Provider"
        value={formData.insuranceProvider}
        onChangeText={(text) => updateFormData("insuranceProvider", text)}
        placeholder="State Farm Commercial Insurance"
        theme={theme}
      />

      <PhotoUploadBox
        label="Profile Photo"
        photo={formData.profilePhoto}
        onPress={() => handlePhotoUpload("profilePhoto")}
        type="profilePhoto"
        updateFormData={updateFormData}
        theme={theme}
      />

      <PhotoUploadBox
        label="License Documentation"
        photo={formData.licensePhoto}
        onPress={() => handlePhotoUpload("licensePhoto")}
        type="licensePhoto"
        updateFormData={updateFormData}
        theme={theme}
      />

      <PhotoUploadBox
        label="Insurance Certificate"
        photo={formData.insurancePhoto}
        onPress={() => handlePhotoUpload("insurancePhoto")}
        type="insurancePhoto"
        updateFormData={updateFormData}
        theme={theme}
      />
    </View>
  );
}
