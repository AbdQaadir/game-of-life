import React, {useState, useEffect} from 'react';

import Cell from './Cell';

import "./Game.css";



const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;


function Game() {
    const rows = HEIGHT / CELL_SIZE;
    const cols = WIDTH / CELL_SIZE;
    const [board, setBoard] = useState(makeEmptyBoard());
    const [cells, setCells] = useState([]);


    function makeEmptyBoard() {
        let board = [];    
        for (let y = 0; y < rows; y++) {
            board[y] = [];      
            for (let x = 0; x < cols; x++) {
                board[y][x] = false;      
            }    
        }  
        return board;  
    }

    function makeCells() {  
        let cells = [];    
        for (let y = 0; y < rows; y++) {      
            for (let x = 0; x < cols; x++) {        
                if (board[y].length) {          
                    cells.push({ position: (cols * y) + x, status: board[y][x] });        
                }      
            }    
        }    
        const rand = Array.from({length: Math.floor(cells.length / 4)}, () => Math.floor(Math.random() * cells.length));

        
        return cells.map((cell) => rand.includes(cell.position) ? {...cell, status: true} : cell);;  
    }
    

    console.log({board, cells})

    useEffect(() => {
        const generatedCells = makeCells();
        
        setCells(generatedCells);
        // eslint-disable-next-line
    }, []);


    // useEffect(() => {
    //     const regenerateInterval = setInterval(() => {
    //         const generatedCells = makeCells();

    //         setCells(generatedCells);
    //     }, 3000);

    //     return () => clearInterval(regenerateInterval);
    // }, [])
    return (      
    <div>        
        <div 
            className="Board" 
            style={{ width: WIDTH, height: HEIGHT,  backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`, display: 'flex', flexWrap: 'wrap' }}
            >   
            {cells?.map((cell, index) => {
                return (
                    <Cell 
                        key={index}
                        size={CELL_SIZE}
                        cell={cell}
                        cells={cells}
                        setCells={setCells}
                    />
                )
            })}
        </div>      
    </div>    
    );
}

export default Game
