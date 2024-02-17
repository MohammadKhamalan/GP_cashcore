import cookieParser from 'cookie-parser';
import express from 'express';
import employeeroute from './route/employees.js'; // Import your employee route
import cors from 'cors';
import supervisorroute from './route/supervisors.js'
import postroute from'./route/posts.js'
import productroute from './route/products.js'
import likeroute from './route/likes.js'
import commentroute from './route/comments.js'
import prizeroute from './route/prizes.js'
import WaitingRoutes from './route/waitings.js'
import AccountRoutes from "./route/accounts.js"
import BranchRoutes from "./route/branches.js"
import pdfRouter from "./route/pdf_documents.js"
import TransactionsRoutes from "./route/transactions.js"
import userBranchRoutes from "./route/user_branches.js"
import userRoutes from './route/users.js'
import visitRoutes from "./route/visits.js"
import alertRoute from './route/alerts.js'

//import alertRoutes from "./route/alerts.js"
const app = express(); // Create an instance of Express
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // if you're using credentials (cookies, authorization headers)
  }));
// Other required modules...
app.use(express.json());

// Use the employee route
app.use('/api/employee', employeeroute);
app.use('/api/supervisor', supervisorroute);
app.use('/api/post', postroute);
//app.use("/api/alert", alertRoutes);

app.use('/api/product', productroute);
app.use('/api/like', likeroute);
app.use('/api/comment', commentroute);
app.use('/api/prize',prizeroute);
app.use("/api/accounts",AccountRoutes)
app.use("/api/branches",BranchRoutes)
app.use("/api/pdf_documents",pdfRouter)
app.use("/api/transactions",TransactionsRoutes)
app.use("/api/user_branches",userBranchRoutes)
app.use("/api/users", userRoutes);
app.use("/api/visits",visitRoutes)
app.use("/api/waiting", WaitingRoutes);
app.use("/api/alert", alertRoute);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
