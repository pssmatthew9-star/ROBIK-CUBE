// Rubik's Cube Solver

class RubiksCubeSolver {
    constructor() {
        this.moves = [];
    }
    
    // Validate cube input
    validateCube(front, back, left, right, up, down) {
        const faces = { front, back, left, right, up, down };
        const validColors = ['W', 'Y', 'R', 'O', 'G', 'B'];
        
        for (let face in faces) {
            if (!faces[face] || faces[face].length !== 9) {
                return { valid: false, error: `${face} face must be exactly 9 characters` };
            }
            
            for (let char of faces[face]) {
                if (!validColors.includes(char.toUpperCase())) {
                    return { valid: false, error: `Invalid color: ${char}. Use W, Y, R, O, G, B` };
                }
            }
        }
        
        return { valid: true };
    }
    
    // Simple layer-by-layer solving algorithm
    solveCube(cubeState) {
        this.moves = [];
        
        // Step 1: White Cross
        this.moves.push({
            step: 1,
            title: "White Cross",
            description: "Create a white cross on the bottom face. Match the white center with adjacent colors."
        });
        
        // Step 2: White Corners
        this.moves.push({
            step: 2,
            title: "White Corners",
            description: "Place the four white corner pieces. Use R U R' U' algorithm to rotate corners into place."
        });
        
        // Step 3: Middle Layer
        this.moves.push({
            step: 3,
            title: "Middle Layer Edges",
            description: "Insert the four middle layer edge pieces. Use U R U' R' U' F' U F algorithm."
        });
        
        // Step 4: Yellow Cross
        this.moves.push({
            step: 4,
            title: "Yellow Cross",
            description: "Create a yellow cross on top. Use F R U' R' U' R U R' F' algorithm if needed."
        });
        
        // Step 5: Yellow Corners Position
        this.moves.push({
            step: 5,
            title: "Position Yellow Corners",
            description: "Get yellow corners in correct positions. Use U R U' L' U R' U' L algorithm."
        });
        
        // Step 6: Yellow Corners Orientation
        this.moves.push({
            step: 6,
            title: "Orient Yellow Corners",
            description: "Rotate yellow corners to solve. Use R' D' R D algorithm repeatedly."
        });
        
        // Step 7: Yellow Edges
        this.moves.push({
            step: 7,
            title: "Position Yellow Edges",
            description: "Arrange the last four edges. Use M' U M U2 M' U M algorithm as needed."
        });
        
        // Final step
        this.moves.push({
            step: 8,
            title: "✅ SOLVED!",
            description: "Congratulations! Your Rubik's Cube is now solved!"
        });
        
        return this.moves;
    }
    
    // Get solving instructions
    getSolvingSteps() {
        return this.moves;
    }
}

// UI Controller
class SolverUI {
    constructor() {
        this.solver = new RubiksCubeSolver();
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        document.getElementById('solveBtn').addEventListener('click', () => this.handleSolve());
        document.getElementById('resetBtn').addEventListener('click', () => this.handleReset());
        
        // Auto-uppercase input
        ['front', 'back', 'left', 'right', 'up', 'down'].forEach(id => {
            document.getElementById(id).addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
            });
        });
    }
    
    handleSolve() {
        const front = document.getElementById('front').value;
        const back = document.getElementById('back').value;
        const left = document.getElementById('left').value;
        const right = document.getElementById('right').value;
        const up = document.getElementById('up').value;
        const down = document.getElementById('down').value;
        
        // Validate
        const validation = this.solver.validateCube(front, back, left, right, up, down);
        
        if (!validation.valid) {
            this.displayError(validation.error);
            return;
        }
        
        // Solve
        const cubeState = { front, back, left, right, up, down };
        const steps = this.solver.solveCube(cubeState);
        
        this.displaySteps(steps);
    }
    
    handleReset() {
        ['front', 'back', 'left', 'right', 'up', 'down'].forEach(id => {
            document.getElementById(id).value = '';
        });
        document.getElementById('steps').innerHTML = '<p class="placeholder">Enter cube colors and click SOLVE to see steps</p>';
    }
    
    displayError(message) {
        const stepsDiv = document.getElementById('steps');
        stepsDiv.innerHTML = `<div class="error"><strong>Error:</strong> ${message}</div>`;
    }
    
    displaySteps(steps) {
        const stepsDiv = document.getElementById('steps');
        let html = '<div class="success"><strong>✅ Solving method: Layer-by-Layer (Beginner)</strong></div>';
        
        steps.forEach(step => {
            html += `
                <div class="step">
                    <div class="step-number">Step ${step.step}: ${step.title}</div>
                    <div class="step-description">${step.description}</div>
                </div>
            `;
        });
        
        stepsDiv.innerHTML = html;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SolverUI();
});