import React, { Component } from 'react';
import update from 'react-addons-update';

import Queue from '../lib/Queue.js';
import fusker from '../lib/Fusker.js';
import {toResizeUrl} from '../lib/urlTransformation.js';
import evilangel from '../lib/scrapeEvilangel.js';
import {throttle} from '../lib/throttle.js';

import QueueState from './QueueState.js';

import 'bootstrap/dist/css/bootstrap.css'
import '../css/bootstrap-addons.css'
import '../css/custom.css'

Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};

class App extends Component {

  constructor() {
    super();
    this.state = {url: '', queueSettings: {width: 200 ,test: 1}, scraper: false, scraperRunning: false};
    this.fusk = this.fusk.bind(this);
    this.cancel = this.cancel.bind(this);
    this.setWidth = this.setWidth.bind(this);
    this.checkAutoScraper = throttle(this.checkAutoScraper, this, 100)
    this.renderSamples = this.renderSamples.bind(this);
  }

  fusk() {
    let urls = fusker(this.input.value);
    if(urls.length === 0) { return };
    urls = urls.map((url, i) => {
      return {thumbUrl: toResizeUrl(url, this.state.queueSettings.width), url: url, index: i}
    });

    let queue = new Queue(urls, (queueState) => {
      this.setState({queue: queue, queueState: queueState});
    });
    queue.run(20);
  }

  cancel() {
    this.state.queue.stop()
  }

  imageUrlList() {
    return this.state.queueState ? this.state.queueState.images.map(image => image.url) : [];
  }

  renderImages() {
    return this.state.queueState.images.map(function(image) {
      return (<a href={image.url} key={image.url}><img src={image.thumbUrl} alt='x' /></a>);
    });
  }

  setWidth(event) {
    const value = parseInt(event.target.value, 10) || 200;
    const newQueueSettings = update(this.state.queueSettings, {width: {'$set': value}});
    this.setState({queueSettings: newQueueSettings});
  }

  onKeyPress(keys, handler) {
    return (event) => {
      if(keys.indexOf(event.key) !== -1) { handler(event) }
    };
  }

  checkAutoScraper(url) {
    const setRunning = (url) => {
      if(url) {this.setState({url: url, scraperRunning: false})}
    }

    const scraper = evilangel.check(url);
    if(scraper) {
      this.setState({scraper: scraper, scraperRunning: true});
      var request = evilangel.scrape(scraper, url).then(setRunning);
      request.fail((request, status, message) => {
        this.setState({scrapeError: message, scraperRunning: false});
      });
    } else {
      this.setState({scraper: null})
    }

    return !!scraper;
  }

  onUrlChange(event) {
    const url = event.target.value;
    this.setURL(url);
  }

  setURL(url) {
    var match;
    const scraperFound = this.checkAutoScraper(url);
    if(!scraperFound) {
      const re = /\d+/g;
      const matches = [];
      while((match = re.exec(url))) {
        matches.push(match);
      }
    }
    this.setState({url: url, scrapeError: null});
  }

  isRunning() {
    return this.state.queue && this.state.queue.running && this.state.queue.runningWorkerCount > 0;
  }

  renderSamples() {
    const rand = [
      //"http://cuteteennude.com/sites/default/files/photos/bp_[001-099]_47.jpg",
      //"http://gallys.18eighteen.com/images_content/LaraBrooks_28387/1.jpg",
      //"http://www.porn-star.com/dolly_little/1.jpg"
    ];

    const evilangels = evilangel.sites.flatMap((s) => s.samples)

    const samples = rand.concat(evilangels);

    return samples.map((sample) => {
      return <div><a key={sample} className="Samples-link" onClick={e => this.setURL(sample)}>{sample}</a></div>
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row spacer-lg">
          <div className="col-sm-12">
            <QueueState queue={this.state.queueState} />
          </div>
        </div>

        <div className="row spacer-lg">
          <div className="col-sm-9">
            <div className="row">
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
                    id="url"
                    value={this.state.url}
                    ref={(input) => this.input = input }
                    onChange={(e) => this.onUrlChange(e)}
                    onKeyPress={this.onKeyPress('Enter', this.fusk)} />

                  {this.state.scraper
                    ? <span className="input-group-addon">
                      {this.state.scraperRunning ? "!" : null}
                      {this.state.scraper.name}
                      </span>
                    : null
                  }
                  <div className="input-group-btn">
                    {this.isRunning()
                     ? <input type="button" className="btn btn-danger" onClick={this.cancel} value="Cancel" />
                     : <input type="button" className="btn btn-primary" onClick={this.fusk} value="Fusk" />
                    }
                  </div>
                </div>
                <div className="help-block">{this.state.scrapeError}</div>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <textarea className="form-control" rows="1" value={this.imageUrlList().join("\n")} />
          </div>

        </div>
        
        {this.state.queueState ? 
        <div className="row spacer-lg">
          <div className="col-sm-12">
            {this.renderImages()}
          </div>
        </div>
        :
          null
        }
        <div className="Samples">
        {this.renderSamples()}
        </div>
      </div>
    );
  }
}

export default App;
