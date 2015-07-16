var LoadMore = React.createClass({displayName: "LoadMore",
  handleClick: function(){
    // this.props.source = {result.pagination.next_url};
  },
  render: function(){
    return (
      React.createElement("div", {className: "load-more", onClick: this.handleClick}, 
        React.createElement("a", {className: "load-more-a", href: "#"}, "more")
      )
    )
  }
});

var MyInstagram = React.createClass({displayName: "MyInstagram",
  handleClick: function(){
    this.getDatas(this.state.nextPage);
  },
  getInitialState: function() {
    return {
      results: [],
      nextPage: ''
    };
  },
  getDatas: function(url){
    var that = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
    }).done(function(result){
      var newDatas = that.state.results.concat(result.data);
      that.setState({
        results: newDatas,
        nextPage: result.pagination.next_url
      });
    });
  },
  componentDidMount: function() {
    this.getDatas(this.props.source);
  },
  render: function() {
    var results = this.state.results;
    var nextPage =  this.state.nextPage;
    return (
      React.createElement("div", null, 
        results.map(function(result){
          return React.createElement("article", null, React.createElement("div", null, React.createElement("a", {target: "_blank", href: result.link}, React.createElement("img", {src: result.images.standard_resolution.url})), 
            React.createElement("div", {className: "content"}, 
              result.likes.count > 0 ? React.createElement("section", null, React.createElement("span", null, result.likes.count), React.createElement("span", null, " likes")) : '', 
                result.caption ? React.createElement("span", null, result.caption.text) : ''
            )
            ));
        }), 
        nextPage ? 
        React.createElement("div", {className: "load-more", onClick: this.handleClick}, 
          React.createElement("a", {className: "load-more-a", href: "javascript:;"}, "more")
        ) : ''
        
      )
    );
  }
});

React.render(
  React.createElement(MyInstagram, {source: "https://api.instagram.com/v1/users/287140978/media/recent/?client_id=f316052a8b2749dbb3b80beab72a29a2"}),
  document.getElementById('instagram')
);
