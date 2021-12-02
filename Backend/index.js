const express = require('express')
const pug = require('pug')
const expressSession = require('express-session');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path')


const app = express();

const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb+srv://user:calvin!@cluster0.8i0da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'final-project';
const db = client.db(dbName);
const collection = db.collection('create');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

let salt = bcrypt.genSaltSync(10);

app.use(expressSession({
    secret: 'wh4t3v3r',
    saveUninitialized: true,
    resave: true
}));

const urlencodedParser = express.urlencoded({
    extended: false
});

const create = (req, res) => {
    res.render('create', {
        title: 'Add Person'
    });
}

const createPerson = async(req, res) => {
    await client.connect();
    let hash = bcrypt.hashSync(req.body.password, salt);
    let person = {
        name: req.body.name,
        password: req.body.password,
        age: req.body.age,
        email: req.body.email,
        zeus: req.body.zeus,
        shiva: req.body.shiva,
        tsu: req.body.tsu,
        password: hash
    };
    const insertResult = await collection.insertOne(person);
    client.close();
    console.log(req.body.name + ' added');
    res.redirect('/');
}

const edit = async(req, res) => {
    console.log(req.query.id);
    await client.connect();
    const filteredDocs = await collection.find(ObjectId(req.query.id)).toArray();
    console.log('edit', filteredDocs[0]);
    client.close();
    res.render('edit', {
        title: 'Edit Person',
        person: filteredDocs[0]
    });
}

const editPerson = async(req, res) => {
    await client.connect();
    const updateResult = await collection.updateOne(
        {_id: ObjectId(req.params.id) },
        {$set: {
            name: req.body.name,
            password: req.body.password,
            age: req.body.age,
            email: req.body.email,
            zeus: req.body.zeus,
            shiva: req.body.shiva,
            tsu: req.body.tsu
        }}
    )
    client.close();
}

const login = async(req, res) => {
    await client.connect();
    console.log("Name: ", req.body.name)
    console.log("Password: ", req.body.password)
    const filteredDocs = await collection.find({name: req.body.name}).toArray();
    console.log(filteredDocs[0]);
    let hash = bcrypt.compareSync(req.body.password, filteredDocs[0].password);
    if(req.body.name == filteredDocs[0].name && hash){
        req.session.user = {
            isAuthenticated: true,
            name: req.body.name
        }
        res.redirect('/edit?id=' + filteredDocs[0]._id)
    } else{
        res.redirect('/');
    }
}

const cookies = (req,res) => {
    // Cookie management
    var dateVisited;
    if(req.cookie == 'visited=true') {
        dateVisited = `${req.cookies.dateofvisit}`;
    }
    else {
        var dateObj = new Date();
        var dd = String(dateObj.getDate()).padStart(2, '0');
        var mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        var yyyy = dateObj.getFullYear();
        var today = mm + "/" + dd + "/" + yyyy;
        res.cookie('beenHereBefore', 'yes', {maxAge: 99999999999999999999});
        dateVisited = 'This is your first time here.';
        res.cookie('dateofvisit', today, {maxAge: 99999999999999999999}); 
    };
    res.render('login',{
        title: 'Home',
        lastVisit: 'First Visit: ' + dateVisited
    });
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
        } else {
            // Cleaning up cookies so they don't conflict when relogging
            res.clearCookie('username');
            res.redirect('/');
        };
    });
};

app.get('/', cookies);   
app.post('/', urlencodedParser, login)
app.get('/create', create);
app.post('/create', urlencodedParser, createPerson);
app.get('/edit', edit);
app.post('/edit/:id', urlencodedParser, editPerson);
app.get('/logout/', logout)

app.listen(3000);