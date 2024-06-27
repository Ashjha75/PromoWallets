import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import RootStack from './Navigations/RootStack';


const App = () => {
  return (
    <RootStack navigation={undefined} />
  );
};

export default App;