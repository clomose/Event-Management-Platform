import 'dotenv/config';
import dbConnect from './db/index.js';
import app from './app.js';

dbConnect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
});
