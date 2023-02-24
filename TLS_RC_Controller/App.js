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
  PermissionsAndroid,
  View,
  Button,
  Image,
  NativeModules, DeviceEventEmitter,
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
import RNBluetoothClassic, {
  BluetoothEventType,
  BluetoothDevice,
} from "react-native-bluetooth-classic";

const requestScanPermission = async () => { //required for bluetooth functions beyond the permissions added in manifest file
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Permission to scan for Bluetooth devices',
        message:
          'This app needs your permission to scan for devices ' +
          'so that you can connect to the HC-06 bluetooth module.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can now scan for devices');
    } else {
      console.log('Scan permission denied');
    }
  } catch (err) {
    console.log(err);
  }
};

const requestLocationPermission = async () => { //required for bluetooth functions beyond the permissions added in manifest file
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access fine location required for discovery',
        message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can now scan for nearby devices');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};



const App: () => Node = () => {
  const [throttleVal, setThrottleVal] = useState(0);
  const [steerVal, setSteerVal] = useState(0);
  const [lights, setLights] = useState(false);
  const [discovering, setDiscovering] = useState(false);
  const [devices, setDevices] = useState([]);
  const lightsHandler = () => {// need to add bt write function
    setLights(current => !current)
    console.log("Lights:", lights)
  }
  
  const configHandler = async () => {
    if (discovering) console.log('not rediscovering yeet')
    else {
      try {
        setDiscovering(true);
        console.log('starting');
        const discoveredDevices = await RNBluetoothClassic.startDiscovery();
        console.log('finished');
        setDevices(discoveredDevices);
        setDiscovering(false);
      }  catch (e) {
        console.log(e);
        setDiscovering(false);
      }
    }
    console.log(devices, 1111111)
  }


  return (
    <View style={styles.container}>
    <View style={styles.container}>
    <Text style={styles.item}>Try permissions</Text>
    <Button color="#40E0D0" title="Scan Permissions" onPress={requestScanPermission} />
    <Button color="#40E0D0" title="Location Permissions" onPress={requestLocationPermission} />
    <Text> </Text>
    
    </View>
    {/* <Image source={logo} style={{width:150, height:150, alignSelf:'center'}}/> */}
    
    <Text style={{alignSelf:'flex-start'}}>   Speed: {throttleVal}</Text>

    <Slider style={{width:200, height:40, transform: [ { rotate: "-90deg" } ], alignSelf:'flex-start'}} //could use wheel picker instead
      minimumValue={-10} 
      maximumValue={10}
      onValueChange={(value) => setThrottleVal(value)}
      step={1}
      value={throttleVal}
      />
    
      <Slider style={{width:200, height:40, alignSelf:'flex-end'}} //could use wheel picker instead
      minimumValue={-1} 
      maximumValue={1}
      onValueChange={(value) => setSteerVal(value)}
      step={1}
      value={steerVal}
      />
      <Text> </Text>
      <Text> </Text>

    <Text style={{alignSelf:'flex-end'}}>   Steering: {steerVal}   </Text>
    <Button
        style={{position:'absolute', bottom:0, left:0}}
        onPress={configHandler}
        title="Config"
        color="#40E0D0"
        accessibilityLabel="Config"
      />
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
