import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Login from './components/Login'
import Registration from './components/Registration'



function App() {


  return (<>
  <BrowserRouter>
    <Routes>
      
        <Route path= "/" element={ <Login />} errorElement={<div>404 NOT FOUND</div>}/>
        <Route path= "/registration" element={ <Registration />} errorElement={<div>404 NOT FOUND</div>}/>
    
    </Routes>
    </BrowserRouter>
  </>
    
  )
}

export default App
