import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  animations: [
    trigger('diceRoll', [
      state('start', style({ transform: 'rotate(0deg)' })),
      state('end', style({ transform: 'rotate(360deg)' })),
      transition('start => end', animate('500ms ease-out')),
    ]),
  ],

})
export class BoardComponent implements OnInit {
  currentPlayer: string='Player 1';
  player1Position: number = 1;
  player2Position: number = 1;
  diceNumber: number = 1;
  board: number[] = Array.from({ length: 100 }, (_, index) => index + 1);
  winner: string | null = null;

  snakesAndLadders: { start: number; end: number }[] = [
    { start: 16, end: 6 }, // Snake
    { start: 47, end: 26 }, // Snake
    { start: 49, end: 11 }, // Snake
    { start: 56, end: 53 }, // Snake
    { start: 62, end: 19 }, // Snake
    { start: 64, end: 60 }, // Snake
    { start: 87, end: 24 }, // Snake
    { start: 93, end: 73 }, // Snake
    { start: 95, end: 75 }, // Snake
    { start: 98, end: 78 }, // Snake
    {start: 5, end: 45},//ladder
    {start: 7, end: 67}//ladder
  ];

  ngOnInit(): void {}

  // rollDice() {
  //   this.diceNumber = Math.floor(Math.random() * 6) + 1;
  //   this.movePlayer(this.diceNumber, 1);
  //   this.diceNumber = Math.floor(Math.random() * 6) + 1;
  //   this.movePlayer(this.diceNumber, 2);
  // }
  rollDice(): void {
    if (this.winner) {
      return; // Game already won, no need to roll the dice
    }

    this.diceNumber = Math.floor(Math.random() * 6) + 1;
    this.movePlayer( this.diceNumber,this.currentPlayer);

    if (this.checkForWin(this.currentPlayer)) {
      this.winner = this.currentPlayer;
      console.log(this.currentPlayer);
    } else {
      this.switchPlayer();
    }
  }

  movePlayer(steps: number, currentPlayer: string) {
    const newPosition = currentPlayer === 'Player 1'? this.player1Position + steps : this.player2Position + steps;

    // Check for snakes and ladders
    for (const { start, end } of this.snakesAndLadders) {
      if (newPosition === start) {
        currentPlayer === 'Player 1' ? (this.player1Position = end) : (this.player2Position = end);
        return;
      }
    }


    // Move to the new position
    if (currentPlayer === 'Player 1') {
      this.player1Position = newPosition > 100 ? 100 : newPosition;
    } else {
      this.player2Position = newPosition > 100 ? 100 : newPosition;
    }

    // Check for winning condition
    if (this.player1Position === 100) {
      alert('Player 1 won!');
      // You can reset the game or perform any other action upon winning
    }

    if (this.player2Position === 100) {
      alert('Player 2 won!');
      // You can reset the game or perform any other action upon winning
    }
  }
  switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
  }
  isSnake(cell: number): boolean {
    return this.snakesAndLadders.some((snake) => snake.start === cell);
  }

  isLadder(cell: number): boolean {
    return this.snakesAndLadders.some((ladder) => ladder.end === cell);
  }
  checkForWin(player: string): boolean {
    // Add your win condition logic here
    // For example:
    if (player === 'Player 1' && this.player1Position >= 100) {
      alert("Player1 wins");
      return true;}
         // Player 1 wins}
     else if (player === 'Player 2' && this.player2Position >= 100) 
    {  alert('Player2 wins'); return true;} // Player 2 wins
    // }
    return false;
  }
    
  }