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
  Star,
  Heart,
  ThumbsUp,
  DollarSign,
  Shield,
  MessageSquare,
  Clock,
  Home,
  CheckCircle,
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

export default function RateCustomerScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bookingId } = useLocalSearchParams();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [wouldWorkAgain, setWouldWorkAgain] = useState(null);

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
    customer: {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      memberSince: "2023",
      totalBookings: 12,
    },
    service: "Kitchen Outlet Installation",
    date: "Dec 3, 2024",
    completedAt: "4:30 PM",
    duration: "2.5 hours",
    total: 180.0,
    location: "123 Main St, San Francisco, CA",
  };

  const reviewCategories = [
    { id: "respectful", label: "Respectful", icon: Heart },
    { id: "clear", label: "Clear Communication", icon: MessageSquare },
    { id: "prepared", label: "Site Prepared", icon: Home },
    { id: "onTime", label: "Available on Time", icon: Clock },
    { id: "paid", label: "Paid Promptly", icon: DollarSign },
    { id: "professional", label: "Professional", icon: Shield },
    { id: "flexible", label: "Flexible", icon: ThumbsUp },
    { id: "organized", label: "Well Organized", icon: CheckCircle },
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert(
        "Rating Required",
        "Please select a rating before submitting.",
      );
      return;
    }

    if (wouldWorkAgain === null) {
      Alert.alert(
        "Feedback Required",
        "Please indicate if you would work with this customer again.",
      );
      return;
    }

    const reviewData = {
      rating,
      review,
      categories: selectedCategories,
      wouldWorkAgain,
    };

    Alert.alert(
      "Review Submitted!",
      `Thank you for rating ${booking.customer.name}. Your feedback helps build a trusted community.`,
      [
        {
          text: "Done",
          onPress: () => router.replace("/(contractor-tabs)/orders"),
        },
      ],
    );
  };

  const StarRating = () => (
    <View style={{ alignItems: "center", marginBottom: 24 }}>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: theme.colors.text,
          marginBottom: 16,
        }}
      >
        How was your experience with this customer?
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            style={{ marginHorizontal: 4 }}
            onPress={() => setRating(star)}
          >
            <Star
              size={40}
              color={
                star <= rating ? theme.colors.orange : theme.colors.cardBorder
              }
              fill={star <= rating ? theme.colors.orange : "transparent"}
            />
          </Pressable>
        ))}
      </View>

      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 16,
          color: rating > 0 ? theme.colors.text : theme.colors.textSecondary,
        }}
      >
        {rating === 0
          ? "Tap to rate"
          : rating === 1
            ? "Poor Experience"
            : rating === 2
              ? "Fair"
              : rating === 3
                ? "Good"
                : rating === 4
                  ? "Very Good"
                  : "Excellent"}
      </Text>
    </View>
  );

  const CategoryChip = ({ category, isSelected, onPress }) => {
    const IconComponent = category.icon;

    return (
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: isSelected
            ? theme.colors.primary
            : theme.colors.cardBackground,
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginRight: 8,
          marginBottom: 8,
          flexDirection: "row",
          alignItems: "center",
          opacity: pressed ? 0.7 : 1,
          ...theme.colors.shadow,
        })}
        onPress={onPress}
      >
        <IconComponent
          size={16}
          color={isSelected ? "#FFFFFF" : theme.colors.text}
          style={{ marginRight: 6 }}
        />
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: isSelected ? "#FFFFFF" : theme.colors.text,
          }}
        >
          {category.label}
        </Text>
      </Pressable>
    );
  };

  const WorkAgainSection = () => (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: theme.colors.text,
          marginBottom: 8,
        }}
      >
        Would you work with this customer again?
      </Text>

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 14,
          color: theme.colors.textSecondary,
          marginBottom: 16,
        }}
      >
        Your honest feedback helps maintain quality in our community
      </Text>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Pressable
          style={({ pressed }) => ({
            flex: 1,
            backgroundColor:
              wouldWorkAgain === true
                ? theme.colors.green
                : theme.colors.cardBackground,
            borderRadius: 12,
            padding: 16,
            alignItems: "center",
            borderWidth: wouldWorkAgain === true ? 0 : 1,
            borderColor: theme.colors.cardBorder,
            opacity: pressed ? 0.7 : 1,
            ...theme.colors.shadow,
          })}
          onPress={() => setWouldWorkAgain(true)}
        >
          <ThumbsUp
            size={24}
            color={wouldWorkAgain === true ? "#FFFFFF" : theme.colors.green}
            style={{ marginBottom: 8 }}
          />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: wouldWorkAgain === true ? "#FFFFFF" : theme.colors.text,
            }}
          >
            Yes
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color:
                wouldWorkAgain === true
                  ? "rgba(255,255,255,0.8)"
                  : theme.colors.textSecondary,
              marginTop: 4,
            }}
          >
            I'd work with them again
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => ({
            flex: 1,
            backgroundColor:
              wouldWorkAgain === false
                ? theme.colors.red
                : theme.colors.cardBackground,
            borderRadius: 12,
            padding: 16,
            alignItems: "center",
            borderWidth: wouldWorkAgain === false ? 0 : 1,
            borderColor: theme.colors.cardBorder,
            opacity: pressed ? 0.7 : 1,
            ...theme.colors.shadow,
          })}
          onPress={() => setWouldWorkAgain(false)}
        >
          <ThumbsUp
            size={24}
            color={wouldWorkAgain === false ? "#FFFFFF" : theme.colors.red}
            style={{ marginBottom: 8, transform: [{ rotate: "180deg" }] }}
          />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: wouldWorkAgain === false ? "#FFFFFF" : theme.colors.text,
            }}
          >
            No
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color:
                wouldWorkAgain === false
                  ? "rgba(255,255,255,0.8)"
                  : theme.colors.textSecondary,
              marginTop: 4,
            }}
          >
            Not recommended
          </Text>
        </Pressable>
      </View>
    </View>
  );

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
            Rate Customer
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
        {/* Customer Summary */}
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
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Image
              source={{ uri: booking.customer.image }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 16,
              }}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: theme.colors.text,
                  marginBottom: 4,
                }}
              >
                {booking.customer.name}
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                Member since {booking.customer.memberSince} •{" "}
                {booking.customer.totalBookings} bookings
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: theme.colors.cardBorder,
              paddingTop: 12,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {booking.service}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                {booking.date} • {booking.completedAt} • {booking.duration}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                marginTop: 4,
              }}
            >
              {booking.location}
            </Text>
          </View>
        </View>

        {/* Star Rating */}
        <StarRating />

        {/* Quick Categories */}
        {rating > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 16,
              }}
            >
              What made this customer great?
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {reviewCategories.map((category) => (
                <CategoryChip
                  key={category.id}
                  category={category}
                  isSelected={selectedCategories.includes(category.id)}
                  onPress={() => toggleCategory(category.id)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Work Again Section */}
        {rating > 0 && <WorkAgainSection />}

        {/* Written Review */}
        {rating > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              Additional Comments (Optional)
            </Text>

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                marginBottom: 16,
              }}
            >
              Share any specific details about your experience
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
                ...theme.colors.shadow,
              }}
              value={review}
              onChangeText={setReview}
              placeholder="For example: Great communication, site was well prepared, customer was flexible with timing..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline
            />
          </View>
        )}

        {/* Info Box */}
        {rating > 0 && (
          <View
            style={{
              backgroundColor: theme.colors.primarySoft,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
            }}
          >
            <Shield
              size={20}
              color={theme.colors.primary}
              style={{ marginRight: 12, marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.colors.text,
                  marginBottom: 4,
                }}
              >
                Your review is private
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 13,
                  color: theme.colors.textSecondary,
                  lineHeight: 18,
                }}
              >
                Customer ratings help us maintain quality and are only visible
                to platform administrators. They are not shown publicly.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Submit Button */}
      {rating > 0 && (
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
            onPress={handleSubmitReview}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              Submit Review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
