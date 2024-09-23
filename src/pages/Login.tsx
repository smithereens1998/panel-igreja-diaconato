import styles from "@/styles/Login.module.css";

import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import AppContext from "@/Context/AppContext";
import { useToast } from "@chakra-ui/react";
import { encryptData, decryptData } from "@/cryptoUtils";
import { useRouter } from "next/router";

export default function Login() {
  const { usuario, setUsuario } = useContext(AppContext);
  const { senha, setSenha } = useContext(AppContext);
  const { getImgsCarouselRender, setGetImgsCarouselRender } =
    useContext(AppContext);
  const [logoLogin, setLogoLogin] = useState("");
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    saveDataInfoDbBrowserLogin();
  }, []);

  useEffect(() => {
    const readAsyncStorageValues = async () => {
      try {
        const savedUser = localStorage.getItem("e_m");
        const savedPassword = localStorage.getItem("p_s");

        if (savedUser && savedPassword) {
          const parsedUser = JSON.parse(savedUser);
          const parsedPassword = JSON.parse(savedPassword);

          setUsuario(parsedUser);
          setSenha(parsedPassword);
        }
      } catch (error) {
        console.error("Erro ao ler valores do localStorage:", error);
      }
    };

    readAsyncStorageValues();
  }, []);

  function saveDataInfoDbBrowserLogin() {
    const encryptedHost = encryptData("localhost");
    const encryptedPassword = encryptData("root");
    const encryptedUser = encryptData("root");
    const encryptedDatabase = encryptData("addiaconato");

    sessionStorage.setItem("host", encryptedHost);
    sessionStorage.setItem("password", encryptedPassword);
    sessionStorage.setItem("user", encryptedUser);
    sessionStorage.setItem("dataBase", encryptedDatabase);
  }

  //função que armazena uma requisição responsavel pela validação do usuario fazendo com que efetua o login
  async function LoginUsers() {
    //descriptografando os dados vindo do sessionStorage
    const decryptedHost = decryptData(sessionStorage.getItem("host"));
    const decryptedPassword = decryptData(sessionStorage.getItem("password"));
    const decryptedUser = decryptData(sessionStorage.getItem("user"));
    const decryptedDatabase = decryptData(sessionStorage.getItem("dataBase"));

    //criptografando os dados novamente para o envio no corpo da requisição pro backend

    const encryptedHost = encryptData(decryptedHost);
    const encryptedPassword = encryptData(decryptedPassword);
    const encryptedUser = encryptData(decryptedUser);
    const encryptedDatabase = encryptData(decryptedDatabase);

    //criptografando valor do input do usuario email e senha poderia ser feito com um estado também passando pra criptografia
    // const encryptedUsuarioLogin= encryptData(usuario);
    // const encryptedSenhaLogin= encryptData(senha);
    //requisição
    try {
      // const response = await fetch('http://192.168.100.181:3000/LoginPanel/panel', {
      const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/allDiaconato/panelBetesda", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          TIPO: "loginBetesda",
          USER: usuario,
          PASS: senha,
          host: encryptedHost,
          user: encryptedUser,
          password: encryptedPassword,
          dataBase: encryptedDatabase,
        }),
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);
      if (data.message.includes("Login Efetuado com sucesso")) {
        localStorage.setItem("IdUserUpLogo", data.id);
        localStorage.setItem("e_m", JSON.stringify(usuario));
        localStorage.setItem("p_s", JSON.stringify(senha));
        router.push("/Home");
      } else {
        toast({
          title: "Erro",
          description:
            "Usuário ou senha inválidos por favor se não lembra seu usuário ou senha entre em contato com a smithereens",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  // function handleLogin() {
  //   LoginUsers(=);
  // }

  const getImgsLogo = async () => {
    try {
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/servico/getImgGallery"
      );
      const data = await response.json();
      console.log("Verificandoa se a logoLogin esta vindo ", logoLogin);
      setLogoLogin(data.imgs[0].LOGO);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    getImgsLogo();
  }, [logoLogin]);

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerLoginPrincipal}>
        <div className={styles.containerImage}>
          {/* <img  className='logo' src="/logo-mac.svg" alt="" /> */}
          <Image
            src="/logo-diaconato-canva.png"
            alt="Logo da barbearia"
            width={200}
            height={200}
            style={{ borderRadius: "7vw" }}
          />
        </div>
        <div className={styles.containerTitleLogin}>
          <h2 className={styles.titleLogin}>Acessar o Sistema</h2>
        </div>
        <div className={styles.containerForms}>
          <div className={styles.containerLabel}>
            <label className={styles.label} htmlFor="usuario">
              USUÁRIO
            </label>
          </div>

          <input
            className={styles.input}
            id="usuario"
            type={"text"}
            required
            onChange={(e) => setUsuario(e.target.value)}
            value={usuario}
          />
        </div>
        <div className={styles.containerForms}>
          <div className={styles.containerLabel}>
            <label className={styles.label} htmlFor="senha">
              SENHA
            </label>
          </div>

          <input
            className={styles.input}
            id="senha"
            type={"password"}
            required
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </div>
        <div className={styles.containerChangePassword}>
          {/* <a className='changeLink' href="">Esqueci minha senha! </a> */}
        </div>

        <div className={styles.containerButtonLogin}>
          <button
            className={styles.button}
            onClick={() => {
              LoginUsers();
            }}
          >
            ENTRAR
          </button>
        </div>
        <div className={styles.containerRegisterAcc}>
          {/* <p className='textRegister'>Ainda não possui uma conta?</p> */}
          {/* <a className='changeLink' href="">Crie uma agora</a> */}
        </div>
      </div>

      <div className={styles.containerImageLanding}>
        <div className={styles.containerTitleWelcome}>
          {/* <h1 className={styles.titleWelcome} >Bem vindos à Barber Shop</h1> */}
          <h1 className={styles.titleSmithe}>SMITHEREENS</h1>
          <p style={{ color: "white" }}>www.smithereens.com.br</p>
          <div className={styles.containerImgMoldure}>
            {/* <img  className='imgLanding' src="/mold-mobile.png" alt="" /> */}
            <Image
              className={styles.modelDesktop}
              src={"/model-ed.png"}
              alt="desktop model "
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
