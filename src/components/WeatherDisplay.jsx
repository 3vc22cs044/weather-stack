import React from 'react';
import { MapPin, Thermometer, Wind, Droplets, Sun, CloudRain, Clock } from 'lucide-react';
import GlassCard from './GlassCard';

const WeatherDisplay = ({ data, type }) => {
    if (!data || data.error) {
        return (
            <GlassCard className="mt-8 text-center p-12">
                <p className="text-xl text-slate-400">
                    {data?.error?.info || 'No data available. Please search for a city.'}
                </p>
            </GlassCard>
        );
    }

    const { location, current, historical, forecast } = data;

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Main Stats */}
            <GlassCard className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-white/10 to-transparent">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gradient">{location.name}</h2>
                        <p className="text-slate-400 flex items-center gap-1 mt-1">
                            <MapPin size={14} /> {location.region}, {location.country}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-5xl font-light">{current?.temperature || historical?.[Object.keys(historical)[0]]?.avgtemp}°</p>
                        <p className="text-slate-400">{current?.weather_descriptions?.[0] || 'Condition'}</p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <Wind className="text-blue-400" size={20} />
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Wind</p>
                            <p className="font-semibold">{current?.wind_speed} km/h</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <Droplets className="text-cyan-400" size={20} />
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Humidity</p>
                            <p className="font-semibold">{current?.humidity}%</p>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Details Grid */}
            <GlassCard>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-indigo-400" /> Details
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-400">Feels Like</span>
                        <span className="font-medium">{current?.feelslike}°C</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-400">UV Index</span>
                        <span className="font-medium">{current?.uv_index}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-400">Visibility</span>
                        <span className="font-medium">{current?.visibility} km</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Pressure</span>
                        <span className="font-medium">{current?.pressure} MB</span>
                    </div>
                </div>
            </GlassCard>

            {/* Conditional: Historical or Forecast info if available */}
            {historical && (
                <GlassCard>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Sun size={18} className="text-amber-400" /> Historical
                    </h3>
                    {Object.entries(historical).map(([date, info]) => (
                        <div key={date} className="bg-white/5 p-3 rounded-xl mb-3 border border-white/5">
                            <p className="text-xs font-bold text-slate-400">{date}</p>
                            <div className="flex justify-between mt-2">
                                <span>Avg: {info.avgtemp}°</span>
                                <span>Max: {info.maxtemp}°</span>
                            </div>
                        </div>
                    ))}
                </GlassCard>
            )}

            {!historical && (
                <GlassCard className="flex flex-col justify-center items-center text-center p-8">
                    <div className="bg-indigo-500/20 p-4 rounded-full mb-4">
                        <Thermometer className="text-indigo-400" size={32} />
                    </div>
                    <h4 className="font-semibold">Local Time</h4>
                    <p className="text-slate-400 mt-1">{location.localtime}</p>
                </GlassCard>
            )}
        </div>
    );
};

export default WeatherDisplay;
