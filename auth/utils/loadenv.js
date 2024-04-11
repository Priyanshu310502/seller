const fs = require('fs');
const path = require('path');

function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env'); // Up one directory to access .env
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envLines = envFile.split('\n');

    envLines.forEach(line => {
        const [key, value] = line.split('=');

        if (key && value) { // Check if both key and value are defined
            process.env[key.trim()] = value.trim();
        } else {

        }
    });
}

module.exports = { loadEnv };

