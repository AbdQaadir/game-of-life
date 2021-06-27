import React, { useEffect } from 'react'


const Cell = ({size, cell, cells, setCells}) => {


    console.log({cell})
    const {status, position} = cell;
    const getNeighbours = () => {
        let n1 = Math.sign(position - (size + 1)) === 1 ? position - (size + 1) : undefined;
        let n2 = Math.sign(position - (size)) === 1 ? position - (size) : undefined;
        let n3 = Math.sign(position - (size - 1)) === 1 ? position - (size - 1) : undefined;
        let n4 = Math.sign(position - (size - 9)) === 1 ? position - (size - 9) : undefined;
        let n5 = Math.sign(position + (1)) === 1 ? position + (1) : undefined;
        let n6 = Math.sign(position + ((size * 2) + 1)) === 1 ? position + ((size * 2) + 1) : undefined;
        let n7 = Math.sign(position + (size)) === 1 ? position + (size) : undefined;
        let n8 = Math.sign(position + (size + 1)) === 1 ? position + (size + 1) : undefined;

        return [n1, n2, n3, n4, n5, n6, n7, n8]
    }
        
    

    const getStatus = () => {
        const neighbours = getNeighbours();

        let neighbours_alive = 0;

        let newCell;

        neighbours.forEach((neighbour) => {
            if(neighbour){
                if(cells[neighbour]?.status){
                    neighbours_alive += 1;
                }
            }
        })

        if(status === true && neighbours_alive < 2 ){
            newCell = {...cell, status: false }
        }

        else if(status === true && (neighbours_alive === 2 || neighbours_alive === 3) ){
            newCell = {...cell, status: true }
        }

        else if(status === true && neighbours_alive > 3 ){
            newCell = {...cell, status: false }
        }

        else if(status === false && neighbours_alive === 3 ){
            newCell = {...cell, status: true }
        }

        

        const newCells = cells.map((item) => item.position === position ? {...newCell} : {...item})
        

        setCells(newCells);

        console.log({neighbours_alive})
    }

    useEffect(() => {
      const resetStatusInterval = setInterval(() => {
          getStatus();
      }, 3000)

        return () => clearInterval(resetStatusInterval)
        // eslint-disable-next-line
    }, []);

    const handleClick = () => {

        console.log({position})
        const newCell = {...cells[position], status: true };

        const newCells = cells.map((cell) => cell.position === position ? {...newCell} : cell);
    
        setCells(newCells);
    }

    return (
        <div onClick={handleClick} style={{height: size, width: size, background: `${status ? "white" : "transparent"}` }}>
            
        </div>
    )
}

export default Cell
