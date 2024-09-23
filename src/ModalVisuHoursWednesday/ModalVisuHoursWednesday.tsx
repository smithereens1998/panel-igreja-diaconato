import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { IoCut } from "react-icons/io5";
import { TbCurrencyReal } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import AppContext from "@/Context/AppContext";
import { useState, useEffect, useContext } from "react";
import { IoTime } from "react-icons/io5";
import { itemBarber } from '../Context/Provider';
 interface PropsId {
   propsId: any; 
   
 }

export default function ModalVisuHoursWednesday({ propsId}: PropsId) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getBarber, setGetBarber } = useContext(AppContext);
const toast = useToast();
 
  const [ barberName ,setBarberName] = useState("")
  const [dayWednesday , setDayWednesday ] = useState("")
  const [idDelete , setIdDelete] = useState("")

  const getTimeMonday = async () => {
    try {
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers"
      );
      const data = await response.json();
  
      if (data.message === "sucesso") {
        // Filtra os dados do barbeiro específico usando propsId
        const barber = data.servico.find(
          (item: itemBarber) => item.ID === propsId
        );
  
        if (barber) {
          // Define o nome do barbeiro no estado
          setBarberName(barber.NOME);
          // Atribui os horários de segunda-feira ao estado dayMonday
          const rep = barber.QUARTA.replace(
            /,/g,
            ""
          ).replace(/\./g, "");
  
          // Extrai os horários usando uma expressão regular
          const matches = rep.match(/\d{2}:\d{2}/g);
  
          // Formata os horários em colunas
          const formattedHours = [];
          for (let i = 0; i < matches.length; i += 2) {
            const start = matches[i];
            const end = matches[i + 1];
            formattedHours.push(
              <div key={`${start}-${end}`}>
                {`${start} até ${end}`}
              </div>
            );
          }
  
          // Atualiza o estado com os horários formatados
          setDayWednesday(formattedHours);
    
        }
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  
  
  useEffect(() => {
    // Chama getTimeMonday somente quando propsId mudar
    getTimeMonday();
   
  }, [propsId ]); // Adiciona propsId como uma dependência

  
  async function deleteHours() {
    try {
      
      
      const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/servico/deleteWednesdayDay", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          ID: propsId,
          
        }),
      });
      console.log(response);
      const data = await response.json();
      console.log("Verificando o Data " , data.ID);
      if (data.message === "sucesso" || dayWednesday !== "") {
        // Filtra os dados do barbeiro específico usando propsId
        
        
        const barber = data.servico.find(
          (item: itemBarber) => item.ID === propsId
        );
 
          setIdDelete(barber.ID);
          toast({
            title: "Sucesso",
            description: "Horários Deletados com sucesso!",
            status: "success",
            duration: 7000,
            isClosable: true,
            position: "bottom-left",
          }); 
                     
      } else if(dayWednesday === "") {
        toast({
          title: "error",
          description: "Não possui horários para ser deletado",
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
        
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "sucesso",
        description: "horários deletado",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "bottom-left",
      });
      reloadReq()
    }
  }
  
  
  function reloadReq () {
    location.reload();
  }

  
  return (
    <>
      <Button
        onClick={()=> {
          onOpen()
          propsId
        }}
        marginRight={"1vw"}
        variant={"solid"}
        style={{
          backgroundColor: "#1dc9ec",
          color: "white",
          fontWeight: "bold",
        }}
      >
      <IoTime  color="white" size={23} />

        Visualizar Horários
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Horários de Quarta-feira</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {/* {teste.map((item: itemBarber, index: any) => ( */}
          {dayWednesday !== ''  ?
          <div style={{display: 'flex' , flexDirection: 'column' , justifyContent: 'center' , alignItems: 'center' , gap: 10}} >
          <h1 style={{textAlign: "center" , fontSize: 20 , fontWeight: "bold" }}> <span style={{textAlign: "center" , fontSize: 20   }}  >Barbeiro</span>  {barberName}</h1>  
          <p  style={{fontSize: 18 , fontWeight: 'bold' , color: "gray"  }}  >{dayWednesday}</p> 
         </div>
         :
         <p style={{fontSize: 18 , fontWeight: 'bold' , textAlign: 'center'}} >Não possui horários</p>  
        }
                  
                {/* ))} */}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                // createService();
                deleteHours()
                onClose();
                // addHours()
              }}
              colorScheme="black"
              variant={"solid"}
              style={{
                backgroundColor: "#e72525",
                color: "white",
                fontWeight: "bold",
              }}
              mr={3}
            >
              Limpar todos os horários
            </Button>
            <Button style={{backgroundColor: "black" , color: "white" , fontWeight: 'bold'}} variant="solid" onClick={onClose}>
              voltar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
