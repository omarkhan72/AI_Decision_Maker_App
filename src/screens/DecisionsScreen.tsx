import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const decisionData = [
  {
    id: '1',
    title: 'Career Path Decision',
    description: 'Choosing between software development and product management roles at different',
    timestamp: 'Today, 2:30 PM',
  },
  {
    id: '2',
    title: 'Investment Strategy',
    description: 'Deciding on portfolio allocation between stocks, bonds, and real estate. Researching market',
    timestamp: 'Yesterday, 4:15 PM',
  },
  {
    id: '3',
    title: 'Travel Planning',
    description: 'Selecting between European and Asian destinations for summer vacation. Comparing',
    timestamp: '2 days ago',
  },
  {
    id: '4',
    title: 'Health Goals',
    description: 'Setting fitness and nutrition targets for the quarter. Planning workout schedule and mea...',
    timestamp: '3 days ago',
  },
];

interface FilterChipProps {
  label: string;
  active?: boolean;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active }) => (
  <TouchableOpacity style={[styles.chip, active && styles.activeChip]}>
    <Text style={[styles.chipText, active && styles.activeChipText]}>{label}</Text>
  </TouchableOpacity>
);

interface DecisionCardProps {
  title: string;
  description: string;
  timestamp: string;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ title, description, timestamp }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardTimestamp}>{timestamp}</Text>
    </View>
    <Text style={styles.cardDescription}>{description}</Text>
    <View style={styles.cardDivider} />
    <View style={styles.cardActions}>
      <TouchableOpacity>
        <Icon name="pencil-outline" size={24} color="#5B6E79" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="eye-outline" size={24} color="#5B6E79" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="trash-can-outline" size={24} color="#5B6E79" />
      </TouchableOpacity>
    </View>
  </View>
);

const DecisionsScreen = ({ navigation }: { navigation: any }) => {
  return (
    <LinearGradient colors={['#1D3A4E', '#4A8A9E']} style={styles.flexOne}>
        <SafeAreaView style={styles.flexOne}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Icon name="lightbulb-on-outline" size={28} color="#66C8F2" />
                    <Text style={styles.headerTitle}>Decisions</Text>
                </View>
                                <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('Setting')}>
                    <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={styles.profileImage} />
                    <View style={styles.notificationBadge} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Icon name="magnify" size={22} color="#8E8E93" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search decisions..."
                    placeholderTextColor="#8E8E93"
                    style={styles.searchInput}
                />
            </View>

            <View style={styles.filtersContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FilterChip label="All" active />
                    <FilterChip label="Career" />
                    <FilterChip label="Finance" />
                    <FilterChip label="Personal" />
                    <FilterChip label="Health" />
                </ScrollView>
            </View>

            <FlatList
                data={decisionData}
                renderItem={({ item }) => <DecisionCard {...item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('DescribeScreen')}>
                <Icon name="plus" size={28} color="#FFFFFF" />
            </TouchableOpacity>
        </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  profileContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#1D3A4E',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#000000',
    fontSize: 16,
  },
  filtersContainer: {
    paddingVertical: 16,
    paddingLeft: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: '#66C8F2',
  },
  chipText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  activeChipText: {
    color: '#1D3A4E',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Space for FAB
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2B33',
    flex: 1,
  },
  cardTimestamp: {
    fontSize: 12,
    color: '#5B6E79',
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#5B6E79',
    lineHeight: 20,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEB64D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default DecisionsScreen;
