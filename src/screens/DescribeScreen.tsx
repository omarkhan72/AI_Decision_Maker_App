import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Switch, Animated, Easing } from 'react-native';
import Slider from '@react-native-community/slider';

const DescribeScreen = () => {
  const navigation = useNavigation();
  const [decisionTitle, setDecisionTitle] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [category, setCategory] = useState('Financial');
  const [priority, setPriority] = useState('Medium');
  const [options, setOptions] = useState(['Job A', 'Job B']);
  const [newOption, setNewOption] = useState('');

  // Animated values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-30)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(40)).current;
  const titleInputOpacity = useRef(new Animated.Value(0)).current;
  const titleInputTranslateX = useRef(new Animated.Value(-20)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const descriptionTranslateX = useRef(new Animated.Value(20)).current;
  const categoryOpacity = useRef(new Animated.Value(0)).current;
  const categoryScale = useRef(new Animated.Value(0.95)).current;
  const priorityOpacity = useRef(new Animated.Value(0)).current;
  const priorityTranslateY = useRef(new Animated.Value(15)).current;
  const optionsOpacity = useRef(new Animated.Value(0)).current;
  const optionsScale = useRef(new Animated.Value(0.9)).current;
  const factorsOpacity = useRef(new Animated.Value(0)).current;
  const factorsTranslateX = useRef(new Animated.Value(-25)).current;
  const sliderOpacity = useRef(new Animated.Value(0)).current;
  const sliderTranslateY = useRef(new Animated.Value(20)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsScale = useRef(new Animated.Value(0.85)).current;
    type ImportantFactors = {
    cost: boolean;
    time: boolean;
    risk: boolean;
    emotionalImpact: boolean;
    skillsNeeded: boolean;
  };

  const [importantFactors, setImportantFactors] = useState<ImportantFactors>({
    cost: true,
    time: true,
    risk: false,
    emotionalImpact: false,
    skillsNeeded: false,
  });
  const [outcomeImportance, setOutcomeImportance] = useState(50);

  useEffect(() => {
    const ease = Easing.bezier(0.22, 0.61, 0.36, 1);
    Animated.stagger(100, [
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 500, easing: ease, useNativeDriver: true }),
        Animated.timing(headerTranslateY, { toValue: 0, duration: 500, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(formOpacity, { toValue: 1, duration: 600, easing: ease, useNativeDriver: true }),
        Animated.timing(formTranslateY, { toValue: 0, duration: 600, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(titleInputOpacity, { toValue: 1, duration: 450, easing: ease, useNativeDriver: true }),
        Animated.timing(titleInputTranslateX, { toValue: 0, duration: 450, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(descriptionOpacity, { toValue: 1, duration: 450, easing: ease, useNativeDriver: true }),
        Animated.timing(descriptionTranslateX, { toValue: 0, duration: 450, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(categoryOpacity, { toValue: 1, duration: 500, easing: ease, useNativeDriver: true }),
        Animated.spring(categoryScale, { toValue: 1, friction: 8, tension: 60, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(priorityOpacity, { toValue: 1, duration: 450, easing: ease, useNativeDriver: true }),
        Animated.timing(priorityTranslateY, { toValue: 0, duration: 450, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(optionsOpacity, { toValue: 1, duration: 500, easing: ease, useNativeDriver: true }),
        Animated.spring(optionsScale, { toValue: 1, friction: 7, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(factorsOpacity, { toValue: 1, duration: 450, easing: ease, useNativeDriver: true }),
        Animated.timing(factorsTranslateX, { toValue: 0, duration: 450, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(sliderOpacity, { toValue: 1, duration: 400, easing: ease, useNativeDriver: true }),
        Animated.timing(sliderTranslateY, { toValue: 0, duration: 400, easing: ease, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(buttonsOpacity, { toValue: 1, duration: 550, easing: ease, useNativeDriver: true }),
        Animated.spring(buttonsScale, { toValue: 1, friction: 6, tension: 70, useNativeDriver: true }),
      ]),
    ]).start();
  }, [headerOpacity, headerTranslateY, formOpacity, formTranslateY, titleInputOpacity, titleInputTranslateX, descriptionOpacity, descriptionTranslateX, categoryOpacity, categoryScale, priorityOpacity, priorityTranslateY, optionsOpacity, optionsScale, factorsOpacity, factorsTranslateX, sliderOpacity, sliderTranslateY, buttonsOpacity, buttonsScale]);

    const toggleFactor = (factor: keyof ImportantFactors) => {
    setImportantFactors(prev => ({ ...prev, [factor]: !prev[factor] }));
  };

    const removeOption = (index: number) => {
    setOptions(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Describe Your Decision</Text>
      </Animated.View>
      <Animated.ScrollView style={[styles.formContainer, { opacity: formOpacity, transform: [{ translateY: formTranslateY }] }]}>
        <Animated.View style={{ opacity: titleInputOpacity, transform: [{ translateX: titleInputTranslateX }] }}>
          <Text style={styles.label}>Decision Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title your decision in a few words..."
            placeholderTextColor="#B0B0B0"
            value={decisionTitle}
            onChangeText={setDecisionTitle}
          />
        </Animated.View>

        <Animated.View style={{ opacity: descriptionOpacity, transform: [{ translateX: descriptionTranslateX }] }}>
          <Text style={styles.label}>Detailed Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Type your decision here..."
            placeholderTextColor="#B0B0B0"
            multiline
            value={detailedDescription}
            onChangeText={setDetailedDescription}
          />
        </Animated.View>

        <Animated.View style={{ opacity: categoryOpacity, transform: [{ scale: categoryScale }] }}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {['Financial', 'Career', 'Personal'].map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, category === item && styles.chipSelected]}
                onPress={() => setCategory(item)}
              >
                <Text style={[styles.chipText, category === item && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: priorityOpacity, transform: [{ translateY: priorityTranslateY }] }}>
          <Text style={styles.label}>Priority Level</Text>
          <View style={styles.priorityContainer}>
            {['Low', 'Medium', 'High'].map(level => (
              <TouchableOpacity
                key={level}
                style={[styles.priorityButton, priority === level && styles.priorityButtonSelected]}
                onPress={() => setPriority(level)}
              >
                <Text style={[styles.priorityButtonText, priority === level && styles.priorityButtonTextSelected]}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: priorityOpacity, transform: [{ translateY: priorityTranslateY }] }}>
          <Text style={styles.label}>When do you need to decide?</Text>
          <View style={styles.dateContainer}>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateText}>yyyy / mm / dd</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateText}>yyyy / mm / dd</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: optionsOpacity, transform: [{ scale: optionsScale }] }}>
          <Text style={styles.label}>Possible Options</Text>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <View key={index} style={styles.optionChip}>
                <Text style={styles.optionChipText}>{option}</Text>
                <TouchableOpacity onPress={() => removeOption(index)}>
                  <Text style={styles.optionChipRemove}>x</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity>
            <Text style={styles.addOptionText}>+ Add Option</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ opacity: factorsOpacity, transform: [{ translateX: factorsTranslateX }] }}>
          <Text style={styles.label}>Important Factors</Text>
          <View style={styles.factorsContainer}>
                        {(Object.keys(importantFactors) as Array<keyof ImportantFactors>).map(factor => (
              <View key={factor} style={styles.factorRow}>
                <Switch
                  value={importantFactors[factor]}
                  onValueChange={() => toggleFactor(factor)}
                  trackColor={{ false: "#E0E0E0", true: "#34C759" }}
                  thumbColor={"#FFFFFF"}
                />
                <Text style={styles.factorText}>{factor.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: sliderOpacity, transform: [{ translateY: sliderTranslateY }] }}>
          <Text style={styles.label}>How important is the outcome?</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={outcomeImportance}
            onValueChange={setOutcomeImportance}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#FFB800"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>Low</Text>
            <Text style={styles.sliderLabel}>Critical</Text>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: buttonsOpacity, transform: [{ scale: buttonsScale }] }}>
          <TouchableOpacity style={styles.analyzeButton} onPress={() => navigation.navigate('Analysis' as never)}>
            <Text style={styles.analyzeButtonText}>Analyze with AI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Form</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#000000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
  },
  chipSelected: {
    backgroundColor: '#FFB800',
  },
  chipText: {
    fontSize: 14,
    color: '#000000',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  priorityContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 5,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  priorityButtonSelected: {
    backgroundColor: '#007AFF',
  },
  priorityButtonText: {
    fontSize: 16,
    color: '#8A8A8E',
  },
  priorityButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  dateText: {
    color: '#B0B0B0',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  optionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  optionChipText: {
    color: '#007AFF',
  },
  optionChipRemove: {
    marginLeft: 5,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  addOptionText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  factorsContainer: {},
  factorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  factorText: {
    marginLeft: 10,
    fontSize: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sliderLabel: {
    color: '#8A8A8E',
  },
  analyzeButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 40,
  },
  clearButtonText: {
    color: '#8A8A8E',
    fontSize: 18,
  },
});

export default DescribeScreen;
