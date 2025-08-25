import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet, { BottomSheetRef } from '../components/BottomSheet';

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
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  
  // Animation values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-30)).current;
  const accountOpacity = useRef(new Animated.Value(0)).current;
  const accountTranslateX = useRef(new Animated.Value(-20)).current;
  const subscriptionOpacity = useRef(new Animated.Value(0)).current;
  const subscriptionTranslateX = useRef(new Animated.Value(20)).current;
  const languageOpacity = useRef(new Animated.Value(0)).current;
  const languageScale = useRef(new Animated.Value(0.95)).current;
  const themeOpacity = useRef(new Animated.Value(0)).current;
  const themeScale = useRef(new Animated.Value(0.95)).current;
  const privacyOpacity = useRef(new Animated.Value(0)).current;
  const privacyTranslateX = useRef(new Animated.Value(-20)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const ease = Easing.bezier(0.22, 0.61, 0.36, 1);
    Animated.stagger(100, [
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 500, easing: ease, useNativeDriver: true }),
        Animated.timing(headerTranslateY, { toValue: 0, duration: 500, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(accountOpacity, { toValue: 1, duration: 450, easing: ease, useNativeDriver: true }),
        Animated.timing(accountTranslateX, { toValue: 0, duration: 450, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subscriptionOpacity, { toValue: 1, duration: 450, easing: ease, useNativeDriver: true }),
        Animated.timing(subscriptionTranslateX, { toValue: 0, duration: 450, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(languageOpacity, { toValue: 1, duration: 500, easing: ease, useNativeDriver: true }),
        Animated.timing(languageScale, { toValue: 1, duration: 500, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(themeOpacity, { toValue: 1, duration: 500, easing: ease, useNativeDriver: true }),
        Animated.timing(themeScale, { toValue: 1, duration: 500, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(privacyOpacity, { toValue: 1, duration: 450, easing: ease, useNativeDriver: true }),
        Animated.timing(privacyTranslateX, { toValue: 0, duration: 450, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(footerOpacity, { toValue: 1, duration: 400, easing: ease, useNativeDriver: true }),
        Animated.timing(footerTranslateY, { toValue: 0, duration: 400, easing: ease, useNativeDriver: true }),
      ]),
    ]).start();
  }, [
    headerOpacity,
    headerTranslateY,
    accountOpacity,
    accountTranslateX,
    subscriptionOpacity,
    subscriptionTranslateX,
    languageOpacity,
    languageScale,
    themeOpacity,
    themeScale,
    privacyOpacity,
    privacyTranslateX,
    footerOpacity,
    footerTranslateY,
  ]);

  return (
    <LinearGradient colors={['#1D3A4E', '#4A8A9E']} style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 30 }} />
      </Animated.View>

      <View style={styles.settingsList}>
        <Animated.View style={{ opacity: accountOpacity, transform: [{ translateX: accountTranslateX }] }}>
          <SettingItem
            icon="account-outline"
            title="Account"
            subtitle="Manage your personal details and login info"
            rightContent={<Icon name="chevron-right" size={24} color="#FFFFFF" />}
          />
        </Animated.View>
        <Animated.View style={{ opacity: subscriptionOpacity, transform: [{ translateX: subscriptionTranslateX }] }}>
          <SettingItem
            icon="crown-outline"
            title="Subscription"
            subtitle="View and upgrade your plan"
            onPress={() => {
              console.log('Subscription pressed');
              setShowBottomSheet(true);
              setTimeout(() => {
                bottomSheetRef.current?.open();
              }, 100);
            }}
            rightContent={<Icon name="chevron-right" size={24} color="#FFFFFF" />}
          />
        </Animated.View>
        <Animated.View style={{ opacity: languageOpacity, transform: [{ scale: languageScale }] }}>
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
        </Animated.View>
        <Animated.View style={{ opacity: themeOpacity, transform: [{ scale: themeScale }] }}>
          <SettingItem
            icon="moon-waning-crescent"
            title="Theme"
            subtitle="Switch between light and dark mode"
            rightContent={<Switch value={isDarkMode} onValueChange={setIsDarkMode} trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'} />}
          />
        </Animated.View>
        <Animated.View style={{ opacity: privacyOpacity, transform: [{ translateX: privacyTranslateX }] }}>
          <SettingItem
            icon="shield-check-outline"
            title="Privacy & Terms"
            subtitle="View our privacy policy and terms"
            rightContent={<Icon name="chevron-right" size={24} color="#FFFFFF" />}
          />
        </Animated.View>
      </View>

      <Animated.View style={[styles.footer, { opacity: footerOpacity, transform: [{ translateY: footerTranslateY }] }]}>
        <Text style={styles.footerText}>AI Life Decision Mapper © 2025</Text>
      </Animated.View>

      {showBottomSheet && (
        <BottomSheet
          ref={bottomSheetRef}
          onClose={() => setShowBottomSheet(false)}
        />
      )}
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

});

export default SettingScreen;
