import express from "express";
import 'dotenv/config';

import ActionRouter from './action.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", ActionRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});