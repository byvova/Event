import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import {
  MessageCircle,
  Search,
  Shield,
  Clock,
  Filter,
  Phone,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import ScreenContainer from "../../components/ScreenContainer";
import { useTheme } from "../../utils/theme";
import { useLanguage } from "../../utils/LanguageContext";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function MessagesScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const conversations = [
    {
      id: 1,
      contractorName: "Mike Johnson",
      contractorSpecialty: "Licensed Electrician",
      contractorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "I can start the electrical work next Tuesday. Would that work for you?",
      timestamp: "2 hours ago",
      unreadCount: 2,
      verified: true,
      status: "active",
      phoneNumber: "(555) 123-4567",
    },
    {
      id: 2,
      contractorName: "Sarah Chen",
      contractorSpecialty: "Master Plumber",
      contractorImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "Thanks for choosing my services! I'll send you a detailed quote shortly.",
      timestamp: "1 day ago",
      unreadCount: 0,
      verified: true,
      status: "pending",
      phoneNumber: "(555) 987-6543",
    },
    {
      id: 3,
      contractorName: "David Rodriguez",
      contractorSpecialty: "General Contractor",
      contractorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "The renovation project looks great! When would you like to schedule the final walkthrough?",
      timestamp: "3 days ago",
      unreadCount: 1,
      verified: true,
      status: "completed",
      phoneNumber: "(555) 456-7890",
    },
    {
      id: 4,
      contractorName: "Lisa Thompson",
      contractorSpecialty: "Interior Painter",
      contractorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "I have availability this weekend for the painting job. Let me know if that works!",
      timestamp: "1 week ago",
      unreadCount: 0,
      verified: true,
      status: "active",
      phoneNumber: "(555) 234-5678",
    },
  ];

  const tabs = [
    { id: "all", label: t("all"), count: conversations.length },
    {
      id: "active",
      label: t("active"),
      count: conversations.filter((c) => c.status === "active").length,
    },
    {
      id: "pending",
      label: t("pending"),
      count: conversations.filter((c) => c.status === "pending").length,
    },
    {
      id: "completed",
      label: t("completed"),
      count: conversations.filter((c) => c.status === "completed").length,
    },
  ];

  const filteredConversations = (
    selectedTab === "all"
      ? conversations
      : conversations.filter((c) => c.status === selectedTab)
  ).filter(
    (c) =>
      c.contractorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contractorSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return theme.colors.green;
      case "pending":
        return theme.colors.orange;
      case "completed":
        return theme.colors.blue;
      default:
        return theme.colors.textSecondary;
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp;
  };

  const handleOpenChat = (conversation) => {
    router.push(`/chat/${conversation.id}`);
  };

  const handleCallContractor = (conversation) => {
    Alert.alert(t("contact"), `Call ${conversation.contractorName}?`, [
      { text: t("cancel"), style: "cancel" },
      {
        text: "Call",
        onPress: () => {
          const phoneNumber = conversation.phoneNumber || "+1 555-123-4567";
          Linking.openURL(`tel:${phoneNumber}`);
        },
      },
    ]);
  };

  const handleShowContactOptions = (conversation) => {
    Alert.alert(t("contact"), `Contact ${conversation.contractorName}`, [
      {
        text: "Message",
        onPress: () => handleOpenChat(conversation),
      },
      {
        text: "Call",
        onPress: () => handleCallContractor(conversation),
      },
      { text: t("cancel"), style: "cancel" },
    ]);
  };

  const ConversationCard = ({ conversation }) => {
    return (
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
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: conversation.contractorImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 12,
              }}
            />
            {conversation.verified && (
              <View
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: 8,
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
                {conversation.contractorName}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: theme.colors.primarySoft,
                    borderRadius: 16,
                    padding: 6,
                    marginRight: 8,
                    opacity: pressed ? 0.7 : 1,
                  })}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleShowContactOptions(conversation);
                  }}
                >
                  <MoreHorizontal size={14} color={theme.colors.primary} />
                </Pressable>

                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: getStatusColor(conversation.status),
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {formatTimestamp(conversation.timestamp)}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 13,
                color: theme.colors.textSecondary,
                marginBottom: 8,
              }}
            >
              {conversation.contractorSpecialty}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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
                  flex: 1,
                  marginRight: 8,
                }}
                numberOfLines={2}
              >
                {conversation.lastMessage}
              </Text>

              {conversation.unreadCount > 0 && (
                <View
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
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
        </View>
      </Pressable>
    );
  };

  const EmptyState = () => (
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
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: theme.colors.primarySoft,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <MessageCircle size={32} color={theme.colors.textSecondary} />
      </View>

      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 20,
          color: theme.colors.text,
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        {t("noMessagesYet")}
      </Text>

      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 16,
          color: theme.colors.textSecondary,
          textAlign: "center",
          lineHeight: 24,
        }}
      >
        {t("noMessagesDesc")}
      </Text>
    </View>
  );

  return (
    <ScreenContainer scrollable={false}>
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 28,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          {t("messages")}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: theme.colors.textSecondary,
          }}
        >
          {t("chatWithContractors")}
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
          placeholder="Search conversations..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24,
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: selectedTab === tab.id ? "#FFFFFF" : theme.colors.text,
                  marginRight: tab.count > 0 ? 6 : 0,
                }}
              >
                {tab.label}
              </Text>
              {tab.count > 0 && (
                <View
                  style={{
                    backgroundColor:
                      selectedTab === tab.id
                        ? "rgba(255, 255, 255, 0.2)"
                        : theme.colors.primarySoft,
                    borderRadius: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    minWidth: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 11,
                      color:
                        selectedTab === tab.id
                          ? "#FFFFFF"
                          : theme.colors.primary,
                    }}
                  >
                    {tab.count}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </View>

      {/* Conversations List */}
      {filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ConversationCard conversation={item} />}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      ) : (
        <EmptyState />
      )}
    </ScreenContainer>
  );
}
