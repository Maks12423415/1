const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const port = 3001;

const app = express();
app.use(cors());


var conn= mysql.createConnection({

  host:"localhost",
  user: "root",
  password:"",
  database:"bazadanych"
  })

  conn.connect((err) => {
    if (err) console.log(err);
    else console.log("połączono z bazą");
  });


app.get("/", function (req, res) {
  res.send("ok");
  console.log("zapytanie");
});

// app.get("/imie", (req, res) => {
//   res.json({ imie: "maks", nazwisko: "samborski" });
//   console.log("zapytanie nazwisko");
// });


app.get("/add/:imie/:nazwisko/:ocena", (req, res) => {
  var imie = req.params.imie;
  var nazwisko = req.params.nazwisko;
var ocena = parseInt(req.params.ocena)
  
  const sql = `INSERT INTO uczniowie (imie, nazwisko, ocena) VALUES ('${imie}','${nazwisko}','${ocena}')`;
  conn.query(sql, (err, results, fields) => {
    console.log(results);
    
  });
});

// app.get("/add/:liczba1/:liczba2", (req, res) => {
//   // Obsługa żądania HTTP typu GET na ścieżce "/add/:liczba1/:liczba2"
//   // req to obiekt reprezentujący żądanie HTTP, a res to obiekt reprezentujący odpowiedź HTTP

//   const liczba1 = parseFloat(req.params.liczba1); // Konwertuj pierwszą liczbę na float
//   const liczba2 = parseFloat(req.params.liczba2); // Konwertuj drugą liczbę na float

//   if (isNaN(liczba1) || isNaN(liczba2)) {
//     // Sprawdź, czy obie wartości są liczbami
//     res.status(400).json({ error: "Podano nieprawidłowe liczby" });
//   } else {
//     const suma = liczba1 + liczba2;
//     res.send(`Suma ${liczba1} i ${liczba2} wynosi: ${suma}`);
//   }
// });

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
