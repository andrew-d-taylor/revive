import React from "react";
import Square from "./Square";

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXNext: true,
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice(); // create a shallow copy of the full array
        if (this.calculateWinner(squares) || squares[i]) {
            // early return if there is already a winner or if square already nonempty
            return;
        }
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({squares, isXNext: !this.state.isXNext});
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    calculateWinner(squares) {
        const possibleLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let winner;
        possibleLines.forEach(line => {
            if (squares[line[0]] && squares[line[0]] === squares[line[1]] && squares[line[0]] === squares[line[2]]) {
                winner = squares[line[0]];
            }
        });

        return winner;
    }

    render() {
        const potentialWinner = this.calculateWinner(this.state.squares);
        let status;
        if (potentialWinner) {
            status = `Winner: ${potentialWinner}`;
        } else {
            status = `Next player: ${this.state.isXNext ? 'X' : 'O'}`;
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;