import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CadCliente from './CadCliente';
import CadProduto from './CadProduto';
import CadUser from './CadUser';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cores } from '../css/theme';

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.tabAtivo,
        tabBarInactiveTintColor: cores.tabInativo,
        tabBarStyle: {
          backgroundColor: cores.tabBar,
          borderTopColor: cores.cardBorda,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tab.Screen
        name="Cadastro de Cliente"
        component={CadCliente}
        options={{
          tabBarLabel: 'Clientes',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cadastro de Produtos"
        component={CadProduto}
        options={{
          tabBarLabel: 'Produtos',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),

        }}
      />
      <Tab.Screen
        name="Cadastro de Usuários"
        component={CadUser}
        options={{
          tabBarLabel: 'Usuários',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="address-card" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
