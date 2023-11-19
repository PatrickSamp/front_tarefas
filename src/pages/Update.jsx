import { Button, Container, Flex, Input, Item, Spacer } from "../styles";
import axios from "axios";
import { useState } from "react";
import { useEffect} from "react"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../styles/style.css"

function Update() {
  
  const [task, setTask] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
 
 const { id } = useParams();
 



   const update = async () => {
    const newTarefa = {
      "id": id,
      "tarefa": task
    }
    console.log(newTarefa)
    const response = await axios.post("http://localhost:8080/tarefa/update", newTarefa)
    if(response.status == 200){
      setIsUpdated(true);
    }else{
      return alert("ERRO AO ATUALIZAR ITEM");
    } /* return alert("ITEM ATUALIZADO COM SUCESSO"); */
    /* return alert("ERRO AO ATUALIZAR ITEM"); */
  }
  return (
    <Container>

    <h1 className="title">Informe a nova tarefa</h1>
      <Spacer />

        <Flex direction="row">
        <Input
          value={task}
          placeholder="Digite sua nova tarefa"
          onChange={(e) => setTask(e.target.value)} 
        />
        <Button onClick={update}>Adicionar</Button>
      </Flex>
      <Spacer margin="16px" />

      {isUpdated && (
        <div>
          <p>Item atualizado com sucesso!</p>
          {/* Se desejar, você pode substituir este botão por uma tag `<Link>` */}
          <button className="teste">
          <Link className="link" to="/">Ir para a lista de tarefas</Link>
          </button>
            
          
        </div>
      )}


      </Container>
  );
}

export default Update;
