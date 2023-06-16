require('dotenv').config({ path: __dirname + '/.env' });

const app = require('./src/app');

const PORT = process.env.PORT_SERVER || '3000'

app.set('port', PORT);

app.listen(PORT, () => console.log(`Server listening on port ${ PORT }`));