import React from "react";
import { View, Text } from "react-native";
import { CheckCircle2 } from "lucide-react-native";

export function ProgressBar({ steps, currentStep, theme }) {
  return (
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
}
