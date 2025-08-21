import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';

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
  const scale = Math.min(width / 375, 1);
  const vScale = Math.min(height / 812, 1);

  const heroSize = Math.min(width * 0.55, 260);

  return (
    <LinearGradient colors={["#0D1013", "#103643", "#54B7DB"]} locations={[0, 0.55, 1]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <HeroIllustration size={heroSize} />
        </View>

        <View style={styles.textWrap}>
          <Text style={[styles.title, { fontSize: 36 * scale, lineHeight: 44 * scale }]}>
            {"Move forward with\nclarity & confidence"}
          </Text>
          <Text style={[styles.subtitle, { fontSize: 18 * scale, lineHeight: 26 * scale }]}>
            {"Your next decision, powered by AI\ninsight"}
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.9} style={[styles.ctaButton, { paddingVertical: 16 * vScale }]} onPress={() => navigation.navigate('SignIn' as never)}> 
          <Text style={[styles.ctaLabel, { fontSize: 18 * scale }]}>Let's Go</Text>
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
    paddingTop: 28,
    paddingBottom: 32,
    alignItems: 'center',
  },
  heroWrap: {
    marginTop: 40,
  },
  textWrap: {
    marginTop: 28,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '800',
  },
  subtitle: {
    color: '#C1CFDA',
    marginTop: 14,
    textAlign: 'center',
  },
  ctaButton: {
    marginTop: 36,
    marginHorizontal: 20,
    alignSelf: 'stretch',
    backgroundColor: '#55B5DD',
    borderRadius: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaLabel: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  

});

export default ConfidenceIntroScreen;


