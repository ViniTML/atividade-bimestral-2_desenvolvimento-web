import {
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
  Pressable,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import mascara from '../css/style';
import { useNativeDriver } from '../utils/platform';
import * as authApi from '../factory/authApi';

export default function MenuInicial({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const unsubscribe = authApi.observarAuth((usuario) => {
      if (usuario) {
        navigation.replace('Menu');
      } else {
        setCarregando(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  if (carregando) {
    return null;
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <ImageBackground
        source={require('../img/splash.jpeg')}
        style={mascara.fundo}
        resizeMode="cover">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            paddingHorizontal: 20,
          }}>
          <View style={mascara.logoContainer}>
            <Image
              source={require('../img/Sample_User_Icon.png')}
              style={mascara.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={mascara.titulo}>Bem-vindo</Text>
          <Text style={mascara.subtitulo}>
            Entre na sua conta ou cadastre-se para acessar o sistema
          </Text>
          <View style={mascara.caixa}>
            <Pressable
              style={({ pressed }) => [
                mascara.botaoLogin,
                pressed && { opacity: 0.9 },
              ]}
              onPress={() => navigation.navigate('TelaLogin')}>
              <Text style={mascara.botaoLoginTexto}>Entrar</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                mascara.botaoSecundario,
                pressed && { opacity: 0.9 },
              ]}
              onPress={() => navigation.navigate('TelaCadastro')}>
              <Text style={mascara.botaoSecundarioTexto}>Cadastrar</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}
