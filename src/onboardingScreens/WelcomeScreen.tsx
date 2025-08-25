import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

function WelcomeScreen() {
  const navigation = useNavigation();

  // Animated values
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(20)).current;
  const illoScale = useRef(new Animated.Value(0.9)).current;
  const illoOpacity = useRef(new Animated.Value(0)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const ctaTranslateY = useRef(new Animated.Value(20)).current;
  const linkOpacity = useRef(new Animated.Value(0)).current;
  const linkTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Smooth ease-out curve
    const tEase = Easing.bezier(0.22, 0.61, 0.36, 1);

    Animated.stagger(140, [
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 600, easing: tEase, useNativeDriver: true }),
        Animated.timing(titleTranslateY, { toValue: 0, duration: 600, easing: tEase, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 650, easing: tEase, useNativeDriver: true }),
        Animated.timing(subtitleTranslateY, { toValue: 0, duration: 650, easing: tEase, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(illoOpacity, { toValue: 1, duration: 550, easing: tEase, useNativeDriver: true }),
        Animated.spring(illoScale, { toValue: 1, friction: 7, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(ctaOpacity, { toValue: 1, duration: 520, easing: tEase, useNativeDriver: true }),
        Animated.timing(ctaTranslateY, { toValue: 0, duration: 520, easing: tEase, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(linkOpacity, { toValue: 1, duration: 520, easing: tEase, useNativeDriver: true }),
        Animated.timing(linkTranslateY, { toValue: 0, duration: 520, easing: tEase, useNativeDriver: true }),
      ]),
    ]).start();
  }, [titleOpacity, titleTranslateY, subtitleOpacity, subtitleTranslateY, illoScale, illoOpacity, ctaOpacity, ctaTranslateY, linkOpacity, linkTranslateY]);
  return (
    <LinearGradient
      colors={["#0C141A", "#0E2A38", "#1F4A5E", "#58BFD9"]}
      locations={[0, 0.32, 0.68, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
              <Animated.Text style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }]}>
                Welcome to AI Life{'\n'}Decision Mapper
              </Animated.Text>
              <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity, transform: [{ translateY: subtitleTranslateY }] }]}>
                {"Make Smarter Choices with\nAI-Powered Clarity"}
              </Animated.Text>
            </View>

            <Animated.View style={[styles.illustrationContainer, { opacity: illoOpacity, transform: [{ scale: illoScale }] }]}>
              <Svg width="100%" height="100%" viewBox="0 0 240 300" preserveAspectRatio="xMidYMid meet">
                <Path d="M120 20 C70 80 60 150 120 240 C180 150 170 80 120 20 Z" fill="none" stroke="#4DB1E3" strokeWidth={6} />
                <Path d="M60 180 C100 170 140 170 180 180" fill="none" stroke="#F8B64C" strokeWidth={8} strokeLinecap="round" />
                <Circle cx={120} cy={180} r={6} fill="#4DB1E3" />
                <Circle cx={60} cy={180} r={6} fill="#F8B64C" />
                <Circle cx={180} cy={180} r={6} fill="#F8B64C" />
                <Path d="M52 186 C40 194 40 206 52 214" fill="none" stroke="#F8B64C" strokeWidth={6} strokeLinecap="round" />
                <Path d="M188 186 C200 194 200 206 188 214" fill="none" stroke="#F8B64C" strokeWidth={6} strokeLinecap="round" />
              </Svg>
            </Animated.View>

            <View style={styles.footerContainer}>
              <Animated.View style={{ opacity: ctaOpacity, transform: [{ translateY: ctaTranslateY }] }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.ctaButton}
                  onPress={() => navigation.navigate('AnalysisOverview' as never)}
                >
                  <Text style={styles.ctaLabel}>Start My First Decision</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={[styles.loginLinkWrapper, { opacity: linkOpacity, transform: [{ translateY: linkTranslateY }] }]}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)} activeOpacity={0.7}>
                  <Text style={styles.loginLink}>Already have an account? Log In</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    paddingTop: '8%', 
    paddingBottom: '5%',
  },
  headerContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36, // Adjusted to prevent wrapping
    fontWeight: '800',
    lineHeight: 44,
    textAlign: 'center',
  },
  subtitle: {
    color: '#C1CFDA',
    fontSize: 18,
    marginTop: 18,
    lineHeight: 26,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
    width: '100%',
    marginVertical: 20,
  },
  footerContainer: {
    paddingBottom: '3%',
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
    fontSize: 18,
    fontWeight: '800',
  },
  loginLinkWrapper: {
    alignItems: 'center',
    marginTop: 24,
  },
  loginLink: {
    color: '#B7C7D1',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default WelcomeScreen;


