var MyInstagram = React.createClass({
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
      <article>
        {this.state.test}'s last gist is
      </article>
    );
  }
});

React.render(
  <MyInstagram source="https://api.instagram.com/v1/users/287140978/media/recent/?client_id=f316052a8b2749dbb3b80beab72a29a2&callback=?" />,
  document.getElementById('instagram')
);
