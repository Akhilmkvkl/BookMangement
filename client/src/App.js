 
import UserLogin from "./Pages/UserLogin/UserLogin";
import { Route,Routes } from 'react-router-dom';
import ViewBooks from "./Pages/ViewBooks/ViewBooks";
import AdminPage from "./Pages/AdminHome/AdminPage";


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<UserLogin/>}></Route>
      <Route path='/home' element={<ViewBooks/>}></Route>
      <Route path='/admin' element={<AdminPage/>}></Route>


      </Routes>
      
    </div>
  );
}

export default App;
