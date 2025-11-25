import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Alert, Image } from "react-native";
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Shield,
  CheckCircle,
  Apple,
  Clock,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function PaymentScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bookingId } = useLocalSearchParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [selectedCard, setSelectedCard] = useState(0);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock booking data
  const booking = {
    id: bookingId,
    contractor: {
      name: "Mike Johnson",
      specialty: "Licensed Electrician",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      verified: true,
    },
    service: "Electrical Installation",
    date: "Dec 3, 2024",
    time: "2:00 PM",
    estimatedHours: 3,
    hourlyRate: 85,
    subtotal: 255,
    serviceFee: 25.5,
    tax: 22.95,
    total: 303.45,
    depositRequired: 101.15, // 1/3 of total
    address: "123 Main St, San Francisco, CA",
  };

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "apple", name: "Apple Pay", icon: Apple },
    { id: "wallet", name: "LicenFind Wallet", icon: Wallet },
  ];

  const savedCards = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      brand: "visa",
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      brand: "mastercard",
      expiryMonth: 9,
      expiryYear: 2025,
      isDefault: false,
    },
  ];

  const handlePayment = () => {
    Alert.alert(
      "Payment Confirmation",
      `Process payment of $${booking.depositRequired.toFixed(2)} for booking deposit?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Pay Now",
          onPress: () => {
            // Simulate payment processing
            setTimeout(() => {
              Alert.alert(
                "Payment Successful!",
                `Your booking with ${booking.contractor.name} has been confirmed. You'll receive a confirmation email shortly.`,
                [
                  {
                    text: "View Booking",
                    onPress: () => router.replace("/(tabs)/bookings"),
                  },
                ],
              );
            }, 1500);
          },
        },
      ],
    );
  };

  const PaymentMethodCard = ({ method, isSelected, onSelect }) => {
    const IconComponent = method.icon;

    return (
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
        onPress={onSelect}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: theme.colors.iconBackground.default,
              borderRadius: 10,
              padding: 8,
              marginRight: 12,
            }}
          >
            <IconComponent size={20} color={theme.colors.text} />
          </View>

          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 16,
              color: theme.colors.text,
              flex: 1,
            }}
          >
            {method.name}
          </Text>

          {isSelected && <CheckCircle size={20} color={theme.colors.primary} />}
        </View>
      </Pressable>
    );
  };

  const CreditCardCard = ({ card, isSelected, onSelect }) => {
    return (
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
        onPress={onSelect}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: card.brand === "visa" ? "#1A1F71" : "#EB001B",
                borderRadius: 8,
                padding: 8,
                marginRight: 12,
                width: 40,
                height: 28,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 10,
                  color: "#FFFFFF",
                }}
              >
                {card.brand.toUpperCase()}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                •••• {card.last4}
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.colors.textSecondary,
                }}
              >
                Expires {card.expiryMonth.toString().padStart(2, "0")}/
                {card.expiryYear.toString().slice(-2)}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            {card.isDefault && (
              <View
                style={{
                  backgroundColor: theme.colors.green,
                  borderRadius: 6,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 10,
                    color: "#FFFFFF",
                  }}
                >
                  DEFAULT
                </Text>
              </View>
            )}
            {isSelected && (
              <CheckCircle size={20} color={theme.colors.primary} />
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
            onPress={() => router.back()}
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
            Payment
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
        {/* Booking Summary */}
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            ...theme.colors.shadow,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            Booking Summary
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Image
              source={{ uri: booking.contractor.image }}
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
                  {booking.contractor.name}
                </Text>
                {booking.contractor.verified && (
                  <Shield size={14} color={theme.colors.verified} />
                )}
              </View>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                {booking.contractor.specialty}
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              {booking.service}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <Clock size={14} color={theme.colors.textSecondary} />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  marginLeft: 6,
                }}
              >
                {booking.date} at {booking.time}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
              }}
            >
              Estimated {booking.estimatedHours} hours • ${booking.hourlyRate}
              /hr
            </Text>
          </View>

          {/* Cost Breakdown */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: theme.colors.cardBorder,
              paddingTop: 16,
            }}
          >
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
                Service ({booking.estimatedHours} hours)
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.text,
                }}
              >
                ${booking.subtotal.toFixed(2)}
              </Text>
            </View>

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
                Service Fee
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.text,
                }}
              >
                ${booking.serviceFee.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                Tax
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.text,
                }}
              >
                ${booking.tax.toFixed(2)}
              </Text>
            </View>

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
                Total
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: theme.colors.text,
                }}
              >
                ${booking.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Deposit Info */}
        <View
          style={{
            backgroundColor: theme.colors.primarySoft,
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
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
            Pay Deposit Today: ${booking.depositRequired.toFixed(2)}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
              lineHeight: 20,
            }}
          >
            The remaining $
            {(booking.total - booking.depositRequired).toFixed(2)} will be
            charged after service completion. All payments are secured and
            protected.
          </Text>
        </View>

        {/* Payment Methods */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: theme.colors.text,
            marginBottom: 16,
          }}
        >
          Payment Method
        </Text>

        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            isSelected={selectedPaymentMethod === method.id}
            onSelect={() => setSelectedPaymentMethod(method.id)}
          />
        ))}

        {/* Credit Cards */}
        {selectedPaymentMethod === "card" && (
          <View style={{ marginTop: 12 }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 12,
              }}
            >
              Select Card
            </Text>

            {savedCards.map((card, index) => (
              <CreditCardCard
                key={card.id}
                card={card}
                isSelected={selectedCard === index}
                onSelect={() => setSelectedCard(index)}
              />
            ))}

            <Pressable
              style={({ pressed }) => ({
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: theme.colors.primary,
                borderStyle: "dashed",
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.primary,
                }}
              >
                + Add New Card
              </Text>
            </Pressable>
          </View>
        )}

        {/* Security Info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 12,
            padding: 16,
            marginTop: 24,
            ...theme.colors.shadow,
          }}
        >
          <Shield size={20} color={theme.colors.green} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
              marginLeft: 12,
              flex: 1,
            }}
          >
            Your payment information is encrypted and secure. We never store
            your card details.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Payment Button */}
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
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={handlePayment}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#FFFFFF",
            }}
          >
            Pay ${booking.depositRequired.toFixed(2)} Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
