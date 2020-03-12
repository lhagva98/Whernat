import * as React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import AuthStack from "./src/views/screens/Auth";
import MainTab from "./src/views/screens/BottomTab";
import SplashScreen from "./src/views/screens/Splash";
import { subscribeToAuthChanges } from "./src/api/AuthApi";
import firebase from "react-native-firebase";
const db = firebase.firestore();
export const AuthContext = React.createContext();
export const DataFlowContext = React.createContext();
const RootStack = createStackNavigator();
export default App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            isAuthenticated: action.isAuthenticated,
            data: action.data,
            isLoading: false
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            isAuthenticated: true
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            isAuthenticated: false
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      isAuthenticated: false,
      data: {}
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken, isAuthenticated;
      try {
        //alert("aa")
        // AsyncStorage.clear();
        userToken = await AsyncStorage.getItem("userToken");
        isAuthenticated = userToken ? true : false;
        //  alert(userToken);
      } catch (e) {
        // Restoring token failed
      }
      let data = {};
      let rootData = {};
      let events = await db.collection("events").get();
      let categories = await db.collection("categories").get();
      categories.forEach(doc => {
        const item = doc.data();
        data[doc.id] = {
          info: item,
          content: []
        };
      });
      events.forEach(doc => {
        const eventItem = doc.data();
        data[eventItem.category].content.push(eventItem);
      });

      Object.keys(data).forEach(key => {
        let item = data[key];
        if (rootData[item.info.parent] == null) {
          rootData[item.info.parent] = {
            count: 0,
            content: []
          };
        } else {
          rootData[item.info.parent].content.push(item);
          rootData[item.info.parent].count += item.content.length;
        }
      });
      const parents = ["sport", "music"];
      parents.map((key, index) => {
        if (rootData[key] == null) {
          rootData[key] = {
            count: 0,
            content: []
          };
        }
      });
      subscribeToAuthChanges(this.onAuthStateChanged);
      dispatch({
        type: "RESTORE_TOKEN",
        isAuthenticated: isAuthenticated,
        data: rootData
      });
    };

    bootstrapAsync();
  }, []);

  onAuthStateChanged = user => {
    if (user === null) {
      dispatch({ type: "SIGN_OUT" });
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async => {
        dispatch({ type: "SIGN_IN" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async => {
        dispatch({ type: "SIGN_IN" });
      }
    }),
    []
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <DataFlowContext.Provider value={state.data}>
          <NavigationContainer>
            <RootStack.Navigator>
              {state.isAuthenticated === false ? (
                <>
                  <RootStack.Screen
                    name="AuthStack"
                    component={AuthStack}
                    options={{
                      headerStyle: { height: 0 }
                    }}
                  />
                </>
              ) : (
                <RootStack.Screen
                  name="MainTab"
                  component={MainTab}
                  options={{
                    headerStyle: { height: 0 }
                  }}
                />
              )}
            </RootStack.Navigator>
          </NavigationContainer>
        </DataFlowContext.Provider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
};
