import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Platform } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/hooks/useAuth';
import { colors } from './src/theme';

// Add global cursor hover effects for Web
if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    div[role="button"], a[role="link"], div[role="tab"] {
      cursor: pointer !important;
      transition: opacity 0.2s ease, transform 0.2s ease !important;
    }
    div[role="button"]:hover, a[role="link"]:hover, div[role="tab"]:hover {
      opacity: 0.8 !important;
      transform: scale(1.02) !important;
    }
  `;
  document.head.appendChild(style);
}

// Configure TanStack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: true,
    },
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NavigationContainer>
              <StatusBar style="dark" backgroundColor={colors.background} />
              <AppNavigator />
            </NavigationContainer>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
