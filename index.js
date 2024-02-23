import  express  from "express";
import axios from "axios";
import bodyParser from "body-parser";

const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get('/',(req,res)=>{
    res.render("index.ejs");
})
app.post('/get-Climate',async (req,res)=>{
    const cty = req.body.c_code;
    const apid = req.body.api;
    const cry = req.body.C_code;
    try {
    const result =await axios.get(API_URL + `q=${cty},${cry}&appid=${apid}`); 
    var iconurl = "http://openweathermap.org/img/w/" + result.data.weather[0].icon + ".png";
    res.render("index.ejs",{
        Weather: result.data.weather[0].main ,
        WeatherDes: result.data.weather[0].description,
        Weathericon: iconurl
});
     } catch (error) {
        console.error(401);
         res.render("index.ejs", { Weather: JSON.stringify(error.result.data) });
     }
   
})
app.get('/reload', function(req, res) {
    // Clear all data
    res.data = {};
  
    // Reload the page
    res.redirect('/');
  });
app.listen(port, () => { 
    `Server is running on port ${port}` 
});