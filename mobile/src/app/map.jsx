import React, { useState, useRef } from "react";
import { View, Text, Pressable, Image, ScrollView, Alert } from "react-native";
import {
  ArrowLeft,
  MapPin,
  Star,
  Shield,
  Filter,
  List,
  Navigation,
  Phone,
  MessageCircle,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { useTheme } from "../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function MapScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [viewMode, setViewMode] = useState("map"); // 'map' or 'list'
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock contractors with locations
  const contractors = [
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
      coordinate: { latitude: 37.7849, longitude: -122.4094 },
      category: "electrical",
      availability: "Available today",
      responseTime: "Responds in ~2 hours",
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
      coordinate: { latitude: 37.7949, longitude: -122.4194 },
      category: "plumbing",
      availability: "Available tomorrow",
      responseTime: "Responds in ~1 hour",
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
      coordinate: { latitude: 37.7749, longitude: -122.3994 },
      category: "construction",
      availability: "Available this week",
      responseTime: "Responds in ~3 hours",
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
      coordinate: { latitude: 37.7649, longitude: -122.4294 },
      category: "painting",
      availability: "Available next week",
      responseTime: "Responds in ~4 hours",
    },
    {
      id: 5,
      name: "James Wilson",
      specialty: "HVAC Technician",
      rating: 4.8,
      reviewCount: 92,
      verified: true,
      distance: "2.7 miles away",
      hourlyRate: "$80/hr",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      coordinate: { latitude: 37.7549, longitude: -122.4194 },
      category: "hvac",
      availability: "Available today",
      responseTime: "Responds in ~2 hours",
    },
  ];

  const categories = [
    { id: "electrical", name: "Electrical", color: theme.colors.orange },
    { id: "plumbing", name: "Plumbing", color: theme.colors.blue },
    { id: "construction", name: "Construction", color: theme.colors.purple },
    { id: "painting", name: "Painting", color: theme.colors.green },
    { id: "hvac", name: "HVAC", color: theme.colors.red },
  ];

  const filteredContractors = selectedCategory
    ? contractors.filter((c) => c.category === selectedCategory)
    : contractors;

  const initialRegion = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleMarkerPress = (contractor) => {
    setSelectedContractor(contractor);
  };

  const handleCalloutPress = (contractor) => {
    router.push(`/contractor/${contractor.id}`);
  };

  const centerMapOnContractor = (contractor) => {
    mapRef.current?.animateToRegion(
      {
        latitude: contractor.coordinate.latitude,
        longitude: contractor.coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000,
    );
    setSelectedContractor(contractor);
  };

  const getMarkerColor = (category) => {
    const categoryInfo = categories.find((c) => c.id === category);
    return categoryInfo ? categoryInfo.color : theme.colors.primary;
  };

  const ContractorListItem = ({ contractor }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor:
          selectedContractor?.id === contractor.id
            ? theme.colors.primarySoft
            : theme.colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: selectedContractor?.id === contractor.id ? 2 : 0,
        borderColor: theme.colors.primary,
        opacity: pressed ? 0.7 : 1,
        ...theme.colors.shadow,
      })}
      onPress={() => centerMapOnContractor(contractor)}
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
              <Shield size={12} color={theme.colors.verified} />
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
              ({contractor.reviewCount})
            </Text>
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
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.colors.textSecondary,
                }}
              >
                {contractor.distance}
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                  color: theme.colors.green,
                }}
              >
                {contractor.availability}
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

          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.primary,
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                flex: 1,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() => router.push(`/contractor/${contractor.id}`)}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                  color: "#FFFFFF",
                }}
              >
                View Profile
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.cardBorder,
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() => router.push(`/chat/${contractor.id}`)}
            >
              <MessageCircle size={14} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const CategoryFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12 }}
    >
      <Pressable
        style={({ pressed }) => ({
          backgroundColor:
            selectedCategory === null
              ? theme.colors.primary
              : theme.colors.cardBackground,
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginRight: 8,
          opacity: pressed ? 0.7 : 1,
          ...theme.colors.shadow,
        })}
        onPress={() => setSelectedCategory(null)}
      >
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: selectedCategory === null ? "#FFFFFF" : theme.colors.text,
          }}
        >
          All ({contractors.length})
        </Text>
      </Pressable>

      {categories.map((category) => {
        const count = contractors.filter(
          (c) => c.category === category.id,
        ).length;
        return (
          <Pressable
            key={category.id}
            style={({ pressed }) => ({
              backgroundColor:
                selectedCategory === category.id
                  ? category.color
                  : theme.colors.cardBackground,
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              marginRight: 8,
              opacity: pressed ? 0.7 : 1,
              ...theme.colors.shadow,
            })}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === category.id ? null : category.id,
              )
            }
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
              {category.name} ({count})
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
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

            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
              }}
            >
              Nearby Contractors
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              style={({ pressed }) => ({
                backgroundColor:
                  viewMode === "map"
                    ? theme.colors.primary
                    : theme.colors.cardBackground,
                borderRadius: 12,
                padding: 8,
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() => setViewMode("map")}
            >
              <MapPin
                size={20}
                color={viewMode === "map" ? "#FFFFFF" : theme.colors.text}
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

      {/* Category Filter */}
      <CategoryFilter />

      {viewMode === "map" ? (
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {filteredContractors.map((contractor) => (
              <Marker
                key={contractor.id}
                coordinate={contractor.coordinate}
                onPress={() => handleMarkerPress(contractor)}
                pinColor={getMarkerColor(contractor.category)}
              >
                <Callout onPress={() => handleCalloutPress(contractor)}>
                  <View style={{ width: 200, padding: 8 }}>
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
                          fontSize: 14,
                          color: theme.colors.text,
                          marginRight: 6,
                        }}
                      >
                        {contractor.name}
                      </Text>
                      {contractor.verified && (
                        <Shield size={12} color={theme.colors.verified} />
                      )}
                    </View>

                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 12,
                        color: theme.colors.textSecondary,
                        marginBottom: 4,
                      }}
                    >
                      {contractor.specialty}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <Star
                        size={10}
                        color={theme.colors.orange}
                        fill={theme.colors.orange}
                      />
                      <Text
                        style={{
                          fontFamily: "Inter_500Medium",
                          fontSize: 12,
                          color: theme.colors.text,
                          marginLeft: 2,
                          marginRight: 4,
                        }}
                      >
                        {contractor.rating}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 10,
                          color: theme.colors.textSecondary,
                        }}
                      >
                        ({contractor.reviewCount})
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 10,
                          color: theme.colors.green,
                        }}
                      >
                        {contractor.availability}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          fontSize: 12,
                          color: theme.colors.primary,
                        }}
                      >
                        {contractor.hourlyRate}
                      </Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>

          {/* Bottom sheet with selected contractor */}
          {selectedContractor && (
            <View
              style={{
                position: "absolute",
                bottom: insets.bottom + 20,
                left: 20,
                right: 20,
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 16,
                padding: 16,
                ...theme.colors.shadow,
              }}
            >
              <ContractorListItem contractor={selectedContractor} />

              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: "transparent",
                  alignItems: "center",
                  paddingTop: 8,
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => setSelectedContractor(null)}
              >
                <View
                  style={{
                    width: 40,
                    height: 4,
                    backgroundColor: theme.colors.cardBorder,
                    borderRadius: 2,
                  }}
                />
              </Pressable>
            </View>
          )}
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 16,
            paddingBottom: insets.bottom + 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 16,
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            {filteredContractors.length} contractors found
          </Text>

          {filteredContractors.map((contractor) => (
            <ContractorListItem key={contractor.id} contractor={contractor} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
