import { ImageBackground, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function AppScreen({ children, scroll = true }) {
  const conteudo = scroll ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <ImageBackground
      source={require('../img/splash.jpeg')}
      style={styles.fundo}
      resizeMode="cover">
      <SafeAreaView style={styles.overlay}>{conteudo}</SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 12,
  },
});
