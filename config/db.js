const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Usa a Promise global para mongoose
mongoose.set('strictQuery', true); // Recomendado para versões mais recentes do Mongoose

// Função de conexão ao MongoDB
const connectDB = async () => {
    const url = process.env.DB_URL; // URL do banco de dados definida no .env

    // Tratamento de eventos de conexão
    mongoose.connection.on('connected', () => {
        console.log('Conexão com o MongoDB estabelecida');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('Conexão com o MongoDB restabelecida');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Conexão com o MongoDB desconectada');
        console.log('Tentando reconectar com o MongoDB...');
        setTimeout(() => {
            mongoose.connect(url, {
                // Removido useNewUrlParser e useUnifiedTopology
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000
            }).catch((err) => console.error('Erro ao reconectar ao MongoDB:', err));
        }, 3000); // Tentar reconectar após 3 segundos
    });

    mongoose.connection.on('close', () => {
        console.log('Conexão com o MongoDB fechada');
    });

    mongoose.connection.on('error', (error) => {
        console.error('Erro de conexão com o MongoDB:', error);
    });

    try {
        // Conectar ao MongoDB
        await mongoose.connect(url, {
            // Removido useNewUrlParser e useUnifiedTopology
            socketTimeoutMS: 3000,
            connectTimeoutMS: 3000
        });
        console.log('Conexão inicial com o MongoDB bem-sucedida');
    } catch (error) {
        console.error('Falha ao conectar ao MongoDB:', error);
        process.exit(1); // Finaliza o processo em caso de erro crítico de conexão
    }
};

module.exports = { connectDB };
