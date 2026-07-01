// World Clock Application

class WorldClock {
    constructor() {
        this.clocks = [];
        this.timezones = this.getTimezones();
        this.STORAGE_KEY = 'world_clocks';
        
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.populateTimezoneSelect();
        this.render();
        this.startClock();
    }
    
    setupEventListeners() {
        document.getElementById('addBtn').addEventListener('click', () => this.addClock());
        document.getElementById('timezoneSelect').addEventListener('change', (e) => {
            if (e.target.value) {
                this.addClockByTimezone(e.target.value);
                e.target.value = '';
            }
        });
        
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tz = e.target.dataset.tz;
                this.addClockByTimezone(tz);
            });
        });
        
        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterTimezones(e.target.value);
        });
    }
    
    getTimezones() {
        return [
            // Americas
            { name: 'New York', tz: 'America/New_York', offset: -5 },
            { name: 'Los Angeles', tz: 'America/Los_Angeles', offset: -8 },
            { name: 'Chicago', tz: 'America/Chicago', offset: -6 },
            { name: 'Denver', tz: 'America/Denver', offset: -7 },
            { name: 'Toronto', tz: 'America/Toronto', offset: -5 },
            { name: 'Mexico City', tz: 'America/Mexico_City', offset: -6 },
            { name: 'São Paulo', tz: 'America/Sao_Paulo', offset: -3 },
            { name: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires', offset: -3 },
            
            // Europe
            { name: 'London', tz: 'Europe/London', offset: 0 },
            { name: 'Paris', tz: 'Europe/Paris', offset: 1 },
            { name: 'Berlin', tz: 'Europe/Berlin', offset: 1 },
            { name: 'Rome', tz: 'Europe/Rome', offset: 1 },
            { name: 'Madrid', tz: 'Europe/Madrid', offset: 1 },
            { name: 'Amsterdam', tz: 'Europe/Amsterdam', offset: 1 },
            { name: 'Moscow', tz: 'Europe/Moscow', offset: 3 },
            { name: 'Istanbul', tz: 'Europe/Istanbul', offset: 3 },
            
            // Middle East & Africa
            { name: 'Dubai', tz: 'Asia/Dubai', offset: 4 },
            { name: 'Cairo', tz: 'Africa/Cairo', offset: 2 },
            { name: 'Johannesburg', tz: 'Africa/Johannesburg', offset: 2 },
            { name: 'Lagos', tz: 'Africa/Lagos', offset: 1 },
            
            // Asia
            { name: 'Hong Kong', tz: 'Asia/Hong_Kong', offset: 8 },
            { name: 'Tokyo', tz: 'Asia/Tokyo', offset: 9 },
            { name: 'Seoul', tz: 'Asia/Seoul', offset: 9 },
            { name: 'Bangkok', tz: 'Asia/Bangkok', offset: 7 },
            { name: 'Singapore', tz: 'Asia/Singapore', offset: 8 },
            { name: 'Mumbai', tz: 'Asia/Kolkata', offset: 5.5 },
            { name: 'Delhi', tz: 'Asia/Kolkata', offset: 5.5 },
            { name: 'Bangalore', tz: 'Asia/Kolkata', offset: 5.5 },
            { name: 'Shanghai', tz: 'Asia/Shanghai', offset: 8 },
            { name: 'Beijing', tz: 'Asia/Shanghai', offset: 8 },
            { name: 'Manila', tz: 'Asia/Manila', offset: 8 },
            { name: 'Jakarta', tz: 'Asia/Jakarta', offset: 7 },
            
            // Oceania
            { name: 'Sydney', tz: 'Australia/Sydney', offset: 10 },
            { name: 'Melbourne', tz: 'Australia/Melbourne', offset: 10 },
            { name: 'Auckland', tz: 'Pacific/Auckland', offset: 12 },
            { name: 'Fiji', tz: 'Pacific/Fiji', offset: 12 },
        ];
    }
    
    populateTimezoneSelect() {
        const select = document.getElementById('timezoneSelect');
        this.timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.tz;
            option.textContent = `${tz.name} (UTC${tz.offset >= 0 ? '+' : ''}${tz.offset})`;
            select.appendChild(option);
        });
    }
    
    filterTimezones(search) {
        const select = document.getElementById('timezoneSelect');
        const searchLower = search.toLowerCase();
        
        Array.from(select.options).forEach(option => {
            if (option.value === '') return;
            option.style.display = option.textContent.toLowerCase().includes(searchLower) ? '' : 'none';
        });
    }
    
    addClock() {
        const select = document.getElementById('timezoneSelect');
        if (!select.value) {
            alert('Please select a timezone');
            return;
        }
        this.addClockByTimezone(select.value);
        select.value = '';
    }
    
    addClockByTimezone(tz) {
        const tzData = this.timezones.find(t => t.tz === tz);
        if (!tzData) return;
        
        // Check if already added
        if (this.clocks.some(c => c.tz === tz)) {
            alert(`${tzData.name} is already added!`);
            return;
        }
        
        const clock = {
            id: Date.now(),
            name: tzData.name,
            tz: tz,
            time: new Date(),
        };
        
        this.clocks.push(clock);
        this.saveToStorage();
        this.render();
    }
    
    removeClock(id) {
        this.clocks = this.clocks.filter(c => c.id !== id);
        this.saveToStorage();
        this.render();
    }
    
    getTimeInTimezone(tz) {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        
        return new Date(formatter.format(now));
    }
    
    formatTime(tz) {
        const time = this.getTimeInTimezone(tz);
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const seconds = String(time.getSeconds()).padStart(2, '0');
        
        return { hours, minutes, seconds, date: time };
    }
    
    getAnalogClockAngles(tz) {
        const time = this.getTimeInTimezone(tz);
        const hours = time.getHours() % 12;
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        
        return {
            hourAngle: (hours * 30) + (minutes * 0.5),
            minuteAngle: (minutes * 6) + (seconds * 0.1),
            secondAngle: seconds * 6,
        };
    }
    
    render() {
        const grid = document.getElementById('clocksGrid');
        
        if (this.clocks.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🌍</div>
                    <p>No time zones added yet. Add one using the dropdown or preset buttons!</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = this.clocks.map(clock => {
            const timeData = this.formatTime(clock.tz);
            const angles = this.getAnalogClockAngles(clock.tz);
            
            return `
                <div class="clock-card">
                    <div class="city-name">${clock.name}</div>
                    <div class="timezone-name">${clock.tz}</div>
                    
                    <div class="digital-time">${timeData.hours}:${timeData.minutes}:${timeData.seconds}</div>
                    <div class="time-format">24-hour format</div>
                    <div class="date-info">${this.formatDate(timeData.date)}</div>
                    
                    <div class="analog-clock">
                        <div class="hand hour-hand" style="transform: rotate(${angles.hourAngle}deg)"></div>
                        <div class="hand minute-hand" style="transform: rotate(${angles.minuteAngle}deg)"></div>
                        <div class="hand second-hand" style="transform: rotate(${angles.secondAngle}deg)"></div>
                        <div class="clock-center"></div>
                    </div>
                    
                    <button class="btn-remove" onclick="worldClock.removeClock(${clock.id})">Remove</button>
                </div>
            `;
        }).join('');
    }
    
    formatDate(date) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    startClock() {
        setInterval(() => {
            this.render();
        }, 1000);
    }
    
    saveToStorage() {
        const data = this.clocks.map(c => ({
            id: c.id,
            name: c.name,
            tz: c.tz,
        }));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
    
    loadFromStorage() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.clocks = data;
            } catch (e) {
                console.error('Error loading clocks:', e);
                this.clocks = [];
            }
        }
    }
}

// Initialize when DOM is loaded
let worldClock;
document.addEventListener('DOMContentLoaded', () => {
    worldClock = new WorldClock();
});