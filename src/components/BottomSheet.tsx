import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = screenHeight * 0.85;
const BACKDROP_OPACITY = 0.5;

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

interface BottomSheetProps {
  onClose?: () => void;
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ onClose }, ref) => {
    const translateY = useRef(new Animated.Value(BOTTOM_SHEET_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
      open: () => {
        console.log('BottomSheet opening...');
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            damping: 15,
            stiffness: 150,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: BACKDROP_OPACITY,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      },
      close: () => {
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: BOTTOM_SHEET_HEIGHT,
            damping: 50,
            stiffness: 300,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (onClose) {
            onClose();
          }
        });
      },
    }));

    const handleBackdropPress = () => {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: BOTTOM_SHEET_HEIGHT,
          damping: 50,
          stiffness: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onClose) {
          onClose();
        }
      });
    };

    return (
      <View style={styles.container} pointerEvents="box-none">
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY }] }]}>
            <LinearGradient
              colors={['#1D3A4E', '#2B5A73', '#4A8A9E']}
              locations={[0, 0.5, 1]}
              style={styles.gradientContainer}
            >
              {/* Drag Indicator */}
              <View style={styles.dragIndicator} />

              {/* Logo */}
              <View style={styles.logoContainer}>
                <View style={styles.logoGrid}>
                  <View style={[styles.logoSquare, styles.logoSquareTopLeft]} />
                  <View style={[styles.logoSquare, styles.logoSquareTopRight]} />
                  <View style={[styles.logoSquare, styles.logoSquareBottomLeft]} />
                  <View style={[styles.logoSquare, styles.logoSquareBottomRight]} />
                </View>
              </View>

              {/* Title */}
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>Go Pro — Smarter</Text>
                <Text style={styles.subtitle}>Decisions, Unlimited</Text>
              </View>

              {/* Feature Cards */}
              <View style={styles.featuresContainer}>
                <View style={styles.featuresRow}>
                  <View style={styles.featureCard}>
                    <View style={styles.featureIconContainer}>
                      <Icon name="infinity" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.featureTitle}>Unlimited AI Decisions</Text>
                    <Text style={styles.featureDescription}>No limits, every decision analyzed</Text>
                  </View>
                  <View style={styles.featureCard}>
                    <View style={styles.featureIconContainer}>
                      <Icon name="chart-line" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.featureTitle}>Deep-Dive Analysis</Text>
                    <Text style={styles.featureDescription}>Explore all possible outcomes</Text>
                  </View>
                </View>
                <View style={styles.featuresRow}>
                  <View style={styles.featureCard}>
                    <View style={styles.featureIconContainer}>
                      <Icon name="file-document-outline" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.featureTitle}>Export as PDF</Text>
                    <Text style={styles.featureDescription}>Share or save instantly</Text>
                  </View>
                  <View style={styles.featureCard}>
                    <View style={styles.featureIconContainer}>
                      <Icon name="flash" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.featureTitle}>Priority AI Speed</Text>
                    <Text style={styles.featureDescription}>Get faster results first</Text>
                  </View>
                </View>
              </View>

              {/* Plan Selection */}
              <View style={styles.planContainer}>
                <View style={styles.planButtons}>
                  <TouchableOpacity style={[styles.planButton, styles.planButtonActive]}>
                    <Text style={[styles.planButtonText, styles.planButtonTextActive]}>
                      Monthly
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.planButton, styles.yearlyButton]}>
                    <Text style={styles.planButtonText}>Yearly</Text>
                    <View style={styles.saveBadge}>
                      <Text style={styles.saveBadgeText}>Save 30%</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Price */}
              <View style={styles.priceContainer}>
                <Text style={styles.priceAmount}>$9.99</Text>
                <Text style={styles.pricePeriod}>/month</Text>
              </View>

              {/* Upgrade Button */}
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footer}>
               
              </View>
            </LinearGradient>
          </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_SHEET_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  gradientContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoGrid: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  logoSquare: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    margin: 3,
    borderRadius: 6,
  },
  logoSquareTopLeft: {
    borderRadius: 8,
  },
  logoSquareTopRight: {
    borderRadius: 8,
  },
  logoSquareBottomLeft: {
    borderRadius: 8,
  },
  logoSquareBottomRight: {
    borderRadius: 8,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
  featuresContainer: {
    marginBottom: 36,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    width: (screenWidth - 60) / 2,
    minHeight: 80,
  },
  featureIconContainer: {
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 3,
    lineHeight: 16,
  },
  featureDescription: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 13,
  },
  planContainer: {
    marginBottom: 36,
  },
  planButtons: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 3,
  },
  planButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 7,
    alignItems: 'center',
    position: 'relative',
  },
  planButtonActive: {
    backgroundColor: '#FEB64D',
  },
  planButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  planButtonTextActive: {
    color: '#1D3A4E',
    fontWeight: '700',
  },
  yearlyButton: {
    position: 'relative',
  },
  saveBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FEB64D',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  saveBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1D3A4E',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 24,
  },
  priceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 42,
  },
  pricePeriod: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 3,
  },
  upgradeButton: {
    backgroundColor: '#FEB64D',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D3A4E',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 13,
  },
});

export default BottomSheet;
