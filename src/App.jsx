import { useState, useEffect } from 'react';
import bg from './assets/bg.png';
import './App.css';
import { transformImageTime } from './Pic';

// Helper function to figure out which light profile to use based on the hour
function getLightStatus(date) {
    const hour = date.getHours();
    if (hour >= 4 && hour < 6)   return 'fajr';   // 4 AM - 5:59 AM
    if (hour >= 6 && hour < 15)  return 'dohr';   // 6 AM - 2:59 PM (Daylight)
    if (hour >= 15 && hour < 18) return 'asr';    // 3 PM - 5:59 PM (Afternoon)
    if (hour >= 18 && hour < 19) return 'magrib'; // 6 PM - 6:59 PM (Sunset)
    return 'isha';                                // 7 PM - 3:59 AM (Night)
}

function Clock({ currentTime }) {
    function format() {
        let h = currentTime.getHours();
        let m = currentTime.getMinutes();
        let s = currentTime.getSeconds();
        let meridiem = h >= 12 ? 'pm' : 'am';
        h = h % 12 || 12;
        return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s} ${meridiem}`;
    }
    return (
        <div className='center'>
            <code id='clock' className='counter'>{format()}</code>
        </div>
    );
}

function App() {
    const [currentTime, setCurrentTime] = useState(new Date());
    // 1. Keep the clock ticking continuously
    useEffect(() => {
        const refresh = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(refresh);
    }, []);
    // 2. Track the active lighting string ('fajr', 'dohr', etc.)
    const activeLight = getLightStatus(currentTime);
    // 3. Re-run background processing only when the status changes (not every second)
    useEffect(() => {
        transformImageTime(bg, activeLight)
            .then((picDataUrl) => {
                document.body.style.backgroundImage = `url(${picDataUrl})`;
            })
            .catch((err) => console.error("Error transforming background:", err));
    }, [activeLight]); // Dependency array ensures performance is locked to hour switches
    return (
        <div>
            <Clock currentTime={currentTime} />
        </div>
    );
}

export default App;
