const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes')

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request(Not Found)

app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the election database!');

    app.listen(PORT, () => {
        console.log(`Server initialized on port ${PORT}`);
    });
});