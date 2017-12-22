import React, { Component } from 'react';

class QueueState extends Component {

  doneWidth() {
    return (this.props.queue.doneCount / this.props.queue.urlsCount * 100) + "%";
  }

  errorWidth() {
    return (this.props.queue.errorCount / this.props.queue.urlsCount * 100) + "%";
  }

  render() {
    if(!this.props.queue) { return <h1>fuskerJS</h1> };
    return (
      <div>
        <h1>
          fuskerJS&nbsp;
          <small>{this.props.queue.doneCount} / {this.props.queue.errorCount} / {this.props.queue.urlsCount} / Workers: {this.props.queue.runningWorkerCount}</small>
        </h1>
        <div className="progress">
          <div className="progress-bar progress-bar-success" style={{width: this.doneWidth()}}></div>
          <div className="progress-bar progress-bar-danger" style={{width: this.errorWidth(), float: "right"}}></div>

        </div>
      </div>
    )
  }
}

export default QueueState;
