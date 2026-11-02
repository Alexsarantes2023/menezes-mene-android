import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Importação das 6 Telas do Projeto
import HomeScreen from '../screens/HomeScreen';
import MediaScreen from '../screens/MediaScreen';
import ServicesScreen from '../screens/ServicesScreen';
import FaqPixScreen from '../screens/FaqPixScreen';
import ContactScreen from '../screens/ContactScreen';
import SocialScreen from '../screens/SocialScreen';

export type RootTabParamList = {
  Home: undefined;
  Media: undefined;
  Services: undefined;
  FaqPix: undefined;
  Contact: undefined;
  Social: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Design Tokens Oficiais do Ministério Menezes Mêne
export const THEME = {
  colors: {
    surface: '#0b1326',
    surfaceDim: '#060e20',
    surfaceContainer: '#161f36',
    primary: '#10b981', // Verde Esmeralda oficial
    primarySubtle: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#ffffff',
    textMuted: '#94a3b8',
  },
};

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: THEME.colors.primary,
        tabBarInactiveTintColor: THEME.colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
          ) : (
            <View style={styles.androidTabBarBg} />
          ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialIcons name="home" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Media"
        component={MediaScreen}
        options={{
          tabBarLabel: 'Mídias',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialIcons name="video-library" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarLabel: 'Serviços',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialIcons name="school" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FaqPix"
        component={FaqPixScreen}
        options={{
          tabBarLabel: 'FAQ & Pix',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialIcons name="qr-code-2" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contato',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialIcons name="chat" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          tabBarLabel: 'Redes',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialIcons name="share" size={22} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 16,
    left: 12,
    right: 12,
    elevation: 10,
    backgroundColor: 'transparent',
    borderRadius: 32,
    height: 68,
    paddingBottom: 8,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    overflow: 'hidden',
  },
  androidTabBarBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 19, 38, 0.94)',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: THEME.colors.primarySubtle,
  },
});