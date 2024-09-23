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
import { FaCut } from "react-icons/fa";
import { SlScreenSmartphone } from "react-icons/sl";
import { IoIosAddCircle } from "react-icons/io";

import styles from '@/styles/NavigationMobile.module.css'


interface Props {
  onClick: () => void;
}

export default function ModalAcessPersonaliza({onClick}:Props) {
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

  useEffect(()=> {
    localStorage.removeItem('r_m');
    localStorage.removeItem('r_s');
    setPassRestrito("")
    setUserRestrito("") 
  },[])  
  



  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <div   className={styles.hoverBack} onClick={()=> {
        // router.push('/Barber')
        onOpen();
      }} >
                <div className={styles.iconEdit} >
                <IoIosAddCircle color="black"  size={23} />
                  <p className={styles.textItens} >Adicionar Logo/Imagem</p>
                </div>  

              </div>

      <Modal
        
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent marginTop={'25vh'} >
          <ModalHeader>Acesso somente do ADM</ModalHeader>
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
             Acessar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
