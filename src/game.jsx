var Game = React.createClass({
  displayName: 'Game',
  getInitialState: function(){
    return {};
  },
  shuffle: function(arr){
    for (var i = 0; i <= arr.length - 1; i++) {
      var target = Math.floor(Math.random() * (arr.length - 1));
      var temp = arr[i];
      arr[i] = arr[target];
      arr[target] = temp;
    };
    return arr;
  },
  startGame: function(words){
    var words = this.shuffle(words);
    this.setState({
      words: words
    });
  },
  render: function () {
    return (
      this.state.words ? <GameBoard words={this.state.words}/> : <WordForm onWordsEnter={this.startGame} />
    );
  }
});