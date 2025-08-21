import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

function WelcomeScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const vScale = Math.min(height / 812, 1);
  return (
    <LinearGradient
      colors={["#0C141A", "#0E2A38", "#1F4A5E", "#58BFD9"]}
      locations={[0, 0.32, 0.68, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.headerContainer, { paddingTop: 64 * vScale }]}>
          <Text style={[styles.title, { fontSize: 46 * scale, lineHeight: 54 * scale }]}>
            Welcome to AI Life{"\n"}Decision Mapper
          </Text>
          <Text style={[styles.subtitle, { fontSize: 20 * scale, lineHeight: 28 * scale }]}>
            {"Make Smarter Choices with\nAI-Powered Clarity"}
          </Text>
        </View>

        <View style={styles.illustrationContainer}>
          <Svg width={Math.min(240 * scale + 40, 240)} height={Math.min(300 * vScale + 40, 300)} viewBox="0 0 240 300">
          <Path d="M120 20 C70 80 60 150 120 240 C180 150 170 80 120 20 Z" fill="none" stroke="#4DB1E3" strokeWidth={6} />
          <Path d="M60 180 C100 170 140 170 180 180" fill="none" stroke="#F8B64C" strokeWidth={8} strokeLinecap="round" />
          <Circle cx={120} cy={180} r={6} fill="#4DB1E3" />
          <Circle cx={60} cy={180} r={6} fill="#F8B64C" />
          <Circle cx={180} cy={180} r={6} fill="#F8B64C" />
          <Path d="M52 186 C40 194 40 206 52 214" fill="none" stroke="#F8B64C" strokeWidth={6} strokeLinecap="round" />
          <Path d="M188 186 C200 194 200 206 188 214" fill="none" stroke="#F8B64C" strokeWidth={6} strokeLinecap="round" />
          </Svg>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.ctaButton, { paddingVertical: 16 * vScale }]}
            onPress={() => navigation.navigate('DescribeDecision' as never)}
          >
            <Text style={[styles.ctaLabel, { fontSize: 18 * scale }]}>Start My First Decision</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} activeOpacity={0.7} style={styles.loginLinkWrapper}>
            <Text style={[styles.loginLink, { fontSize: 16 * scale }]}>Already have an account? Log In</Text>
          </TouchableOpacity>
         
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 46,
    fontWeight: '800',
    lineHeight: 54,
    textAlign: 'center',
  },
  subtitle: {
    color: '#C1CFDA',
    fontSize: 22,
    marginTop: 18,
    lineHeight: 30,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  ctaButton: {
    backgroundColor: '#FEB64D',
    borderRadius: 36,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaLabel: {
    color: '#17313F',
    fontSize: 20,
    fontWeight: '800',
  },
  loginLinkWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#B7C7D1',
    textDecorationLine: 'underline',
    fontSize: 18,
  },
 
  

 
});

export default WelcomeScreen;


