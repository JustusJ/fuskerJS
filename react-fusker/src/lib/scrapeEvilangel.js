import $ from 'jquery';
if(window) {
  window.jQuery = $;
}

function getProxy(url) {
  let proxyUrl = "https://roflzomfg.de/proxy.php";
  return $.get(proxyUrl, {url: url, secret: 'sgadfiuzasdfgiuasfgsdaukfksagfhjhsd'});
}

function loadEvilangel(url) {
  return getProxy(url).then(function(data) {
    data = $($.parseHTML(data, document, false));
    var src = data.find(".pgDisplayLink img").prop("src");
    var mCount = data.find(".pgFooter .pgTitleText").text().match(/of (\d+)/);
    var count = ((mCount && parseInt(mCount[1], 10)) || 0);
    if(count > 0 && src) {
      var fuskerUrl = src.replace("001.jpg", "[001-" + count + "].jpg");
      return fuskerUrl;
    }
  });
}

// analacrobats.com
// no pictures

// http://www.evilangel.com/en/video/Hookup-Hotshot---Little-Size-Queens-Scene-03/115982
// http://www.evilangel.com/en/picture/Hookup-Hotshot---Little-Size-Queens/44344
// http://www.evilangel.com/en/photogallery/Hookup-Hotshot---Little-Size-Queens/44344

// http://www.hardx.com/en/picture/hardx/Anally-Yours-Glam/5826
// http://www.hardx.com/en/photogallery/Anally-Yours-Glam/5826
// Scenes are not tied to picture galleries

// http://www.mikeadriano.com/en/pictures (not linked on site)
// http://www.mikeadriano.com/en/picture/Full-Anal-Service-02/44265
// http://www.mikeadriano.com/en/photogallery/Full-Anal-Service-02/44265

// http://www.mommyblowsbest.com/en/scene/115195/relevance/1/Sneaking-In (does not link to pictures)
// http://www.mommyblowsbest.com/en/photo/Sneaking-In/5799
// http://www.mommyblowsbest.com/en/photogallery/Sneaking-In/5799

// http://www.throated.com/en/scene/Learning-The-Ropes-Scene-01/116028 (does not link to pictures)
// http://www.throated.com/en/photo/Learning-The-Ropes/5878
// http://www.throated.com/en/photogallery/Learning-The-Ropes/5878

// http://www.manuelferrara.com/en/photo/CUMSHOTS-Misha-Cross-Wide-Open/5696
// http://www.manuelferrara.com/en/photogallery/CUMSHOTS-Misha-Cross-Wide-Open/5696

// http://www.milkenema.com/en/Kate-England-And-Jodi/scene/79803
// http://www.milkenema.com/en/Kate-England-And-Jodi/showphotos/26573
// ???

// http://www.gapingangels.com/en/Fuck-My-Ass-06/scene/81192
// http://www.gapingangels.com/en/Fuck-My-Ass-06/showphotos/27285
// ???

// http://www.myxxxpass.com/en/scene/myxxxpass/This-Is-How-I-Get-What-I-Want/1/122315
// http://www.myxxxpass.com/en/photo/myxxxpass/This-Is-How-I-Get-What-I-Want/6530
// http://www.myxxxpass.com/en/photogallery/This-Is-How-I-Get-What-I-Want/6530

// http://www.evilangel.com/en/picture/Hookup-Hotshot-Extreme-Dating/27303

// http://www.hardx.com/en/picture/hardx/Good-Girl-Gone-Bad--Glam/5661

const sites = [
  {
    name: 'hardx',
    matchers: [(/\/picture\/hardx\//)],
    transform: (url) => url.replace("/picture/hardx/", "/photogallery/").replace("de", "en")
  },
  {
    name: 'evilangel',
    matchers: [(/evilangel\.com/), (/\/picture\//)],
    transform: (url) => url.replace(/\/[a-z]{2}\/picture\//, "/en/photogallery/")
  },
  {
    name: 'darkx',
    matchers: [(/darkx\.com/), (/\/photo\//)],
    transform: (url) => url.replace(/\/[a-z]{2}\/photo\//, "/en/photogallery/")
  },
  {
    name: 'throated',
    matchers: [(/throated\.com/), (/\/photo\//)],
    transform: (url) => url.replace(/\/[a-z]{2}\/photo\//, "/en/photogallery/")
  },
  {
    name: 'myxxxpass',
    matchers: [(/myxxxpass\.com/), (/\/photo\/\w+\//)],
    transform: (url) => url.replace(/\/photo\/\w+\//, "/photogallery/")
  }
]

function check(url) {
  return sites.find((site) => {
    return site.matchers.every((matcher) => url.match(matcher) );
  })
}

function scrape(site, url) {
  return loadEvilangel(site.transform(url));
}

export default {check, scrape};
