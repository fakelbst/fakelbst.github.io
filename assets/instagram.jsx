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
      <div>
        {results.map(function(result){
          return <article><div><a target="_blank" href={result.link}><img src={result.images.standard_resolution.url} /></a>
            <div className="content">
              {result.likes.count > 0 ? <section><span>{result.likes.count}</span><span> likes</span></section> : ''}
                {result.caption ? <span>{result.caption.text}</span> : '' }
            </div>
            </div></article>;
        })}
        {nextPage ? 
        <div className="load-more" onClick={this.handleClick}>
          <a className="load-more-a" href="javascript:;">more</a>
        </div> : ''
        }
      </div>
    );
  }
});

React.render(
  <MyInstagram source="https://api.instagram.com/v1/users/287140978/media/recent/?client_id=f316052a8b2749dbb3b80beab72a29a2" />,
  document.getElementById('instagram')
);
