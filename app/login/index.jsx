import { Image, View, Text, Pressable } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useCallback } from "react";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });
  
      if (createdSessionId) {
        // Handle successful session creation
      } else {
        // Handle signIn or signUp flow
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);
  
  return (
    <View
      style={{
        backgroundColor: Colors.BLACK,
        height: "100%",
      }}
    >
      <Image
        source={require("../../assets/images/login.png")}
        style={{
          width: "100",
          height: 500,
        }}
      ></Image>

      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "k2d-bold",
            fontSize: 30,
            textAlign: "center",
            color: Colors.PRIMARY,
          }}
        >
          Ready to have a Khodam?
        </Text>
        <Text
          style={{
            fontFamily: "k2d-medium",
            fontSize: 18,
            textAlign: "center",
            marginTop: 5,
            color: Colors.GRAY,
          }}
        >
          Let's buy the Khodam which you like and make there life is GG
        </Text>

        <Pressable
        onPress={onPress}
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 10,
            marginTop: 120,
            padding: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "k2d-medium",
              fontSize: 18,
              textAlign: "center",
              color: Colors.PRIMARY,
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
