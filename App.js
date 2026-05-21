import{NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Menu from './janelas/menu';
import MenuInicial from './janelas/menuInicial';
import Splash from './janelas/splash';
import TelaLogin from './janelas/telalogin';
import TelaCadastro from './janelas/telaCadastro';

const Tela = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tela.Navigator initialRouteName="Splash">
        <Tela.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Tela.Screen name="MenuInicial" component={MenuInicial} options={{ headerShown: false }}/>
        <Tela.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
        <Tela.Screen name="TelaLogin" component={TelaLogin} options={{ headerShown: false }}/>
        <Tela.Screen name="TelaCadastro" component={TelaCadastro} options={{ headerShown: false }}/>
      </Tela.Navigator>
    </NavigationContainer>
  );
}