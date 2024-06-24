import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';

const WalletCard = ({ title, color }) => (
  <View style={[styles.card, { backgroundColor: color }]}>
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Wallet</Text>
      </View>
      <ScrollView style={styles.cardContainer} contentContainerStyle={styles.cardsContentContainer}>
        <WalletCard title="Debit Card" color="#1abc9c" />
        <WalletCard title="Credit Card" color="#3498db" />
        <WalletCard title="Gift Card" color="#9b59b6" />
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Card</Text>
      </TouchableOpacity>
      <View
      style={{
        backgroundColor: '#F5FCFF88' ,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    height: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  topBarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
  },
  cardsContentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '90%',
    height: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 24,
  },
  addButton: {
    backgroundColor: '#000',
    margin: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default App;