import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, FlatList, StatusBar, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const initialDecisionData = [
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
  id: string;
  title: string;
  description: string;
  timestamp: string;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ id, title, description, timestamp, onEdit, onView, onDelete }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardTimestamp}>{timestamp}</Text>
    </View>
    <Text style={styles.cardDescription}>{description}</Text>
    <View style={styles.cardDivider} />
    <View style={styles.cardActions}>
      <TouchableOpacity onPress={() => onEdit(id)} style={styles.actionButton}>
        <Icon name="pencil-outline" size={24} color="#5B6E79" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onView(id)} style={styles.actionButton}>
        <Icon name="eye-outline" size={24} color="#5B6E79" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(id)} style={styles.actionButton}>
        <Icon name="trash-can-outline" size={24} color="#5B6E79" />
      </TouchableOpacity>
    </View>
  </View>
);

const DecisionsScreen = ({ navigation }: { navigation: any }) => {
  const [decisions, setDecisions] = useState(initialDecisionData);

  // Handler functions for card actions
  const handleEdit = (id: string) => {
    const decision = decisions.find(d => d.id === id);
    if (decision) {
      // Navigate to edit screen with decision data
      navigation.navigate('DescribeScreen', { editMode: true, decisionData: decision });
    }
  };

  const handleView = (id: string) => {
    const decision = decisions.find(d => d.id === id);
    if (decision) {
      // Navigate to analysis screen to view the decision
      navigation.navigate('Analysis', { decisionId: id, decisionData: decision });
    }
  };

  const handleDelete = (id: string) => {
    // Remove decision from the list
    setDecisions(prevDecisions => prevDecisions.filter(d => d.id !== id));
  };
  // Animated values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-20)).current;
  const searchOpacity = useRef(new Animated.Value(0)).current;
  const searchTranslateY = useRef(new Animated.Value(20)).current;
  const filtersOpacity = useRef(new Animated.Value(0)).current;
  const filtersTranslateX = useRef(new Animated.Value(-30)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;
  const cardsScale = useRef(new Animated.Value(0.95)).current;
  const fabOpacity = useRef(new Animated.Value(0)).current;
  const fabScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const ease = Easing.bezier(0.22, 0.61, 0.36, 1);
    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 600, easing: ease, useNativeDriver: true }),
        Animated.timing(headerTranslateY, { toValue: 0, duration: 600, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(searchOpacity, { toValue: 1, duration: 550, easing: ease, useNativeDriver: true }),
        Animated.timing(searchTranslateY, { toValue: 0, duration: 550, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(filtersOpacity, { toValue: 1, duration: 500, easing: ease, useNativeDriver: true }),
        Animated.timing(filtersTranslateX, { toValue: 0, duration: 500, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardsOpacity, { toValue: 1, duration: 650, easing: ease, useNativeDriver: true }),
        Animated.spring(cardsScale, { toValue: 1, friction: 7, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fabOpacity, { toValue: 1, duration: 400, easing: ease, useNativeDriver: true }),
        Animated.spring(fabScale, { toValue: 1, friction: 6, tension: 60, useNativeDriver: true }),
      ]),
    ]).start();
  }, [headerOpacity, headerTranslateY, searchOpacity, searchTranslateY, filtersOpacity, filtersTranslateX, cardsOpacity, cardsScale, fabOpacity, fabScale]);

  return (
    <LinearGradient colors={['#1D3A4E', '#4A8A9E']} style={styles.flexOne}>
        <SafeAreaView style={styles.flexOne}>
            <StatusBar barStyle="light-content" />
            <Animated.View style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] }]}>
                <View style={styles.headerTitleContainer}>
                    <Icon name="lightbulb-on-outline" size={28} color="#66C8F2" />
                    <Text style={styles.headerTitle}>Decisions</Text>
                </View>
                                <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('Setting')}>
                    <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={styles.profileImage} />
                    <View style={styles.notificationBadge} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.searchContainer, { opacity: searchOpacity, transform: [{ translateY: searchTranslateY }] }]}>
                <Icon name="magnify" size={22} color="#8E8E93" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search decisions..."
                    placeholderTextColor="#8E8E93"
                    style={styles.searchInput}
                />
            </Animated.View>

            <Animated.View style={[styles.filtersContainer, { opacity: filtersOpacity, transform: [{ translateX: filtersTranslateX }] }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FilterChip label="All" active />
                    <FilterChip label="Career" />
                    <FilterChip label="Finance" />
                    <FilterChip label="Personal" />
                    <FilterChip label="Health" />
                </ScrollView>
            </Animated.View>

            <Animated.View style={{ opacity: cardsOpacity, transform: [{ scale: cardsScale }], flex: 1 }}>
                <FlatList
                    data={decisions}
                    renderItem={({ item }) => (
                      <DecisionCard
                        {...item}
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                      />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </Animated.View>

            <Animated.View style={{ opacity: fabOpacity, transform: [{ scale: fabScale }] }}>
                <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('DescribeScreen')}>
                    <Icon name="plus" size={28} color="#FFFFFF" />
                </TouchableOpacity>
            </Animated.View>
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
    paddingTop: 31,
    paddingBottom: 15,
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
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
});

export default DecisionsScreen;
