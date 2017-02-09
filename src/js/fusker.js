/*global $,console*/
function Range(name, start, end) {
    this.name = name;
    this.start = parseInt(start, 10);
    this.end = parseInt(end, 10);
    this.padding = start[0] === "0" ? start.length : 0;
    this.range = undefined;
}

Range.prototype.pad = function(value, length) {
    return (value.toString().length < length) ? this.pad("0"+value, length):value.toString();
};

Range.prototype.list = function(cb) {
  this.appendToList(cb, {});
};

Range.prototype.appendToList = function(cb, obj) {
  for(var i = this.start; i <= this.end; i++) {
      obj[this.name] = this.pad(i, this.padding);
      if(this.range) {
        this.range.appendToList(cb, obj);
      } else {
        cb(obj);
      }
  }
};

function createRanges(string) {
  var count = 0;
  var firstRange;
  var currentRange;

  var rangesRegex = /\[(@([a-z]+):)?(\d+)-(\d+)\]/g;
  // "[@set:1-2]", "@set:", "set", "1", "2"

  // keeps track of already used range names. if a range name is encountered twice,
  // only the first one will be created, the second will be ignored and later be filled
  // with the values of the first range
  var rangeNames = {};

  // keeps track of the order ranges are used in
  var ranges = [];
  var r;
  while(r = rangesRegex.exec(string)) {
    var name = r[2] || "_range_" + count;
    ranges.push(name);
    if(!rangeNames[name]) {
      rangeNames[name] = true;
      var newRange = new Range(name, r[3], r[4]);
      if(!firstRange) {
        currentRange = firstRange = newRange;
      } else {
        currentRange = currentRange.range = newRange;
      }
      count++;
    }
  }

  var parts = string.split(rangesRegex);
  var staticParts = [];
  for(var i=0; i < parts.length; i++) {
      if(i % 5 === 0){ staticParts.push(parts[i]); }
  }

  return {range: firstRange, staticParts: staticParts, ranges: ranges};
}

function generateStrings(string) {
  var rangeInfo = createRanges(string);
  var results = [];
  rangeInfo.range.list(function(values) {
    var result = "";
    for (var i=0; i < rangeInfo.staticParts.length; i++) {
      var insert;
      if(rangeInfo.ranges.length > i) {
        insert = values[rangeInfo.ranges[i]];
      } else {
        insert = "";
      }
      result += rangeInfo.staticParts[i] + insert;
    }
    results.push(result);
  });
  return results;
}

function log(message) {
  return function() {
    console.log(message, arguments);
  };
}

function updateUrlList(container) {
  var images = container.find('.image-loaded img');
  var urls = images.map(function() {
    return $(this).data('source');
  });
  return $.makeArray(urls);
}

function updateCountDisplays(successCount, errorCount, total) {
  var countDisplay = $("#count");
  if(!successCount) {
    countDisplay.text("-");
    return;
  }

  countDisplay.text(successCount + " / " + errorCount + " / " + (total - successCount - errorCount));
}

function safeHTML(data) {
  return $(data.replace("<script", "<div").replace("/script>", "/div>").replace("<img", "<i"));
}

function getProxy(url) {
  proxyUrl = "http://104.236.195.107/proxy.php";
  return $.get(proxyUrl, {url: url, secret: 'sgadfiuzasdfgiuasfgsdaukfksagfhjhsd'});
}

function loadEvilangel(url) {
  return getProxy(url).done(function(data) {
    data = $(data);
    var src = data.find(".pgDisplayLink img").prop("src");
    console.log("src: ", src);
    var mCount = data.find(".pgFooter .pgTitleText").text().match(/of (\d+)/);
    var count = (mCount && parseInt(mCount[1], 10) || 0);
    console.log("count: ", count);
    if(count > 0 && src) {
      var fuskerUrl = src.replace("001.jpg", "[001-" + count + "].jpg");
      $("#url").val(fuskerUrl);
      fusk();
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

function auto() {
  var url = $("#url").val();
  // http://www.hardx.com/en/picture/hardx/Good-Girl-Gone-Bad--Glam/5661
  if(url.match(/\/picture\/hardx\//)) {
    url = url.replace("/picture/hardx/", "/photogallery/").replace("de", "en");
    loadEvilangel(url);
  } else if(url.match(/evilangel\.com/) && url.match(/\/picture\//)) {
   // http://www.evilangel.com/en/picture/Hookup-Hotshot-Extreme-Dating/27303
     url = url.replace(/\/[a-z]{2}\/picture\//, "/en/photogallery/");
     loadEvilangel(url);
  } else if(url.match(/darkx\.com/) && url.match(/\/photo\//)) {
   url = url.replace(/\/[a-z]{2}\/photo\//, "/en/photogallery/");
   loadEvilangel(url);
  } else if(url.match(/throated\.com/) && url.match(/\/photo\//)) {
   url = url.replace(/\/[a-z]{2}\/photo\//, "/en/photogallery/");
   loadEvilangel(url);
  }
}

function fusk() {
    var successCount = 0;
    var errorCount = 0;
    var existingUrls = [];

    updateCountDisplays();

    var linkList = $("#linkList");
    linkList.val("");

    var container = $("#image-container");
    var width = parseInt($("#width").val(), 10);
    var resizeUrl = "http://104.236.195.107/resize.php?width=" + width + "&url=";
    var googleUrl = "https://www.google.com/searchbyimage?hl=en&safe=off&site=search&image_url=";
    container.empty();

    var strings = generateStrings($("#url").val());
    var totalCount = strings.length;
    var os = strings.map(function(url, i) {
      var smallImgUrl = resizeUrl + encodeURIComponent(url);
      var con = $("<div>").addClass("image-container");
      var googleLink = $("<a>").attr("href", googleUrl + encodeURIComponent(url)).attr("target", "blank").addClass("image-google-link").text("^");
      var a = $("<a>").attr("href", url).attr("target", "blank").addClass("image-link");
      var img = $("<img>").attr("src", smallImgUrl).css({width: width + "px"});
      img.error(function() {
        con.addClass("image-error");
        errorCount++;
        updateCountDisplays(successCount, errorCount, totalCount);
      });
      img.load(function() {
        con.addClass("image-loaded");
        successCount++;
        updateCountDisplays(successCount, errorCount, totalCount);
        img.data('source', url);
        existingUrls = updateUrlList(container);
        linkList.val(existingUrls.join("\n"));
      });

      con.append(googleLink);
      con.append(a.append(img));
      container.append(con);

    });
  }

$(function() {
  $("#fusk").click(fusk);
  $("#auto").click(auto);
  $("#url").keypress(function(e) {
    if(e.which === 13) {
      fusk();
    }
  });
});



// http://i.cdn.turner.com/si/pr/subs/swimsuit/images/13/13_cintia-dicker_[01-40].jpg
//console.log(generateStrings("http://ssdfsf.sdfsdf.com/sdfsdf/[@set:1-2]/images/[001-003].jpg"));
