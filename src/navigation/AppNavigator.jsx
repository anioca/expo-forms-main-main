import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BankScreen from "../screens/BankScreen";
import AppScreen from "../screens/AppScreen";
import EventsScreen from "../screens/EventsScreen";
import PerfilScreen from "../screens/PerfilScreen";
import EventDetails from "../screens/EventDetails";
import PixScreen from "../screens/PixScreen";
import TransferirScreen from "../screens/TransferirScreen";
import PagarScreen from "../screens/PagarScreen";
import ConfiguraçãoScreen from "../screens/ConfiguraçãoScreen";
import ChatScreens from "../screens/ChatScreens";
import ScannerScreen from "../screens/ScannerScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import WelcomeScreen from "../screens/WelcomeScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "home",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            title: "Welcome",
            headerShown: false,
          }}
          />

        <Stack.Screen
          name="EventsScreen"
          component={EventsScreen}
          options={{
            title: "Inicial",
            //headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: "Inicial",
          }}
        />
        <Stack.Screen
          name="BankScreen"
          component={BankScreen}
          options={{
            title: "Banco",
          }}
        />
        <Stack.Screen
          name="AppScreen"
          component={AppScreen}
          options={{
            title: "App",
          }}
        />

        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{
            title: "Detalhes dos Eventos",
          }}
        />
        <Stack.Screen
          name="PerfilScreen"
          component={PerfilScreen}
          options={{
            title: "Perfil",
          }}
        />
        <Stack.Screen
          name="PixScreen"
          component={PixScreen}
          options={{
            title: "Pix",
          }}
        />
       
        <Stack.Screen
          name="TransferirScreen"
          component={TransferirScreen}
          options={{
            title: "Transferir",
          }}
        />
        <Stack.Screen
          name="ConfiguraçãoScreen"
          component={ConfiguraçãoScreen}
          options={{
            title: "Configurações",
          }}
        />
        <Stack.Screen
          name="ChatScreens"
          component={ChatScreens}
          options={{
            title: "Chat",
          }}
        />
        <Stack.Screen
          name="ScannerScreen"
          component={ScannerScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tabs = createMaterialBottomTabNavigator();

export function TabsNavigation() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeScreen} />
    </Tabs.Navigator>
  );
}
