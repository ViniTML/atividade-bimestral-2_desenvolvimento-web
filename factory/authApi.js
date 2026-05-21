import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

export function observarAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function login(email, senha) {
  return signInWithEmailAndPassword(auth, email.trim(), senha);
}

export async function cadastrar(email, senha) {
  return createUserWithEmailAndPassword(auth, email.trim(), senha);
}

export async function sair() {
  return signOut(auth);
}

export function mensagemErroAuth(codigo) {
  const mensagens = {
    'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/operation-not-allowed': 'Cadastro por e-mail não está habilitado no Firebase.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/user-disabled': 'Esta conta foi desativada.',
    'auth/user-not-found': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde e tente novamente.',
    'auth/network-request-failed': 'Sem conexão. Verifique sua internet.',
  };
  return mensagens[codigo] || 'Não foi possível concluir a operação. Tente novamente.';
}
