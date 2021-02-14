const express = require('express')
const app = express()
const connectDB = require('./config/db')

const PORT = 3000 || process.env.PORT

// middleware pour lire le body pour les requetes post
app.use(express.json({ extended: false }));

// connecter la DB
connectDB()

// les routes ======>
// import toutes les routes de users
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));


// lance le serveur sur 3000
app.listen(PORT, () => {console.log("je suis server ")})