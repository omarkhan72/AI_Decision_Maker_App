import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/onboardingScreens/WelcomeScreen';
import DescribeDecisionScreen from './src/onboardingScreens/DescribeDecisionScreen';
import AnalysisOverviewScreen from './src/onboardingScreens/AnalysisOverviewScreen';
import ConfidenceIntroScreen from './src/onboardingScreens/ConfidenceIntroScreen';
import SignInScreen from './src/onboardingScreens/SignInScreen';
import DecisionsScreen from './src/screens/DecisionsScreen';

export type RootStackParamList = {
  Welcome: undefined;
  DescribeDecision: undefined;
  AnalysisOverview: undefined;
  ConfidenceIntro: undefined;
  SignIn: undefined;
  Decisions: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="DescribeDecision" component={DescribeDecisionScreen} />
          <Stack.Screen name="AnalysisOverview" component={AnalysisOverviewScreen} />
          <Stack.Screen name="ConfidenceIntro" component={ConfidenceIntroScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Decisions" component={DecisionsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
