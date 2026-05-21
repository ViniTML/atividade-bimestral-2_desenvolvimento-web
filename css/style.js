import { StyleSheet, Platform } from 'react-native';
import { cores } from './theme';

const sombraCard =
  Platform.OS === 'web'
    ? { boxShadow: '0 4px 12px rgba(61, 90, 108, 0.12)' }
    : {
        shadowColor: cores.primaria,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      };

const mascara = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: cores.primaria,
    marginBottom: 16,
    marginTop: 4,
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: cores.texto,
    opacity: 0.75,
    marginBottom: 12,
  },
  card: {
    backgroundColor: cores.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.cardBorda,
    ...sombraCard,
  },
  entradas: {
    marginVertical: 6,
    backgroundColor: cores.entrada,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.entradaBorda,
    color: cores.texto,
  },
  logoContainer: {
    marginBottom: 24,
    alignSelf: 'center',
  },
  logo: {
    width: 180,
    height: 100,
  },
  fundo: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  caixa: {
    backgroundColor: cores.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: cores.cardBorda,
    marginHorizontal: 8,
  },
  acessar: {
    marginTop: 8,
  },
  botaoLogin: {
    backgroundColor: cores.primaria,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoLoginTexto: {
    color: cores.textoClaro,
    fontSize: 16,
    fontWeight: '700',
  },
  botaoSecundario: {
    backgroundColor: cores.card,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 2,
    borderColor: cores.primaria,
  },
  botaoSecundarioTexto: {
    color: cores.primaria,
    fontSize: 16,
    fontWeight: '700',
  },
  linkVoltar: {
    marginTop: 14,
    alignItems: 'center',
  },
  linkVoltarTexto: {
    color: cores.primariaEscura,
    fontSize: 14,
    fontWeight: '600',
  },
  modoEdicao: {
    textAlign: 'center',
    color: cores.primariaEscura,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    fontStyle: 'italic',
  },
});

export default mascara;
