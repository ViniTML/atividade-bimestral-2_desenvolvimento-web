import { View, Text, Pressable, StyleSheet } from 'react-native';
import { cores } from '../css/theme';

export default function ListaRegistros({
  titulo,
  dados,
  selecionadoId,
  onEditar,
  renderItem,
  chaveLista = 'id',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.tituloLista}>{titulo}</Text>
      {dados.length === 0 ? (
        <Text style={styles.vazio}>Nenhum registro cadastrado.</Text>
      ) : (
        dados.map((item) => {
          const selecionado = item[chaveLista] === selecionadoId;
          return (
            <Pressable
              key={String(item[chaveLista])}
              style={({ pressed }) => [
                styles.item,
                selecionado && styles.itemSelecionado,
                pressed && styles.itemPressed,
              ]}
              onPress={() => onEditar(item)}>
              {renderItem ? (
                renderItem(item, selecionado)
              ) : (
                <Text style={styles.itemTexto}>
                  {item.codigo ? `${item.codigo} - ` : ''}
                  {item.nome || item.nomeprod || 'Registro'}
                </Text>
              )}
            </Pressable>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  tituloLista: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.primaria,
    marginBottom: 8,
    textAlign: 'center',
  },
  item: {
    backgroundColor: cores.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: cores.cardBorda,
  },
  itemSelecionado: {
    borderColor: cores.primaria,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.98)',
  },
  itemPressed: {
    opacity: 0.9,
  },
  itemTexto: {
    color: cores.texto,
    fontSize: 14,
  },
  vazio: {
    textAlign: 'center',
    color: cores.texto,
    opacity: 0.6,
    fontStyle: 'italic',
    paddingVertical: 12,
  },
});
