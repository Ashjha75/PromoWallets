import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { imagesPath } from '../../Assets/imagesPath/paths';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Routes from "../../Utils/Strings/routes.ts";

type RootStackParamList = {
  Login: undefined; 
};

const Splash = () => {
  // Correctly type the navigation prop
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(Routes.kLOGINROUTE);
    }, 5000); 
  }, [navigation]);

  return (
    <View style={{backgroundColor:"black", flex:1,justifyContent:"center",alignItems:"center"}}>
      <ImageBackground source={imagesPath.splash} style={{width:"100%",height:"100%"}} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});