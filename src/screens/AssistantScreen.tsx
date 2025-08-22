import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const messages: Message[] = [
  {
    id: '1',
    text: 'Hello! I\'m your AI Decision Assistant. I\'m here to help you make better decisions by exploring options, weighing pros and cons, and providing insights.',
    sender: 'ai',
    time: '9:41 AM',
  },
  {
    id: '2',
    text: 'I need help deciding between two job offers',
    sender: 'user',
    time: '9:42 AM',
  },
  {
    id: '3',
    text: 'I\'d be happy to help you compare the job offers. Could you tell me more about each position, including salary, benefits, and company culture?',
    sender: 'ai',
    time: '9:42 AM',
  },
];

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  time: string;
}

const MessageBubble = ({ message }: { message: Message }) => (
  <View style={[styles.messageRow, message.sender === 'user' ? styles.userMessageRow : styles.aiMessageRow]}>
    <View style={[styles.messageBubble, message.sender === 'user' ? styles.userMessageBubble : styles.aiMessageBubble]}>
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
    <Text style={styles.timeText}>{message.time}</Text>
  </View>
);

const AssistantScreen = () => {
  return (
    <LinearGradient colors={['#1D3A4E', '#4A8A9E']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Decision Assistant</Text>
        <TouchableOpacity>
          <Icon name="file-document-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Ask me anything about your decision...</Text>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.flexGrow}
        keyboardVerticalOffset={90}
      >
        <ScrollView style={styles.chatContainer}>
          {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.suggestionButtons}>
            <TouchableOpacity style={styles.suggestionChip}>
              <Text style={styles.suggestionText}>List Pros & Cons</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionChip}>
              <Text style={styles.suggestionText}>Suggest Alternatives</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dragIndicator} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your question here..."
              placeholderTextColor="#8A8A8E"
            />
            <TouchableOpacity>
              <Icon name="microphone-outline" size={24} color="#8A8A8E" style={styles.micIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Icon name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    paddingBottom: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeader: {
    color: '#B0B0B0',
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  flexGrow: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageRow: {
    marginBottom: 15,
  },
  userMessageRow: {
    alignItems: 'flex-end',
  },
  aiMessageRow: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 20,
    padding: 15,
    maxWidth: '80%',
  },
  userMessageBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 5,
  },
  aiMessageBubble: {
    backgroundColor: '#333333',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
  },
  timeText: {
    color: '#8A8A8E',
    fontSize: 12,
    marginTop: 5,
  },
  footer: {
    padding: 15,
  },
  suggestionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  suggestionChip: {
    backgroundColor: '#FFB800',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  suggestionText: {
    color: '#1C1C1E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#000000',
  },
  micIcon: {
    marginHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AssistantScreen;
