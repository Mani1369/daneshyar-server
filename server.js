const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
const coursesData = {};
const dataDir = path.join(__dirname, 'data');
try {
const files = fs.readdirSync(dataDir);
files.forEach(file => {
if (file.endsWith('.json')) {
const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
const data = JSON.parse(content);
coursesData[data.field] = data;
}
});
} catch (err) {}
app.get('/api/health', (req, res) => {
res.json({ status: 'OK', message: 'Server is running!' });
});
app.get('/api/fields', (req, res) => {
res.json(Object.keys(coursesData));
});
app.get('/api/courses/:fieldName', (req, res) => {
const fieldName =
decodeURIComponent(req.params.fieldName);
const data = coursesData[fieldName];
data ? res.json(data) : res.status(404).json({ error: 'Not found' });
});
app.get('/api/all-courses', (req, res) => {
res.json(coursesData);
});
app.listen(port, () => {
console.log('Server running on port ' + port);
});