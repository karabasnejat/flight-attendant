import { NextResponse } from 'next/server';

const SERPAPI_KEY = '3b220144c188c4b0f7e356d1e88d48a4bcbf22788e0c3dba51ee7f273144b007';
const BASE_URL = 'https://serpapi.com/search';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const flightNumber = searchParams.get('flightNumber') || searchParams.get('flight_number');
    const date = searchParams.get('date');
    const airline = searchParams.get('airline');

    if (!flightNumber) {
        return NextResponse.json({ error: 'Flight number is required' }, { status: 400 });
    }

    // We switched to engine=google because engine=google_flights requires departure_id/arrival_id
    // and does not support simple flight number lookup for status.
    // engine=google with "flight [number]" query returns the Flight Status knowledge graph.

    const params = new URLSearchParams({
        api_key: SERPAPI_KEY,
        engine: 'google',
        hl: 'en',
        gl: 'us',
        q: `flight ${airline || ''} ${flightNumber}`.trim()
    });

    console.log('Fetching SerpAPI with params:', params.toString());

    try {
        const response = await fetch(`${BASE_URL}?${params.toString()}`);
        const data = await response.json();

        console.log('SerpAPI Response Status:', response.status);
        // Log a snippet of the response to debug
        console.log('SerpAPI Response Data Snippet:', JSON.stringify(data).substring(0, 500));

        return NextResponse.json(data);
    } catch (error) {
        console.error('SerpAPI Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch flight data' }, { status: 500 });
    }
}
