import React, { useState } from "react";
import { View, Text, Pressable, Image, ScrollView, Alert } from "react-native";
import {
  ArrowLeft,
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
  Search,
  Filter,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenContainer from "../components/ScreenContainer";
import { useTheme } from "../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function BookingHistoryScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const bookingHistory = [
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
      status: "upcoming",
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
      status: "confirmed",
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
    {
      id: 5,
      contractorName: "Tom Wilson",
      contractorSpecialty: "HVAC Technician",
      contractorImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      serviceTitle: "AC Unit Maintenance",
      date: "Oct 28, 2024",
      time: "1:00 PM - 3:00 PM",
      location: "123 Main St, San Francisco, CA",
      price: "$95",
      status: "completed",
      verified: true,
      rating: 4.9,
      userRating: 5,
    },
    {
      id: 6,
      contractorName: "Jennifer Lee",
      contractorSpecialty: "Landscaper",
      contractorImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      serviceTitle: "Garden Cleanup",
      date: "Oct 15, 2024",
      time: "9:00 AM - 2:00 PM",
      location: "123 Main St, San Francisco, CA",
      price: "$280",
      status: "completed",
      verified: true,
      rating: 4.5,
      userRating: 4,
    },
  ];

  const filterOptions = [
    { id: "all", label: "All", count: bookingHistory.length },
    {
      id: "upcoming",
      label: "Upcoming",
      count: bookingHistory.filter(
        (b) => b.status === "upcoming" || b.status === "confirmed",
      ).length,
    },
    {
      id: "completed",
      label: "Completed",
      count: bookingHistory.filter((b) => b.status === "completed").length,
    },
  ];

  const filteredBookings =
    selectedFilter === "all"
      ? bookingHistory
      : selectedFilter === "upcoming"
        ? bookingHistory.filter(
            (b) => b.status === "upcoming" || b.status === "confirmed",
          )
        : bookingHistory.filter((b) => b.status === selectedFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return theme.colors.green;
      case "upcoming":
        return theme.colors.blue;
      case "completed":
        return theme.colors.purple;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return CheckCircle;
      case "upcoming":
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
      case "upcoming":
        return "Upcoming";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const handleBookingAction = (booking, action) => {
    switch (action) {
      case "contact":
        Alert.alert(
          "Contact Contractor",
          `How would you like to contact ${booking.contractorName}?`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Message",
              onPress: () => router.push(`/chat/${booking.id}`),
            },
            { text: "Call", onPress: () => {} },
          ],
        );
        break;
      case "reschedule":
        Alert.alert(
          "Reschedule Booking",
          "This will allow you to modify your booking time and date.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Reschedule",
              onPress: () => router.push(`/book/${booking.id}?reschedule=true`),
            },
          ],
        );
        break;
      case "rate":
        router.push(`/rate/${booking.id}`);
        break;
      case "book-again":
        router.push(`/book/${booking.id}`);
        break;
      case "view-receipt":
        Alert.alert("Receipt", "View receipt functionality coming soon!");
        break;
    }
  };

  const BookingCard = ({ booking }) => {
    const StatusIcon = getStatusIcon(booking.status);

    return (
      <View
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          ...theme.colors.shadow,
        }}
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
        <View style={{ flexDirection: "row", gap: 8 }}>
          {booking.status === "completed" ? (
            <>
              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.colors.cardBorder,
                  borderRadius: 12,
                  paddingVertical: 10,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleBookingAction(booking, "view-receipt")}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 12,
                    color: theme.colors.text,
                  }}
                >
                  Receipt
                </Text>
              </Pressable>

              {!booking.userRating && (
                <Pressable
                  style={({ pressed }) => ({
                    flex: 1,
                    backgroundColor: theme.colors.primary,
                    borderRadius: 12,
                    paddingVertical: 10,
                    alignItems: "center",
                    opacity: pressed ? 0.7 : 1,
                  })}
                  onPress={() => handleBookingAction(booking, "rate")}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 12,
                      color: "#FFFFFF",
                    }}
                  >
                    Rate Service
                  </Text>
                </Pressable>
              )}

              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.colors.cardBorder,
                  borderRadius: 12,
                  paddingVertical: 10,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleBookingAction(booking, "book-again")}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 12,
                    color: theme.colors.text,
                  }}
                >
                  Book Again
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.colors.cardBorder,
                  borderRadius: 12,
                  paddingVertical: 10,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleBookingAction(booking, "reschedule")}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 12,
                    color: theme.colors.text,
                  }}
                >
                  Reschedule
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 12,
                  paddingVertical: 10,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleBookingAction(booking, "contact")}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 12,
                    color: "#FFFFFF",
                  }}
                >
                  Contact
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
      </View>
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
              Booking History
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 8,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Search size={20} color={theme.colors.text} />
            </Pressable>

            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 8,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Filter size={20} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Tabs */}
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
          {filterOptions.map((filter) => (
            <Pressable
              key={filter.id}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor:
                  selectedFilter === filter.id
                    ? theme.colors.primary
                    : "transparent",
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 16,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color:
                      selectedFilter === filter.id
                        ? "#FFFFFF"
                        : theme.colors.text,
                    marginRight: filter.count > 0 ? 6 : 0,
                  }}
                >
                  {filter.label}
                </Text>
                {filter.count > 0 && (
                  <View
                    style={{
                      backgroundColor:
                        selectedFilter === filter.id
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
                          selectedFilter === filter.id
                            ? "#FFFFFF"
                            : theme.colors.primary,
                      }}
                    >
                      {filter.count}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 40,
              paddingVertical: 60,
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
              No bookings found
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
              {selectedFilter === "all"
                ? "You haven't made any bookings yet. Start by finding a contractor!"
                : `No ${selectedFilter} bookings found.`}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
