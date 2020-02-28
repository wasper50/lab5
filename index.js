let express = require('express')
let path = require('path');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname,'/')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);

app.post('/add', function (req, res) {
    fs.readFile('example.json', (err, data) => {
        if (err) return;
        var list = JSON.parse(data);
        list.push(req.body);
        fs.writeFile("example.json", JSON.stringify(list), "utf8", (err) => {
            if (err) {
            console.log(err);
            } else {
            console.log("File successfully written to!");
            }
        });
    });
});

app.post('/delete', function (req, res) {
    fs.readFile('example.json', (err, data) => {
        if (err) return;
        var list = JSON.parse(data);
        list.forEach((e, i, a) => {
            if (e.name == req.body.name){
                a.splice(i, 1);
                fs.writeFile('example.json', JSON.stringify(a), (err) => {
                    if (err) return;
                })
                return;
            }
        })
    })
})

app.get('/load', function (req, res) {
    fs.readFile('example.json', (err, data)=>{
        if (err) {
            console.log(err);
              return;
            };
            console.log(1);
        return res.json(JSON.parse(data));
    })
})

app.get('/search', (req, res) => {
    fs.readFile('example.json', (err, data) => {
      if (err) {
        console.log(err);
          return;
        };
        console.log(0);
      return res.json(JSON.parse(data));
    })
})