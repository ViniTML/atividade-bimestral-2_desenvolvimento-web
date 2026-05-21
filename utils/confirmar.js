import { Alert, Platform } from 'react-native';

export function confirmarExclusao(mensagem, onConfirm) {
  if (Platform.OS === 'web') {
    if (window.confirm(mensagem)) {
      onConfirm();
    }
    return;
  }

  Alert.alert('Confirmar', mensagem, [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Excluir',
      style: 'destructive',
      onPress: onConfirm,
    },
  ]);
}
