
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
  Button,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import styles from "@/styles/TableServiceVisu.module.css";
import { useState , useContext , useEffect } from 'react';
import AppContext from '@/Context/AppContext';
import { ServicesTableProps } from '@/Context/Provider';
import DialogDeleteService from '../DialogDeleteService/DialogDeleteService';
import ModalEditService from '../ModalEditService/ModalEditService';
import { useRouter } from 'next/router';
import { PushId } from '@/Context/Provider';


export default function TableServiceVisu() {
const {renderServices , setRenderServices} = useContext(AppContext)
const { isOpen, onOpen, onClose } = useDisclosure();
const [id, setId] = useState('');
const [teste, setTeste] = useState('');
const toast = useToast()
const router = useRouter()
const {nameService , setNameService} = useContext(AppContext);
  const {priceService , setPriceService} = useContext(AppContext);
  const {timeService , setTimeService} = useContext(AppContext);
const {pushIdService , setPushIdService} = useContext(AppContext);


const getTableService = async (id:any) => {
  try {
    const response = await fetch(
      "https://boxer-relieved-impala.ngrok-free.app/servico/servicoItem"
    );
    const data = await response.json();
    console.log(data);

    if (data.message === "sucesso") {
      const requestServico = data.servico.map(
        (ServicesTableProps: ServicesTableProps) => ({
          ID: ServicesTableProps.ID,
          SERVICO: ServicesTableProps.SERVICO,
          PRECO: ServicesTableProps.PRECO.toLocaleString("pr-BR", {
            style: "currency",
            currency: "BRL",
          }),
          TIME: ServicesTableProps.TIME
        })
      );

      setRenderServices([...requestServico]);
      localStorage.setItem('serviceId', id);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};




useEffect(() => {
  const savedId = localStorage.getItem('serviceId');
  if (savedId) {
    setId(savedId);
  } else {
    setId('');
  }
  getTableService(id);
}, []);


  const DeleteServiceTable = async (id: any) => {
    try {
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/servico/deleteServiceTable",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
          body: JSON.stringify({
            TIPO: "deleteService",
            ID: id,
          }),
        }
      );

      console.log(response);
      const data = await response.json();
      console.log("Debugando requisição!!");
      console.log(data);
      // Refresh the scheduling data after deletion
      if (data.message.includes("Servico deletado")) {
        toast({
          title: "Sucesso",
          description: "Serviço deletado com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        reloadIcon();
       
      } else {
        toast({
          title: "Error",
          description: "Serviço não encontrado",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function reloadIcon() {
    location.reload();
  }


  return (
    <TableContainer style={{ overflowY: 'auto', maxHeight: '65vh'}} >
  <Table size='lg' >
    <Thead>
      <Tr>
        <Th isNumeric>ID</Th>
        <Th>Serviço</Th>
        <Th>Preço</Th>
        <Th>Tempo</Th>
      </Tr>
    </Thead>
    <Tbody  >
      {renderServices.map((item: ServicesTableProps)=> {
        return (
          <Tr >
            <Td isNumeric>{item.ID}</Td>
            <Td>{item.SERVICO}</Td>
            <Td>{item.PRECO}</Td>
            <Td>{item.TIME}</Td>
            <div className={styles.containerButtonsTable} >
            <DialogDeleteService  click={(()=> {
             DeleteServiceTable(item.ID)
            //  router.push('/Barber')
            })} />
         <ModalEditService editClick={(()=> {
           getTableService(item.ID)
           onOpen()
          
                    
         console.log("Verificando ID do button" , item.ID);
         })} />
            </div>
          </Tr>
        )
      })}
    </Tbody>
    
  </Table>
</TableContainer>
  )
}


