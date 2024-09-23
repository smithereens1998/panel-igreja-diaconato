import styles from "@/styles/Scheduling.module.css";
import TableNiver from "../Components/TableNiver/TableNiver";
import { Navigationmobile } from "@/Components/NavigationMobile/NavigationMobile";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import AppContext from "@/Context/AppContext";
import { itemBarberias } from "@/Context/Provider";
import { FiRefreshCcw } from "react-icons/fi";
import { useRouter } from "next/router";
import ModalMensagemUser from '../Components/ModalMensagemUser/ModalMensagemUser';
import ModalMensagemExterna from '../Components/ModalMensagemExterna/ModalMensagemExterna';
export default function TabsNotification() {
  const { searchBarberLocate, setSearchBarbertLocated } =
    useContext(AppContext);
  const { usuario, setUsuario } = useContext(AppContext);

  const { senha, setSenha } = useContext(AppContext);
  const router = useRouter();

  // useEffect(() => {
  //   const interval = setInterval(reloadIcon, 5 * 60 * 1000); // 5 minutos em milissegundos
  //   return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  // }, []);

  // Função para obter a data de hoje
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Mês é base 0
    let day = today.getDate();

    // Adiciona um zero à frente do mês e do dia, se necessário
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  // Obtém a data atual
  const currentDate = getCurrentDate();

  // Calcula a data 7 dias a partir da data atual
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
  const maxDate = sevenDaysLater.toISOString().split("T")[0];

  // useEffect(() => {
  //   if (!usuario || !senha) {
  //     router.push('/NotFound');
  //   }
  // }, [usuario, senha, router]);

  useEffect(() => {
    const savedUser = localStorage.getItem("e_m");
    const savedPassword = localStorage.getItem("p_s");
    if (!savedUser || !savedPassword) {
      router.push("/NotFound");
    }
  }, [router]);

  //   const filteredItems = scheduling.filter((item:any) =>
  //   item.NOME.toLowerCase().includes(searchText.toLowerCase())
  // );

  function reloadIcon() {
    location.reload();
  }
  return (
    <>
      <Navigationmobile />
      <div className={styles.contaienerPrincipalScheduling}>
        <h1 className={styles.titleScheduling}>Notificações</h1>
        <Tabs isFitted variant="enclosed"  >
          <TabList color={'black'} borderColor={"black"}  mb="1em">
            <Tab  >Notificar dentro do App</Tab>
            <Tab>Notificar fora do App</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             <ModalMensagemUser/>
            </TabPanel>
            <TabPanel>
              <ModalMensagemExterna/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}
