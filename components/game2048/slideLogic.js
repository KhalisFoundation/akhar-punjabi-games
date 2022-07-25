export const getEmptyBoard = () => {
    const board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
    return board;
};

const printBoard = (board) => {
    let [a, b, c, d] = board;
    let [a1, a2, a3, a4] = a;
    let [b1, b2, b3, b4] = b;
    let [c1, c2, c3, c4] = c;
    let [d1, d2, d3, d4] = d;
    console.log("++++++++");
    console.log(`${a1} ${a2} ${a3} ${a4}`);
    console.log(`${b1} ${b2} ${b3} ${b4}`);
    console.log(`${c1} ${c2} ${c3} ${c4}`);
    console.log(`${d1} ${d2} ${d3} ${d4}`);
    console.log("++++++++");
}

const hasValue = (board, value) => {
    for (let i=0; i<board.length; i++) {
        let val = board[i];
        for (let j = 0; j < val.length; j++) {
            if (val[j] === value) {
                return true;
            }
        } 
    };
    return false;
};

export const isFull = (board) => {
    return !hasValue(board, 0);
};

const getRandomPosition = () => {
    const rowPosition = Math.floor(Math.random() * 4);
    const colPosition = Math.floor(Math.random() * 4);
    return [rowPosition, colPosition];
};

export const generateRandom = (board) => {
    if (isFull(board)) {
        return board;
    }

    let [row, col] = getRandomPosition();
    while (board[row][col] !== 0) {
        [row, col] = getRandomPosition();
    }

    board[row][col] = 2
    return board;
}

export const moveLeftNew = (board) => {
    console.log("before move left");
    printBoard(board);
    const newBoard = getEmptyBoard();
    for (let i=0; i<board.length; i++) {
        let val = board[i];
        for (let j = 0; j < val.length; j++) {
            if (val[j] !== 0) {
                newBoard[i][j] = val[j];
            }
        } 
    };
    console.log("after move left");
    printBoard(newBoard);
    return newBoard;
}

const compress = (board) => {
    const newBoard = getEmptyBoard();
    for (let i=0; i<board.length; i++) {
        const val = board[i];
        let colIndex = 0;
        for (let j = 0; j<val.length; j++) {
            if (val[j] !== 0) {
                newBoard[i][colIndex] = val[j];
                colIndex++;
            }
        }
    };
    //printBoard(newBoard);
    return newBoard;
};

function merge(board) {
    //printBoard(board);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length-1; j++) {
            if (board[i][j] !== 0 && board[i][j] === board[i][j+1]) {
                board[i][j] = board[i][j] * 2;
                board[i][j+1] = 0;
            }
        }
    };
    //console.log("after merge");
    //printBoard(board);
    return board;
};

export const moveLeft = (board) => {
    //console.log("before move left");
    //printBoard(board);
    const newBoard1 = compress(board);
    const newBoard2 = merge(newBoard1);
    const newBoard3 = compress(newBoard2);
    let final = newBoard3;
    //console.log("after move left");
    //printBoard(final);
    return final;
};

const reverse = (board) => {
    const reverseBoard = getEmptyBoard();

    for (let i=0; i<board.length; i++) {
        const val = board[i];
        let colIndex = 0;
        for (let j = val.length-1; j>=0; j--) {
            reverseBoard[i][colIndex] = val[j];
            colIndex++;
        }
    }
    return reverseBoard;
}

export const moveRight = (board) => {
    //console.log("before move right");
    //printBoard(board);
    const reversedBoard = reverse(board);
    const newBoard = moveLeft(reversedBoard);
    let final = reverse(newBoard);
    //console.log("after move right");
    //printBoard(final);
    return final;
};

const rotateLeft = (board) => {
    //console.log("before rotate left");
    //printBoard(board);
    const rotateBoard = getEmptyBoard();

    for (let i=0; i<board.length; i++) {
        let colIndex = 0;
        for (let j = board[i].length-1; j>=0; j--) {
            rotateBoard[colIndex][i] = board[i][j];
            colIndex++;
        }
    }
    
    //console.log("after rotate left");
    //printBoard(rotateBoard);
    return rotateBoard;
};

const rotateRight = (board) => {
    //console.log("before rotate right");
    //printBoard(board);
    const rotateBoard = getEmptyBoard();

    for (let i= 0; i<board.length ; i++) {
        let colIndex = 0;
        for (let j = board.length-1; j>=0; j--) {
            rotateBoard[i][colIndex] = board[j][i];
            colIndex++;
        }
    }
    
    //console.log("after rotate right");
    //printBoard(rotateBoard);
    return rotateBoard;
};

export const moveUp = (board) => {
    //printBoard(board);
    const rotateBoard = rotateLeft(board);
    const newBoard = moveLeft(rotateBoard);
    let final = rotateRight(newBoard);
    //console.log("after move up");
    //printBoard(final);
    return final;
};

export const moveDown = (board) => {
    //printBoard(board);
    const rotateBoard = rotateRight(board);
    const newBoard = moveLeft(rotateBoard);
    let final = rotateLeft(newBoard);
    //console.log("after move down");
    //printBoard(final);
    return final;
};

export const checkWin = (board) => {
    return hasValue(board, 2048);
};

const hasDiff = (board, updatedBoard) => {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            if (board[i][j] !== updatedBoard[i][j]) {
                return true;
            }
        }
    }
    return false;
};

export const isOver = (board) => {
    if (hasDiff(board, moveLeft(board))) {
        return false;
    }
    if (hasDiff(board, moveRight(board))) {
        return false;
    }
    if (hasDiff(board, moveUp(board))) {
        return false;
    }
    if (hasDiff(board, moveDown(board))) {
        return false;
    }
    return true;
};

export const changed = (board, updatedBoard) => {
    return hasDiff(board, updatedBoard);
}

