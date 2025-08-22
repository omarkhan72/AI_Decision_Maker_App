import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const analysisData = {
  pros: [
    'Increased productivity and efficiency',
    'Better resource allocation',
    'Improved team collaboration',
  ],
  cons: [
    'Higher initial investment required',
    'Steep learning curve',
    'Integration with existing systems',
  ],
  outcomes: [
    'Successful implementation within 3 months',
    'ROI within 6 months',
    'Positive team feedback',
  ],
  alternatives: [
    'Phased implementation approach',
    'Outsourced solution',
    'Hybrid cloud deployment',
  ],
  questions: [
    'What are the resource requirements?',
    'How will this impact existing processes?',
    'What\'s the long-term maintenance plan?',
  ],
};

interface InfoCardProps {
  title: string;
  items: string[];
  icon?: string;
  iconColor?: string;
  iconBgColor?: string;
  numbered?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items, icon, iconColor, iconBgColor, numbered }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {items.map((item, index) => (
      <View key={index} style={styles.itemRow}>
        {numbered ? (
          <View style={[styles.iconContainer, { backgroundColor: '#FFF' }]}>
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>
        ) : (
          <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
            {icon && <Icon name={icon} size={16} color={iconColor} />}
          </View>
        )}
        <Text style={styles.itemText}>{item}</Text>
      </View>
    ))}
  </View>
);

const AnalysisScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#1D3A4E', '#4A8A9E']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Your Decision Analysis</Text>

        <InfoCard
          title="PROS"
          items={analysisData.pros}
          icon="check"
          iconColor="#FFFFFF"
          iconBgColor="#34C759"
        />
        <InfoCard
          title="CONS"
          items={analysisData.cons}
          icon="minus"
          iconColor="#FFFFFF"
          iconBgColor="#FF3B30"
        />
        <InfoCard
          title="POTENTIAL OUTCOMES"
          items={analysisData.outcomes}
          icon="arrow-right"
          iconColor="#FFFFFF"
          iconBgColor="#007AFF"
        />
        <InfoCard
          title="ALTERNATIVES"
          items={analysisData.alternatives}
          icon="swap-horizontal"
          iconColor="#FFFFFF"
          iconBgColor="#5856D6"
        />
                <TouchableOpacity onPress={() => navigation.navigate('Assistant' as never)}>
          <InfoCard
            title="KEY QUESTIONS"
            items={analysisData.questions}
            numbered
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.pdfButton}>
          <Icon name="file-pdf-box" size={24} color="#FFFFFF" />
          <Text style={styles.pdfButtonText}>Save as PDF</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFB800',
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  numberText: {
    color: '#1D3A4E',
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  pdfButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pdfButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AnalysisScreen;
