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
import { PushId } from "@/Context/Provider";
interface Props {
  id: any;
  click: () => void;
  editClick: () => void;
}

export default function ModalEditService({ id, click, editClick }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { nameService, setNameService } = useContext(AppContext);
  const { priceService, setPriceService } = useContext(AppContext);
  const { timeService, setTimeService } = useContext(AppContext);
  const { pushIdService, setPushIdService } = useContext(AppContext);
  const { nameServiceEdit, setNameServiceEdit } = useContext(AppContext);
  const { priceServiceEdit, setPriceServiceEdit } = useContext(AppContext);
  const { timeServiceEdit, setTimeServiceEdit } = useContext(AppContext);

  const toast = useToast();

  useEffect(() => {
    //  let push = localStorage.getItem("serviceId")
    // console.log("PUSH vindo do effect " , push);
    async function PushService() {
      try {
        let push = localStorage.getItem("serviceId");
        const response = await fetch(`https://boxer-relieved-impala.ngrok-free.app/servico/getPush`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            ID: push,
          }),
        });
        console.log(response);
        const data = await response.json();

        console.log("Foi pegado no storage o serviceId ", push);
        setNameServiceEdit(data.cut.SERVICO);
        setPriceServiceEdit(data.cut.PRECO);
        setTimeServiceEdit(data.cut.TIME);
        console.log("Verificando valor  do data Servico", priceServiceEdit);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    PushService();
  },[localStorage.getItem("serviceId")]);

  async function serviceUpdate() {
    try {
      let push = localStorage.getItem("serviceId");
      const response = await fetch(
        `https://boxer-relieved-impala.ngrok-free.app/servico/updateServiceTable`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            ID: push,
            SERVICO: nameServiceEdit,
            PRECO: priceServiceEdit,
            TIME: timeServiceEdit,
          }),
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if(data.message.includes("Serviço atualizado")) {
        toast({
          title: "Sucesso",
          description: "Serviço atualizado!",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom-left",
        });
        onClose()
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
    } catch (error) {
      console.log(error);
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
      <div
        onClick={() => {
          onOpen();
        }}
      >
        <Button
          onClick={editClick}
          colorScheme="blue"
          variant={"outline"}
          style={{
            backgroundColor: "#3b1ab3",
            color: "white",
            fontWeight: "bold",
          }}
          mr={3}
        >
          Editar
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Serviço</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <IoCut size={25} color="black" />
                </InputLeftElement>
                <Input
                  value={nameServiceEdit}
                  onChange={(e) => setNameServiceEdit(e.target.value)}
                  focusBorderColor="black"
                  type="text"
                  placeholder="Nome do corte"
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement>
                  <TbCurrencyReal size={25} color="black" />
                </InputLeftElement>
                <Input
                  focusBorderColor="black"
                  value={priceServiceEdit}
                  onChange={(e) => setPriceServiceEdit(e.target.value)}
                  placeholder="Preço"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement>
                  <MdAccessTimeFilled size={25} color="black" />
                </InputLeftElement>
                <Input
                  focusBorderColor="black"
                  value={timeServiceEdit}
                  onChange={(e) => setTimeServiceEdit(e.target.value)}
                  placeholder="Tempo médio do corte"
                />
              </InputGroup>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <div onClick={(()=> {
              serviceUpdate()
              setNameServiceEdit("");
              setPriceServiceEdit("");
              setTimeServiceEdit("");
            })} >
              <Button
                onClick={click}
                colorScheme="black"
                variant={"solid"}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "bold",
                }}
                mr={3}
              >
                Salvar
              </Button>
            </div>

            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
