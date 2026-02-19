import React, { useState, useEffect } from 'react';
import { Search, History, Cloud, MapPin, Loader2, AlertCircle } from 'lucide-react';
import GlassCard from './components/GlassCard';
import WeatherDisplay from './components/WeatherDisplay';
import { getCurrentWeather, getHistoricalWeather } from './services/weatherService';

function App() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('current'); // 'current' or 'history'
  const [historyDate, setHistoryDate] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      let data;
      if (view === 'current') {
        data = await getCurrentWeather(query);
      } else {
        if (!historyDate) {
          setError('Please select a date for historical weather.');
          setLoading(false);
          return;
        }
        data = await getHistoricalWeather(query, historyDate);
      }

      if (data.error) {
        setError(data.error.info);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      const detailedError = err.response?.data?.error?.info
        || (err.code ? `[${err.code}] ${err.message}` : err.message)
        || 'Unknown connection error';

      setError(`Error: ${detailedError}. (Check if you are on HTTPS but using HTTP API)`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex flex-col items-center">
      {/* Version Tag for Debugging */}
      <div className="fixed bottom-4 right-4 text-[10px] text-white/20 select-none">
        v1.0.3-debug
      </div>
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-6xl font-extrabold text-gradient mb-4">WeatherStack</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Experience premium weather insights with our beautiful glassmorphic interface.
          Real-time updates, historical data, and more.
        </p>
      </div>

      {/* Control Panel */}
      <GlassCard className="w-full max-w-2xl p-4 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              className="glass-input w-full pl-12"
              placeholder="Search for a city (e.g., London, New York)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {view === 'history' && (
            <input
              type="date"
              className="glass-input"
              value={historyDate}
              onChange={(e) => setHistoryDate(e.target.value)}
            />
          )}

          <button type="submit" className="glass-button" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Cloud size={20} />}
            Search
          </button>
        </form>

        <div className="flex gap-4 mt-6 border-t border-white/5 pt-4 justify-center">
          <button
            className={`glass-button text-sm ${view === 'current' ? 'active' : ''}`}
            onClick={() => setView('current')}
          >
            Current Weather
          </button>
          <button
            className={`glass-button text-sm ${view === 'history' ? 'active' : ''}`}
            onClick={() => setView('history')}
          >
            History
          </button>
        </div>
      </GlassCard>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-2xl flex items-center gap-3 mb-8 animate-fade-in">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Weather Results */}
      {weatherData && <WeatherDisplay data={weatherData} type={view} />}

      {!weatherData && !loading && !error && (
        <div className="mt-20 text-slate-500 flex flex-col items-center">
          <div className="bg-white/5 p-6 rounded-full mb-4">
            <MapPin size={48} className="opacity-20" />
          </div>
          <p>Start by searching for a location above</p>
        </div>
      )}
    </div>
  );
}

export default App;
