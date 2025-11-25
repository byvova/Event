import React from "react";
import { View } from "react-native";
import { InputField } from "./InputField";

export function PersonalInfoStep({ formData, updateFormData, theme }) {
  return (
    <View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <InputField
            label="First Name"
            value={formData.firstName}
            onChangeText={(text) => updateFormData("firstName", text)}
            placeholder="John"
            theme={theme}
          />
        </View>
        <View style={{ flex: 1 }}>
          <InputField
            label="Last Name"
            value={formData.lastName}
            onChangeText={(text) => updateFormData("lastName", text)}
            placeholder="Smith"
            theme={theme}
          />
        </View>
      </View>

      <InputField
        label="Email Address"
        value={formData.email}
        onChangeText={(text) => updateFormData("email", text)}
        placeholder="john@example.com"
        keyboardType="email-address"
        theme={theme}
      />

      <InputField
        label="Phone Number"
        value={formData.phone}
        onChangeText={(text) => updateFormData("phone", text)}
        placeholder="(555) 123-4567"
        keyboardType="phone-pad"
        theme={theme}
      />

      <InputField
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChangeText={(text) => updateFormData("dateOfBirth", text)}
        placeholder="MM/DD/YYYY"
        required={false}
        theme={theme}
      />
    </View>
  );
}
