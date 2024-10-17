const nodemailer = require('nodemailer');

if (!process.env.MAILER_HOST || !process.env.MAILER_PORT || !process.env.MAILER_USER || !process.env.MAILER_PASS) {
    throw new Error('Configurações de e-mail não definidas nas variáveis de ambiente.');
}

const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
});

module.exports = transporter;
