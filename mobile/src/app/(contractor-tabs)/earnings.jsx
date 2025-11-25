import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Star,
  Award,
  Target,
  BarChart3,
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

export default function ContractorEarnings() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const periods = [
    { key: "day", label: "Today" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
    { key: "year", label: "Year" },
  ];

  const earningsData = {
    day: {
      total: 285,
      jobsCompleted: 2,
      hoursWorked: 6.5,
      avgHourlyRate: 85,
      trend: 12.5,
      trendDirection: "up",
    },
    week: {
      total: 1420,
      jobsCompleted: 8,
      hoursWorked: 24.5,
      avgHourlyRate: 92,
      trend: 8.3,
      trendDirection: "up",
    },
    month: {
      total: 5840,
      jobsCompleted: 32,
      hoursWorked: 89.5,
      avgHourlyRate: 88,
      trend: -2.1,
      trendDirection: "down",
    },
    year: {
      total: 68240,
      jobsCompleted: 387,
      hoursWorked: 1056,
      avgHourlyRate: 86,
      trend: 15.7,
      trendDirection: "up",
    },
  };

  const recentTransactions = [
    {
      id: 1,
      customer: "Sarah Johnson",
      service: "Electrical Repair",
      amount: 120,
      date: "Today, 4:30 PM",
      status: "completed",
      rating: 5,
    },
    {
      id: 2,
      customer: "Mike Chen",
      service: "Kitchen Outlets",
      amount: 165,
      date: "Today, 1:15 PM",
      status: "completed",
      rating: 5,
    },
    {
      id: 3,
      customer: "Emily Davis",
      service: "Ceiling Fan Installation",
      amount: 150,
      date: "Yesterday, 6:45 PM",
      status: "completed",
      rating: 5,
    },
    {
      id: 4,
      customer: "David Wilson",
      service: "Panel Upgrade",
      amount: 450,
      date: "Nov 19, 11:30 AM",
      status: "completed",
      rating: 4,
    },
    {
      id: 5,
      customer: "Lisa Martinez",
      service: "Light Fixtures",
      amount: 75,
      date: "Nov 18, 2:20 PM",
      status: "completed",
      rating: 5,
    },
  ];

  const currentData = earningsData[selectedPeriod];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    trend,
    color = theme.colors.primary,
  }) => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        ...theme.colors.shadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: `${color}20`,
              borderRadius: 12,
              padding: 8,
              alignSelf: "flex-start",
              marginBottom: 12,
            }}
          >
            {icon}
          </View>

          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 24,
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
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {trend && (
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:
                  trend.direction === "up"
                    ? `${theme.colors.verified}20`
                    : `${theme.colors.red}20`,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              {trend.direction === "up" ? (
                <TrendingUp size={14} color={theme.colors.verified} />
              ) : (
                <TrendingDown size={14} color={theme.colors.red} />
              )}
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                  color:
                    trend.direction === "up"
                      ? theme.colors.verified
                      : theme.colors.red,
                  marginLeft: 4,
                }}
              >
                {trend.value}%
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 10,
                color: theme.colors.textSecondary,
                marginTop: 2,
              }}
            >
              vs last {selectedPeriod}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const TransactionCard = ({ transaction }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        opacity: pressed ? 0.7 : 1,
        ...theme.colors.shadow,
      })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: theme.colors.text,
              marginBottom: 4,
            }}
          >
            {transaction.service}
          </Text>

          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.colors.textSecondary,
              marginBottom: 8,
            }}
          >
            {transaction.customer}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Calendar size={12} color={theme.colors.textSecondary} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
                marginLeft: 4,
                marginRight: 12,
              }}
            >
              {transaction.date}
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
                  color: theme.colors.orange,
                  marginLeft: 2,
                }}
              >
                {transaction.rating}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 18,
              color: theme.colors.verified,
              marginBottom: 4,
            }}
          >
            +${transaction.amount}
          </Text>

          <View
            style={{
              backgroundColor: `${theme.colors.verified}20`,
              borderRadius: 6,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 10,
                color: theme.colors.verified,
              }}
            >
              PAID
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const PeriodSelector = () => (
    <View
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: 4,
        flexDirection: "row",
        marginBottom: 24,
        ...theme.colors.shadow,
      }}
    >
      {periods.map((period) => (
        <Pressable
          key={period.key}
          style={({ pressed }) => ({
            flex: 1,
            backgroundColor:
              selectedPeriod === period.key
                ? theme.colors.primary
                : "transparent",
            borderRadius: 8,
            paddingVertical: 8,
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={() => setSelectedPeriod(period.key)}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color:
                selectedPeriod === period.key ? "#FFFFFF" : theme.colors.text,
            }}
          >
            {period.label}
          </Text>
        </Pressable>
      ))}
    </View>
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
            marginBottom: 8,
          }}
        >
          Earnings
        </Text>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.textSecondary,
          }}
        >
          Track your income and performance
        </Text>
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
        <PeriodSelector />

        {/* Main Earnings Card */}
        <View
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 20,
            padding: 24,
            marginBottom: 24,
            ...theme.colors.shadow,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 12,
                padding: 8,
                marginRight: 12,
              }}
            >
              <DollarSign size={24} color="#FFFFFF" />
            </View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              Total Earnings
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 36,
              color: "#FFFFFF",
              marginBottom: 8,
            }}
          >
            ${currentData.total.toLocaleString()}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {currentData.trendDirection === "up" ? (
              <TrendingUp size={16} color="#FFFFFF" />
            ) : (
              <TrendingDown size={16} color="#FFFFFF" />
            )}
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: "#FFFFFF",
                marginLeft: 4,
              }}
            >
              {currentData.trend}% from last {selectedPeriod}
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
          <View style={{ flex: 1 }}>
            <StatCard
              icon={<Award size={20} color={theme.colors.blue} />}
              title="Jobs Completed"
              value={currentData.jobsCompleted}
              color={theme.colors.blue}
            />
          </View>
          <View style={{ flex: 1 }}>
            <StatCard
              icon={<Clock size={20} color={theme.colors.purple} />}
              title="Hours Worked"
              value={`${currentData.hoursWorked}h`}
              color={theme.colors.purple}
            />
          </View>
        </View>

        <StatCard
          icon={<Target size={20} color={theme.colors.orange} />}
          title="Average Hourly Rate"
          value={`$${currentData.avgHourlyRate}/hr`}
          subtitle="Based on completed jobs"
          trend={{
            value: currentData.trend,
            direction: currentData.trendDirection,
          }}
          color={theme.colors.orange}
        />

        {/* Goals Section */}
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            ...theme.colors.shadow,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            Monthly Goals
          </Text>

          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.text,
                }}
              >
                Earnings Goal
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.colors.primary,
                }}
              >
                $5,840 / $8,000
              </Text>
            </View>
            <View
              style={{
                height: 8,
                backgroundColor: theme.colors.cardBorder,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "73%",
                  backgroundColor: theme.colors.primary,
                }}
              />
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: theme.colors.text,
                }}
              >
                Jobs Completed
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.colors.blue,
                }}
              >
                32 / 40
              </Text>
            </View>
            <View
              style={{
                height: 8,
                backgroundColor: theme.colors.cardBorder,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "80%",
                  backgroundColor: theme.colors.blue,
                }}
              />
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
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
              Recent Payments
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

          {recentTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
