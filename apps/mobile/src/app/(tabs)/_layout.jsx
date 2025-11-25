import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import {
  Home,
  Search,
  MessageCircle,
  Calendar,
  User,
} from "lucide-react-native";
import { useTheme } from "../../utils/theme";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBarBackground,
          borderTopWidth: 1,
          borderTopColor: theme.colors.tabBarBorder,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter_400Regular",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={24} color={color} />,
          tabBarAccessibilityLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
          tabBarAccessibilityLabel: "Search Contractors",
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} />,
          tabBarAccessibilityLabel: "Messages",
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
          tabBarAccessibilityLabel: "My Bookings",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          tabBarAccessibilityLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
