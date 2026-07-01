// Random Joke Generator with External API

class JokeGenerator {
    constructor() {
        this.currentJoke = null;
        this.favorites = [];
        this.jokesCount = 0;
        this.STORAGE_KEY = 'favorite_jokes';
        this.API_URLS = {
            general: 'https://api.api-ninjas.com/v1/jokes',
            programming: 'https://official-joke-api.appspot.com/jokes/programming/random',
            'knock-knock': 'https://official-joke-api.appspot.com/jokes/knock-knock/random'
        };
        
        this.init();
    }
    
    init() {
        this.loadFavorites();
        this.setupEventListeners();
        this.updateStats();
        this.renderFavorites();
    }
    
    setupEventListeners() {
        document.getElementById('getJokeBtn').addEventListener('click', () => this.fetchJoke());
        document.getElementById('shareBtn').addEventListener('click', () => this.shareJoke());
        document.getElementById('copyBtn').addEventListener('click', () => this.copyJoke());
        document.getElementById('clearFavBtn').addEventListener('click', () => this.clearFavorites());
    }
    
    async fetchJoke() {
        const jokeType = document.getElementById('jokeType').value;
        const jokeBox = document.getElementById('jokeBox');
        const getJokeBtn = document.getElementById('getJokeBtn');
        
        try {
            // Show loading state
            jokeBox.innerHTML = '<p class="loading"><span class="loading-spinner"></span> Loading joke...</p>';
            getJokeBtn.disabled = true;
            getJokeBtn.textContent = 'Loading...';
            
            let joke = null;
            
            if (jokeType === 'general') {
                joke = await this.fetchFromNinjas();
            } else if (jokeType === 'programming') {
                joke = await this.fetchFromOfficialAPI('programming');
            } else if (jokeType === 'knock-knock') {
                joke = await this.fetchFromOfficialAPI('knock-knock');
            }
            
            if (joke) {
                this.currentJoke = joke;
                this.displayJoke(joke);
                this.jokesCount++;
                this.updateStats();
                this.enableShareButtons();
            } else {
                this.showError('Could not fetch joke. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching joke:', error);
            this.showError('Error fetching joke. Please check your connection and try again.');
        } finally {
            getJokeBtn.disabled = false;
            getJokeBtn.textContent = 'Get Joke';
        }
    }
    
    async fetchFromNinjas() {
        try {
            const response = await fetch(this.API_URLS.general);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            return {
                joke: data[0].joke,
                type: 'single'
            };
        } catch (error) {
            console.error('Ninjas API error:', error);
            return null;
        }
    }
    
    async fetchFromOfficialAPI(type) {
        try {
            const response = await fetch(this.API_URLS[type]);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            
            if (type === 'knock-knock') {
                return {
                    setup: data.setup,
                    delivery: data.delivery,
                    type: 'two-part'
                };
            } else {
                return {
                    setup: data.setup,
                    delivery: data.delivery,
                    type: 'two-part'
                };
            }
        } catch (error) {
            console.error('Official API error:', error);
            return null;
        }
    }
    
    displayJoke(joke) {
        const jokeBox = document.getElementById('jokeBox');
        
        if (joke.type === 'single') {
            jokeBox.innerHTML = `<p class="joke-text">${this.escapeHtml(joke.joke)}</p>`;
        } else if (joke.type === 'two-part') {
            jokeBox.innerHTML = `
                <div>
                    <p class="joke-text">
                        <span class="joke-setup">${this.escapeHtml(joke.setup)}</span>
                        <span class="joke-delivery">${this.escapeHtml(joke.delivery)}</span>
                    </p>
                </div>
            `;
        }
    }
    
    displayError(message) {
        const jokeBox = document.getElementById('jokeBox');
        jokeBox.innerHTML = `<p class="error-message">${message}</p>`;
    }
    
    showError(message) {
        const jokeBox = document.getElementById('jokeBox');
        jokeBox.innerHTML = `
            <div class="error-message">
                <strong>Error:</strong> ${message}
            </div>
        `;
    }
    
    enableShareButtons() {
        document.getElementById('shareBtn').disabled = false;
        document.getElementById('copyBtn').disabled = false;
    }
    
    getJokeText() {
        if (!this.currentJoke) return '';
        
        if (this.currentJoke.type === 'single') {
            return this.currentJoke.joke;
        } else {
            return `${this.currentJoke.setup}\n${this.currentJoke.delivery}`;
        }
    }
    
    copyJoke() {
        const jokeText = this.getJokeText();
        navigator.clipboard.writeText(jokeText).then(() => {
            this.showCopyNotification();
        }).catch(err => {
            console.error('Could not copy:', err);
            alert('Failed to copy joke');
        });
    }
    
    showCopyNotification() {
        const jokeBox = document.getElementById('jokeBox');
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = '✓ Copied to clipboard!';
        jokeBox.parentElement.insertBefore(message, jokeBox);
        
        setTimeout(() => message.remove(), 2000);
    }
    
    shareJoke() {
        const jokeText = this.getJokeText();
        const shareText = `😂 Check out this joke:\n\n${jokeText}\n\n#JokeGenerator`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Funny Joke',
                text: shareText,
            }).catch(err => console.error('Share failed:', err));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Share text copied to clipboard!');
            });
        }
    }
    
    addToFavorites() {
        if (!this.currentJoke) return;
        
        const jokeId = this.generateJokeId(this.currentJoke);
        
        // Check if already favorited
        if (this.favorites.some(fav => fav.id === jokeId)) {
            alert('This joke is already in your favorites!');
            return;
        }
        
        const favorite = {
            id: jokeId,
            joke: this.currentJoke,
            addedAt: new Date().toLocaleString()
        };
        
        this.favorites.unshift(favorite);
        this.saveFavorites();
        this.renderFavorites();
        this.updateStats();
        this.showFavoriteNotification();
    }
    
    removeFromFavorites(id) {
        this.favorites = this.favorites.filter(fav => fav.id !== id);
        this.saveFavorites();
        this.renderFavorites();
        this.updateStats();
    }
    
    showFavoriteNotification() {
        const favoritesList = document.getElementById('favoritesList');
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = '❤️ Added to favorites!';
        favoritesList.parentElement.insertBefore(message, favoritesList);
        
        setTimeout(() => message.remove(), 2000);
    }
    
    generateJokeId(joke) {
        const jokeText = this.getJokeText();
        return Math.abs(this.hashCode(jokeText));
    }
    
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
    
    renderFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        
        if (this.favorites.length === 0) {
            favoritesList.innerHTML = '<li class="empty-favorites">No favorites yet. Click the heart on a joke!</li>';
            document.getElementById('clearFavBtn').disabled = true;
            return;
        }
        
        document.getElementById('clearFavBtn').disabled = false;
        
        favoritesList.innerHTML = this.favorites.map(fav => `
            <li class="favorite-item">
                <p>${this.formatFavoriteJoke(fav.joke)}</p>
                <button class="btn-like" onclick="jokeGen.removeFromFavorites(${fav.id})">❌</button>
            </li>
        `).join('');
    }
    
    formatFavoriteJoke(joke) {
        if (joke.type === 'single') {
            return this.escapeHtml(joke.joke);
        } else {
            return `${this.escapeHtml(joke.setup)} - ${this.escapeHtml(joke.delivery)}`;
        }
    }
    
    clearFavorites() {
        if (this.favorites.length === 0) return;
        
        if (confirm('Are you sure you want to clear all favorites?')) {
            this.favorites = [];
            this.saveFavorites();
            this.renderFavorites();
            this.updateStats();
        }
    }
    
    updateStats() {
        const statsText = document.getElementById('statsText');
        statsText.textContent = `Jokes retrieved: ${this.jokesCount} | Favorites: ${this.favorites.length}`;
    }
    
    saveFavorites() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites));
    }
    
    loadFavorites() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                this.favorites = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading favorites:', e);
                this.favorites = [];
            }
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is loaded
let jokeGen;
document.addEventListener('DOMContentLoaded', () => {
    jokeGen = new JokeGenerator();
});