import { View, Text, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as firestore from '../factory/firestoreApi';
import mascara from '../css/style';
import AppScreen from '../components/AppScreen';
import BotoesCrud from '../components/BotoesCrud';
import ListaRegistros from '../components/ListaRegistros';
import { confirmarExclusao } from '../utils/confirmar';

const COLECAO = 'tbCadCliente';

export default function CadCliente() {
  const [docId, setDocId] = useState(null);
  const [lista, setLista] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [rg, setRg] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.escutarColecao(COLECAO, setLista);
    return () => unsubscribe();
  }, []);

  function limparFormulario() {
    setDocId(null);
    setCodigo('');
    setNome('');
    setEndereco('');
    setBairro('');
    setCidade('');
    setUf('');
    setTelefone('');
    setEmail('');
    setCPF('');
    setRg('');
  }

  function Editar(item) {
    setDocId(item.id);
    setCodigo(item.codigo || '');
    setNome(item.nome || '');
    setEndereco(item.endereco || '');
    setBairro(item.bairro || '');
    setCidade(item.cidade || '');
    setUf(item.uf || '');
    setTelefone(item.telefone || '');
    setEmail(item.email || '');
    setCPF(item.cpf || '');
    setRg(item.rg || '');
  }

  async function Gravar() {
    if (docId) {
      limparFormulario();
      return;
    }
    if (!codigo.trim() || !nome.trim()) {
      Alert.alert('Atenção', 'Informe pelo menos o código e o nome.');
      return;
    }
    try {
      await firestore.adicionar(COLECAO, {
        codigo,
        nome,
        endereco,
        bairro,
        cidade,
        cpf,
        uf,
        telefone,
        email,
        rg,
      });
      limparFormulario();
      Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao cadastrar cliente.');
    }
  }

  async function Alterar() {
    if (!docId) {
      Alert.alert('Atenção', 'Selecione um cliente na lista para alterar.');
      return;
    }
    try {
      await firestore.atualizar(COLECAO, docId, {
        codigo,
        nome,
        endereco,
        bairro,
        cidade,
        cpf,
        uf,
        telefone,
        email,
        rg,
      });
      limparFormulario();
      Alert.alert('Sucesso', 'Cliente alterado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao alterar cliente.');
    }
  }

  async function executarExclusao() {
    try {
      await firestore.excluir(COLECAO, docId);
      limparFormulario();
      Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao excluir cliente.');
    }
  }

  function Excluir() {
    if (!docId) {
      Alert.alert('Atenção', 'Selecione um cliente na lista para excluir.');
      return;
    }
    confirmarExclusao('Deseja excluir este cliente?', executarExclusao);
  }

  return (
    <AppScreen>
      <Text style={mascara.titulo}>Cadastro de Cliente</Text>
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
          placeholder="Nome"
          placeholderTextColor="#95A5A6"
          value={nome}
          onChangeText={setNome}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="Endereço"
          placeholderTextColor="#95A5A6"
          value={endereco}
          onChangeText={setEndereco}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="Bairro"
          placeholderTextColor="#95A5A6"
          value={bairro}
          onChangeText={setBairro}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="Cidade"
          placeholderTextColor="#95A5A6"
          value={cidade}
          onChangeText={setCidade}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="UF"
          placeholderTextColor="#95A5A6"
          value={uf}
          onChangeText={setUf}
          style={mascara.entradas}
          maxLength={2}
        />
        <TextInput
          placeholder="Telefone"
          placeholderTextColor="#95A5A6"
          value={telefone}
          onChangeText={setTelefone}
          style={mascara.entradas}
          keyboardType="phone-pad"
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
          placeholder="CPF"
          placeholderTextColor="#95A5A6"
          value={cpf}
          onChangeText={setCPF}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="RG"
          placeholderTextColor="#95A5A6"
          value={rg}
          onChangeText={setRg}
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
        titulo="Clientes cadastrados (toque para editar)"
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
