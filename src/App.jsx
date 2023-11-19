
import Update from "./pages/Update";
import Tarefas from "./pages/tarefas";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  

  return (
    <Router>
            <Routes>
                <Route path='/' exact element={<Tarefas/>} />
                <Route path='/Update/:id'  element={<Update />}/>
            </Routes>
        </Router>
    
  );
}

export default App;
