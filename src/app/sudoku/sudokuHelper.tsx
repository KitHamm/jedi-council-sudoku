const possibleNUmbers: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function solveSudoku(board: string[][]) {
    let emptySpaces: { row: number; col: number }[] = [];
    // fill key pair array with empty space row and col coordinates
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === "") {
                emptySpaces.push({ row: i, col: j });
            }
        }
    }

    // recursive function to attempt to fill the empty spaces with available numbers
    function recurse(emptySpaceIndex: number) {
        // Base condition
        if (emptySpaceIndex >= emptySpaces.length) {
            return true;
        }
        // Extracted empty cell position
        const { row, col } = emptySpaces[emptySpaceIndex];
        // Keep iterating through the empty spaces
        for (let i = 0; i < possibleNUmbers.length; i++) {
            let num = possibleNUmbers[i];
            if (isValid(board, row, col, num)) {
                board[row][col] = num;
                // Keep recursing if numbers are valid
                if (recurse(emptySpaceIndex + 1)) {
                    return true;
                }
                // Backtrack if a number is not valid
                board[row][col] = "";
            }
        }
        return false;
    }
    recurse(0);
    return board;
}

export function isValid(
    board: string[][],
    row: number,
    col: number,
    number: string
) {
    // Check the row or col to see if the number is present
    for (let i = 0; i < board.length; i++) {
        if (board[row][i] === number || board[i][col] === number) {
            return false;
        }
    }
    // Start position of the sub grid
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    // Iterate through sub grid to check if the number is present
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === number) {
                return false;
            }
        }
    }
    return true;
}
// Check if input board is valid
// Similar to isValid function, accounting for empty cells
export function validateBoard(
    board: string[][],
    row: number,
    col: number,
    number: string
) {
    for (let i = 0; i < board.length; i++) {
        if (board[row][i] !== "" && number !== "" && i !== col) {
            if (board[row][i] === number) {
                return false;
            }
        }
        if (board[i][col] !== "" && number !== "" && i !== row) {
            if (board[i][col] === number) {
                return false;
            }
        }
    }
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    // Iterate through sub grid to check if the number is present
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] !== "" && number !== "" && i !== row && j !== col) {
                if (board[i][j] === number) {
                    return false;
                }
            }
        }
    }
    return true;
}

export function generateSudoku() {
    let newBoard: string[][] = [];
    for (let i = 0; i < 9; i++) {
        newBoard[i] = Array(9).fill("");
    }
    for (let i = 0; i < 8; i++) {
        let randomNumber: string = Math.floor(Math.random() * 9) + 1 + "";
        while (!isValid(newBoard, 0, i, randomNumber)) {
            randomNumber = Math.floor(Math.random() * 9) + 1 + "";
        }
        newBoard[0][i] = randomNumber;
    }
    newBoard = solveSudoku(newBoard);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() > 0.2) {
                newBoard[i][j] = "";
            }
        }
    }
    return newBoard;
}
