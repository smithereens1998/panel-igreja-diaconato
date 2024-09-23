import styles from "@/styles/Scheduling.module.css";
import TableNiver from '../Components/TableNiver/TableNiver';
import { Navigationmobile } from "@/Components/NavigationMobile/NavigationMobile";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import AppContext from "@/Context/AppContext";
import { itemBarberias } from "@/Context/Provider";
import { FiRefreshCcw } from "react-icons/fi";
import { useRouter } from "next/router";

export default function Niver() {
  const { scheduling, setScheduling } = useContext(AppContext);
  const { barbearias, setBarbearias } = useContext(AppContext);
  const {searchTextNiver , setSearchTextNiver} = useContext(AppContext)
  const {searchNameBarberNiver , setSearchNameBarberNiver} = useContext(AppContext);
  const {searchDateNiver , setSearchDateNiver} = useContext(AppContext);
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
        <h1 className={styles.titleScheduling}>Aniversáriantes</h1>
        <img src="" alt="" />
        <div className={styles.containerSearch}>
          <Stack width={400} spacing={4}>
            <InputGroup className={styles.inputGroupEdit}>
              <InputLeftElement
                className={styles.editIconAgend}
                pointerEvents="none"
              >
                <IoSearch
                  className={styles.iconDisabled}
                  color="black"
                  size={20}
                />
              </InputLeftElement>
              <Input
                className={styles.input}
                style={{ border: "1px solid black", width: "80%" }}
                focusBorderColor="black"
                type="text"
                placeholder="Buscar por Nome do Membro"
                onChange={(e) => setSearchTextNiver(e.target.value)}
                value={searchTextNiver}
              />
            </InputGroup>
          </Stack>
          <Stack width={400} spacing={4}>
            <InputGroup className={styles.inputGroupEdit}>
              <InputLeftElement pointerEvents="none">
                <IoSearch
                  className={styles.iconDisabled}
                  color="black"
                  size={20}
                />
              </InputLeftElement>
              <Input
                className={styles.input}
                style={{ border: "1px solid black", width: "80%" }}
                focusBorderColor="black"
                type="text"
                placeholder="Buscar por numero de Telefone"
                value={searchNameBarberNiver}
                onChange={(e) => setSearchNameBarberNiver(e.target.value)}
              />
            </InputGroup>
          </Stack>
          <Stack width={400} spacing={4}>
            <InputGroup className={styles.inputGroupEdit}>
              <Input
                className={styles.input}
                style={{ border: "1px solid black", width: "80%" }}
                focusBorderColor="black"
                type="date"
                // min={currentDate} // Definindo a data mínima como a data atual
                // max={maxDate} // Definindo a data máxima como 7 dias a partir da data atual
                placeholder="Buscar por data do agendamento"
                value={searchDateNiver || currentDate} // Usar a data atual se searchDate estiver vazio
                onChange={(e) => setSearchDateNiver(e.target.value)}
              />
            </InputGroup>
          </Stack>
         
          <FiRefreshCcw
            className={styles.iconRelad}
            onClick={() => {
              reloadIcon();
            }}
            cursor={"pointer"}
            size={50}
            color="black"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TableNiver />
        </div>
      </div>
    </>
  );
}
