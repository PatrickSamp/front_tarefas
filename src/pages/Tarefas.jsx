import { Button, Container, Flex, Input, Item, Spacer } from "../styles";
import axios from "axios";
import { useState } from "react";
import { useEffect} from "react"
import { Link } from "react-router-dom";




function Tarefas() {
  const [task, setTask] = useState("");
  const [listTask, setListTask] =  useState([]);


  useEffect(() => {
    fetchData(); // Chama a função assíncrona ao montar o componente
  }, []);



  const addTask =async () => {
    if (!task) return alert("Preencha uma tarefa");
    const newTask = {
      id: Math.random(),
      task: task,
      checked: false,
    };
    const newTarefa = {
      "tarefa": task
  }
    await axios.post("http://localhost:8080/tarefa/create", newTarefa);
    const response = await axios.get("http://localhost:8080/tarefa/readAll");
    setListTask(response.data)
    
    setTask("");
  };


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tarefa/readAll");
      console.log(response.data)
      setListTask(response.data)
    } catch (error) {
      console.error("Erro ao buscar dados:", error.message);
    }
  };



  const removeTask = async (id) => {
    //const newList = listTask.filter((task) => task.id !== id);
    //setListTask(newList);
    const newTarefa = {
      "id": id
  }
    await axios.post("http://localhost:8080/tarefa/delete", newTarefa);
    const response = await axios.get("http://localhost:8080/tarefa/readAll");
    setListTask(response.data)
  };

  const toggleChecked = async (id, checked) => {
    console.log("PASSOU " + id)
    const index = listTask.findIndex((task) => task.id === id);
    const newList = listTask;
    newList[index].checked = !checked;
    const t = await axios.get("http://localhost:8080/tarefa/readAll")
    console.log(t)
    setListTask([...newList]);
  };

  return (
    
    <Container>
      <h1 className="title">Tarefas</h1>
      <Spacer />

      <Flex direction="row">
        <Input
          value={task}
          placeholder="Digite sua tarefa"
          onChange={(e) => setTask(e.target.value)}
        />
        <Button onClick={addTask}>Adicionar</Button>
      </Flex>
      <Spacer margin="16px" />
      
      <ul>
        {listTask.map((task) => (
          <>
            <Item key={task.id}>
              <p>{task.tarefa}</p>
              <Flex direction="row">
              
              <Link to={`/Update/${task.id}`}>
                <button onClick={async () => await toggleChecked(task.id, task.checked)}>
                <i class='bx bxl-upwork'>  </i>
                </button>
                </Link>  
                <button onClick={async () => await removeTask(task.id)}>
                  <i class="bx bx-trash "> </i>
                </button>
               
              </Flex>
            </Item>
            <Spacer margin="12px" />
          </>
        ))}
      </ul>
    </Container>
  );
}

export default Tarefas;
