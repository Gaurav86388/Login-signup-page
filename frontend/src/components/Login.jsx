import {useState} from 'react'
import { Link } from 'react-router-dom'
const Login = () => {

    const [logInDetails, setLogInDetails] = useState({
        username: "",
        password: "",
    })

    const [isAuthenticated, setIsAuthenticated] = useState({
      state: false,
      success: false,
      message: ""
    })

    function handleFormSubmit(event){

        event.preventDefault()
        console.log(logInDetails)
        fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        } ,
        body: JSON.stringify(logInDetails)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.message === 'success'){
            setIsAuthenticated(prev=>{
              return {...prev, state: true, success: true, message: "Logged In Successfully" }
            })
          }
          else if (data.message === 'failure'){
            setIsAuthenticated(prev=>{
              return {...prev, state: true,  success: false, message: "User Not Found" }
            })
          }
        })
        .catch(e=>console.error(e))

    }


  return (
    <div className = "container">
    <div className='login'>

    <h2>Log In Form</h2>
    <form className='login form'onSubmit={handleFormSubmit}>

    <div>
    <label htmlFor='username'>Username: </label>
    <input name="username"
            type="text"
            value={logInDetails.username}
            onChange={(e) =>{
                const value = e.target.value
                setLogInDetails(prev=>({...prev, username: value}))}
            } 
            required
          />
    </div>
    
        <div>   
        <label htmlFor='password'>Password: </label>
        <input name="password"
            type="password"
            value={logInDetails.password}
            onChange={(e) =>{
                const value = e.target.value
                setLogInDetails(prev=>({...prev, password: value}))}
            } 
            required
          />

        </div>
    

          <input type="submit" value="Submit" id="submit"/>

    </form>

            <p>No Account! Register <Link to="/registration">here</Link></p> 

    </div>

            {isAuthenticated.state && <p  style={ isAuthenticated.success ? {color: "green", textAlign: "center"} : {color: "red", textAlign: "center"}}>{isAuthenticated.message}</p>}
    </div>
  )
}

export default Login