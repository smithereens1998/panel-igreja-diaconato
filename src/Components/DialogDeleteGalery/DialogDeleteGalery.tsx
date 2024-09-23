import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { useState , useContext } from 'react';
import AppContext from '../../Context/AppContext';

interface Props {
  id: any
  Close: () => void;
}

export default function DialogDeleteGalery({ id, Close }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast()


  const {URLDeleteGaleria, setURLDeleteGaleria}= useContext(AppContext);

  async function deleteGaleria() {
    try {
      
      
      const response = await 
      // `https://boxer-relieved-impala.ngrok-free.app/allDiaconato/upArtigo`
      fetch(`${URLDeleteGaleria}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        
      });
  
      console.log(response);
      const data = await response.json();
      console.log(data);
    

      
      if (data.message.includes("Ok")) {
        onClose() 
          toast({
            title: "Sucesso",
            description: "Galeria deletada com sucesso!",
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
      
     <Button onClick={()=> {
              // createBarber()
              onOpen()
            }} colorScheme="red" variant={'solid'}  mr={3} style={{backgroundColor: "red" , color: 'white' , fontWeight: 'bold'}} >
              Remover fotos Galeria 1
            </Button> 
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Remover fotos da  Galeria 
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja Deletar todas as fotos da galeria 1 do Aplicativo?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={()=> {
                onClose()
                deleteGaleria()
                // DeleteBarber()
              }} ml={3}>
                Remover
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
