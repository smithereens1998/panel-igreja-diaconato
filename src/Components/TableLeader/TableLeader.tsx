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
  WrapItem,
  Avatar
  
} from "@chakra-ui/react";
import { ItemHoursCulto } from '@/Context/Provider';
import styles from "@/styles/Table.module.css";
import { MdDelete } from "react-icons/md";
import { ItemScheduling } from "@/Context/Provider";
import { useState, useEffect, useContext } from "react";
import AppContext from "@/Context/AppContext";
import ModalDeleteScheduling from "../Modals/ModalDeleteScheduling/ModalDeleteScheduling";
import { useToast } from "@chakra-ui/react";
import { ItemLeader } from '@/Context/Provider';


export default function TableLeader() {
  const { allLeaders , setAllLeaders } = useContext(AppContext);
 
  const {URLGetLeader, setURLGetLeader} = useContext(AppContext);
  const {URLDeleteUniqueLeader, setURLDeleUniqueLeader} = useContext(AppContext);
  
  
  useEffect(()=> {
    getAllLeaders()
    // Configura um intervalo para buscar os dados atualizados a cada 5 minutos
    const interval = setInterval(getAllLeaders, 1 * 60 * 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  },[]) 
  
const toast = useToast()
const formatDate = (dateString:any) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString('pt-BR', options);
  return formattedDate;
};


  const getAllLeaders= async () => {
    try {

      const response = await fetch(
        `${URLGetLeader}`
        );
        // const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers");
        const data = await response.json();
        console.log("Verificando requisição lideres ", data);
        
        if (data.message === "ok") {
          const requestServico = data.result.map(
            (ItemLeader: ItemLeader) => ({
            // ID: localStorage.setItem('idAgendamento' , String(ItemScheduling.ID)),
            ID: ItemLeader.ID,
            NOME: ItemLeader.NOME,
            CARGO: ItemLeader.CARGO,
            IMG: ItemLeader.IMG
             
          })
        );

        setAllLeaders([...requestServico]);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const DeleteLeader = async (id:number) => {
    try {
      const response = await fetch(`${URLDeleteUniqueLeader}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({
          ID: id,
        }),
      });

      console.log(response);
      const data = await response.json();
      console.log("Debugando requisição!!");
      console.log(data);

      if(data.message.includes("Ok")) {
          toast({
            title: "Sucesso",
            description: "Deletado com sucesso!",
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "bottom-left",
          });
        }

    } catch (error) {
      console.log(error);
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
              <Th>FOTO</Th>
              <Th>NOME</Th>
              <Th>CARGO</Th>
             
              
            </Tr>
          </Thead>
          <Tbody>
            {allLeaders.map((item: ItemLeader , index: number) => {
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
                   <MdDelete
                    size={25}
                    color="red"
                    cursor={"pointer"}
                    onClick={()=> {
                      DeleteLeader(item.ID);
                    }}
                  />
                   <Td isNumeric>{item.ID}</Td>
                  </div>
                  <Td>
                    {/* {item.IMG} */}
                    <WrapItem>
                       <Avatar size='md' name='Ryan Florence' src={item.IMG}/>{' '}
                  </WrapItem>
                  </Td>
                  <Td>{`${item.NOME}`}</Td>
                  <Td>{item.CARGO}</Td>
                 
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
   
  );
}
