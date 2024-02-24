// Sudoku Helper Import
import { checkBoardComplete } from "@/app/sudoku/sudokuHelper";

// Styles Import
import styles from "../app/page.module.scss";

export default function Board(props: {
    board: string[][];
    setBoard: React.Dispatch<React.SetStateAction<any>>;
    setBoardComplete: React.Dispatch<React.SetStateAction<any>>;
    readOnly: boolean[][];
    boardComplete: boolean;
}) {
    // onCHange handler to populate board state
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        row: number,
        col: number
    ) => {
        // Check if the input is valid for Sudoku
        if (
            (parseInt(event.target.value) >= 1 &&
                parseInt(event.target.value) <= 9) ||
            event.target.value === ""
        ) {
            // Shallow copy the board to manipulate state
            let shallowBoard: string[][] = [...props.board];
            shallowBoard[row][col] = event.target.value as string;
            props.setBoard(shallowBoard);
            if (checkBoardComplete(shallowBoard)) {
                props.setBoardComplete(true);
            }
        }
    };

    return (
        <div className={styles.boardContainer}>
            <div className={styles.puzzle}>
                {props.board.map((row: string[], rowIndex: number) => {
                    return (
                        <div
                            className={styles.puzzleRow}
                            key={"row-" + rowIndex}>
                            {row.map((col: string, colIndex: number) => {
                                return (
                                    <div
                                        key={"col-" + colIndex}
                                        className={styles.boardGrid}>
                                        <input
                                            min={1}
                                            max={9}
                                            readOnly={
                                                props.readOnly[rowIndex][
                                                    colIndex
                                                ]
                                            }
                                            className={`${styles.puzzleCol} ${
                                                props.readOnly[rowIndex][
                                                    colIndex
                                                ]
                                                    ? styles.prefilled
                                                    : ""
                                            }`}
                                            value={
                                                props.board[rowIndex][colIndex]
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    rowIndex,
                                                    colIndex
                                                )
                                            }
                                            type="number"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
