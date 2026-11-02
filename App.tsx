import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { setAudioModeAsync } from 'expo-audio';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import BottomTabsNavigator, { THEME } from './navigation/BottomTabsNavigator';

// Configuração do Tema Escuro Oficial (Dark Midnight Canvas)
const AppNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: THEME.colors.primary,          // Verde Esmeralda (#10b981)
    background: THEME.colors.surface,       // Midnight Canvas (#0b1326)
    card: THEME.colors.surfaceContainer,    // Superfície dos Cards (#161f36)
    text: THEME.colors.textPrimary,         // Branco (#ffffff)
    border: THEME.colors.border,            // Borda sutil translúcida
  },
};

export default function App() {
  // Configuração global de áudio nativo para reprodução de louvores
  useEffect(() => {
    async function configureAudio() {
      try {
        await setAudioModeAsync({ playsInSilentMode: true });
      } catch (e) {
        console.warn('Configuração de áudio inicializada:', e);
      }
    }
    configureAudio();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar 
        style="light" 
      />
      <NavigationContainer theme={AppNavigationTheme}>
        <BottomTabsNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
