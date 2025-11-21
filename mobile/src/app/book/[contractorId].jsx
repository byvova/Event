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
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  User,
  Phone,
  Mail,
  MessageSquare,
  Shield,
  Star,
  CheckCircle2,
  AlertCircle,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import KeyboardAvoidingAnimatedView from "../../components/KeyboardAvoidingAnimatedView";
import { useTheme } from "../../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function BookServiceScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { contractorId } = useLocalSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [urgency, setUrgency] = useState("standard");
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [address, setAddress] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("2");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock contractor data
  const contractor = {
    id: contractorId,
    name: "Mike Johnson",
    specialty: "Licensed Electrician",
    hourlyRate: 85,
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    responseTime: "Usually responds within 2 hours",
    completedJobs: 156,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  const steps = [
    { id: 1, title: "Service Details", subtitle: "What do you need?" },
    { id: 2, title: "Schedule", subtitle: "When do you need it?" },
    { id: 3, title: "Contact Info", subtitle: "How can we reach you?" },
    { id: 4, title: "Review", subtitle: "Confirm your booking" },
  ];

  const availableDates = [
    { date: "Nov 26", day: "Today", available: true },
    { date: "Nov 27", day: "Tomorrow", available: true },
    { date: "Nov 28", day: "Thursday", available: true },
    { date: "Nov 29", day: "Friday", available: false },
    { date: "Dec 2", day: "Monday", available: true },
    { date: "Dec 3", day: "Tuesday", available: true },
  ];

  const availableTimes = [
    { time: "8:00 AM", available: true },
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "11:00 AM", available: true },
    { time: "1:00 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: false },
    { time: "4:00 PM", available: true },
  ];

  const serviceTypes = [
    {
      name: "Electrical Installation",
      price: "Standard Rate",
      duration: "2-4 hours",
    },
    {
      name: "Electrical Repair",
      price: "Standard Rate",
      duration: "1-3 hours",
    },
    {
      name: "Circuit Breaker Work",
      price: "Standard Rate",
      duration: "2-3 hours",
    },
    {
      name: "Outlet Installation",
      price: "Standard Rate",
      duration: "1-2 hours",
    },
    {
      name: "Lighting Installation",
      price: "Standard Rate",
      duration: "2-4 hours",
    },
    { name: "Panel Upgrade", price: "+25% Premium", duration: "4-8 hours" },
    {
      name: "Emergency Repair",
      price: "+50% Emergency",
      duration: "1-3 hours",
    },
    { name: "Custom Project", price: "Quote Required", duration: "Varies" },
  ];

  const urgencyOptions = [
    {
      id: "standard",
      name: "Standard",
      description: "Within 1-2 weeks",
      price: "Standard Rate",
      multiplier: 1,
      color: theme.colors.green,
    },
    {
      id: "priority",
      name: "Priority",
      description: "Within 2-3 days",
      price: "+25% Priority Fee",
      multiplier: 1.25,
      color: theme.colors.orange,
    },
    {
      id: "emergency",
      name: "Emergency",
      description: "Same day/24 hours",
      price: "+50% Emergency Fee",
      multiplier: 1.5,
      color: theme.colors.red,
    },
  ];

  const calculateTotal = () => {
    const hours = parseFloat(estimatedHours) || 0;
    const baseRate = contractor.hourlyRate * hours;
    const urgencyMultiplier =
      urgencyOptions.find((opt) => opt.id === urgency)?.multiplier || 1;
    return baseRate * urgencyMultiplier;
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return serviceType && urgency && description;
      case 2:
        return selectedDate && selectedTime && estimatedHours;
      case 3:
        return contactName && contactPhone && address;
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

  const handleBookService = () => {
    const bookingData = {
      contractorId,
      serviceType,
      urgency,
      selectedDate,
      selectedTime,
      description,
      estimatedHours,
      contactName,
      contactPhone,
      contactEmail,
      address,
    };

    const mockBookingId = Date.now().toString();
    router.push(`/payment/${mockBookingId}`);
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

  const ServiceTypeCard = ({ service, isSelected, onSelect }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: isSelected ? 2 : 1,
        borderColor: isSelected
          ? theme.colors.primary
          : theme.colors.cardBorder,
        opacity: pressed ? 0.7 : 1,
        ...theme.colors.shadow,
      })}
      onPress={() => onSelect(service.name)}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: theme.colors.text,
              marginBottom: 4,
            }}
          >
            {service.name}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
              marginBottom: 4,
            }}
          >
            {service.duration}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.colors.primary,
            }}
          >
            {service.price}
          </Text>
        </View>

        {isSelected && <CheckCircle2 size={20} color={theme.colors.primary} />}
      </View>
    </Pressable>
  );

  const UrgencyCard = ({ option, isSelected, onSelect }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: isSelected ? 2 : 1,
        borderColor: isSelected ? option.color : theme.colors.cardBorder,
        opacity: pressed ? 0.7 : 1,
        ...theme.colors.shadow,
      })}
      onPress={() => onSelect(option.id)}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
              {option.name}
            </Text>
            {option.id === "emergency" && (
              <AlertCircle size={16} color={option.color} />
            )}
          </View>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
              marginBottom: 4,
            }}
          >
            {option.description}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: option.color,
            }}
          >
            {option.price}
          </Text>
        </View>

        {isSelected && <CheckCircle2 size={20} color={option.color} />}
      </View>
    </Pressable>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 16,
              }}
            >
              What service do you need?
            </Text>

            {serviceTypes.map((service) => (
              <ServiceTypeCard
                key={service.name}
                service={service}
                isSelected={serviceType === service.name}
                onSelect={setServiceType}
              />
            ))}

            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginTop: 24,
                marginBottom: 16,
              }}
            >
              When do you need this done?
            </Text>

            {urgencyOptions.map((option) => (
              <UrgencyCard
                key={option.id}
                option={option}
                isSelected={urgency === option.id}
                onSelect={setUrgency}
              />
            ))}

            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginTop: 24,
                marginBottom: 8,
              }}
            >
              Service Description *
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
              placeholder="Describe the work you need done in detail..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline={true}
            />
          </View>
        );

      case 2:
        return (
          <View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 16,
              }}
            >
              Select your preferred date
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 24,
              }}
            >
              {availableDates.map((dateOption) => (
                <Pressable
                  key={dateOption.date}
                  disabled={!dateOption.available}
                  style={({ pressed }) => ({
                    backgroundColor: !dateOption.available
                      ? theme.colors.cardBorder
                      : selectedDate === dateOption.date
                        ? theme.colors.primary
                        : theme.colors.cardBackground,
                    borderRadius: 12,
                    padding: 16,
                    flex: 0.48,
                    alignItems: "center",
                    opacity: pressed ? 0.7 : !dateOption.available ? 0.5 : 1,
                    ...theme.colors.shadow,
                  })}
                  onPress={() => setSelectedDate(dateOption.date)}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 16,
                      color:
                        selectedDate === dateOption.date
                          ? "#FFFFFF"
                          : theme.colors.text,
                      marginBottom: 4,
                    }}
                  >
                    {dateOption.date}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                      color:
                        selectedDate === dateOption.date
                          ? "rgba(255,255,255,0.8)"
                          : theme.colors.textSecondary,
                    }}
                  >
                    {dateOption.day}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 16,
              }}
            >
              Select your preferred time
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 24,
              }}
            >
              {availableTimes.map((timeOption) => (
                <Pressable
                  key={timeOption.time}
                  disabled={!timeOption.available}
                  style={({ pressed }) => ({
                    backgroundColor: !timeOption.available
                      ? theme.colors.cardBorder
                      : selectedTime === timeOption.time
                        ? theme.colors.primary
                        : theme.colors.cardBackground,
                    borderRadius: 8,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    flex: 0.31,
                    alignItems: "center",
                    opacity: pressed ? 0.7 : !timeOption.available ? 0.5 : 1,
                    ...theme.colors.shadow,
                  })}
                  onPress={() => setSelectedTime(timeOption.time)}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color:
                        selectedTime === timeOption.time
                          ? "#FFFFFF"
                          : theme.colors.text,
                    }}
                  >
                    {timeOption.time}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              Estimated Hours *
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
              value={estimatedHours}
              onChangeText={setEstimatedHours}
              placeholder="2"
              keyboardType="numeric"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        );

      case 3:
        return (
          <View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 16,
              }}
            >
              Contact Information
            </Text>

            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              Full Name *
            </Text>
            <TextInput
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: theme.colors.cardBorder,
                ...theme.colors.shadow,
              }}
              value={contactName}
              onChangeText={setContactName}
              placeholder="Your full name"
              placeholderTextColor={theme.colors.textSecondary}
            />

            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              Phone Number *
            </Text>
            <TextInput
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: theme.colors.cardBorder,
                ...theme.colors.shadow,
              }}
              value={contactPhone}
              onChangeText={setContactPhone}
              placeholder="(555) 123-4567"
              keyboardType="phone-pad"
              placeholderTextColor={theme.colors.textSecondary}
            />

            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              Email Address
            </Text>
            <TextInput
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: theme.colors.cardBorder,
                ...theme.colors.shadow,
              }}
              value={contactEmail}
              onChangeText={setContactEmail}
              placeholder="your.email@example.com"
              keyboardType="email-address"
              placeholderTextColor={theme.colors.textSecondary}
            />

            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              Service Address *
            </Text>
            <TextInput
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: theme.colors.text,
                minHeight: 80,
                textAlignVertical: "top",
                borderWidth: 1,
                borderColor: theme.colors.cardBorder,
                ...theme.colors.shadow,
              }}
              value={address}
              onChangeText={setAddress}
              placeholder="123 Main St, City, State, ZIP"
              placeholderTextColor={theme.colors.textSecondary}
              multiline={true}
            />
          </View>
        );

      case 4:
        return (
          <View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 24,
              }}
            >
              Review Your Booking
            </Text>

            {/* Service Summary */}
            <View
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                ...theme.colors.shadow,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 12,
                }}
              >
                Service Details
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  marginBottom: 4,
                }}
              >
                Service: {serviceType}
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  marginBottom: 4,
                }}
              >
                Priority:{" "}
                {urgencyOptions.find((opt) => opt.id === urgency)?.name}
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  marginBottom: 4,
                }}
              >
                Date: {selectedDate} at {selectedTime}
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                Estimated Duration: {estimatedHours} hours
              </Text>
            </View>

            {/* Contact Summary */}
            <View
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                ...theme.colors.shadow,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 12,
                }}
              >
                Contact Information
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  marginBottom: 4,
                }}
              >
                Name: {contactName}
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  marginBottom: 4,
                }}
              >
                Phone: {contactPhone}
              </Text>
              {contactEmail && (
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                    marginBottom: 4,
                  }}
                >
                  Email: {contactEmail}
                </Text>
              )}
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                Address: {address}
              </Text>
            </View>

            {/* Cost Summary */}
            <View
              style={{
                backgroundColor: theme.colors.primarySoft,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 12,
                }}
              >
                Cost Estimate
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                  }}
                >
                  Base Rate ({estimatedHours} hrs × ${contractor.hourlyRate}/hr)
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: theme.colors.text,
                  }}
                >
                  $
                  {(parseFloat(estimatedHours) * contractor.hourlyRate).toFixed(
                    2,
                  )}
                </Text>
              </View>

              {urgency !== "standard" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    {urgencyOptions.find((opt) => opt.id === urgency)?.name} Fee
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color: theme.colors.text,
                    }}
                  >
                    +$
                    {(
                      calculateTotal() -
                      parseFloat(estimatedHours) * contractor.hourlyRate
                    ).toFixed(2)}
                  </Text>
                </View>
              )}

              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: theme.colors.cardBorder,
                  paddingTop: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: theme.colors.text,
                  }}
                >
                  Total Estimate
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 18,
                    color: theme.colors.primary,
                  }}
                >
                  ${calculateTotal().toFixed(2)}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: theme.colors.iconBackground.info,
                borderRadius: 8,
                padding: 12,
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <AlertCircle
                size={16}
                color={theme.colors.blue}
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.colors.textSecondary,
                  flex: 1,
                  lineHeight: 18,
                }}
              >
                Final cost may vary based on actual work performed. You'll only
                pay a deposit upfront, with the remaining balance due after
                completion.
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
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
            Book Service
          </Text>
        </View>

        {/* Contractor Info */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: contractor.image }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 12,
            }}
          />

          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginRight: 6,
                }}
              >
                {contractor.name}
              </Text>
              {contractor.verified && (
                <Shield size={14} color={theme.colors.verified} />
              )}
            </View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
              }}
            >
              {contractor.specialty} • ${contractor.hourlyRate}/hr
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                marginLeft: 2,
              }}
            >
              {contractor.rating}
            </Text>
          </View>
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
            onPress={currentStep === 4 ? handleBookService : handleNext}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              {currentStep === 4 ? "Confirm Booking" : "Continue"}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
