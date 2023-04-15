var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function (a) {
  return (a.raw = a);
};
$jscomp.createTemplateTagFirstArgWithRaw = function (a, b) {
  a.raw = b;
  return a;
};
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length
      ? {
          done: !1,
          value: a[b++],
        }
      : {
          done: !0,
        };
  };
};
$jscomp.arrayIterator = function (a) {
  return {
    next: $jscomp.arrayIteratorImpl(a),
  };
};
$jscomp.makeIterator = function (a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
var copy = document.getElementById("copy"),
  input = document.getElementById("input"),
  output = document.getElementById("output"),
  minified = document.getElementById("minified"),
  obfuscate = document.getElementById("obfuscate"),
  result = document.getElementById("result"),
  addon = document.getElementById("addon");

function obfaddon() {
  if (0 < addon.files.length) {
    input.disabled = !0;
    new JSZip();
    for (
      var a = $jscomp.makeIterator(addon.files), b = a.next();
      !b.done;
      b = a.next()
    )
      console.log(b.value.name);
  } else input.disabled = !1;
}

function obf() {
  "" !== input.value
    ? ((obfuscate.disabled = !1), (result.style.display = "block"))
    : ((obfuscate.disabled = !0), (result.style.display = "none"));
}
obf();
obfuscate.onclick = function () {
  input.value && obfuscateMain();
};

function obfuscateMain() {
  var a = String(input.value).match(/"[^"]*"|'[^']*'/g);
  if (Array.isArray(a)) {
    window.alert(
      "Note! This process may take long according to your JSON file size! Be wise about its usage."
    );
    for (var b = String(input.value), c = "", d = 0; d < a.length; )
      (b = b.replace(
        a[d].replace('"', "").replace('"', ""),
        "" + unicodeEscape(a[d].replace('"', "").replace('"', ""))
      )),
        d++;
    c = b;
    window.setTimeout(function () {
      output.value = c;
      if (!0 === minified.checked) {
        var g = JSON.minify(output.value);
        output.value = g;
      } else console.log(input.value);
    });
  }
}
copy.onclick = function () {
  output.select();
  output.setSelectionRange(0, output.value.length);
  document.execCommand("copy");
};
var unicodeEscape = function (a) {
  for (var b = "", c = 0, d; !isNaN((d = a.charCodeAt(c++))); )
    b += "\\u" + ("0000" + d.toString(16)).slice(-4);
  return b;
};
(function (a) {
  a = this.JSON;
  Object(a) !== a && (a = this.JSON = {});
  a.minify = function (b) {
    for (var c = 0, d = b.length, g = "", f, e; c < d; )
      switch (((f = b.charAt(c)), f)) {
        case "\t":
        case "\r":
        case "\n":
        case " ":
          c += 1;
          break;
        case "/":
          f = b.charAt((c += 1));
          switch (f) {
            case "/":
              e = b.indexOf("\n", c);
              0 > e && (e = b.indexOf("\r", c));
              c = -1 < e ? e : d;
              break;
            case "*":
              e = b.indexOf("*/", c);
              if (-1 < e) {
                c = e + 2;
                break;
              }
              throw SyntaxError("Unterminated block comment.");
            default:
              throw SyntaxError("Invalid comment.");
          }
          break;
        case '"':
          for (e = c; c < d; )
            if (((f = b.charAt((c += 1))), "\\" == f)) c += 1;
            else if ('"' == f) break;
          if ('"' == b.charAt(c)) {
            g += b.slice(e, (c += 1));
            break;
          }
          throw SyntaxError("Unterminated string.");
        default:
          (g += f), (c += 1);
      }
    return g;
  };
}.call(this));
