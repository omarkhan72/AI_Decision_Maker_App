import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  rightContent: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, title, subtitle, onPress, rightContent }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
      <Icon name={icon} size={24} color="#4A8A9E" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>{subtitle}</Text>
    </View>
    {rightContent}
  </TouchableOpacity>
);

const SettingScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <LinearGradient colors={['#1D3A4E', '#4A8A9E']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.settingsList}>
        <SettingItem
          icon="account-outline"
          title="Account"
          subtitle="Manage your personal details and login info"
          rightContent={<Icon name="chevron-right" size={24} color="#FFFFFF" />}
        />
        <SettingItem
          icon="crown-outline"
          title="Subscription"
          subtitle="View and upgrade your plan"
          rightContent={<Icon name="chevron-right" size={24} color="#FFFFFF" />}
        />
        <SettingItem
          icon="translate"
          title="Language"
          subtitle="Choose your preferred language"
          rightContent={
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>English</Text>
              <Icon name="chevron-right" size={24} color="#FFFFFF" />
            </View>
          }
        />
        <SettingItem
          icon="moon-waning-crescent"
          title="Theme"
          subtitle="Switch between light and dark mode"
          rightContent={<Switch value={isDarkMode} onValueChange={setIsDarkMode} trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'} />}
        />
        <SettingItem
          icon="shield-check-outline"
          title="Privacy & Terms"
          subtitle="View our privacy policy and terms"
          rightContent={<Icon name="chevron-right" size={24} color="#FFFFFF" />}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>AI Life Decision Mapper © 2025</Text>
        <View style={styles.dragIndicator} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  settingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  itemSubtitle: {
    color: '#B0B0B0',
    fontSize: 14,
    marginTop: 2,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: '#FFFFFF',
    marginRight: 5,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 20,
  },
  dragIndicator: {
    width: 120,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2.5,
  },
});

export default SettingScreen;
