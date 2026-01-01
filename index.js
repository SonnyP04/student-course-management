const express = require('express');
const { readFile } = require('fs').promises;
const app = express();

app.get('/', async (request, response) => {
    response.send( await readFile('./index.html', 'utf8'));

});


const PORT = 3000;
app.listen(PORT,  () => {
    
    console.log(`server is running on http:/localhost${PORT}`);
});
