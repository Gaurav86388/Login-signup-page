import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { user } from "./dbschema.js"


const PORT = 3000
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

const username = encodeURIComponent("gauravgogoigp")
const password = encodeURIComponent("Gaurav@97")

const mongoshString = `mongodb+srv://${username}:${password}@signindb.huxclol.mongodb.net/users?retryWrites=true&w=majority`
await mongoose.connect(mongoshString)

async function main(){
    

    app.get("/", (req, res)=>{
        res.send("hi")
    })

    app.post("/login", async(req, res)=>{

        const {username, password} = req.body
        console.log(username, password)
        
        const userFound  = await user.findOne({username: username, password: password})
        if(userFound){
            res.status(200).json({message: "success"})
        }
       else{
        res.status(404).json({message:"failure"})
       }
        

    })

    app.post("/register", async(req, res)=>{

        const registrationData = req.body
        console.log(registrationData)
        try{
            await user.create(registrationData)
            .then(res.status(200).json({message: "Success"}))
            }
        
        catch{
            res.status(500).json({message: "Server Error"})
        }


    })
    



    
    app.listen(PORT, ()=>{
    
        console.log("server is running at", PORT)
    })


}

main().catch(e=>console.log(e))

