import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  Textarea
  
} from "@chakra-ui/react";
import { ItemHoursCulto } from '@/Context/Provider';
import styles from "@/styles/Table.module.css";
import { MdDelete } from "react-icons/md";
import { ItemScheduling } from "@/Context/Provider";
import { useState, useEffect, useContext } from "react";
import AppContext from "@/Context/AppContext";
import ModalDeleteScheduling from "../Modals/ModalDeleteScheduling/ModalDeleteScheduling";
import { useToast } from "@chakra-ui/react";
import { itemMsgMember } from '@/Context/Provider';


export default function TableMsgMember() {
  const { msgMember , setMsgMember } = useContext(AppContext);
  const {searchText , setSearchText} = useContext(AppContext)
  const {searchNameBarber , setSearchNameBarber} = useContext(AppContext);
  const {searchDate , setSearchDate} = useContext(AppContext);
  const {searchBarberLocate , setSearchBarbertLocated} = useContext(AppContext);
  const {userRestrito , setUserRestrito} = useContext(AppContext);
  const {passRestrito , setPassRestrito} = useContext(AppContext);
  const {URLGetFaleConosco, setURLGetFaleConosco} = useContext(AppContext);
  const {URLDeleteUniqueCulto, setURLDeleUniqueCulto} = useContext(AppContext);
  const {searchDateMsg , setSearchDateMsg} = useContext(AppContext);
  
  
  useEffect(()=> {
    getMensagem()
    // Configura um intervalo para buscar os dados atualizados a cada 5 minutos
    const interval = setInterval(getMensagem, 1 * 60 * 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  },[]) 
  
const toast = useToast()
const formatDate = (dateString: any) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "pt-BR",
    options
  );
  return formattedDate;
};
const filteredItems = msgMember.filter(
  (item: any) =>
   
    item.DATA.includes(searchDateMsg)
);

  const getMensagem= async () => {
    try {

      const response = await fetch(
        `${URLGetFaleConosco}`
        );
        // const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers");
        const data = await response.json();
        console.log("Verificando requisição Agendados ", data);
        
        if (data.message === "ok") {
          const requestServico = data.result.map(
            (itemMsgMember: itemMsgMember) => ({
            // ID: localStorage.setItem('idAgendamento' , String(ItemScheduling.ID)),
            ID: itemMsgMember.ID,
            NOME: itemMsgMember.NOME,
            EMAIL: itemMsgMember.EMAIL,
            TELEFONE: itemMsgMember.TELEFONE, 
            MENSAGEM: itemMsgMember.MENSAGEM, 
            DATA: String(itemMsgMember.DATA), 
          })
        );

        setMsgMember([...requestServico]);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };





  return (

      <TableContainer
        style={{
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          borderRadius: 10,
          marginTop: "10vh",
          height: "50vh",
          overflowY: "auto",
          width: "80%",
        }}
        // className={styles.tableEdit}
      >
        <Table  colorScheme="blackAlpha" size="md">
          <Thead>
            <Tr>
              <Th>COD</Th>
              <Th>NOME</Th>
              <Th>E-MAIL</Th>
              <Th>TELEFONE</Th>
              <Th>MENSAGEM</Th>
              <Th>DATA</Th>
             
              
            </Tr>
          </Thead>
          <Tbody>
            {filteredItems.map((item: itemMsgMember , index: number) => {
              return (
               
                <Tr key={item.ID}>
                  <div 
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // marginTop: 15,
                    marginLeft: 10,
                  }}
                  
                  >
                   {/* <MdDelete
                    size={25}
                    color="red"
                    cursor={"pointer"}
                    onClick={()=> {
                      DeleteCulto(item.ID);
                    }}
                  /> */}

                   <Td isNumeric>{item.ID}</Td>
                  </div>
                  <Td>{item.NOME}</Td>
                  <Td>{`${item.EMAIL} `}</Td>
                  {/* <Td>{item.HORARIO2}</Td> */}
                  <Td>{item.TELEFONE}</Td>
                  <Td>
                    <Textarea disabled={true} size={'md'} value={item.MENSAGEM} />
                  </Td>
                  <Td>
                  <Td>{formatDate(item.DATA)}</Td>

                  </Td>
                    
                  
                  

                 
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
   
  );
}
