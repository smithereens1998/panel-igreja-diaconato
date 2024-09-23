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
} from "@chakra-ui/react";
import { useState , useContext , useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import AppContext from "@/Context/AppContext";
import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";


interface Props {
  onClick: () => void;
}

export default function ModalDeleteScheduling({onClick}:Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { scheduling, setScheduling } = useContext(AppContext);
  const {userRestrito , setUserRestrito} = useContext(AppContext);
  const {passRestrito , setPassRestrito} = useContext(AppContext);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // New state
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast()
  const router = useRouter()

  const handleDeleteItem = (indexToDelete: any) => {
    const updatedItem = scheduling.filter((item: any, index: any) => index !== indexToDelete);
    setScheduling(updatedItem);
  };
  



  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      
        <MdDelete
          size={25}
          color="red"
          cursor={"pointer"}
          onClick={() => onOpen()}
        />

      <Modal
        
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent marginTop={'25vh'} >
          <ModalHeader>Acesso somente do ADM para deletar </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Usuario</FormLabel>
              <Input value={userRestrito} onChange={(e) => setUserRestrito(e.target.value)}  focusBorderColor="black" type="text" ref={initialRef} placeholder="Digite seu usuário" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input  value={passRestrito} onChange={(e) => setPassRestrito(e.target.value)} focusBorderColor="black" type="password" placeholder="Digite sua senha!" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button  onClick={onClick}
            backgroundColor={'black'} color={'white'} variant={'solid'} mr={3}>
             Deletar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
