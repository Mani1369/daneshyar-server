const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get('/api/health', (req, res) => {
res.json({ status: 'OK', message: 'Server is running!' });
});
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});