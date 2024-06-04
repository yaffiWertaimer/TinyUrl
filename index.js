import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'; 

import UserRouter from './Routers/UsersRouter.js'
import LinksRouter from './Routers/LinksRouter.js'
import connectDB from './database.js'
import RedirectController from './Controllers/RedirectController.js';
import RedirectRouter from './Routers/RedirectRouter.js'

connectDB()

const app=express()

app.use(cors())
app.use(bodyParser.json())

app.use('/users',UserRouter);
app.use('/links',LinksRouter);
//const redirectRouter = require('./routes/RedirectRouter');
// app.use('/redirect', redirectLink);
app.use('/',RedirectRouter)

app.listen(5000, () => {
    console.log('app is running on http://localhost:5000')
})