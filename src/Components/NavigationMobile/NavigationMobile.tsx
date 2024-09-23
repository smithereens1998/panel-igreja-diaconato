import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  RadioGroup,
  Stack,
  Radio,
  Button,
} from "@chakra-ui/react";

import Image from "next/image";
import styles from "@/styles/NavigationMobile.module.css";
import { useRouter } from "next/router";
import { MdEmail } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaTools } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { FaAddressBook } from "react-icons/fa";
import { FaCut } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import AppContext from "@/Context/AppContext";
import ModalAcessBarber from "../Modals/ModalAcessBarber/ModalAcessBarber";
import { useToast } from "@chakra-ui/react";
import ModalAcessPersonaliza from "../ModalAcessPersonaliza/ModalAcessPersonaliza";
import { RiSmartphoneFill } from "react-icons/ri";
import { BiSolidLogOut } from "react-icons/bi";
import ModalEditAppCollor from "../ModalEditAppCollor/ModalEditAppCollor";
import { IoTime } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
// import DarkMode from '../DarkMode/DarkMode';

export function Navigationmobile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const { userRestrito, setUserRestrito } = useContext(AppContext);
  const { passRestrito, setPassRestrito } = useContext(AppContext);
  const { usuario, setUsuario } = useContext(AppContext);
  const { senha, setSenha } = useContext(AppContext);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const readAsyncStorageValuesAdm = async () => {
      try {
        const savedUser = localStorage.getItem("r_m");
        const savedPassword = localStorage.getItem("r_s");

        if (savedUser && savedPassword) {
          const parsedUser = JSON.parse(savedUser);
          const parsedPassword = JSON.parse(savedPassword);

          setUserRestrito(parsedUser);
          setPassRestrito(parsedPassword);
        }
      } catch (error) {
        console.error("Erro ao ler valores do localStorage:", error);
      }
    };

    readAsyncStorageValuesAdm();
  }, []);

  const handleAcessBarber = async () => {
    try {
      // Check admin credentials
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/LoginPanel/adm",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            TIPO: "loginAdm",
            USER: userRestrito,
            PASS: passRestrito,
          }),
        }
      );

      const data = await response.json();

      if (data.message.includes("Login Efetuado com sucesso")) {
        localStorage.setItem("r_m", JSON.stringify(userRestrito));
        localStorage.setItem("r_s", JSON.stringify(passRestrito));

        router.push("/Barber");
      } else if (data.message.includes("Usuário Inválido!")) {
        toast({
          title: "error",
          status: "error",
          duration: 9000,
          isClosable: true,
          description:
            "Erro ao tentar acesso verifique as credenciais ou entre em contato com a Smithereens",
          position: "bottom-left",
        });
      } else if (data.message.includes("Senha Incorreta!")) {
        toast({
          title: "error",
          status: "error",
          duration: 9000,
          isClosable: true,
          description:
            "Erro ao tentar acesso verifique as credenciais ou entre em contato com a Smithereens",
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcessPersonaliza = async () => {
    try {
      // Check admin credentials
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/LoginPanel/adm",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            TIPO: "loginAdm",
            USER: userRestrito,
            PASS: passRestrito,
          }),
        }
      );

      const data = await response.json();

      if (data.message.includes("Login Efetuado com sucesso")) {
        localStorage.setItem("r_m", JSON.stringify(userRestrito));
        localStorage.setItem("r_s", JSON.stringify(passRestrito));
        router.push("/EditApp");
      } else if (data.message.includes("Usuário Inválido!")) {
        toast({
          title: "error",
          status: "error",
          duration: 9000,
          isClosable: true,
          description:
            "Erro ao tentar acesso verifique as credenciais ou entre em contato com a Smithereens",
          position: "bottom-left",
        });
      } else if (data.message.includes("Senha Incorreta!")) {
        toast({
          title: "error",
          status: "error",
          duration: 9000,
          isClosable: true,
          description:
            "Erro ao tentar acesso verifique as credenciais ou entre em contato com a Smithereens",
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePalletCollor = async () => {
    try {
      // Check admin credentials
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/LoginPanel/adm",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            TIPO: "loginAdm",
            USER: userRestrito,
            PASS: passRestrito,
          }),
        }
      );

      const data = await response.json();

      if (data.message.includes("Login Efetuado com sucesso")) {
        localStorage.setItem("r_m", JSON.stringify(userRestrito));
        localStorage.setItem("r_s", JSON.stringify(passRestrito));
        router.push("/PalletCollor");
      } else if (data.message.includes("Usuário Inválido!")) {
        toast({
          title: "error",
          status: "error",
          duration: 9000,
          isClosable: true,
          description:
            "Erro ao tentar acesso verifique as credenciais ou entre em contato com a Smithereens",
          position: "bottom-left",
        });
      } else if (data.message.includes("Senha Incorreta!")) {
        toast({
          title: "error",
          status: "error",
          duration: 9000,
          isClosable: true,
          description:
            "Erro ao tentar acesso verifique as credenciais ou entre em contato com a Smithereens",
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.menuMobile}>
        {/* <Button colorScheme='blue' onClick={onOpen}>
        Open
      </Button> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            color: "white",
            marginLeft: "0.5vw",
          }}
        >
          <MdOutlineMenu
            onClick={onOpen}
            cursor={"pointer"}
            color="white"
            size={40}
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              paddingRight: 5,
            }}
          >
            {/* <DarkMode/> */}
          </div>
        </div>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              height={"auto"}
              borderBottomWidth="1px"
            ></DrawerHeader>
            <IoMdClose
              onClick={onClose}
              cursor={"pointer"}
              color="black"
              size={40}
              className={styles.closeButtonMobile}
            />
            <DrawerBody>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 35 }}
              >
                <div
                  className={styles.hoverBack}
                  onClick={() => {
                    router.push("/Home");
                  }}
                >
                  <div className={styles.iconEdit}>
                    <IoMdHome color="black" size={25} />
                    <p className={styles.textItens}>Home</p>
                  </div>
                </div>

                <div
                  className={styles.hoverBack}
                  onClick={() => {
                    router.push("/Scheduling");
                  }}
                >
                  <div className={styles.iconEdit}>
                    <FaAddressBook color="black" size={23} />
                    <p className={styles.textItens}>Ver Pedidos de Oração</p>
                  </div>
                </div>
                

                <div
                  className={styles.hoverBack}
                  onClick={() => {
                    router.push("/EditHours");
                  }}
                >
                  <div className={styles.iconEdit}>
                    <RiSmartphoneFill   color="black" size={23} />
                    <p className={styles.textItens}>Editar Conteúdo do App</p>
                  </div>
                </div>
                <div
                  className={styles.hoverBack}
                  onClick={() => {
                    router.push("/Niver");
                  }}
                >
                  <div className={styles.iconEdit}>
                    <FaBirthdayCake  color="black" size={23} />
                    <p className={styles.textItens}>Visualizar Aniversáriantes</p>
                  </div>
                </div>
                <div
                  className={styles.hoverBack}
                  onClick={() => {
                    router.push("/VisuCulto");
                  }}
                >
                  <div className={styles.iconEdit}>
                    <IoTime  color="black" size={23} />
                    <p className={styles.textItens}>Visualizar Horário de Cultos</p>
                  </div>
                </div>
                <div
                  className={styles.hoverBack}
                  onClick={() => {
                    router.push("/VisuLeader");
                  }}
                >
                  <div className={styles.iconEdit}>
                    <FaUsers  color="black" size={23} />
                    <p className={styles.textItens}>Visualizar líderes</p>
                  </div>
                </div>
                <div
                  className={styles.hoverBack}
                  onClick={() => {
                    router.push("/MsgMember");
                  }}
                >
                  <div className={styles.iconEdit}>
                    <MdEmail  color="black" size={23} />
                    <p className={styles.textItens}>Mensagem dos membros</p>
                  </div>
                </div>
                <div
                  className={styles.hoverBack}
                  onClick={() => {
                    router.push("/TabsNotification");
                  }}
                >
                  <div className={styles.iconEdit}>
                    <FaBell  color="black" size={23} />
                    <p className={styles.textItens}>Notificar os Membros</p>
                  </div>
                </div>
                

              
                <div
                  className={styles.hoverBack}
                  onClick={() => {
                    router.push("/");
                    localStorage.removeItem("e_m");
                    localStorage.removeItem("p_s");
                    setUsuario("");
                    setSenha("");
                    // localStorage.removeItem('r_m');
                    // localStorage.removeItem('r_s');
                  }}
                >
                  <div className={styles.iconEdit}>
                    <BiSolidLogOut color="black" size={23} />
                    <p className={styles.textItens}>Logout</p>
                  </div>
                </div>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
