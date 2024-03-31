const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const serverio = require('socket.io');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = serverio(server, {
    cors: {
        origin: "https://chat-app-a3218.web.app",
        methods: ["GET", "POST"]
    }
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tqyfr7x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const dataBase = client.db("users");
        const userList = dataBase.collection("users");
        const messageList = dataBase.collection('messages');


        //connection socket
        io.on('connection', socket => {
            socket.on('disconnect', () => {

            });

            socket.on('sendMessage', async (messageInfo, receiverEmail) => {

                //messageBuffer.push(messageInfo)
                socket.broadcast.emit(receiverEmail, messageInfo);
                await messageList.insertOne(messageInfo);

            });
        });

        //get messages by sender and receiver
        app.get('/messages', async (req, res) => {
            //console.log(req.query.m, req.query.f)
            const query = {
                $or: [
                    { 'sender.email': req.query.m, 'receiver.email': req.query.f },
                    { 'receiver.email': req.query.m, 'sender.email': req.query.f }
                ]
            }
            const options = {
                // Sort returned documents in ascending order by title (A->Z)
                sort: { time: 1 },
            };
            const result = await messageList.find(query, options).toArray();
            res.send(result)
        })

        // create a new user
        app.put('/addUser', async (req, res) => {
            try {
                const filter = { email: req.body.email };
                const options = { upsert: true };
                const updateDoc = {
                    $set: req.body
                };
                const result = await userList.updateOne(filter, updateDoc, options);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(402).send({ err })
            }
        })

        //update user 
        app.put('/updateUser', async (req, res) => {
            try {
                const filter = { email: req.body.email };
                const updateDoc = {
                    $set: req.body
                };
                const result = await userList.updateOne(filter, updateDoc);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(402).send({ err })
            }
        })


        //get all users
        app.get('/users', async (req, res) => {
            try {
                const options = {
                    projection: { password: 0 },
                };
                const users = await userList.find({}, options).toArray();
                res.status(200).send(users);
            }
            catch (err) {
                res.status(402).send({ err })
            }
        })

        //search user
        app.get('/users/:searchTxt', async (req, res) => {
            try {
                const options = {
                    projection: { password: 0 },
                };
                const query = {
                    name: {
                        $regex: req.params.searchTxt,
                        $options: 'i'
                    }
                }
                const users = await userList.find(query, options).toArray();
                res.status(200).send(users);
            }
            catch (err) {
                res.status(402).send({ err })
            }
        })

        //get single user
        app.get('/user/:id', async (req, res) => {
            try {
                const query = { _id: new ObjectId(req.params.id) }
                const options = {
                    projection: { password: 0 },
                };
                const users = await userList.findOne(query, options)
                res.status(200).send(users);
            }
            catch (err) {
                res.status(402).send({ err })
            }
        })

        //get my info
        app.get('/myInfo/:email', async (req, res) => {
            try {
                const query = { email: req.params.email }
                // const options = {
                //     projection: { password: 0 },
                // };
                const users = await userList.findOne(query)
                res.status(200).send(users);
            }
            catch (err) {
                res.status(402).send({ err })
            }
        })



        app.get('/', (req, res) => {
            res.send({ msg: 'ok' });
        });


        await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);




server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
