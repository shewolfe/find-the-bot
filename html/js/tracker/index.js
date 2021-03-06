var Tweet = React.createClass({
    render: function() {
        return <div className="tweet">
            <p dangerouslySetInnerHTML={{__html: this.props.tweet.text}} />
        </div>;
    }
});

var Tracker = React.createClass({
    componentDidMount: function() {
        window.setInterval(this._tick, 100);
        this._tick();
    },

    getInitialState: function() {
        return {
            tweets: [],
            ajaxXHR: null
        };
    },
    
    _tick: function() {
        if(this.state.ajaxXHR !== null) {
            return;
        }

        var ajaxXHR = $.ajax({
            url: '/stream',
            success: this._updateStream
        });

        this.setState({
            ajaxXHR: ajaxXHR
        });
    },

    _updateStream: function(result, textStatus, jqXHR) {
        this.setState({
            tweets: result.tweets,
            ajaxXHR: null
        });
    },

    render: function() {
        var tweets = [];

        for(var i = 0; i < this.state.tweets.length; i++) {
            tweets.push(<Tweet key={this.state.tweets[i].tweet_id} tweet={this.state.tweets[i]} />);
        }

        if(tweets.length == 0) {
            tweets.push(<p key={'loading'}>Loading tweets...</p>);
        }

        var refresh = [];

        return <div>
            <div id="leftpanel">
                <div className="nav nav-active nav-loading firehose">
                    <span className="header">Firehose</span>
                    {refresh}
                </div>

                <div className="nav tag">
                    <span className="header">Track Tags <span className="glyphicon glyphicon-plus"></span></span>
                    <div className="entries">
                        <ul>
                            <li>#daesh</li>
                            <li>#hillary</li>
                            <li>#starwars</li>
                        </ul>
                    </div>
                </div>

                <div className="nav profile">
                    <span className="header">Track Profiles <span className="glyphicon glyphicon-plus"></span></span>
                    <div className="entries">
                        <ul>
                            <li>@everyslug</li>
                            <li>@libthebasedbot</li>
                            <li>@jeb_bush_baby</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="mainpanel">
                {tweets}
            </div>
        </div>;
    }
});

ReactDOM.render(
    <Tracker />, 
    document.getElementById('container')
);
