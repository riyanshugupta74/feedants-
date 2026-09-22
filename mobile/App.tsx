import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Platform, View, StyleSheet } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/hooks/useAuth';
import { colors } from './src/theme';

// Add global cursor hover effects for Web
if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    body {
      background-color: #f0f2f5;
    }
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
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.webContainer}>
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
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  webContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 600 : '100%', // Centered container for desktop
    alignSelf: 'center',
    backgroundColor: colors.background,
    // Add a subtle shadow for the desktop web wrapper
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }),
  },
});
