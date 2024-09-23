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
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Textarea,
  Image,
  InputGroup
  
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { useState , useContext } from "react";
import AppContext from "@/Context/AppContext";
import styles from "@/styles/ModalAddBarber.module.css";
import sizeOf from 'image-size';
import { useToast } from "@chakra-ui/react";

export default function ModalHours() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {imageVideo3, setImageVideo3}= useContext(AppContext);
  const {dayCult, setDayCult} = useContext(AppContext);
  const {timeStart, setTimeStart} = useContext(AppContext);
  const {timeEnd, setTimeEnd} = useContext(AppContext);
  const {typeCult , setTypeCult} = useContext(AppContext);
  const {URLPostHoursCulto, setURLPostHoursCulto} = useContext(AppContext);
  
  const toast = useToast()
  
  const initialRef = useRef(null);
  const finalRef = useRef(null);


  
  

  function reloadReq () {
    location.reload();
  }




  async function createHours() {
    try {
      
      if (dayCult === '' || typeCult === '' || timeStart === "" || timeEnd === "") {
        toast({
          title: "Erro",
          description: "Preencha todos os campos!",
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
        return; 
      }


      const response = await 
      // `https://boxer-relieved-impala.ngrok-free.app/allDiaconato/upArtigo`
      fetch(`${URLPostHoursCulto}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          DIA: dayCult,
          CULTO: typeCult,
          HORARIO: timeStart ,
          HORARIO2: timeEnd ,
        })  
      });
  
      console.log(response);
      const data = await response.json();
      console.log(data);
    

      
      if (data.message.includes("Ok")) {
        onClose() 
          toast({
            title: "Sucesso",
            description: "Horário de culto criado com sucesso!",
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "bottom-left",
          })

      } 
      //prox validação fazer criando o usuario
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro API",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }





  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
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
        Adicionar Horário dos cultos
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicione aqui os horários dos cultos </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Dia do culto </FormLabel>
              <Input value={dayCult} onChange={(e) => setDayCult(e.target.value)} focusBorderColor="black" ref={initialRef} placeholder="Digite aqui o dia do culto" />
            </FormControl>

            <FormControl>
              <FormLabel>Culto de...</FormLabel>
              <Input value={typeCult} onChange={(e) => setTypeCult(e.target.value)} focusBorderColor="black" ref={initialRef} placeholder="Digite aqui o tipo de culto ex: Culto da Família"/>
            </FormControl>
            <InputGroup>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    marginTop: 20,
                    marginBottom: 20,
                    width: "100%",
                  }}
                  // key={colIndex}
                >
                  <div>
                    <Input
                      type="time"
                       value={timeStart}
                      onChange={(e) => setTimeStart(e.target.value)}

                    />
                  </div>
                  <p>Até</p>
                  <div>
                    <Input
                      type="time"
                       value={timeEnd}
                      onChange={(e) => setTimeEnd(e.target.value)}
                      

                    />
                  </div>
                </div>
              </InputGroup>
            
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=> {
              onClose()
              createHours()
              // createBarber()
            }} colorScheme="black" variant={'solid'}  mr={3} style={{backgroundColor: "black" , color: 'white' , fontWeight: 'bold'}} >
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
