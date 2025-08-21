import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Rect, Circle } from 'react-native-svg';

function DescribeDecisionScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const vScale = Math.min(height / 812, 1);
  return (
    <LinearGradient
      colors={["#0E1215", "#0E2A38", "#57BBD7"]}
      locations={[0, 0.55, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: 40 * scale, lineHeight: 48 * scale }]}>{"Describe your\ndecision — AI will\nbreak it down"}</Text>
          <Text style={[styles.subtitle, { fontSize: 18 * scale, lineHeight: 26 * scale }]}>{"Turn your thoughts into structured, AI-powered insights in seconds"}</Text>
        </View>

        <View style={styles.cardWrapper}>
          <Svg width={Math.min(360, width - 48)} height={300 * vScale} viewBox="0 0 360 320">
          <Rect x={20} y={20} rx={28} ry={28} width={320} height={280} stroke="#8BB8CC" opacity={0.4} strokeWidth={2} fill="rgba(255,255,255,0.04)" />
          <Rect x={60} y={60} rx={24} ry={24} width={240} height={200} stroke="#8BB8CC" opacity={0.6} strokeWidth={2} fill="rgba(255,255,255,0.05)" />
          <Circle cx={92} cy={96} r={6} fill="#F8B64C" />
          <Circle cx={258} cy={140} r={6} fill="#7CC7F5" />
          <Circle cx={232} cy={182} r={6} fill="#7CC7F5" />
          <Circle cx={140} cy={228} r={6} fill="#F8B64C" />
          </Svg>
          <View style={styles.cardTextOverlay}>
            <Text style={[styles.cardText, { fontSize: 26 * scale, lineHeight: 34 * scale }]}>{"Should I\nchange my\ncareer path?"}</Text>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { paddingVertical: 16 * vScale, fontSize: 16 * scale }]}
            placeholder="Type your decision here..."
            placeholderTextColor="#B7C7D1"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.ctaButton, { paddingVertical: 16 * vScale }]}
          onPress={() => navigation.navigate('AnalysisOverview' as never)}
        >
          <Text style={[styles.ctaLabel, { fontSize: 18 * scale }]}>Next</Text>
        </TouchableOpacity>

   
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '800',
    lineHeight: 52,
  },
  subtitle: {
    color: '#C1CFDA',
    fontSize: 20,
    lineHeight: 28,
    marginTop: 18,
  },
  cardWrapper: {
    alignItems: 'center',
    marginTop: 36,
  },
  cardTextOverlay: {
    position: 'absolute',
    top: 118,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cardText: {
    color: '#EAF6FB',
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
    opacity: 0.9,
  },
  inputWrapper: {
    marginTop: 36,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
    color: '#FFFFFF',
    fontSize: 18,
  },
  ctaButton: {
    marginTop: 28,
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

export default DescribeDecisionScreen;


