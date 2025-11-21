import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Shield,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Phone,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import ScreenContainer from "../../components/ScreenContainer";
import { useTheme } from "../../utils/theme";
import { useLanguage } from "../../utils/LanguageContext";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function BookingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const bookings = [
    {
      id: 1,
      contractorName: "Mike Johnson",
      contractorSpecialty: "Licensed Electrician",
      contractorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      serviceTitle: "Kitchen Outlet Installation",
      date: "Nov 26, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "123 Main St, San Francisco, CA",
      price: "$180",
      status: "confirmed",
      verified: true,
      rating: 4.9,
    },
    {
      id: 2,
      contractorName: "Sarah Chen",
      contractorSpecialty: "Master Plumber",
      contractorImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      serviceTitle: "Bathroom Pipe Repair",
      date: "Nov 28, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "123 Main St, San Francisco, CA",
      price: "$150",
      status: "pending",
      verified: true,
      rating: 4.8,
    },
    {
      id: 3,
      contractorName: "David Rodriguez",
      contractorSpecialty: "General Contractor",
      contractorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      serviceTitle: "Living Room Renovation",
      date: "Nov 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "123 Main St, San Francisco, CA",
      price: "$2,400",
      status: "completed",
      verified: true,
      rating: 4.7,
      userRating: 5,
    },
    {
      id: 4,
      contractorName: "Lisa Thompson",
      contractorSpecialty: "Interior Painter",
      contractorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      serviceTitle: "Bedroom Painting",
      date: "Nov 10, 2024",
      time: "8:00 AM - 4:00 PM",
      location: "123 Main St, San Francisco, CA",
      price: "$320",
      status: "completed",
      verified: true,
      rating: 4.6,
      userRating: 4,
    },
  ];

  const tabs = [
    {
      id: "upcoming",
      label: t("upcoming"),
      count: bookings.filter(
        (b) => b.status === "confirmed" || b.status === "pending",
      ).length,
    },
    {
      id: "completed",
      label: t("completed"),
      count: bookings.filter((b) => b.status === "completed").length,
    },
  ];

  const filteredBookings =
    selectedTab === "upcoming"
      ? bookings.filter(
          (b) => b.status === "confirmed" || b.status === "pending",
        )
      : bookings.filter((b) => b.status === "completed");

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return theme.colors.green;
      case "pending":
        return theme.colors.orange;
      case "completed":
        return theme.colors.blue;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return CheckCircle;
      case "pending":
        return Clock;
      case "completed":
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending Approval";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const BookingCard = ({ booking }) => {
    const StatusIcon = getStatusIcon(booking.status);

    return (
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          opacity: pressed ? 0.7 : 1,
          ...theme.colors.shadow,
        })}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: booking.contractorImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 12,
              }}
            />
            {booking.verified && (
              <View
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: 8,
                  backgroundColor: theme.colors.iconBackground.verified,
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <Shield size={10} color={theme.colors.verified} />
              </View>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: theme.colors.text,
                  flex: 1,
                }}
                numberOfLines={1}
              >
                {booking.contractorName}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <StatusIcon size={14} color={getStatusColor(booking.status)} />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 12,
                    color: getStatusColor(booking.status),
                    marginLeft: 4,
                  }}
                >
                  {getStatusText(booking.status)}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 13,
                color: theme.colors.textSecondary,
                marginBottom: 4,
              }}
            >
              {booking.contractorSpecialty}
            </Text>

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
                  marginLeft: 4,
                }}
              >
                {booking.rating}
              </Text>
            </View>
          </View>
        </View>

        {/* Service Details */}
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
            {booking.serviceTitle}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Calendar size={14} color={theme.colors.textSecondary} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.text,
                marginLeft: 8,
              }}
            >
              {booking.date}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Clock size={14} color={theme.colors.textSecondary} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.text,
                marginLeft: 8,
              }}
            >
              {booking.time}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <MapPin size={14} color={theme.colors.textSecondary} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.text,
                marginLeft: 8,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {booking.location}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <DollarSign size={14} color={theme.colors.primary} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.primary,
                marginLeft: 4,
              }}
            >
              {booking.price}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          {booking.status === "upcoming" || booking.status === "confirmed" ? (
            <>
              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.colors.cardBorder,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleReschedule(booking)}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: theme.colors.text,
                  }}
                >
                  {t("reschedule")}
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleContactContractor(booking)}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  {t("contact")}
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              {!booking.userRating && (
                <Pressable
                  style={({ pressed }) => ({
                    flex: 1,
                    backgroundColor: theme.colors.primary,
                    borderRadius: 12,
                    paddingVertical: 12,
                    alignItems: "center",
                    opacity: pressed ? 0.7 : 1,
                  })}
                  onPress={() => handleRateService(booking)}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color: "#FFFFFF",
                    }}
                  >
                    {t("rateService")}
                  </Text>
                </Pressable>
              )}

              <Pressable
                style={({ pressed }) => ({
                  flex: booking.userRating ? 1 : 1,
                  backgroundColor: theme.colors.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.colors.cardBorder,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleBookAgain(booking)}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: theme.colors.text,
                  }}
                >
                  {t("bookAgain")}
                </Text>
              </Pressable>
            </>
          )}
        </View>

        {/* User Rating (for completed bookings) */}
        {booking.userRating && (
          <View
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: theme.colors.cardBorder,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                marginRight: 8,
              }}
            >
              Your rating:
            </Text>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                color={
                  star <= booking.userRating
                    ? theme.colors.orange
                    : theme.colors.cardBorder
                }
                fill={
                  star <= booking.userRating
                    ? theme.colors.orange
                    : "transparent"
                }
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
        )}
      </Pressable>
    );
  };

  const EmptyState = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: theme.colors.primarySoft,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Calendar size={32} color={theme.colors.textSecondary} />
      </View>

      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 20,
          color: theme.colors.text,
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        {t("noBookingsYet")}
      </Text>

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 16,
          color: theme.colors.textSecondary,
          textAlign: "center",
          lineHeight: 24,
        }}
      >
        {t("noBookingsDesc")}
      </Text>
    </View>
  );

  const handleContactContractor = (booking) => {
    Alert.alert(
      t("contact"),
      `How would you like to contact ${booking.contractorName}?`,
      [
        { text: t("cancel"), style: "cancel" },
        {
          text: "Message",
          onPress: () => router.push(`/chat/${booking.id}`),
        },
        {
          text: "Call",
          onPress: () => {
            const phoneNumber = booking.phoneNumber || "+1 555-123-4567";
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ],
    );
  };

  const handleReschedule = (booking) => {
    Alert.alert(
      t("reschedule"),
      "This will allow you to modify your booking time and date.",
      [
        { text: t("cancel"), style: "cancel" },
        {
          text: t("reschedule"),
          onPress: () => router.push(`/book/${booking.id}?reschedule=true`),
        },
      ],
    );
  };

  const handleRateService = (booking) => {
    router.push(`/rate/${booking.id}`);
  };

  const handleBookAgain = (booking) => {
    router.push(`/book/${booking.id}`);
  };

  return (
    <ScreenContainer scrollable={false}>
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 28,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          {t("yourBookings")}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.textSecondary,
          }}
        >
          {t("manageBookings")}
        </Text>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24,
          ...theme.colors.shadow,
        }}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            style={({ pressed }) => ({
              flex: 1,
              backgroundColor:
                selectedTab === tab.id ? theme.colors.primary : "transparent",
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => setSelectedTab(tab.id)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: selectedTab === tab.id ? "#FFFFFF" : theme.colors.text,
                  marginRight: tab.count > 0 ? 6 : 0,
                }}
              >
                {tab.label}
              </Text>
              {tab.count > 0 && (
                <View
                  style={{
                    backgroundColor:
                      selectedTab === tab.id
                        ? "rgba(255, 255, 255, 0.2)"
                        : theme.colors.primarySoft,
                    borderRadius: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    minWidth: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 11,
                      color:
                        selectedTab === tab.id
                          ? "#FFFFFF"
                          : theme.colors.primary,
                    }}
                  >
                    {tab.count}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </View>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BookingCard booking={item} />}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      ) : (
        <EmptyState />
      )}
    </ScreenContainer>
  );
}
