import { defer } from q;

export function status() {
  console.log('defer : ', defer);
  $.get("/api/auth/status", function(data) {
    if(!data) {
      this.setState({
        authenticated: false,
        username: 'unknown',
      })
    } else {
      if(!data.authenticated) {
        this.setState({
          authenticated: false,
          username: 'not logged in',
        })
      } else {
        this.setState({
          authenticated: true,
          username: data.userId,
        })
      }
    }
  }.bind(this), 'json')
  .fail(function(e) {
    this.setState({
      authenticated: false,
      username: data.username,
    })
  });
}