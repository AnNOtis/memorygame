var Card = React.createClass({
  displayName: 'Card',

  propTypes: {
    word: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired,
  },


  flipCard() {
    this.props.handleClick(this.props.index);
  },

  render() {
    var status = "";
    if(this.props.status == "flipped"){
      status = "isFlipped";
    }else if(this.props.status == "opened"){
      status = "isOpened";
    }

    if(this.props.status == "error"){
      status = "isError"
    }
    status = "card " + status;
    return (
      <span className={status} onClick={this.flipCard}>{this.props.word}</span>
    )
  }
})