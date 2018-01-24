import $ from 'jquery';
if(window) {
  window.jQuery = $;
}

function parseHTML(str) {
  var html_document = document.implementation.createHTMLDocument();
  html_document.body.innerHTML = str;
  return $(html_document.body);
};

function getProxy(url) {
  let proxyUrl = "https://roflzomfg.de/proxy.php";
  return $.get(proxyUrl, {url: url, secret: 'sgadfiuzasdfgiuasfgsdaukfksagfhjhsd'}).then(parseHTML);
}

function urlToFusker(url, count) {
  if(count > 0 && url) {
    return url.replace("001.jpg", "[001-" + count + "].jpg");
  }
}

const EVILANGEL_URL_REGEX = /\/picture\/|\/photo\//
function loadEvilangel(url) {
  if(url.match(EVILANGEL_URL_REGEX)) {
    url = url.replace(EVILANGEL_URL_REGEX, "/photogallery/");
  }
  return getProxy(url).then(function(data) {
    var src = data.find(".pgDisplayLink img").prop("src");
    var mCount = data.find(".pgFooter .pgTitleText").text().match(/of (\d+)/);
    var count = ((mCount && parseInt(mCount[1], 10)) || 0);
    return urlToFusker(src, count);
  });
}

function loadCherrypop(url) {
  return getProxy(url).then(function(data) {
    var src = data.find(".imgLink.pgUnlocked:first").prop("href");
    var countText = data.find(".photosetNbPics .nbPicsValue").text();
    var count = ((parseInt(countText, 10)) || 0);
    return urlToFusker(src, count);
  });
}

// === images not found ===
// http://www.milkenema.com/en/Kate-England-And-Jodi/showphotos/26573

// http://www.gapingangels.com/en/Fuck-My-Ass-06/showphotos/27285

// http://www.jonnidarkkoxxx.com/en/The-Return-of-Anal-Slut-Lana-Croft/showphotos/49696

// http://www.lesbianolderyounger.com/en/Cougars-Loving-Kittens-03/showphotos/45146

// https://www.whiteghetto.com/en/Bi-Cuckold-Gang-Bang-12/showphotos/49606

// https://www.myteenoasis.com/en/The-Number-10/showphotos/3113

// http://www.pantypops.com/en/Panty-Pops-08/showphotos/15517

// http://www.christophclarkonline.com/en/Fuck-My-Ass-06/showphotos/27285

// http://www.christophsbignaturaltits.com/en/Fuck-My-Ass/showphotos/13606

// http://www.euro-angels.com/en/Im-Your-Bitch-Lyen/showphotos/15689

// http://www.jaysinxxx.com/en/Cream-Dreams-03/showphotos/22375

// http://www.buttman.com/en/Toys-Stretch-Harley-To-Orgasmic-Gaping/showphotos/49226

// http://www.cockchokingsluts.com/en/Fuck-Slaves-05/showphotos/3719

// http://www.nachovidalhardcore.com/en/Stable-Whores/showphotos/17771

// http://www.povblowjobs.com/en/Alexis-Fawx/showphotos/46683

// http://www.joeysilvera.com/en/Studio-A/showphotos/17713

// http://www.johnleslie.com/en/Fresh-Meat-26/showphotos/3667

// http://www.jakemalone.com/en/I-Wanna-B-A-Porn-star-04/showphotos/9525

// http://www.tittycreampies.com/en/Titty-Creampies-07/showphotos/20147

// https://www.outofthefamily.com/en/I-Caught-My-Daughter-Fucking-My-Boyfriend-02/showphotos/48765

// https://www.doghousedigital.com/en/The-Replacement-/photoset/49540

// http://www.milehighmedia.com/en/3-Some-Fuck-Fest-05/photoset/49563

// https://www.silverstonedvd.com/en/CELEBRITY-BABES/photoset/21486

// http://www.peternorth.com/en/The-Special-Gift/photoset/48963

function buildSite(parser, hostname) {
  return {
    name: hostname,
    hostname: hostname,
    matchers: [(/\/(picture|photo|photogallery)\//)],
    parser: parser
  }
}

function buildEvilangel(hostname) {
  return buildSite(loadEvilangel, hostname)
}

function buildCherrypop(hostname) {
  return buildSite(loadCherrypop, hostname)
}

const sites = [];

function addSite(site, samples) {
  const r = {site, samples}
  sites.push(r);
}



addSite(buildEvilangel("evilangel.com"), ["https://www.evilangel.com/en/picture/Hookup-Hotshot---Little-Size-Queens/44344"])
addSite(buildEvilangel("mikeadriano.com"), ["https://www.mikeadriano.com/en/picture/Full-Anal-Service-02/44265"])
addSite(buildEvilangel("lexingtonsteele.com"), ["https://www.lexingtonsteele.com/en/picture/Interracial-Fiends/47266"])
addSite(buildEvilangel("analacrobats.com"), ["https://www.analacrobats.com/en/picture/Anna-And-Gabriella/48230"])
addSite(buildEvilangel("prettydirty.com"), ["https://www.prettydirty.com/en/picture/Glamour---Lyra-Law--Lana-Adams-/49130"])
addSite(buildEvilangel("bskow.com"), ["https://www.bskow.com/en/picture/Just-The-Two-of-Us/48068"])
addSite(buildEvilangel("throated.com"), ["https://www.throated.com/en/photo/Learning-The-Ropes/5878"])
addSite(buildEvilangel("mommyblowsbest.com"), ["https://www.mommyblowsbest.com/en/photo/Sneaking-In/5799"])
addSite(buildEvilangel("milkingtable.com"), ["https://www.milkingtable.com/en/picture/The-Politician/26981"])
addSite(buildEvilangel("nurumassage.com"), ["https://www.nurumassage.com/en/picture/Gel-Manicure-Mixup/49417"])
addSite(buildEvilangel("massage-parlor.com"), ["https://www.massage-parlor.com/en/picture/Polish-Massage/19749"])
addSite(buildEvilangel("soapymassage.com"), ["https://www.soapymassage.com/en/picture/An-Undercover-Cop/8433"])
addSite(buildEvilangel("trickyspa.com"), ["https://www.trickyspa.com/en/picture/Follow-Me-Daddy/27077"])
addSite(buildEvilangel("squirtingorgies.com"), ["https://www.squirtingorgies.com/en/photogallery/Mattie-Borders/3847"])
addSite(buildEvilangel("cocksuckingchallenge.com"), ["https://www.cocksuckingchallenge.com/en/photogallery/Lexi-Swallow-Super-Bowl-Special-Cocksucking-Challenge/1858"])
addSite(buildEvilangel("onlyteenblowjobs.com"), ["https://www.onlyteenblowjobs.com/en/photo/The-It-Factor/7063"])
addSite(buildCherrypop("cherrypop.com"), ["https://www.cherrypop.com/en/photo/Young-Hitchhikers-02/48727"])
addSite(buildCherrypop("sweetheartvideo.com"), ["https://www.sweetheartvideo.com/en/photo/Lesbian-Babysitters-14/49616"])
addSite(buildCherrypop("sweetsinner.com"), ["https://www.sweetsinner.com/en/picture/Best-of-Both-Worlds/49217"])
addSite(buildCherrypop("realityjunkies.com"), ["https://www.realityjunkies.com/en/picture/Give-Me-an-A-/49467"])
addSite(buildCherrypop("roccosiffredi.com"), ["https://www.roccosiffredi.com/en/picture/Teens-VS-MILFS-06/49602"])
addSite(buildCherrypop("devilsfilm.com"), ["https://www.devilsfilm.com/en/picture/Fucking-The-Neighbors/49695"])
addSite(buildCherrypop("xempire.com"), ["https://www.xempire.com/en/photo/xempire/Chloe-Loves-Anal/7084"])
addSite(buildCherrypop("hardx.com"), ["https://www.hardx.com/en/photo/Anally-Yours-Glam/5826"])
addSite(buildCherrypop("darkx.com"), ["https://www.darkx.com/en/photo/Sweet-Company-Part-1/6859"])
addSite(buildCherrypop("lesbianx.com"), ["https://www.lesbianx.com/en/photo/Battle-Of-Super-Squirters/6810"])
addSite(buildCherrypop("eroticax.com"), ["https://www.eroticax.com/en/photo/Make-Me-Feel-Special/6848"])
addSite(buildCherrypop("burningangel.com"), ["https://www.burningangel.com/en/photo/Yhivi-Anal-Teenage-Fuckdoll/44335"])
addSite(buildCherrypop("allgirlmassage.com"), ["https://www.allgirlmassage.com/en/photo/My-Dirty-Friend/17826"])

const myxxxpass = {
  name: 'myxxxpass.com',
  hostname: 'myxxxpass.com',
  matchers: [(/\/photo\/\w+\//)],
  parser: loadEvilangel,
  transform: (url) => url.replace(/\/photo\/\w+\//, "/photogallery/")
}
addSite(myxxxpass, ["https://www.myxxxpass.com/en/photo/myxxxpass/This-Is-How-I-Get-What-I-Want/6530"]);



const HOSTNAME_REGEX = /https?:\/\/([^\/]+)/

function matchHost(hostname, url) {
  const match = url.match(HOSTNAME_REGEX);
  if(match) {
    return match[1].indexOf(hostname) !== -1;
  }
  return false;
}

function check(url) {
  const found = sites.find((site) => {
    return matchHost(site.site.hostname, url) && site.site.matchers.every((matcher) => url.match(matcher) );
  });
  return found && found.site;
}

function scrape(site, url) {
  if(site.transform) {
    url = site.transform(url)
  }
  const parser = site.parser || loadEvilangel;
  return parser(url)
}

export default {check, scrape, sites};
