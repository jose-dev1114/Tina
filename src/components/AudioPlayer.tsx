import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Loader2 } from 'lucide-react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';
import toast from 'react-hot-toast';

interface AudioPlayerProps {
  title: string;
  fileName: string;
  onClose: () => void;
}

const AudioPlayer = ({ title, fileName, onClose }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch audio URL from Firebase Storage on mount
  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        setLoading(true);
        console.log('🎵 Fetching audio from Firebase Storage:', fileName);

        // Get download URL from Firebase Storage (files are in root, not in recordings folder)
        const audioRef = ref(storage, fileName);
        const url = await getDownloadURL(audioRef);

        console.log('✅ Audio URL fetched successfully:', url);
        setAudioUrl(url);
        setError('');

        toast.success('Audio loaded! Enjoy your meditation 🎧', {
          duration: 2000,
          style: {
            borderRadius: '12px',
            background: '#10b981',
            color: '#fff',
            padding: '16px',
          },
        });
      } catch (err) {
        console.error('❌ Error fetching audio URL:', err);
        setError('Failed to load audio. Please try again.');
        toast.error('Failed to load audio', {
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#ef4444',
            color: '#fff',
            padding: '16px',
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAudioUrl();
  }, [fileName]);

  // Setup audio event listeners and autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      // Autoplay when audio is loaded
      audio.play()
        .then(() => {
          setIsPlaying(true);
          console.log('🎵 Audio started playing automatically');
        })
        .catch((error) => {
          console.log('⚠️ Autoplay prevented by browser:', error);
          // Autoplay was prevented, user needs to click play
        });
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Show loading state
  if (loading) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-2xl z-[9999] transition-all duration-500 ease-out"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Loading audio...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 bg-red-600 text-white shadow-2xl z-[9999] transition-all duration-500 ease-out"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{error}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  console.log('🎨 AudioPlayer rendering:', { title, fileName, audioUrl, isPlaying, loading, error });

  return (
    <>
      {/* Full Screen Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 transition-all duration-500"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="relative w-full max-w-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 rounded-3xl shadow-2xl overflow-hidden"
          style={{ animation: 'scaleIn 0.4s ease-out' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-300 rounded-full blur-3xl"></div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-sm"
            aria-label="Close player"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12">
            {/* Album Art / Visualization */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                  {/* Animated waves when playing */}
                  {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                      <div className="w-2 bg-white/60 rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0ms', animationDuration: '800ms' }}></div>
                      <div className="w-2 bg-white/60 rounded-full animate-pulse" style={{ height: '60%', animationDelay: '100ms', animationDuration: '800ms' }}></div>
                      <div className="w-2 bg-white/60 rounded-full animate-pulse" style={{ height: '80%', animationDelay: '200ms', animationDuration: '800ms' }}></div>
                      <div className="w-2 bg-white/60 rounded-full animate-pulse" style={{ height: '60%', animationDelay: '300ms', animationDuration: '800ms' }}></div>
                      <div className="w-2 bg-white/60 rounded-full animate-pulse" style={{ height: '40%', animationDelay: '400ms', animationDuration: '800ms' }}></div>
                    </div>
                  )}
                  {/* Static icon when paused */}
                  {!isPlaying && (
                    <div className="text-white/80">
                      <svg className="w-24 h-24 md:w-32 md:h-32" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                    </div>
                  )}
                </div>
                {/* Pulsing ring when playing */}
                {isPlaying && (
                  <div className="absolute inset-0 rounded-3xl border-4 border-white/30 animate-ping" style={{ animationDuration: '2s' }}></div>
                )}
              </div>
            </div>

            {/* Title and Status */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
              <p className="text-primary-200 flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {isPlaying ? 'Now Playing' : 'Paused'}
              </p>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <div className="relative group">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer transition-all
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-6
                    [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-xl
                    [&::-webkit-slider-thumb]:transition-all
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-moz-range-thumb]:w-6
                    [&::-moz-range-thumb]:h-6
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:shadow-xl
                    group-hover:h-4"
                  style={{
                    background: `linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>

              {/* Time labels */}
              <div className="flex justify-between mt-3 text-sm font-semibold text-white/80 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-6">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="bg-white text-primary-700 p-6 rounded-full hover:bg-primary-50 transition-all duration-200 shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10" fill="currentColor" />
                ) : (
                  <Play className="h-10 w-10 ml-1" fill="currentColor" />
                )}
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleMute}
                className="p-3 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 text-white"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </button>
              <div className="flex-1 max-w-xs">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>
              <span className="text-white/80 text-sm font-semibold min-w-[3rem] text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
    </>
  );
};

export default AudioPlayer;

