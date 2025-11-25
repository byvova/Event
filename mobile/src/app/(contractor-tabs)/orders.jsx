import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  AlertTriangle,
  Star,
} from "lucide-react-native";
import { useTheme } from "../../utils/theme";
import { useLanguage } from "../../utils/LanguageContext";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function ContractorOrders() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Sarah Johnson",
      customerPhoto:
        "https://images.unsplash.com/photo-1494790108755-2616b612d3bd?w=150&h=150&fit=crop&crop=face",
      service: "Electrical Repair - Circuit Breaker",
      address: "123 Oak Street, San Francisco, CA",
      date: "Today",
      time: "2:00 PM - 4:00 PM",
      status: "confirmed",
      price: 120,
      urgent: false,
      description:
        "Main circuit breaker keeps tripping. Need inspection and repair.",
      customerPhone: "(555) 123-4567",
    },
    {
      id: 2,
      customer: "Mike Chen",
      customerPhoto:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      service: "Kitchen Outlet Installation",
      address: "456 Pine Ave, San Francisco, CA",
      date: "Today",
      time: "10:00 AM - 12:00 PM",
      status: "pending",
      price: 85,
      urgent: true,
      description: "Need 3 new GFCI outlets installed in kitchen island.",
      customerPhone: "(555) 987-6543",
    },
    {
      id: 3,
      customer: "Emily Davis",
      customerPhoto:
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=150&h=150&fit=crop&crop=face",
      service: "Ceiling Fan Installation",
      address: "789 Elm Street, San Francisco, CA",
      date: "Tomorrow",
      time: "4:30 PM - 6:30 PM",
      status: "in_progress",
      price: 150,
      urgent: false,
      description: "Replace old ceiling fan with new smart fan in living room.",
      customerPhone: "(555) 456-7890",
    },
    {
      id: 4,
      customer: "David Wilson",
      customerPhoto:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      service: "Panel Upgrade",
      address: "321 Maple Drive, San Francisco, CA",
      date: "Nov 23",
      time: "9:00 AM - 12:00 PM",
      status: "pending",
      price: 450,
      urgent: false,
      description:
        "Upgrade 100 amp panel to 200 amp for home renovation project.",
      customerPhone: "(555) 234-5678",
    },
    {
      id: 5,
      customer: "Lisa Martinez",
      customerPhoto:
        "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face",
      service: "Light Fixture Installation",
      address: "654 Cedar Lane, San Francisco, CA",
      date: "Nov 24",
      time: "1:00 PM - 3:00 PM",
      status: "completed",
      price: 75,
      urgent: false,
      description: "Install modern pendant lights over kitchen counter.",
      customerPhone: "(555) 345-6789",
    },
  ]);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const filters = [
    { key: "all", label: "All Orders", count: orders.length },
    {
      key: "pending",
      label: "Pending",
      count: orders.filter((o) => o.status === "pending").length,
    },
    {
      key: "confirmed",
      label: "Confirmed",
      count: orders.filter((o) => o.status === "confirmed").length,
    },
    {
      key: "in_progress",
      label: "In Progress",
      count: orders.filter((o) => o.status === "in_progress").length,
    },
    {
      key: "completed",
      label: "Completed",
      count: orders.filter((o) => o.status === "completed").length,
    },
  ];

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const handleAcceptOrder = async (order) => {
    try {
      const response = await fetch(
        `/api/contractor/orders/${order.id}/accept`,
        {
          method: "POST",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to accept order");
      }

      updateOrderStatus(order.id, "confirmed");
      Alert.alert("Success", `Order from ${order.customer} has been accepted!`);
    } catch (error) {
      console.error("Accept order error:", error);
      Alert.alert("Error", error.message || "Failed to accept order");
    }
  };

  const handleDeclineOrder = async (order) => {
    Alert.alert(
      "Decline Order",
      `Are you sure you want to decline this order from ${order.customer}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Decline",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `/api/contractor/orders/${order.id}/decline`,
                {
                  method: "POST",
                },
              );

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.error || "Failed to decline order");
              }

              // Remove from list or update status
              setOrders((prevOrders) =>
                prevOrders.filter((o) => o.id !== order.id),
              );
              Alert.alert("Order Declined", "The order has been declined.");
            } catch (error) {
              console.error("Decline order error:", error);
              Alert.alert("Error", error.message || "Failed to decline order");
            }
          },
        },
      ],
    );
  };

  const handleStartJob = async (order) => {
    Alert.alert("Start Job", `Ready to start work for ${order.customer}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Start",
        onPress: async () => {
          try {
            const response = await fetch(
              `/api/contractor/orders/${order.id}/start`,
              {
                method: "POST",
              },
            );

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || "Failed to start job");
            }

            updateOrderStatus(order.id, "in_progress");
            Alert.alert(
              "Job Started",
              "Timer started! Good luck with the job.",
            );
          } catch (error) {
            console.error("Start job error:", error);
            Alert.alert("Error", error.message || "Failed to start job");
          }
        },
      },
    ]);
  };

  const handleCompleteJob = async (order) => {
    Alert.alert("Complete Job", `Mark this job as completed?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Complete",
        onPress: async () => {
          try {
            const response = await fetch(
              `/api/contractor/orders/${order.id}/complete`,
              {
                method: "POST",
              },
            );

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || "Failed to complete job");
            }

            updateOrderStatus(order.id, "completed");
            Alert.alert(
              "Job Completed!",
              "Great work! Don't forget to ask the customer for a review.",
              [
                {
                  text: "OK",
                  onPress: () => router.push(`/rate-customer/${order.id}`),
                },
              ],
            );
          } catch (error) {
            console.error("Complete job error:", error);
            Alert.alert("Error", error.message || "Failed to complete job");
          }
        },
      },
    ]);
  };

  const handleCallCustomer = (order) => {
    Alert.alert(
      "Call Customer",
      `Call ${order.customer} at ${order.customerPhone}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          onPress: () => {
            Linking.openURL(`tel:${order.customerPhone}`);
          },
        },
      ],
    );
  };

  const handleMessageCustomer = (order) => {
    router.push(`/chat/${order.id}`);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return theme.colors.verified;
      case "pending":
        return theme.colors.orange;
      case "in_progress":
        return theme.colors.blue;
      case "completed":
        return theme.colors.textSecondary;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending Response";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const OrderCard = ({ order }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        opacity: pressed ? 0.7 : 1,
        borderLeftWidth: 4,
        borderLeftColor: getStatusColor(order.status),
        ...theme.colors.shadow,
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.colors.primarySoft,
            marginRight: 12,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: theme.colors.primarySoft,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.primary,
              }}
            >
              {order.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.text,
                flex: 1,
              }}
            >
              {order.service}
            </Text>
            {order.urgent && (
              <View
                style={{
                  backgroundColor: theme.colors.red,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  marginLeft: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 12,
                    color: "#FFFFFF",
                  }}
                >
                  URGENT
                </Text>
              </View>
            )}
          </View>

          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.colors.text,
              marginBottom: 4,
            }}
          >
            {order.customer}
          </Text>

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
                color: theme.colors.textSecondary,
                marginLeft: 4,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {order.address}
            </Text>
          </View>

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
                color: theme.colors.textSecondary,
                marginLeft: 4,
                marginRight: 16,
              }}
            >
              {order.date}
            </Text>
            <Clock size={14} color={theme.colors.textSecondary} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                marginLeft: 4,
              }}
            >
              {order.time}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
              marginBottom: 12,
              lineHeight: 20,
            }}
            numberOfLines={2}
          >
            {order.description}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: `${getStatusColor(order.status)}20`,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                  color: getStatusColor(order.status),
                }}
              >
                {getStatusText(order.status)}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.primary,
              }}
            >
              ${order.price}
            </Text>
          </View>

          {/* Action Buttons for Pending Orders */}
          {order.status === "pending" && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.verified,
                  borderRadius: 8,
                  paddingVertical: 8,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleAcceptOrder(order)}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  Accept
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.cardBorder,
                  borderRadius: 8,
                  paddingVertical: 8,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleDeclineOrder(order)}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: theme.colors.text,
                  }}
                >
                  Decline
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.blue,
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleMessageCustomer(order)}
              >
                <MessageCircle size={16} color="#FFFFFF" />
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.verified,
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleCallCustomer(order)}
              >
                <Phone size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          )}

          {/* Action Buttons for Confirmed Orders */}
          {order.status === "confirmed" && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.blue,
                  borderRadius: 8,
                  paddingVertical: 8,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleStartJob(order)}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  Start Job
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.blue,
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleMessageCustomer(order)}
              >
                <MessageCircle size={16} color="#FFFFFF" />
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.verified,
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleCallCustomer(order)}
              >
                <Phone size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          )}

          {/* Action Buttons for In Progress Orders */}
          {order.status === "in_progress" && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.verified,
                  borderRadius: 8,
                  paddingVertical: 8,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleCompleteJob(order)}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  Complete Job
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.blue,
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleMessageCustomer(order)}
              >
                <MessageCircle size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          )}

          {/* Action Buttons for Completed Orders */}
          {order.status === "completed" && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 8,
                  paddingVertical: 8,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => router.push(`/rate-customer/${order.id}`)}
              >
                <Star size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  Rate Customer
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.cardBackground,
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.colors.cardBorder,
                  opacity: pressed ? 0.7 : 1,
                })}
                onPress={() => handleMessageCustomer(order)}
              >
                <MessageCircle size={16} color={theme.colors.text} />
              </Pressable>
            </View>
          )}
        </View>

        <ArrowRight size={20} color={theme.colors.textSecondary} />
      </View>
    </Pressable>
  );

  const FilterChip = ({ filter, isActive, onPress }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: isActive
          ? theme.colors.primary
          : theme.colors.cardBackground,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        opacity: pressed ? 0.7 : 1,
        flexDirection: "row",
        alignItems: "center",
        ...theme.colors.shadow,
      })}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color: isActive ? "#FFFFFF" : theme.colors.text,
          marginRight: filter.count ? 4 : 0,
        }}
      >
        {filter.label}
      </Text>
      {filter.count > 0 && (
        <View
          style={{
            backgroundColor: isActive
              ? "rgba(255, 255, 255, 0.3)"
              : theme.colors.primarySoft,
            borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
            minWidth: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: isActive ? "#FFFFFF" : theme.colors.primary,
            }}
          >
            {filter.count}
          </Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 24,
            color: theme.colors.text,
            marginBottom: 16,
          }}
        >
          Orders
        </Text>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
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
              paddingVertical: 12,
              paddingHorizontal: 12,
            }}
            placeholder="Search orders..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <FilterChip
              key={filter.key}
              filter={filter}
              isActive={activeFilter === filter.key}
              onPress={() => setActiveFilter(filter.key)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 60,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 60,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <Calendar size={40} color={theme.colors.textSecondary} />
            </View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              No Orders Found
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: theme.colors.textSecondary,
                textAlign: "center",
              }}
            >
              {searchQuery
                ? "Try adjusting your search criteria"
                : "New orders will appear here"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
