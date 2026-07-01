# 🎲 Rubik's Cube Solver

A simple web-based Rubik's Cube solver that provides step-by-step instructions to solve any Rubik's Cube using the layer-by-layer method.

## How to Use

### 1. Enter Your Cube Colors

Look at your Rubik's Cube and enter the colors for each face:

```
Color codes:
W = White
Y = Yellow
R = Red
O = Orange
G = Green
B = Blue
```

### 2. Enter Each Face

For each face of the cube, enter 9 characters (one per sticker), from **top-left to bottom-right**:

```
Example:
7 8 9
4 5 6
1 2 3
```

**Cube Face Order:**
- **Front (F)** - The face facing you
- **Back (K)** - The face away from you
- **Left (L)** - Left side
- **Right (R)** - Right side
- **Up (U)** - Top
- **Down (D)** - Bottom

### 3. Click "SOLVE CUBE"

The solver will provide step-by-step instructions using the **Layer-by-Layer method**.

## Solving Method

This solver uses the **beginner-friendly layer-by-layer method**:

1. **White Cross** - Solve the bottom white cross
2. **White Corners** - Place white corner pieces
3. **Middle Layer** - Insert middle layer edges
4. **Yellow Cross** - Create yellow cross on top
5. **Yellow Corners** - Position yellow corners
6. **Yellow Corners Orientation** - Rotate corners correctly
7. **Yellow Edges** - Position final edges
8. **Done!** - Cube is solved!

## Common Algorithms

The solver references these standard moves:
- **R U R' U'** - Basic corner algorithm
- **F R U' R' U' R U R' F'** - Yellow cross algorithm
- **U R U' L' U R' U' L** - Corner positioning
- **R' D' R D** - Corner rotation

## Tips

- Make sure you accurately input all 54 stickers (6 faces × 9 stickers)
- The center piece of each face is fixed and doesn't move
- Double-check your color inputs before solving
- Watch the algorithms carefully and practice them

## Opening the Website

1. Save all files in the same folder
2. Open `index.html` in your web browser
3. Start solving!

## Files

- `index.html` - Main webpage
- `style.css` - Styling and layout
- `solver.js` - Solving algorithm and logic
- `README.md` - This file

## Future Improvements

- 3D cube visualization
- Animated solving steps
- Advanced solving methods (CFOP, Roux)
- Optimal solution finder
- Camera/image input

---

**Enjoy solving! 🎲**