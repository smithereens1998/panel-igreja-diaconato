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
  Textarea
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { IoCut } from "react-icons/io5";
import { TbCurrencyReal } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import AppContext from "@/Context/AppContext";
import { SlCalender } from "react-icons/sl";
import { useState , useEffect , useContext } from "react";
import { itemToken } from '../../Context/Provider';


export default function ModalMensagemExterna() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [sound , setSound] = useState("default");
  const [title , setTitle] = useState("");
  const [body , setBody] = useState("");
  
  const {allsToken , setAllsToken} = useContext(AppContext);
 
  const {URLToken , setUrlToken} = useContext(AppContext);
  const toast = useToast();

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


  

  const getAllToken= async () => {
    try {
      const response = await fetch(`${URLToken}`);
      // const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers");
      const data = await response.json();
      console.log("Verificando requisição de tokens ", data);

      if (data.message === "ok") {
        setAllsToken(data.result);
      }
        

    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(()=> {
    getAllToken()
    console.log("Verificando o token " , allsToken);
    
  },[])



  // Obtém a data atual
  const currentDate = getCurrentDate();


  async function createMensagemEx() {
    try {
      if (allsToken === '' || allsToken === undefined || allsToken === null || title === ""|| body === "") {
        toast({
          title: "Erro",
          description: "Preencha todos os campos para salvar!",
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
        return; 
      }
      const response = await fetch(`https://boxer-relieved-impala.ngrok-free.app/allDiaconato/send-notifications`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          to: String(allsToken),
		      sound: sound,
		      title: title,
		      body: body,
         
          
        }),
      });
      console.log(response);
      const data = await response.json();
      console.log("Debugando requisição!!");
      console.log(data);
      
      if (data.message.includes("ok")) {
        toast({
          title: "Sucesso",
          description: "Notificação enviada para todos os usuários!",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom-left",
        });
        onClose();
        // reloadReq()

      } else {
        toast({
          title: "Sucesso",
          description: "Notificação enviada para todos os usuários!",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom-left",
        });
      }
      //prox validação fazer criando o usuario
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro na api ao salvar a notificação",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }


  

  return (
    <>
      <Button
        onClick={onOpen}
        marginRight={"2vw"}
        variant={"solid"}
        style={{
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <IoMdAdd size={25} color="white" />
       Notificação fora do App
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notificações do Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
            <InputGroup>
              <Input value={sound} style={{display: "none"}} onChange={(e)=> setSound(e.target.value)} focusBorderColor="black" type="text" placeholder="Título da Notificação" size={'lg'} />
            </InputGroup>
            <InputGroup>
              <Input value={allsToken} style={{display: "none"}} onChange={(e)=> setAllsToken(e.target.value)} focusBorderColor="black" type="text" size={'lg'} />
            </InputGroup>
            
            <InputGroup>
              <Input value={title} onChange={(e)=> setTitle(e.target.value)} focusBorderColor="black" type="text" placeholder="Título da Notificação" size={'lg'} />
            </InputGroup>
            
            <InputGroup>
                <Textarea size={'lg'} value={body} onChange={(e)=> setBody(e.target.value)} focusBorderColor="black" type="text" placeholder="Mensagem de Notificação para o usuário" />
            </InputGroup>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=> {
               createMensagemEx()
              onClose();
              // setNameService("");
              // setPriceService("");
              // setTimeService("");
            }} colorScheme="black" variant={'solid'} style={{backgroundColor: "black" , color: 'white' , fontWeight: 'bold'}} mr={3}>
              Salvar
            </Button>
            <Button variant="outline" onClick={onClose} >Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
