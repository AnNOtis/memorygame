var cx = React.addons.classSet;
var Card = React.createClass({
  displayName: 'Card',

  propTypes: {
    word: React.PropTypes.string.isRequired,
    onCardClicked: React.PropTypes.func.isRequired,
    isFlipped: React.PropTypes.bool.isRequired,
    isCorrect: React.PropTypes.bool.isRequired,
    isWrong: React.PropTypes.bool.isRequired,
  },

  flipCard() {
    this.props.onCardClicked(this.props.index);
  },

  render() {
    return (
      <span
        className={cx({
          'card': true,
          'isFlipped': this.props.isFlipped,
          'isCorrect': this.props.isCorrect,
          'isWrong': this.props.isWrong
        })}
        onClick={this.flipCard}>{this.props.word}
      </span>
    )
  }
})