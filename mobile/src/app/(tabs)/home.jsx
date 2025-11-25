import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Search, MapPin, Star, Shield, ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import ScreenContainer from "../../components/ScreenContainer";
import { useTheme } from "../../utils/theme";
import { CATEGORIES } from "../../data/categories";
import { getIconComponent } from "../../utils/iconMapping";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [viewMode, setViewMode] = useState("categories"); // "categories" | "subcategories"

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const featuredContractors = [
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
      category: "electricians",
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
      category: "plumbers",
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
      category: "finishers",
    },
    {
      id: 4,
      name: "Emma Wilson",
      specialty: "Event Photographer",
      rating: 4.9,
      reviewCount: 156,
      verified: true,
      location: "1.5 miles away",
      hourlyRate: "$120/hr",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      category: "photographers",
    },
    {
      id: 5,
      name: "Alex Turner",
      specialty: "Web Developer",
      rating: 4.8,
      reviewCount: 89,
      verified: true,
      location: "2.1 miles away",
      hourlyRate: "$95/hr",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      category: "web-developers",
    },
  ];

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
    setViewMode("subcategories");
  };

  const handleSubcategoryPress = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    // Here you could navigate to a contractors list filtered by subcategory
    // For now, we'll just set the selection
  };

  const handleBackToCategories = () => {
    setViewMode("categories");
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const getCategoryData = () => {
    if (viewMode === "categories") {
      return CATEGORIES;
    }

    const category = CATEGORIES.find((cat) => cat.id === selectedCategory);
    return category ? category.subcategories : [];
  };

  const getFilteredContractors = () => {
    if (!selectedSubcategory) {
      return featuredContractors;
    }

    return featuredContractors.filter(
      (contractor) => contractor.category === selectedSubcategory,
    );
  };

  const CategoryCard = ({
    category,
    isSelected,
    onPress,
    isSubcategory = false,
  }) => {
    const IconComponent = getIconComponent(category.icon);

    return (
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: isSelected
            ? category.color || theme.colors.primary
            : theme.colors.cardBackground,
          borderRadius: 12,
          padding: 16,
          marginRight: 12,
          alignItems: "center",
          minWidth: isSubcategory ? 120 : 80,
          opacity: pressed ? 0.7 : 1,
          ...theme.colors.shadow,
        })}
        onPress={onPress}
      >
        <IconComponent
          size={24}
          color={
            isSelected ? "#FFFFFF" : category.color || theme.colors.primary
          }
        />
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 12,
            color: isSelected ? "#FFFFFF" : theme.colors.text,
            marginTop: 8,
            textAlign: "center",
            lineHeight: 16,
          }}
        >
          {category.name}
        </Text>
        {!isSubcategory && category.description && (
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 10,
              color: isSelected
                ? "rgba(255,255,255,0.8)"
                : theme.colors.textSecondary,
              marginTop: 4,
              textAlign: "center",
              lineHeight: 12,
            }}
          >
            {category.description}
          </Text>
        )}
      </Pressable>
    );
  };

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
                    backgroundColor:
                      theme.colors.iconBackground?.verified ||
                      theme.colors.primarySoft,
                    borderRadius: 10,
                    padding: 4,
                  }}
                >
                  <Shield
                    size={12}
                    color={theme.colors.verified || theme.colors.primary}
                  />
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
      <View style={{ marginBottom: 32 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 28,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          Find Licensed Contractors
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.textSecondary,
          }}
        >
          Verified professionals in your area
        </Text>
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
          placeholder="Search contractors or services..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories Section */}
      <View style={{ marginBottom: 32 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {viewMode === "subcategories" && (
              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.cardBackground,
                  borderRadius: 12,
                  padding: 8,
                  marginRight: 12,
                  opacity: pressed ? 0.7 : 1,
                  ...theme.colors.shadow,
                })}
                onPress={handleBackToCategories}
              >
                <ArrowLeft size={20} color={theme.colors.text} />
              </Pressable>
            )}
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
              }}
            >
              {viewMode === "categories"
                ? "Categories"
                : CATEGORIES.find((cat) => cat.id === selectedCategory)?.name ||
                  "Services"}
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
        >
          {getCategoryData().map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={
                viewMode === "categories"
                  ? selectedCategory === category.id
                  : selectedSubcategory === category.id
              }
              isSubcategory={viewMode === "subcategories"}
              onPress={() =>
                viewMode === "categories"
                  ? handleCategoryPress(category.id)
                  : handleSubcategoryPress(category.id)
              }
            />
          ))}
        </ScrollView>
      </View>

      {/* Featured/Filtered Contractors */}
      <View>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: theme.colors.text,
            marginBottom: 16,
          }}
        >
          {selectedSubcategory ? "Contractors" : "Featured Contractors"}
        </Text>
        {getFilteredContractors().map((contractor) => (
          <ContractorCard key={contractor.id} contractor={contractor} />
        ))}

        {selectedSubcategory && getFilteredContractors().length === 0 && (
          <View
            style={{
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 16,
              padding: 24,
              alignItems: "center",
              ...theme.colors.shadow,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              No contractors found
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              We're working on adding more contractors in this category. Try
              browsing other services or check back soon!
            </Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
