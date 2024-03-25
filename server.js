import express from "express"
import { initDB } from "./db/database.js"
import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import bodyParser from "body-parser"
const app = express();

initDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin-manager",adminRoutes)
app.use("/user",userRoutes)

app.listen(3000,()=>{
    console.log("Server Started");
})

