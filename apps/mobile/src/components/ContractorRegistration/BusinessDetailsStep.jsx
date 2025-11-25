import React from "react";
import { View, Text } from "react-native";
import { InputField } from "./InputField";
import { SelectableChip } from "./SelectableChip";

const businessTypes = [
  "Sole Proprietorship",
  "LLC",
  "Corporation",
  "Partnership",
  "Independent Contractor",
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

export function BusinessDetailsStep({
  formData,
  updateFormData,
  toggleSpecialty,
  theme,
}) {
  return (
    <View>
      <InputField
        label="Business Name"
        value={formData.businessName}
        onChangeText={(text) => updateFormData("businessName", text)}
        placeholder="ABC Electrical Services"
        theme={theme}
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
              theme={theme}
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
        theme={theme}
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
          Service Specialties <Text style={{ color: theme.colors.red }}>*</Text>
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {specialtyOptions.map((specialty) => (
            <SelectableChip
              key={specialty}
              label={specialty}
              isSelected={formData.specialties.includes(specialty)}
              onPress={() => toggleSpecialty(specialty)}
              theme={theme}
            />
          ))}
        </View>
      </View>

      <InputField
        label="Service Area"
        value={formData.serviceArea}
        onChangeText={(text) => updateFormData("serviceArea", text)}
        placeholder="San Francisco, CA (25 mile radius)"
        theme={theme}
      />

      <InputField
        label="Hourly Rate"
        value={formData.hourlyRate}
        onChangeText={(text) => updateFormData("hourlyRate", text)}
        placeholder="75"
        keyboardType="numeric"
        theme={theme}
      />
    </View>
  );
}
