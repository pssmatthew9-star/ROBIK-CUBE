// To-Do List Application with Local Storage

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.STORAGE_KEY = 'todos_data';
        
        this.init();
    }
    
    // Initialize the app
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Add button
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        
        // Enter key to add
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        // Clear completed button
        document.getElementById('clearBtn').addEventListener('click', () => this.clearCompleted());
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }
    
    // Add new todo
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (!text) {
            alert('Please enter a task!');
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString(),
            priority: 'medium'
        };
        
        this.todos.unshift(todo);
        this.saveToStorage();
        this.render();
        
        input.value = '';
        input.focus();
    }
    
    // Delete todo
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToStorage();
        this.render();
    }
    
    // Toggle todo completion
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }
    
    // Clear all completed todos
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }
        
        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveToStorage();
            this.render();
        }
    }
    
    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        
        this.render();
    }
    
    // Get filtered todos
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }
    
    // Render todos
    render() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <p>${this.currentFilter === 'completed' ? 'No completed tasks yet!' : 
                        this.currentFilter === 'active' ? 'All tasks completed! 🎉' : 
                        'No tasks yet. Add one to get started!'}</p>
                </div>
            `;
        } else {
            todoList.innerHTML = filteredTodos.map(todo => `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <input 
                        type="checkbox" 
                        class="checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        onchange="app.toggleTodo(${todo.id})"
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <span class="priority-badge priority-${todo.priority}">${todo.priority}</span>
                    <button class="btn-delete" onclick="app.deleteTodo(${todo.id})">Delete</button>
                </li>
            `).join('');
        }
        
        this.updateStats();
    }
    
    // Update stats
    updateStats() {
        const activeTodos = this.todos.filter(t => !t.completed).length;
        const taskText = activeTodos === 1 ? 'task' : 'tasks';
        document.getElementById('taskCount').textContent = `${activeTodos} ${taskText} left`;
        
        // Disable clear button if no completed tasks
        const clearBtn = document.getElementById('clearBtn');
        const hasCompleted = this.todos.some(t => t.completed);
        clearBtn.disabled = !hasCompleted;
    }
    
    // Save to local storage
    saveToStorage() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
    }
    
    // Load from local storage
    loadFromStorage() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                this.todos = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading todos:', e);
                this.todos = [];
            }
        }
    }
    
    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});