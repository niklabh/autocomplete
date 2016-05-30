const api = 'https://linkm.in/autocomplete';

var AutoComplete = React.createClass({
  getInitialState: function() {
    return {text:"", suggestions:[]};
  },
  componentDidMount: function() {

  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
    $.ajax({
      url: api + '?key=' + e.target.value + '&limit=10',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({suggestions:data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.setState({suggestions:["error"]});
      }.bind(this)
    });
  },
  handleSuggestionClick: function(e) {
    this.setState({text: e.target.innerText});
  },
  render: function() {
    let suggestions = this.state.suggestions.map((comment, index) => {
      return (
        <li key={index} onClick={this.handleSuggestionClick}>
          {comment}
        </li>
      );
    });
    return (
      <div className="commentBox">
        <h1>AutoComplete</h1>
        <p>Autocomplete Util in javascript using trie data structure.</p>
        <form className="autoCompleteForm">
          <input
            type="text"
            placeholder="write something..."
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          { this.state.suggestions.length ? <ul className="suggestions">
            {suggestions}
          </ul> : null }
        </form>
      </div>
    );
  }
});

ReactDOM.render(
  <AutoComplete />,
  document.getElementById('content')
);
