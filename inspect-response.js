const https = require('https');

const API_KEY = '3b220144c188c4b0f7e356d1e88d48a4bcbf22788e0c3dba51ee7f273144b007';
const url = `https://serpapi.com/search.json?engine=google&q=flight+AA100&api_key=${API_KEY}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('--- Answer Box ---');
            console.log(JSON.stringify(json.answer_box, null, 2));
            console.log('--- Knowledge Graph ---');
            console.log(JSON.stringify(json.knowledge_graph, null, 2));
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    });
});
