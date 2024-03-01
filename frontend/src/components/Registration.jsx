import {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const details = [{
    name: "username", type: "text",
},
{
    name: "password", type: "password",
},
{
    name: "firstname", type: "text",
},
{
    name: "lastname", type: "text",
},
{
    name: "age", type: "Number",
},
{
    name: "email", type: "email",
},
{
    name: "contact", type: "number",
}]

const Registration = () => {
    const navigate = useNavigate()

    const [RegistrationDetails, setRegistrationDetails] = useState({
        username: "" ,
        password: "" ,
        firstname: "" ,
        lastname: "" ,
        age: "",
        email: "",
        contact: "",
    })

    function handleFormSubmit(event){
        event.preventDefault()
        
        console.log(RegistrationDetails)
        fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        } ,
        body: JSON.stringify(RegistrationDetails)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            alert("Form Submitted Successfully")
            
            if(data.message === 'Success'){
                navigate("/")
            }
            
        })
        .catch(e=>console.error(e))

    }


  return ( <div className = "container">
    <div className='registration'>

    <h2>Registration Form</h2>
    <form className='registration form'onSubmit={handleFormSubmit}>
    {details.map((item, index)=>{

        return <div key={index}>
        <label htmlFor={item.name}>{item.name[0].toUpperCase()}{item.name.slice(1)}: </label>
        <input name={item.name}
                type={item.type}
                value={RegistrationDetails[item.name]}
                onChange={(e) =>{
                    const value = e.target.value
                    setRegistrationDetails(prev=>({...prev, [item.name]: value}))}
                } 
                required
              />
        </div>
    })}
    
    
          <input type="submit" value="Submit" id="submit"/>

    </form>

    <p>Click <Link to="/">here</Link> to Land Home</p> 

    </div>

    
    </div>
  )
}

export default Registration