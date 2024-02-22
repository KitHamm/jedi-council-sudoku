"use client";

import { useState } from "react";
import {
    solveSudoku,
    validateBoard,
    generateSudoku,
} from "./sudoku/sudokuHelper";
import Image from "next/image";
import styles from "./page.module.scss";
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
    const [validBoard, setValidBoard] = useState<boolean>(true);
    const [board, setBoard] = useState<string[][]>(emptyBoard);
    const [readOnly, setReadOnly] = useState<boolean[][]>(
        Array(9).fill(Array(9).fill(false))
    );

    function handleSolve() {
        // Check the input board is valid
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (!validateBoard(board, i, j, board[i][j])) {
                    setValidBoard(false);
                    return false;
                }
            }
        }
        setValidBoard(true);
        // if valid => Shallow copy
        let shallowBoard = [...board];
        // replace shallow copy
        shallowBoard = solveSudoku(shallowBoard);
        // Set board
        setBoard(shallowBoard);
    }

    const clearBoard = () => {
        setBoard(emptyBoard);
        handleReadOnly(emptyBoard);
        setValidBoard(true);
    };

    function handleGenerate() {
        let newBoard: string[][] = generateSudoku();
        setBoard(newBoard);
        handleReadOnly(newBoard);
        setValidBoard(true);
    }

    // Function to set the readOnly state of the inputs when generating a new board
    function handleReadOnly(board: string[][]) {
        let tempReadOnly: boolean[][] = [];
        for (let i = 0; i < board.length; i++) {
            tempReadOnly[i] = Array(9).fill(false);
        }
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
                {!validBoard && (
                    <h2 className={styles.errorText}>
                        Not even the force can solve this puzzle
                    </h2>
                )}
                <Board board={board} setBoard={setBoard} readOnly={readOnly} />
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
