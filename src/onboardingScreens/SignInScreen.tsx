import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Linking,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/RootNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

function AppLogo({ size }: { size: number }) {
  const outer = size;
  const inner = size * 0.65;
  const radiusOuter = size * 0.22;
  const radiusInner = inner * 0.28;

  return (
    <View
      style={{
        width: outer,
        height: outer,
        borderRadius: radiusOuter,
        backgroundColor: 'rgba(0,0,0,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 12,
      }}
    >
      <View
        style={{
          width: inner,
          height: inner,
          borderRadius: radiusInner,
          backgroundColor: '#4DB1E3',
        }}
      />
    </View>
  );
}

function GoogleG({ size = 22 }: { size?: number }) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24">
      <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </Svg>
  );
}

const SignInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width, height } = useWindowDimensions();
  
  // Improved responsive scaling
  const isSmallScreen = width < 375;
  const isTablet = width > 768;
  const scale = isTablet ? Math.min(width / 768, 1.2) : Math.max(width / 375, 0.85);
  const vScale = Math.max(height / 812, 0.8);

  const logoSize = isTablet ? Math.min(width * 0.15, 160) : Math.min(width * 0.35, isSmallScreen ? 120 : 150);

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(12)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(18)).current;
  const googleOpacity = useRef(new Animated.Value(0)).current;
  const googleTranslateY = useRef(new Animated.Value(20)).current;
  const orOpacity = useRef(new Animated.Value(0)).current;
  const orTranslateY = useRef(new Animated.Value(20)).current;
  const emailOpacity = useRef(new Animated.Value(0)).current;
  const emailTranslateY = useRef(new Animated.Value(20)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const ease = Easing.bezier(0.22, 0.61, 0.36, 1);
    Animated.stagger(130, [
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 520, easing: ease, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 7, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 560, easing: ease, useNativeDriver: true }),
        Animated.timing(titleTranslateY, { toValue: 0, duration: 560, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 600, easing: ease, useNativeDriver: true }),
        Animated.timing(subtitleTranslateY, { toValue: 0, duration: 600, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(googleOpacity, { toValue: 1, duration: 520, easing: ease, useNativeDriver: true }),
        Animated.timing(googleTranslateY, { toValue: 0, duration: 520, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(orOpacity, { toValue: 1, duration: 520, easing: ease, useNativeDriver: true }),
        Animated.timing(orTranslateY, { toValue: 0, duration: 520, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(emailOpacity, { toValue: 1, duration: 520, easing: ease, useNativeDriver: true }),
        Animated.timing(emailTranslateY, { toValue: 0, duration: 520, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(footerOpacity, { toValue: 1, duration: 520, easing: ease, useNativeDriver: true }),
        Animated.timing(footerTranslateY, { toValue: 0, duration: 520, easing: ease, useNativeDriver: true }),
      ]),
    ]).start();
  }, [
    logoOpacity,
    logoScale,
    titleOpacity,
    titleTranslateY,
    subtitleOpacity,
    subtitleTranslateY,
    googleOpacity,
    googleTranslateY,
    orOpacity,
    orTranslateY,
    emailOpacity,
    emailTranslateY,
    footerOpacity,
    footerTranslateY,
  ]);

  return (
    <LinearGradient
      colors={["#0C1216", "#163A45", "#57B8DE"]}
      locations={[0, 0.52, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}> 
          <AppLogo size={logoSize} />
        </Animated.View>

        <View style={[styles.headerWrap, { paddingHorizontal: isTablet ? 40 : 0 }]}>
          <Animated.Text
            style={[
              styles.title,
              {
                fontSize: Math.max(28 * scale, 26),
                lineHeight: Math.max(34 * scale, 32),
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }],
              },
            ]}
          >
            Welcome Back
          </Animated.Text>
          <Animated.Text
            style={[
              styles.subtitle,
              {
                fontSize: Math.max(17 * scale, 16),
                lineHeight: Math.max(22 * scale, 20),
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleTranslateY }],
              },
            ]}
          >
            Sign in to continue
          </Animated.Text>
        </View>

        <View style={[styles.buttonsContainer, { paddingHorizontal: isTablet ? 40 : 20 }]}>
          <Animated.View style={{ 
            opacity: googleOpacity, 
            transform: [{ translateY: googleTranslateY }],
            width: '100%'
          }}>
            <TouchableOpacity 
              activeOpacity={0.9} 
              style={[styles.googleBtn, {
                height: Math.max(56 * vScale, 52),
                maxWidth: isTablet ? 450 : 400
              }]} 
              onPress={() => navigation.navigate('Decisions')}
            > 
              <View style={styles.btnContent}>
                <GoogleG size={Math.max(22 * scale, 20)} />
                <Text style={[styles.googleLabel, { fontSize: Math.max(16 * scale, 15) }]}>Continue with Google</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.Text
            style={[
              styles.orText,
              { 
                fontSize: Math.max(15 * scale, 14), 
                opacity: orOpacity, 
                transform: [{ translateY: orTranslateY }] 
              },
            ]}
          >
            Or continue with email
          </Animated.Text>

          <Animated.View style={{ 
            opacity: emailOpacity, 
            transform: [{ translateY: emailTranslateY }],
            width: '100%'
          }}>
            <TouchableOpacity 
              activeOpacity={0.9} 
              style={[styles.emailBtn, {
                height: Math.max(56 * vScale, 52),
                maxWidth: isTablet ? 450 : 400
              }]}
            >
              <View style={styles.btnContent}>
                <Icon name="email-outline" size={Math.max(22 * scale, 20)} color="#FFFFFF" />
                <Text style={[styles.emailLabel, { fontSize: Math.max(16 * scale, 15) }]}>Sign in with Email</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View style={{ 
          opacity: footerOpacity, 
          transform: [{ translateY: footerTranslateY }],
          paddingHorizontal: isTablet ? 60 : 20
        }}>
          <Text style={[styles.signupText, { fontSize: Math.max(16 * scale, 15) }]}>Don't have an account? <Text onPress={() => {}} style={styles.signupLink}>Sign Up</Text></Text>

          <Text style={[styles.legalText, { fontSize: Math.max(13 * scale, 12) }]}>By continuing, you agree to our <Text style={styles.link} onPress={() => Linking.openURL('#')}>Terms of Service</Text> and <Text style={styles.link} onPress={() => Linking.openURL('#')}>Privacy Policy</Text></Text>
        </Animated.View>

        <View style={{ height: Math.max(40 * vScale, 30) }} />
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
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  logoWrap: {
    marginTop: 60,
    marginBottom: 32,
  },
  headerWrap: {
    marginBottom: 48,
    alignItems: 'center',
    maxWidth: 600,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    maxWidth: 500,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'System',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'System',
  },
  googleBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  googleLabel: {
    color: '#1A2B33',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 12,
    fontFamily: 'System',
  },
  orText: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 24,
    marginBottom: 24,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'System',
  },
  emailBtn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3DA5DC',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  emailLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 12,
    fontFamily: 'System',
  },
  signupText: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 48,
    textAlign: 'center',
    fontFamily: 'System',
  },
  signupLink: {
    color: '#FEB64D',
    fontWeight: '600',
  },
  legalText: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 28,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
    fontFamily: 'System',
  },
  link: {
    color: '#FEB64D',
    textDecorationLine: 'none',
    fontWeight: '500',
  },
});

export default SignInScreen;