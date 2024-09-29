const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.Promise = global.Promise;
const connect = mongoose.connection;
mongoose.set('strictQuery', true);

const connectDB = async () => {
    const url = process.env.DB_URL;

    connect.on('connected', async () => {
        console.log('Conexão com o MongoDB estabelecida')
    })
    connect.on('reconnected', async () => {
        console.log('Conexão com o MongoDB restabelecida')
    })
    connect.on('disconnected', () => {
        console.log('Conexão com o MongoDB desconectada')
        console.log('Tentando reconectar com o MongoDB...')

        setTimeout(() => {
            mongoose.connect(url, {
                keepAlive: true,
                socketTimeourMS: 3000,
                connectTimeoutMS: 3000
            })
        }, 3000)
    })
    connect.on('close', () => {
        console.log('Conexão com o MongoDB fechada')
    });
    connect.on('error', (error) => {
        console.log('Erro de conexão com o MongoDB: ' + error)
    })
    await mongoose
        .connect(url)
        .catch((error) => console.log(error))
}

module.exports = { connectDB }
