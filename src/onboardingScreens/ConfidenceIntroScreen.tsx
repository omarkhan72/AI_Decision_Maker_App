import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions, Animated, Easing, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

function HeroIllustration({ size }: { size: number }) {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const strokeDark = '#163440';
  const white = '#FFFFFF';

  // Helper scales
  const s = (n: number) => (n / 100) * size;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Main blue circle */}
      <Circle cx={cx} cy={cy} r={r} fill="#4DB1E3" />

      {/* Dark check mark */}
      <Path
        d={`M ${s(34)} ${s(54)} L ${s(46)} ${s(68)} L ${s(70)} ${s(40)}`}
        stroke={strokeDark}
        strokeWidth={size * 0.085}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top-left magnifier */}
      <Path
        d={`M ${s(22)} ${s(22)} m -${s(6)} 0 a ${s(6)} ${s(6)} 0 1 0 ${s(12)} 0 a ${s(6)} ${s(6)} 0 1 0 -${s(12)} 0`}
        fill="none"
        stroke={white}
        strokeWidth={size * 0.02}
      />
      <Path
        d={`M ${s(30)} ${s(30)} L ${s(34)} ${s(34)}`}
        stroke={white}
        strokeWidth={size * 0.02}
        strokeLinecap="round"
      />

      {/* Top-right light bulb */}
      <Path
        d={`M ${s(78)} ${s(18)}
           c -${s(3)} 0 -${s(6)} ${s(3)} -${s(6)} ${s(6)}
           c 0 ${s(2.2)} ${s(1.2)} ${s(4.2)} ${s(3)} ${s(5.4)}
           c ${s(0.8)} ${s(0.6)} ${s(1.2)} ${s(1.6)} ${s(1.2)} ${s(2.6)}
           h ${s(3.6)}
           c 0 -${s(1)} ${s(0.4)} -${s(2)} ${s(1.2)} -${s(2.6)}
           c ${s(1.8)} -${s(1.2)} ${s(3)} -${s(3.2)} ${s(3)} -${s(5.4)}
           c 0 -${s(3)} -${s(3)} -${s(6)} -${s(6)} -${s(6)} z`}
        fill={white}
      />
      <Path d={`M ${s(74)} ${s(34)} h ${s(8)}`} stroke={white} strokeWidth={size * 0.02} strokeLinecap="round" />

      {/* Bottom-left chart squiggle */}
      <Path
        d={`M ${s(25)} ${s(78)} L ${s(30)} ${s(72)} L ${s(36)} ${s(78)} L ${s(44)} ${s(68)}`}
        stroke={white}
        strokeWidth={size * 0.02}
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx={s(25)} cy={s(78)} r={size * 0.012} fill={white} />
      <Circle cx={s(30)} cy={s(72)} r={size * 0.012} fill={white} />
      <Circle cx={s(36)} cy={s(78)} r={size * 0.012} fill={white} />

      {/* Bottom-right small check badge */}
      <Circle cx={s(82)} cy={s(82)} r={s(8)} fill={white} />
      <Path d={`M ${s(78)} ${s(82)} L ${s(81)} ${s(85)} L ${s(87)} ${s(79)}`} stroke={strokeDark} strokeWidth={size * 0.02} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ConfidenceIntroScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  
  // Improved responsive scaling
  const isSmallScreen = width < 375;
  const isTablet = width > 768;
  const scale = isTablet ? Math.min(width / 768, 1.2) : Math.max(width / 375, 0.85);
  const vScale = Math.max(height / 812, 0.8);
  
  // Better hero size calculation for all screen sizes
  const heroSize = isTablet ? Math.min(width * 0.35, 300) : Math.min(width * 0.6, isSmallScreen ? 200 : 260);

  // Animated values
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(12)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(18)).current;
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.92)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const ctaTranslateY = useRef(new Animated.Value(20)).current;
  const ctaScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const ease = Easing.bezier(0.22, 0.61, 0.36, 1);
    Animated.stagger(140, [
      Animated.parallel([
        Animated.timing(heroOpacity, { toValue: 1, duration: 550, easing: ease, useNativeDriver: true }),
        Animated.spring(heroScale, { toValue: 1, friction: 7, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 600, easing: ease, useNativeDriver: true }),
        Animated.timing(titleTranslateY, { toValue: 0, duration: 600, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 650, easing: ease, useNativeDriver: true }),
        Animated.timing(subtitleTranslateY, { toValue: 0, duration: 650, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(ctaOpacity, { toValue: 1, duration: 520, easing: ease, useNativeDriver: true }),
        Animated.timing(ctaTranslateY, { toValue: 0, duration: 520, easing: ease, useNativeDriver: true }),
      ]),
    ]).start();
  }, [heroOpacity, heroScale, titleOpacity, titleTranslateY, subtitleOpacity, subtitleTranslateY, ctaOpacity, ctaTranslateY]);

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
        <Animated.View style={[styles.heroWrap, { opacity: heroOpacity, transform: [{ scale: heroScale }] }]}> 
          <HeroIllustration size={heroSize} />
        </Animated.View>

        <View style={[styles.textWrap, { paddingHorizontal: isTablet ? 48 : 24 }]}>
          <Animated.Text style={[styles.title, { 
            fontSize: Math.max(28 * scale, 24), 
            lineHeight: Math.max(36 * scale, 30), 
            opacity: titleOpacity, 
            transform: [{ translateY: titleTranslateY }] 
          }]}> 
            {"Move forward with\nclarity & confidence"}
          </Animated.Text>
          <Animated.Text style={[styles.subtitle, { 
            fontSize: Math.max(16 * scale, 14), 
            lineHeight: Math.max(22 * scale, 20), 
            opacity: subtitleOpacity, 
            transform: [{ translateY: subtitleTranslateY }] 
          }]}> 
            {"Your next decision, powered by AI\ninsight"}
          </Animated.Text>
        </View>

        <Animated.View style={{ 
          opacity: ctaOpacity, 
          transform: [{ translateY: ctaTranslateY }, { scale: ctaScale }],
          width: '100%',
          paddingHorizontal: 20
        }}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.ctaButton, { 
              paddingVertical: 0,
              width: '100%',
              maxWidth: isTablet ? 500 : 400
            }]}
            onPressIn={() => Animated.spring(ctaScale, { toValue: 0.98, useNativeDriver: true, friction: 7, tension: 80 }).start()}
            onPressOut={() => Animated.spring(ctaScale, { toValue: 1, useNativeDriver: true, friction: 7, tension: 80 }).start()}
            onPress={() => navigation.navigate('SignIn' as never)}
          > 
            <LinearGradient
              colors={["#63C6F1", "#3DA5DC"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={[styles.ctaGradient, { 
                paddingVertical: Math.max(18 * vScale, 16),
                paddingHorizontal: isTablet ? 50 : 40
              }]}
            >
              <Text style={[styles.ctaLabel, { fontSize: Math.max(18 * scale, 17) }]}>Let's Go</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom spacer to fill extra vertical space */}
        <View style={{ height: Math.max(60 * vScale, 40) }} />
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
    paddingTop: 36,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  heroWrap: {
    marginTop: 48,
    marginBottom: 24,
  },
  textWrap: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
    maxWidth: 600,
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'System',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'System',
  },
  ctaButton: {
    marginTop: 50,
    alignSelf: 'center',
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  ctaGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    paddingHorizontal: 32,
  },
  ctaLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.3,
    fontFamily: 'System',
  },
});

export default ConfidenceIntroScreen;


