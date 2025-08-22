import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import Slider from '@react-native-community/slider';

const DescribeScreen = () => {
  const navigation = useNavigation();
  const [decisionTitle, setDecisionTitle] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [category, setCategory] = useState('Financial');
  const [priority, setPriority] = useState('Medium');
  const [options, setOptions] = useState(['Job A', 'Job B']);
  const [newOption, setNewOption] = useState('');
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

    const toggleFactor = (factor: keyof ImportantFactors) => {
    setImportantFactors(prev => ({ ...prev, [factor]: !prev[factor] }));
  };

    const removeOption = (index: number) => {
    setOptions(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Describe Your Decision</Text>
      </View>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Decision Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Title your decision in a few words..."
          placeholderTextColor="#B0B0B0"
          value={decisionTitle}
          onChangeText={setDecisionTitle}
        />

        <Text style={styles.label}>Detailed Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Type your decision here..."
          placeholderTextColor="#B0B0B0"
          multiline
          value={detailedDescription}
          onChangeText={setDetailedDescription}
        />

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

        <Text style={styles.label}>When do you need to decide?</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.dateInput}>
            <Text style={styles.dateText}>yyyy / mm / dd</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInput}>
            <Text style={styles.dateText}>yyyy / mm / dd</Text>
          </TouchableOpacity>
        </View>

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

                <TouchableOpacity style={styles.analyzeButton} onPress={() => navigation.navigate('Analysis' as never)}>
          <Text style={styles.analyzeButtonText}>Analyze with AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Form</Text>
        </TouchableOpacity>
      </ScrollView>
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
