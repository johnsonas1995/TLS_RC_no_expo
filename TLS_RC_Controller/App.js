/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useState } from 'react';    
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  NativeModules, DeviceEventEmitter, //bluetooth serial requirements
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Slider from '@react-native-community/slider'
import logo from './assets/tls_logo.jpg';    

const BluetoothSerial = NativeModules.BluetoothSerial



/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [throttleVal, setThrottleVal] = useState(0);
  const [steerVal, setSteerVal] = useState(0);
  const [lights, setLights] = useState(false);

  const lightsHandler = () => {
    setLights(current => !current)
    console.log("Lights:", lights)
  }
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.container}>
    <Image source={logo} style={{width:200, height:200, alignSelf:'center'}}/>
    
    <Text style={{alignSelf:'flex-start'}}>   Speed: {throttleVal}</Text>

    <Slider style={{width:200, height:40, transform: [ { rotate: "-90deg" } ], alignSelf:'flex-start'}} //could use wheel picker instead
      minimumValue={-10} 
      maximumValue={10}
      onValueChange={(value) => setThrottleVal(value)}
      step={1}
      value={throttleVal}
      />
    
      

      <Slider style={{width:200, height:40, alignSelf:'flex-end', color:"#40E0D0"}} //could use wheel picker instead
      minimumValue={-1} 
      maximumValue={1}
      onValueChange={(value) => setSteerVal(value)}
      step={1}
      value={steerVal}
      />

    <Text style={{alignSelf:'flex-end'}}>   Steering: {steerVal}   </Text>
    <Button
        style={{position:'absolute', bottom:0, left:0}}
        onPress={lightsHandler}
        title="Lights"
        color="#40E0D0"
        accessibilityLabel="Toggle Lights"
      />
    
      <StatusBar style="auto" />
    </View>
    
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
