import { useState, useContext, useEffect } from "react";
import styles from "@/styles/EditHours.module.css";
import AppContext from "../Context/AppContext";
import { itemBarber } from "../Context/Provider";
import { Navigationmobile } from "../Components/NavigationMobile/NavigationMobile";
import { useRouter } from "next/router.js";
import {
  Button,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import ModalAddBarber from "../Components/ModalAddBarber/ModalAddBarber";
import ModalArtigo2 from "../Components/ModalArtigo2/ModalArtigo2";
import ModalArtigo3 from "../Components/ModalArtigo3/ModalArtigo3";
import DialogDelete from "../Components/DialogDelete/DialogDelete";
import DialogDelete2 from "../Components/DialogDelete2/DialogDelete2";
import DialogDelete3 from "../Components/DialogDelete3/DialogDelete3";
import ModalNotice from "../Components/ModalNotice/ModalNotice";
import DialogDeleteNotice from '../Components/DialogDeleteNotice/DialogDeleteNotice';
import DialogDeleteNotice3 from '../Components/DialogDeleteNotice3/DialogDeleteNotice3';
import DialogDeleteNotice2 from '../Components/DialogDeleteNotice2/DialogDeleteNotice2';
import ModalNotice2 from "../Components/ModalNotice2/ModalNotice2";
import ModalNotice3 from "../Components/ModalNotice3/ModalNotice3";
import ModalVideo from '../Components/ModalVideo/ModalVideo';
import ModalVideo2 from '../Components/ModalVideo2/ModalVideo2';
import ModalVideo3 from '../Components/ModalVideo3/ModalVideo3';
import DialogDeleteVideo from '../Components/DialogDeleteVideo/DialogDeleteVideo';
import DialogDeleteVideo2 from '../Components/DialogDeleteVideo2/DialogDeleteVideo2';
import DialogDeleteVideo3 from '../Components/DialogDeleteVideo3/DialogDeleteVideo3';
import ModalGalery from '../Components/ModalGalery/ModalGalery';
import ModalGalery2 from '../Components/ModalGalery2/ModalGalery2';
import ModalGalery3 from '../Components/ModalGalery3/ModalGalery3';
import DialogDeleteGalery from '../Components/DialogDeleteGalery/DialogDeleteGalery';
import DialogDeleteGalery2 from '../Components/DialogDeleteGalery2/DialogDeleteGalery2';
import DialogDeleteGalery3 from '../Components/DialogDeleteGalery3/DialogDeleteGalery3';
import ModalNiver from '../Components/ModalNiver/ModalNiver';
import ModalHours from '../Components/ModalHours/ModalHours';
import ModalLeader from '../Components/ModalLeader/ModalLeader';


export default function EditHours() {
  
  const { getBarber, setGetBarber } = useContext(AppContext);
  const router = useRouter();
  const [hoursData, setHoursData] = useState<{ [key: number]: any }>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const savedUser = localStorage.getItem("e_m");
    const savedPassword = localStorage.getItem("p_s");
    if (!savedUser || !savedPassword) {
      router.push("/NotFound");
    }
  }, [router]);

  const toast = useToast();

  return (
    <>
      <Navigationmobile />
      <div className={styles.containerPrincipalHours}>
        {/* <h1 className={styles.titleHours}>Editar Horário</h1> */}
        <Tabs>
          <TabList style={{ backgroundColor: "#c6c4c436", borderRadius: 5 ,  overflowX: 'auto' , overflowY: 'hidden' }}>
            <Tab style={{fontSize: 10}} >Adicionar Artigos</Tab>
            <Tab style={{fontSize: 10}} >Adicionar Notícias</Tab>
            <Tab style={{fontSize: 10}} >Adicionar Vídeos</Tab>
            <Tab style={{fontSize: 10}} >Adicionar Fotos Galeria</Tab>
            <Tab style={{fontSize: 10}} >Área Membros</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Artigos 1
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalAddBarber />
                <DialogDelete id={""} Close={onClose} />
              </div>

              <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Artigos 2
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalArtigo2 />
                <DialogDelete2 Close={onClose} id={""} />
              </div>

              <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Artigos 3
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalArtigo3 />
                <DialogDelete3 Close={onClose} id={""} />
              </div>
            </TabPanel>
            <TabPanel>
              <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Notícias 1
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalNotice />
                <DialogDeleteNotice id={""} Close={onClose} />
              </div>
              <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Notícias 2
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalNotice2 />
                <DialogDeleteNotice2 id={""} Close={onClose} />
              </div>
              <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Notícias 3
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalNotice3 />
                <DialogDeleteNotice3 id={""} Close={onClose} />
              </div>
            </TabPanel>
            
            
            <TabPanel>
            <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Video 1
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalVideo/>
                <DialogDeleteVideo id={""} Close={onClose} />
              </div>
            <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Video 2
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalVideo2/>
                <DialogDeleteVideo2 id={""} Close={onClose} />

              </div>
            <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Video 3
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalVideo3/>
                <DialogDeleteVideo3 id={""} Close={onClose} />

              </div>

            </TabPanel>
            <TabPanel>
            <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Galeria de Fotos 1 
              </h3>
            <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalGalery/>
                <DialogDeleteGalery id={""} Close={onClose} />

              </div>
              <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Galeria de Fotos 2
              </h3>
            <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalGalery2/>
                <DialogDeleteGalery2 id={""} Close={onClose} />

              </div>
              <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Galeria de Fotos 3
              </h3>
            <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginBottom: "2vw",
                }}
              >
                <ModalGalery3/>
                <DialogDeleteGalery3 id={""} Close={onClose} />

              </div>

            </TabPanel>
            <TabPanel>
            <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
             Adicione Aniversáriantes
              </h3>
                <ModalNiver/>
            <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
             Adicione Horários dos cultos
              </h3>
                <ModalHours/>
            <h3
                style={{
                  marginBottom: "1vw",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
             Adicione Líderes da igreja 
              </h3>
                <ModalLeader/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}
