import { useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { styles } from "../config/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../config/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState({
    email: false,
    senha: false,
  });

  function realizaLogin() {
    console.log("Fazer Login");
    if (email === "") {
      setErro({ ...erro, email: true });
    } else {
      setErro({ ...erro, email: false });
    }
    if (senha === "") {
      setErro({ ...erro, senha: true });
    } else {
      setErro({ ...erro, senha: false });
    }
    realizaLoginNoFirebase();
  }

  async function realizaLoginNoFirebase() {
    try {
      const usuarioRef = await signInWithEmailAndPassword(auth, email, senha);
      console.log(usuarioRef);
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text
          variant="headlineMedium"
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Faça seu Login
        </Text>
        <TextInput
          placeholder="Digite seu e-mail"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          error={erro.email}
        />
        <TextInput
          placeholder="Digite sua senha"
          onChangeText={setSenha}
          value={senha}
          secureTextEntry // faz com que o campo seja senha com *
          style={styles.input}
          error={erro.senha}
        />
        <View>
          <Button onPress={realizaLogin} mode="contained">
            Fazer Login
          </Button>
        </View>
        <Button onPress={() => navigation.navigate("RegisterScreen")}>
          Faça seu cadastro
        </Button>
      </View>
    </Surface>
  );
}
