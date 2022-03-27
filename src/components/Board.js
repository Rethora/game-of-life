const makeRows = (boardArray) => {
    let res = [];
    let i = 0;
    while (i < boardArray.length) {
        let row = [];
        for (let j = i; j < i + 100; j++) {
            row.push(boardArray[j]);
        }
        res.push(row);
        i += 100;
    }
    return res;
}

export const Board = ({ boardArray, setBoardArray }) => {
    const rows = makeRows(boardArray);

    return (
        <div className="board">
            {
                rows.map((row, i) => (
                    <Row
                        key={i}
                        row={row}
                        rowNumber={i}
                        setBoardArray={setBoardArray}
                    />
                ))
            }
        </div>
    )
}

const Row = ({ row, rowNumber, setBoardArray }) => {
    return (
        <div className="row">
            {
                row.map((cell, i) => (
                    <Cell
                        key={i}
                        cell={cell}
                        cellIdx={100 * rowNumber + i}
                        setBoardArray={setBoardArray}
                    />
                ))
            }
        </div>
    )
}

const Cell = ({ cell, cellIdx, setBoardArray }) => {
    const handleClick = () => {
        const negatedValue = (cell !== 0) ? 0 : 1;
        setBoardArray(prev => {
            let copy = [...prev];
            copy[cellIdx] = negatedValue;
            return copy;
        })
    }
    return (
        <div
            className={cell === 0 ? "cell" : "cell active"}
            onClick={handleClick}
        >
        </div>
    )
}