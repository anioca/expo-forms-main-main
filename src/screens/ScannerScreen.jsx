import { Camera, CameraView } from "expo-camera";

import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

import { useEffect, useRef } from "react";
import { Surface, Text } from "react-native-paper";

export default function ScannerScreen() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // const subscription = AppState.addEventListener("change", (nextAppState) => {
    //   if (
    //     appState.current.match(/inactive|background/) &&
    //     nextAppState === "active"
    //   ) {
    //     qrLock.current = false;
    //   }
    //   appState.current = nextAppState;
    // });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Surface>
      {/* {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              await Linking.openURL(data);
            }, 500);
          }
        }}
      /> */}
      <Text>oii</Text>
    </Surface>
  );
}
