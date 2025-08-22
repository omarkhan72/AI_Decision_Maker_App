import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../onboardingScreens/WelcomeScreen';
import AnalysisOverviewScreen from '../onboardingScreens/AnalysisOverviewScreen';
import ConfidenceIntroScreen from '../onboardingScreens/ConfidenceIntroScreen';
import SignInScreen from '../onboardingScreens/SignInScreen';
import DecisionsScreen from '../screens/DecisionsScreen';
import DescribeScreen from '../screens/DescribeScreen';
import AnalysisScreen from '../screens/Analysis';

export type RootStackParamList = {
  Welcome: undefined;
  AnalysisOverview: undefined;
  ConfidenceIntro: undefined;
  SignIn: undefined;
  Decisions: undefined;
    DescribeScreen: undefined;
  Analysis: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="AnalysisOverview" component={AnalysisOverviewScreen} />
      <Stack.Screen name="ConfidenceIntro" component={ConfidenceIntroScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Decisions" component={DecisionsScreen} />
            <Stack.Screen name="DescribeScreen" component={DescribeScreen} />
      <Stack.Screen name="Analysis" component={AnalysisScreen} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
