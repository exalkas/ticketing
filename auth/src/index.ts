import mongoose from 'mongoose'
import app from './app'

const startDB = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    // if (!process.env.MONGO_URI) {
    //     throw new Error('DB CONNECTION_STRING must be defined');
    // }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Auth service, connected to DB')
    } catch (error) {
        console.log('Error connecting to DB:', error)
    }
}

startDB()

app.listen(5000, () => {

    console.log('Auth server is up and listens at port!!!', 5000)

})