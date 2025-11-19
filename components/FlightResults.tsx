'use client';

import { Plane, Clock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FlightData {
    airline?: string;
    flightNumber?: string;
    status?: string;
    departure?: {
        airport?: string;
        time?: string;
        terminal?: string;
        gate?: string;
    };
    arrival?: {
        airport?: string;
        time?: string;
        terminal?: string;
        gate?: string;
    };
}

interface FlightResultsProps {
    data: FlightData | null;
    error?: string | null;
}

export default function FlightResults({ data, error }: FlightResultsProps) {
    if (error) {
        return (
            <div className="w-full max-w-2xl mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center backdrop-blur-md">
                <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-2" />
                <p className="text-red-200">{error}</p>
            </div>
        );
    }

    if (!data) return null;

    const isDelayed = data.status?.toLowerCase().includes('delayed');
    const isCancelled = data.status?.toLowerCase().includes('cancelled');
    const statusColor = isDelayed ? 'text-yellow-400' : isCancelled ? 'text-red-400' : 'text-emerald-400';
    const StatusIcon = isDelayed ? AlertCircle : isCancelled ? AlertCircle : CheckCircle2;

    return (
        <div className="w-full max-w-2xl mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Flight Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-black/20 p-6 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center">
                            <Plane className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{data.airline || 'Airline'}</h3>
                            <p className="text-white/50 text-sm">{data.flightNumber || 'Flight Number'}</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 ${statusColor} border border-white/5`}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="font-medium text-sm">{data.status || 'Scheduled'}</span>
                    </div>
                </div>

                {/* Route & Times */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
                    {/* Departure */}
                    <div className="text-center md:text-left space-y-2">
                        <div className="text-4xl font-bold text-white tracking-tight">{data.departure?.airport || 'DEP'}</div>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-sky-300">
                            <Clock className="h-4 w-4" />
                            <span className="font-mono">{data.departure?.time || '--:--'}</span>
                        </div>
                        <div className="text-sm text-white/40">
                            {data.departure?.terminal && `Term ${data.departure.terminal}`}
                            {data.departure?.gate && ` • Gate ${data.departure.gate}`}
                        </div>
                    </div>

                    {/* Visual Path */}
                    <div className="hidden md:flex flex-col items-center justify-center w-full relative">
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent absolute top-1/2 -translate-y-1/2" />
                        <Plane className="h-6 w-6 text-sky-400 rotate-90 absolute bg-[#0f172a] p-1 rounded-full" />
                        <div className="mt-8 text-xs text-white/30 font-mono">Duration: --h --m</div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center md:text-right space-y-2">
                        <div className="text-4xl font-bold text-white tracking-tight">{data.arrival?.airport || 'ARR'}</div>
                        <div className="flex items-center justify-center md:justify-end gap-2 text-sky-300">
                            <span className="font-mono">{data.arrival?.time || '--:--'}</span>
                            <Clock className="h-4 w-4" />
                        </div>
                        <div className="text-sm text-white/40">
                            {data.arrival?.terminal && `Term ${data.arrival.terminal}`}
                            {data.arrival?.gate && ` • Gate ${data.arrival.gate}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
