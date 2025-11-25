import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import {
  ArrowLeft,
  CreditCard,
  Plus,
  MoreHorizontal,
  Check,
  Trash2,
  Edit3,
  Wallet,
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

export default function PaymentMethodsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showAddCard, setShowAddCard] = useState(false);
  const [defaultPaymentId, setDefaultPaymentId] = useState("card1");

  const [newCardData, setNewCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    zipCode: "",
  });

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const paymentMethods = [
    {
      id: "card1",
      type: "credit",
      brand: "Visa",
      lastFour: "4242",
      expiryDate: "12/26",
      name: "John Smith",
      isDefault: true,
    },
    {
      id: "card2",
      type: "debit",
      brand: "Mastercard",
      lastFour: "8888",
      expiryDate: "10/25",
      name: "John Smith",
      isDefault: false,
    },
    {
      id: "paypal1",
      type: "paypal",
      email: "john.smith@email.com",
      isDefault: false,
    },
  ];

  const getCardBrandColor = (brand) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "#1A1F71";
      case "mastercard":
        return "#EB001B";
      case "amex":
        return "#006FCF";
      default:
        return theme.colors.primary;
    }
  };

  const handleSetDefault = (paymentId) => {
    setDefaultPaymentId(paymentId);
    Alert.alert("Success", "Default payment method updated successfully!");
  };

  const handleDeletePayment = (payment) => {
    Alert.alert(
      "Delete Payment Method",
      `Are you sure you want to delete this ${payment.type === "paypal" ? "PayPal account" : "card"}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "Payment method deleted successfully!");
          },
        },
      ],
    );
  };

  const handleEditPayment = (payment) => {
    Alert.alert(
      "Edit Payment Method",
      "Payment method editing will be available soon!",
      [{ text: "OK" }],
    );
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return match;
    }
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length <= 2) {
      return cleaned;
    }
    return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
  };

  const handleAddCard = () => {
    if (
      !newCardData.cardNumber ||
      !newCardData.expiryDate ||
      !newCardData.cvv ||
      !newCardData.name
    ) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    Alert.alert(
      "Card Added",
      "Your payment method has been added successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            setShowAddCard(false);
            setNewCardData({
              cardNumber: "",
              expiryDate: "",
              cvv: "",
              name: "",
              zipCode: "",
            });
          },
        },
      ],
    );
  };

  const PaymentMethodCard = ({ payment }) => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        ...theme.colors.shadow,
      }}
    >
      {payment.type === "paypal" ? (
        // PayPal Card
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#003087",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 12,
                  color: "#FFFFFF",
                }}
              >
                PP
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                PayPal
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                {payment.email}
              </Text>
            </View>

            {payment.id === defaultPaymentId && (
              <View
                style={{
                  backgroundColor: theme.colors.primarySoft,
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 10,
                    color: theme.colors.primary,
                  }}
                >
                  Default
                </Text>
              </View>
            )}

            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.primarySoft,
                borderRadius: 12,
                padding: 8,
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() => {
                Alert.alert("PayPal Options", "Choose an action", [
                  { text: "Cancel", style: "cancel" },
                  ...(payment.id !== defaultPaymentId
                    ? [
                        {
                          text: "Set as Default",
                          onPress: () => handleSetDefault(payment.id),
                        },
                      ]
                    : []),
                  {
                    text: "Delete",
                    onPress: () => handleDeletePayment(payment),
                    style: "destructive",
                  },
                ]);
              }}
            >
              <MoreHorizontal size={16} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>
      ) : (
        // Credit/Debit Card
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: getCardBrandColor(payment.brand),
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <CreditCard size={20} color="#FFFFFF" />
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: theme.colors.text,
                  }}
                >
                  {payment.brand}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                    marginLeft: 8,
                  }}
                >
                  •••• {payment.lastFour}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                Expires {payment.expiryDate}
              </Text>
            </View>

            {payment.id === defaultPaymentId && (
              <View
                style={{
                  backgroundColor: theme.colors.primarySoft,
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 10,
                    color: theme.colors.primary,
                  }}
                >
                  Default
                </Text>
              </View>
            )}

            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.primarySoft,
                borderRadius: 12,
                padding: 8,
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() => {
                Alert.alert("Card Options", "Choose an action", [
                  { text: "Cancel", style: "cancel" },
                  ...(payment.id !== defaultPaymentId
                    ? [
                        {
                          text: "Set as Default",
                          onPress: () => handleSetDefault(payment.id),
                        },
                      ]
                    : []),
                  { text: "Edit", onPress: () => handleEditPayment(payment) },
                  {
                    text: "Delete",
                    onPress: () => handleDeletePayment(payment),
                    style: "destructive",
                  },
                ]);
              }}
            >
              <MoreHorizontal size={16} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );

  const AddCardForm = () => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...theme.colors.shadow,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: theme.colors.text,
          marginBottom: 20,
        }}
      >
        Add New Card
      </Text>

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          Card Number *
        </Text>
        <TextInput
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 12,
            padding: 16,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.cardBorder,
          }}
          value={newCardData.cardNumber}
          onChangeText={(text) => {
            const formatted = formatCardNumber(text);
            setNewCardData((prev) => ({ ...prev, cardNumber: formatted }));
          }}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="numeric"
          maxLength={19}
        />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.colors.text,
              marginBottom: 8,
            }}
          >
            Expiry Date *
          </Text>
          <TextInput
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              padding: 16,
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: theme.colors.text,
              borderWidth: 1,
              borderColor: theme.colors.cardBorder,
            }}
            value={newCardData.expiryDate}
            onChangeText={(text) => {
              const formatted = formatExpiryDate(text);
              setNewCardData((prev) => ({ ...prev, expiryDate: formatted }));
            }}
            placeholder="MM/YY"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.colors.text,
              marginBottom: 8,
            }}
          >
            CVV *
          </Text>
          <TextInput
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              padding: 16,
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: theme.colors.text,
              borderWidth: 1,
              borderColor: theme.colors.cardBorder,
            }}
            value={newCardData.cvv}
            onChangeText={(text) => {
              const cleaned = text.replace(/\D/g, "");
              setNewCardData((prev) => ({ ...prev, cvv: cleaned }));
            }}
            placeholder="123"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
          />
        </View>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          Cardholder Name *
        </Text>
        <TextInput
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 12,
            padding: 16,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.cardBorder,
          }}
          value={newCardData.name}
          onChangeText={(text) =>
            setNewCardData((prev) => ({ ...prev, name: text }))
          }
          placeholder="John Smith"
          placeholderTextColor={theme.colors.textSecondary}
          autoCapitalize="words"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          ZIP Code
        </Text>
        <TextInput
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 12,
            padding: 16,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.cardBorder,
          }}
          value={newCardData.zipCode}
          onChangeText={(text) =>
            setNewCardData((prev) => ({ ...prev, zipCode: text }))
          }
          placeholder="12345"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="numeric"
        />
      </View>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Pressable
          style={({ pressed }) => ({
            flex: 1,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.cardBorder,
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={() => {
            setShowAddCard(false);
            setNewCardData({
              cardNumber: "",
              expiryDate: "",
              cvv: "",
              name: "",
              zipCode: "",
            });
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: theme.colors.text,
            }}
          >
            Cancel
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => ({
            flex: 1,
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={handleAddCard}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#FFFFFF",
            }}
          >
            Add Card
          </Text>
        </Pressable>
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
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.cardBorder,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
              }}
            >
              Payment Methods
            </Text>
          </View>

          {!showAddCard && (
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 8,
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() => setShowAddCard(true)}
            >
              <Plus size={16} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {showAddCard && <AddCardForm />}

        {/* Current Payment Methods */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: theme.colors.text,
            marginBottom: 16,
          }}
        >
          Saved Payment Methods
        </Text>

        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.id} payment={method} />
        ))}

        {/* Add Payment Options */}
        {!showAddCard && (
          <View style={{ marginTop: 20 }}>
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
                ...theme.colors.shadow,
              })}
              onPress={() => setShowAddCard(true)}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: theme.colors.primarySoft,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <CreditCard size={20} color={theme.colors.primary} />
              </View>

              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                Add Credit or Debit Card
              </Text>

              <Plus size={20} color={theme.colors.textSecondary} />
            </Pressable>

            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
                ...theme.colors.shadow,
              })}
              onPress={() => {
                Alert.alert(
                  "Add PayPal",
                  "PayPal integration will be available soon!",
                  [{ text: "OK" }],
                );
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#003087",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 12,
                    color: "#FFFFFF",
                  }}
                >
                  PP
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                Add PayPal Account
              </Text>

              <Plus size={20} color={theme.colors.textSecondary} />
            </Pressable>
          </View>
        )}

        {/* Security Info */}
        <View
          style={{
            backgroundColor: theme.colors.primarySoft,
            borderRadius: 12,
            padding: 16,
            marginTop: 20,
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
            Your payment information is secure
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
              lineHeight: 20,
            }}
          >
            We use industry-standard encryption to protect your payment
            information. Your card details are never stored on our servers.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingAnimatedView>
  );
}
