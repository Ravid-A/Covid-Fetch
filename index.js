import express from "express";
import ActionRouter from './action.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", ActionRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
    }
);