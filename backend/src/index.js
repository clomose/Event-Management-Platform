import 'dotenv/config';
import dbConnect from './db/index.js';
import { app, server, io } from './app.js';

dbConnect().then(() => {
    server.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
    
}).catch((error) => {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
});
