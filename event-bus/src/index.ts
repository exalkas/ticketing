const express = require('express')

const app = express()

app.get('/', (req, res) => {

    console.log('Welcome at event bus server')

    res.send('hello from Event bus server')

})

app.listen(5005, () => console.log('Event Bus Server is up and runnning at port 5005'));