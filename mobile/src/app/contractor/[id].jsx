import React, { useState } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import {
  ArrowLeft,
  Star,
  Shield,
  MapPin,
  Clock,
  DollarSign,
  MessageCircle,
  Calendar,
  Phone,
  Award,
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

export default function ContractorProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState("about");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock contractor data - in real app, this would be fetched based on the ID
  const contractor = {
    id: id,
    name: "Mike Johnson",
    specialty: "Licensed Electrician",
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    location: "San Francisco, CA",
    distance: "2.3 miles away",
    hourlyRate: "$85/hr",
    responseTime: "Usually responds within 2 hours",
    completedJobs: 156,
    yearsExperience: 15,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    about:
      "Licensed electrician with over 15 years of experience in residential and commercial electrical work. Specializing in installations, repairs, and electrical system upgrades. Fully insured and bonded.",
    services: [
      "Electrical installations",
      "Circuit breaker repairs",
      "Outlet and switch installation",
      "Lighting installation",
      "Electrical panel upgrades",
      "Emergency electrical repairs",
    ],
    certifications: [
      "Licensed Electrician (CA-E123456)",
      "OSHA 30-Hour Safety Certification",
      "National Electrical Code Certified",
    ],
    availability: [
      { day: "Monday", hours: "8:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "8:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "8:00 AM - 6:00 PM" },
      { day: "Thursday", hours: "8:00 AM - 6:00 PM" },
      { day: "Friday", hours: "8:00 AM - 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  };

  const reviews = [
    {
      id: 1,
      userName: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Mike did an excellent job installing new outlets in our kitchen. Very professional and cleaned up after himself. Highly recommend!",
      service: "Outlet Installation",
    },
    {
      id: 2,
      userName: "David L.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Quick response for an emergency electrical issue. Fixed the problem efficiently and explained everything clearly.",
      service: "Emergency Repair",
    },
    {
      id: 3,
      userName: "Jennifer K.",
      rating: 4,
      date: "2 months ago",
      comment:
        "Great work on our electrical panel upgrade. Arrived on time and completed the job as scheduled.",
      service: "Panel Upgrade",
    },
  ];

  const tabs = [
    { id: "about", label: "About" },
    { id: "reviews", label: "Reviews" },
    { id: "availability", label: "Availability" },
  ];

  const StatCard = ({ icon: IconComponent, label, value, color }) => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        flex: 1,
        alignItems: "center",
        ...theme.colors.shadow,
      }}
    >
      <View
        style={{
          backgroundColor: `${color}15`,
          borderRadius: 20,
          padding: 8,
          marginBottom: 8,
        }}
      >
        <IconComponent size={20} color={color} />
      </View>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 16,
          color: theme.colors.text,
          marginBottom: 4,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: theme.colors.textSecondary,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </View>
  );

  const ReviewCard = ({ review }) => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        ...theme.colors.shadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: theme.colors.text,
          }}
        >
          {review.userName}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: theme.colors.textSecondary,
          }}
        >
          {review.date}
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            color={
              star <= review.rating
                ? theme.colors.orange
                : theme.colors.cardBorder
            }
            fill={star <= review.rating ? theme.colors.orange : "transparent"}
            style={{ marginRight: 2 }}
          />
        ))}
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 12,
            color: theme.colors.textSecondary,
            marginLeft: 8,
          }}
        >
          {review.service}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 14,
          color: theme.colors.text,
          lineHeight: 20,
        }}
      >
        {review.comment}
      </Text>
    </View>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case "about":
        return (
          <View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: theme.colors.text,
                lineHeight: 24,
                marginBottom: 24,
              }}
            >
              {contractor.about}
            </Text>

            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 16,
              }}
            >
              Services Offered
            </Text>
            {contractor.services.map((service, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <CheckCircle size={16} color={theme.colors.green} />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: theme.colors.text,
                    marginLeft: 8,
                  }}
                >
                  {service}
                </Text>
              </View>
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
              Certifications & Licenses
            </Text>
            {contractor.certifications.map((cert, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Award size={16} color={theme.colors.blue} />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: theme.colors.text,
                    marginLeft: 8,
                  }}
                >
                  {cert}
                </Text>
              </View>
            ))}
          </View>
        );

      case "reviews":
        return (
          <View>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </View>
        );

      case "availability":
        return (
          <View>
            {contractor.availability.map((slot, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: theme.colors.cardBackground,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  ...theme.colors.shadow,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: theme.colors.text,
                  }}
                >
                  {slot.day}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color:
                      slot.hours === "Closed"
                        ? theme.colors.textMuted
                        : theme.colors.textSecondary,
                  }}
                >
                  {slot.hours}
                </Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
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
            Contractor Profile
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginTop: 20,
            marginBottom: 20,
            ...theme.colors.shadow,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: contractor.image }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginRight: 16,
                }}
              />
              {contractor.verified && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 12,
                    backgroundColor: theme.colors.iconBackground.verified,
                    borderRadius: 12,
                    padding: 4,
                  }}
                >
                  <Shield size={14} color={theme.colors.verified} />
                </View>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 22,
                  color: theme.colors.text,
                  marginBottom: 4,
                }}
              >
                {contractor.name}
              </Text>

              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
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
                  marginBottom: 8,
                }}
              >
                <Star
                  size={16}
                  color={theme.colors.orange}
                  fill={theme.colors.orange}
                />
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
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
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                  }}
                >
                  ({contractor.reviewCount} reviews)
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <MapPin size={14} color={theme.colors.textSecondary} />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                    marginLeft: 4,
                  }}
                >
                  {contractor.distance}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Clock size={14} color={theme.colors.textSecondary} />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                    marginLeft: 4,
                  }}
                >
                  {contractor.responseTime}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
            <StatCard
              icon={CheckCircle}
              label="Completed Jobs"
              value={contractor.completedJobs}
              color={theme.colors.green}
            />
            <StatCard
              icon={Award}
              label="Years Experience"
              value={contractor.yearsExperience}
              color={theme.colors.blue}
            />
          </View>

          {/* Pricing */}
          <View
            style={{
              backgroundColor: theme.colors.primarySoft,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DollarSign size={20} color={theme.colors.primary} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 20,
                color: theme.colors.primary,
                marginLeft: 4,
              }}
            >
              {contractor.hourlyRate}
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 12,
            padding: 4,
            marginBottom: 20,
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
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: selectedTab === tab.id ? "#FFFFFF" : theme.colors.text,
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}
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
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.cardBackground,
              borderWidth: 1,
              borderColor: theme.colors.cardBorder,
              borderRadius: 12,
              paddingVertical: 16,
              paddingHorizontal: 20,
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => router.push(`/chat/${contractor.id}`)}
          >
            <MessageCircle size={20} color={theme.colors.text} />
          </Pressable>

          <Pressable
            style={({ pressed }) => ({
              flex: 1,
              backgroundColor: theme.colors.primary,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => router.push(`/book/${contractor.id}`)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Calendar size={20} color="#FFFFFF" />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "#FFFFFF",
                  marginLeft: 8,
                }}
              >
                Book Service
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
