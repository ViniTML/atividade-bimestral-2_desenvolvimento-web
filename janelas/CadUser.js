import { View, Text, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as firestore from '../factory/firestoreApi';
import mascara from '../css/style';
import AppScreen from '../components/AppScreen';
import BotoesCrud from '../components/BotoesCrud';
import ListaRegistros from '../components/ListaRegistros';
import { confirmarExclusao } from '../utils/confirmar';

const COLECAO = 'tbCadUser';

export default function CadUser() {
  const [docId, setDocId] = useState(null);
  const [lista, setLista] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.escutarColecao(COLECAO, setLista);
    return () => unsubscribe();
  }, []);

  function limparFormulario() {
    setDocId(null);
    setCodigo('');
    setNome('');
    setEmail('');
    setSenha('');
  }

  function Editar(item) {
    setDocId(item.id);
    setCodigo(item.codigo || '');
    setNome(item.nome || '');
    setEmail(item.email || '');
    setSenha(item.senha || '');
  }

  async function Gravar() {
    if (docId) {
      limparFormulario();
      return;
    }
    if (!codigo.trim() || !nome.trim() || !email.trim()) {
      Alert.alert('Atenção', 'Informe código, nome e e-mail.');
      return;
    }
    try {
      await firestore.adicionar(COLECAO, {
        codigo,
        nome,
        email,
        senha,
      });
      limparFormulario();
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao cadastrar usuário.');
    }
  }

  async function Alterar() {
    if (!docId) {
      Alert.alert('Atenção', 'Selecione um usuário na lista para alterar.');
      return;
    }
    try {
      await firestore.atualizar(COLECAO, docId, {
        codigo,
        nome,
        email,
        senha,
      });
      limparFormulario();
      Alert.alert('Sucesso', 'Usuário alterado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao alterar usuário.');
    }
  }

  async function executarExclusao() {
    try {
      await firestore.excluir(COLECAO, docId);
      limparFormulario();
      Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao excluir usuário.');
    }
  }

  function Excluir() {
    if (!docId) {
      Alert.alert('Atenção', 'Selecione um usuário na lista para excluir.');
      return;
    }
    confirmarExclusao('Deseja excluir este usuário?', executarExclusao);
  }

  return (
    <AppScreen>
      <Text style={mascara.titulo}>Cadastro de Usuários</Text>
      {docId ? (
        <Text style={mascara.modoEdicao}>Modo edição — toque em Limpar para novo cadastro</Text>
      ) : null}

      <View style={mascara.card}>
        <TextInput
          placeholder="Código"
          placeholderTextColor="#95A5A6"
          value={codigo}
          onChangeText={setCodigo}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="Nome do Usuário"
          placeholderTextColor="#95A5A6"
          value={nome}
          onChangeText={setNome}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#95A5A6"
          value={email}
          onChangeText={setEmail}
          style={mascara.entradas}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#95A5A6"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          style={mascara.entradas}
        />

        <BotoesCrud
          editando={!!docId}
          onGravar={Gravar}
          onAlterar={Alterar}
          onExcluir={Excluir}
          onLimpar={limparFormulario}
        />
      </View>

      <ListaRegistros
        titulo="Usuários cadastrados (toque para editar)"
        dados={lista}
        selecionadoId={docId}
        onEditar={Editar}
        renderItem={(item) => (
          <Text style={{ color: '#2C3E50', fontSize: 14 }}>
            <Text style={{ fontWeight: '700' }}>{item.codigo}</Text> — {item.nome}
          </Text>
        )}
      />
    </AppScreen>
  );
}
