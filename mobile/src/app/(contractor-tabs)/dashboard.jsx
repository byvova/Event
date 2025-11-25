import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Bell,
  Star,
  DollarSign,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MapPin,
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

export default function ContractorDashboard() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [refreshing, setRefreshing] = React.useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const mockStats = {
    todayEarnings: 285,
    weeklyEarnings: 1420,
    monthlyEarnings: 5840,
    completedJobs: 23,
    rating: 4.9,
    responseTime: "12 min",
  };

  const mockOrders = [
    {
      id: 1,
      customer: "Sarah Johnson",
      service: "Electrical Repair",
      address: "123 Oak Street, San Francisco",
      time: "2:00 PM - 4:00 PM",
      status: "confirmed",
      price: 120,
      urgent: false,
    },
    {
      id: 2,
      customer: "Mike Chen",
      service: "Kitchen Outlet Installation",
      address: "456 Pine Ave, San Francisco",
      time: "10:00 AM - 12:00 PM",
      status: "pending",
      price: 85,
      urgent: true,
    },
    {
      id: 3,
      customer: "Emily Davis",
      service: "Ceiling Fan Installation",
      address: "789 Elm Street, San Francisco",
      time: "4:30 PM - 6:30 PM",
      status: "in_progress",
      price: 150,
      urgent: false,
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
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
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending";
      case "in_progress":
        return "In Progress";
      default:
        return status;
    }
  };

  const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    color = theme.colors.primary,
  }) => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginRight: 12,
        minWidth: 140,
        alignItems: "center",
        ...theme.colors.shadow,
      }}
    >
      <View
        style={{
          backgroundColor: `${color}20`,
          borderRadius: 12,
          padding: 8,
          marginBottom: 12,
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          fontFamily: "Inter_700Bold",
          fontSize: 20,
          color: theme.colors.text,
          marginBottom: 4,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color: theme.colors.text,
          marginBottom: 2,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: theme.colors.textSecondary,
            textAlign: "center",
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

  const OrderCard = ({ order }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        opacity: pressed ? 0.7 : 1,
        borderLeftWidth: 4,
        borderLeftColor: getStatusColor(order.status),
        ...theme.colors.shadow,
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
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
            >
              {order.address}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
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
        </View>

        <ArrowRight size={20} color={theme.colors.textSecondary} />
      </View>
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
                fontSize: 24,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              Good morning, John!
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: theme.colors.textSecondary,
              }}
            >
              You have 3 jobs today
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => ({
              backgroundColor: theme.colors.cardBackground,
              borderRadius: 12,
              padding: 12,
              opacity: pressed ? 0.7 : 1,
              ...theme.colors.shadow,
            })}
          >
            <Bell size={24} color={theme.colors.text} />
          </Pressable>
        </View>
      </View>

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
        {/* Stats */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            Today's Overview
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <StatCard
              icon={<DollarSign size={24} color={theme.colors.verified} />}
              title="Today's Earnings"
              value={`$${mockStats.todayEarnings}`}
              color={theme.colors.verified}
            />
            <StatCard
              icon={<CheckCircle2 size={24} color={theme.colors.blue} />}
              title="Completed Jobs"
              value={mockStats.completedJobs}
              subtitle="this month"
              color={theme.colors.blue}
            />
            <StatCard
              icon={<Star size={24} color={theme.colors.orange} />}
              title="Rating"
              value={`${mockStats.rating}★`}
              color={theme.colors.orange}
            />
            <StatCard
              icon={<Clock size={24} color={theme.colors.purple} />}
              title="Response Time"
              value={mockStats.responseTime}
              subtitle="average"
              color={theme.colors.purple}
            />
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
                ...theme.colors.shadow,
              })}
            >
              <Calendar size={24} color="#FFFFFF" />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: "#FFFFFF",
                  marginTop: 8,
                }}
              >
                Schedule
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
                ...theme.colors.shadow,
              })}
            >
              <TrendingUp size={24} color={theme.colors.primary} />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.text,
                  marginTop: 8,
                }}
              >
                Analytics
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Today's Jobs */}
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
              }}
            >
              Today's Jobs
            </Text>
            <Pressable>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.primary,
                }}
              >
                View All
              </Text>
            </Pressable>
          </View>

          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
