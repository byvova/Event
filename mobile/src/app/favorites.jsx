import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Alert,
  TextInput,
} from "react-native";
import {
  ArrowLeft,
  Heart,
  Star,
  Shield,
  MapPin,
  MessageCircle,
  Phone,
  Calendar,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function FavoritesScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Mock saved contractors
  const [favoriteContractors, setFavoriteContractors] = useState([
    {
      id: 1,
      name: "Mike Johnson",
      specialty: "Licensed Electrician",
      rating: 4.9,
      reviewCount: 127,
      verified: true,
      distance: "2.3 miles away",
      hourlyRate: "$85/hr",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      category: "electrical",
      availability: "Available today",
      lastUsed: "2 weeks ago",
      tags: ["Reliable", "Professional", "Fast response"],
    },
    {
      id: 2,
      name: "Sarah Chen",
      specialty: "Master Plumber",
      rating: 4.8,
      reviewCount: 89,
      verified: true,
      distance: "1.8 miles away",
      hourlyRate: "$75/hr",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      category: "plumbing",
      availability: "Available tomorrow",
      lastUsed: "1 month ago",
      tags: ["Affordable", "Quality work", "Clean"],
    },
    {
      id: 3,
      name: "David Rodriguez",
      specialty: "General Contractor",
      rating: 4.7,
      reviewCount: 203,
      verified: true,
      distance: "3.1 miles away",
      hourlyRate: "$95/hr",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      category: "construction",
      availability: "Available this week",
      lastUsed: "3 weeks ago",
      tags: ["Experienced", "Large projects", "Detailed"],
    },
    {
      id: 4,
      name: "Lisa Thompson",
      specialty: "Interior Painter",
      rating: 4.6,
      reviewCount: 156,
      verified: true,
      distance: "4.2 miles away",
      hourlyRate: "$65/hr",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      category: "painting",
      availability: "Available next week",
      lastUsed: "2 months ago",
      tags: ["Creative", "Attention to detail", "Friendly"],
    },
  ]);

  if (!fontsLoaded) {
    return null;
  }

  const categories = [
    { id: "all", name: "All", count: favoriteContractors.length },
    {
      id: "electrical",
      name: "Electrical",
      count: favoriteContractors.filter((c) => c.category === "electrical")
        .length,
    },
    {
      id: "plumbing",
      name: "Plumbing",
      count: favoriteContractors.filter((c) => c.category === "plumbing")
        .length,
    },
    {
      id: "construction",
      name: "Construction",
      count: favoriteContractors.filter((c) => c.category === "construction")
        .length,
    },
    {
      id: "painting",
      name: "Painting",
      count: favoriteContractors.filter((c) => c.category === "painting")
        .length,
    },
  ];

  const filteredContractors = favoriteContractors.filter((contractor) => {
    const matchesSearch =
      searchQuery === "" ||
      contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || contractor.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (contractorId) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this contractor from your favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setFavoriteContractors((prev) =>
              prev.filter((c) => c.id !== contractorId),
            );
          },
        },
      ],
    );
  };

  const ContractorGridCard = ({ contractor }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        width: "48%",
        opacity: pressed ? 0.7 : 1,
        ...theme.colors.shadow,
      })}
      onPress={() => router.push(`/contractor/${contractor.id}`)}
    >
      <View style={{ alignItems: "center", marginBottom: 12 }}>
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: contractor.image }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginBottom: 8,
            }}
          />
          {contractor.verified && (
            <View
              style={{
                position: "absolute",
                bottom: 4,
                right: -2,
                backgroundColor: theme.colors.iconBackground.verified,
                borderRadius: 8,
                padding: 2,
              }}
            >
              <Shield size={10} color={theme.colors.verified} />
            </View>
          )}
        </View>

        <Pressable
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            backgroundColor: theme.colors.red,
            borderRadius: 16,
            padding: 6,
          }}
          onPress={() => toggleFavorite(contractor.id)}
        >
          <Heart size={12} color="#FFFFFF" fill="#FFFFFF" />
        </Pressable>
      </View>

      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 14,
          color: theme.colors.text,
          textAlign: "center",
          marginBottom: 4,
        }}
        numberOfLines={1}
      >
        {contractor.name}
      </Text>

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: theme.colors.textSecondary,
          textAlign: "center",
          marginBottom: 8,
        }}
        numberOfLines={2}
      >
        {contractor.specialty}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
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
          }}
        >
          {contractor.rating}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 12,
          color: theme.colors.primary,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {contractor.hourlyRate}
      </Text>

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 10,
          color: theme.colors.green,
          textAlign: "center",
        }}
      >
        {contractor.availability}
      </Text>

      {/* Quick Actions */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 12,
        }}
      >
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: theme.colors.primary,
            borderRadius: 6,
            padding: 6,
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={() => router.push(`/chat/${contractor.id}`)}
        >
          <MessageCircle size={12} color="#FFFFFF" />
        </Pressable>

        <Pressable
          style={({ pressed }) => ({
            backgroundColor: theme.colors.green,
            borderRadius: 6,
            padding: 6,
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={() => router.push(`/book/${contractor.id}`)}
        >
          <Calendar size={12} color="#FFFFFF" />
        </Pressable>
      </View>
    </Pressable>
  );

  const ContractorListCard = ({ contractor }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        opacity: pressed ? 0.7 : 1,
        ...theme.colors.shadow,
      })}
      onPress={() => router.push(`/contractor/${contractor.id}`)}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: contractor.image }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
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
              {contractor.name}
            </Text>

            <Pressable
              style={{
                backgroundColor: theme.colors.red + "20",
                borderRadius: 16,
                padding: 6,
                marginLeft: 8,
              }}
              onPress={() => toggleFavorite(contractor.id)}
            >
              <Heart
                size={14}
                color={theme.colors.red}
                fill={theme.colors.red}
              />
            </Pressable>
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
                marginRight: 12,
              }}
            >
              ({contractor.reviewCount})
            </Text>

            <MapPin size={12} color={theme.colors.textSecondary} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
                marginLeft: 4,
              }}
            >
              {contractor.distance}
            </Text>
          </View>

          {/* Tags */}
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}
          >
            {contractor.tags.slice(0, 2).map((tag, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: 6,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  marginRight: 4,
                  marginBottom: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 10,
                    color: theme.colors.textMuted,
                  }}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.colors.primary,
                }}
              >
                {contractor.hourlyRate}
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 10,
                  color: theme.colors.textMuted,
                }}
              >
                Used {contractor.lastUsed}
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.primary,
                  borderRadius: 8,
                  padding: 8,
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => router.push(`/chat/${contractor.id}`)}
              >
                <MessageCircle size={16} color="#FFFFFF" />
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.green,
                  borderRadius: 8,
                  padding: 8,
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => router.push(`/book/${contractor.id}`)}
              >
                <Calendar size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
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

            <View>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: theme.colors.text,
                }}
              >
                Favorites
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.colors.textSecondary,
                }}
              >
                {favoriteContractors.length} saved
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              style={({ pressed }) => ({
                backgroundColor:
                  viewMode === "grid"
                    ? theme.colors.primary
                    : theme.colors.cardBackground,
                borderRadius: 12,
                padding: 8,
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() => setViewMode("grid")}
            >
              <Grid
                size={20}
                color={viewMode === "grid" ? "#FFFFFF" : theme.colors.text}
              />
            </Pressable>

            <Pressable
              style={({ pressed }) => ({
                backgroundColor:
                  viewMode === "list"
                    ? theme.colors.primary
                    : theme.colors.cardBackground,
                borderRadius: 12,
                padding: 8,
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() => setViewMode("list")}
            >
              <List
                size={20}
                color={viewMode === "list" ? "#FFFFFF" : theme.colors.text}
              />
            </Pressable>
          </View>
        </View>
      </View>

      {favoriteContractors.length === 0 ? (
        // Empty State
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
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 40,
              padding: 24,
              marginBottom: 24,
            }}
          >
            <Heart size={48} color={theme.colors.textMuted} />
          </View>

          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: theme.colors.text,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            No Favorites Yet
          </Text>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: theme.colors.textSecondary,
              marginBottom: 24,
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            Save your favorite contractors for quick access. Tap the heart icon
            on any contractor profile.
          </Text>

          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.primary,
              borderRadius: 12,
              paddingVertical: 16,
              paddingHorizontal: 32,
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => router.push("/(tabs)/search")}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              Find Contractors
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Search & Filter */}
          <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
            <View
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 16,
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
                placeholder="Search favorites..."
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Category Filter */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexGrow: 0 }}
            >
              {categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={({ pressed }) => ({
                    backgroundColor:
                      selectedCategory === category.id
                        ? theme.colors.primary
                        : theme.colors.cardBackground,
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginRight: 8,
                    opacity: pressed ? 0.7 : 1,
                    ...theme.colors.shadow,
                  })}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color:
                        selectedCategory === category.id
                          ? "#FFFFFF"
                          : theme.colors.text,
                    }}
                  >
                    {category.name} ({category.count})
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Contractors List */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: insets.bottom + 20,
              flexDirection: viewMode === "grid" ? "row" : "column",
              flexWrap: viewMode === "grid" ? "wrap" : "nowrap",
              justifyContent:
                viewMode === "grid" ? "space-between" : "flex-start",
            }}
            showsVerticalScrollIndicator={false}
          >
            {filteredContractors.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  paddingVertical: 40,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: theme.colors.textMuted,
                  }}
                >
                  No contractors match your search
                </Text>
              </View>
            ) : (
              filteredContractors.map((contractor) =>
                viewMode === "grid" ? (
                  <ContractorGridCard
                    key={contractor.id}
                    contractor={contractor}
                  />
                ) : (
                  <ContractorListCard
                    key={contractor.id}
                    contractor={contractor}
                  />
                ),
              )
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}
