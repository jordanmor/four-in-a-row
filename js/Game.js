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
      activeToken.drop(targetSpace, 
        () => this.updateGameState(activeToken, targetSpace));
    }
  }

  switchPlayers() {
    this.players.forEach(player => player.active = !player.active);
  }

  checkForWin(currentSpace) {
    const { spaces, columns, rows } = this.board;
    const { owner } = currentSpace.token;
    let win = false;
    
    // vertical
    for (let x = 0; x < columns; x++ ){
        for (let y = 0; y < rows - 3; y++){
            if (spaces[x][y].owner === owner && 
                spaces[x][y+1].owner === owner && 
                spaces[x][y+2].owner === owner && 
                spaces[x][y+3].owner === owner) {
                    win = true;
            }           
        }
    }

    // horizontal
    for (let x = 0; x < columns - 3; x++ ){
        for (let y = 0; y < rows; y++){
            if (spaces[x][y].owner === owner && 
                spaces[x+1][y].owner === owner && 
                spaces[x+2][y].owner === owner && 
                spaces[x+3][y].owner === owner) {
                    win = true;
            }           
        }
    }

    // diagonal
    for (let x = 3; x < columns; x++ ){
        for (let y = 0; y < rows - 3; y++){
            if (spaces[x][y].owner === owner && 
                spaces[x-1][y+1].owner === owner && 
                spaces[x-2][y+2].owner === owner && 
                spaces[x-3][y+3].owner === owner) {
                    win = true;
            }           
        }
    }

    // diagonal
    for (let x = 3; x < columns; x++ ){
        for (let y = 3; y < rows; y++){
            if (spaces[x][y].owner === owner && 
                spaces[x-1][y-1].owner === owner && 
                spaces[x-2][y-2].owner === owner && 
                spaces[x-3][y-3].owner === owner) {
                    win = true;
            }           
        }
    }

    return win;
  }

  gameOver(message) {
    $('#game-over').css('display', 'block').text(message);
  }

  updateGameState(token, target) {
    target.mark(token);

    if (!this.checkForWin(target) ) {

      this.switchPlayers();

      if (this.activePlayer.checkTokens()) {
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
      } else {
        this.gameOver('No more tokens');
      }
    } else {
      this.gameOver(`${target.owner.name} wins!`);
    }
  }
}