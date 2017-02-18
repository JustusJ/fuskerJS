import React, { Component } from 'react';
import update from 'react-addons-update';

import Queue from '../lib/Queue.js';
import fusker from '../lib/Fusker.js';
import {toResizeUrl} from '../lib/urlTransformation.js';
import evilangel from '../lib/scrapeEvilangel.js';
import QueueState from './QueueState.js';

import 'bootstrap/dist/css/bootstrap.css'
import '../css/bootstrap-addons.css'

class App extends Component {

  constructor() {
    super();
    this.state = {url: '', queueSettings: {width: 200 ,test: 1}};
    this.fusk = this.fusk.bind(this);
    this.setWidth = this.setWidth.bind(this);
  }

  fusk() {
    let urls = fusker(this.input.value);
    if(urls.length === 0) { return };
    urls = urls.map((url, i) => {
      return {thumbUrl: toResizeUrl(url, this.state.queueSettings.width), url: url, index: i}
    });

    let queue = new Queue(urls, (queueState) => {
      let newQueueState = update(this.state.queue || {}, {'$merge': queueState});
      this.setState({queue: newQueueState});
    });
    queue.run(20);
  }

  renderImages() {
    return this.state.queue.images.map(function(image) {
      return (<a href={image.url} key={image.url}><img src={image.thumbUrl} alt='x' /></a>);
    })
  }

  setWidth(event) {
    let value = parseInt(event.target.value, 10) || 200;
    let newQueueSettings = update(this.state.queueSettings, {width: {'$set': value}});
    this.setState({queueSettings: newQueueSettings});
  }

  onKeyPress(keys, handler) {
    return (event) => {
      if(keys.indexOf(event.key) !== -1) { handler(event) }
    };
  }

  onUrlChange(event) {
    this.setState({url: event.target.value});
    let site = evilangel.check(event.target.value);
    if(site) {
      evilangel.scrape(site, event.target.value).then((url) => {
        if(url) {this.setState({url: url})}
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row spacer-lg">
          <div className="col-sm-12">
            <QueueState queue={this.state.queue} />
          </div>
        </div>

        <div className="row spacer-lg">
          <div className="col-sm-2">
            <div className="input-group">
              <div className="input-group-addon">width</div>
              <input className="form-control" type="number" value={this.state.queueSettings.width} onChange={this.setWidth} />
            </div>
          </div>

          <div className="col-sm-10">
            <div className="input-group">
              <input type="text"
                className="form-control"
                value={this.state.url}
                ref={(input) => this.input = input }
                onChange={(e) => this.onUrlChange(e)}
                onKeyPress={this.onKeyPress('Enter', this.fusk)} />
              
              <div className="input-group-btn">
                <input type="button" className="btn btn-primary" onClick={this.fusk} value="Fusk" />
              </div>
            </div>
          </div>
        </div>
        
        {this.state.queue ? 
        <div className="row spacer-lg">
          <div className="col-sm-12">
            {this.renderImages()}
          </div>
        </div>
        :
          null
        }
      </div>
    );
  }
}

export default App;
