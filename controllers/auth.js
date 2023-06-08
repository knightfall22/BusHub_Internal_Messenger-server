const {connect} = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
const { Stream } = require('stream');

require('dotenv').config();
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

exports.postSignUp = async (req, res) => {
    console.log('I am here');
    try {
        console.log(req.body);
        const {
            fullName,
            username,
            phoneNumber,
            password,
            avatarURL
        } = req.body

        const userId = crypto.randomBytes(16).toString('hex');
        console.log('user:', userId);

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId, hashedPassword);

        const user = {
            userId,
            fullName,
            username,
            hashedPassword,
            phoneNumber,
            avatarURL,
            token
        }
        
        res.status(200).send({user});

    } catch (error) {
        console.log(error);

        res.status(500).send({
            message: error
        });
    }
}

exports.postSignIn = async (req, res) => {
    try {
        const {username, password} = req.body;

        const serverClient = connect(api_key,api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const {users} = await client.queryUsers({name: username});

        console.log('users:', users);
        if (users.length === 0) {
            res.status(404).send({
                message: 'User not found'
            });
        }

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        console.log('Token:', token);

        const user = {
            token,
            fullName: users[0].fullName,
            username,
            userId: users[0].id,
        }
        if (success) { 
            res.status(200).send({
                user
            });
        } else {
            res.status(401).send({
                message: 'Invalid password'
            });
        }

    } catch (error) {
        console.log(error);

        res.status(500).send({
            message: error
        });
    }
}