import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';

function AppLogo({ size }: { size: number }) {
  const outer = size;
  const inner = size * 0.65;
  const radiusOuter = size * 0.22;
  const radiusInner = inner * 0.28;
  return (
    <View style={{ width: outer, height: outer, borderRadius: radiusOuter, backgroundColor: 'rgba(0,0,0,0.25)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 18, elevation: 12 }}>
      <View style={{ width: inner, height: inner, borderRadius: radiusInner, backgroundColor: '#4DB1E3' }} />
    </View>
  );
}

function SignInScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const vScale = Math.min(height / 812, 1);

  const logoSize = Math.min(152 * scale + 8, 168);

  return (
    <LinearGradient colors={["#0D1013", "#103643", "#54B7DB"]} locations={[0, 0.55, 1]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrap}>
          <AppLogo size={logoSize} />
        </View>

        <View style={styles.headerWrap}>
          <Text style={[styles.title, { fontSize: 36 * scale, lineHeight: 42 * scale }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { fontSize: 18 * scale }]}>Sign in to continue</Text>
        </View>

        <TouchableOpacity activeOpacity={0.9} style={[styles.googleBtn, { paddingVertical: 14 * vScale }]}> 
          <View style={styles.btnContent}> 
            <View style={[styles.leftIconWrap, { backgroundColor: 'transparent' }]}> 
              <GoogleG size={22 * scale} />
            </View>
            <Text style={[styles.googleLabel, { fontSize: 18 * scale }]}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.orText, { fontSize: 16 * scale }]}>Or continue with email</Text>

        <TouchableOpacity activeOpacity={0.9} style={[styles.emailBtn, { paddingVertical: 16 * vScale }]}> 
          <View style={styles.btnContent}>
            <View style={[styles.leftIconWrap, styles.leftIconWrapEmail]}> 
              <Icon name="email-outline" size={20 * scale} color="#FFFFFF" />
            </View>
            <Text style={[styles.emailLabel, { fontSize: 18 * scale }]}>Sign in with Email</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.signupText, { fontSize: 16 * scale }]}>Don't have an account? <Text onPress={() => {}} style={styles.signupLink}>Sign Up</Text></Text>

        <Text style={[styles.legalText, { fontSize: 14 * scale }]}>By continuing, you agree to our <Text style={styles.link} onPress={() => Linking.openURL('#')}>Terms of Service</Text> and <Text style={styles.link} onPress={() => Linking.openURL('#')}>Privacy Policy</Text></Text>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 36,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logoWrap: {
    marginTop: 8,
  },
  headerWrap: {
    marginTop: 28,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  subtitle: {
    color: '#B7C7D1',
    marginTop: 12,
  },
  googleBtn: {
    marginTop: 28,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  btnContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    position: 'absolute',
    left: 20,
  },
  leftIconWrap: {
    position: 'absolute',
    left: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconWrapEmail: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  googleLabel: {
    color: '#1A2B33',
    fontWeight: '700',
  },
  orText: {
    color: '#B7C7D1',
    marginTop: 22,
  },
  emailBtn: {
    marginTop: 18,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    backgroundColor: '#4DB1E3',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  emailLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  signupText: {
    color: '#B7C7D1',
    marginTop: 24,
  },
  signupLink: {
    color: '#FEB64D',
    fontWeight: '700',
  },
  legalText: {
    color: '#B7C7D1',
    marginTop: 18,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  link: {
    color: '#FEB64D',
    textDecorationLine: 'underline',
  },

});

export default SignInScreen;

// Google multi-color G mark as SVG
function GoogleG({ size = 22 }: { size?: number }) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24">
      <Path d="M21.35 11.1h-9.18v2.98h5.26c-.23 1.36-1.6 3.98-5.26 3.98-3.17 0-5.75-2.62-5.75-5.86s2.58-5.86 5.75-5.86c1.8 0 3.01.77 3.7 1.43l2.52-2.43C16.8 3.97 14.83 3 12.17 3 6.98 3 2.77 7.26 2.77 12.2S6.98 21.4 12.17 21.4c6.86 0 9.33-4.81 9.33-7.77 0-.53-.06-.88-.15-1.53z" fill="#4285F4"/>
      <Path d="M3.65 8.62l2.45 1.8c.66-1.67 2.22-2.84 4.05-2.84 1.18 0 2.24.41 3.08 1.21l2.31-2.36C14.77 4.5 13.53 4 12.17 4 9.21 4 6.66 5.69 5.5 8.02z" fill="#EA4335"/>
      <Path d="M12.17 20.4c2.83 0 5.21-1.86 5.86-4.47l-2.86-2.22c-.76 2.29-2.79 3.29-5 3.29-2.43 0-4.49-1.64-5.23-3.86l-2.87 2.21c1.49 2.97 4.55 5.05 8.1 5.05z" fill="#34A853"/>
      <Path d="M3.65 15.35l2.87-2.21c-.19-.57-.29-1.18-.29-1.84 0-.64.1-1.26.29-1.83l-2.87-2.85C2.95 7.87 2.57 9.47 2.57 11.3c0 1.83.38 3.42 1.08 4.05z" fill="#FBBC05"/>
    </Svg>
  );
}


