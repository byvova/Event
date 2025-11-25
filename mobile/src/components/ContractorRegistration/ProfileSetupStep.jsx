import React from "react";
import { View, Text, Pressable } from "react-native";
import { CheckCircle2 } from "lucide-react-native";
import { InputField } from "./InputField";
import { SelectableChip } from "./SelectableChip";

const availabilityOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function ProfileSetupStep({
  formData,
  updateFormData,
  toggleAvailability,
  theme,
}) {
  return (
    <View>
      <InputField
        label="Professional Bio"
        value={formData.bio}
        onChangeText={(text) => updateFormData("bio", text)}
        placeholder="Tell potential customers about your experience, specialties, and what sets you apart..."
        multiline={true}
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
          Availability <Text style={{ color: theme.colors.red }}>*</Text>
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {availabilityOptions.map((day) => (
            <SelectableChip
              key={day}
              label={day}
              isSelected={formData.availability.includes(day)}
              onPress={() => toggleAvailability(day)}
              theme={theme}
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
            updateFormData("emergencyServices", !formData.emergencyServices)
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
          credentials and verify your license and insurance. You'll receive an
          email confirmation within 24-48 hours with next steps.
        </Text>
      </View>
    </View>
  );
}
