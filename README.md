# Welcome, Jedi Master...

We have found a relic that can help you with solving those tricky mind puzzles know as Sudoku.

## The Ritual

To perform this ritual, you simple need clone this repository and enter the following commands.

```bash
npm install
npm run dev
```

Or...

This relic is already located on the planet of [Vercel](https://jedi-council-sudoku.vercel.app/).

## Relic Powers

You can either enter the puzzle that Count Sudoku has given you, and then use the force to generate a solution.

Or, if you believe you need more training, you can ask it to create a new Sudoku puzzle for you to try.

## Back To Reality

This app uses a recursive backtracking function to find a possible solution to the puzzle while following the rules of Sudoku.

It will recursivly try to add numbers along each row, and backtracking when it comes to an invalid option (Brute Force).

The validity functions check each number individualy against every other number in its row, column and subgrid making sure it is not repeated.

There are two validity functions. One for checking validty of new options when solving the puzzle, and one for "pre checking" the board to make sure that it is a valid board and solvable. The latter accounts for empty spaces and checking the input against itself.

The board generator populates the first 8 columns in the first row with random numbers 1-9. The first 8 columns, because it seems to get stuck when trying to fill all 9. It then solves that puzzle, to make sure there is an answer, and then removes random cells to return the starting point.

###

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and stlyed with [Sass](https://sass-lang.com/).
