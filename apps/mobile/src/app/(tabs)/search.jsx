import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Shield,
  SlidersHorizontal,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import ScreenContainer from "../../components/ScreenContainer";
import { useTheme } from "../../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function SearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const searchResults = [
    {
      id: 1,
      name: "Mike Johnson",
      specialty: "Licensed Electrician",
      rating: 4.9,
      reviewCount: 127,
      verified: true,
      location: "2.3 miles away",
      hourlyRate: "$85/hr",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      description:
        "Specializing in residential and commercial electrical work with 15+ years experience.",
    },
    {
      id: 2,
      name: "Sarah Chen",
      specialty: "Master Plumber",
      rating: 4.8,
      reviewCount: 89,
      verified: true,
      location: "1.8 miles away",
      hourlyRate: "$75/hr",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      description:
        "Expert in emergency repairs, installations, and maintenance services.",
    },
    {
      id: 3,
      name: "David Rodriguez",
      specialty: "General Contractor",
      rating: 4.7,
      reviewCount: 203,
      verified: true,
      location: "3.1 miles away",
      hourlyRate: "$95/hr",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description:
        "Full-service contractor for home renovations and construction projects.",
    },
    {
      id: 4,
      name: "Lisa Thompson",
      specialty: "Interior Painter",
      rating: 4.6,
      reviewCount: 156,
      verified: true,
      location: "4.2 miles away",
      hourlyRate: "$65/hr",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      description:
        "Professional painting services with attention to detail and quality finishes.",
    },
  ];

  const ratingFilters = [
    { label: "4.5+ Stars", value: 4.5 },
    { label: "4.0+ Stars", value: 4.0 },
    { label: "3.5+ Stars", value: 3.5 },
    { label: "Any Rating", value: null },
  ];

  const distanceFilters = [
    { label: "Within 5 miles", value: 5 },
    { label: "Within 10 miles", value: 10 },
    { label: "Within 25 miles", value: 25 },
    { label: "Any Distance", value: null },
  ];

  const priceRanges = [
    { label: "$50-75/hr", value: "50-75" },
    { label: "$75-100/hr", value: "75-100" },
    { label: "$100+/hr", value: "100+" },
    { label: "Any Price", value: null },
  ];

  const FilterSection = ({ title, options, selected, onSelect }) => (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 16,
          color: theme.colors.text,
          marginBottom: 12,
        }}
      >
        {title}
      </Text>
      {options.map((option) => (
        <Pressable
          key={option.label}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor:
              selected === option.value
                ? theme.colors.primary
                : theme.colors.cardBackground,
            borderRadius: 8,
            marginBottom: 8,
            opacity: pressed ? 0.7 : 1,
            ...theme.colors.shadow,
          })}
          onPress={() => onSelect(option.value)}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: selected === option.value ? "#FFFFFF" : theme.colors.text,
            }}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const ContractorCard = ({ contractor }) => {
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
        onPress={() => router.push(`/contractor/${contractor.id}`)}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Image
            source={{ uri: contractor.image }}
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
                  fontSize: 16,
                  color: theme.colors.text,
                  marginRight: 8,
                }}
              >
                {contractor.name}
              </Text>
              {contractor.verified && (
                <View
                  style={{
                    backgroundColor: theme.colors.iconBackground.verified,
                    borderRadius: 10,
                    padding: 4,
                  }}
                >
                  <Shield size={12} color={theme.colors.verified} />
                </View>
              )}
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

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 13,
                color: theme.colors.textMuted,
                marginBottom: 8,
                lineHeight: 18,
              }}
            >
              {contractor.description}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Star
                size={14}
                color={theme.colors.orange}
                fill={theme.colors.orange}
              />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
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
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MapPin size={12} color={theme.colors.textSecondary} />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: theme.colors.textSecondary,
                    marginLeft: 4,
                  }}
                >
                  {contractor.location}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.colors.primary,
                }}
              >
                {contractor.hourlyRate}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 28,
            color: theme.colors.text,
            flex: 1,
          }}
        >
          Search Contractors
        </Text>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: showFilters
              ? theme.colors.primary
              : theme.colors.cardBackground,
            borderRadius: 12,
            padding: 12,
            opacity: pressed ? 0.7 : 1,
            ...theme.colors.shadow,
          })}
          onPress={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal
            size={20}
            color={showFilters ? "#FFFFFF" : theme.colors.text}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 24,
          ...theme.colors.shadow,
        }}
      >
        <Search size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={{
            flex: 1,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.text,
            marginLeft: 12,
          }}
          placeholder="Search by name, specialty, or service..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      {showFilters && (
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            ...theme.colors.shadow,
          }}
        >
          <FilterSection
            title="Minimum Rating"
            options={ratingFilters}
            selected={selectedRating}
            onSelect={setSelectedRating}
          />

          <FilterSection
            title="Distance"
            options={distanceFilters}
            selected={selectedDistance}
            onSelect={setSelectedDistance}
          />

          <FilterSection
            title="Price Range"
            options={priceRanges}
            selected={selectedPriceRange}
            onSelect={setSelectedPriceRange}
          />

          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.primary,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => {
              // Apply filters logic here
              setShowFilters(false);
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              Apply Filters
            </Text>
          </Pressable>
        </View>
      )}

      {/* Results */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: theme.colors.text,
            marginBottom: 16,
          }}
        >
          {searchResults.length} Contractors Found
        </Text>

        {searchResults.map((contractor) => (
          <ContractorCard key={contractor.id} contractor={contractor} />
        ))}
      </View>
    </ScreenContainer>
  );
}
