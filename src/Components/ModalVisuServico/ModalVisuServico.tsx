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
import TableServiceVisu from "../TableServiceVisu/TableServiceVisu"; 
export default function ModalVisuServico() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // const {nameService , setNameService} = useContext(AppContext);
  // const {priceService , setPriceService} = useContext(AppContext);
  // const {timeService , setTimeService} = useContext(AppContext);
  const toast = useToast();



  



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
        <IoCut size={25} color="white" />
        Visualizar Serviços
      </Button>

      <Modal size={"5xl"}  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Serviços</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
         
           <TableServiceVisu/>
          </ModalBody>

         
        </ModalContent>
      </Modal>
    </>
  );
}
