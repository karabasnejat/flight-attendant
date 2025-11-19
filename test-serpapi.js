const https = require('https');

const API_KEY = '3b220144c188c4b0f7e356d1e88d48a4bcbf22788e0c3dba51ee7f273144b007';
const url = `https://serpapi.com/search.json?engine=google_flights&q=AA100&api_key=${API_KEY}`;

// Note: 'q' might not be the right param for google_flights engine, but let's see what it returns.
// If google_flights is strict, we might need to use engine=google with q=flight+AA100.
// Let's try engine=google first as it's more likely to give the "status" box.
// But the user requested engine=google_flights.
// Let's try both or just the requested one.

const urlRequested = `https://serpapi.com/search.json?engine=google_flights&flight_number=AA100&api_key=${API_KEY}`;
// I'll try to fetch this.

https.get(urlRequested, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('--- Response for engine=google_flights ---');
        console.log(data.substring(0, 2000)); // Print first 2000 chars

        // If that fails or is empty, let's try engine=google
        if (data.includes("error") || data.length < 500) {
            const urlGoogle = `https://serpapi.com/search.json?engine=google&q=flight+AA100&api_key=${API_KEY}`;
            https.get(urlGoogle, (res2) => {
                let data2 = '';
                res2.on('data', (chunk) => data2 += chunk);
                res2.on('end', () => {
                    console.log('\n--- Response for engine=google ---');
                    console.log(data2.substring(0, 2000));
                });
            });
        }
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
