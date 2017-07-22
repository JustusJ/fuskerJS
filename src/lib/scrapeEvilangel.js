import $ from 'jquery';
if(window) {
  window.jQuery = $;
}

function getProxy(url) {
  let proxyUrl = "https://roflzomfg.de/proxy.php";
  return $.get(proxyUrl, {url: url, secret: 'sgadfiuzasdfgiuasfgsdaukfksagfhjhsd'});
}

function loadEvilangel(url) {
  url.replace(/\/picture\/|\/photo\//, "/photogallery/")
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

function cherrypop(url) {
  return getProxy(url).then(function(data) {
    data = $($.parseHTML(data, document, false));
    var src = data.find(".imgLink.pgUnlocked:first").prop("href");
    var countText = data.find(".photosetNbPics .nbPicsValue").text();
    var count = ((parseInt(countText, 10)) || 0);
    if(count > 0 && src) {
      var fuskerUrl = src.replace("001.jpg", "[001-" + count + "].jpg");
      return fuskerUrl;
    }
  });
}
// analacrobats.com
// no pictures

// http://www.evilangel.com/en/picture/Hookup-Hotshot---Little-Size-Queens/44344
// http://www.evilangel.com/en/photogallery/Hookup-Hotshot---Little-Size-Queens/44344

// http://www.mikeadriano.com/en/picture/Full-Anal-Service-02/44265
// http://www.mikeadriano.com/en/photogallery/Full-Anal-Service-02/44265

// http://www.lexingtonsteele.com/en/picture/Interracial-Fiends/47266
// http://www.lexingtonsteele.com/en/photogallery/Interracial-Fiends/47266

// http://www.manuelferrara.com/en/photo/CUMSHOTS-Misha-Cross-Wide-Open/5696
// http://www.manuelferrara.com/en/photogallery/CUMSHOTS-Misha-Cross-Wide-Open/5696

// http://www.throated.com/en/photo/Learning-The-Ropes/5878
// http://www.throated.com/en/photogallery/Learning-The-Ropes/5878

// http://www.mommyblowsbest.com/en/photo/Sneaking-In/5799
// http://www.mommyblowsbest.com/en/photogallery/Sneaking-In/5799

// http://www.myxxxpass.com/en/photo/myxxxpass/This-Is-How-I-Get-What-I-Want/6530
// http://www.myxxxpass.com/en/photogallery/This-Is-How-I-Get-What-I-Want/6530

// http://www.cherrypop.com/en/photo/Young-Hitchhikers-02/48727

// http://www.sweetheartvideo.com/en/photo/Lesbian-Babysitters-14/49616

// http://www.sweetsinner.com/en/picture/Best-of-Both-Worlds/49217

// http://www.realityjunkies.com/en/picture/Give-Me-an-A-/49467

// http://www.roccosiffredi.com/en/picture/Teens-VS-MILFS-06/49602

// http://www.devilsfilm.com/en/picture/Fucking-The-Neighbors/49695

// http://www.hardx.com/en/photo/Anally-Yours-Glam/5826

// https://www.darkx.com/en/photo/Sweet-Company-Part-1/6859

// https://www.lesbianx.com/en/photo/Battle-Of-Super-Squirters/6810

// http://www.eroticax.com/en/photo/Make-Me-Feel-Special/6848

// http://www.bskow.com/en/picture/Just-The-Two-of-Us/48068


// === images not found ===
// http://www.milkenema.com/en/Kate-England-And-Jodi/showphotos/26573

// http://www.gapingangels.com/en/Fuck-My-Ass-06/showphotos/27285

// http://www.jonnidarkkoxxx.com/en/The-Return-of-Anal-Slut-Lana-Croft/showphotos/49696

// http://www.lesbianolderyounger.com/en/Cougars-Loving-Kittens-03/showphotos/45146

// https://www.whiteghetto.com/en/Bi-Cuckold-Gang-Bang-12/showphotos/49606

// https://www.doghousedigital.com/en/The-Replacement-/photoset/49540

// http://www.milehighmedia.com/en/3-Some-Fuck-Fest-05/photoset/49563

// https://www.silverstonedvd.com/en/CELEBRITY-BABES/photoset/21486

// http://www.peternorth.com/en/The-Special-Gift/photoset/48963

// https://www.myteenoasis.com/en/The-Number-10/showphotos/3113

const sites = [
  {
    name: 'evilangel.com',
    matchers: [(/evilangel\.com/), (/\/picture\//)],
    transform: (url) => url.replace(/\/picture\//, "/photogallery/")
  },
  {
    name: 'mikeadriano.com',
    matchers: [(/mikeadriano\.com/), (/\/picture\//)],
    transform: (url) => url.replace(/\/picture\//, "/photogallery/")
  },
  {
    name: 'lexingtonsteele.com',
    matchers: [(/lexingtonsteele\.com/), (/\/picture\//)],
    transform: (url) => url.replace(/\/picture\//, "/photogallery/")
  },
  {
    name: 'manuelferrara.com',
    matchers: [(/manuelferrara\.com/), (/\/photo\//)],
    transform: (url) => url.replace(/\/photo\//, "/photogallery/")
  },
  {
    name: 'throated.com',
    matchers: [(/throated\.com/), (/\/photo\//)],
    transform: (url) => url.replace(/\/photo\//, "/photogallery/")
  },
  {
    name: 'mommyblowsbest.com',
    matchers: [(/mommyblowsbest\.com/), (/\/photo\//)],
    transform: (url) => url.replace(/\/photo\//, "/photogallery/")
  },
  {
    name: 'myxxxpass.com',
    matchers: [(/myxxxpass\.com/), (/\/photo\/\w+\//)],
    transform: (url) => url.replace(/\/photo\/\w+\//, "/photogallery/")
  },
  {
    name: 'cherrypop.com',
    matchers: [(/cherrypop\.com/), (/\/photo\//)],
    parser: cherrypop
  },
  {
    name: 'sweetheartvideo.com',
    matchers: [(/sweetheartvideo\.com/), (/\/photo\//)],
    parser: cherrypop
  },
  {
    name: 'sweetsinner.com',
    matchers: [(/sweetsinner\.com/), (/\/picture\//)],
    parser: cherrypop
  },
  {
    name: 'realityjunkies.com',
    matchers: [(/realityjunkies\.com/), (/\/picture\//)],
    parser: cherrypop
  },
  {
    name: 'roccosiffredi.com',
    matchers: [(/roccosiffredi\.com/), (/\/picture\//)],
    parser: cherrypop
  },
  {
    name: 'devilsfilm.com',
    matchers: [(/devilsfilm\.com/), (/\/picture\//)],
    parser: cherrypop
  },
  {
    name: 'hardx.com',
    matchers: [(/hardx\.com/), (/\/photo\//)],
    parser: cherrypop
  },
  {
    name: 'darkx.com',
    matchers: [(/darkx\.com/), (/\/photo\//)],
    parser: cherrypop
  },
  {
    name: 'lesbianx.com',
    matchers: [(/lesbianx\.com/), (/\/photo\//)],
    parser: cherrypop
  },
  {
    name: 'eroticax.com',
    matchers: [(/eroticax\.com/), (/\/photo\//)],
    parser: cherrypop
  },
  {
    name: 'bskow.com',
    matchers: [(/bskow\.com/), (/\/picture\//)],
    transform: (url) => url.replace(/\/picture\//, "/photogallery/")
  },
]

function check(url) {
  return sites.find((site) => {
    return site.matchers.every((matcher) => url.match(matcher) );
  })
}

function scrape(site, url) {
  if(site.transform) {
    url = site.transform(url)
  }
  const parser = site.parser || loadEvilangel;
  return parser(url)
}

export default {check, scrape};
