var GameBoard = React.createClass({
  displayName: 'GameBoard',

  propTypes: {
    words: React.propTypes.arrayOf(React.propTypes.string).isRequired,
  },

  getInitialState() {
    var cardStatus = (function(that){
      var arr = []
      for(var i=0; i<= that.props.words.length - 1; i++){
        arr[i] = "close";
      }
      return arr;
    })(this);

    return {
      cardStatus: cardStatus,
      tryNumber: 0
    };
  },

  flipCard(index) {
    var flippedCardIndex = _.findIndex(this.state.cardStatus, function(status){return status == "flipped"});
    if(flippedCardIndex < 0){
      this.state.cardStatus[index] = "flipped";
      this.state.message = "翻開第一張卡片";
    }else{
      if(this.props.words[index] === this.props.words[flippedCardIndex]){
        this.state.cardStatus[index] = "opened";
        this.state.cardStatus[flippedCardIndex] = "opened";
        this.state.message = "對了喔！！";
      }else{
        this.state.message = "錯了喔！";
        this.state.cardStatus[index] = "error";
        this.state.cardStatus[flippedCardIndex] = "error";
        this.state.tryNumber += 1
        setTimeout(function(){
          this.state.cardStatus[index] = "close";
          this.state.cardStatus[flippedCardIndex] = "close";
          this.forceUpdate();
        }.bind(this), 1000)
      }
    }
    if(this.isGameEnd()){
      this.state.message = "恭喜全對！";
    }
    this.forceUpdate();
  },

  isGameEnd(){
    var end = true;
    _.forEach(this.state.cardStatus, function(status, index){
      if(status != 'opened'){
        end = false;
      }
    })
    return end;
  },

  render(){
    return (
      <div>
        <p>狀態：{this.state.message}</p>
        <p>錯誤次數：{this.state.tryNumber}</p>
        {
          this.props.words.map(function(word, index){
            return (
              <Card key={index} handleClick={this.flipCard} word={word} index={index} status={this.state.cardStatus[index]} />
            );
          }.bind(this))
        }
      </div>
    );
  }
});