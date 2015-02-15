var GameBoard = React.createClass({
  displayName: 'GameBoard',

  propTypes: {
    words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  },

  getInitialState() {

    return {
      correctIndexes: [],
      wrongIndexes: [],
      firstFlipIndex: null,
      found: 0,
      message: '選一張牌',
      isWaiting: false,
    };
  },

  flipCard(index) {
    if(this.state.isWaiting){
      return;
    }

    var found = this.state.found;
    var firstFlipIndex = this.state.firstFlipIndex;
    var correctIndexes = this.state.correctIndexes;
    var words = this.props.words;

    if(firstFlipIndex === null){
      this.setState({
        firstFlipIndex: index,
        message: '選擇另一張牌'
      })
      return;
    }

    if(words[index] === words[firstFlipIndex]){
      this.setState({
        firstFlipIndex: null,
        found: found+1,
        correctIndexes: correctIndexes.concat([index, firstFlipIndex]),
        message: '答對囉！！'
      });
    }else{
      this.setState({
        isWaiting: true,
        firstFlipIndex: null,
        wrongIndexes: [index, firstFlipIndex],
        message: '答錯囉！！'
      });
    }

    setTimeout(
      () =>{
        if(!this.isMounted()){
          return;
        }

        this.setState({
          isWaiting: false,
          message: '選一張牌',
          wrongIndexes: [],
        });
      },
      2000
    );
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
        <p>已經找到：({this.state.found} &frasl; {this.props.words.length/2})</p>
        {
          this.props.words.map(function(word, index){
            var isFirstFlip = index === this.state.firstFlipIndex;
            var isCorrect = _.contains(this.state.correctIndexes, index);
            var isWrong = _.contains(this.state.wrongIndexes, index);
            return (
              <Card
                key={index}
                index={index}
                word={word}
                isFlipped={isFirstFlip || isCorrect || isWrong}
                isCorrect={isCorrect}
                isWrong={isWrong}
                onCardClicked={this.flipCard}
               />
            );
          }.bind(this))
        }
      </div>
    );
  }
});