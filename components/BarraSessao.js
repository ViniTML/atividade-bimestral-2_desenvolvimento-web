import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { auth } from '../factory/firebase';
import * as authApi from '../factory/authApi';
import { cores } from '../css/theme';

export default function BarraSessao({ navigation }) {
  const email = auth.currentUser?.email || 'Usuário';

  async function Sair() {
    try {
      await authApi.sair();
      navigation.reset({
        index: 0,
        routes: [{ name: 'MenuInicial' }],
      });
    } catch {
      Alert.alert('Erro', 'Não foi possível encerrar a sessão.');
    }
  }

  return (
    <View style={estilos.barra}>
      <Text style={estilos.email} numberOfLines={1}>
        {email}
      </Text>
      <Pressable
        style={({ pressed }) => [estilos.botaoSair, pressed && { opacity: 0.85 }]}
        onPress={Sair}>
        <Text style={estilos.botaoSairTexto}>Sair</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: cores.card,
    borderBottomWidth: 1,
    borderBottomColor: cores.cardBorda,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  email: {
    flex: 1,
    fontSize: 13,
    color: cores.texto,
    marginRight: 12,
  },
  botaoSair: {
    backgroundColor: cores.perigo,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  botaoSairTexto: {
    color: cores.textoClaro,
    fontSize: 13,
    fontWeight: '700',
  },
});
