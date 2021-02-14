const express = require('express')
const app = express()

const PORT = 3000 || process.env.PORT

// les routes ======>
// import toutes les routes de users
app.use('/api/users', require('./routes/api/users'));

// lance le serveur sur 3000
app.listen(PORT, () => {console.log("je suis server ")})