import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  Image,
  Alert,
} from "react-native";
import {
  ArrowLeft,
  Send,
  Shield,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import KeyboardAvoidingAnimatedView from "../../components/KeyboardAvoidingAnimatedView";
import { useTheme } from "../../utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function ChatScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { contractorId } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Mock contractor data
  const contractor = {
    id: contractorId,
    name: "Mike Johnson",
    specialty: "Licensed Electrician",
    verified: true,
    online: true,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  // Mock messages
  const initialMessages = [
    {
      id: 1,
      text: "Hi! I saw your request for electrical work. I'd be happy to help you with the outlet installation.",
      sender: "contractor",
      timestamp: "2:30 PM",
      date: "Today",
    },
    {
      id: 2,
      text: "Great! When would you be available to take a look?",
      sender: "user",
      timestamp: "2:32 PM",
      date: "Today",
    },
    {
      id: 3,
      text: "I have availability this Tuesday afternoon or Wednesday morning. Which works better for you?",
      sender: "contractor",
      timestamp: "2:35 PM",
      date: "Today",
    },
    {
      id: 4,
      text: "Tuesday afternoon would be perfect. What time?",
      sender: "user",
      timestamp: "2:37 PM",
      date: "Today",
    },
    {
      id: 5,
      text: "How about 2:00 PM? I can come by to assess the work and provide you with a detailed quote.",
      sender: "contractor",
      timestamp: "2:40 PM",
      date: "Today",
    },
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message.trim(),
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: "Today",
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Simulate contractor response
      setTimeout(() => {
        const responses = [
          "Thanks for the message! I'll get back to you shortly.",
          "Sounds good! I'll see you then.",
          "Perfect! Looking forward to working with you.",
          "Great! I'll bring all the necessary tools and materials.",
        ];

        const response = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: "contractor",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: "Today",
        };

        setMessages((prev) => [...prev, response]);

        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 2000);
    }
  };

  const MessageBubble = ({ item }) => {
    const isUser = item.sender === "user";

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: isUser ? "flex-end" : "flex-start",
          marginBottom: 12,
          paddingHorizontal: 16,
        }}
      >
        {!isUser && (
          <Image
            source={{ uri: contractor.image }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginRight: 8,
              marginTop: 4,
            }}
          />
        )}

        <View
          style={{
            backgroundColor: isUser
              ? theme.colors.primary
              : theme.colors.cardBackground,
            borderRadius: 16,
            borderBottomLeftRadius: !isUser ? 4 : 16,
            borderBottomRightRadius: isUser ? 4 : 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            maxWidth: "75%",
            ...(!isUser && theme.colors.shadow),
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: isUser ? "#FFFFFF" : theme.colors.text,
              lineHeight: 22,
            }}
          >
            {item.text}
          </Text>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: isUser
                ? "rgba(255, 255, 255, 0.7)"
                : theme.colors.textMuted,
              marginTop: 4,
              textAlign: "right",
            }}
          >
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  const handleCall = () => {
    Alert.alert(
      "Call Contractor",
      `Would you like to call ${contractor.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => console.log("Calling contractor...") },
      ],
    );
  };

  const handleVideoCall = () => {
    Alert.alert("Video Call", `Start a video call with ${contractor.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Start Call",
        onPress: () => console.log("Starting video call..."),
      },
    ]);
  };

  return (
    <KeyboardAvoidingAnimatedView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior="padding"
    >
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
              marginRight: 12,
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color={theme.colors.text} />
          </Pressable>

          <View style={{ position: "relative", marginRight: 12 }}>
            <Image
              source={{ uri: contractor.image }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
            {contractor.verified && (
              <View
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  backgroundColor: theme.colors.iconBackground.verified,
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <Shield size={8} color={theme.colors.verified} />
              </View>
            )}
            {contractor.online && (
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: theme.colors.green,
                  borderWidth: 2,
                  borderColor: theme.colors.surface,
                }}
              />
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.colors.text,
              }}
            >
              {contractor.name}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: contractor.online
                  ? theme.colors.green
                  : theme.colors.textSecondary,
              }}
            >
              {contractor.online ? "Online" : "Last seen 2 hours ago"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 8,
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={handleCall}
            >
              <Phone size={20} color={theme.colors.text} />
            </Pressable>

            <Pressable
              style={({ pressed }) => ({
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 8,
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={handleVideoCall}
            >
              <Video size={20} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MessageBubble item={item} />}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: false })
        }
      />

      {/* Message Input */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.cardBorder,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 8,
            ...theme.colors.shadow,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: theme.colors.text,
              maxHeight: 100,
              paddingVertical: 8,
            }}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={theme.colors.textSecondary}
            multiline
          />

          <Pressable
            style={({ pressed }) => ({
              backgroundColor: message.trim()
                ? theme.colors.primary
                : theme.colors.cardBorder,
              borderRadius: 20,
              padding: 8,
              marginLeft: 8,
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Send size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
