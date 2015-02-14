var WordForm = React.createClass({
  displayName: 'WordForm',

  getInitialState() {
    return {};
  },

  submitWords(e) {
    e.preventDefault();
    var node = this.refs.words_field.getDOMNode();
    var input = node.value.trim();
    var words = input.split(/[^a-zA-z]+/);
    if(words.length >= 2){
      this.props.onWordsEnter(words.concat(words));
    }else{
      this.setError('unless more than one word!');
    }
  },

  setError(msg) {
    this.setState({
      error: msg
    })
  },

  render() {
    return (
      <form onSubmit={this.submitWords}>
        <h2>Input words you love to start the game: </h2>
        <input type='text' placeholder='input words' ref='words_field'/>
        <input type='submit' value='Start Game' />
        <p>{this.state.error}</p>
      </form>
    );
  }
});