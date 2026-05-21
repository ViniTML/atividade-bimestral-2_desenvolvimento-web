import { View, Pressable, Text, StyleSheet } from 'react-native';
import { cores } from '../css/theme';

export default function BotoesCrud({
  onGravar,
  onAlterar,
  onExcluir,
  onLimpar,
  editando,
}) {
  return (
    <View style={styles.row}>
      <Pressable
        style={({ pressed }) => [
          styles.botao,
          styles.gravar,
          pressed && styles.pressed,
        ]}
        onPress={onGravar}>
        <Text style={styles.textoBotao}>{editando ? 'Novo' : 'Gravar'}</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          styles.alterar,
          !editando && styles.desabilitado,
          pressed && editando && styles.pressed,
        ]}
        onPress={onAlterar}
        disabled={!editando}>
        <Text style={styles.textoBotao}>Alterar</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          styles.excluir,
          !editando && styles.desabilitado,
          pressed && editando && styles.pressed,
        ]}
        onPress={onExcluir}
        disabled={!editando}>
        <Text style={styles.textoBotao}>Excluir</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          styles.limpar,
          pressed && styles.pressed,
        ]}
        onPress={onLimpar}>
        <Text style={[styles.textoBotao, styles.textoLimpar]}>Limpar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    marginBottom: 4,
  },
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    minWidth: 72,
    alignItems: 'center',
  },
  gravar: {
    backgroundColor: cores.primaria,
  },
  alterar: {
    backgroundColor: cores.sucesso,
  },
  excluir: {
    backgroundColor: cores.perigo,
  },
  limpar: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: cores.primaria,
  },
  desabilitado: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.85,
  },
  textoBotao: {
    color: cores.textoClaro,
    fontWeight: '600',
    fontSize: 13,
  },
  textoLimpar: {
    color: cores.primaria,
  },
});
