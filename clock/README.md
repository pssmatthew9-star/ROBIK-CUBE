# 🌍 World Clock - Multiple Time Zones

A beautiful digital clock application that displays the current time in different time zones around the world with both digital and analog clock faces.

## Features

✅ **Multiple Time Zones** - Add any time zone from around the world
✅ **Digital Display** - Clear 24-hour format time display
✅ **Analog Clocks** - Beautiful analog clock faces with moving hands
✅ **Date Display** - Current date for each timezone
✅ **Real-time Updates** - Seconds update smoothly
✅ **Quick Add** - Preset buttons for popular cities
✅ **Search** - Filter timezones by city name
✅ **Local Storage** - Your selected timezones are saved
✅ **Responsive Design** - Works on desktop and mobile
✅ **Beautiful UI** - Gradient backgrounds and smooth animations
✅ **Remove Clocks** - Easily remove unwanted timezone displays

## How to Use

### 1. Open the Application
Simply open `index.html` in your web browser.

### 2. Add a Time Zone

**Option A: Using Quick Add Buttons**
- Click any preset city button (New York, London, Tokyo, etc.)
- The clock appears instantly!

**Option B: Using Dropdown**
1. Click on the timezone dropdown menu
2. Select a city or timezone
3. Click the "Add" button
4. The clock appears in the grid

**Option C: Using Search**
1. Type in the search box (e.g., "Tokyo", "Paris", "Sydney")
2. Select from filtered results
3. Click "Add"

### 3. View Your Clocks
- Each clock shows:
  - City name
  - Timezone (e.g., Asia/Tokyo)
  - Digital time in 24-hour format
  - Current date
  - Analog clock face with moving hands

### 4. Remove a Clock
- Click the "Remove" button on any clock card
- It disappears from the display

## Supported Time Zones

### Americas
- New York (EDT/EST)
- Los Angeles (PDT/PST)
- Chicago (CDT/CST)
- Denver (MDT/MST)
- Toronto (EDT/EST)
- Mexico City
- São Paulo
- Buenos Aires

### Europe
- London (GMT/BST)
- Paris (CET/CEST)
- Berlin (CET/CEST)
- Rome (CET/CEST)
- Madrid (CET/CEST)
- Amsterdam (CET/CEST)
- Moscow (MSK)
- Istanbul (EET/EEST)

### Middle East & Africa
- Dubai (GST)
- Cairo (EET)
- Johannesburg (SAST)
- Lagos (WAT)

### Asia
- Hong Kong (HKT)
- Tokyo (JST)
- Seoul (KST)
- Bangkok (ICT)
- Singapore (SGT)
- Mumbai/Delhi/Bangalore (IST)
- Shanghai/Beijing (CST)
- Manila (PHT)
- Jakarta (WIB)

### Oceania
- Sydney (AEDT/AEST)
- Melbourne (AEDT/AEST)
- Auckland (NZDT/NZST)
- Fiji (FJT)

## Keyboard Shortcuts

| Action | How |
|--------|-----|
| Add timezone | Select dropdown → Click Add |
| Search | Type in search box |
| Quick add | Click preset city button |

## Features Explained

### Digital Time
Shows time in 24-hour format:
- 13:45:30 = 1:45:30 PM
- 09:15:00 = 9:15 AM

### Analog Clock
Traditional clock face with:
- **Hour hand** (shorter)
- **Minute hand** (longer)
- **Second hand** (thin, red)
- Smooth, continuous movement

### Date Display
Shows the day and date in the selected timezone:
- Example: "Mon, Jul 1, 2024"

### Local Storage
Your selected timezones are saved in browser storage:
- ✅ Timezones persist after closing browser
- ✅ No internet needed after first load
- ✅ Private data stored locally

## Time Zone Info

### UTC Offsets
The display shows timezone with UTC offset:
- UTC+0 = Greenwich Mean Time (London)
- UTC+1 = Central European Time (Paris)
- UTC+9 = Japan Standard Time (Tokyo)
- UTC-5 = Eastern Time (New York)
- UTC-8 = Pacific Time (Los Angeles)

### Daylight Saving Time
Timezones automatically adjust for DST when applicable:
- EDT (Eastern Daylight Time) in summer
- EST (Eastern Standard Time) in winter

## Common Use Cases

🌍 **Global Team Coordination**
- See meeting times across offices
- Coordinate calls with multiple time zones

🛫 **Travel Planning**
- Check time in multiple destinations
- Plan connections and arrivals

⏰ **Remote Work**
- Know working hours in other countries
- Schedule meetings across zones

📞 **International Communication**
- Know when to call friends/family
- Plan video calls

## Tips & Tricks

1. **Add Multiple for Same Region** - Add both Sydney and Melbourne to compare
2. **Peak Hours** - Quickly see when markets open/close
3. **Arrangement** - Clocks appear in order added
4. **Search Tip** - Type "UTC" to filter by offset
5. **Daily Refresh** - All times update in real-time

## Technical Details

**Files:**
- `index.html` - Application structure
- `style.css` - Styling and animations
- `app.js` - Clock logic and timezone handling

**Technologies:**
- Vanilla JavaScript
- HTML5
- CSS3 (animations, gradients, flexbox)
- Intl DateTimeFormat API (for accurate timezone handling)
- LocalStorage API

## Browser Compatibility

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers

## Future Enhancements

- 🔔 Alarm notifications across timezones
- 📊 Timezone offset comparison chart
- 🌍 Map view with timezone pins
- 🌙 Dark mode / Light mode toggle
- ⏰ World business hours indicator
- 📱 Mobile app version
- 🔄 24-hour to 12-hour toggle
- 🎨 Custom themes

## FAQ

**Q: Why is my time off by 1 hour?**
A: Your timezone might be observing daylight saving time. The app automatically adjusts.

**Q: Can I add the same timezone twice?**
A: No, the app prevents duplicates. Remove one first if needed.

**Q: How accurate is the clock?**
A: Accurate to the second based on your device's system time.

**Q: Will my clocks stay if I close the browser?**
A: Yes! They're saved in local storage.

---

**Enjoy tracking time around the world! 🌍⏰**