import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

export function escutarColecao(nomeColecao, callback) {
  return onSnapshot(collection(db, nomeColecao), (snapshot) => {
    const registros = snapshot.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    callback(registros);
  });
}

export function adicionar(nomeColecao, dados) {
  return addDoc(collection(db, nomeColecao), dados);
}

export function atualizar(nomeColecao, id, dados) {
  return updateDoc(doc(db, nomeColecao, id), dados);
}

export function excluir(nomeColecao, id) {
  return deleteDoc(doc(db, nomeColecao, id));
}
