var MyInstagram = React.createClass({displayName: "MyInstagram",
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
      React.createElement("div", null, 
        results.map(function(result){
            return React.createElement("article", null, React.createElement("div", null, React.createElement("img", {src: result.images.standard_resolution.url}), 
                React.createElement("div", {className: "content"}, 
                    result.likes.count > 0 ? React.createElement("section", null, React.createElement("span", null, result.likes.count), React.createElement("span", null, "likes")) : '', 
                    result.caption ? React.createElement("span", null, result.caption.text) : ''
                )
            ));
        })
      )
    );
  }
});

React.render(
  React.createElement(MyInstagram, {source: "https://api.instagram.com/v1/users/287140978/media/recent/?client_id=f316052a8b2749dbb3b80beab72a29a2&callback=?"}),
  document.getElementById('instagram')
);
