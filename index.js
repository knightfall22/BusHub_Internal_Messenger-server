const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth');

require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

app.use((cors()))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { 
    res.send('Hello World!');
})

app.post('/', (req, res) => {
    const {message,type, members, user:sender} = req.body;

    if (type === 'message.new') {
        members
        .filter(member => member.user_id != sender.id)
        .forEach(({user}) => {
            if (!user.online) {
                 twilioClient.messages.create({
                    body: `You have a message from ${message.user.fullName} - ${message.text}`,
                    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
                    to: user.phoneNumber
                 })
                 .then(() => {
                    console.log('Message sent!');
                 })
                 .catch(err => {
                    console.log(err);
                 })
            } 
            
            return res.status(200).json({message: 'Message sent!'});
        })
    }

    return res.status(200).json({message: 'not a new message request'});
})

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});