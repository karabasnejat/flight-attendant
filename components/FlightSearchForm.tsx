'use client';

import { useState } from 'react';
import { Search, Plane, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlightSearchFormProps {
    onSearch: (searchParams: { flightNumber: string; date: string; airline: string }) => void;
    isLoading: boolean;
}

export default function FlightSearchForm({ onSearch, isLoading }: FlightSearchFormProps) {
    const [flightNumber, setFlightNumber] = useState('');
    const [date, setDate] = useState('');
    const [airline, setAirline] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ flightNumber, date, airline });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
            <div className="space-y-2">
                <label htmlFor="flightNumber" className="text-sm font-medium text-white/80 ml-1">
                    Flight Number
                </label>
                <div className="relative">
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
                    <input
                        id="flightNumber"
                        type="text"
                        placeholder="e.g. AA100"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium text-white/80 ml-1">
                    Date (Optional)
                </label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all [&::-webkit-calendar-picker-indicator]:invert"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="airline" className="text-sm font-medium text-white/80 ml-1">
                    Airline (Optional)
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
                    <input
                        id="airline"
                        type="text"
                        placeholder="e.g. American Airlines"
                        value={airline}
                        onChange={(e) => setAirline(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={cn(
                    "w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2",
                    isLoading && "opacity-70 cursor-not-allowed"
                )}
            >
                {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <Search className="h-5 w-5" />
                        Search Flight
                    </>
                )}
            </button>
        </form>
    );
}
