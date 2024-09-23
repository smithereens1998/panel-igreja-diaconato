import styles from "@/styles/Barber.module.css";
import { useState, useContext, useEffect } from "react";
import AppContext from "@/Context/AppContext";
import { Navigationmobile } from "@/Components/NavigationMobile/NavigationMobile";
import Image from "next/image";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import {
  Button,
  useDisclosure,
  useToast,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ModalAddService from "@/Components/ModalAddService/ModalAddService";
import StarsAv from "@/Components/StarsAv/StarsAv";
import { itemBarber } from "@/Context/Provider";
import DialogDelete from "@/Components/DialogDelete/DialogDelete";
import ModalAddBarber from "@/Components/ModalAddBarber/ModalAddBarber";
import ModalVisuServico from "@/Components/ModalVisuServico/ModalVisuServico";
import DialogZeroMedia from "@/Components/DialogZeroMedia/DialogZeroMedia";
export default function Barber() {
  const { getBarber, setGetBarber } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {image, setImage}= useContext(AppContext);
  const { usuario, setUsuario } = useContext(AppContext);
  const { senha, setSenha } = useContext(AppContext);
  const router = useRouter()
  
  // useEffect(() => {
  //   if (!usuario || !senha) {
  //     router.push('/NotFound');
  //   }
  // }, [usuario, senha, router]);
  
  useEffect(() => {
    const savedUser = localStorage.getItem("e_m");
    const savedPassword = localStorage.getItem("p_s");
    if (!savedUser  || !savedPassword) {
      router.push('/NotFound');
    }
  }, [ router]);
  
  useEffect(() => {
    const savedUserAdm = localStorage.getItem("r_m");
    const savedPasswordAdm = localStorage.getItem("r_s");
    if (!savedUserAdm  || !savedPasswordAdm) {
      router.push('/NotFound');
    }
  }, [ router]);
  const getBarberService = async () => {
    try {
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers"
      );
      // const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers");
      const data = await response.json();
      console.log("Verificando requisição team ", data);

      if (data.message === "sucesso") {
        const requestServico = data.servico.map((itemBarber: itemBarber) => ({
          ID: itemBarber.ID,
          NOME: itemBarber.NOME,
          IMG: itemBarber.IMG,
          // IMG: image,
          MEDIA_AV: itemBarber.MEDIA_AV.toFixed(2),
        }));
        const sortedBarbers = requestServico.sort(
          (a: any, b: any) => b.MEDIA_AV - a.MEDIA_AV
        );
        setGetBarber([...sortedBarbers]);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    getBarberService();
    console.log("Serviços render");
  }, []);

  // const averageRating = 3.5;
  return (
    <>
      <Navigationmobile />
      <div className={styles.containerPrincipalBarber}>
        <div className={styles.containerButtonAndTitle}>
          <h1 className={styles.titleBarber}>Barbeiros</h1>
          <div className={styles.iconButtonEdit}>
            <DialogZeroMedia/>
            <ModalAddService/>
            <ModalVisuServico/>
            <ModalAddBarber />
            {/* <Button
              variant={"outline"}
              _hover={{ backgroundColor: "#dddddd" }}
              style={{
                borderColor: "black",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <MdDelete size={25} color="black" />
              Remover Barbeiro
            </Button> */}
          </div>
        </div>
        <div className={styles.containerCardsTeam}>
          {getBarber.map((item: itemBarber) => {
            return (
              <div key={item.ID} className={styles.containerCardEdit}>
                {/* <Image
                  src={item.IMG}
                  width={50}
                  height={30}
                  alt="foto barbeiros"
                
                  className={styles.fotoBarber}
                /> */}
                <Wrap>
                  <WrapItem>
                    <Avatar
                      size='2xl'
                      // name={item.NOME}
                      src={item.IMG}
                      
                    />
                  </WrapItem>

                </Wrap>
                <div className={styles.contextContent}>
                  <h3
                    style={{ fontFamily: "Montserrat , italic", fontSize: 20 }}
                  >
                    {item.NOME}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <div className={styles.editMobile}>
                      <StarsAv rating={item.MEDIA_AV} iconSize={'14'}/>
                    </div>

                    <p>{item.MEDIA_AV}</p>
                    <DialogDelete id={item.ID} Close={onClose} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
