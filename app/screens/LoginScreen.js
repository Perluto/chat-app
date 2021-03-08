import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useFonts } from "expo-font";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitBtn } from "../components/forms";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  username: Yup.string().min(6).required().label("Username"),
  password: Yup.string().min(4).required().label("Password"),
});

function LoginScreen(props) {
  const [loaded] = useFonts({
    Hello: require("../../assets/fonts/Hello.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const handleSubmit = async ({ username, password }) => {
    const response = await authApi.login(username, password);
    if (!response.ok) return setLoginFailed(true);

    setLoginFailed(false);
    login(response.data);
  };
  return (
    <Screen style={styles.container}>
      <MaterialCommunityIcons name="wechat" color="black" size={200} />
      <Text style={styles.title}>hello</Text>
      <AppForm
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validateSchema}
      >
        <AppFormField
          name="username"
          placeholder="Username"
          icon="account"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="nickname"
          width="75%"
        ></AppFormField>
        <AppFormField
          name="password"
          placeholder="Password"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
          width="75%"
        ></AppFormField>
        <SubmitBtn title="Login" width="75%" />
      </AppForm>
      <View style={styles.registerContainer}>
        <Text>Don't have an account?</Text>
        <Text onPress={() => null}>SIGN IN</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    alignItems: "center",
    top: 35,
  },
  title: {
    fontSize: 90,
    fontFamily: "Hello",
  },
  registerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
