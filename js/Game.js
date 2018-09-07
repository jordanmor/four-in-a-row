class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }
  get activePlayer() {
    return this.players.find(player => player.active);
  }
  createPlayers() {
    const player1 = new Player('Player 1', 1, '#e15258', true);
    const player2 = new Player('Player 2', 2, '#e59a13');
    return [player1, player2];
  }
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }
  handleKeyDown(e) {
    if (this.ready) {
      switch (e.key) {
        case 'ArrowDown':
          this.playToken();
          break;
        case 'ArrowLeft':
          this.activePlayer.activeToken.moveLeft();
          break;
        case 'ArrowRight':
          this.activePlayer.activeToken.moveRight(this.board.columns);
          break;
      }
    }
  }
  playToken() {
    const { spaces } = this.board;
    const { activeToken } = this.activePlayer;
    const targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;

    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space;
      }
    }
    
    if(targetSpace !== null) {
      this.ready = false;
      activeToken.drop(targetSpace, this.reset);
    }
  }
  reset() {
    console.log('Reset');
  }
}