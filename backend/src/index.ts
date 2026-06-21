import express from "express";

const app = express();
const PORT = 30001;
app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
