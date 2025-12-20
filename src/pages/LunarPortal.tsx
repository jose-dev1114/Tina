import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useClerkAuth';
import {
  Moon, Star, Calendar, MapPin, Clock, Download,
  Sparkles, Heart, Play, Filter, BookOpen, Video, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LunarPortal() {
  const { userProfile, loading, toggleFavoriteMeditation } = useAuth();
  const navigate = useNavigate();
  const [chartLoading, setChartLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentMoonPhase, setCurrentMoonPhase] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);

    if (userProfile?.birthChartData?.chartUrl) {
      setChartLoading(false);
    }

    // Calculate current moon phase
    calculateCurrentMoonPhase();
  }, [userProfile?.birthChartData?.chartUrl]);

  const calculateCurrentMoonPhase = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Known new moon date (Jan 29, 2025)
    const knownNewMoon = new Date(2025, 0, 29);
    const lunarCycle = 29.53059; // days
    
    const daysSinceKnownNewMoon = (today.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const phase = ((daysSinceKnownNewMoon % lunarCycle) + lunarCycle) % lunarCycle;
    
    if (phase < 1.84566) setCurrentMoonPhase('🌑 New Moon');
    else if (phase < 7.38264) setCurrentMoonPhase('🌒 Waxing Crescent');
    else if (phase < 9.22830) setCurrentMoonPhase('🌓 First Quarter');
    else if (phase < 14.76528) setCurrentMoonPhase('🌔 Waxing Gibbous');
    else if (phase < 16.61094) setCurrentMoonPhase('🌕 Full Moon');
    else if (phase < 22.14792) setCurrentMoonPhase('🌖 Waning Gibbous');
    else if (phase < 23.99358) setCurrentMoonPhase('🌗 Last Quarter');
    else setCurrentMoonPhase('🌘 Waning Crescent');
  };

  const handleDownloadChart = async () => {
    const chartUrl = userProfile?.birthChartData?.chartUrl;
    if (!chartUrl) {
      toast.error('Birth chart image not available');
      return;
    }

    try {
      setDownloading(true);
      const response = await fetch(chartUrl);
      if (!response.ok) throw new Error('Failed to fetch chart image');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `birth-chart-${userProfile?.birthDate || 'chart'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Birth chart downloaded successfully!');
    } catch (error) {
      console.error('Error downloading chart:', error);
      toast.error('Failed to download chart. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-primary-700 text-lg font-medium">Opening your Lunar Portal...</p>
        </div>
      </div>
    );
  }

  if (!userProfile?.hasCompletedAstroQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white rounded-3xl shadow-2xl p-12">
          <Star className="h-16 w-16 text-primary-600 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-primary-900 mb-4">Welcome to Your Lunar Portal</h1>
          <p className="text-gray-600 mb-8">
            Complete the Astro Quiz to unlock your personalized cosmic dashboard and discover your birth chart.
          </p>
          <button
            onClick={() => navigate('/quiz')}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  const birthChart = userProfile?.birthChartData;
  const chartUrl = birthChart?.chartUrl;
  const moonSign = birthChart?.moonSign || userProfile?.moonSign;
  const moonHouse = birthChart?.moonHouse;

  // Mock meditation library data (replace with actual data from Firebase)
  const meditationLibrary = [
    { id: '1', title: 'Aries Full Moon', duration: '45 min', sign: 'Aries', element: 'fire', isFavorite: false },
    { id: '2', title: 'Cancer New Moon', duration: '45 min', sign: 'Cancer', element: 'water', isFavorite: false },
    { id: '3', title: 'Gemini Full Moon', duration: '45 min', sign: 'Gemini', element: 'air', isFavorite: false },
  ];

  const filteredMeditations = selectedFilter === 'all' 
    ? meditationLibrary 
    : meditationLibrary.filter(m => m.element === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-2 flex items-center justify-center gap-3">
            <Sparkles className="h-10 w-10 text-primary-600" />
            Lunar Portal
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back, {userProfile?.firstName || 'Sacred Soul'}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Birth Chart & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Birth Chart Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-primary-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6">
                <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                  <Star className="h-6 w-6" />
                  Your Birth Chart
                </h2>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Chart Image */}
                  <div className="aspect-square bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center overflow-hidden">
                    {chartLoading ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading chart...</p>
                      </div>
                    ) : chartUrl ? (
                      <img
                        src={chartUrl}
                        alt="Natal Wheel Chart"
                        className="w-full h-full object-contain"
                        onLoad={() => setChartLoading(false)}
                      />
                    ) : null}
                  </div>

                  {/* Moon Sign */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        <Moon className="h-8 w-8 text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-900">Moon Sign</h3>
                      </div>
                      <p className="text-4xl font-bold text-blue-700 mb-2">{moonSign || 'N/A'}</p>
                      {moonHouse && (
                        <p className="text-base text-gray-600 mb-3">House {moonHouse}</p>
                      )}
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Your emotional nature and inner world
                      </p>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={handleDownloadChart}
                      disabled={downloading || !chartUrl}
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          <span>Download Chart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Moon Phase Report Card */}
            {birthChart?.moonPhaseReport && (
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-lg border border-purple-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
                  <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                    <Moon className="h-6 w-6" />
                    Your Birth Moon Phase
                  </h2>
                  <p className="text-purple-100 text-sm mt-1">
                    {birthChart.moonPhaseReport.consideredDate}
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Moon Phase Name */}
                  <div className="bg-white rounded-2xl p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Moon Phase</p>
                    <p className="text-3xl font-bold text-purple-700">
                      {birthChart.moonPhaseReport.moonPhase}
                    </p>
                  </div>

                  {/* Significance */}
                  {birthChart.moonPhaseReport.significance && (
                    <div className="bg-white rounded-2xl p-4 border border-purple-200">
                      <p className="text-sm font-semibold text-purple-700 mb-2">Significance</p>
                      <p className="text-gray-700 leading-relaxed">
                        {birthChart.moonPhaseReport.significance}
                      </p>
                    </div>
                  )}

                  {/* Personal Report */}
                  {birthChart.moonPhaseReport.report && (
                    <div className="bg-white rounded-2xl p-4 border border-purple-200">
                      <p className="text-sm font-semibold text-purple-700 mb-2">Your Moon Phase Guidance</p>
                      <p className="text-gray-700 leading-relaxed">
                        {birthChart.moonPhaseReport.report}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Birth Information Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-primary-100 p-6">
              <h2 className="text-2xl font-serif font-bold text-primary-900 mb-6">Birth Information</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Birth Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {userProfile?.birthDate
                        ? new Date(userProfile.birthDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Birth Time</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {userProfile?.birthTime || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Birth Place</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {userProfile?.birthPlace || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Moon Phase & Quick Actions */}
          <div className="space-y-6">
            {/* Current Moon Phase */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                <Moon className="h-6 w-6" />
                Today's Moon
              </h2>
              <div className="text-center py-6">
                <p className="text-5xl mb-3">{currentMoonPhase.split(' ')[0]}</p>
                <p className="text-2xl font-semibold">{currentMoonPhase.split(' ').slice(1).join(' ')}</p>
                <p className="text-sm text-white/80 mt-3">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Personalized Meditations - Coming Soon */}
            <div className="bg-white rounded-3xl shadow-lg border border-primary-100 p-6">
              <h2 className="text-xl font-serif font-bold text-primary-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary-600" />
                Personalized Meditations
              </h2>
              <div className="text-center py-8">
                <div className="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-10 w-10 text-primary-600" />
                </div>
                <p className="text-gray-600 mb-4">
                  AI-powered meditations tailored to your unique birth chart
                </p>
                <span className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* Book 1-on-1 with Tina */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-serif font-bold mb-3 flex items-center gap-2">
                <Video className="h-6 w-6" />
                Book with Tina
              </h2>
              <p className="text-white/90 text-sm mb-4">
                Get personalized guidance and deep insights into your birth chart
              </p>
              <button
                onClick={() => navigate('/coaching')}
                className="w-full bg-white text-primary-700 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Schedule Session</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Lunar Wisdom Card */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-lg border border-purple-200 p-6">
              <h2 className="text-lg font-serif font-bold text-purple-900 mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-600" />
                Today's Lunar Wisdom
              </h2>
              <div className="space-y-3">
                <p className="text-purple-800 text-sm leading-relaxed italic">
                  "The moon teaches us that darkness is necessary for growth. In the waning phases, we release what no longer serves us. In the waxing phases, we plant seeds of intention."
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-600">
                  <Heart className="h-4 w-4" />
                  <span>Reflect on what you're ready to release or nurture today</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meditation Library */}
        <div className="bg-white rounded-3xl shadow-lg border border-primary-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-900 mb-4 md:mb-0 flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary-600" />
              Meditation Library
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {['all', 'fire', 'earth', 'air', 'water'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                      : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Meditation Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeditations.map((meditation) => (
              <div
                key={meditation.id}
                className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">
                      {meditation.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{meditation.duration}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavoriteMeditation(meditation.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${meditation.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
                    {meditation.sign}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {meditation.element}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/shop')}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Play Meditation</span>
                </button>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/shop')}
              className="bg-primary-100 text-primary-700 px-8 py-3 rounded-full font-semibold hover:bg-primary-200 transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>View All Meditations</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

