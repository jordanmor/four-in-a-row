class Token {
  constructor(index, owner) {
    this.owner = owner;
    this.id = `token-${index}-${owner.id}`;
    this.dropped = false;
  }
  get htmlToken() {
    return this.drawHTMLToken();
  }
  drawHTMLToken() {
    const token = document.createElement('div');
    token.setAttribute('id', this.id);
    token.setAttribute('class', 'token');
    token.style.background = this.owner.color;
    document.getElementById('game-board-underlay').appendChild(token);
  }
}