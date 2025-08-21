import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Path, G } from 'react-native-svg';

type IconProps = { size: number };

function CheckIcon({ size }: IconProps) {
  const r = size / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={r} cy={r} r={r} fill="#2DB36C" opacity={0.25} />
      <Path d={`M ${size * 0.3} ${size * 0.52} L ${size * 0.45} ${size * 0.67} L ${size * 0.75} ${size * 0.35}`} stroke="#2DB36C" strokeWidth={size * 0.12} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

function CrossIcon({ size }: IconProps) {
  const r = size / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={r} cy={r} r={r} fill="#E74C3C" opacity={0.25} />
      <Path d={`M ${size * 0.32} ${size * 0.32} L ${size * 0.68} ${size * 0.68}`} stroke="#E74C3C" strokeWidth={size * 0.12} strokeLinecap="round" />
      <Path d={`M ${size * 0.68} ${size * 0.32} L ${size * 0.32} ${size * 0.68}`} stroke="#E74C3C" strokeWidth={size * 0.12} strokeLinecap="round" />
    </Svg>
  );
}

function TrendIcon({ size }: IconProps) {
  const r = size / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={r} cy={r} r={r} fill="#4DA3FF" opacity={0.25} />
      <Path d={`M ${size * 0.28} ${size * 0.6} L ${size * 0.48} ${size * 0.44} L ${size * 0.6} ${size * 0.54} L ${size * 0.76} ${size * 0.34}`} stroke="#4DA3FF" strokeWidth={size * 0.12} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

function BulbIcon({ size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G opacity={0.25}>
        <Circle cx="12" cy="12" r="12" fill="#F5C542" />
      </G>
      <Path d="M12 6c-2.5 0-4.5 2-4.5 4.5 0 1.5.8 2.8 2 3.6.5.4 1 1.1 1 1.9h3c0-.8.5-1.5 1-1.9 1.2-.8 2-2.1 2-3.6C16.5 8 14.5 6 12 6z" fill="#F5C542" stroke="#B98E25" strokeWidth="0.6" />
      <Path d="M9.5 17h5" stroke="#B98E25" strokeWidth="1.2" strokeLinecap="round" />
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
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);

  return (
    <LinearGradient
      colors={["#0C141A", "#0E2A38", "#58BFD9"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: 36 * scale, lineHeight: 42 * scale }]}>
            {"Get instant pros, cons,\noutcomes & alternatives"}
          </Text>
          <Text style={[styles.subtitle, { fontSize: 18 * scale }]}>
            Powered by advanced AI analysis for smarter choices
          </Text>
        </View>

        <View style={styles.cards}>
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
        </View>

        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.9} onPress={() => navigation.navigate('ConfidenceIntro' as never)}>
          <Text style={styles.ctaLabel}>Next</Text>
        </TouchableOpacity>

     
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  subtitle: {
    color: '#C1CFDA',
    marginTop: 14,
    lineHeight: 24,
  },
  cards: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  iconWrap: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#C1CFDA',
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
  },
  ctaButton: {
    marginTop: 24,
    marginHorizontal: 20,
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

});

export default AnalysisOverviewScreen;


