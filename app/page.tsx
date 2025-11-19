'use client';

import { useState } from 'react';
import FlightSearchForm from '@/components/FlightSearchForm';
import FlightResults from '@/components/FlightResults';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [flightData, setFlightData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: { flightNumber: string; date: string; airline: string }) => {
    setIsLoading(true);
    setError(null);
    setFlightData(null);

    try {
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`/api/flight-search?${queryParams.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch flight data');
      }

      // Map SerpAPI data to our FlightData format
      if (data.answer_box && data.answer_box.type === 'flight_status') {
        const info = data.answer_box;
        setFlightData({
          airline: info.title.split(' ')[0], // "American AA 100" -> "American"
          flightNumber: info.flight_number,
          status: info.flight_status,
          departure: {
            airport: info.departure.airport_name,
            time: info.departure.planned_time, // Or actual_time if available
            terminal: info.departure.terminal,
            gate: info.departure.gate
          },
          arrival: {
            airport: info.arrival.airport_name,
            time: info.arrival.planned_time,
            terminal: info.arrival.terminal,
            gate: info.arrival.gate
          }
        });
      } else {
        // Fallback if no direct answer box
        throw new Error('No flight status found for this flight number.');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0f172a] relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tight">
            Flight Lookup
          </h1>
          <p className="text-lg text-white/60 max-w-lg mx-auto">
            Real-time flight status and details at your fingertips.
          </p>
        </div>

        <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />

        <FlightResults data={flightData} error={error} />
      </div>
    </main>
  );
}
