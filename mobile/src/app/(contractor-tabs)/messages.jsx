import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
  TextInput,
  Image,
  Alert,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Search,
  MessageCircle,
  Phone,
  Video,
  MoreHorizontal,
  ArrowRight,
  Circle,
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

export default function ContractorMessages() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const mockConversations = [
    {
      id: 1,
      customer: "Sarah Johnson",
      customerPhoto:
        "https://images.unsplash.com/photo-1494790108755-2616b612d3bd?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "Perfect! I'll be home around 2 PM. Thank you so much for fitting me in today.",
      timestamp: "2 min ago",
      unreadCount: 0,
      isOnline: true,
      jobType: "Electrical Repair",
      status: "confirmed",
      phoneNumber: "(555) 123-4567",
    },
    {
      id: 2,
      customer: "Mike Chen",
      customerPhoto:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "Hi! Could you give me an estimate for the kitchen outlets? When would you be available?",
      timestamp: "15 min ago",
      unreadCount: 2,
      isOnline: false,
      jobType: "Kitchen Outlet Installation",
      status: "pending",
      phoneNumber: "(555) 987-6543",
    },
    {
      id: 3,
      customer: "Emily Davis",
      customerPhoto:
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for the update! Let me know when you're finished.",
      timestamp: "1 hour ago",
      unreadCount: 0,
      isOnline: true,
      jobType: "Ceiling Fan Installation",
      status: "in_progress",
      phoneNumber: "(555) 456-7890",
    },
    {
      id: 4,
      customer: "David Wilson",
      customerPhoto:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "Great! Looking forward to getting this panel upgraded. What time works best for you on Saturday?",
      timestamp: "3 hours ago",
      unreadCount: 1,
      isOnline: false,
      jobType: "Panel Upgrade",
      status: "pending",
      phoneNumber: "(555) 234-5678",
    },
    {
      id: 5,
      customer: "Lisa Martinez",
      customerPhoto:
        "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "Amazing work! The pendant lights look perfect. Thank you again!",
      timestamp: "Yesterday",
      unreadCount: 0,
      isOnline: false,
      jobType: "Light Fixture Installation",
      status: "completed",
      phoneNumber: "(555) 345-6789",
    },
    {
      id: 6,
      customer: "Robert Kim",
      customerPhoto:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "Hi, I need some electrical work done in my garage. Are you available this week?",
      timestamp: "2 days ago",
      unreadCount: 3,
      isOnline: true,
      jobType: "Garage Electrical",
      status: "inquiry",
      phoneNumber: "(555) 567-8901",
    },
  ];

  const handleOpenChat = (conversation) => {
    router.push(`/chat/${conversation.id}`);
  };

  const handleCallCustomer = (conversation) => {
    Alert.alert(
      "Call Customer",
      `Call ${conversation.customer} at ${conversation.phoneNumber}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          onPress: () => {
            Linking.openURL(`tel:${conversation.phoneNumber}`);
          },
        },
      ],
    );
  };

  const handleVideoCall = (conversation) => {
    Alert.alert(
      "Video Call",
      `Start a video call with ${conversation.customer}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Start Call",
          onPress: () => {
            Alert.alert("Video Call", "Video calling feature coming soon!");
          },
        },
      ],
    );
  };

  const handleComposeMessage = () => {
    Alert.alert(
      "Compose Message",
      "Select a customer to start a new conversation",
      [{ text: "OK" }],
    );
  };

  const handleViewCallLog = () => {
    Alert.alert("Call Log", "Your call history will appear here", [
      { text: "OK" },
    ]);
  };

  const onRefresh = () => {
    setRefreshing(true);
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
      case "inquiry":
        return theme.colors.purple;
      default:
        return theme.colors.textSecondary;
    }
  };

  const filteredConversations = mockConversations.filter(
    (conversation) =>
      conversation.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.jobType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);

    if (timestamp.includes("min ago") || timestamp.includes("hour ago")) {
      return timestamp;
    } else if (timestamp === "Yesterday") {
      return "Yesterday";
    } else {
      return timestamp;
    }
  };

  const ConversationCard = ({ conversation }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        opacity: pressed ? 0.7 : 1,
        ...theme.colors.shadow,
      })}
      onPress={() => handleOpenChat(conversation)}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        {/* Profile Photo with Online Status */}
        <View style={{ position: "relative", marginRight: 12 }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: theme.colors.primarySoft,
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
                {conversation.customer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
          </View>

          {/* Online Status Indicator */}
          {conversation.isOnline && (
            <View
              style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: theme.colors.verified,
                borderWidth: 2,
                borderColor: theme.colors.cardBackground,
              }}
            />
          )}
        </View>

        {/* Message Content */}
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
                flex: 1,
              }}
            >
              {conversation.customer}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.colors.textSecondary,
                  marginRight: 8,
                }}
              >
                {formatTimestamp(conversation.timestamp)}
              </Text>

              {conversation.unreadCount > 0 && (
                <View
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 6,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 12,
                      color: "#FFFFFF",
                    }}
                  >
                    {conversation.unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: theme.colors.textSecondary,
                marginRight: 8,
              }}
            >
              {conversation.jobType}
            </Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: getStatusColor(conversation.status),
              }}
            />
          </View>

          <Text
            style={{
              fontFamily:
                conversation.unreadCount > 0
                  ? "Inter_500Medium"
                  : "Inter_400Regular",
              fontSize: 14,
              color:
                conversation.unreadCount > 0
                  ? theme.colors.text
                  : theme.colors.textSecondary,
              lineHeight: 20,
              marginBottom: 12,
            }}
            numberOfLines={2}
          >
            {conversation.lastMessage}
          </Text>

          {/* Action Buttons */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: theme.colors.primary,
                borderRadius: 8,
                paddingVertical: 8,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={(e) => {
                e.stopPropagation();
                handleOpenChat(conversation);
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}
              >
                Reply
              </Text>
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
              onPress={(e) => {
                e.stopPropagation();
                handleCallCustomer(conversation);
              }}
            >
              <Phone size={16} color="#FFFFFF" />
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
              onPress={(e) => {
                e.stopPropagation();
                handleVideoCall(conversation);
              }}
            >
              <Video size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <ArrowRight size={20} color={theme.colors.textSecondary} />
      </View>
    </Pressable>
  );

  const totalUnreadCount = filteredConversations.reduce(
    (sum, conversation) => sum + conversation.unreadCount,
    0,
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
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 24,
              color: theme.colors.text,
            }}
          >
            Messages
          </Text>

          {totalUnreadCount > 0 && (
            <View
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 12,
                  color: "#FFFFFF",
                }}
              >
                {totalUnreadCount} unread
              </Text>
            </View>
          )}
        </View>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
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
            placeholder="Search conversations..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Conversations List */}
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
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
            />
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
              <MessageCircle size={40} color={theme.colors.textSecondary} />
            </View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              No Messages Found
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
                : "Customer messages will appear here"}
            </Text>
          </View>
        )}

        {/* Quick Actions */}
        {filteredConversations.length > 0 && (
          <View style={{ marginTop: 24 }}>
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
                  backgroundColor: theme.colors.blue,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                  ...theme.colors.shadow,
                })}
                onPress={handleComposeMessage}
              >
                <MessageCircle size={24} color="#FFFFFF" />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: "#FFFFFF",
                    marginTop: 8,
                  }}
                >
                  Compose
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: theme.colors.verified,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                  ...theme.colors.shadow,
                })}
                onPress={handleViewCallLog}
              >
                <Phone size={24} color="#FFFFFF" />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: "#FFFFFF",
                    marginTop: 8,
                  }}
                >
                  Call Log
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
