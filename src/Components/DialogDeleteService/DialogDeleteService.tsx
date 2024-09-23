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

interface Props {
  id: any;
  click: () => void;
}

export default function DialogDeleteService({ id, click }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  function reloadIcon() {
    location.reload();
  }

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
      >
        Delete
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
                onClick={click}
                ml={3}
                style={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}
              >
                Deletar
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
