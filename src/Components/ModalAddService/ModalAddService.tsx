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
  useToast
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { IoCut } from "react-icons/io5";
import { TbCurrencyReal } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import AppContext from "@/Context/AppContext";
import { useState , useEffect , useContext } from "react";
 
export default function ModalAddService() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const {nameService , setNameService} = useContext(AppContext);
  const {priceService , setPriceService} = useContext(AppContext);
  const {timeService , setTimeService} = useContext(AppContext);
  const toast = useToast();



  async function createService() {
    try {
      if (nameService === '' || priceService === '' || timeService === '') {
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
      const response = await fetch(`https://boxer-relieved-impala.ngrok-free.app/servico/insertServiceCut`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          SERVICO: nameService,
		       PRECO: priceService,
           TIME: timeService,
          
        }),
      });
      console.log(response);
      const data = await response.json();
      console.log("Debugando requisição!!");
      console.log(data);
      
      if (data.message.includes("Serviço adicionado!")) {
          toast({
            title: "Sucesso",
            description: "Serviço adicionado!",
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "bottom-left",
          });
          onClose();
          // reloadReq()

      } else {
        toast({
          title: "Erro",
          description: "Houve algum erro inesperado tente novamente",
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
      }
      //prox validação fazer criando o usuario
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro na api ao salvar o serviço",
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
        Adicionar serviços
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Serviço</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  {/* <PhoneIcon color='gray.300' /> */}
                  <IoCut size={25} color="black" />
                </InputLeftElement>
                <Input value={nameService} onChange={(e)=> setNameService(e.target.value)} focusBorderColor="black" type="text" placeholder="Nome do corte" />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  // pointerEvents="none"
                  // color="gray.300"
                  // fontSize="1.2em"
                >
                  <TbCurrencyReal size={25} color="black" />
                  {/* $ */}
                </InputLeftElement>
                <Input focusBorderColor="black"  value={priceService} onChange={(e)=> setPriceService(e.target.value)}  placeholder="Preço" />
                <InputRightElement>
                  {/* <CheckIcon color='green.500' /> */}
                </InputRightElement>
        

              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  // pointerEvents="none"
                  // color="gray.300"
                  // fontSize="1.2em"
                >
                  <MdAccessTimeFilled size={25} color="black" />
                  {/* $ */}
                </InputLeftElement>
                <Input focusBorderColor="black" value={timeService} onChange={(e)=> setTimeService(e.target.value)} placeholder="Tempo médio do corte" />
                <InputRightElement>
                  {/* <CheckIcon color='green.500' /> */}
                </InputRightElement>
        

              </InputGroup>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=> {
              createService();
              onClose();
              setNameService("");
              setPriceService("");
              setTimeService("");
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
