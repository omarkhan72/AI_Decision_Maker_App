import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = { size: number };

function CheckIcon({ size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Circle cx="22" cy="22" r="22" fill="#2DB36C" opacity="0.25" />
      <Path d="M15 22.5L20 27.5L30 17.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

function CrossIcon({ size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Circle cx="22" cy="22" r="22" fill="#E74C3C" opacity="0.25" />
      <Path d="M16 16L28 28M28 16L16 28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}

function TrendIcon({ size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Circle cx="22" cy="22" r="22" fill="#4DA3FF" opacity="0.25" />
      <Path d="M14 26L21 19L25 23L31 17" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

function BulbIcon({ size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Circle cx="22" cy="22" r="22" fill="#F5C542" opacity="0.25" />
      <Path d="M22 14C18.6863 14 16 16.6863 16 20C16 22.3869 17.4239 24.428 19.5 25.409V27C19.5 27.8284 20.1716 28.5 21 28.5H23C23.8284 28.5 24.5 27.8284 24.5 27V25.409C26.5761 24.428 28 22.3869 28 20C28 16.6863 25.3137 14 22 14Z" fill="#F5C542" />
      <Path d="M20.5 30.5H23.5" stroke="#F5C542" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

type CardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

function FeatureCard({ icon, title, subtitle }: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>{icon}</View>
      <View style={styles.cardTextWrap}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

function AnalysisOverviewScreen() {
  const navigation = useNavigation();

  // Animated values
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(12)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(18)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;
  const cardsScale = useRef(new Animated.Value(0.96)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const ctaTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const ease = Easing.bezier(0.22, 0.61, 0.36, 1);
    Animated.stagger(140, [
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 600, easing: ease, useNativeDriver: true }),
        Animated.timing(titleTranslateY, { toValue: 0, duration: 600, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 650, easing: ease, useNativeDriver: true }),
        Animated.timing(subtitleTranslateY, { toValue: 0, duration: 650, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardsOpacity, { toValue: 1, duration: 550, easing: ease, useNativeDriver: true }),
        Animated.spring(cardsScale, { toValue: 1, friction: 7, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(ctaOpacity, { toValue: 1, duration: 520, easing: ease, useNativeDriver: true }),
        Animated.timing(ctaTranslateY, { toValue: 0, duration: 520, easing: ease, useNativeDriver: true }),
      ]),
    ]).start();
  }, [titleOpacity, titleTranslateY, subtitleOpacity, subtitleTranslateY, cardsOpacity, cardsScale, ctaOpacity, ctaTranslateY]);

  return (
    <LinearGradient
      colors={["#0C141A", "#0E2A38", "#58BFD9"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            {/* ✅ Fixed Title */}
            <Animated.Text
              style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }]}
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              Get instant pros, cons, outcomes & alternatives
            </Animated.Text>

            <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity, transform: [{ translateY: subtitleTranslateY }] }]}>
              Powered by advanced AI analysis for smarter choices
            </Animated.Text>
          </View>

          <Animated.View style={[styles.cards, { opacity: cardsOpacity, transform: [{ scale: cardsScale }] }]}>
            <FeatureCard
              icon={<CheckIcon size={44} />}
              title="Pros Analysis"
              subtitle="Identify key advantages and positive impacts"
            />
            <FeatureCard
              icon={<CrossIcon size={44} />}
              title="Cons Analysis"
              subtitle="Uncover potential challenges and drawbacks"
            />
            <FeatureCard
              icon={<TrendIcon size={44} />}
              title="Predicted Outcomes"
              subtitle="Forecast potential results and impacts"
            />
            <FeatureCard
              icon={<BulbIcon size={44} />}
              title="Smart Alternatives"
              subtitle="Explore different options and solutions"
            />
          </Animated.View>

          <Animated.View style={{ opacity: ctaOpacity, transform: [{ translateY: ctaTranslateY }] }}>
            <TouchableOpacity style={styles.ctaButton} activeOpacity={0.9} onPress={() => navigation.navigate('ConfidenceIntro' as never)}>
              <Text style={styles.ctaLabel}>Next</Text>
            </TouchableOpacity>
          </Animated.View>
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
    paddingVertical: '5%',
    paddingHorizontal: '6%',
  },
  header: {
    marginBottom: '5%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 42,
    textAlign: 'left',
  },
  subtitle: {
    color: '#C1CFDA',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    textAlign: 'left',
  },
  cards: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconWrap: {
    marginRight: 16,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#C1CFDA',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  ctaButton: {
    backgroundColor: '#FEB64D',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: '5%',
  },
  ctaLabel: {
    color: '#17313F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnalysisOverviewScreen;
