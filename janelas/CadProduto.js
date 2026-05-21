import { View, Text, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as firestore from '../factory/firestoreApi';
import mascara from '../css/style';
import AppScreen from '../components/AppScreen';
import BotoesCrud from '../components/BotoesCrud';
import ListaRegistros from '../components/ListaRegistros';
import { confirmarExclusao } from '../utils/confirmar';

const COLECAO = 'tbCadProdutos';

export default function CadProduto() {
  const [docId, setDocId] = useState(null);
  const [lista, setLista] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nomeprod, setNomeprod] = useState('');
  const [fabricanteprod, setFabricanteprod] = useState('');
  const [marcaprod, setMarcaprod] = useState('');
  const [quantprod, setQuantprod] = useState('');
  const [valorprod, setValorprod] = useState('');
  const [setorprod, setSetorprod] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.escutarColecao(COLECAO, setLista);
    return () => unsubscribe();
  }, []);

  function limparFormulario() {
    setDocId(null);
    setCodigo('');
    setNomeprod('');
    setFabricanteprod('');
    setMarcaprod('');
    setQuantprod('');
    setValorprod('');
    setSetorprod('');
  }

  function Editar(item) {
    setDocId(item.id);
    setCodigo(item.codigo || '');
    setNomeprod(item.nomeprod || '');
    setFabricanteprod(item.fabricanteprod || '');
    setMarcaprod(item.marcaprod || '');
    setQuantprod(item.quantprod || '');
    setValorprod(item.valorprod || '');
    setSetorprod(item.setorprod || '');
  }

  async function Gravar() {
    if (docId) {
      limparFormulario();
      return;
    }
    if (!codigo.trim() || !nomeprod.trim()) {
      Alert.alert('Atenção', 'Informe pelo menos o código e o nome do produto.');
      return;
    }
    try {
      await firestore.adicionar(COLECAO, {
        codigo,
        nomeprod,
        fabricanteprod,
        marcaprod,
        quantprod,
        valorprod,
        setorprod,
      });
      limparFormulario();
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao cadastrar produto.');
    }
  }

  async function Alterar() {
    if (!docId) {
      Alert.alert('Atenção', 'Selecione um produto na lista para alterar.');
      return;
    }
    try {
      await firestore.atualizar(COLECAO, docId, {
        codigo,
        nomeprod,
        fabricanteprod,
        marcaprod,
        quantprod,
        valorprod,
        setorprod,
      });
      limparFormulario();
      Alert.alert('Sucesso', 'Produto alterado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao alterar produto.');
    }
  }

  async function executarExclusao() {
    try {
      await firestore.excluir(COLECAO, docId);
      limparFormulario();
      Alert.alert('Sucesso', 'Produto excluído com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao excluir produto.');
    }
  }

  function Excluir() {
    if (!docId) {
      Alert.alert('Atenção', 'Selecione um produto na lista para excluir.');
      return;
    }
    confirmarExclusao('Deseja excluir este produto?', executarExclusao);
  }

  return (
    <AppScreen>
      <Text style={mascara.titulo}>Cadastro de Produtos</Text>
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
          placeholder="Nome do Produto"
          placeholderTextColor="#95A5A6"
          value={nomeprod}
          onChangeText={setNomeprod}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="Fabricante"
          placeholderTextColor="#95A5A6"
          value={fabricanteprod}
          onChangeText={setFabricanteprod}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="Marca"
          placeholderTextColor="#95A5A6"
          value={marcaprod}
          onChangeText={setMarcaprod}
          style={mascara.entradas}
        />
        <TextInput
          placeholder="Quantidade"
          placeholderTextColor="#95A5A6"
          value={quantprod}
          onChangeText={setQuantprod}
          style={mascara.entradas}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Valor"
          placeholderTextColor="#95A5A6"
          value={valorprod}
          onChangeText={setValorprod}
          style={mascara.entradas}
          keyboardType="decimal-pad"
        />
        <TextInput
          placeholder="Setor"
          placeholderTextColor="#95A5A6"
          value={setorprod}
          onChangeText={setSetorprod}
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
        titulo="Produtos cadastrados (toque para editar)"
        dados={lista}
        selecionadoId={docId}
        onEditar={Editar}
        renderItem={(item) => (
          <Text style={{ color: '#2C3E50', fontSize: 14 }}>
            <Text style={{ fontWeight: '700' }}>{item.codigo}</Text> — {item.nomeprod}
          </Text>
        )}
      />
    </AppScreen>
  );
}
