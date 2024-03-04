import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from 'dotenv'

import router from "./router.js"

const PORT = 3000
const app = express()

dotenv.config()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

const username = encodeURIComponent(process.env.DB_USERNAME)

const password = encodeURIComponent(process.env.DB_PASSWORD)



async function main(){
    
    try{
        await mongoose.connect(`mongodb+srv://${username}:${password}@signin.mfht02k.mongodb.net/?retryWrites=true&w=majority`)
    }
    catch(e){console.log(e)}

    app.use("/", router)


    app.listen(PORT, ()=>{
    
        console.log("server is running at", PORT)
    })


}

main().catch(e=>console.log(e))

