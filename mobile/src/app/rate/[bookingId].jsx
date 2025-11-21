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
  Camera,
  X,
  Heart,
  ThumbsUp,
  DollarSign,
  Shield,
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

export default function RateServiceScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bookingId } = useLocalSearchParams();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [tipAmount, setTipAmount] = useState(0);

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
      verified: true,
    },
    service: "Electrical Installation",
    date: "Dec 3, 2024",
    completedAt: "4:30 PM",
    duration: "2.5 hours",
    total: 303.45,
  };

  const reviewCategories = [
    { id: "professional", label: "Professional", icon: Shield },
    { id: "onTime", label: "On Time", icon: ThumbsUp },
    { id: "quality", label: "Quality Work", icon: Star },
    { id: "friendly", label: "Friendly", icon: Heart },
    { id: "clean", label: "Clean Workspace", icon: ThumbsUp },
    { id: "value", label: "Good Value", icon: DollarSign },
  ];

  const tipPresets = [10, 15, 20, 25];

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleAddPhoto = () => {
    // Simulate photo picker
    Alert.alert(
      "Add Photos",
      "Choose how to add photos of the completed work",
      [
        { text: "Camera", onPress: () => addPhoto("camera") },
        { text: "Photo Library", onPress: () => addPhoto("library") },
        { text: "Cancel", style: "cancel" },
      ],
    );
  };

  const addPhoto = (source) => {
    // Mock photo URLs
    const mockPhotos = [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop",
    ];

    const newPhoto = {
      id: Date.now(),
      uri: mockPhotos[Math.floor(Math.random() * mockPhotos.length)],
    };

    setUploadedPhotos((prev) => [...prev, newPhoto]);
  };

  const removePhoto = (photoId) => {
    setUploadedPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert(
        "Rating Required",
        "Please select a rating before submitting.",
      );
      return;
    }

    const reviewData = {
      rating,
      review,
      categories: selectedCategories,
      photos: uploadedPhotos,
      tip: tipAmount,
    };

    Alert.alert(
      "Review Submitted!",
      `Thank you for rating ${booking.contractor.name}. Your review helps other customers make informed decisions.${tipAmount > 0 ? ` Your $${tipAmount} tip has been added.` : ""}`,
      [
        {
          text: "Done",
          onPress: () => router.replace("/(tabs)/bookings"),
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
        How was your experience?
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
            ? "Poor"
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

  const PhotoGrid = () => (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: theme.colors.text,
          marginBottom: 16,
        }}
      >
        Add Photos (Optional)
      </Text>

      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
      >
        {uploadedPhotos.map((photo) => (
          <View
            key={photo.id}
            style={{ position: "relative", marginRight: 12, marginBottom: 12 }}
          >
            <Image
              source={{ uri: photo.uri }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
              }}
            />
            <Pressable
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: theme.colors.red,
                borderRadius: 12,
                width: 24,
                height: 24,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => removePhoto(photo.id)}
            >
              <X size={12} color="#FFFFFF" />
            </Pressable>
          </View>
        ))}

        {uploadedPhotos.length < 5 && (
          <Pressable
            style={({ pressed }) => ({
              width: 80,
              height: 80,
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: theme.colors.primary,
              borderStyle: "dashed",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={handleAddPhoto}
          >
            <Camera size={24} color={theme.colors.primary} />
          </Pressable>
        )}
      </View>

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: theme.colors.textMuted,
        }}
      >
        Share photos of the completed work to help future customers
      </Text>
    </View>
  );

  const TipSection = () => (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: theme.colors.text,
          marginBottom: 8,
        }}
      >
        Add Tip (Optional)
      </Text>

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 14,
          color: theme.colors.textSecondary,
          marginBottom: 16,
        }}
      >
        Show appreciation for excellent service
      </Text>

      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
      >
        {tipPresets.map((preset) => (
          <Pressable
            key={preset}
            style={({ pressed }) => ({
              backgroundColor:
                tipAmount === preset
                  ? theme.colors.primary
                  : theme.colors.cardBackground,
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 10,
              marginRight: 8,
              marginBottom: 8,
              opacity: pressed ? 0.7 : 1,
              ...theme.colors.shadow,
            })}
            onPress={() => setTipAmount(tipAmount === preset ? 0 : preset)}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: tipAmount === preset ? "#FFFFFF" : theme.colors.text,
              }}
            >
              ${preset}
            </Text>
          </Pressable>
        ))}

        <Pressable
          style={({ pressed }) => ({
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: theme.colors.cardBorder,
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={() => {
            Alert.prompt(
              "Custom Tip",
              "Enter tip amount:",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Add",
                  onPress: (value) => {
                    const amount = parseFloat(value);
                    if (!isNaN(amount) && amount > 0) {
                      setTipAmount(amount);
                    }
                  },
                },
              ],
              "plain-text",
              "",
              "numeric",
            );
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.colors.text,
            }}
          >
            Custom
          </Text>
        </Pressable>
      </View>

      {tipAmount > 0 && (
        <View
          style={{
            backgroundColor: theme.colors.primarySoft,
            borderRadius: 8,
            padding: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Heart size={16} color={theme.colors.primary} />
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.colors.text,
              marginLeft: 8,
            }}
          >
            ${tipAmount} tip will be added to your payment
          </Text>
        </View>
      )}
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
            Rate & Review
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
        {/* Service Summary */}
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
              source={{ uri: booking.contractor.image }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 16,
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
                    fontSize: 18,
                    color: theme.colors.text,
                    marginRight: 8,
                  }}
                >
                  {booking.contractor.name}
                </Text>
                {booking.contractor.verified && (
                  <Shield size={16} color={theme.colors.verified} />
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
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
              }}
            >
              {booking.date} • Completed at {booking.completedAt} •{" "}
              {booking.duration}
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
              What went well?
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

        {/* Written Review */}
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
              Write a Review (Optional)
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
              placeholder="Share details about your experience..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline
            />
          </View>
        )}

        {/* Photo Upload */}
        {rating > 0 && <PhotoGrid />}

        {/* Tip Section */}
        {rating > 0 && <TipSection />}
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
