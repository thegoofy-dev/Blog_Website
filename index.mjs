import express from "express"; 
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;


// __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.get("/home", (req, res) => {
    res.render("home");
})

app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`);
});