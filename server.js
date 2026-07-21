const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
//
====================================================
======== )دروس ھﻣﮫ رﺷﺗﮫ ھﺎ( JSON . ﺧواﻧدن ﻓﺎﯾل ھﺎی ١ //
 
//
====================================================
========
const coursesData = {};
const dataDir = path.join(__dirname, 'data');
try {
  const files = fs.readdirSync(dataDir);
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
      const data = JSON.parse(content);
      coursesData[data.field] = data;
      console.log('Loaded: ' + data.field);
    }
  });
  console.log('Total ' + Object.keys(coursesData).length + ' fields
loaded');
} catch (err) {
  console.log('No data folder found or error reading files');
}
//
====================================================
========
// ٢. APIھﺎی ﻗﺑﻠﯽ
//
====================================================
========
app.get('/api/health', (req, res) => {
res.json({ status: 'OK', message: 'Server is running!' });
});// ... )ﺑﻘﯾﮫ ﮐدھﺎ ﺑﮫ ھﻣﯾن ﺷﮑل(

app.listen(port, () => {
console.log('Server running on port ' + port);
console.log(Object.keys(coursesData).length + ' fields available');
});