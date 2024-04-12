import express, { json } from 'express';
import user from "D:\\File\\Programming\\Web development\\electrifyit-reports-dashboard\\Backend\\user.js";
import dataRouter from 'D:\\File\\Programming\\Web development\\electrifyit-reports-dashboard\\Backend\\routes\\data.routes.js';

const app = express();
const PORT = process.env.PORT || 3600;

app.get("/",(req,res)=>{
  res.send("server is ready")
})

app.get("/api/user",(req,res)=>{
  res.send(user)
})

app.use(json());

app.use('/api/data', dataRouter);


app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
