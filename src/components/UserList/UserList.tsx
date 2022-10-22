import { useQuery } from "react-query";
import { api } from "../../api/api";
import { UserCard } from "../UserCard/UserCard";
import { Container } from "./styles";
export function UserList() {
  const { data, isError, isLoading } = useQuery("user-list", api.getUsers);

  return (
    <Container>
      <h1>Lista de Usuários</h1>
      {isLoading && <h3>Carregando...</h3>}
      {isError && <h3>Ocorreu algum problema :(</h3>}
      {data?.map((user) => (
        <UserCard user={user} />
      ))}
    </Container>
  );
}
