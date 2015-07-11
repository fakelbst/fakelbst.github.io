var LoadMore = React.createClass({
  handleClick: function(){
    // this.props.source = {result.pagination.next_url};
  },
  render: function(){
    return (
      <div className="load-more" onClick={this.handleClick}>
        <a className="load-more-a" href="#">more</a>
      </div>
    )
  }
});

var MyInstagram = React.createClass({
  // getDefaultProps: {
  //   return {
  //     source: "https://api.instagram.com/v1/users/287140978/media/recent/?client_id=f316052a8b2749dbb3b80beab72a29a2&callback=?"
  //   }
  // },
  getInitialState: function() {
    return {
      results: []
    };
  },
  componentDidMount: function() {
    $.getJSON(this.props.source, function(result) {
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
      <div>
        {results.map(function(result){
          return <article><div><a target="_blank" href={result.link}><img src={result.images.standard_resolution.url} /></a>
            <div className="content">
              {result.likes.count > 0 ? <section><span>{result.likes.count}</span><span> likes</span></section> : ''}
                {result.caption ? <span>{result.caption.text}</span> : '' }
            </div>
            </div></article>;
        })}
        <LoadMore />
      </div>
    );
  }
});

React.render(
  <MyInstagram source="https://api.instagram.com/v1/users/287140978/media/recent/?client_id=f316052a8b2749dbb3b80beab72a29a2&callback=?" />,
  // <MyInstagram source={this.props.source} />,
  document.getElementById('instagram')
);
