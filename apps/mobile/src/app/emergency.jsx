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
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Zap,
  Droplets,
  Wrench,
  Shield,
  Star,
  DollarSign,
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

export default function EmergencyRequestScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [description, setDescription] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isUrgent, setIsUrgent] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const emergencyTypes = [
    {
      id: "electrical",
      title: "Electrical Emergency",
      description: "Power outages, sparking outlets, electrical fires",
      icon: Zap,
      color: theme.colors.orange,
      examples: [
        "No power",
        "Sparking outlet",
        "Burning smell",
        "Electrical fire",
      ],
    },
    {
      id: "plumbing",
      title: "Plumbing Emergency",
      description: "Burst pipes, flooding, major leaks",
      icon: Droplets,
      color: theme.colors.blue,
      examples: ["Burst pipe", "Flooding", "No water", "Sewage backup"],
    },
    {
      id: "hvac",
      title: "HVAC Emergency",
      description: "No heat/cooling, gas leaks, carbon monoxide",
      icon: Wrench,
      color: theme.colors.red,
      examples: [
        "No heat in winter",
        "No AC in extreme heat",
        "Gas leak",
        "CO detector alarm",
      ],
    },
  ];

  // Mock emergency contractors (available 24/7)
  const emergencyContractors = [
    {
      id: 1,
      name: "Emergency Pro Services",
      specialty: "24/7 Emergency Response",
      rating: 4.9,
      reviewCount: 287,
      verified: true,
      responseTime: "15-30 minutes",
      rate: "$120/hr + emergency fee",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      available: true,
      distance: "1.2 miles",
    },
    {
      id: 2,
      name: "Rapid Response Team",
      specialty: "Emergency Contractors",
      rating: 4.8,
      reviewCount: 193,
      verified: true,
      responseTime: "20-45 minutes",
      rate: "$110/hr + emergency fee",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      available: true,
      distance: "2.1 miles",
    },
  ];

  const handleEmergencyRequest = () => {
    if (
      !selectedEmergency ||
      !description.trim() ||
      !contactPhone.trim() ||
      !address.trim()
    ) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    Alert.alert(
      "Emergency Request Sent!",
      "Your emergency request has been sent to available contractors. You should receive a call within 15-30 minutes. If this is a life-threatening emergency, please call 911 immediately.",
      [
        {
          text: "Call 911",
          onPress: () => console.log("Calling 911..."),
          style: "destructive",
        },
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/bookings"),
        },
      ],
    );
  };

  const EmergencyTypeCard = ({ emergency, isSelected, onSelect }) => {
    const IconComponent = emergency.icon;

    return (
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: isSelected
            ? emergency.color + "15"
            : theme.colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? emergency.color : theme.colors.cardBorder,
          opacity: pressed ? 0.7 : 1,
          ...theme.colors.shadow,
        })}
        onPress={onSelect}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              backgroundColor: emergency.color + "20",
              borderRadius: 12,
              padding: 12,
              marginRight: 16,
            }}
          >
            <IconComponent size={24} color={emergency.color} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {emergency.title}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                lineHeight: 20,
              }}
            >
              {emergency.description}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: theme.colors.textSecondary,
            marginBottom: 8,
          }}
        >
          Common issues:
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {emergency.examples.map((example, index) => (
            <View
              key={index}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 4,
                marginRight: 8,
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.colors.textSecondary,
                }}
              >
                {example}
              </Text>
            </View>
          ))}
        </View>
      </Pressable>
    );
  };

  const ContractorCard = ({ contractor }) => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.green,
        ...theme.colors.shadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <Image
          source={{ uri: contractor.image }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 12,
          }}
        />

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.text,
                marginRight: 8,
              }}
            >
              {contractor.name}
            </Text>
            {contractor.verified && (
              <Shield size={14} color={theme.colors.verified} />
            )}
            <View
              style={{
                backgroundColor: theme.colors.green,
                borderRadius: 8,
                paddingHorizontal: 6,
                paddingVertical: 2,
                marginLeft: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 10,
                  color: "#FFFFFF",
                }}
              >
                AVAILABLE
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
              marginBottom: 8,
            }}
          >
            {contractor.specialty}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Star
              size={12}
              color={theme.colors.orange}
              fill={theme.colors.orange}
            />
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 12,
                color: theme.colors.text,
                marginLeft: 4,
                marginRight: 8,
              }}
            >
              {contractor.rating}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
                marginRight: 16,
              }}
            >
              ({contractor.reviewCount})
            </Text>

            <Clock size={12} color={theme.colors.textSecondary} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
                marginLeft: 4,
              }}
            >
              {contractor.responseTime}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.colors.textMuted,
              }}
            >
              {contractor.distance} away
            </Text>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 12,
                color: theme.colors.red,
              }}
            >
              {contractor.rate}
            </Text>
          </View>
        </View>
      </View>
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
          backgroundColor: theme.colors.red,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.cardBorder,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 12,
              padding: 8,
              marginRight: 16,
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </Pressable>

          <AlertTriangle size={24} color="#FFFFFF" />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: "#FFFFFF",
              marginLeft: 8,
            }}
          >
            Emergency Request
          </Text>
        </View>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.9)",
            marginLeft: 48,
          }}
        >
          For life-threatening emergencies, call 911 immediately
        </Text>
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
        {/* Emergency Type Selection */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 20,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          What type of emergency?
        </Text>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.colors.textSecondary,
            marginBottom: 20,
            lineHeight: 20,
          }}
        >
          Select the type of emergency you're experiencing. This helps us
          connect you with the right specialist.
        </Text>

        {emergencyTypes.map((emergency) => (
          <EmergencyTypeCard
            key={emergency.id}
            emergency={emergency}
            isSelected={selectedEmergency?.id === emergency.id}
            onSelect={() => setSelectedEmergency(emergency)}
          />
        ))}

        {selectedEmergency && (
          <>
            {/* Emergency Details */}
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginTop: 8,
                marginBottom: 16,
              }}
            >
              Emergency Details
            </Text>

            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Describe the emergency{" "}
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
                  minHeight: 100,
                  textAlignVertical: "top",
                  borderWidth: 1,
                  borderColor: theme.colors.cardBorder,
                  ...theme.colors.shadow,
                }}
                value={description}
                onChangeText={setDescription}
                placeholder="Please describe the emergency situation in detail..."
                placeholderTextColor={theme.colors.textSecondary}
                multiline
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Emergency Contact Phone{" "}
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
                value={contactPhone}
                onChangeText={setContactPhone}
                placeholder="(555) 123-4567"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="phone-pad"
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Emergency Location{" "}
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
                value={address}
                onChangeText={setAddress}
                placeholder="123 Main St, City, State, ZIP"
                placeholderTextColor={theme.colors.textSecondary}
                multiline
              />
            </View>

            {/* Available Emergency Contractors */}
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              Available Emergency Contractors
            </Text>

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                marginBottom: 16,
                lineHeight: 20,
              }}
            >
              These contractors are available 24/7 for emergency services.
              Emergency rates apply.
            </Text>

            {emergencyContractors.map((contractor) => (
              <ContractorCard key={contractor.id} contractor={contractor} />
            ))}

            {/* Emergency Pricing Info */}
            <View
              style={{
                backgroundColor: theme.colors.orange + "15",
                borderRadius: 12,
                padding: 16,
                marginTop: 8,
                borderLeftWidth: 4,
                borderLeftColor: theme.colors.orange,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <DollarSign size={16} color={theme.colors.orange} />
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: theme.colors.text,
                    marginLeft: 8,
                  }}
                >
                  Emergency Service Pricing
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  lineHeight: 20,
                }}
              >
                Emergency services include higher rates and emergency fees due
                to 24/7 availability and rapid response times. Standard hourly
                rates range from $110-$120/hour plus emergency fees of $50-$100.
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom Action Button */}
      {selectedEmergency && (
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
              backgroundColor: theme.colors.red,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={handleEmergencyRequest}
          >
            <AlertTriangle size={20} color="#FFFFFF" />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#FFFFFF",
                marginLeft: 8,
              }}
            >
              Send Emergency Request
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => ({
              alignItems: "center",
              paddingVertical: 12,
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => {
              Alert.alert(
                "Call 911",
                "This will call emergency services for life-threatening emergencies.",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Call 911",
                    onPress: () => console.log("Calling 911..."),
                  },
                ],
              );
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Phone size={16} color={theme.colors.red} />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.red,
                  marginLeft: 6,
                }}
              >
                Life-threatening emergency? Call 911
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingAnimatedView>
  );
}
