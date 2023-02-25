const express = require("express");
const port = 3000;
const path = require("path");
const app = express();



const connecttoMongo = require("./Connectdatabase");
const signadmin = require("./model/adminsignin");

connecttoMongo();
createadmin();

app.use(express.json());
app.set("views", __dirname + "/views/");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



app.set("view engine", "hbs");

app.listen(port, () => {
  console.log(`app started in port http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.render("./home");
});

async function createadmin(){
  let user = await signadmin.findOne({name: "admin"});
  if(user){
    return;
  }
  signadmin.create({
    name:"admin",
    password:"this is admin"
  })
}
app.use("/administration", require("./Routes/administration"));
app.use("/client", require("./Routes/client"));
