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

  // "[@set:50-200]" => "set", "50", "200"
  // [1] (optional): name of the range
  // [2] (required): beginning of range
  // [3] (required): end of range
  var rangesRegex = /\[(?:@([a-z]+):)?(\d+)-(\d+)\]/g;

  // keeps track of already used range names. if a range name is encountered twice,
  // only the first one will be created, the second will be ignored and later be filled
  // with the values of the first range
  var rangeNames = {};

  // keeps track of the order ranges are used in
  var ranges = [];
  var match = rangesRegex.exec(string);
  while(match) {
    var name = match[1] || "_range_" + count;
    ranges.push(name);
    if(!rangeNames[name]) {
      rangeNames[name] = true;
      var newRange = new Range(name, match[2], match[3]);
      if(!firstRange) {
        currentRange = firstRange = newRange;
      } else {
        currentRange = currentRange.range = newRange;
      }
      count++;
    }
    match = rangesRegex.exec(string);
  }

  var parts = string.split(rangesRegex);
  var staticParts = [];
  for(var i=0; i < parts.length; i++) {
      if(i % 4 === 0){ staticParts.push(parts[i]); }
  }

  return {range: firstRange, staticParts: staticParts, ranges: ranges};
}

function generateStrings(string) {
  var rangeInfo = createRanges(string);
  var results = [];
  if(rangeInfo.range) {
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
  }
  return results;
}

export default generateStrings;