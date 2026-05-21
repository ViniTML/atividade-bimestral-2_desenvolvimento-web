import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Animated,
  Pressable,
  Alert,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import mascara from '../css/style';
import { useNativeDriver } from '../utils/platform';
export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver,
    }).start();
  }, [fadeAnim]);

  function Entrar() {
    if (email === 'adm' && senha === '123') {
      navigation.navigate('Menu');
    } else {
      Alert.alert('Acesso negado', 'E-mail ou senha incorretos.');
    }
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
          <Text style={mascara.titulo}>Acesso ao Sistema</Text>
          <View style={mascara.caixa}>
            <TextInput
              placeholder="Digite seu e-mail"
              placeholderTextColor="#95A5A6"
              style={mascara.entradas}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              secureTextEntry
              placeholder="Digite sua senha"
              placeholderTextColor="#95A5A6"
              style={mascara.entradas}
              value={senha}
              onChangeText={setSenha}
            />
            <Pressable
              style={({ pressed }) => [
                mascara.botaoLogin,
                pressed && { opacity: 0.9 },
              ]}
              onPress={Entrar}>
              <Text style={mascara.botaoLoginTexto}>Acessar</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}
