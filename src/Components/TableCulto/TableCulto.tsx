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
  
} from "@chakra-ui/react";
import { ItemHoursCulto } from '@/Context/Provider';
import styles from "@/styles/Table.module.css";
import { MdDelete } from "react-icons/md";
import { ItemScheduling } from "@/Context/Provider";
import { useState, useEffect, useContext } from "react";
import AppContext from "@/Context/AppContext";
import ModalDeleteScheduling from "../Modals/ModalDeleteScheduling/ModalDeleteScheduling";
import { useToast } from "@chakra-ui/react";



export default function TableCulto() {
  const { hoursCulto , setHoursCulto } = useContext(AppContext);
  const {searchText , setSearchText} = useContext(AppContext)
  const {searchNameBarber , setSearchNameBarber} = useContext(AppContext);
  const {searchDate , setSearchDate} = useContext(AppContext);
  const {searchBarberLocate , setSearchBarbertLocated} = useContext(AppContext);
  const {userRestrito , setUserRestrito} = useContext(AppContext);
  const {passRestrito , setPassRestrito} = useContext(AppContext);
  const {URLGetCulto , setURLGetCulto} = useContext(AppContext);
  const {URLDeleteUniqueCulto, setURLDeleUniqueCulto} = useContext(AppContext);
  
  
  useEffect(()=> {
    getCulto()
    // Configura um intervalo para buscar os dados atualizados a cada 5 minutos
    const interval = setInterval(getCulto, 1 * 60 * 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  },[]) 
  
const toast = useToast()
const formatDate = (dateString:any) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString('pt-BR', options);
  return formattedDate;
};


  const getCulto= async () => {
    try {

      const response = await fetch(
        `${URLGetCulto}`
        );
        // const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers");
        const data = await response.json();
        console.log("Verificando requisição Agendados ", data);
        
        if (data.message === "ok") {
          const requestServico = data.result.map(
            (ItemHoursCulto: ItemHoursCulto) => ({
            // ID: localStorage.setItem('idAgendamento' , String(ItemScheduling.ID)),
            ID: ItemHoursCulto.ID,
            DIA: ItemHoursCulto.DIA,
            HORARIO: ItemHoursCulto.HORARIO,
            HORARIO2: ItemHoursCulto.HORARIO2, 
            CULTO: ItemHoursCulto.CULTO, 
          })
        );

        setHoursCulto([...requestServico]);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const DeleteCulto = async (id:number) => {
    try {
      const response = await fetch(`${URLDeleteUniqueCulto}`, {
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
              <Th>DIA</Th>
              <Th>HORARIO</Th>
              <Th>CULTO</Th>
             
              
            </Tr>
          </Thead>
          <Tbody>
            {hoursCulto.map((item: ItemHoursCulto , index: number) => {
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
                      DeleteCulto(item.ID);
                    }}
                  />

                   <Td isNumeric>{item.ID}</Td>
                  </div>
                  <Td>{item.DIA}</Td>
                  <Td>{`${item.HORARIO}  -  ${item.HORARIO2} `}</Td>
                  {/* <Td>{item.HORARIO2}</Td> */}
                  <Td>{item.CULTO}</Td>
                  
                  {/* <Td>{item.icon}</Td> */}

                 
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
   
  );
}
