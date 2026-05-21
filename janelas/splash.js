import { useEffect, useRef } from 'react';
import { ImageBackground, Animated, StyleSheet } from 'react-native';
import { useNativeDriver } from '../utils/platform';

export default function Splash({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver,
      }),
    ]).start(() => {
      navigation.replace('MenuInicial');
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground
        source={require('../img/splash.jpeg')}
        style={styles.imagem}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagem: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
