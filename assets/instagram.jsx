var MyInstagram = React.createClass({
  getInitialState: function() {
    return {
      results: []
    };
  },
  componentDidMount: function() {
    $.getJSON(this.props.source, function(result) {
      console.log(result);
      if (this.isMounted()) {
        this.setState({
          results: result.data
        });
      }
    }.bind(this));
  },
  render: function() {
    var results = this.state.results;
    return (
      <article>
        {results.map(function(result){
            return <div><img src={result.images.standard_resolution.url} />
                {result.likes.count > 0 ? <section><span>{result.likes.count}</span><span>likes</span></section> : ''}
                {result.caption ? <ul><li><span>{result.caption.text}</span></li></ul> : '' }
            </div>;
        })}
      </article>
    );
  }
});

React.render(
  <MyInstagram source="https://api.instagram.com/v1/users/287140978/media/recent/?client_id=f316052a8b2749dbb3b80beab72a29a2&callback=?" />,
  document.getElementById('instagram')
);
