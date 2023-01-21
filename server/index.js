const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
    user: "root",
    password: "root",
    host: "localhost",
    port:"8889",
    database:"employee_db"
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


app.get('/api/employees', (req, res) => {
    const sql =
        "select id,name,performance,DATE_FORMAT(date,'%c/%d/%Y') as date from employee_performance order by performance desc";
      db.query(sql, (err, result) => {
        console.log(result,err);
        res.send(result);
      });
    
    })
    app.get("/api/employeesByName", (req, res) => {
        const sqlSelect2 =  "select id,name,performance,DATE_FORMAT(date,'%c/%d/%Y') as date from employee_performance order by name";
        db.query(sqlSelect2, (err, result) => {
          console.log(result);
          res.send(result);
        });
      });
      
      app.get("/api/employeesByDate", (req, res) => {
        const sqlSelect3 =  "select id,name,performance,DATE_FORMAT(date,'%c/%d/%Y') as date from employee_performance order by date";
        db.query(sqlSelect3, (err, result) => {
          console.log(result);
          res.send(result);
        });
      });

app.listen(3001,() => {
    console.log("running on port 3001");
})