import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Animated,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import mascara from '../css/style';
import { useNativeDriver } from '../utils/platform';
import { cores } from '../css/theme';
import * as authApi from '../factory/authApi';

export default function TelaCadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver,
    }).start();
  }, [fadeAnim]);

  async function Cadastrar() {
    if (!email.trim() || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha e-mail, senha e confirmação de senha.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setEnviando(true);
    try {
      await authApi.cadastrar(email, senha);
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Menu' }],
            }),
        },
      ]);
    } catch (erro) {
      const codigo = erro?.code || '';
      Alert.alert('Erro', authApi.mensagemErroAuth(codigo));
    } finally {
      setEnviando(false);
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
          <Text style={mascara.titulo}>Criar conta</Text>
          <View style={mascara.caixa}>
            <TextInput
              placeholder="Digite seu e-mail"
              placeholderTextColor="#95A5A6"
              style={mascara.entradas}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!enviando}
            />
            <TextInput
              secureTextEntry
              placeholder="Digite sua senha (mín. 6 caracteres)"
              placeholderTextColor="#95A5A6"
              style={mascara.entradas}
              value={senha}
              onChangeText={setSenha}
              editable={!enviando}
            />
            <TextInput
              secureTextEntry
              placeholder="Confirme sua senha"
              placeholderTextColor="#95A5A6"
              style={mascara.entradas}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              editable={!enviando}
            />
            <Pressable
              style={({ pressed }) => [
                mascara.botaoLogin,
                pressed && { opacity: 0.9 },
                enviando && { opacity: 0.7 },
              ]}
              onPress={Cadastrar}
              disabled={enviando}>
              {enviando ? (
                <ActivityIndicator color={cores.textoClaro} />
              ) : (
                <Text style={mascara.botaoLoginTexto}>Cadastrar</Text>
              )}
            </Pressable>
            <Pressable
              style={mascara.linkVoltar}
              onPress={() => navigation.goBack()}
              disabled={enviando}>
              <Text style={mascara.linkVoltarTexto}>Já tenho conta — Entrar</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}
