var MyInstagram = React.createClass({displayName: "MyInstagram",
  getInitialState: function() {
    return {
      test: ''
    };
  },

  componentDidMount: function() {
    $.getJSON(this.props.source, function(result) {
      console.log(result);
      if (this.isMounted()) {
        this.setState({
          test: 'aaa'
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      React.createElement("article", null, 
        this.state.test, "'s last gist is"
      )
    );
  }
});

React.render(
  React.createElement(MyInstagram, {source: "https://api.instagram.com/v1/users/287140978/media/recent/?client_id=f316052a8b2749dbb3b80beab72a29a2&callback=?"}),
  document.getElementById('instagram')
);
