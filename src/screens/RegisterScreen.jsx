import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { styles } from "../config/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [erro, setErro] = useState({
    email: false,
    senha: false,
    repetirSenha: false,
    nome: false,
    cep: false,
    cidade: false,
    estado: false,
  });
  // Nome, Email, Senha, Repetir Senha
  // Endereço: Logradouro, CEP, Cidade, Estado
  // O que é LOGRADOURO? É um termo que designa um terreno ou um espaço anexo a uma habitação, usado para serventia da casa, ou ainda qualquer espaço público comum que pode ser usufruído por toda a população e reconhecido pela administração de um município, como largos, praças, ruas, jardins, parques, entre outros.

  function realizaRegistro() {
    console.log("Fazer Registro");
    // o que precisa ser feito?
    // 1) Validar se todos os campos foram digitados
    if (nome === "") {
      setErro({ ...erro, nome: true });
      return;
    }
    setErro({ ...erro, nome: false });
    if (email === "") {
      setErro({ ...erro, email: true });
      return;
    }
    setErro({ ...erro, email: false });
    if (senha === "") {
      setErro({ ...erro, senha: true });
      return;
    }
    setErro({ ...erro, senha: false });
    if (repetirSenha === "") {
      setErro({ ...erro, repetirSenha: true });
      return;
    }
    setErro({ ...erro, repetirSenha: false });
    if (cep === "") {
      setErro({ ...erro, cep: true });
      return;
    }
    setErro({ ...erro, cep: false });
    if (cidade === "") {
      setErro({ ...erro, cidade: true });
      return;
    }
    setErro({ ...erro, cidade: false });
    if (estado === "") {
      setErro({ ...erro, estado: true });
      return;
    }
    setErro({ ...erro, estado: false });

    // 2) Validar se as senhas são iguais
    if (senha !== repetirSenha) {
      setErro({ ...erro, senha: true, repetirSenha: true });
      return;
    }
    setErro({ ...erro, senha: false, repetirSenha: false });

    cadastrarNoFirebase();

    // 3) Enviar os dados para a API do Firestore junto ao Firebase Auth
    // 4) Tratar os erros
    // 5) Redirecionar para a tela de Login
  }

  async function cadastrarNoFirebase() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;
      console.log("Usuário cadastrado", user);
    } catch (error) {
      console.error(error);
    }
  }


  function buscaCEP() {
    console.log("Busca CEP");
    let cepLimpo = cep.replace("-", "").trim();
    if (cepLimpo.length < 8) return;
    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      .then((res) => res.json()) // obrigatório em requisições fetch json
      .then((dados) => {
        // agora sim vou tratar os dados
        console.log(dados);
        setLogradouro(dados.logradouro);
        setCidade(dados.localidade);
        setEstado(dados.uf);
      })
      .catch((erro) => {
        // se der erro, cai aqui
        console.error(erro);
        setErro("CEP não encontrado");
      });
  }

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineSmall">Faça seu Registro</Text>
        <TextInput
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          error={erro.nome}
        />
        <TextInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          error={erro.email}
        />
        <TextInput
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          error={erro.senha}
        />
        <TextInput
          placeholder="Repita sua senha"
          value={repetirSenha}
          onChangeText={setRepetirSenha}
          secureTextEntry
          style={styles.input}
          error={erro.repetirSenha}
        />
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          <Text variant="headlineSmall">Dados pessoais</Text>
          <TextInput
            placeholder="Digite seu CEP (somente números)"
            value={cep}
            onChangeText={setCep}
            onBlur={buscaCEP} // quando o campo perde o foco, busca o CEP
            keyboardType="numeric" // abre o teclado numérico no celular
            style={styles.input}
            maxLength={8} // máximo de 8 caracteres
            error={erro.cep}
          />
          <TextInput
            placeholder="Logradouro"
            value={logradouro}
            onChangeText={setLogradouro}
            style={styles.input}
            error={erro.logradouro}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
              style={{
                ...styles.input, // utilização do spread operator ou operador de propagação
                width: "70%",
              }}
              error={erro.cidade}
            />
            <TextInput
              placeholder="Estado"
              value={estado}
              onChangeText={setEstado}
              style={{
                ...styles.input,
                width: "30%",
              }}
              maxLength={2} // máximo de 2 caracteres
              error={erro.estado}
            />
          </View>
        </View>
        <Button onPress={realizaRegistro} mode="outlined">
          Registrar
        </Button>
        <Button onPress={() => navigation.navigate("LoginScreen")}>
          Voltar ao login
        </Button>
      </View>
    </Surface>
  );
}
