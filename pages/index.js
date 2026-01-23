import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

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
      times: ["10:30", "12:30"],
      sessions: [
        { instructor: "Ben Hobbs", endTime: "12:00" }
      ]
    };
    case 2: return {
      times: ["10:30", "14:30"],
      sessions: [
        { instructor: "Jon Barnett", endTime: "14:30" },
      ]
    };
    case 4: return {
      times: ["10:30","12:00", "14:30", "16:00"],
      sessions: [
        { instructor: "Thomas Griffin", endTime: "10:30" },
        { instructor: "Ben Hobbs", endTime: "12:00" },
        { instructor: "Thomas Griffin", endTime: "14:30" },
        { instructor: "Will Price", endTime: "16:00" }
      ]
    };
    case 5: return {
      times: ["16:00"],
      sessions: [
        { instructor: "Ben Hobbs", endTime: "16:00" },
      ]
    };
    default: return null; // Saturday, Sunday: no college
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
const CountdownTimer = ({ setExpandedBox, isExpanded }) => {
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

  const content = (
    <>
      <div className="flex items-center space-x-2 mb-4 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <h2 className="text-2xl font-semibold">College Schedule</h2>
      </div>
      <p className="text-lg mb-4">
        {currentTeacher ? `Current Instructor: ${currentTeacher}` : "No college"}
      </p>
      {shouldShowCountdown ? (
        <div className="grid grid-cols-3 border-2 rounded-lg backdrop-blur gap-4 text-center mb-6">
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
      <div className="mt-6 text-sm text-muted-foreground border-2 rounded-lg backdrop-blur p-2">
        <p className="font-bold text-lg mb-2 text-white">Weekly Schedule:</p>
        <ul className="space-y-2">
          {daysOfWeek.map((day, index) => {
            const schedule = getCollegeSchedule(index);
            return (
              <li key={day} className="flex justify-between items-start">
                <span className="font-bold w-1/3">{day}:</span>
                <span className="text-right w-2/3 font-semibold">
                  {schedule ? schedule.times.join(' / ') : "No college"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );

  return isExpanded ? (
    <div className="fixed inset-0 z-50  backdrop-blur-sm animate-expand-in" onClick={() => setExpandedBox(null)}>
      <div className="glass-card p-8 rounded-xl w-full max-w-3xl text-white select-none relative transition-all duration-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-white hover:text-primary transition-colors" onClick={() => setExpandedBox(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
        {content}
      </div>
    </div>
  ) : (
    <div className="glass-card p-6 rounded-xl w-full max-w-lg animate-fade-in text-white select-none cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setExpandedBox('schedule')}>
      {content}
    </div>
  );
};

// WeatherDisplay Component
const WeatherDisplay = ({ setWeatherCondition, setExpandedBox, isExpanded }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const apiKey = 'beae3be250bcfec8d724082b77c62ff4';
        const city = 'Weston-super-Mare,UK';
        
        // Fetch current weather
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const currentResponse = await fetch(currentUrl);
        if (!currentResponse.ok) {
          throw new Error('Failed to fetch current weather data');
        }
        const currentData = await currentResponse.json();

        const currentWeatherData = {
          temp: currentData.main.temp,
          description: currentData.weather[0].description,
          icon: currentData.weather[0].icon,
          feelsLike: currentData.main.feels_like,
          humidity: currentData.main.humidity,
          windSpeed: currentData.wind.speed,
          main: currentData.weather[0].main.toLowerCase()
        };
        setCurrentWeather(currentWeatherData);
        setWeatherCondition(currentWeatherData.main);

        // Fetch 3-hourly forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        const forecastData = await forecastResponse.json();

        // Filter for the next 24 hours
        const now = new Date();
        const next24Hours = now.getTime() / 1000 + 24 * 3600; // Unix timestamp for 24 hours from now
        const threeHourly = forecastData.list
          .filter(item => item.dt <= next24Hours)
          .map(item => ({
            dt: item.dt,
            time: new Date(item.dt * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }),
            temp: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            feelsLike: item.main.feels_like,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed
          }));

        // Interpolate to get hourly data
        const hourly = [];
        for (let i = 0; i < threeHourly.length - 1; i++) {
          const current = threeHourly[i];
          const next = threeHourly[i + 1];
          const currentTime = new Date(current.dt * 1000);
          const nextTime = new Date(next.dt * 1000);
          const timeDiffHours = (next.dt - current.dt) / 3600; // Should be 3 hours

          // Add the current 3-hourly data point
          hourly.push(current);

          // Interpolate for the next two hours
          for (let j = 1; j < timeDiffHours; j++) {
            const fraction = j / timeDiffHours;
            const interpolatedTime = new Date(currentTime.getTime() + j * 3600 * 1000);
            const interpolated = {
              time: interpolatedTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }),
              temp: current.temp + (next.temp - current.temp) * fraction,
              feelsLike: current.feelsLike + (next.feelsLike - current.feelsLike) * fraction,
              humidity: Math.round(current.humidity + (next.humidity - current.humidity) * fraction),
              windSpeed: current.windSpeed + (next.windSpeed - current.windSpeed) * fraction,
              description: current.description, // Use current description
              icon: current.icon // Use current icon
            };
            hourly.push(interpolated);
          }
        }
        // Add the last 3-hourly data point
        if (threeHourly.length > 0) {
          hourly.push(threeHourly[threeHourly.length - 1]);
        }

        // Sort by time to ensure correct order
        hourly.sort((a, b) => {
          const [aHours, aMinutes] = a.time.split(':').map(Number);
          const [bHours, bMinutes] = b.time.split(':').map(Number);
          return (aHours * 60 + aMinutes) - (bHours * 60 + bMinutes);
        });

        setHourlyForecast(hourly);
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [setWeatherCondition]);

  const getWeatherIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const content = loading ? (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="animate-pulse-slow">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-4">
          <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
          <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
          <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
        </svg>
        <p className="text-center text-muted-foreground">Loading weather data...</p>
      </div>
    </div>
  ) : error ? (
    <p className="text-center text-destructive">{error}</p>
  ) : (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Weston-super-Mare</h2>
          <p className="text-muted-foreground font-semibold">Current weather</p>
        </div>
        {currentWeather && (
          <div className="flex items-center">
            <Image
              src={getWeatherIconUrl(currentWeather.icon)}
              alt={currentWeather.description}
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>
        )}
      </div>
      {currentWeather && (
        <div className="mt-4 border-2 rounded-lg backdrop-blur p-2">
          <div className="flex items-end mb-6">
            <span className="text-5xl font-bold">{Math.round(currentWeather.temp)}</span>
            <span className="text-2xl">°C</span>
            <span className="ml-3 text-muted-foreground capitalize">{currentWeather.description}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-primary/10 p-2 rounded-lg">
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="font-semibold">{Math.round(currentWeather.feelsLike)}°C</p>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg">
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{currentWeather.humidity}%</p>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg">
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-semibold">{currentWeather.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      )}
      {hourlyForecast.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-white">Today’s Forecast</h3>
          <div className="flex overflow-x-auto space-x-4 pb-4 scroll-smooth delayed-fade-in delay-200">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="bg-primary/10 p-3 rounded-lg min-w-[150px] flex-shrink-0">
                <p className="font-semibold">{hour.time}</p>
                <div className="flex items-center space-x-2">
                  <Image
                    src={getWeatherIconUrl(hour.icon)}
                    alt={hour.description}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <span className="capitalize">{hour.description}</span>
                </div>
                <p>{Math.round(hour.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return isExpanded ? (
    <div className="fixed inset-0 z-50  backdrop-blur-sm animate-expand-in" onClick={() => setExpandedBox(null)}>
      <div className="glass-card p-6 rounded-xl w-full max-w-lg text-white select-none relative transition-all duration-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-white hover:text-primary transition-colors" onClick={() => setExpandedBox(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
        {content}
      </div>
    </div>
  ) : (
    <div className="glass-card p-6 rounded-xl w-full max-w-lg animate-fade-in text-white select-none cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setExpandedBox('weather')}>
      {content}
    </div>
  );
};

// NewsBox Component
const NewsBox = () => {
  const news = {
    title: "AI is getting out of control: Charlie White Deepfakes are Getting More Popular",
    date: "Wednesday, 7 May 2025",
    description: "Using Grok AI, certain T-Level DPDD students have been creating various AI pictures and videos of Charlie White and posting them in their group chats to laugh about. Charlie White is, of course, not happy about this situation."
  };

  return (
    <div className="glass-card p-6 rounded-xl w-full max-w-6xl animate-fade-in text-white select-none mt-8">
      <div className="flex items-center space-x-2 mb-4 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16v2H4z"></path>
          <path d="M4 10h16v2H4z"></path>
          <path d="M4 16h10v2H4z"></path>
        </svg>
        <h2 className="text-2xl font-semibold">News of the Day</h2>
      </div>
      <h3 className="text-xl font-bold mb-2">{news.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{news.date}</p>
      <p className="text-base border-2 rounded-lg backdrop-blur p-2">{news.description}</p>
    </div>
  );
};

// ESPAnnouncement Component
const ESPAnnouncement = ({ setExpandedBox, isExpanded }) => {
  const espTasks = [
    { task: "Task 1: Planning", date: "Wednesday, 14 May 2025" },
    { task: "Task 2: Errors in Code", date: "Friday, 16 May 2025" },
    { task: "Task 3: Design", date: "Monday, 19 May 2025" },
    { task: "Task 4a: Development", date: "Wednesday, 21 May 2025" },
    { task: "Task 4b: Evaluation", date: "Friday, 23 May 2025" }
  ];

  const content = (
    <>
      <div className="flex items-center space-x-2 mb-4 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <path d="M3 6h18"></path>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <h2 className="text-2xl font-semibold">ESP Announcement</h2>
      </div>
      <h3 className="text-xl font-bold mb-2">Occupational Specialism - Task 1</h3>
      <p className="text-base font-semi mb-4">Starts very soon!</p>
      <p className="text-base font-semi mb-4">Information will be given shortly</p>
    </>
  );

  return isExpanded ? (
    <div className="fixed inset-0 z-50  backdrop-blur-sm animate-expand-in" onlick={() => setExpandedBox(null)}>
      <div className="glass-card p-8 rounded-xl w-full max-w-3xl text-white select-none relative transition-all duration-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-white hover:text-primary transition-colors" onClick={() => setExpandedBox(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
        {content}
      </div>
    </div>
  ) : (
    <div className="glass-card p-6 rounded-xl w-full max-w-lg animate-fade-in text-white select-none cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setExpandedBox('esp')}>
      {content}
    </div>
  );
};

// Index Component
export default function Index() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [greeting, setGreeting] = useState('');
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [expandedBox, setExpandedBox] = useState(null);

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

  // Map weather conditions to specific video URLs
  const getWeatherVideo = () => {
    const videoMap = {
      rain: 'https://cdn.pixabay.com/video/2017/08/06/11169-228530159_large.mp4',
      clear: 'https://cdn.pixabay.com/video/2025/02/24/260589_large.mp4',
      snow: 'https://cdn.pixabay.com/video/2023/11/12/188778-883818276_large.mp4',
      thunderstorm: 'https://cdn.pixabay.com/video/2023/07/26/173330-849202512_large.mp4',
      clouds: 'https://cdn.pixabay.com/video/2023/04/11/158384-816637349_large.mp4'
    };
    return videoMap[weatherCondition] || videoMap.clouds;
  };

  const handleVideoError = () => {
    console.error('Failed to load weather video for condition:', weatherCondition);
    setVideoError(true);
  };

  return (
    <>
      <Head>
        <title>Weston-super-Mare College Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            background: rgba(0, 0, 0, 0.07);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 3px solid rgba(255, 255, 255, 0.2);
          }

          .bg-gradient {
            background: linear-gradient(135deg, #6096B4 0%, #93BFCF 100%);
          }

          .weather-video {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
            opacity: 0.9;
            background-color: #000;
            filter: blur(10px);
          }

          .content-container {
            position: relative;
            z-index: 1;
            width: 100%;
            min-height: 100vh;
          }

          /* Responsive classes */
          @media (min-width: 768px) {
            .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .md\\:justify-center { justify-content: center; }
            .md\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .md\\:text-6xl { font-size: 3.75rem; line-height: 1; }
            .md\\:py-16 { padding-top: 4rem; padding-bottom: 4rem; }
           .md\\:max-w-3xl { max-width: 48rem; }
          }

          /* Animations */
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

          @keyframes expand-in {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes fade-out {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }

          .animate-expand-in {
            animation: expand-in 0.3s ease-out forwards;
          }

          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
          .animate-slide-in-right { animation: slide-in-right 0.5s ease-out forwards; }
          .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }

          /* Ensure expanded box doesn't trigger parent click */
          .glass-card.relative {
            pointer-events: auto;
          }

          /* Scrollbar styling for hourly forecast */
          .overflow-x-auto::-webkit-scrollbar {
            height: 8px;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
          }

          .overflow-x-auto::-webkit-scrollbar-track {
            background: transparent;
          }
        `}</style>
      </Head>
      <div className="relative min-h-screen flex flex-col items-center select-none">
        <video
          className="weather-video"
          autoPlay
          loop
          muted
          playsInline
          src={getWeatherVideo()}
          onError={handleVideoError}
        />
        <div className={`content-container flex flex-col items-center ${videoError ? 'bg-gradient' : ''}`}>
          <div className="container max-w-6xl px-4 py-8 md:py-16">
            <div className="text-center text-white mb-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-2 animate-fade-in">
                {greeting}
              </h1>
              <p className="text-xl md:text-2xl animate-slide-in-right opacity-90">
                {currentDate} • {currentTime || 'Loading...'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex justify-center md:justify-center">
                <WeatherDisplay
                  setWeatherCondition={setWeatherCondition}
                  setExpandedBox={setExpandedBox}
                  isExpanded={expandedBox === 'weather'}
                />
              </div>
              <div className="flex justify-center md:justify-center">
                <CountdownTimer
                  setExpandedBox={setExpandedBox}
                  isExpanded={expandedBox === 'schedule'}
                />
              </div>
              <div className="flex justify-center md:justify-center">
                <ESPAnnouncement
                  setExpandedBox={setExpandedBox}
                  isExpanded={expandedBox === 'esp'}
                />
              </div>
            </div>
            <NewsBox />
            <div className="mt-12 text-center">
              <p className="text-white/70 text-sm">
                Designed for Weston College DPDD Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}