import logo from './logo.svg';
import './App.css';
import { UserLogin } from './UserLogin';
import {Routes,Route} from 'react-router-dom'
import { UserList } from './UserList';


function App() {
return(
<Routes>
  <Route path='/' element={<UserLogin/>}/>
  <Route path='/userList' element={<UserList/>}/>
</Routes>
)

  }

export default App;
