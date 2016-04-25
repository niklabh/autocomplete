const api = 'http://localhost:9000/autocomplete';

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
  render: function() {
    let suggestions = this.state.suggestions.map(function(comment, index) {
      return (
        <li key={index}>
          {comment}
        </li>
      );
    });
    return (
      <div className="commentBox">
        <h1>AutoComplete</h1>
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