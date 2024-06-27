import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ThemeIcons = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleSwitch = () => setIsDarkTheme(previousState => !previousState);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="white-balance-sunny" size={30} color={isDarkTheme ? "grey" : "yellow"} />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isDarkTheme}
      />
      <Icon name="moon-waning-crescent" size={30} color={isDarkTheme ? "blue" : "grey"} />
    </View>
  );
};

export default ThemeIcons;