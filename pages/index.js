import { useState, useEffect } from "react";
import Head from "next/head";

// Utility Functions
const getCollegeEndTime = (dayOfWeek) => {
  switch (dayOfWeek) {
    case 1: return { hours: 16, minutes: 30 }; // Monday: latest is 16:30
    case 2: return { hours: 16, minutes: 30 }; // Tuesday: latest is 16:30
    case 4: return { hours: 12, minutes: 15 }; // Thursday: 12:15
    case 5: return { hours: 14, minutes: 45 }; // Friday: latest is 14:45
    default: return null; // Wednesday, Saturday, Sunday: no college
  }
};

const getCollegeSchedule = (dayOfWeek) => {
  switch (dayOfWeek) {
    case 1: return {
      times: ["10:30", "14:45", "16:30"],
      sessions: [
        { instructor: "Mathew Goodwin", endTime: "10:30" },
        { instructor: "Ben Hobbs", endTime: "14:45" },
        { instructor: "Will Price", endTime: "16:30" }
      ]
    };
    case 2: return {
      times: ["12:15", "16:30"],
      sessions: [
        { instructor: "Jon Barnett", endTime: "12:15" },
        { instructor: "Ben Hobbs", endTime: "16:30" }
      ]
    };
    case 4: return {
      times: ["12:15"],
      sessions: [
        { instructor: "Ben Hobbs", endTime: "12:15" }
      ]
    };
    case 5: return {
      times: ["10:30", "12:15", "14:45"],
      sessions: [
        { instructor: "Ben Hobbs", endTime: "10:30" },
        { instructor: "Leek Deng", endTime: "12:15" },
        { instructor: "Ben Hobbs", endTime: "14:45" }
      ]
    };
    default: return null; // Wednesday, Saturday, Sunday: no college
  }
};

const getCurrentTeacher = (dayOfWeek, currentTime) => {
  const schedule = getCollegeSchedule(dayOfWeek);
  if (!schedule) return null;

  const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  const currentTotalMinutes = currentHours * 60 + currentMinutes;

  for (const session of schedule.sessions) {
    const [endHours, endMinutes] = session.endTime.split(':').map(Number);
    const endTotalMinutes = endHours * 60 + endMinutes;
    if (currentTotalMinutes <= endTotalMinutes) {
      return session.instructor;
    }
  }
  return null;
};

const isCollegeDay = (dayOfWeek) => [1, 2, 4, 5].includes(dayOfWeek);

const getTimeRemaining = (endTime) => {
  if (!endTime) return null;
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/London'
  });
  const parts = formatter.formatToParts(now);
  const hours = parseInt(parts.find(p => p.type === 'hour').value, 10);
  const minutes = parseInt(parts.find(p => p.type === 'minute').value, 10);
  const seconds = parseInt(parts.find(p => p.type === 'second').value, 10);
  const currentTime = hours * 3600 + minutes * 60 + seconds;

  const endTotalSeconds = endTime.hours * 3600 + endTime.minutes * 60;
  if (currentTime >= endTotalSeconds) {
    return { hours: 0, minutes: 0, seconds: 0, isOver: true };
  }
  const diffSecs = endTotalSeconds - currentTime;
  const hoursLeft = Math.floor(diffSecs / 3600);
  const minutesLeft = Math.floor((diffSecs % 3600) / 60);
  const secondsLeft = diffSecs % 60;
  return { hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft, isOver: false };
};

const formatTimeUnit = (unit) => unit.toString().padStart(2, '0');

const getCurrentTime = () => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/London'
  });
  const parts = formatter.formatToParts(now);
  const hours = parts.find(p => p.type === 'hour').value;
  const minutes = parts.find(p => p.type === 'minute').value;
  return `${hours}:${minutes}`;
};

const getDayName = (dayIndex) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[dayIndex];
};

const getMonthName = (monthIndex) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[monthIndex];
};

const getCurrentDate = () => {
  const date = new Date();
  return `${getDayName(date.getDay())}, ${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
};

const getDayOfWeek = () => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    timeZone: 'Europe/London'
  });
  const dayName = formatter.format(date);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days.indexOf(dayName);
};

const getCurrentTimeGreeting = () => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    hour12: false,
    timeZone: 'Europe/London'
  });
  const hour = parseInt(formatter.formatToParts(now).find(p => p.type === 'hour').value, 10);
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// CountdownTimer Component
const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentTeacher, setCurrentTeacher] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const newTime = getCurrentTime();
      const newDayOfWeek = getDayOfWeek();
      setCurrentTime(newTime);
      setDayOfWeek(newDayOfWeek);
      setCurrentTeacher(getCurrentTeacher(newDayOfWeek, newTime));

      const endTime = getCollegeEndTime(newDayOfWeek);
      if (endTime) {
        const remaining = getTimeRemaining(endTime);
        setTimeRemaining(remaining);
      } else {
        setTimeRemaining(null);
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const shouldShowCountdown = isCollegeDay(dayOfWeek) && timeRemaining && !timeRemaining.isOver;

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="glass-card p-6 rounded-xl w-full max-w-md animate-fade-in text-white select-none">
      <div className="flex items-center space-x-2 mb-4 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <h2 className="text-2xl font-semibold">College Schedule</h2>
      </div>
      <p className="text-lg mb-4">
        {currentTeacher ? `Current Instructor: ${currentTeacher}` : "No college"}
      </p>
      {shouldShowCountdown ? (
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div className="bg-primary/10 p-3 rounded-lg delayed-fade-in delay-100">
            <span className="text-3xl font-bold text-primary">
              {formatTimeUnit(timeRemaining.hours)}
            </span>
            <p className="text-sm text-muted-foreground mt-1">Hours</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg delayed-fade-in delay-200">
            <span className="text-3xl font-bold text-primary">
              {formatTimeUnit(timeRemaining.minutes)}
            </span>
            <p className="text-sm text-muted-foreground mt-1">Minutes</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg delayed-fade-in delay-300">
            <span className="text-3xl font-bold text-primary">
              {formatTimeUnit(timeRemaining.seconds)}
            </span>
            <p className="text-sm text-muted-foreground mt-1">Seconds</p>
          </div>
        </div>
      ) : null}
      <div className="mt-6 text-sm text-muted-foreground">
        <p className="font-semibold mb-2">Weekly Schedule:</p>
        <ul className="space-y-2">
          {daysOfWeek.map((day, index) => {
            const schedule = getCollegeSchedule(index);
            return (
              <li key={day} className="flex justify-between items-start">
                <span className="font-medium w-1/3">{day}:</span>
                <span className="text-right w-2/3">
                  {schedule ? schedule.times.join(' / ') : "No college"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// WeatherDisplay Component
const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockWeather = {
          temp: 16.2,
          description: "Partly cloudy",
          icon: "02d",
          feelsLike: 15.8,
          humidity: 73,
          windSpeed: 4.6
        };
        setWeather(mockWeather);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="glass-card p-6 rounded-xl w-full max-w-md flex flex-col items-center justify-center min-h-[200px] text-white select-none">
        <div className="animate-pulse-slow">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-4">
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
          </svg>
          <p className="text-center text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-6 rounded-xl w-full max-w-md">
        <p className="text-center text-destructive">{error}</p>
      </div>
    );
  }

  const getWeatherIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="glass-card p-6 rounded-xl w-full max-w-md animate-fade-in text-white select-none ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Weston-super-Mare</h2>
          <p className="text-muted-foreground">Current weather</p>
        </div>
        {weather && (
          <div className="flex items-center">
            <img
              src={getWeatherIconUrl(weather.icon)}
              alt={weather.description}
              className="w-16 h-16"
            />
          </div>
        )}
      </div>
      {weather && (
        <div className="mt-4">
          <div className="flex items-end mb-6">
            <span className="text-5xl font-bold">{Math.round(weather.temp)}</span>
            <span className="text-2xl">°C</span>
            <span className="ml-3 text-muted-foreground capitalize">{weather.description}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-primary/10 p-2 rounded-lg">
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="font-semibold">{Math.round(weather.feelsLike)}°C</p>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg">
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg">
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-semibold">{weather.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Index Component
export default function Index() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentTime());
      setCurrentDate(getCurrentDate());
      setGreeting(getCurrentTimeGreeting());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Head>
        <title>Weston-super-Mare College Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          :root {
            --background: 210 40% 98%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --popover: 0 0% 100%;
            --popover-foreground: 222.2 84% 4.9%;
            --primary: 210 50% 40%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210 40% 96.1%;
            --secondary-foreground: 222.2 47.4% 11.2%;
            --muted: 210 40% 96.1%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --accent: 210 40% 96.1%;
            --accent-foreground: 222.2 47.4% 11.2%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 210 40% 98%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --ring: 222.2 84% 4.9%;
            --radius: 0.75rem;
          }

          .dark {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --card: 222.2 84% 4.9%;
            --card-foreground: 210 40% 98%;
            --popover: 222.2 84% 4.9%;
            --popover-foreground: 210 40% 98%;
            --primary: 210 40% 70%;
            --primary-foreground: 222.2 47.4% 11.2%;
            --secondary: 217.2 32.6% 17.5%;
            --secondary-foreground: 210 40% 98%;
            --muted: 217.2 32.6% 17.5%;
            --muted-foreground: 215 20.2% 65.1%;
            --accent: 217.2 32.6% 17.5%;
            --accent-foreground: 210 40% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 210 40% 98%;
            --border: 217.2 32.6% 17.5%;
            --input: 217.2 32.6% 17.5%;
            --ring: 212.7 26.8% 83.9%;
          }

          * {
            border-color: hsl(var(--border));
          }

          body {
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            font-feature-settings: "rlig" 1, "calt" 1;
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .bg-gradient {
            background: linear-gradient(135deg, #6096B4 0%, #93BFCF 100%);
          }

          @keyframes delayedFadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .delayed-fade-in {
            opacity: 0;
            animation: delayedFadeIn 0.5s ease-out forwards;
          }

          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }

          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes slide-in-right {
            0% { transform: translateX(20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
          .animate-slide-in-right { animation: slide-in-right 0.5s ease-out forwards; }
          .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }
        `}</style>
      </Head>
      <div className="min-h-screen bg-gradient flex flex-col items-center select-none">
        <div className="container max-w-6xl px-4 py-8 md:py-16">
          <div className="text-center text-white mb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 animate-fade-in">
              {greeting}
            </h1>
            <p className="text-xl md:text-2xl animate-slide-in-right opacity-90">
              {currentDate} • {currentTime || 'Loading...'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center md:justify-end">
              <WeatherDisplay />
            </div>
            <div className="flex justify-center md:justify-start">
              <CountdownTimer />
            </div>
          </div>
          <div className="mt-auto pt-12 text-center">
            <p className="text-white/70 text-sm">
              Designed for Weston College DPDD Students
            </p>
          </div>
        </div>
      </div>
    </>
  );
}