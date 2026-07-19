echo const express = require('express'); > server.js
echo const cors = require('cors'); >> server.js
echo const app = express(); >> server.js
echo const port = process.env.PORT || 3000; >> server.js
echo app.use(cors()); >> server.js
echo app.use(express.json()); >> server.js
echo app.get('/api/health', (req, res) => { >> server.js
echo   res.json({ status: 'OK', message: 'Server is running!' }); >> server.js
echo }); >> server.js
echo app.listen(port, () => { >> server.js
echo   console.log(Server running on port  + port); >> server.js
echo }); >> server.js