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



export default function ModalMensagemUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [msgUser , setMsgUser] = useState("");
  const {priceService , setPriceService} = useContext(AppContext);
  const {URLNotification, setURLNotification} = useContext(AppContext);
  const {timeService , setTimeService} = useContext(AppContext);
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

  // Obtém a data atual
  const currentDate = getCurrentDate();


  async function createMensagem() {
    try {
      if (msgUser === '') {
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
      const response = await fetch(`https://boxer-relieved-impala.ngrok-free.app/allDiaconato/notify`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          MENSAGEM: msgUser,
		      DATA: currentDate,
         
          
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
        marginRight={"1vw"}
        variant={"solid"}
        style={{
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
        }}
      >
      <IoMdAdd size={25} color="white" />
       Notificação dentro do App
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notificações do Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <InputGroup>
                {/* <InputLeftElement pointerEvents="none">
                  
                  <MdSms name="sms" size={25} color="black" />
                </InputLeftElement> */}
                <Textarea size={'lg'} value={msgUser} onChange={(e)=> setMsgUser(e.target.value)} focusBorderColor="black" type="text" placeholder="Mensagem de Notificação para o usuário" />
              </InputGroup>

              <InputGroup>
                {/* <InputLeftElement
                
                >
                  <SlCalender size={25} color="black" />
                 
                </InputLeftElement> */}
                <Input disabled={true} type='date' focusBorderColor="black"  value={currentDate} onChange={(e)=> setPriceService(e.target.value)} />
                <InputRightElement>
                  {/* <CheckIcon color='green.500' /> */}
                </InputRightElement>
        

              </InputGroup>
             
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=> {
              createMensagem()
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
