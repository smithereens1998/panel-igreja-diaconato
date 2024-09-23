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
  useToast,
} from "@chakra-ui/react";

import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
interface Props {
  id: any;
  // click: () => void;
}

export default function DialogZeroMedia({ id,  }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  function reloadIcon() {
    location.reload();
  }

  const resetMedia= async () => {
    try {
      const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/servico/resetMedia", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({}),
      });
  
      console.log(response);
      const data = await response.json();
      console.log(data);
      toast({
        title: "Sucesso",
        description: "As médias dos barbeiros foram resetadas",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Button colorScheme='red' onClick={onOpen}>
        Delete Customer
      </Button> */}
      <Button
        onClick={() => {
          onOpen()
        }}
        colorScheme="black"
        variant={"outline"}
        style={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}
        mr={3}
        gap={2}
      >
        <GrPowerReset size={23} color="white" />
        Resetar médias
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Serviço
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar esse serviço?
            </AlertDialogBody>

            <AlertDialogFooter gap={3} >
            <Button
           
                colorScheme="black"
                variant={"solid"}
                onClick={(()=> {
                  resetMedia();
                  onClose();
                })}
                ml={3}
                style={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}
              >
               Resetar
              </Button>

              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
             
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
