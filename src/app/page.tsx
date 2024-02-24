// Use client because of useState hooks
"use client";

// React Imports
import { useState } from "react";

// Next Imports
import Image from "next/image";

// Sudoku Helper Imports
import {
    solveSudoku,
    validateBoard,
    generateSudoku,
    checkBoardComplete,
    isValid,
} from "./sudoku/sudokuHelper";

// Style Imports
import styles from "./page.module.scss";

// Custom Component Imports
import Board from "@/components/Board";

export default function Home() {
    const emptyBoard: string[][] = [
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
    ];

    // States for board, readOnly on cell inputs, and board validity
    const [validBoard, setValidBoard] = useState<boolean>(true);
    const [boardComplete, setBoardComplete] = useState<boolean>(false);
    const [showResultText, setShowResultText] = useState<boolean>(false);
    const [resultText, setResultText] = useState<string>("");
    const [board, setBoard] = useState<string[][]>(emptyBoard);
    const [readOnly, setReadOnly] = useState<boolean[][]>(
        Array(9).fill(Array(9).fill(false))
    );

    function handleSolve() {
        // Check if the board is complete first
        if (checkBoardComplete(board)) {
            // Check if the answer is correct
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board.length; j++) {
                    if (!validateBoard(board, i, j, board[i][j])) {
                        setShowResultText(true);
                        setResultText("I am afraid this answer is incorrect");
                        return false;
                    }
                }
            }
            setShowResultText(true);
            setResultText("Answer is accepted.");
            return;
        }
        // Check the input board is valid
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (!validateBoard(board, i, j, board[i][j])) {
                    setShowResultText(true);
                    setResultText("Not even I can solve this puzzle");
                    return false;
                }
            }
        }

        // if valid => Shallow copy
        let shallowBoard = [...board];
        // replace shallow copy
        shallowBoard = solveSudoku(shallowBoard);
        // Set board
        setBoard(shallowBoard);
        setShowResultText(false);
        setResultText("");
    }

    const clearBoard = () => {
        setBoard(emptyBoard);
        handleReadOnly(emptyBoard);
        setValidBoard(true);
        setShowResultText(false);
        setResultText("");
    };

    function handleGenerate() {
        let newBoard: string[][] = generateSudoku();
        setBoard(newBoard);
        handleReadOnly(newBoard);
        setValidBoard(true);
        setShowResultText(false);
        setResultText("");
    }

    // Function to set the readOnly state of the inputs when generating a new board
    function handleReadOnly(board: string[][]) {
        // Create board with all false read only states
        let tempReadOnly: boolean[][] = [];
        for (let i = 0; i < board.length; i++) {
            tempReadOnly[i] = Array(9).fill(false);
        }
        // Populate board with true readOnly states if there is a value in the cell
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] !== "") {
                    tempReadOnly[i][j] = true;
                }
            }
        }
        setReadOnly(tempReadOnly);
    }

    return (
        <main className={styles.main}>
            <div className={styles.column}>
                <div className={styles.infoContainer}>
                    <h2>Master Jedi...</h2>
                    <p>
                        We have found this relic to help with your problem of
                        solving the impenetrable Sudoku Puzzle.
                    </p>
                    <p>
                        Enter the puzzle into this device and use the amplified
                        force to help in your quest.
                    </p>
                    <p>
                        If you want some more practice, I have added some
                        shortcuts to create new puzzles for you to solve.
                    </p>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.buttonInnerContainer}>
                        <button
                            onClick={handleGenerate}
                            className={styles.boardButton}>
                            Random Board
                        </button>
                    </div>
                    <div className={styles.buttonInnerContainer}>
                        <button
                            onClick={clearBoard}
                            className={styles.boardButton}>
                            Clear Board
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.column}>
                {showResultText && (
                    <h2 className={styles.errorText}>{resultText}</h2>
                )}
                <Board
                    board={board}
                    setBoard={setBoard}
                    readOnly={readOnly}
                    boardComplete={boardComplete}
                    setBoardComplete={setBoardComplete}
                />
            </div>
            <div className={styles.column}>
                <div onClick={handleSolve} className={styles.forceContainer}>
                    <Image
                        priority
                        src={"/force-hand.png"}
                        alt="use the force"
                        height={500}
                        width={500}
                        className={styles.forceButton}
                    />
                    <h1 className={styles.forceTitle}>Use Force</h1>
                </div>
            </div>
        </main>
    );
}
