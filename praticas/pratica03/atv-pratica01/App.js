import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesa';
import GerenciarDespesa from './screens/GerenciarDespesa';
import IconButton from './components/IconButton';

import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottonTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#093b69' },
        headerTintColor: 'white',
        tabBarActiveTintColor: '#1c0f42', 
        tabBarInactiveTintColor: 'white',   
        tabBarStyle: { 
          backgroundColor: '#e0a8ce',       
          height: 90,            
          paddingTop: 15,          
          paddingBottom: 8                 
        },
        headerRight: () => (
          <IconButton
            icon="add"
            size={24}
            color="white"
            onPress={() => {
              navigation.navigate('GerenciarDespesa');
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color="#093b69" />
          ),
          tabBarLabel: 'Recentes',
          title: 'Despesas Recentes',
          tabBarLabelStyle: { fontSize: 15, color: '#093b69'},
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color="#093b69" />
          ),
          tabBarLabel: 'Todas',
          title: 'Todas as Despesas',
          tabBarLabelStyle: { fontSize: 15, color: '#093b69' },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#093b69' }, 
          headerTintColor: 'white',                   
        }}
      >
        <Stack.Screen
          name="Despesas"
          component={BottonTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GerenciarDespesa"
          component={GerenciarDespesa}
          options={{ title: 'Gerenciar Despesa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}