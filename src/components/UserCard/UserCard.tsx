import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api/api";
import { User } from "../../models/UserModel";

import { Container, Content } from "./styles";

interface Props {
  user: User;
}
export function UserCard({ user }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [value, setValue] = useState(user.name);

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    () => api.updateUserName(user.id, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user-list");
        onClose();
      },
    }
  );

  return (
    <>
      <Container>
        <Image roundedCircle src={user.avatar} />
        <Content>
          <h3>{user.name}</h3>
          <Button
            onClick={() => {onOpen()}}
            style={{ width: "100px" }}
            variant="primary"
          >
            editar
          </Button>
        </Content>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
       <ModalOverlay />
        <ModalContent>
         <ModalHeader>Atualizar Usuário</ModalHeader>
          <ModalCloseButton />
         <ModalBody> 
        <Input
          onChange={(e) => setValue(e.target.value)}
          type="text"
          value={value}
         /> 
        </ModalBody>
         <ModalFooter>
          <Button mr={6} onClick={onClose}>
            Fechar
          </Button>
         <Button variant="primary" onClick={() => mutate()}>
        {isLoading ? "Carrendo..." : "Salvar"}
       </Button>   
     </ModalFooter>
    </ModalContent>
  </Modal>
    </>
  );
}
