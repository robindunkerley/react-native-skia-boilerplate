/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {
  add,
  Canvas,
  Circle,
  LinearGradient,
  vec,
  sub,
  Fill,
  useLoop,
  mix,
  BackdropFilter,
  Blur,
  useDerivedValue,
} from "@shopify/react-native-skia";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);
const r = c.x - 32;
const rect = { x: 0, y: c.y, width, height: c.y };

export const Glassmorphism = (props) => {
  const progress = useLoop({ duration: 2000 });
  const start = useDerivedValue(
    () => sub(c, vec(0, mix(progress.current, r, r / 2))),
    [progress]
  );
  const end = useDerivedValue(
    () => add(c, vec(0, mix(progress.current, r, r / 2))),
    []
  );
  const radius = useDerivedValue(
    () => mix(progress.current, r, r / 2),
    [progress]
  );

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Circle c={c} r={radius}>
        <LinearGradient
          start={start}
          end={end}
          colors={["#FFF723", "#E70696"]}
        />
      </Circle>
      {props.children}
      <BackdropFilter filter={<Blur blur={40} />} clip={rect}>
        <Fill color="rgba(99, 99, 102, 0.3)" />

      </BackdropFilter>
    </Canvas>
  );
};



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
    <SafeAreaView style={backgroundStyle}/>

      <Glassmorphism>

      </Glassmorphism>


    </>
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
