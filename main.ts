import cors from "cors"
import express, { Application } from "express"
import helmet from "helmet"
import user from "./Router/authRouter"

const main =(app:Application)=>{
    app.use(express.json())
    app.use(cors())

    app.use(helmet())

    app.get("/", (req, res)=>{
        try {
            res.status(200).json({
                message:"Success"
            })
        } catch (error:any) {
            res.status(404).json({
                message:"Error",
                data:error.message
            })
        }
    })
    app.use("/api", user)
}

export default main