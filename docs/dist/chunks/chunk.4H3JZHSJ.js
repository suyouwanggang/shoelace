import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  component_styles_default
} from "./chunk.P6HXIBIO.js";
import {
  e,
  i,
  n as n2,
  t
} from "./chunk.OPP7P5NL.js";
import {
  n,
  r,
  y
} from "./chunk.HHQFDLZX.js";
import {
  __commonJS,
  __decorateClass,
  __toModule
} from "./chunk.QRXTBWFL.js";

// node_modules/vditor/dist/index.min.js
var require_index_min = __commonJS({
  "node_modules/vditor/dist/index.min.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define([], factory);
      else if (typeof exports === "object")
        exports["Vditor"] = factory();
      else
        root["Vditor"] = factory();
    })(exports, function() {
      return (() => {
        var __webpack_modules__ = {
          694: (module2) => {
            var diff_match_patch = function() {
              this.Diff_Timeout = 1;
              this.Diff_EditCost = 4;
              this.Match_Threshold = 0.5;
              this.Match_Distance = 1e3;
              this.Patch_DeleteThreshold = 0.5;
              this.Patch_Margin = 4;
              this.Match_MaxBits = 32;
            };
            var DIFF_DELETE = -1;
            var DIFF_INSERT = 1;
            var DIFF_EQUAL = 0;
            diff_match_patch.Diff = function(op, text) {
              return [op, text];
            };
            diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines, opt_deadline) {
              if (typeof opt_deadline == "undefined") {
                if (this.Diff_Timeout <= 0) {
                  opt_deadline = Number.MAX_VALUE;
                } else {
                  opt_deadline = new Date().getTime() + this.Diff_Timeout * 1e3;
                }
              }
              var deadline = opt_deadline;
              if (text1 == null || text2 == null) {
                throw new Error("Null input. (diff_main)");
              }
              if (text1 == text2) {
                if (text1) {
                  return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
                }
                return [];
              }
              if (typeof opt_checklines == "undefined") {
                opt_checklines = true;
              }
              var checklines = opt_checklines;
              var commonlength = this.diff_commonPrefix(text1, text2);
              var commonprefix = text1.substring(0, commonlength);
              text1 = text1.substring(commonlength);
              text2 = text2.substring(commonlength);
              commonlength = this.diff_commonSuffix(text1, text2);
              var commonsuffix = text1.substring(text1.length - commonlength);
              text1 = text1.substring(0, text1.length - commonlength);
              text2 = text2.substring(0, text2.length - commonlength);
              var diffs = this.diff_compute_(text1, text2, checklines, deadline);
              if (commonprefix) {
                diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
              }
              if (commonsuffix) {
                diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
              }
              this.diff_cleanupMerge(diffs);
              return diffs;
            };
            diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines, deadline) {
              var diffs;
              if (!text1) {
                return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
              }
              if (!text2) {
                return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
              }
              var longtext = text1.length > text2.length ? text1 : text2;
              var shorttext = text1.length > text2.length ? text2 : text1;
              var i2 = longtext.indexOf(shorttext);
              if (i2 != -1) {
                diffs = [new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i2)), new diff_match_patch.Diff(DIFF_EQUAL, shorttext), new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(i2 + shorttext.length))];
                if (text1.length > text2.length) {
                  diffs[0][0] = diffs[2][0] = DIFF_DELETE;
                }
                return diffs;
              }
              if (shorttext.length == 1) {
                return [new diff_match_patch.Diff(DIFF_DELETE, text1), new diff_match_patch.Diff(DIFF_INSERT, text2)];
              }
              var hm = this.diff_halfMatch_(text1, text2);
              if (hm) {
                var text1_a = hm[0];
                var text1_b = hm[1];
                var text2_a = hm[2];
                var text2_b = hm[3];
                var mid_common = hm[4];
                var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
                var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
                return diffs_a.concat([new diff_match_patch.Diff(DIFF_EQUAL, mid_common)], diffs_b);
              }
              if (checklines && text1.length > 100 && text2.length > 100) {
                return this.diff_lineMode_(text1, text2, deadline);
              }
              return this.diff_bisect_(text1, text2, deadline);
            };
            diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
              var a = this.diff_linesToChars_(text1, text2);
              text1 = a.chars1;
              text2 = a.chars2;
              var linearray = a.lineArray;
              var diffs = this.diff_main(text1, text2, false, deadline);
              this.diff_charsToLines_(diffs, linearray);
              this.diff_cleanupSemantic(diffs);
              diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ""));
              var pointer = 0;
              var count_delete = 0;
              var count_insert = 0;
              var text_delete = "";
              var text_insert = "";
              while (pointer < diffs.length) {
                switch (diffs[pointer][0]) {
                  case DIFF_INSERT:
                    count_insert++;
                    text_insert += diffs[pointer][1];
                    break;
                  case DIFF_DELETE:
                    count_delete++;
                    text_delete += diffs[pointer][1];
                    break;
                  case DIFF_EQUAL:
                    if (count_delete >= 1 && count_insert >= 1) {
                      diffs.splice(pointer - count_delete - count_insert, count_delete + count_insert);
                      pointer = pointer - count_delete - count_insert;
                      var subDiff = this.diff_main(text_delete, text_insert, false, deadline);
                      for (var j = subDiff.length - 1; j >= 0; j--) {
                        diffs.splice(pointer, 0, subDiff[j]);
                      }
                      pointer = pointer + subDiff.length;
                    }
                    count_insert = 0;
                    count_delete = 0;
                    text_delete = "";
                    text_insert = "";
                    break;
                }
                pointer++;
              }
              diffs.pop();
              return diffs;
            };
            diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
              var text1_length = text1.length;
              var text2_length = text2.length;
              var max_d = Math.ceil((text1_length + text2_length) / 2);
              var v_offset = max_d;
              var v_length = 2 * max_d;
              var v1 = new Array(v_length);
              var v2 = new Array(v_length);
              for (var x = 0; x < v_length; x++) {
                v1[x] = -1;
                v2[x] = -1;
              }
              v1[v_offset + 1] = 0;
              v2[v_offset + 1] = 0;
              var delta = text1_length - text2_length;
              var front = delta % 2 != 0;
              var k1start = 0;
              var k1end = 0;
              var k2start = 0;
              var k2end = 0;
              for (var d = 0; d < max_d; d++) {
                if (new Date().getTime() > deadline) {
                  break;
                }
                for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
                  var k1_offset = v_offset + k1;
                  var x1;
                  if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
                    x1 = v1[k1_offset + 1];
                  } else {
                    x1 = v1[k1_offset - 1] + 1;
                  }
                  var y1 = x1 - k1;
                  while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
                    x1++;
                    y1++;
                  }
                  v1[k1_offset] = x1;
                  if (x1 > text1_length) {
                    k1end += 2;
                  } else if (y1 > text2_length) {
                    k1start += 2;
                  } else if (front) {
                    var k2_offset = v_offset + delta - k1;
                    if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
                      var x2 = text1_length - v2[k2_offset];
                      if (x1 >= x2) {
                        return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                      }
                    }
                  }
                }
                for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
                  var k2_offset = v_offset + k2;
                  var x2;
                  if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
                    x2 = v2[k2_offset + 1];
                  } else {
                    x2 = v2[k2_offset - 1] + 1;
                  }
                  var y2 = x2 - k2;
                  while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
                    x2++;
                    y2++;
                  }
                  v2[k2_offset] = x2;
                  if (x2 > text1_length) {
                    k2end += 2;
                  } else if (y2 > text2_length) {
                    k2start += 2;
                  } else if (!front) {
                    var k1_offset = v_offset + delta - k2;
                    if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
                      var x1 = v1[k1_offset];
                      var y1 = v_offset + x1 - k1_offset;
                      x2 = text1_length - x2;
                      if (x1 >= x2) {
                        return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                      }
                    }
                  }
                }
              }
              return [new diff_match_patch.Diff(DIFF_DELETE, text1), new diff_match_patch.Diff(DIFF_INSERT, text2)];
            };
            diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y2, deadline) {
              var text1a = text1.substring(0, x);
              var text2a = text2.substring(0, y2);
              var text1b = text1.substring(x);
              var text2b = text2.substring(y2);
              var diffs = this.diff_main(text1a, text2a, false, deadline);
              var diffsb = this.diff_main(text1b, text2b, false, deadline);
              return diffs.concat(diffsb);
            };
            diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
              var lineArray = [];
              var lineHash = {};
              lineArray[0] = "";
              function diff_linesToCharsMunge_(text) {
                var chars = "";
                var lineStart = 0;
                var lineEnd = -1;
                var lineArrayLength = lineArray.length;
                while (lineEnd < text.length - 1) {
                  lineEnd = text.indexOf("\n", lineStart);
                  if (lineEnd == -1) {
                    lineEnd = text.length - 1;
                  }
                  var line = text.substring(lineStart, lineEnd + 1);
                  if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== void 0) {
                    chars += String.fromCharCode(lineHash[line]);
                  } else {
                    if (lineArrayLength == maxLines) {
                      line = text.substring(lineStart);
                      lineEnd = text.length;
                    }
                    chars += String.fromCharCode(lineArrayLength);
                    lineHash[line] = lineArrayLength;
                    lineArray[lineArrayLength++] = line;
                  }
                  lineStart = lineEnd + 1;
                }
                return chars;
              }
              var maxLines = 4e4;
              var chars1 = diff_linesToCharsMunge_(text1);
              maxLines = 65535;
              var chars2 = diff_linesToCharsMunge_(text2);
              return {
                chars1,
                chars2,
                lineArray
              };
            };
            diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
              for (var i2 = 0; i2 < diffs.length; i2++) {
                var chars = diffs[i2][1];
                var text = [];
                for (var j = 0; j < chars.length; j++) {
                  text[j] = lineArray[chars.charCodeAt(j)];
                }
                diffs[i2][1] = text.join("");
              }
            };
            diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
              if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
                return 0;
              }
              var pointermin = 0;
              var pointermax = Math.min(text1.length, text2.length);
              var pointermid = pointermax;
              var pointerstart = 0;
              while (pointermin < pointermid) {
                if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
                  pointermin = pointermid;
                  pointerstart = pointermin;
                } else {
                  pointermax = pointermid;
                }
                pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
              }
              return pointermid;
            };
            diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
              if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
                return 0;
              }
              var pointermin = 0;
              var pointermax = Math.min(text1.length, text2.length);
              var pointermid = pointermax;
              var pointerend = 0;
              while (pointermin < pointermid) {
                if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
                  pointermin = pointermid;
                  pointerend = pointermin;
                } else {
                  pointermax = pointermid;
                }
                pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
              }
              return pointermid;
            };
            diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
              var text1_length = text1.length;
              var text2_length = text2.length;
              if (text1_length == 0 || text2_length == 0) {
                return 0;
              }
              if (text1_length > text2_length) {
                text1 = text1.substring(text1_length - text2_length);
              } else if (text1_length < text2_length) {
                text2 = text2.substring(0, text1_length);
              }
              var text_length = Math.min(text1_length, text2_length);
              if (text1 == text2) {
                return text_length;
              }
              var best = 0;
              var length = 1;
              while (true) {
                var pattern = text1.substring(text_length - length);
                var found = text2.indexOf(pattern);
                if (found == -1) {
                  return best;
                }
                length += found;
                if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
                  best = length;
                  length++;
                }
              }
            };
            diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
              if (this.Diff_Timeout <= 0) {
                return null;
              }
              var longtext = text1.length > text2.length ? text1 : text2;
              var shorttext = text1.length > text2.length ? text2 : text1;
              if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
                return null;
              }
              var dmp = this;
              function diff_halfMatchI_(longtext2, shorttext2, i2) {
                var seed = longtext2.substring(i2, i2 + Math.floor(longtext2.length / 4));
                var j = -1;
                var best_common = "";
                var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
                while ((j = shorttext2.indexOf(seed, j + 1)) != -1) {
                  var prefixLength = dmp.diff_commonPrefix(longtext2.substring(i2), shorttext2.substring(j));
                  var suffixLength = dmp.diff_commonSuffix(longtext2.substring(0, i2), shorttext2.substring(0, j));
                  if (best_common.length < suffixLength + prefixLength) {
                    best_common = shorttext2.substring(j - suffixLength, j) + shorttext2.substring(j, j + prefixLength);
                    best_longtext_a = longtext2.substring(0, i2 - suffixLength);
                    best_longtext_b = longtext2.substring(i2 + prefixLength);
                    best_shorttext_a = shorttext2.substring(0, j - suffixLength);
                    best_shorttext_b = shorttext2.substring(j + prefixLength);
                  }
                }
                if (best_common.length * 2 >= longtext2.length) {
                  return [best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b, best_common];
                } else {
                  return null;
                }
              }
              var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
              var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
              var hm;
              if (!hm1 && !hm2) {
                return null;
              } else if (!hm2) {
                hm = hm1;
              } else if (!hm1) {
                hm = hm2;
              } else {
                hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
              }
              var text1_a, text1_b, text2_a, text2_b;
              if (text1.length > text2.length) {
                text1_a = hm[0];
                text1_b = hm[1];
                text2_a = hm[2];
                text2_b = hm[3];
              } else {
                text2_a = hm[0];
                text2_b = hm[1];
                text1_a = hm[2];
                text1_b = hm[3];
              }
              var mid_common = hm[4];
              return [text1_a, text1_b, text2_a, text2_b, mid_common];
            };
            diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
              var changes = false;
              var equalities = [];
              var equalitiesLength = 0;
              var lastEquality = null;
              var pointer = 0;
              var length_insertions1 = 0;
              var length_deletions1 = 0;
              var length_insertions2 = 0;
              var length_deletions2 = 0;
              while (pointer < diffs.length) {
                if (diffs[pointer][0] == DIFF_EQUAL) {
                  equalities[equalitiesLength++] = pointer;
                  length_insertions1 = length_insertions2;
                  length_deletions1 = length_deletions2;
                  length_insertions2 = 0;
                  length_deletions2 = 0;
                  lastEquality = diffs[pointer][1];
                } else {
                  if (diffs[pointer][0] == DIFF_INSERT) {
                    length_insertions2 += diffs[pointer][1].length;
                  } else {
                    length_deletions2 += diffs[pointer][1].length;
                  }
                  if (lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(length_insertions2, length_deletions2)) {
                    diffs.splice(equalities[equalitiesLength - 1], 0, new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
                    diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
                    equalitiesLength--;
                    equalitiesLength--;
                    pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
                    length_insertions1 = 0;
                    length_deletions1 = 0;
                    length_insertions2 = 0;
                    length_deletions2 = 0;
                    lastEquality = null;
                    changes = true;
                  }
                }
                pointer++;
              }
              if (changes) {
                this.diff_cleanupMerge(diffs);
              }
              this.diff_cleanupSemanticLossless(diffs);
              pointer = 1;
              while (pointer < diffs.length) {
                if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
                  var deletion = diffs[pointer - 1][1];
                  var insertion = diffs[pointer][1];
                  var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
                  var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
                  if (overlap_length1 >= overlap_length2) {
                    if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
                      diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL, insertion.substring(0, overlap_length1)));
                      diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
                      diffs[pointer + 1][1] = insertion.substring(overlap_length1);
                      pointer++;
                    }
                  } else {
                    if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
                      diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL, deletion.substring(0, overlap_length2)));
                      diffs[pointer - 1][0] = DIFF_INSERT;
                      diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
                      diffs[pointer + 1][0] = DIFF_DELETE;
                      diffs[pointer + 1][1] = deletion.substring(overlap_length2);
                      pointer++;
                    }
                  }
                  pointer++;
                }
                pointer++;
              }
            };
            diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
              function diff_cleanupSemanticScore_(one, two) {
                if (!one || !two) {
                  return 6;
                }
                var char1 = one.charAt(one.length - 1);
                var char2 = two.charAt(0);
                var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
                var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
                var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch.whitespaceRegex_);
                var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch.whitespaceRegex_);
                var lineBreak1 = whitespace1 && char1.match(diff_match_patch.linebreakRegex_);
                var lineBreak2 = whitespace2 && char2.match(diff_match_patch.linebreakRegex_);
                var blankLine1 = lineBreak1 && one.match(diff_match_patch.blanklineEndRegex_);
                var blankLine2 = lineBreak2 && two.match(diff_match_patch.blanklineStartRegex_);
                if (blankLine1 || blankLine2) {
                  return 5;
                } else if (lineBreak1 || lineBreak2) {
                  return 4;
                } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
                  return 3;
                } else if (whitespace1 || whitespace2) {
                  return 2;
                } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
                  return 1;
                }
                return 0;
              }
              var pointer = 1;
              while (pointer < diffs.length - 1) {
                if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
                  var equality1 = diffs[pointer - 1][1];
                  var edit = diffs[pointer][1];
                  var equality2 = diffs[pointer + 1][1];
                  var commonOffset = this.diff_commonSuffix(equality1, edit);
                  if (commonOffset) {
                    var commonString = edit.substring(edit.length - commonOffset);
                    equality1 = equality1.substring(0, equality1.length - commonOffset);
                    edit = commonString + edit.substring(0, edit.length - commonOffset);
                    equality2 = commonString + equality2;
                  }
                  var bestEquality1 = equality1;
                  var bestEdit = edit;
                  var bestEquality2 = equality2;
                  var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
                  while (edit.charAt(0) === equality2.charAt(0)) {
                    equality1 += edit.charAt(0);
                    edit = edit.substring(1) + equality2.charAt(0);
                    equality2 = equality2.substring(1);
                    var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
                    if (score >= bestScore) {
                      bestScore = score;
                      bestEquality1 = equality1;
                      bestEdit = edit;
                      bestEquality2 = equality2;
                    }
                  }
                  if (diffs[pointer - 1][1] != bestEquality1) {
                    if (bestEquality1) {
                      diffs[pointer - 1][1] = bestEquality1;
                    } else {
                      diffs.splice(pointer - 1, 1);
                      pointer--;
                    }
                    diffs[pointer][1] = bestEdit;
                    if (bestEquality2) {
                      diffs[pointer + 1][1] = bestEquality2;
                    } else {
                      diffs.splice(pointer + 1, 1);
                      pointer--;
                    }
                  }
                }
                pointer++;
              }
            };
            diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
            diff_match_patch.whitespaceRegex_ = /\s/;
            diff_match_patch.linebreakRegex_ = /[\r\n]/;
            diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
            diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;
            diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
              var changes = false;
              var equalities = [];
              var equalitiesLength = 0;
              var lastEquality = null;
              var pointer = 0;
              var pre_ins = false;
              var pre_del = false;
              var post_ins = false;
              var post_del = false;
              while (pointer < diffs.length) {
                if (diffs[pointer][0] == DIFF_EQUAL) {
                  if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
                    equalities[equalitiesLength++] = pointer;
                    pre_ins = post_ins;
                    pre_del = post_del;
                    lastEquality = diffs[pointer][1];
                  } else {
                    equalitiesLength = 0;
                    lastEquality = null;
                  }
                  post_ins = post_del = false;
                } else {
                  if (diffs[pointer][0] == DIFF_DELETE) {
                    post_del = true;
                  } else {
                    post_ins = true;
                  }
                  if (lastEquality && (pre_ins && pre_del && post_ins && post_del || lastEquality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
                    diffs.splice(equalities[equalitiesLength - 1], 0, new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
                    diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
                    equalitiesLength--;
                    lastEquality = null;
                    if (pre_ins && pre_del) {
                      post_ins = post_del = true;
                      equalitiesLength = 0;
                    } else {
                      equalitiesLength--;
                      pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
                      post_ins = post_del = false;
                    }
                    changes = true;
                  }
                }
                pointer++;
              }
              if (changes) {
                this.diff_cleanupMerge(diffs);
              }
            };
            diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
              diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ""));
              var pointer = 0;
              var count_delete = 0;
              var count_insert = 0;
              var text_delete = "";
              var text_insert = "";
              var commonlength;
              while (pointer < diffs.length) {
                switch (diffs[pointer][0]) {
                  case DIFF_INSERT:
                    count_insert++;
                    text_insert += diffs[pointer][1];
                    pointer++;
                    break;
                  case DIFF_DELETE:
                    count_delete++;
                    text_delete += diffs[pointer][1];
                    pointer++;
                    break;
                  case DIFF_EQUAL:
                    if (count_delete + count_insert > 1) {
                      if (count_delete !== 0 && count_insert !== 0) {
                        commonlength = this.diff_commonPrefix(text_insert, text_delete);
                        if (commonlength !== 0) {
                          if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                            diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                          } else {
                            diffs.splice(0, 0, new diff_match_patch.Diff(DIFF_EQUAL, text_insert.substring(0, commonlength)));
                            pointer++;
                          }
                          text_insert = text_insert.substring(commonlength);
                          text_delete = text_delete.substring(commonlength);
                        }
                        commonlength = this.diff_commonSuffix(text_insert, text_delete);
                        if (commonlength !== 0) {
                          diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                          text_insert = text_insert.substring(0, text_insert.length - commonlength);
                          text_delete = text_delete.substring(0, text_delete.length - commonlength);
                        }
                      }
                      pointer -= count_delete + count_insert;
                      diffs.splice(pointer, count_delete + count_insert);
                      if (text_delete.length) {
                        diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_DELETE, text_delete));
                        pointer++;
                      }
                      if (text_insert.length) {
                        diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_INSERT, text_insert));
                        pointer++;
                      }
                      pointer++;
                    } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
                      diffs[pointer - 1][1] += diffs[pointer][1];
                      diffs.splice(pointer, 1);
                    } else {
                      pointer++;
                    }
                    count_insert = 0;
                    count_delete = 0;
                    text_delete = "";
                    text_insert = "";
                    break;
                }
              }
              if (diffs[diffs.length - 1][1] === "") {
                diffs.pop();
              }
              var changes = false;
              pointer = 1;
              while (pointer < diffs.length - 1) {
                if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
                  if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
                    diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
                    diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
                    diffs.splice(pointer - 1, 1);
                    changes = true;
                  } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
                    diffs[pointer - 1][1] += diffs[pointer + 1][1];
                    diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
                    diffs.splice(pointer + 1, 1);
                    changes = true;
                  }
                }
                pointer++;
              }
              if (changes) {
                this.diff_cleanupMerge(diffs);
              }
            };
            diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
              var chars1 = 0;
              var chars2 = 0;
              var last_chars1 = 0;
              var last_chars2 = 0;
              var x;
              for (x = 0; x < diffs.length; x++) {
                if (diffs[x][0] !== DIFF_INSERT) {
                  chars1 += diffs[x][1].length;
                }
                if (diffs[x][0] !== DIFF_DELETE) {
                  chars2 += diffs[x][1].length;
                }
                if (chars1 > loc) {
                  break;
                }
                last_chars1 = chars1;
                last_chars2 = chars2;
              }
              if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
                return last_chars2;
              }
              return last_chars2 + (loc - last_chars1);
            };
            diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
              var html = [];
              var pattern_amp = /&/g;
              var pattern_lt = /</g;
              var pattern_gt = />/g;
              var pattern_para = /\n/g;
              for (var x = 0; x < diffs.length; x++) {
                var op = diffs[x][0];
                var data = diffs[x][1];
                var text = data.replace(pattern_amp, "&amp;").replace(pattern_lt, "&lt;").replace(pattern_gt, "&gt;").replace(pattern_para, "&para;<br>");
                switch (op) {
                  case DIFF_INSERT:
                    html[x] = '<ins style="background:#e6ffe6;">' + text + "</ins>";
                    break;
                  case DIFF_DELETE:
                    html[x] = '<del style="background:#ffe6e6;">' + text + "</del>";
                    break;
                  case DIFF_EQUAL:
                    html[x] = "<span>" + text + "</span>";
                    break;
                }
              }
              return html.join("");
            };
            diff_match_patch.prototype.diff_text1 = function(diffs) {
              var text = [];
              for (var x = 0; x < diffs.length; x++) {
                if (diffs[x][0] !== DIFF_INSERT) {
                  text[x] = diffs[x][1];
                }
              }
              return text.join("");
            };
            diff_match_patch.prototype.diff_text2 = function(diffs) {
              var text = [];
              for (var x = 0; x < diffs.length; x++) {
                if (diffs[x][0] !== DIFF_DELETE) {
                  text[x] = diffs[x][1];
                }
              }
              return text.join("");
            };
            diff_match_patch.prototype.diff_levenshtein = function(diffs) {
              var levenshtein = 0;
              var insertions = 0;
              var deletions = 0;
              for (var x = 0; x < diffs.length; x++) {
                var op = diffs[x][0];
                var data = diffs[x][1];
                switch (op) {
                  case DIFF_INSERT:
                    insertions += data.length;
                    break;
                  case DIFF_DELETE:
                    deletions += data.length;
                    break;
                  case DIFF_EQUAL:
                    levenshtein += Math.max(insertions, deletions);
                    insertions = 0;
                    deletions = 0;
                    break;
                }
              }
              levenshtein += Math.max(insertions, deletions);
              return levenshtein;
            };
            diff_match_patch.prototype.diff_toDelta = function(diffs) {
              var text = [];
              for (var x = 0; x < diffs.length; x++) {
                switch (diffs[x][0]) {
                  case DIFF_INSERT:
                    text[x] = "+" + encodeURI(diffs[x][1]);
                    break;
                  case DIFF_DELETE:
                    text[x] = "-" + diffs[x][1].length;
                    break;
                  case DIFF_EQUAL:
                    text[x] = "=" + diffs[x][1].length;
                    break;
                }
              }
              return text.join("	").replace(/%20/g, " ");
            };
            diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
              var diffs = [];
              var diffsLength = 0;
              var pointer = 0;
              var tokens = delta.split(/\t/g);
              for (var x = 0; x < tokens.length; x++) {
                var param = tokens[x].substring(1);
                switch (tokens[x].charAt(0)) {
                  case "+":
                    try {
                      diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
                    } catch (ex) {
                      throw new Error("Illegal escape in diff_fromDelta: " + param);
                    }
                    break;
                  case "-":
                  case "=":
                    var n3 = parseInt(param, 10);
                    if (isNaN(n3) || n3 < 0) {
                      throw new Error("Invalid number in diff_fromDelta: " + param);
                    }
                    var text = text1.substring(pointer, pointer += n3);
                    if (tokens[x].charAt(0) == "=") {
                      diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text);
                    } else {
                      diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text);
                    }
                    break;
                  default:
                    if (tokens[x]) {
                      throw new Error("Invalid diff operation in diff_fromDelta: " + tokens[x]);
                    }
                }
              }
              if (pointer != text1.length) {
                throw new Error("Delta length (" + pointer + ") does not equal source text length (" + text1.length + ").");
              }
              return diffs;
            };
            diff_match_patch.prototype.match_main = function(text, pattern, loc) {
              if (text == null || pattern == null || loc == null) {
                throw new Error("Null input. (match_main)");
              }
              loc = Math.max(0, Math.min(loc, text.length));
              if (text == pattern) {
                return 0;
              } else if (!text.length) {
                return -1;
              } else if (text.substring(loc, loc + pattern.length) == pattern) {
                return loc;
              } else {
                return this.match_bitap_(text, pattern, loc);
              }
            };
            diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
              if (pattern.length > this.Match_MaxBits) {
                throw new Error("Pattern too long for this browser.");
              }
              var s = this.match_alphabet_(pattern);
              var dmp = this;
              function match_bitapScore_(e2, x) {
                var accuracy = e2 / pattern.length;
                var proximity = Math.abs(loc - x);
                if (!dmp.Match_Distance) {
                  return proximity ? 1 : accuracy;
                }
                return accuracy + proximity / dmp.Match_Distance;
              }
              var score_threshold = this.Match_Threshold;
              var best_loc = text.indexOf(pattern, loc);
              if (best_loc != -1) {
                score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
                best_loc = text.lastIndexOf(pattern, loc + pattern.length);
                if (best_loc != -1) {
                  score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
                }
              }
              var matchmask = 1 << pattern.length - 1;
              best_loc = -1;
              var bin_min, bin_mid;
              var bin_max = pattern.length + text.length;
              var last_rd;
              for (var d = 0; d < pattern.length; d++) {
                bin_min = 0;
                bin_mid = bin_max;
                while (bin_min < bin_mid) {
                  if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
                    bin_min = bin_mid;
                  } else {
                    bin_max = bin_mid;
                  }
                  bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
                }
                bin_max = bin_mid;
                var start = Math.max(1, loc - bin_mid + 1);
                var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
                var rd = Array(finish + 2);
                rd[finish + 1] = (1 << d) - 1;
                for (var j = finish; j >= start; j--) {
                  var charMatch = s[text.charAt(j - 1)];
                  if (d === 0) {
                    rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
                  } else {
                    rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
                  }
                  if (rd[j] & matchmask) {
                    var score = match_bitapScore_(d, j - 1);
                    if (score <= score_threshold) {
                      score_threshold = score;
                      best_loc = j - 1;
                      if (best_loc > loc) {
                        start = Math.max(1, 2 * loc - best_loc);
                      } else {
                        break;
                      }
                    }
                  }
                }
                if (match_bitapScore_(d + 1, loc) > score_threshold) {
                  break;
                }
                last_rd = rd;
              }
              return best_loc;
            };
            diff_match_patch.prototype.match_alphabet_ = function(pattern) {
              var s = {};
              for (var i2 = 0; i2 < pattern.length; i2++) {
                s[pattern.charAt(i2)] = 0;
              }
              for (var i2 = 0; i2 < pattern.length; i2++) {
                s[pattern.charAt(i2)] |= 1 << pattern.length - i2 - 1;
              }
              return s;
            };
            diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
              if (text.length == 0) {
                return;
              }
              if (patch.start2 === null) {
                throw Error("patch not initialized");
              }
              var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
              var padding = 0;
              while (text.indexOf(pattern) != text.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
                padding += this.Patch_Margin;
                pattern = text.substring(patch.start2 - padding, patch.start2 + patch.length1 + padding);
              }
              padding += this.Patch_Margin;
              var prefix = text.substring(patch.start2 - padding, patch.start2);
              if (prefix) {
                patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
              }
              var suffix = text.substring(patch.start2 + patch.length1, patch.start2 + patch.length1 + padding);
              if (suffix) {
                patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
              }
              patch.start1 -= prefix.length;
              patch.start2 -= prefix.length;
              patch.length1 += prefix.length + suffix.length;
              patch.length2 += prefix.length + suffix.length;
            };
            diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
              var text1, diffs;
              if (typeof a == "string" && typeof opt_b == "string" && typeof opt_c == "undefined") {
                text1 = a;
                diffs = this.diff_main(text1, opt_b, true);
                if (diffs.length > 2) {
                  this.diff_cleanupSemantic(diffs);
                  this.diff_cleanupEfficiency(diffs);
                }
              } else if (a && typeof a == "object" && typeof opt_b == "undefined" && typeof opt_c == "undefined") {
                diffs = a;
                text1 = this.diff_text1(diffs);
              } else if (typeof a == "string" && opt_b && typeof opt_b == "object" && typeof opt_c == "undefined") {
                text1 = a;
                diffs = opt_b;
              } else if (typeof a == "string" && typeof opt_b == "string" && opt_c && typeof opt_c == "object") {
                text1 = a;
                diffs = opt_c;
              } else {
                throw new Error("Unknown call format to patch_make.");
              }
              if (diffs.length === 0) {
                return [];
              }
              var patches = [];
              var patch = new diff_match_patch.patch_obj();
              var patchDiffLength = 0;
              var char_count1 = 0;
              var char_count2 = 0;
              var prepatch_text = text1;
              var postpatch_text = text1;
              for (var x = 0; x < diffs.length; x++) {
                var diff_type = diffs[x][0];
                var diff_text = diffs[x][1];
                if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
                  patch.start1 = char_count1;
                  patch.start2 = char_count2;
                }
                switch (diff_type) {
                  case DIFF_INSERT:
                    patch.diffs[patchDiffLength++] = diffs[x];
                    patch.length2 += diff_text.length;
                    postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
                    break;
                  case DIFF_DELETE:
                    patch.length1 += diff_text.length;
                    patch.diffs[patchDiffLength++] = diffs[x];
                    postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
                    break;
                  case DIFF_EQUAL:
                    if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x + 1) {
                      patch.diffs[patchDiffLength++] = diffs[x];
                      patch.length1 += diff_text.length;
                      patch.length2 += diff_text.length;
                    } else if (diff_text.length >= 2 * this.Patch_Margin) {
                      if (patchDiffLength) {
                        this.patch_addContext_(patch, prepatch_text);
                        patches.push(patch);
                        patch = new diff_match_patch.patch_obj();
                        patchDiffLength = 0;
                        prepatch_text = postpatch_text;
                        char_count1 = char_count2;
                      }
                    }
                    break;
                }
                if (diff_type !== DIFF_INSERT) {
                  char_count1 += diff_text.length;
                }
                if (diff_type !== DIFF_DELETE) {
                  char_count2 += diff_text.length;
                }
              }
              if (patchDiffLength) {
                this.patch_addContext_(patch, prepatch_text);
                patches.push(patch);
              }
              return patches;
            };
            diff_match_patch.prototype.patch_deepCopy = function(patches) {
              var patchesCopy = [];
              for (var x = 0; x < patches.length; x++) {
                var patch = patches[x];
                var patchCopy = new diff_match_patch.patch_obj();
                patchCopy.diffs = [];
                for (var y2 = 0; y2 < patch.diffs.length; y2++) {
                  patchCopy.diffs[y2] = new diff_match_patch.Diff(patch.diffs[y2][0], patch.diffs[y2][1]);
                }
                patchCopy.start1 = patch.start1;
                patchCopy.start2 = patch.start2;
                patchCopy.length1 = patch.length1;
                patchCopy.length2 = patch.length2;
                patchesCopy[x] = patchCopy;
              }
              return patchesCopy;
            };
            diff_match_patch.prototype.patch_apply = function(patches, text) {
              if (patches.length == 0) {
                return [text, []];
              }
              patches = this.patch_deepCopy(patches);
              var nullPadding = this.patch_addPadding(patches);
              text = nullPadding + text + nullPadding;
              this.patch_splitMax(patches);
              var delta = 0;
              var results = [];
              for (var x = 0; x < patches.length; x++) {
                var expected_loc = patches[x].start2 + delta;
                var text1 = this.diff_text1(patches[x].diffs);
                var start_loc;
                var end_loc = -1;
                if (text1.length > this.Match_MaxBits) {
                  start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits), expected_loc);
                  if (start_loc != -1) {
                    end_loc = this.match_main(text, text1.substring(text1.length - this.Match_MaxBits), expected_loc + text1.length - this.Match_MaxBits);
                    if (end_loc == -1 || start_loc >= end_loc) {
                      start_loc = -1;
                    }
                  }
                } else {
                  start_loc = this.match_main(text, text1, expected_loc);
                }
                if (start_loc == -1) {
                  results[x] = false;
                  delta -= patches[x].length2 - patches[x].length1;
                } else {
                  results[x] = true;
                  delta = start_loc - expected_loc;
                  var text2;
                  if (end_loc == -1) {
                    text2 = text.substring(start_loc, start_loc + text1.length);
                  } else {
                    text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
                  }
                  if (text1 == text2) {
                    text = text.substring(0, start_loc) + this.diff_text2(patches[x].diffs) + text.substring(start_loc + text1.length);
                  } else {
                    var diffs = this.diff_main(text1, text2, false);
                    if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
                      results[x] = false;
                    } else {
                      this.diff_cleanupSemanticLossless(diffs);
                      var index1 = 0;
                      var index2;
                      for (var y2 = 0; y2 < patches[x].diffs.length; y2++) {
                        var mod = patches[x].diffs[y2];
                        if (mod[0] !== DIFF_EQUAL) {
                          index2 = this.diff_xIndex(diffs, index1);
                        }
                        if (mod[0] === DIFF_INSERT) {
                          text = text.substring(0, start_loc + index2) + mod[1] + text.substring(start_loc + index2);
                        } else if (mod[0] === DIFF_DELETE) {
                          text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(diffs, index1 + mod[1].length));
                        }
                        if (mod[0] !== DIFF_DELETE) {
                          index1 += mod[1].length;
                        }
                      }
                    }
                  }
                }
              }
              text = text.substring(nullPadding.length, text.length - nullPadding.length);
              return [text, results];
            };
            diff_match_patch.prototype.patch_addPadding = function(patches) {
              var paddingLength = this.Patch_Margin;
              var nullPadding = "";
              for (var x = 1; x <= paddingLength; x++) {
                nullPadding += String.fromCharCode(x);
              }
              for (var x = 0; x < patches.length; x++) {
                patches[x].start1 += paddingLength;
                patches[x].start2 += paddingLength;
              }
              var patch = patches[0];
              var diffs = patch.diffs;
              if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
                diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
                patch.start1 -= paddingLength;
                patch.start2 -= paddingLength;
                patch.length1 += paddingLength;
                patch.length2 += paddingLength;
              } else if (paddingLength > diffs[0][1].length) {
                var extraLength = paddingLength - diffs[0][1].length;
                diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
                patch.start1 -= extraLength;
                patch.start2 -= extraLength;
                patch.length1 += extraLength;
                patch.length2 += extraLength;
              }
              patch = patches[patches.length - 1];
              diffs = patch.diffs;
              if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
                diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
                patch.length1 += paddingLength;
                patch.length2 += paddingLength;
              } else if (paddingLength > diffs[diffs.length - 1][1].length) {
                var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
                diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
                patch.length1 += extraLength;
                patch.length2 += extraLength;
              }
              return nullPadding;
            };
            diff_match_patch.prototype.patch_splitMax = function(patches) {
              var patch_size = this.Match_MaxBits;
              for (var x = 0; x < patches.length; x++) {
                if (patches[x].length1 <= patch_size) {
                  continue;
                }
                var bigpatch = patches[x];
                patches.splice(x--, 1);
                var start1 = bigpatch.start1;
                var start2 = bigpatch.start2;
                var precontext = "";
                while (bigpatch.diffs.length !== 0) {
                  var patch = new diff_match_patch.patch_obj();
                  var empty = true;
                  patch.start1 = start1 - precontext.length;
                  patch.start2 = start2 - precontext.length;
                  if (precontext !== "") {
                    patch.length1 = patch.length2 = precontext.length;
                    patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
                  }
                  while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
                    var diff_type = bigpatch.diffs[0][0];
                    var diff_text = bigpatch.diffs[0][1];
                    if (diff_type === DIFF_INSERT) {
                      patch.length2 += diff_text.length;
                      start2 += diff_text.length;
                      patch.diffs.push(bigpatch.diffs.shift());
                      empty = false;
                    } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
                      patch.length1 += diff_text.length;
                      start1 += diff_text.length;
                      empty = false;
                      patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
                      bigpatch.diffs.shift();
                    } else {
                      diff_text = diff_text.substring(0, patch_size - patch.length1 - this.Patch_Margin);
                      patch.length1 += diff_text.length;
                      start1 += diff_text.length;
                      if (diff_type === DIFF_EQUAL) {
                        patch.length2 += diff_text.length;
                        start2 += diff_text.length;
                      } else {
                        empty = false;
                      }
                      patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
                      if (diff_text == bigpatch.diffs[0][1]) {
                        bigpatch.diffs.shift();
                      } else {
                        bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
                      }
                    }
                  }
                  precontext = this.diff_text2(patch.diffs);
                  precontext = precontext.substring(precontext.length - this.Patch_Margin);
                  var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
                  if (postcontext !== "") {
                    patch.length1 += postcontext.length;
                    patch.length2 += postcontext.length;
                    if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
                      patch.diffs[patch.diffs.length - 1][1] += postcontext;
                    } else {
                      patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
                    }
                  }
                  if (!empty) {
                    patches.splice(++x, 0, patch);
                  }
                }
              }
            };
            diff_match_patch.prototype.patch_toText = function(patches) {
              var text = [];
              for (var x = 0; x < patches.length; x++) {
                text[x] = patches[x];
              }
              return text.join("");
            };
            diff_match_patch.prototype.patch_fromText = function(textline) {
              var patches = [];
              if (!textline) {
                return patches;
              }
              var text = textline.split("\n");
              var textPointer = 0;
              var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
              while (textPointer < text.length) {
                var m = text[textPointer].match(patchHeader);
                if (!m) {
                  throw new Error("Invalid patch string: " + text[textPointer]);
                }
                var patch = new diff_match_patch.patch_obj();
                patches.push(patch);
                patch.start1 = parseInt(m[1], 10);
                if (m[2] === "") {
                  patch.start1--;
                  patch.length1 = 1;
                } else if (m[2] == "0") {
                  patch.length1 = 0;
                } else {
                  patch.start1--;
                  patch.length1 = parseInt(m[2], 10);
                }
                patch.start2 = parseInt(m[3], 10);
                if (m[4] === "") {
                  patch.start2--;
                  patch.length2 = 1;
                } else if (m[4] == "0") {
                  patch.length2 = 0;
                } else {
                  patch.start2--;
                  patch.length2 = parseInt(m[4], 10);
                }
                textPointer++;
                while (textPointer < text.length) {
                  var sign = text[textPointer].charAt(0);
                  try {
                    var line = decodeURI(text[textPointer].substring(1));
                  } catch (ex) {
                    throw new Error("Illegal escape in patch_fromText: " + line);
                  }
                  if (sign == "-") {
                    patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
                  } else if (sign == "+") {
                    patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
                  } else if (sign == " ") {
                    patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
                  } else if (sign == "@") {
                    break;
                  } else if (sign === "") {
                  } else {
                    throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
                  }
                  textPointer++;
                }
              }
              return patches;
            };
            diff_match_patch.patch_obj = function() {
              this.diffs = [];
              this.start1 = null;
              this.start2 = null;
              this.length1 = 0;
              this.length2 = 0;
            };
            diff_match_patch.patch_obj.prototype.toString = function() {
              var coords1, coords2;
              if (this.length1 === 0) {
                coords1 = this.start1 + ",0";
              } else if (this.length1 == 1) {
                coords1 = this.start1 + 1;
              } else {
                coords1 = this.start1 + 1 + "," + this.length1;
              }
              if (this.length2 === 0) {
                coords2 = this.start2 + ",0";
              } else if (this.length2 == 1) {
                coords2 = this.start2 + 1;
              } else {
                coords2 = this.start2 + 1 + "," + this.length2;
              }
              var text = ["@@ -" + coords1 + " +" + coords2 + " @@\n"];
              var op;
              for (var x = 0; x < this.diffs.length; x++) {
                switch (this.diffs[x][0]) {
                  case DIFF_INSERT:
                    op = "+";
                    break;
                  case DIFF_DELETE:
                    op = "-";
                    break;
                  case DIFF_EQUAL:
                    op = " ";
                    break;
                }
                text[x + 1] = op + encodeURI(this.diffs[x][1]) + "\n";
              }
              return text.join("").replace(/%20/g, " ");
            };
            module2.exports = diff_match_patch;
            module2.exports.diff_match_patch = diff_match_patch;
            module2.exports.DIFF_DELETE = DIFF_DELETE;
            module2.exports.DIFF_INSERT = DIFF_INSERT;
            module2.exports.DIFF_EQUAL = DIFF_EQUAL;
          },
          157: () => {
          },
          857: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "default": () => method
            });
            var abcRender = __webpack_require__2(369);
            var adapterRender = __webpack_require__2(46);
            var chartRender = __webpack_require__2(726);
            var codeRender = __webpack_require__2(23);
            var flowchartRender = __webpack_require__2(383);
            var graphvizRender = __webpack_require__2(890);
            var highlightRender = __webpack_require__2(93);
            ;
            var lazyLoadImageRender = function(element) {
              if (element === void 0) {
                element = document;
              }
              var loadImg = function(it) {
                var testImage = document.createElement("img");
                testImage.src = it.getAttribute("data-src");
                testImage.addEventListener("load", function() {
                  if (!it.getAttribute("style") && !it.getAttribute("class") && !it.getAttribute("width") && !it.getAttribute("height")) {
                    if (testImage.naturalHeight > testImage.naturalWidth && testImage.naturalWidth / testImage.naturalHeight < document.querySelector(".vditor-reset").clientWidth / (window.innerHeight - 40) && testImage.naturalHeight > window.innerHeight - 40) {
                      it.style.height = window.innerHeight - 40 + "px";
                    }
                  }
                  it.src = testImage.src;
                });
                it.removeAttribute("data-src");
              };
              if (!("IntersectionObserver" in window)) {
                element.querySelectorAll("img").forEach(function(imgElement) {
                  if (imgElement.getAttribute("data-src")) {
                    loadImg(imgElement);
                  }
                });
                return false;
              }
              if (window.vditorImageIntersectionObserver) {
                window.vditorImageIntersectionObserver.disconnect();
                element.querySelectorAll("img").forEach(function(imgElement) {
                  window.vditorImageIntersectionObserver.observe(imgElement);
                });
              } else {
                window.vditorImageIntersectionObserver = new IntersectionObserver(function(entries) {
                  entries.forEach(function(entrie) {
                    if ((typeof entrie.isIntersecting === "undefined" ? entrie.intersectionRatio !== 0 : entrie.isIntersecting) && entrie.target.getAttribute("data-src")) {
                      loadImg(entrie.target);
                    }
                  });
                });
                element.querySelectorAll("img").forEach(function(imgElement) {
                  window.vditorImageIntersectionObserver.observe(imgElement);
                });
              }
            };
            var mathRender = __webpack_require__2(323);
            var mediaRender = __webpack_require__2(207);
            var mermaidRender = __webpack_require__2(765);
            var mindmapRender = __webpack_require__2(894);
            var outlineRender = __webpack_require__2(198);
            var plantumlRender = __webpack_require__2(583);
            var constants = __webpack_require__2(260);
            var setContentTheme = __webpack_require__2(958);
            var addScript = __webpack_require__2(228);
            var hasClosest = __webpack_require__2(713);
            var merge = __webpack_require__2(224);
            ;
            var anchorRender = function(type) {
              document.querySelectorAll(".vditor-anchor").forEach(function(anchor) {
                if (type === 1) {
                  anchor.classList.add("vditor-anchor--left");
                }
                anchor.onclick = function() {
                  var id = anchor.getAttribute("href").substr(1);
                  var top = document.getElementById("vditorAnchor-" + id).offsetTop;
                  document.querySelector("html").scrollTop = top;
                };
              });
              window.onhashchange = function() {
                var element = document.getElementById("vditorAnchor-" + decodeURIComponent(window.location.hash.substr(1)));
                if (element) {
                  document.querySelector("html").scrollTop = element.offsetTop;
                }
              };
            };
            var setLute = __webpack_require__2(792);
            var selection = __webpack_require__2(187);
            ;
            var speechRender = function(element, lang) {
              if (lang === void 0) {
                lang = "zh_CN";
              }
              if (typeof speechSynthesis === "undefined" || typeof SpeechSynthesisUtterance === "undefined") {
                return;
              }
              var playSVG = '<svg><use xlink:href="#vditor-icon-play"></use></svg>';
              var pauseSVG = '<svg><use xlink:href="#vditor-icon-pause"></use></svg>';
              var speechDom = document.querySelector(".vditor-speech");
              if (!speechDom) {
                speechDom = document.createElement("div");
                speechDom.className = "vditor-speech";
                document.body.insertAdjacentElement("beforeend", speechDom);
                var getVoice = function() {
                  var voices = speechSynthesis.getVoices();
                  var currentVoice;
                  var defaultVoice;
                  voices.forEach(function(item) {
                    if (item.lang === lang.replace("_", "-")) {
                      currentVoice = item;
                    }
                    if (item.default) {
                      defaultVoice = item;
                    }
                  });
                  if (!currentVoice) {
                    currentVoice = defaultVoice;
                  }
                  return currentVoice;
                };
                if (speechSynthesis.onvoiceschanged !== void 0) {
                  speechSynthesis.onvoiceschanged = getVoice;
                }
                var voice_1 = getVoice();
                speechDom.onclick = function() {
                  if (speechDom.className === "vditor-speech") {
                    var utterThis = new SpeechSynthesisUtterance(speechDom.getAttribute("data-text"));
                    utterThis.voice = voice_1;
                    utterThis.onend = function() {
                      speechDom.className = "vditor-speech";
                      speechSynthesis.cancel();
                      speechDom.innerHTML = playSVG;
                    };
                    speechSynthesis.speak(utterThis);
                    speechDom.className = "vditor-speech vditor-speech--current";
                    speechDom.innerHTML = pauseSVG;
                  } else {
                    if (speechSynthesis.speaking) {
                      if (speechSynthesis.paused) {
                        speechSynthesis.resume();
                        speechDom.innerHTML = pauseSVG;
                      } else {
                        speechSynthesis.pause();
                        speechDom.innerHTML = playSVG;
                      }
                    }
                  }
                  (0, selection.Hc)(window.vditorSpeechRange);
                };
                document.body.addEventListener("click", function() {
                  if (getSelection().toString().trim() === "" && speechDom.style.display === "block") {
                    speechDom.className = "vditor-speech";
                    speechSynthesis.cancel();
                    speechDom.style.display = "none";
                  }
                });
              }
              element.addEventListener("mouseup", function(event) {
                var text = getSelection().toString().trim();
                speechSynthesis.cancel();
                if (getSelection().toString().trim() === "") {
                  if (speechDom.style.display === "block") {
                    speechDom.className = "vditor-speech";
                    speechDom.style.display = "none";
                  }
                  return;
                }
                window.vditorSpeechRange = getSelection().getRangeAt(0).cloneRange();
                var rect = getSelection().getRangeAt(0).getBoundingClientRect();
                speechDom.innerHTML = playSVG;
                speechDom.style.display = "block";
                speechDom.style.top = rect.top + rect.height + document.querySelector("html").scrollTop - 20 + "px";
                speechDom.style.left = event.screenX + 2 + "px";
                speechDom.setAttribute("data-text", text);
              });
            };
            ;
            var __awaiter = function(thisArg, _arguments, P, generator) {
              function adopt(value) {
                return value instanceof P ? value : new P(function(resolve) {
                  resolve(value);
                });
              }
              return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                  try {
                    step(generator.next(value));
                  } catch (e2) {
                    reject(e2);
                  }
                }
                function rejected(value) {
                  try {
                    step(generator["throw"](value));
                  } catch (e2) {
                    reject(e2);
                  }
                }
                function step(result2) {
                  result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
              });
            };
            var __generator = function(thisArg, body) {
              var _ = { label: 0, sent: function() {
                if (t2[0] & 1)
                  throw t2[1];
                return t2[1];
              }, trys: [], ops: [] }, f, y2, t2, g;
              return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                return this;
              }), g;
              function verb(n3) {
                return function(v) {
                  return step([n3, v]);
                };
              }
              function step(op) {
                if (f)
                  throw new TypeError("Generator is already executing.");
                while (_)
                  try {
                    if (f = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
                      return t2;
                    if (y2 = 0, t2)
                      op = [op[0] & 2, t2.value];
                    switch (op[0]) {
                      case 0:
                      case 1:
                        t2 = op;
                        break;
                      case 4:
                        _.label++;
                        return { value: op[1], done: false };
                      case 5:
                        _.label++;
                        y2 = op[1];
                        op = [0];
                        continue;
                      case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                      default:
                        if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                          _ = 0;
                          continue;
                        }
                        if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                          _.label = op[1];
                          break;
                        }
                        if (op[0] === 6 && _.label < t2[1]) {
                          _.label = t2[1];
                          t2 = op;
                          break;
                        }
                        if (t2 && _.label < t2[2]) {
                          _.label = t2[2];
                          _.ops.push(op);
                          break;
                        }
                        if (t2[2])
                          _.ops.pop();
                        _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                  } catch (e2) {
                    op = [6, e2];
                    y2 = 0;
                  } finally {
                    f = t2 = 0;
                  }
                if (op[0] & 5)
                  throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
              }
            };
            var mergeOptions = function(options) {
              var defaultOption = {
                anchor: 0,
                cdn: constants.g.CDN,
                customEmoji: {},
                emojiPath: (options && options.emojiPath || constants.g.CDN) + "/dist/images/emoji",
                hljs: constants.g.HLJS_OPTIONS,
                icon: "ant",
                lang: "zh_CN",
                markdown: constants.g.MARKDOWN_OPTIONS,
                math: constants.g.MATH_OPTIONS,
                mode: "light",
                speech: {
                  enable: false
                },
                theme: constants.g.THEME_OPTIONS
              };
              return (0, merge.T)(defaultOption, options);
            };
            var md2html = function(mdText, options) {
              var mergedOptions = mergeOptions(options);
              return (0, addScript.G)(mergedOptions.cdn + "/dist/js/lute/lute.min.js", "vditorLuteScript").then(function() {
                var lute = (0, setLute.X)({
                  autoSpace: mergedOptions.markdown.autoSpace,
                  codeBlockPreview: mergedOptions.markdown.codeBlockPreview,
                  emojiSite: mergedOptions.emojiPath,
                  emojis: mergedOptions.customEmoji,
                  fixTermTypo: mergedOptions.markdown.fixTermTypo,
                  footnotes: mergedOptions.markdown.footnotes,
                  headingAnchor: mergedOptions.anchor !== 0,
                  inlineMathDigit: mergedOptions.math.inlineDigit,
                  lazyLoadImage: mergedOptions.lazyLoadImage,
                  linkBase: mergedOptions.markdown.linkBase,
                  linkPrefix: mergedOptions.markdown.linkPrefix,
                  listStyle: mergedOptions.markdown.listStyle,
                  mark: mergedOptions.markdown.mark,
                  mathBlockPreview: mergedOptions.markdown.mathBlockPreview,
                  paragraphBeginningSpace: mergedOptions.markdown.paragraphBeginningSpace,
                  sanitize: mergedOptions.markdown.sanitize,
                  toc: mergedOptions.markdown.toc
                });
                if (options === null || options === void 0 ? void 0 : options.renderers) {
                  lute.SetJSRenderers({
                    renderers: {
                      Md2HTML: options.renderers
                    }
                  });
                }
                lute.SetHeadingID(true);
                return lute.Md2HTML(mdText);
              });
            };
            var previewRender = function(previewElement, markdown, options) {
              return __awaiter(void 0, void 0, void 0, function() {
                var mergedOptions, html;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      mergedOptions = mergeOptions(options);
                      return [4, md2html(markdown, mergedOptions)];
                    case 1:
                      html = _a.sent();
                      if (mergedOptions.transform) {
                        html = mergedOptions.transform(html);
                      }
                      previewElement.innerHTML = html;
                      previewElement.classList.add("vditor-reset");
                      if (!mergedOptions.i18n) {
                        if (!["en_US", "ja_JP", "ko_KR", "ru_RU", "zh_CN", "zh_TW"].includes(mergedOptions.lang)) {
                          throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
                        } else {
                          (0, addScript.J)(mergedOptions.cdn + "/dist/js/i18n/" + mergedOptions.lang + ".js", "vditorI18nScript");
                        }
                      } else {
                        window.VditorI18n = mergedOptions.i18n;
                      }
                      (0, setContentTheme.Z)(mergedOptions.theme.current, mergedOptions.theme.path);
                      if (mergedOptions.anchor === 1) {
                        previewElement.classList.add("vditor-reset--anchor");
                      }
                      (0, codeRender.O)(previewElement);
                      (0, highlightRender.s)(mergedOptions.hljs, previewElement, mergedOptions.cdn);
                      (0, mathRender.H)(previewElement, {
                        cdn: mergedOptions.cdn,
                        math: mergedOptions.math
                      });
                      (0, mermaidRender.i)(previewElement, mergedOptions.cdn, mergedOptions.mode);
                      (0, flowchartRender.P)(previewElement, mergedOptions.cdn);
                      (0, graphvizRender.v)(previewElement, mergedOptions.cdn);
                      (0, chartRender.p)(previewElement, mergedOptions.cdn, mergedOptions.mode);
                      (0, mindmapRender.P)(previewElement, mergedOptions.cdn, mergedOptions.mode);
                      (0, plantumlRender.B)(previewElement, mergedOptions.cdn);
                      (0, abcRender.Q)(previewElement, mergedOptions.cdn);
                      (0, mediaRender.Y)(previewElement);
                      if (mergedOptions.speech.enable) {
                        speechRender(previewElement);
                      }
                      if (mergedOptions.anchor !== 0) {
                        anchorRender(mergedOptions.anchor);
                      }
                      if (mergedOptions.after) {
                        mergedOptions.after();
                      }
                      if (mergedOptions.lazyLoadImage) {
                        lazyLoadImageRender(previewElement);
                      }
                      if (mergedOptions.icon) {
                        (0, addScript.G)(mergedOptions.cdn + "/dist/js/icons/" + mergedOptions.icon + ".js", "vditorIconScript");
                      }
                      previewElement.addEventListener("click", function(event) {
                        var spanElement = (0, hasClosest.lG)(event.target, "SPAN");
                        if (spanElement && (0, hasClosest.fb)(spanElement, "vditor-toc")) {
                          var headingElement = previewElement.querySelector("#" + spanElement.getAttribute("data-target-id"));
                          if (headingElement) {
                            window.scrollTo(window.scrollX, headingElement.offsetTop);
                          }
                          return;
                        }
                      });
                      return [2];
                  }
                });
              });
            };
            var preview_image = __webpack_require__2(264);
            var setCodeTheme = __webpack_require__2(968);
            ;
            var Vditor2 = function() {
              function Vditor3() {
              }
              Vditor3.adapterRender = adapterRender;
              Vditor3.previewImage = preview_image.E;
              Vditor3.codeRender = codeRender.O;
              Vditor3.graphvizRender = graphvizRender.v;
              Vditor3.highlightRender = highlightRender.s;
              Vditor3.mathRender = mathRender.H;
              Vditor3.mermaidRender = mermaidRender.i;
              Vditor3.flowchartRender = flowchartRender.P;
              Vditor3.chartRender = chartRender.p;
              Vditor3.abcRender = abcRender.Q;
              Vditor3.mindmapRender = mindmapRender.P;
              Vditor3.plantumlRender = plantumlRender.B;
              Vditor3.outlineRender = outlineRender.k;
              Vditor3.mediaRender = mediaRender.Y;
              Vditor3.speechRender = speechRender;
              Vditor3.lazyLoadImageRender = lazyLoadImageRender;
              Vditor3.md2html = md2html;
              Vditor3.preview = previewRender;
              Vditor3.setCodeTheme = setCodeTheme.Y;
              Vditor3.setContentTheme = setContentTheme.Z;
              return Vditor3;
            }();
            const method = Vditor2;
          },
          260: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "H": () => _VDITOR_VERSION,
              "g": () => Constants
            });
            var _VDITOR_VERSION = "3.8.7";
            var Constants = function() {
              function Constants2() {
              }
              Constants2.ZWSP = "\u200B";
              Constants2.DROP_EDITOR = "application/editor";
              Constants2.MOBILE_WIDTH = 520;
              Constants2.CLASS_MENU_DISABLED = "vditor-menu--disabled";
              Constants2.EDIT_TOOLBARS = [
                "emoji",
                "headings",
                "bold",
                "italic",
                "strike",
                "link",
                "list",
                "ordered-list",
                "outdent",
                "indent",
                "check",
                "line",
                "quote",
                "code",
                "inline-code",
                "insert-after",
                "insert-before",
                "upload",
                "record",
                "table"
              ];
              Constants2.CODE_THEME = [
                "abap",
                "algol",
                "algol_nu",
                "arduino",
                "autumn",
                "borland",
                "bw",
                "colorful",
                "dracula",
                "emacs",
                "friendly",
                "fruity",
                "github",
                "igor",
                "lovelace",
                "manni",
                "monokai",
                "monokailight",
                "murphy",
                "native",
                "paraiso-dark",
                "paraiso-light",
                "pastie",
                "perldoc",
                "pygments",
                "rainbow_dash",
                "rrt",
                "solarized-dark",
                "solarized-dark256",
                "solarized-light",
                "swapoff",
                "tango",
                "trac",
                "vim",
                "vs",
                "xcode",
                "ant-design"
              ];
              Constants2.CODE_LANGUAGES = [
                "mermaid",
                "echarts",
                "mindmap",
                "plantuml",
                "abc",
                "graphviz",
                "flowchart",
                "apache",
                "js",
                "ts",
                "html",
                "properties",
                "apache",
                "bash",
                "c",
                "csharp",
                "cpp",
                "css",
                "coffeescript",
                "diff",
                "go",
                "xml",
                "http",
                "json",
                "java",
                "javascript",
                "kotlin",
                "less",
                "lua",
                "makefile",
                "markdown",
                "nginx",
                "objectivec",
                "php",
                "php-template",
                "perl",
                "plaintext",
                "python",
                "python-repl",
                "r",
                "ruby",
                "rust",
                "scss",
                "sql",
                "shell",
                "swift",
                "ini",
                "typescript",
                "vbnet",
                "yaml",
                "ada",
                "clojure",
                "dart",
                "erb",
                "fortran",
                "gradle",
                "haskell",
                "julia",
                "julia-repl",
                "lisp",
                "matlab",
                "pgsql",
                "powershell",
                "sql_more",
                "stata",
                "cmake",
                "mathematica"
              ];
              Constants2.CDN = "https://cdn.jsdelivr.net/npm/vditor@3.8.7";
              Constants2.MARKDOWN_OPTIONS = {
                autoSpace: false,
                codeBlockPreview: true,
                fixTermTypo: false,
                footnotes: true,
                linkBase: "",
                linkPrefix: "",
                listStyle: false,
                mark: false,
                mathBlockPreview: true,
                paragraphBeginningSpace: false,
                sanitize: true,
                toc: false
              };
              Constants2.HLJS_OPTIONS = {
                enable: true,
                lineNumber: false,
                style: "github"
              };
              Constants2.MATH_OPTIONS = {
                engine: "KaTeX",
                inlineDigit: false,
                macros: {}
              };
              Constants2.THEME_OPTIONS = {
                current: "light",
                list: {
                  "ant-design": "Ant Design",
                  "dark": "Dark",
                  "light": "Light",
                  "wechat": "WeChat"
                },
                path: Constants2.CDN + "/dist/css/content-theme"
              };
              return Constants2;
            }();
          },
          369: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "Q": () => abcRender
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(228);
            var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(46);
            var abcRender = function(element, cdn) {
              if (element === void 0) {
                element = document;
              }
              if (cdn === void 0) {
                cdn = _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN;
              }
              var abcElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.abcRenderAdapter.getElements(element);
              if (abcElements.length > 0) {
                (0, _util_addScript__WEBPACK_IMPORTED_MODULE_2__.G)(cdn + "/dist/js/abcjs/abcjs_basic.min.js", "vditorAbcjsScript").then(function() {
                  abcElements.forEach(function(item) {
                    if (item.parentElement.classList.contains("vditor-wysiwyg__pre") || item.parentElement.classList.contains("vditor-ir__marker--pre")) {
                      return;
                    }
                    if (item.getAttribute("data-processed") === "true") {
                      return;
                    }
                    ABCJS.renderAbc(item, _adapterRender__WEBPACK_IMPORTED_MODULE_1__.abcRenderAdapter.getCode(item).trim());
                    item.style.overflowX = "auto";
                    item.setAttribute("data-processed", "true");
                  });
                });
              }
            };
          },
          46: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.r(__webpack_exports__2);
            __webpack_require__2.d(__webpack_exports__2, {
              "mathRenderAdapter": () => mathRenderAdapter,
              "mermaidRenderAdapter": () => mermaidRenderAdapter,
              "mindmapRenderAdapter": () => mindmapRenderAdapter,
              "chartRenderAdapter": () => chartRenderAdapter,
              "abcRenderAdapter": () => abcRenderAdapter,
              "graphvizRenderAdapter": () => graphvizRenderAdapter,
              "flowchartRenderAdapter": () => flowchartRenderAdapter,
              "plantumlRenderAdapter": () => plantumlRenderAdapter
            });
            var mathRenderAdapter = {
              getCode: function(mathElement) {
                return mathElement.textContent;
              },
              getElements: function(element) {
                return element.querySelectorAll(".language-math");
              }
            };
            var mermaidRenderAdapter = {
              getCode: function(el) {
                return el.textContent;
              },
              getElements: function(element) {
                return element.querySelectorAll(".language-mermaid");
              }
            };
            var mindmapRenderAdapter = {
              getCode: function(el) {
                return el.getAttribute("data-code");
              },
              getElements: function(el) {
                return el.querySelectorAll(".language-mindmap");
              }
            };
            var chartRenderAdapter = {
              getCode: function(el) {
                return el.innerText;
              },
              getElements: function(el) {
                return el.querySelectorAll(".language-echarts");
              }
            };
            var abcRenderAdapter = {
              getCode: function(el) {
                return el.textContent;
              },
              getElements: function(el) {
                return el.querySelectorAll(".language-abc");
              }
            };
            var graphvizRenderAdapter = {
              getCode: function(el) {
                return el.textContent;
              },
              getElements: function(el) {
                return el.querySelectorAll(".language-graphviz");
              }
            };
            var flowchartRenderAdapter = {
              getCode: function(el) {
                return el.textContent;
              },
              getElements: function(el) {
                return el.querySelectorAll(".language-flowchart");
              }
            };
            var plantumlRenderAdapter = {
              getCode: function(el) {
                return el.textContent;
              },
              getElements: function(el) {
                return el.querySelectorAll(".language-plantuml");
              }
            };
          },
          726: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "p": () => chartRender
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(228);
            var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(46);
            var chartRender = function(element, cdn, theme) {
              if (element === void 0) {
                element = document;
              }
              if (cdn === void 0) {
                cdn = _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN;
              }
              var echartsElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.chartRenderAdapter.getElements(element);
              if (echartsElements.length > 0) {
                (0, _util_addScript__WEBPACK_IMPORTED_MODULE_2__.G)(cdn + "/dist/js/echarts/echarts.min.js", "vditorEchartsScript").then(function() {
                  echartsElements.forEach(function(e2) {
                    if (e2.parentElement.classList.contains("vditor-wysiwyg__pre") || e2.parentElement.classList.contains("vditor-ir__marker--pre")) {
                      return;
                    }
                    var text = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.chartRenderAdapter.getCode(e2).trim();
                    if (!text) {
                      return;
                    }
                    try {
                      if (e2.getAttribute("data-processed") === "true") {
                        return;
                      }
                      var option = JSON.parse(text);
                      echarts.init(e2, theme === "dark" ? "dark" : void 0).setOption(option);
                      e2.setAttribute("data-processed", "true");
                    } catch (error) {
                      e2.className = "vditor-reset--error";
                      e2.innerHTML = "echarts render error: <br>" + error;
                    }
                  });
                });
              }
            };
          },
          23: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "O": () => codeRender
            });
            var _util_code160to32__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(769);
            var codeRender = function(element) {
              element.querySelectorAll("pre > code").forEach(function(e2, index) {
                if (e2.parentElement.classList.contains("vditor-wysiwyg__pre") || e2.parentElement.classList.contains("vditor-ir__marker--pre")) {
                  return;
                }
                if (e2.classList.contains("language-mermaid") || e2.classList.contains("language-flowchart") || e2.classList.contains("language-echarts") || e2.classList.contains("language-mindmap") || e2.classList.contains("language-plantuml") || e2.classList.contains("language-abc") || e2.classList.contains("language-graphviz") || e2.classList.contains("language-math")) {
                  return;
                }
                if (e2.style.maxHeight.indexOf("px") > -1) {
                  return;
                }
                if (element.classList.contains("vditor-preview") && index > 5) {
                  return;
                }
                var codeText = e2.innerText;
                if (e2.classList.contains("highlight-chroma")) {
                  var codeElement = document.createElement("code");
                  codeElement.innerHTML = e2.innerHTML;
                  codeElement.querySelectorAll(".highlight-ln").forEach(function(item) {
                    item.remove();
                  });
                  codeText = codeElement.innerText;
                }
                var divElement = document.createElement("div");
                divElement.className = "vditor-copy";
                divElement.innerHTML = '<span aria-label="' + window.VditorI18n.copy + `"
onmouseover="this.setAttribute('aria-label', '` + window.VditorI18n.copy + `')"
class="vditor-tooltipped vditor-tooltipped__w"
onclick="this.previousElementSibling.select();document.execCommand('copy');` + ("this.setAttribute('aria-label', '" + window.VditorI18n.copied + `')"><svg><use xlink:href="#vditor-icon-copy"></use></svg></span>`);
                var textarea = document.createElement("textarea");
                textarea.value = (0, _util_code160to32__WEBPACK_IMPORTED_MODULE_0__.X)(codeText);
                divElement.insertAdjacentElement("afterbegin", textarea);
                e2.before(divElement);
                e2.style.maxHeight = window.outerHeight - 40 + "px";
              });
            };
          },
          383: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "P": () => flowchartRender
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(228);
            var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(46);
            var flowchartRender = function(element, cdn) {
              if (cdn === void 0) {
                cdn = _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN;
              }
              var flowchartElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.flowchartRenderAdapter.getElements(element);
              if (flowchartElements.length === 0) {
                return;
              }
              (0, _util_addScript__WEBPACK_IMPORTED_MODULE_2__.G)(cdn + "/dist/js/flowchart.js/flowchart.min.js", "vditorFlowchartScript").then(function() {
                flowchartElements.forEach(function(item) {
                  if (item.getAttribute("data-processed") === "true") {
                    return;
                  }
                  var flowchartObj = flowchart.parse(_adapterRender__WEBPACK_IMPORTED_MODULE_1__.flowchartRenderAdapter.getCode(item));
                  item.innerHTML = "";
                  flowchartObj.drawSVG(item);
                  item.setAttribute("data-processed", "true");
                });
              });
            };
          },
          890: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "v": () => graphvizRender
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(228);
            var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(46);
            var graphvizRender = function(element, cdn) {
              if (cdn === void 0) {
                cdn = _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN;
              }
              var graphvizElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.graphvizRenderAdapter.getElements(element);
              if (graphvizElements.length === 0) {
                return;
              }
              (0, _util_addScript__WEBPACK_IMPORTED_MODULE_2__.G)(cdn + "/dist/js/graphviz/viz.js", "vditorGraphVizScript").then(function() {
                graphvizElements.forEach(function(e2) {
                  var code = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.graphvizRenderAdapter.getCode(e2);
                  if (e2.parentElement.classList.contains("vditor-wysiwyg__pre") || e2.parentElement.classList.contains("vditor-ir__marker--pre")) {
                    return;
                  }
                  if (e2.getAttribute("data-processed") === "true" || code.trim() === "") {
                    return;
                  }
                  try {
                    var blob = new Blob(["importScripts('" + document.getElementById("vditorGraphVizScript").src.replace("viz.js", "full.render.js") + "');"], { type: "application/javascript" });
                    var url = window.URL || window.webkitURL;
                    var blobUrl = url.createObjectURL(blob);
                    var worker = new Worker(blobUrl);
                    new Viz({ worker }).renderSVGElement(code).then(function(result2) {
                      e2.innerHTML = result2.outerHTML;
                    }).catch(function(error) {
                      e2.innerHTML = "graphviz render error: <br>" + error;
                      e2.className = "vditor-reset--error";
                    });
                  } catch (e3) {
                    console.error("graphviz error", e3);
                  }
                  e2.setAttribute("data-processed", "true");
                });
              });
            };
          },
          93: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "s": () => highlightRender
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(228);
            var _util_addStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(946);
            var highlightRender = function(hljsOption, element, cdn) {
              if (element === void 0) {
                element = document;
              }
              if (cdn === void 0) {
                cdn = _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN;
              }
              var style = hljsOption.style;
              if (!_constants__WEBPACK_IMPORTED_MODULE_0__.g.CODE_THEME.includes(style)) {
                style = "github";
              }
              var vditorHljsStyle = document.getElementById("vditorHljsStyle");
              var href = cdn + "/dist/js/highlight.js/styles/" + style + ".css";
              if (vditorHljsStyle && vditorHljsStyle.href !== href) {
                vditorHljsStyle.remove();
              }
              (0, _util_addStyle__WEBPACK_IMPORTED_MODULE_1__.c)(cdn + "/dist/js/highlight.js/styles/" + style + ".css", "vditorHljsStyle");
              if (hljsOption.enable === false) {
                return;
              }
              var codes = element.querySelectorAll("pre > code");
              if (codes.length === 0) {
                return;
              }
              (0, _util_addScript__WEBPACK_IMPORTED_MODULE_2__.G)(cdn + "/dist/js/highlight.js/highlight.pack.js", "vditorHljsScript").then(function() {
                element.querySelectorAll("pre > code").forEach(function(block) {
                  if (block.parentElement.classList.contains("vditor-ir__marker--pre") || block.parentElement.classList.contains("vditor-wysiwyg__pre")) {
                    return;
                  }
                  if (block.classList.contains("language-mermaid") || block.classList.contains("language-flowchart") || block.classList.contains("language-echarts") || block.classList.contains("language-mindmap") || block.classList.contains("language-plantuml") || block.classList.contains("language-abc") || block.classList.contains("language-graphviz") || block.classList.contains("language-math")) {
                    return;
                  }
                  hljs.highlightElement(block);
                  if (!hljsOption.lineNumber) {
                    return;
                  }
                  block.classList.add("vditor-linenumber");
                  var linenNumberTemp = block.querySelector(".vditor-linenumber__temp");
                  if (!linenNumberTemp) {
                    linenNumberTemp = document.createElement("div");
                    linenNumberTemp.className = "vditor-linenumber__temp";
                    block.insertAdjacentElement("beforeend", linenNumberTemp);
                  }
                  var whiteSpace = getComputedStyle(block).whiteSpace;
                  var isSoftWrap = false;
                  if (whiteSpace === "pre-wrap" || whiteSpace === "pre-line") {
                    isSoftWrap = true;
                  }
                  var lineNumberHTML = "";
                  var lineList = block.textContent.split(/\r\n|\r|\n/g);
                  lineList.pop();
                  lineList.map(function(line) {
                    var lineHeight = "";
                    if (isSoftWrap) {
                      linenNumberTemp.textContent = line || "\n";
                      lineHeight = ' style="height:' + linenNumberTemp.getBoundingClientRect().height + 'px"';
                    }
                    lineNumberHTML += "<span" + lineHeight + "></span>";
                  });
                  linenNumberTemp.style.display = "none";
                  lineNumberHTML = '<span class="vditor-linenumber__rows">' + lineNumberHTML + "</span>";
                  block.insertAdjacentHTML("beforeend", lineNumberHTML);
                });
              });
            };
          },
          323: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "H": () => mathRender
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addScript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__2(228);
            var _util_addStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(946);
            var _util_code160to32__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__2(769);
            var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(46);
            var mathRender = function(element, options) {
              var mathElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mathRenderAdapter.getElements(element);
              if (mathElements.length === 0) {
                return;
              }
              var defaultOptions = {
                cdn: _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN,
                math: {
                  engine: "KaTeX",
                  inlineDigit: false,
                  macros: {}
                }
              };
              if (options && options.math) {
                options.math = Object.assign({}, defaultOptions.math, options.math);
              }
              options = Object.assign({}, defaultOptions, options);
              if (options.math.engine === "KaTeX") {
                (0, _util_addStyle__WEBPACK_IMPORTED_MODULE_2__.c)(options.cdn + "/dist/js/katex/katex.min.css", "vditorKatexStyle");
                (0, _util_addScript__WEBPACK_IMPORTED_MODULE_3__.G)(options.cdn + "/dist/js/katex/katex.min.js", "vditorKatexScript").then(function() {
                  mathElements.forEach(function(mathElement) {
                    if (mathElement.parentElement.classList.contains("vditor-wysiwyg__pre") || mathElement.parentElement.classList.contains("vditor-ir__marker--pre")) {
                      return;
                    }
                    if (mathElement.getAttribute("data-math")) {
                      return;
                    }
                    var math = (0, _util_code160to32__WEBPACK_IMPORTED_MODULE_4__.X)(_adapterRender__WEBPACK_IMPORTED_MODULE_1__.mathRenderAdapter.getCode(mathElement));
                    mathElement.setAttribute("data-math", math);
                    try {
                      mathElement.innerHTML = katex.renderToString(math, {
                        displayMode: mathElement.tagName === "DIV",
                        output: "html"
                      });
                    } catch (e2) {
                      mathElement.innerHTML = e2.message;
                      mathElement.className = "language-math vditor-reset--error";
                    }
                    mathElement.addEventListener("copy", function(event) {
                      event.stopPropagation();
                      event.preventDefault();
                      var vditorMathElement = event.currentTarget.closest(".language-math");
                      event.clipboardData.setData("text/html", vditorMathElement.innerHTML);
                      event.clipboardData.setData("text/plain", vditorMathElement.getAttribute("data-math"));
                    });
                  });
                });
              } else if (options.math.engine === "MathJax") {
                var chainAsync_1 = function(fns) {
                  if (fns.length === 0) {
                    return;
                  }
                  var curr = 0;
                  var last = fns[fns.length - 1];
                  var next = function() {
                    var fn = fns[curr++];
                    fn === last ? fn() : fn(next);
                  };
                  next();
                };
                if (!window.MathJax) {
                  window.MathJax = {
                    loader: {
                      paths: { mathjax: options.cdn + "/dist/js/mathjax" }
                    },
                    startup: {
                      typeset: false
                    },
                    tex: {
                      macros: options.math.macros
                    }
                  };
                }
                (0, _util_addScript__WEBPACK_IMPORTED_MODULE_3__.J)(options.cdn + "/dist/js/mathjax/tex-svg-full.js", "protyleMathJaxScript");
                var renderMath_1 = function(mathElement, next) {
                  var math = (0, _util_code160to32__WEBPACK_IMPORTED_MODULE_4__.X)(mathElement.textContent).trim();
                  var mathOptions = window.MathJax.getMetricsFor(mathElement);
                  mathOptions.display = mathElement.tagName === "DIV";
                  window.MathJax.tex2svgPromise(math, mathOptions).then(function(node) {
                    mathElement.innerHTML = "";
                    mathElement.setAttribute("data-math", math);
                    mathElement.append(node);
                    window.MathJax.startup.document.clear();
                    window.MathJax.startup.document.updateDocument();
                    var errorTextElement = node.querySelector('[data-mml-node="merror"]');
                    if (errorTextElement && errorTextElement.textContent.trim() !== "") {
                      mathElement.innerHTML = errorTextElement.textContent.trim();
                      mathElement.className = "vditor-reset--error";
                    }
                    if (next) {
                      next();
                    }
                  });
                };
                window.MathJax.startup.promise.then(function() {
                  var chains = [];
                  var _loop_1 = function(i3) {
                    var mathElement = mathElements[i3];
                    if (!mathElement.parentElement.classList.contains("vditor-wysiwyg__pre") && !mathElement.parentElement.classList.contains("vditor-ir__marker--pre") && !mathElement.getAttribute("data-math") && (0, _util_code160to32__WEBPACK_IMPORTED_MODULE_4__.X)(mathElement.textContent).trim()) {
                      chains.push(function(next) {
                        if (i3 === mathElements.length - 1) {
                          renderMath_1(mathElement);
                        } else {
                          renderMath_1(mathElement, next);
                        }
                      });
                    }
                  };
                  for (var i2 = 0; i2 < mathElements.length; i2++) {
                    _loop_1(i2);
                  }
                  chainAsync_1(chains);
                });
              }
            };
          },
          207: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "Y": () => mediaRender
            });
            var videoRender = function(element, url) {
              element.insertAdjacentHTML("afterend", '<video controls="controls" src="' + url + '"></video>');
              element.remove();
            };
            var audioRender = function(element, url) {
              element.insertAdjacentHTML("afterend", '<audio controls="controls" src="' + url + '"></audio>');
              element.remove();
            };
            var iframeRender = function(element, url) {
              var youtubeMatch = url.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/);
              var youkuMatch = url.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/);
              var qqMatch = url.match(/\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/);
              var coubMatch = url.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/);
              var facebookMatch = url.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/);
              var dailymotionMatch = url.match(/.+dailymotion.com\/(video|hub)\/(\w+)\?/);
              var bilibiliMatch = url.match(/(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/);
              var tedMatch = url.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);
              if (youtubeMatch && youtubeMatch[1].length === 11) {
                element.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//www.youtube.com/embed/' + (youtubeMatch[1] + (youtubeMatch[2] ? "?start=" + youtubeMatch[2] : "")) + '"></iframe>');
                element.remove();
              } else if (youkuMatch && youkuMatch[1]) {
                element.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//player.youku.com/embed/' + youkuMatch[1] + '"></iframe>');
                element.remove();
              } else if (qqMatch && qqMatch[1]) {
                element.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="https://v.qq.com/txp/iframe/player.html?vid=' + qqMatch[1] + '"></iframe>');
                element.remove();
              } else if (coubMatch && coubMatch[1]) {
                element.insertAdjacentHTML("afterend", '<iframe class="iframe__video"\n src="//coub.com/embed/' + coubMatch[1] + '?muted=false&autostart=false&originalSize=true&startWithHD=true"></iframe>');
                element.remove();
              } else if (facebookMatch && facebookMatch[0]) {
                element.insertAdjacentHTML("afterend", '<iframe class="iframe__video"\n src="https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(facebookMatch[0]) + '"></iframe>');
                element.remove();
              } else if (dailymotionMatch && dailymotionMatch[2]) {
                element.insertAdjacentHTML("afterend", '<iframe class="iframe__video"\n src="https://www.dailymotion.com/embed/video/' + dailymotionMatch[2] + '"></iframe>');
                element.remove();
              } else if (bilibiliMatch && bilibiliMatch[1]) {
                element.insertAdjacentHTML("afterend", '<iframe class="iframe__video"\n src="//player.bilibili.com/player.html?bvid=' + bilibiliMatch[1] + '"></iframe>');
                element.remove();
              } else if (tedMatch && tedMatch[1]) {
                element.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//embed.ted.com/talks/' + tedMatch[1] + '"></iframe>');
                element.remove();
              }
            };
            var mediaRender = function(element) {
              if (!element) {
                return;
              }
              element.querySelectorAll("a").forEach(function(aElement) {
                var url = aElement.getAttribute("href");
                if (!url) {
                  return;
                }
                if (url.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/)) {
                  videoRender(aElement, url);
                } else if (url.match(/^.+.(mp3|wav|flac)$/)) {
                  audioRender(aElement, url);
                } else {
                  iframeRender(aElement, url);
                }
              });
            };
          },
          765: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "i": () => mermaidRender
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(228);
            var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(46);
            var mermaidRender = function(element, cdn, theme) {
              if (cdn === void 0) {
                cdn = _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN;
              }
              var mermaidElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mermaidRenderAdapter.getElements(element);
              if (mermaidElements.length === 0) {
                return;
              }
              (0, _util_addScript__WEBPACK_IMPORTED_MODULE_2__.G)(cdn + "/dist/js/mermaid/mermaid.min.js", "vditorMermaidScript").then(function() {
                var config = {
                  altFontFamily: "sans-serif",
                  flowchart: {
                    htmlLabels: true,
                    useMaxWidth: true
                  },
                  fontFamily: "sans-serif",
                  gantt: {
                    leftPadding: 75,
                    rightPadding: 20
                  },
                  securityLevel: "loose",
                  sequence: {
                    boxMargin: 8,
                    diagramMarginX: 8,
                    diagramMarginY: 8,
                    useMaxWidth: true
                  },
                  startOnLoad: false
                };
                if (theme === "dark") {
                  config.theme = "dark";
                  config.themeVariables = {
                    activationBkgColor: "hsl(180, 1.5873015873%, 28.3529411765%)",
                    activationBorderColor: "#81B1DB",
                    activeTaskBkgColor: "#81B1DB",
                    activeTaskBorderColor: "#ffffff",
                    actorBkg: "#1f2020",
                    actorBorder: "#81B1DB",
                    actorLineColor: "lightgrey",
                    actorTextColor: "lightgrey",
                    altBackground: "hsl(0, 0%, 40%)",
                    altSectionBkgColor: "#333",
                    arrowheadColor: "lightgrey",
                    background: "#333",
                    border1: "#81B1DB",
                    border2: "rgba(255, 255, 255, 0.25)",
                    classText: "#e0dfdf",
                    clusterBkg: "hsl(180, 1.5873015873%, 28.3529411765%)",
                    clusterBorder: "rgba(255, 255, 255, 0.25)",
                    critBkgColor: "#E83737",
                    critBorderColor: "#E83737",
                    darkTextColor: "hsl(28.5714285714, 17.3553719008%, 86.2745098039%)",
                    defaultLinkColor: "lightgrey",
                    doneTaskBkgColor: "lightgrey",
                    doneTaskBorderColor: "grey",
                    edgeLabelBackground: "hsl(0, 0%, 34.4117647059%)",
                    errorBkgColor: "#a44141",
                    errorTextColor: "#ddd",
                    fillType0: "#1f2020",
                    fillType1: "hsl(180, 1.5873015873%, 28.3529411765%)",
                    fillType2: "hsl(244, 1.5873015873%, 12.3529411765%)",
                    fillType3: "hsl(244, 1.5873015873%, 28.3529411765%)",
                    fillType4: "hsl(116, 1.5873015873%, 12.3529411765%)",
                    fillType5: "hsl(116, 1.5873015873%, 28.3529411765%)",
                    fillType6: "hsl(308, 1.5873015873%, 12.3529411765%)",
                    fillType7: "hsl(308, 1.5873015873%, 28.3529411765%)",
                    fontFamily: '"trebuchet ms", verdana, arial',
                    fontSize: "16px",
                    gridColor: "lightgrey",
                    labelBackground: "#181818",
                    labelBoxBkgColor: "#1f2020",
                    labelBoxBorderColor: "#81B1DB",
                    labelColor: "#ccc",
                    labelTextColor: "lightgrey",
                    lineColor: "lightgrey",
                    loopTextColor: "lightgrey",
                    mainBkg: "#1f2020",
                    mainContrastColor: "lightgrey",
                    nodeBkg: "#1f2020",
                    nodeBorder: "#81B1DB",
                    noteBkgColor: "#fff5ad",
                    noteBorderColor: "rgba(255, 255, 255, 0.25)",
                    noteTextColor: "#1f2020",
                    primaryBorderColor: "hsl(180, 0%, 2.3529411765%)",
                    primaryColor: "#1f2020",
                    primaryTextColor: "#e0dfdf",
                    secondBkg: "hsl(180, 1.5873015873%, 28.3529411765%)",
                    secondaryBorderColor: "hsl(180, 0%, 18.3529411765%)",
                    secondaryColor: "hsl(180, 1.5873015873%, 28.3529411765%)",
                    secondaryTextColor: "rgb(183.8476190475, 181.5523809523, 181.5523809523)",
                    sectionBkgColor: "hsl(52.9411764706, 28.813559322%, 58.431372549%)",
                    sectionBkgColor2: "#EAE8D9",
                    sequenceNumberColor: "black",
                    signalColor: "lightgrey",
                    signalTextColor: "lightgrey",
                    taskBkgColor: "hsl(180, 1.5873015873%, 35.3529411765%)",
                    taskBorderColor: "#ffffff",
                    taskTextClickableColor: "#003163",
                    taskTextColor: "hsl(28.5714285714, 17.3553719008%, 86.2745098039%)",
                    taskTextDarkColor: "hsl(28.5714285714, 17.3553719008%, 86.2745098039%)",
                    taskTextLightColor: "lightgrey",
                    taskTextOutsideColor: "lightgrey",
                    tertiaryBorderColor: "hsl(20, 0%, 2.3529411765%)",
                    tertiaryColor: "hsl(20, 1.5873015873%, 12.3529411765%)",
                    tertiaryTextColor: "rgb(222.9999999999, 223.6666666666, 223.9999999999)",
                    textColor: "#ccc",
                    titleColor: "#F9FFFE",
                    todayLineColor: "#DB5757"
                  };
                }
                mermaid.initialize(config);
                mermaidElements.forEach(function(item) {
                  var code = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mermaidRenderAdapter.getCode(item);
                  if (item.getAttribute("data-processed") === "true" || code.trim() === "") {
                    return;
                  }
                  mermaid.init(void 0, item);
                  item.setAttribute("data-processed", "true");
                });
              });
            };
          },
          894: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "P": () => mindmapRender
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(228);
            var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(46);
            var mindmapRender = function(element, cdn, theme) {
              if (element === void 0) {
                element = document;
              }
              if (cdn === void 0) {
                cdn = _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN;
              }
              var mindmapElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mindmapRenderAdapter.getElements(element);
              if (mindmapElements.length > 0) {
                (0, _util_addScript__WEBPACK_IMPORTED_MODULE_2__.G)(cdn + "/dist/js/echarts/echarts.min.js", "vditorEchartsScript").then(function() {
                  mindmapElements.forEach(function(e2) {
                    if (e2.parentElement.classList.contains("vditor-wysiwyg__pre") || e2.parentElement.classList.contains("vditor-ir__marker--pre")) {
                      return;
                    }
                    var text = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mindmapRenderAdapter.getCode(e2);
                    if (!text) {
                      return;
                    }
                    try {
                      if (e2.getAttribute("data-processed") === "true") {
                        return;
                      }
                      echarts.init(e2, theme === "dark" ? "dark" : void 0).setOption({
                        series: [
                          {
                            data: [JSON.parse(decodeURIComponent(text))],
                            initialTreeDepth: -1,
                            itemStyle: {
                              borderWidth: 0,
                              color: "#4285f4"
                            },
                            label: {
                              backgroundColor: "#f6f8fa",
                              borderColor: "#d1d5da",
                              borderRadius: 5,
                              borderWidth: 0.5,
                              color: "#586069",
                              lineHeight: 20,
                              offset: [-5, 0],
                              padding: [0, 5],
                              position: "insideRight"
                            },
                            lineStyle: {
                              color: "#d1d5da",
                              width: 1
                            },
                            roam: true,
                            symbol: function(value, params) {
                              var _a;
                              if ((_a = params === null || params === void 0 ? void 0 : params.data) === null || _a === void 0 ? void 0 : _a.children) {
                                return "circle";
                              } else {
                                return "path://";
                              }
                            },
                            type: "tree"
                          }
                        ],
                        tooltip: {
                          trigger: "item",
                          triggerOn: "mousemove"
                        }
                      });
                      e2.setAttribute("data-processed", "true");
                    } catch (error) {
                      e2.className = "vditor-reset--error";
                      e2.innerHTML = "mindmap render error: <br>" + error;
                    }
                  });
                });
              }
            };
          },
          198: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "k": () => outlineRender
            });
            var _util_hasClosestByHeadings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(615);
            var _mathRender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(323);
            var outlineRender = function(contentElement, targetElement, vditor) {
              var tocHTML = "";
              var ids = [];
              Array.from(contentElement.children).forEach(function(item, index) {
                if ((0, _util_hasClosestByHeadings__WEBPACK_IMPORTED_MODULE_1__.W)(item)) {
                  if (vditor) {
                    var lastIndex = item.id.lastIndexOf("_");
                    item.id = item.id.substring(0, lastIndex === -1 ? void 0 : lastIndex) + "_" + index;
                  }
                  ids.push(item.id);
                  tocHTML += item.outerHTML.replace("<wbr>", "");
                }
              });
              if (tocHTML === "") {
                targetElement.innerHTML = "";
                return "";
              }
              var tempElement = document.createElement("div");
              if (vditor) {
                vditor.lute.SetToC(true);
                if (vditor.currentMode === "wysiwyg" && !vditor.preview.element.contains(contentElement)) {
                  tempElement.innerHTML = vditor.lute.SpinVditorDOM("<p>[ToC]</p>" + tocHTML);
                } else if (vditor.currentMode === "ir" && !vditor.preview.element.contains(contentElement)) {
                  tempElement.innerHTML = vditor.lute.SpinVditorIRDOM("<p>[ToC]</p>" + tocHTML);
                } else {
                  tempElement.innerHTML = vditor.lute.HTML2VditorDOM("<p>[ToC]</p>" + tocHTML);
                }
                vditor.lute.SetToC(vditor.options.preview.markdown.toc);
              } else {
                targetElement.classList.add("vditor-outline");
                var lute = Lute.New();
                lute.SetToC(true);
                tempElement.innerHTML = lute.HTML2VditorDOM("<p>[ToC]</p>" + tocHTML);
              }
              var headingsElement = tempElement.firstElementChild.querySelectorAll("li > span[data-target-id]");
              headingsElement.forEach(function(item, index) {
                if (item.nextElementSibling && item.nextElementSibling.tagName === "UL") {
                  item.innerHTML = "<svg class='vditor-outline__action'><use xlink:href='#vditor-icon-down'></use></svg><span>" + item.innerHTML + "</span>";
                } else {
                  item.innerHTML = "<svg></svg><span>" + item.innerHTML + "</span>";
                }
                item.setAttribute("data-target-id", ids[index]);
              });
              tocHTML = tempElement.firstElementChild.innerHTML;
              if (headingsElement.length === 0) {
                targetElement.innerHTML = "";
                return tocHTML;
              }
              targetElement.innerHTML = tocHTML;
              if (vditor) {
                (0, _mathRender__WEBPACK_IMPORTED_MODULE_0__.H)(targetElement, {
                  cdn: vditor.options.cdn,
                  math: vditor.options.preview.math
                });
              }
              targetElement.firstElementChild.addEventListener("click", function(event) {
                var target = event.target;
                while (target && !target.isEqualNode(targetElement)) {
                  if (target.classList.contains("vditor-outline__action")) {
                    if (target.classList.contains("vditor-outline__action--close")) {
                      target.classList.remove("vditor-outline__action--close");
                      target.parentElement.nextElementSibling.setAttribute("style", "display:block");
                    } else {
                      target.classList.add("vditor-outline__action--close");
                      target.parentElement.nextElementSibling.setAttribute("style", "display:none");
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                  } else if (target.getAttribute("data-target-id")) {
                    event.preventDefault();
                    event.stopPropagation();
                    var idElement = document.getElementById(target.getAttribute("data-target-id"));
                    if (!idElement) {
                      return;
                    }
                    if (vditor) {
                      if (vditor.options.height === "auto") {
                        var windowScrollY = idElement.offsetTop + vditor.element.offsetTop;
                        if (!vditor.options.toolbarConfig.pin) {
                          windowScrollY += vditor.toolbar.element.offsetHeight;
                        }
                        window.scrollTo(window.scrollX, windowScrollY);
                      } else {
                        if (vditor.element.offsetTop < window.scrollY) {
                          window.scrollTo(window.scrollX, vditor.element.offsetTop);
                        }
                        if (vditor.preview.element.contains(contentElement)) {
                          contentElement.parentElement.scrollTop = idElement.offsetTop;
                        } else {
                          contentElement.scrollTop = idElement.offsetTop;
                        }
                      }
                    } else {
                      window.scrollTo(window.scrollX, idElement.offsetTop);
                    }
                    break;
                  }
                  target = target.parentElement;
                }
              });
              return tocHTML;
            };
          },
          583: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "B": () => plantumlRender
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(228);
            var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(46);
            var plantumlRender = function(element, cdn) {
              if (element === void 0) {
                element = document;
              }
              if (cdn === void 0) {
                cdn = _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN;
              }
              var plantumlElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.plantumlRenderAdapter.getElements(element);
              if (plantumlElements.length === 0) {
                return;
              }
              (0, _util_addScript__WEBPACK_IMPORTED_MODULE_2__.G)(cdn + "/dist/js/plantuml/plantuml-encoder.min.js", "vditorPlantumlScript").then(function() {
                plantumlElements.forEach(function(e2) {
                  if (e2.parentElement.classList.contains("vditor-wysiwyg__pre") || e2.parentElement.classList.contains("vditor-ir__marker--pre")) {
                    return;
                  }
                  var text = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.plantumlRenderAdapter.getCode(e2).trim();
                  if (!text) {
                    return;
                  }
                  try {
                    e2.innerHTML = '<img src="http://www.plantuml.com/plantuml/svg/~1' + plantumlEncoder.encode(text) + '">';
                  } catch (error) {
                    e2.className = "vditor-reset--error";
                    e2.innerHTML = "plantuml render error: <br>" + error;
                  }
                });
              });
            };
          },
          792: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "X": () => setLute
            });
            var setLute = function(options) {
              var lute = Lute.New();
              lute.PutEmojis(options.emojis);
              lute.SetEmojiSite(options.emojiSite);
              lute.SetHeadingAnchor(options.headingAnchor);
              lute.SetInlineMathAllowDigitAfterOpenMarker(options.inlineMathDigit);
              lute.SetAutoSpace(options.autoSpace);
              lute.SetToC(options.toc);
              lute.SetFootnotes(options.footnotes);
              lute.SetFixTermTypo(options.fixTermTypo);
              lute.SetVditorCodeBlockPreview(options.codeBlockPreview);
              lute.SetVditorMathBlockPreview(options.mathBlockPreview);
              lute.SetSanitize(options.sanitize);
              lute.SetChineseParagraphBeginningSpace(options.paragraphBeginningSpace);
              lute.SetRenderListStyle(options.listStyle);
              lute.SetLinkBase(options.linkBase);
              lute.SetLinkPrefix(options.linkPrefix);
              lute.SetMark(options.mark);
              if (options.lazyLoadImage) {
                lute.SetImageLazyLoading(options.lazyLoadImage);
              }
              return lute;
            };
          },
          264: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "E": () => previewImage
            });
            var previewImage = function(oldImgElement, lang, theme) {
              if (lang === void 0) {
                lang = "zh_CN";
              }
              if (theme === void 0) {
                theme = "classic";
              }
              var oldImgRect = oldImgElement.getBoundingClientRect();
              var height = 36;
              document.body.insertAdjacentHTML("beforeend", '<div class="vditor vditor-img' + (theme === "dark" ? " vditor--dark" : "") + '">\n    <div class="vditor-img__bar">\n      <span class="vditor-img__btn" data-deg="0">\n        <svg><use xlink:href="#vditor-icon-redo"></use></svg>\n        ' + window.VditorI18n.spin + `
      </span>
      <span class="vditor-img__btn"  onclick="this.parentElement.parentElement.outerHTML = '';document.body.style.overflow = ''">
        X &nbsp;` + window.VditorI18n.close + `
      </span>
    </div>
    <div class="vditor-img__img" onclick="this.parentElement.outerHTML = '';document.body.style.overflow = ''">
      <img style="width: ` + oldImgElement.width + "px;height:" + oldImgElement.height + "px;transform: translate3d(" + oldImgRect.left + "px, " + (oldImgRect.top - height) + 'px, 0)" src="' + oldImgElement.getAttribute("src") + '">\n    </div>\n</div>');
              document.body.style.overflow = "hidden";
              var imgElement = document.querySelector(".vditor-img img");
              var translate3d = "translate3d(" + Math.max(0, window.innerWidth - oldImgElement.naturalWidth) / 2 + "px, " + Math.max(0, window.innerHeight - height - oldImgElement.naturalHeight) / 2 + "px, 0)";
              setTimeout(function() {
                imgElement.setAttribute("style", "transition: transform .3s ease-in-out;transform: " + translate3d);
                setTimeout(function() {
                  imgElement.parentElement.scrollTo((imgElement.parentElement.scrollWidth - imgElement.parentElement.clientWidth) / 2, (imgElement.parentElement.scrollHeight - imgElement.parentElement.clientHeight) / 2);
                }, 400);
              });
              var btnElement = document.querySelector(".vditor-img__btn");
              btnElement.addEventListener("click", function() {
                var deg = parseInt(btnElement.getAttribute("data-deg"), 10) + 90;
                if (deg / 90 % 2 === 1 && oldImgElement.naturalWidth > imgElement.parentElement.clientHeight) {
                  imgElement.style.transform = "translate3d(" + Math.max(0, window.innerWidth - oldImgElement.naturalWidth) / 2 + "px, " + (oldImgElement.naturalWidth / 2 - oldImgElement.naturalHeight / 2) + "px, 0) rotateZ(" + deg + "deg)";
                } else {
                  imgElement.style.transform = translate3d + " rotateZ(" + deg + "deg)";
                }
                btnElement.setAttribute("data-deg", deg.toString());
                setTimeout(function() {
                  imgElement.parentElement.scrollTo((imgElement.parentElement.scrollWidth - imgElement.parentElement.clientWidth) / 2, (imgElement.parentElement.scrollHeight - imgElement.parentElement.clientHeight) / 2);
                }, 400);
              });
            };
          },
          968: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "Y": () => setCodeTheme
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _util_addStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(946);
            var setCodeTheme = function(codeTheme, cdn) {
              if (cdn === void 0) {
                cdn = _constants__WEBPACK_IMPORTED_MODULE_0__.g.CDN;
              }
              if (!_constants__WEBPACK_IMPORTED_MODULE_0__.g.CODE_THEME.includes(codeTheme)) {
                codeTheme = "github";
              }
              var vditorHljsStyle = document.getElementById("vditorHljsStyle");
              var href = cdn + "/dist/js/highlight.js/styles/" + codeTheme + ".css";
              if (!vditorHljsStyle) {
                (0, _util_addStyle__WEBPACK_IMPORTED_MODULE_1__.c)(href, "vditorHljsStyle");
              } else if (vditorHljsStyle.href !== href) {
                vditorHljsStyle.remove();
                (0, _util_addStyle__WEBPACK_IMPORTED_MODULE_1__.c)(href, "vditorHljsStyle");
              }
            };
          },
          958: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "Z": () => setContentTheme
            });
            var _util_addStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(946);
            var setContentTheme = function(contentTheme, path) {
              if (!contentTheme || !path) {
                return;
              }
              var vditorContentTheme = document.getElementById("vditorContentTheme");
              var cssPath = path + "/" + contentTheme + ".css";
              if (!vditorContentTheme) {
                (0, _util_addStyle__WEBPACK_IMPORTED_MODULE_0__.c)(cssPath, "vditorContentTheme");
              } else if (vditorContentTheme.href !== cssPath) {
                vditorContentTheme.remove();
                (0, _util_addStyle__WEBPACK_IMPORTED_MODULE_0__.c)(cssPath, "vditorContentTheme");
              }
            };
          },
          228: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "J": () => addScriptSync,
              "G": () => addScript
            });
            var addScriptSync = function(path, id) {
              if (document.getElementById(id)) {
                return false;
              }
              var xhrObj = new XMLHttpRequest();
              xhrObj.open("GET", path, false);
              xhrObj.setRequestHeader("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01");
              xhrObj.send("");
              var scriptElement = document.createElement("script");
              scriptElement.type = "text/javascript";
              scriptElement.text = xhrObj.responseText;
              scriptElement.id = id;
              document.head.appendChild(scriptElement);
            };
            var addScript = function(path, id) {
              return new Promise(function(resolve, reject) {
                if (document.getElementById(id)) {
                  resolve();
                  return false;
                }
                var scriptElement = document.createElement("script");
                scriptElement.src = path;
                scriptElement.async = true;
                document.head.appendChild(scriptElement);
                scriptElement.onload = function() {
                  if (document.getElementById(id)) {
                    scriptElement.remove();
                    resolve();
                    return false;
                  }
                  scriptElement.id = id;
                  resolve();
                };
              });
            };
          },
          946: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "c": () => addStyle
            });
            var addStyle = function(url, id) {
              if (!document.getElementById(id)) {
                var styleElement = document.createElement("link");
                styleElement.id = id;
                styleElement.rel = "stylesheet";
                styleElement.type = "text/css";
                styleElement.href = url;
                document.getElementsByTagName("head")[0].appendChild(styleElement);
              }
            };
          },
          769: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "X": () => code160to32
            });
            var code160to32 = function(text) {
              return text.replace(/\u00a0/g, " ");
            };
          },
          931: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "G6": () => isSafari,
              "vU": () => isFirefox,
              "pK": () => accessLocalStorage,
              "Le": () => getEventName,
              "yl": () => isCtrl,
              "ns": () => updateHotkeyTip,
              "i7": () => isChrome
            });
            var isSafari = function() {
              return navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1;
            };
            var isFirefox = function() {
              return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            };
            var accessLocalStorage = function() {
              try {
                return typeof localStorage !== "undefined";
              } catch (e2) {
                return false;
              }
            };
            var getEventName = function() {
              if (navigator.userAgent.indexOf("iPhone") > -1) {
                return "touchstart";
              } else {
                return "click";
              }
            };
            var isCtrl = function(event) {
              if (navigator.platform.toUpperCase().indexOf("MAC") >= 0) {
                if (event.metaKey && !event.ctrlKey) {
                  return true;
                }
                return false;
              } else {
                if (!event.metaKey && event.ctrlKey) {
                  return true;
                }
                return false;
              }
            };
            var updateHotkeyTip = function(hotkey) {
              if (/Mac/.test(navigator.platform) || navigator.platform === "iPhone") {
                if (hotkey.indexOf("\u21E7") > -1 && isFirefox()) {
                  hotkey = hotkey.replace(";", ":").replace("=", "+").replace("-", "_");
                }
              } else {
                if (hotkey.startsWith("\u2318")) {
                  hotkey = hotkey.replace("\u2318", "\u2318+");
                } else if (hotkey.startsWith("\u2325") && hotkey.substr(1, 1) !== "\u2318") {
                  hotkey = hotkey.replace("\u2325", "\u2325+");
                } else {
                  hotkey = hotkey.replace("\u21E7\u2318", "\u2318+\u21E7+").replace("\u2325\u2318", "\u2325+\u2318+");
                }
                hotkey = hotkey.replace("\u2318", "Ctrl").replace("\u21E7", "Shift").replace("\u2325", "Alt");
                if (hotkey.indexOf("Shift") > -1) {
                  hotkey = hotkey.replace(";", ":").replace("=", "+").replace("-", "_");
                }
              }
              return hotkey;
            };
            var isChrome = function() {
              return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            };
          },
          713: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "JQ": () => hasTopClosestByClassName,
              "E2": () => hasTopClosestByTag,
              "O9": () => getTopList,
              "a1": () => hasClosestByAttribute,
              "F9": () => hasClosestBlock,
              "lG": () => hasClosestByMatchTag,
              "fb": () => hasClosestByClassName,
              "DX": () => getLastNode
            });
            var _hasClosestByHeadings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(615);
            var hasTopClosestByClassName = function(element, className) {
              var closest = hasClosestByClassName(element, className);
              var parentClosest = false;
              var findTop = false;
              while (closest && !closest.classList.contains("vditor-reset") && !findTop) {
                parentClosest = hasClosestByClassName(closest.parentElement, className);
                if (parentClosest) {
                  closest = parentClosest;
                } else {
                  findTop = true;
                }
              }
              return closest || false;
            };
            var hasTopClosestByAttribute = function(element, attr, value) {
              var closest = hasClosestByAttribute(element, attr, value);
              var parentClosest = false;
              var findTop = false;
              while (closest && !closest.classList.contains("vditor-reset") && !findTop) {
                parentClosest = hasClosestByAttribute(closest.parentElement, attr, value);
                if (parentClosest) {
                  closest = parentClosest;
                } else {
                  findTop = true;
                }
              }
              return closest || false;
            };
            var hasTopClosestByTag = function(element, nodeName) {
              var closest = (0, _hasClosestByHeadings__WEBPACK_IMPORTED_MODULE_0__.S)(element, nodeName);
              var parentClosest = false;
              var findTop = false;
              while (closest && !closest.classList.contains("vditor-reset") && !findTop) {
                parentClosest = (0, _hasClosestByHeadings__WEBPACK_IMPORTED_MODULE_0__.S)(closest.parentElement, nodeName);
                if (parentClosest) {
                  closest = parentClosest;
                } else {
                  findTop = true;
                }
              }
              return closest || false;
            };
            var getTopList = function(element) {
              var topUlElement = hasTopClosestByTag(element, "UL");
              var topOlElement = hasTopClosestByTag(element, "OL");
              var topListElement = topUlElement;
              if (topOlElement && (!topUlElement || topUlElement && topOlElement.contains(topUlElement))) {
                topListElement = topOlElement;
              }
              return topListElement;
            };
            var hasClosestByAttribute = function(element, attr, value) {
              if (!element) {
                return false;
              }
              if (element.nodeType === 3) {
                element = element.parentElement;
              }
              var e2 = element;
              var isClosest = false;
              while (e2 && !isClosest && !e2.classList.contains("vditor-reset")) {
                if (e2.getAttribute(attr) === value) {
                  isClosest = true;
                } else {
                  e2 = e2.parentElement;
                }
              }
              return isClosest && e2;
            };
            var hasClosestBlock = function(element) {
              if (!element) {
                return false;
              }
              if (element.nodeType === 3) {
                element = element.parentElement;
              }
              var e2 = element;
              var isClosest = false;
              var blockElement = hasClosestByAttribute(element, "data-block", "0");
              if (blockElement) {
                return blockElement;
              }
              while (e2 && !isClosest && !e2.classList.contains("vditor-reset")) {
                if (e2.tagName === "H1" || e2.tagName === "H2" || e2.tagName === "H3" || e2.tagName === "H4" || e2.tagName === "H5" || e2.tagName === "H6" || e2.tagName === "P" || e2.tagName === "BLOCKQUOTE" || e2.tagName === "OL" || e2.tagName === "UL") {
                  isClosest = true;
                } else {
                  e2 = e2.parentElement;
                }
              }
              return isClosest && e2;
            };
            var hasClosestByMatchTag = function(element, nodeName) {
              if (!element) {
                return false;
              }
              if (element.nodeType === 3) {
                element = element.parentElement;
              }
              var e2 = element;
              var isClosest = false;
              while (e2 && !isClosest && !e2.classList.contains("vditor-reset")) {
                if (e2.nodeName === nodeName) {
                  isClosest = true;
                } else {
                  e2 = e2.parentElement;
                }
              }
              return isClosest && e2;
            };
            var hasClosestByClassName = function(element, className) {
              if (!element) {
                return false;
              }
              if (element.nodeType === 3) {
                element = element.parentElement;
              }
              var e2 = element;
              var isClosest = false;
              while (e2 && !isClosest && !e2.classList.contains("vditor-reset")) {
                if (e2.classList.contains(className)) {
                  isClosest = true;
                } else {
                  e2 = e2.parentElement;
                }
              }
              return isClosest && e2;
            };
            var getLastNode = function(node) {
              while (node && node.lastChild) {
                node = node.lastChild;
              }
              return node;
            };
          },
          615: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "S": () => hasClosestByTag,
              "W": () => hasClosestByHeadings
            });
            var hasClosestByTag = function(element, nodeName) {
              if (!element) {
                return false;
              }
              if (element.nodeType === 3) {
                element = element.parentElement;
              }
              var e2 = element;
              var isClosest = false;
              while (e2 && !isClosest && !e2.classList.contains("vditor-reset")) {
                if (e2.nodeName.indexOf(nodeName) === 0) {
                  isClosest = true;
                } else {
                  e2 = e2.parentElement;
                }
              }
              return isClosest && e2;
            };
            var hasClosestByHeadings = function(element) {
              var headingElement = hasClosestByTag(element, "H");
              if (headingElement && headingElement.tagName.length === 2 && headingElement.tagName !== "HR") {
                return headingElement;
              }
              return false;
            };
          },
          224: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "T": () => merge
            });
            var merge = function() {
              var options = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                options[_i] = arguments[_i];
              }
              var target = {};
              var merger = function(obj) {
                for (var prop in obj) {
                  if (obj.hasOwnProperty(prop)) {
                    if (Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                      target[prop] = merge(target[prop], obj[prop]);
                    } else {
                      target[prop] = obj[prop];
                    }
                  }
                }
              };
              for (var i2 = 0; i2 < options.length; i2++) {
                merger(options[i2]);
              }
              return target;
            };
          },
          187: (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
            "use strict";
            __webpack_require__2.d(__webpack_exports__2, {
              "zh": () => getEditorRange,
              "Ny": () => getCursorPosition,
              "Gb": () => selectIsEditor,
              "Hc": () => setSelectionFocus,
              "im": () => getSelectPosition,
              "$j": () => setSelectionByPosition,
              "ib": () => setRangeByWbr,
              "oC": () => insertHTML
            });
            var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(260);
            var _compatibility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(931);
            var _hasClosest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(713);
            var getEditorRange = function(vditor) {
              var range;
              var element = vditor[vditor.currentMode].element;
              if (getSelection().rangeCount > 0) {
                range = getSelection().getRangeAt(0);
                if (element.isEqualNode(range.startContainer) || element.contains(range.startContainer)) {
                  return range;
                }
              }
              if (vditor[vditor.currentMode].range) {
                return vditor[vditor.currentMode].range;
              }
              element.focus();
              range = element.ownerDocument.createRange();
              range.setStart(element, 0);
              range.collapse(true);
              return range;
            };
            var getCursorPosition = function(editor) {
              var range = window.getSelection().getRangeAt(0);
              if (!editor.contains(range.startContainer) && !(0, _hasClosest__WEBPACK_IMPORTED_MODULE_1__.fb)(range.startContainer, "vditor-panel--none")) {
                return {
                  left: 0,
                  top: 0
                };
              }
              var parentRect = editor.parentElement.getBoundingClientRect();
              var cursorRect;
              if (range.getClientRects().length === 0) {
                if (range.startContainer.nodeType === 3) {
                  var parent_1 = range.startContainer.parentElement;
                  if (parent_1 && parent_1.getClientRects().length > 0) {
                    cursorRect = parent_1.getClientRects()[0];
                  } else {
                    return {
                      left: 0,
                      top: 0
                    };
                  }
                } else {
                  var children = range.startContainer.children;
                  if (children[range.startOffset] && children[range.startOffset].getClientRects().length > 0) {
                    cursorRect = children[range.startOffset].getClientRects()[0];
                  } else if (range.startContainer.childNodes.length > 0) {
                    var cloneRange = range.cloneRange();
                    range.selectNode(range.startContainer.childNodes[Math.max(0, range.startOffset - 1)]);
                    cursorRect = range.getClientRects()[0];
                    range.setEnd(cloneRange.endContainer, cloneRange.endOffset);
                    range.setStart(cloneRange.startContainer, cloneRange.startOffset);
                  } else {
                    cursorRect = range.startContainer.getClientRects()[0];
                  }
                  if (!cursorRect) {
                    var parentElement = range.startContainer.childNodes[range.startOffset];
                    while (!parentElement.getClientRects || parentElement.getClientRects && parentElement.getClientRects().length === 0) {
                      parentElement = parentElement.parentElement;
                    }
                    cursorRect = parentElement.getClientRects()[0];
                  }
                }
              } else {
                cursorRect = range.getClientRects()[0];
              }
              return {
                left: cursorRect.left - parentRect.left,
                top: cursorRect.top - parentRect.top
              };
            };
            var selectIsEditor = function(editor, range) {
              if (!range) {
                if (getSelection().rangeCount === 0) {
                  return false;
                } else {
                  range = getSelection().getRangeAt(0);
                }
              }
              var container = range.commonAncestorContainer;
              return editor.isEqualNode(container) || editor.contains(container);
            };
            var setSelectionFocus = function(range) {
              var selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);
            };
            var getSelectPosition = function(selectElement, editorElement, range) {
              var position = {
                end: 0,
                start: 0
              };
              if (!range) {
                if (getSelection().rangeCount === 0) {
                  return position;
                }
                range = window.getSelection().getRangeAt(0);
              }
              if (selectIsEditor(editorElement, range)) {
                var preSelectionRange = range.cloneRange();
                if (selectElement.childNodes[0] && selectElement.childNodes[0].childNodes[0]) {
                  preSelectionRange.setStart(selectElement.childNodes[0].childNodes[0], 0);
                } else {
                  preSelectionRange.selectNodeContents(selectElement);
                }
                preSelectionRange.setEnd(range.startContainer, range.startOffset);
                position.start = preSelectionRange.toString().length;
                position.end = position.start + range.toString().length;
              }
              return position;
            };
            var setSelectionByPosition = function(start, end, editor) {
              var charIndex = 0;
              var line = 0;
              var pNode = editor.childNodes[line];
              var foundStart = false;
              var stop = false;
              start = Math.max(0, start);
              end = Math.max(0, end);
              var range = editor.ownerDocument.createRange();
              range.setStart(pNode || editor, 0);
              range.collapse(true);
              while (!stop && pNode) {
                var nextCharIndex = charIndex + pNode.textContent.length;
                if (!foundStart && start >= charIndex && start <= nextCharIndex) {
                  if (start === 0) {
                    range.setStart(pNode, 0);
                  } else {
                    if (pNode.childNodes[0].nodeType === 3) {
                      range.setStart(pNode.childNodes[0], start - charIndex);
                    } else if (pNode.nextSibling) {
                      range.setStartBefore(pNode.nextSibling);
                    } else {
                      range.setStartAfter(pNode);
                    }
                  }
                  foundStart = true;
                  if (start === end) {
                    stop = true;
                    break;
                  }
                }
                if (foundStart && end >= charIndex && end <= nextCharIndex) {
                  if (end === 0) {
                    range.setEnd(pNode, 0);
                  } else {
                    if (pNode.childNodes[0].nodeType === 3) {
                      range.setEnd(pNode.childNodes[0], end - charIndex);
                    } else if (pNode.nextSibling) {
                      range.setEndBefore(pNode.nextSibling);
                    } else {
                      range.setEndAfter(pNode);
                    }
                  }
                  stop = true;
                }
                charIndex = nextCharIndex;
                pNode = editor.childNodes[++line];
              }
              if (!stop && editor.childNodes[line - 1]) {
                range.setStartBefore(editor.childNodes[line - 1]);
              }
              setSelectionFocus(range);
              return range;
            };
            var setRangeByWbr = function(element, range) {
              var wbrElement = element.querySelector("wbr");
              if (!wbrElement) {
                return;
              }
              if (!wbrElement.previousElementSibling) {
                if (wbrElement.previousSibling) {
                  range.setStart(wbrElement.previousSibling, wbrElement.previousSibling.textContent.length);
                } else if (wbrElement.nextSibling) {
                  if (wbrElement.nextSibling.nodeType === 3) {
                    range.setStart(wbrElement.nextSibling, 0);
                  } else {
                    range.setStartBefore(wbrElement.nextSibling);
                  }
                } else {
                  range.setStart(wbrElement.parentElement, 0);
                }
              } else {
                if (wbrElement.previousElementSibling.isSameNode(wbrElement.previousSibling)) {
                  if (wbrElement.previousElementSibling.lastChild) {
                    range.setStartBefore(wbrElement);
                    range.collapse(true);
                    setSelectionFocus(range);
                    if ((0, _compatibility__WEBPACK_IMPORTED_MODULE_2__.i7)() && (wbrElement.previousElementSibling.tagName === "EM" || wbrElement.previousElementSibling.tagName === "STRONG" || wbrElement.previousElementSibling.tagName === "S")) {
                      range.insertNode(document.createTextNode(_constants__WEBPACK_IMPORTED_MODULE_0__.g.ZWSP));
                      range.collapse(false);
                    }
                    wbrElement.remove();
                    return;
                  } else {
                    range.setStartAfter(wbrElement.previousElementSibling);
                  }
                } else {
                  range.setStart(wbrElement.previousSibling, wbrElement.previousSibling.textContent.length);
                }
              }
              range.collapse(true);
              wbrElement.remove();
              setSelectionFocus(range);
            };
            var insertHTML = function(html, vditor) {
              var tempElement = document.createElement("div");
              tempElement.innerHTML = html;
              var tempBlockElement = tempElement.querySelectorAll("p");
              if (tempBlockElement.length === 1 && !tempBlockElement[0].previousSibling && !tempBlockElement[0].nextSibling && vditor[vditor.currentMode].element.children.length > 0 && tempElement.firstElementChild.tagName === "P") {
                html = tempBlockElement[0].innerHTML.trim();
              }
              var pasteElement = document.createElement("div");
              pasteElement.innerHTML = html;
              var range = getEditorRange(vditor);
              if (range.toString() !== "") {
                vditor[vditor.currentMode].preventInput = true;
                document.execCommand("delete", false, "");
              }
              if (pasteElement.firstElementChild && pasteElement.firstElementChild.getAttribute("data-block") === "0") {
                pasteElement.lastElementChild.insertAdjacentHTML("beforeend", "<wbr>");
                var blockElement = (0, _hasClosest__WEBPACK_IMPORTED_MODULE_1__.F9)(range.startContainer);
                if (!blockElement) {
                  vditor[vditor.currentMode].element.insertAdjacentHTML("beforeend", pasteElement.innerHTML);
                } else {
                  blockElement.insertAdjacentHTML("afterend", pasteElement.innerHTML);
                }
                setRangeByWbr(vditor[vditor.currentMode].element, range);
              } else {
                var pasteTemplate = document.createElement("template");
                pasteTemplate.innerHTML = html;
                range.insertNode(pasteTemplate.content.cloneNode(true));
                range.collapse(false);
                setSelectionFocus(range);
              }
            };
          }
        };
        var __webpack_module_cache__ = {};
        function __webpack_require__(moduleId) {
          var cachedModule = __webpack_module_cache__[moduleId];
          if (cachedModule !== void 0) {
            return cachedModule.exports;
          }
          var module2 = __webpack_module_cache__[moduleId] = {
            exports: {}
          };
          __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
          return module2.exports;
        }
        (() => {
          __webpack_require__.d = (exports2, definition) => {
            for (var key in definition) {
              if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
              }
            }
          };
        })();
        (() => {
          __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
        })();
        (() => {
          __webpack_require__.r = (exports2) => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
        })();
        var __webpack_exports__ = {};
        (() => {
          "use strict";
          __webpack_require__.d(__webpack_exports__, {
            "default": () => src
          });
          var scss = __webpack_require__(157);
          var method = __webpack_require__(857);
          var constants = __webpack_require__(260);
          var code160to32 = __webpack_require__(769);
          ;
          var getMarkdown = function(vditor) {
            if (vditor.currentMode === "sv") {
              return (0, code160to32.X)((vditor.sv.element.textContent + "\n").replace(/\n\n$/, "\n"));
            } else if (vditor.currentMode === "wysiwyg") {
              return vditor.lute.VditorDOM2Md(vditor.wysiwyg.element.innerHTML);
            } else if (vditor.currentMode === "ir") {
              return vditor.lute.VditorIRDOM2Md(vditor.ir.element.innerHTML);
            }
            return "";
          };
          var addScript = __webpack_require__(228);
          ;
          var DevTools = function() {
            function DevTools2() {
              this.element = document.createElement("div");
              this.element.className = "vditor-devtools";
              this.element.innerHTML = '<div class="vditor-reset--error"></div><div style="height: 100%;"></div>';
            }
            DevTools2.prototype.renderEchart = function(vditor) {
              var _this = this;
              if (vditor.devtools.element.style.display !== "block") {
                return;
              }
              (0, addScript.G)(vditor.options.cdn + "/dist/js/echarts/echarts.min.js", "vditorEchartsScript").then(function() {
                if (!_this.ASTChart) {
                  _this.ASTChart = echarts.init(vditor.devtools.element.lastElementChild);
                }
                try {
                  _this.element.lastElementChild.style.display = "block";
                  _this.element.firstElementChild.innerHTML = "";
                  _this.ASTChart.setOption({
                    series: [
                      {
                        data: JSON.parse(vditor.lute.RenderEChartsJSON(getMarkdown(vditor))),
                        initialTreeDepth: -1,
                        label: {
                          align: "left",
                          backgroundColor: "rgba(68, 77, 86, .68)",
                          borderRadius: 3,
                          color: "#d1d5da",
                          fontSize: 12,
                          lineHeight: 12,
                          offset: [9, 12],
                          padding: [2, 4, 2, 4],
                          position: "top",
                          verticalAlign: "middle"
                        },
                        lineStyle: {
                          color: "#4285f4",
                          type: "curve",
                          width: 1
                        },
                        orient: "vertical",
                        roam: true,
                        type: "tree"
                      }
                    ],
                    toolbox: {
                      bottom: 25,
                      emphasis: {
                        iconStyle: {
                          color: "#4285f4"
                        }
                      },
                      feature: {
                        restore: {
                          show: true
                        },
                        saveAsImage: {
                          show: true
                        }
                      },
                      right: 15,
                      show: true
                    }
                  });
                  _this.ASTChart.resize();
                } catch (e2) {
                  _this.element.lastElementChild.style.display = "none";
                  _this.element.firstElementChild.innerHTML = e2;
                }
              });
            };
            return DevTools2;
          }();
          var compatibility = __webpack_require__(931);
          ;
          var removeCurrentToolbar = function(toolbar, names) {
            names.forEach(function(name) {
              if (!toolbar[name]) {
                return;
              }
              var itemElement = toolbar[name].children[0];
              if (itemElement && itemElement.classList.contains("vditor-menu--current")) {
                itemElement.classList.remove("vditor-menu--current");
              }
            });
          };
          var setCurrentToolbar = function(toolbar, names) {
            names.forEach(function(name) {
              if (!toolbar[name]) {
                return;
              }
              var itemElement = toolbar[name].children[0];
              if (itemElement && !itemElement.classList.contains("vditor-menu--current")) {
                itemElement.classList.add("vditor-menu--current");
              }
            });
          };
          var enableToolbar = function(toolbar, names) {
            names.forEach(function(name) {
              if (!toolbar[name]) {
                return;
              }
              var itemElement = toolbar[name].children[0];
              if (itemElement && itemElement.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                itemElement.classList.remove(constants.g.CLASS_MENU_DISABLED);
              }
            });
          };
          var disableToolbar = function(toolbar, names) {
            names.forEach(function(name) {
              if (!toolbar[name]) {
                return;
              }
              var itemElement = toolbar[name].children[0];
              if (itemElement && !itemElement.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                itemElement.classList.add(constants.g.CLASS_MENU_DISABLED);
              }
            });
          };
          var hideToolbar = function(toolbar, names) {
            names.forEach(function(name) {
              if (!toolbar[name]) {
                return;
              }
              if (toolbar[name]) {
                toolbar[name].style.display = "none";
              }
            });
          };
          var showToolbar = function(toolbar, names) {
            names.forEach(function(name) {
              if (!toolbar[name]) {
                return;
              }
              if (toolbar[name]) {
                toolbar[name].style.display = "block";
              }
            });
          };
          var hidePanel = function(vditor, panels, exceptElement) {
            if (panels.includes("subToolbar")) {
              vditor.toolbar.element.querySelectorAll(".vditor-hint").forEach(function(item) {
                if (exceptElement && item.isEqualNode(exceptElement)) {
                  return;
                }
                item.style.display = "none";
              });
              if (vditor.toolbar.elements.emoji) {
                vditor.toolbar.elements.emoji.lastElementChild.style.display = "none";
              }
            }
            if (panels.includes("hint")) {
              vditor.hint.element.style.display = "none";
            }
            if (vditor.wysiwyg.popover && panels.includes("popover")) {
              vditor.wysiwyg.popover.style.display = "none";
            }
          };
          var toggleSubMenu = function(vditor, panelElement, actionBtn, level) {
            actionBtn.addEventListener((0, compatibility.Le)(), function(event) {
              event.preventDefault();
              event.stopPropagation();
              if (actionBtn.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                return;
              }
              vditor.toolbar.element.querySelectorAll(".vditor-hint--current").forEach(function(item) {
                item.classList.remove("vditor-hint--current");
              });
              if (panelElement.style.display === "block") {
                panelElement.style.display = "none";
              } else {
                hidePanel(vditor, ["subToolbar", "hint", "popover"], actionBtn.parentElement.parentElement);
                if (!actionBtn.classList.contains("vditor-tooltipped")) {
                  actionBtn.classList.add("vditor-hint--current");
                }
                panelElement.style.display = "block";
                if (vditor.toolbar.element.getBoundingClientRect().right - actionBtn.getBoundingClientRect().right < 250) {
                  panelElement.classList.add("vditor-panel--left");
                } else {
                  panelElement.classList.remove("vditor-panel--left");
                }
              }
            });
          };
          var hasClosest = __webpack_require__(713);
          var hasClosestByHeadings = __webpack_require__(615);
          ;
          var log = function(method2, content, type, print) {
            if (print) {
              console.log(method2 + " - " + type + ": " + content);
            }
          };
          var abcRender = __webpack_require__(369);
          var chartRender = __webpack_require__(726);
          var codeRender = __webpack_require__(23);
          var flowchartRender = __webpack_require__(383);
          var graphvizRender = __webpack_require__(890);
          var highlightRender = __webpack_require__(93);
          var mathRender = __webpack_require__(323);
          var mermaidRender = __webpack_require__(765);
          var mindmapRender = __webpack_require__(894);
          var plantumlRender = __webpack_require__(583);
          ;
          var processPasteCode = function(html, text, type) {
            if (type === void 0) {
              type = "sv";
            }
            var tempElement = document.createElement("div");
            tempElement.innerHTML = html;
            var isCode = false;
            if (tempElement.childElementCount === 1 && tempElement.lastElementChild.style.fontFamily.indexOf("monospace") > -1) {
              isCode = true;
            }
            var pres = tempElement.querySelectorAll("pre");
            if (tempElement.childElementCount === 1 && pres.length === 1 && pres[0].className !== "vditor-wysiwyg" && pres[0].className !== "vditor-sv") {
              isCode = true;
            }
            if (html.indexOf('\n<p class="p1">') === 0) {
              isCode = true;
            }
            if (tempElement.childElementCount === 1 && tempElement.firstElementChild.tagName === "TABLE" && tempElement.querySelector(".line-number") && tempElement.querySelector(".line-content")) {
              isCode = true;
            }
            if (isCode) {
              var code = text || html;
              if (/\n/.test(code) || pres.length === 1) {
                if (type === "wysiwyg") {
                  return '<div class="vditor-wysiwyg__block" data-block="0" data-type="code-block"><pre><code>' + code.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "<wbr></code></pre></div>";
                }
                return "\n```\n" + code.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "\n```";
              } else {
                if (type === "wysiwyg") {
                  return "<code>" + code.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</code><wbr>";
                }
                return "`" + code + "`";
              }
            }
            return false;
          };
          var processCodeRender = function(previewPanel, vditor) {
            if (!previewPanel) {
              return;
            }
            if (previewPanel.parentElement.getAttribute("data-type") === "html-block") {
              previewPanel.setAttribute("data-render", "1");
              return;
            }
            var language = previewPanel.firstElementChild.className.replace("language-", "");
            if (!language) {
              return;
            }
            if (language === "abc") {
              (0, abcRender.Q)(previewPanel, vditor.options.cdn);
            } else if (language === "mermaid") {
              (0, mermaidRender.i)(previewPanel, vditor.options.cdn, vditor.options.theme);
            } else if (language === "flowchart") {
              (0, flowchartRender.P)(previewPanel, vditor.options.cdn);
            } else if (language === "echarts") {
              (0, chartRender.p)(previewPanel, vditor.options.cdn, vditor.options.theme);
            } else if (language === "mindmap") {
              (0, mindmapRender.P)(previewPanel, vditor.options.cdn, vditor.options.theme);
            } else if (language === "plantuml") {
              (0, plantumlRender.B)(previewPanel, vditor.options.cdn);
            } else if (language === "graphviz") {
              (0, graphvizRender.v)(previewPanel, vditor.options.cdn);
            } else if (language === "math") {
              (0, mathRender.H)(previewPanel, { cdn: vditor.options.cdn, math: vditor.options.preview.math });
            } else {
              (0, highlightRender.s)(Object.assign({}, vditor.options.preview.hljs), previewPanel, vditor.options.cdn);
              (0, codeRender.O)(previewPanel);
            }
            previewPanel.setAttribute("data-render", "1");
          };
          var selection = __webpack_require__(187);
          ;
          var renderToc = function(vditor) {
            if (vditor.currentMode === "sv") {
              return;
            }
            var editorElement = vditor[vditor.currentMode].element;
            var tocHTML = vditor.outline.render(vditor);
            if (tocHTML === "") {
              tocHTML = "[ToC]";
            }
            editorElement.querySelectorAll('[data-type="toc-block"]').forEach(function(item) {
              item.innerHTML = tocHTML;
              (0, mathRender.H)(item, {
                cdn: vditor.options.cdn,
                math: vditor.options.preview.math
              });
            });
          };
          var clickToc = function(event, vditor) {
            var spanElement = (0, hasClosest.lG)(event.target, "SPAN");
            if (spanElement && (0, hasClosest.fb)(spanElement, "vditor-toc")) {
              var headingElement = vditor[vditor.currentMode].element.querySelector("#" + spanElement.getAttribute("data-target-id"));
              if (headingElement) {
                if (vditor.options.height === "auto") {
                  var windowScrollY = headingElement.offsetTop + vditor.element.offsetTop;
                  if (!vditor.options.toolbarConfig.pin) {
                    windowScrollY += vditor.toolbar.element.offsetHeight;
                  }
                  window.scrollTo(window.scrollX, windowScrollY);
                } else {
                  if (vditor.element.offsetTop < window.scrollY) {
                    window.scrollTo(window.scrollX, vditor.element.offsetTop);
                  }
                  vditor[vditor.currentMode].element.scrollTop = headingElement.offsetTop;
                }
              }
              return;
            }
          };
          var keydownToc = function(blockElement, vditor, event, range) {
            if (blockElement.previousElementSibling && blockElement.previousElementSibling.classList.contains("vditor-toc")) {
              if (event.key === "Backspace" && (0, selection.im)(blockElement, vditor[vditor.currentMode].element, range).start === 0) {
                blockElement.previousElementSibling.remove();
                execAfterRender(vditor);
                return true;
              }
              if (insertBeforeBlock(vditor, event, range, blockElement, blockElement.previousElementSibling)) {
                return true;
              }
            }
            if (blockElement.nextElementSibling && blockElement.nextElementSibling.classList.contains("vditor-toc")) {
              if (event.key === "Delete" && (0, selection.im)(blockElement, vditor[vditor.currentMode].element, range).start >= blockElement.textContent.trimRight().length) {
                blockElement.nextElementSibling.remove();
                execAfterRender(vditor);
                return true;
              }
              if (insertAfterBlock(vditor, event, range, blockElement, blockElement.nextElementSibling)) {
                return true;
              }
            }
            if (event.key === "Backspace" || event.key === "Delete") {
              var tocElement = (0, hasClosest.fb)(range.startContainer, "vditor-toc");
              if (tocElement) {
                tocElement.remove();
                execAfterRender(vditor);
                return true;
              }
            }
          };
          ;
          var input = function(vditor, range, ignoreSpace, event) {
            if (ignoreSpace === void 0) {
              ignoreSpace = false;
            }
            var blockElement = (0, hasClosest.F9)(range.startContainer);
            if (blockElement && !ignoreSpace && blockElement.getAttribute("data-type") !== "code-block") {
              if (isHrMD(blockElement.innerHTML) && blockElement.previousElementSibling || isHeadingMD(blockElement.innerHTML)) {
                return;
              }
              var startOffset = (0, selection.im)(blockElement, vditor.ir.element, range).start;
              var startSpace = true;
              for (var i2 = startOffset - 1; i2 > blockElement.textContent.substr(0, startOffset).lastIndexOf("\n"); i2--) {
                if (blockElement.textContent.charAt(i2) !== " " && blockElement.textContent.charAt(i2) !== "	") {
                  startSpace = false;
                  break;
                }
              }
              if (startOffset === 0) {
                startSpace = false;
              }
              var endSpace = true;
              for (var i2 = startOffset - 1; i2 < blockElement.textContent.length; i2++) {
                if (blockElement.textContent.charAt(i2) !== " " && blockElement.textContent.charAt(i2) !== "\n") {
                  endSpace = false;
                  break;
                }
              }
              if (startSpace) {
                return;
              }
              if (endSpace) {
                var markerElement = (0, hasClosest.fb)(range.startContainer, "vditor-ir__marker");
                if (markerElement) {
                } else {
                  var previousNode = range.startContainer.previousSibling;
                  if (previousNode && previousNode.nodeType !== 3 && previousNode.classList.contains("vditor-ir__node--expand")) {
                    previousNode.classList.remove("vditor-ir__node--expand");
                  }
                  return;
                }
              }
            }
            vditor.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(item) {
              item.classList.remove("vditor-ir__node--expand");
            });
            if (!blockElement) {
              blockElement = vditor.ir.element;
            }
            if (!blockElement.querySelector("wbr")) {
              var previewRenderElement = (0, hasClosest.fb)(range.startContainer, "vditor-ir__preview");
              if (previewRenderElement) {
                previewRenderElement.previousElementSibling.insertAdjacentHTML("beforeend", "<wbr>");
              } else {
                range.insertNode(document.createElement("wbr"));
              }
            }
            blockElement.querySelectorAll("[style]").forEach(function(item) {
              item.removeAttribute("style");
            });
            if (blockElement.getAttribute("data-type") === "link-ref-defs-block") {
              blockElement = vditor.ir.element;
            }
            var isIRElement = blockElement.isEqualNode(vditor.ir.element);
            var footnoteElement = (0, hasClosest.a1)(blockElement, "data-type", "footnotes-block");
            var html = "";
            if (!isIRElement) {
              var blockquoteElement = (0, hasClosestByHeadings.S)(range.startContainer, "BLOCKQUOTE");
              var topListElement = (0, hasClosest.O9)(range.startContainer);
              if (topListElement) {
                blockElement = topListElement;
              }
              if (blockquoteElement && (!topListElement || topListElement && !blockquoteElement.contains(topListElement))) {
                blockElement = blockquoteElement;
              }
              if (footnoteElement) {
                blockElement = footnoteElement;
              }
              html = blockElement.outerHTML;
              if (blockElement.tagName === "UL" || blockElement.tagName === "OL") {
                var listPrevElement = blockElement.previousElementSibling;
                var listNextElement = blockElement.nextElementSibling;
                if (listPrevElement && (listPrevElement.tagName === "UL" || listPrevElement.tagName === "OL")) {
                  html = listPrevElement.outerHTML + html;
                  listPrevElement.remove();
                }
                if (listNextElement && (listNextElement.tagName === "UL" || listNextElement.tagName === "OL")) {
                  html = html + listNextElement.outerHTML;
                  listNextElement.remove();
                }
                html = html.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
              } else if (blockElement.previousElementSibling && blockElement.previousElementSibling.textContent.replace(constants.g.ZWSP, "") !== "" && event && event.inputType === "insertParagraph") {
                html = blockElement.previousElementSibling.outerHTML + html;
                blockElement.previousElementSibling.remove();
              }
              vditor.ir.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(item) {
                if (item && !blockElement.isEqualNode(item)) {
                  html += item.outerHTML;
                  item.remove();
                }
              });
              vditor.ir.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(item) {
                if (item && !blockElement.isEqualNode(item)) {
                  html += item.outerHTML;
                  item.remove();
                }
              });
            } else {
              html = blockElement.innerHTML;
            }
            log("SpinVditorIRDOM", html, "argument", vditor.options.debugger);
            html = vditor.lute.SpinVditorIRDOM(html);
            log("SpinVditorIRDOM", html, "result", vditor.options.debugger);
            if (isIRElement) {
              blockElement.innerHTML = html;
            } else {
              blockElement.outerHTML = html;
              if (footnoteElement) {
                var footnoteItemElement = (0, hasClosest.a1)(vditor.ir.element.querySelector("wbr"), "data-type", "footnotes-def");
                if (footnoteItemElement) {
                  var footnoteItemText = footnoteItemElement.textContent;
                  var marker = footnoteItemText.substring(1, footnoteItemText.indexOf("]:"));
                  var footnoteRefElement = vditor.ir.element.querySelector('sup[data-type="footnotes-ref"][data-footnotes-label="' + marker + '"]');
                  if (footnoteRefElement) {
                    footnoteRefElement.setAttribute("aria-label", footnoteItemText.substr(marker.length + 3).trim().substr(0, 24));
                  }
                }
              }
            }
            var firstLinkRefDefElement;
            var allLinkRefDefsElement = vditor.ir.element.querySelectorAll("[data-type='link-ref-defs-block']");
            allLinkRefDefsElement.forEach(function(item, index) {
              if (index === 0) {
                firstLinkRefDefElement = item;
              } else {
                firstLinkRefDefElement.insertAdjacentHTML("beforeend", item.innerHTML);
                item.remove();
              }
            });
            if (allLinkRefDefsElement.length > 0) {
              vditor.ir.element.insertAdjacentElement("beforeend", allLinkRefDefsElement[0]);
            }
            var firstFootnoteElement;
            var allFootnoteElement = vditor.ir.element.querySelectorAll("[data-type='footnotes-block']");
            allFootnoteElement.forEach(function(item, index) {
              if (index === 0) {
                firstFootnoteElement = item;
              } else {
                firstFootnoteElement.insertAdjacentHTML("beforeend", item.innerHTML);
                item.remove();
              }
            });
            if (allFootnoteElement.length > 0) {
              vditor.ir.element.insertAdjacentElement("beforeend", allFootnoteElement[0]);
            }
            (0, selection.ib)(vditor.ir.element, range);
            vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(item) {
              processCodeRender(item, vditor);
            });
            renderToc(vditor);
            process_processAfterRender(vditor, {
              enableAddUndoStack: true,
              enableHint: true,
              enableInput: true
            });
          };
          ;
          var matchHotKey = function(hotKey, event) {
            if (hotKey === "") {
              return false;
            }
            if (hotKey.indexOf("\u21E7") === -1 && hotKey.indexOf("\u2318") === -1 && hotKey.indexOf("\u2325") === -1) {
              if (!(0, compatibility.yl)(event) && !event.altKey && !event.shiftKey && event.code === hotKey) {
                return true;
              }
              return false;
            }
            if (hotKey === "\u21E7Tab") {
              if (!(0, compatibility.yl)(event) && !event.altKey && event.shiftKey && event.code === "Tab") {
                return true;
              }
              return false;
            }
            var hotKeys = hotKey.split("");
            if (hotKey.startsWith("\u2325")) {
              var keyCode = hotKeys.length === 3 ? hotKeys[2] : hotKeys[1];
              if ((hotKeys.length === 3 ? (0, compatibility.yl)(event) : !(0, compatibility.yl)(event)) && event.altKey && !event.shiftKey && event.code === (/^[0-9]$/.test(keyCode) ? "Digit" : "Key") + keyCode) {
                return true;
              }
              return false;
            }
            if (hotKey === "\u2318Enter") {
              hotKeys = ["\u2318", "Enter"];
            }
            var hasShift = hotKeys.length > 2 && hotKeys[0] === "\u21E7";
            var key = hasShift ? hotKeys[2] : hotKeys[1];
            if (hasShift && ((0, compatibility.vU)() || !/Mac/.test(navigator.platform))) {
              if (key === "-") {
                key = "_";
              } else if (key === "=") {
                key = "+";
              }
            }
            if ((0, compatibility.yl)(event) && event.key.toLowerCase() === key.toLowerCase() && !event.altKey && (!hasShift && !event.shiftKey || hasShift && event.shiftKey)) {
              return true;
            }
            return false;
          };
          ;
          var nextIsNode = function(range) {
            var startContainer = range.startContainer;
            if (startContainer.nodeType === 3 && startContainer.nodeValue.length !== range.startOffset) {
              return false;
            }
            var nextNode = startContainer.nextSibling;
            while (nextNode && nextNode.textContent === "") {
              nextNode = nextNode.nextSibling;
            }
            if (!nextNode) {
              var markerElement = (0, hasClosest.fb)(startContainer, "vditor-ir__marker");
              if (markerElement && !markerElement.nextSibling) {
                var parentNextNode = startContainer.parentElement.parentElement.nextSibling;
                if (parentNextNode && parentNextNode.nodeType !== 3 && parentNextNode.classList.contains("vditor-ir__node")) {
                  return parentNextNode;
                }
              }
              return false;
            } else if (nextNode && nextNode.nodeType !== 3 && nextNode.classList.contains("vditor-ir__node") && !nextNode.getAttribute("data-block")) {
              return nextNode;
            }
            return false;
          };
          var previousIsNode = function(range) {
            var startContainer = range.startContainer;
            var previousNode = startContainer.previousSibling;
            if (startContainer.nodeType === 3 && range.startOffset === 0 && previousNode && previousNode.nodeType !== 3 && previousNode.classList.contains("vditor-ir__node") && !previousNode.getAttribute("data-block")) {
              return previousNode;
            }
            return false;
          };
          var expandMarker = function(range, vditor) {
            vditor.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(item) {
              item.classList.remove("vditor-ir__node--expand");
            });
            var nodeElement = (0, hasClosest.JQ)(range.startContainer, "vditor-ir__node");
            var nodeElementEnd = !range.collapsed && (0, hasClosest.JQ)(range.endContainer, "vditor-ir__node");
            if (!range.collapsed && (!nodeElement || nodeElement !== nodeElementEnd)) {
              return;
            }
            if (nodeElement) {
              nodeElement.classList.add("vditor-ir__node--expand");
              nodeElement.classList.remove("vditor-ir__node--hidden");
              (0, selection.Hc)(range);
            }
            var nextNode = nextIsNode(range);
            if (nextNode) {
              nextNode.classList.add("vditor-ir__node--expand");
              nextNode.classList.remove("vditor-ir__node--hidden");
              return;
            }
            var previousNode = previousIsNode(range);
            if (previousNode) {
              previousNode.classList.add("vditor-ir__node--expand");
              previousNode.classList.remove("vditor-ir__node--hidden");
              return;
            }
          };
          ;
          var processKeydown = function(vditor, event) {
            vditor.ir.composingLock = event.isComposing;
            if (event.isComposing) {
              return false;
            }
            if (event.key.indexOf("Arrow") === -1 && event.key !== "Meta" && event.key !== "Control" && event.key !== "Alt" && event.key !== "Shift" && event.key !== "CapsLock" && event.key !== "Escape" && !/^F\d{1,2}$/.test(event.key)) {
              vditor.undo.recordFirstPosition(vditor, event);
            }
            var range = (0, selection.zh)(vditor);
            var startContainer = range.startContainer;
            if (!fixGSKeyBackspace(event, vditor, startContainer)) {
              return false;
            }
            fixCJKPosition(range, vditor, event);
            fixHR(range);
            if (event.key !== "Enter" && event.key !== "Tab" && event.key !== "Backspace" && event.key.indexOf("Arrow") === -1 && !(0, compatibility.yl)(event) && event.key !== "Escape" && event.key !== "Delete") {
              return false;
            }
            var newlineElement = (0, hasClosest.a1)(startContainer, "data-newline", "1");
            if (!(0, compatibility.yl)(event) && !event.altKey && !event.shiftKey && event.key === "Enter" && newlineElement && range.startOffset < newlineElement.textContent.length) {
              var beforeMarkerElement = newlineElement.previousElementSibling;
              if (beforeMarkerElement) {
                range.insertNode(document.createTextNode(beforeMarkerElement.textContent));
                range.collapse(false);
              }
              var afterMarkerElement = newlineElement.nextSibling;
              if (afterMarkerElement) {
                range.insertNode(document.createTextNode(afterMarkerElement.textContent));
                range.collapse(true);
              }
            }
            var pElement = (0, hasClosest.lG)(startContainer, "P");
            if (fixMarkdown(event, vditor, pElement, range)) {
              return true;
            }
            if (fixList(range, vditor, pElement, event)) {
              return true;
            }
            if (fixBlockquote(vditor, range, event, pElement)) {
              return true;
            }
            var preRenderElement = (0, hasClosest.fb)(startContainer, "vditor-ir__marker--pre");
            if (preRenderElement && preRenderElement.tagName === "PRE") {
              var codeRenderElement = preRenderElement.firstChild;
              if (fixCodeBlock(vditor, event, preRenderElement, range)) {
                return true;
              }
              if ((codeRenderElement.getAttribute("data-type") === "math-block" || codeRenderElement.getAttribute("data-type") === "html-block") && insertBeforeBlock(vditor, event, range, codeRenderElement, preRenderElement.parentElement)) {
                return true;
              }
              if (insertAfterBlock(vditor, event, range, codeRenderElement, preRenderElement.parentElement)) {
                return true;
              }
            }
            var preBeforeElement = (0, hasClosest.a1)(startContainer, "data-type", "code-block-info");
            if (preBeforeElement) {
              if (event.key === "Enter" || event.key === "Tab") {
                range.selectNodeContents(preBeforeElement.nextElementSibling.firstChild);
                range.collapse(true);
                event.preventDefault();
                hidePanel(vditor, ["hint"]);
                return true;
              }
              if (event.key === "Backspace") {
                var start = (0, selection.im)(preBeforeElement, vditor.ir.element).start;
                if (start === 1) {
                  range.setStart(startContainer, 0);
                }
                if (start === 2) {
                  vditor.hint.recentLanguage = "";
                }
              }
              if (insertBeforeBlock(vditor, event, range, preBeforeElement, preBeforeElement.parentElement)) {
                hidePanel(vditor, ["hint"]);
                return true;
              }
            }
            var cellElement = (0, hasClosest.lG)(startContainer, "TD") || (0, hasClosest.lG)(startContainer, "TH");
            if (event.key.indexOf("Arrow") > -1 && cellElement) {
              var tableElement = isFirstCell(cellElement);
              if (tableElement && insertBeforeBlock(vditor, event, range, cellElement, tableElement)) {
                return true;
              }
              var table2Element = isLastCell(cellElement);
              if (table2Element && insertAfterBlock(vditor, event, range, cellElement, table2Element)) {
                return true;
              }
            }
            if (fixTable(vditor, event, range)) {
              return true;
            }
            if (fixTask(vditor, range, event)) {
              return true;
            }
            if (fixTab(vditor, range, event)) {
              return true;
            }
            var headingElement = (0, hasClosestByHeadings.W)(startContainer);
            if (headingElement) {
              if (matchHotKey("\u2318=", event)) {
                var headingMarkerElement = headingElement.querySelector(".vditor-ir__marker--heading");
                if (headingMarkerElement && headingMarkerElement.textContent.trim().length > 1) {
                  process_processHeading(vditor, headingMarkerElement.textContent.substr(1));
                }
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u2318-", event)) {
                var headingMarkerElement = headingElement.querySelector(".vditor-ir__marker--heading");
                if (headingMarkerElement && headingMarkerElement.textContent.trim().length < 6) {
                  process_processHeading(vditor, headingMarkerElement.textContent.trim() + "# ");
                }
                event.preventDefault();
                return true;
              }
            }
            var blockElement = (0, hasClosest.F9)(startContainer);
            if (event.key === "Backspace" && !(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && range.toString() === "") {
              if (fixDelete(vditor, range, event, pElement)) {
                return true;
              }
              if (blockElement && blockElement.previousElementSibling && blockElement.tagName !== "UL" && blockElement.tagName !== "OL" && (blockElement.previousElementSibling.getAttribute("data-type") === "code-block" || blockElement.previousElementSibling.getAttribute("data-type") === "math-block")) {
                var rangeStart = (0, selection.im)(blockElement, vditor.ir.element, range).start;
                if (rangeStart === 0 || rangeStart === 1 && blockElement.innerText.startsWith(constants.g.ZWSP)) {
                  range.selectNodeContents(blockElement.previousElementSibling.querySelector(".vditor-ir__marker--pre code"));
                  range.collapse(false);
                  expandMarker(range, vditor);
                  if (blockElement.textContent.trim().replace(constants.g.ZWSP, "") === "") {
                    blockElement.remove();
                    process_processAfterRender(vditor);
                  }
                  event.preventDefault();
                  return true;
                }
              }
              if (headingElement) {
                var headingLength = headingElement.firstElementChild.textContent.length;
                if ((0, selection.im)(headingElement, vditor.ir.element).start === headingLength) {
                  range.setStart(headingElement.firstElementChild.firstChild, headingLength - 1);
                  range.collapse(true);
                  (0, selection.Hc)(range);
                }
              }
            }
            if ((event.key === "ArrowUp" || event.key === "ArrowDown") && blockElement) {
              blockElement.querySelectorAll(".vditor-ir__node").forEach(function(item) {
                if (!item.contains(startContainer)) {
                  item.classList.add("vditor-ir__node--hidden");
                }
              });
              if (fixFirefoxArrowUpTable(event, blockElement, range)) {
                return true;
              }
            }
            fixCursorDownInlineMath(range, event.key);
            if (blockElement && keydownToc(blockElement, vditor, event, range)) {
              event.preventDefault();
              return true;
            }
            return false;
          };
          var preview_image = __webpack_require__(264);
          ;
          var inputEvent = function(vditor, event) {
            var _a;
            var range = getSelection().getRangeAt(0).cloneRange();
            var startContainer = range.startContainer;
            if (range.startContainer.nodeType !== 3 && range.startContainer.tagName === "DIV") {
              startContainer = range.startContainer.childNodes[range.startOffset - 1];
            }
            var blockElement = (0, hasClosest.a1)(startContainer, "data-block", "0");
            if (blockElement && event && (event.inputType === "deleteContentBackward" || event.data === " ")) {
              var startOffset = (0, selection.im)(blockElement, vditor.sv.element, range).start;
              var startSpace = true;
              for (var i2 = startOffset - 1; i2 > blockElement.textContent.substr(0, startOffset).lastIndexOf("\n"); i2--) {
                if (blockElement.textContent.charAt(i2) !== " " && blockElement.textContent.charAt(i2) !== "	") {
                  startSpace = false;
                  break;
                }
              }
              if (startOffset === 0) {
                startSpace = false;
              }
              if (startSpace) {
                processAfterRender(vditor);
                return;
              }
              if (event.inputType === "deleteContentBackward") {
                var codeBlockMarkerElement = (0, hasClosest.a1)(startContainer, "data-type", "code-block-open-marker") || (0, hasClosest.a1)(startContainer, "data-type", "code-block-close-marker");
                if (codeBlockMarkerElement) {
                  if (codeBlockMarkerElement.getAttribute("data-type") === "code-block-close-marker") {
                    var openMarkerElement = getSideByType(startContainer, "code-block-open-marker");
                    if (openMarkerElement) {
                      openMarkerElement.textContent = codeBlockMarkerElement.textContent;
                      processAfterRender(vditor);
                      return;
                    }
                  }
                  if (codeBlockMarkerElement.getAttribute("data-type") === "code-block-open-marker") {
                    var openMarkerElement = getSideByType(startContainer, "code-block-close-marker", false);
                    if (openMarkerElement) {
                      openMarkerElement.textContent = codeBlockMarkerElement.textContent;
                      processAfterRender(vditor);
                      return;
                    }
                  }
                }
                var mathBlockMarkerElement = (0, hasClosest.a1)(startContainer, "data-type", "math-block-open-marker");
                if (mathBlockMarkerElement) {
                  var mathBlockCloseElement = mathBlockMarkerElement.nextElementSibling.nextElementSibling;
                  if (mathBlockCloseElement && mathBlockCloseElement.getAttribute("data-type") === "math-block-close-marker") {
                    mathBlockCloseElement.remove();
                    processAfterRender(vditor);
                  }
                  return;
                }
                blockElement.querySelectorAll('[data-type="code-block-open-marker"]').forEach(function(item) {
                  if (item.textContent.length === 1) {
                    item.remove();
                  }
                });
                blockElement.querySelectorAll('[data-type="code-block-close-marker"]').forEach(function(item) {
                  if (item.textContent.length === 1) {
                    item.remove();
                  }
                });
                var headingElement = (0, hasClosest.a1)(startContainer, "data-type", "heading-marker");
                if (headingElement && headingElement.textContent.indexOf("#") === -1) {
                  processAfterRender(vditor);
                  return;
                }
              }
              if ((event.data === " " || event.inputType === "deleteContentBackward") && ((0, hasClosest.a1)(startContainer, "data-type", "padding") || (0, hasClosest.a1)(startContainer, "data-type", "li-marker") || (0, hasClosest.a1)(startContainer, "data-type", "task-marker") || (0, hasClosest.a1)(startContainer, "data-type", "blockquote-marker"))) {
                processAfterRender(vditor);
                return;
              }
            }
            if (blockElement && blockElement.textContent.trimRight() === "$$") {
              processAfterRender(vditor);
              return;
            }
            if (!blockElement) {
              blockElement = vditor.sv.element;
            }
            if (((_a = blockElement.firstElementChild) === null || _a === void 0 ? void 0 : _a.getAttribute("data-type")) === "link-ref-defs-block") {
              blockElement = vditor.sv.element;
            }
            if ((0, hasClosest.a1)(startContainer, "data-type", "footnotes-link")) {
              blockElement = vditor.sv.element;
            }
            if (blockElement.textContent.indexOf(Lute.Caret) === -1) {
              range.insertNode(document.createTextNode(Lute.Caret));
            }
            blockElement.querySelectorAll("[style]").forEach(function(item) {
              item.removeAttribute("style");
            });
            blockElement.querySelectorAll("font").forEach(function(item) {
              item.outerHTML = item.innerHTML;
            });
            var html = blockElement.textContent;
            var isSVElement = blockElement.isEqualNode(vditor.sv.element);
            if (isSVElement) {
              html = blockElement.textContent;
            } else {
              if (blockElement.previousElementSibling) {
                html = blockElement.previousElementSibling.textContent + html;
                blockElement.previousElementSibling.remove();
              }
              if (blockElement.previousElementSibling && html.indexOf("---\n") === 0) {
                html = blockElement.previousElementSibling.textContent + html;
                blockElement.previousElementSibling.remove();
              }
              vditor.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(item, index) {
                if (index === 0 && item && !blockElement.isEqualNode(item.parentElement)) {
                  html += "\n" + item.parentElement.textContent;
                  item.parentElement.remove();
                }
              });
              vditor.sv.element.querySelectorAll("[data-type='footnotes-link']").forEach(function(item, index) {
                if (index === 0 && item && !blockElement.isEqualNode(item.parentElement)) {
                  html += "\n" + item.parentElement.textContent;
                  item.parentElement.remove();
                }
              });
            }
            html = processSpinVditorSVDOM(html, vditor);
            if (isSVElement) {
              blockElement.innerHTML = html;
            } else {
              blockElement.outerHTML = html;
            }
            var firstLinkRefDefElement;
            var allLinkRefDefsElement = vditor.sv.element.querySelectorAll("[data-type='link-ref-defs-block']");
            allLinkRefDefsElement.forEach(function(item, index) {
              if (index === 0) {
                firstLinkRefDefElement = item.parentElement;
              } else {
                firstLinkRefDefElement.lastElementChild.remove();
                firstLinkRefDefElement.insertAdjacentHTML("beforeend", "" + item.parentElement.innerHTML);
                item.parentElement.remove();
              }
            });
            if (allLinkRefDefsElement.length > 0) {
              vditor.sv.element.insertAdjacentElement("beforeend", firstLinkRefDefElement);
            }
            var firstFootnoteElement;
            var allFootnoteElement = vditor.sv.element.querySelectorAll("[data-type='footnotes-link']");
            allFootnoteElement.forEach(function(item, index) {
              if (index === 0) {
                firstFootnoteElement = item.parentElement;
              } else {
                firstFootnoteElement.lastElementChild.remove();
                firstFootnoteElement.insertAdjacentHTML("beforeend", "" + item.parentElement.innerHTML);
                item.parentElement.remove();
              }
            });
            if (allFootnoteElement.length > 0) {
              vditor.sv.element.insertAdjacentElement("beforeend", firstFootnoteElement);
            }
            (0, selection.ib)(vditor.sv.element, range);
            scrollCenter(vditor);
            processAfterRender(vditor, {
              enableAddUndoStack: true,
              enableHint: true,
              enableInput: true
            });
          };
          ;
          var processKeydown_processKeydown = function(vditor, event) {
            var _a, _b, _c, _d, _e;
            vditor.sv.composingLock = event.isComposing;
            if (event.isComposing) {
              return false;
            }
            if (event.key.indexOf("Arrow") === -1 && event.key !== "Meta" && event.key !== "Control" && event.key !== "Alt" && event.key !== "Shift" && event.key !== "CapsLock" && event.key !== "Escape" && !/^F\d{1,2}$/.test(event.key)) {
              vditor.undo.recordFirstPosition(vditor, event);
            }
            if (event.key !== "Enter" && event.key !== "Tab" && event.key !== "Backspace" && event.key.indexOf("Arrow") === -1 && !(0, compatibility.yl)(event) && event.key !== "Escape") {
              return false;
            }
            var range = (0, selection.zh)(vditor);
            var startContainer = range.startContainer;
            if (range.startContainer.nodeType !== 3 && range.startContainer.tagName === "DIV") {
              startContainer = range.startContainer.childNodes[range.startOffset - 1];
            }
            var textElement = (0, hasClosest.a1)(startContainer, "data-type", "text");
            var blockquoteMarkerElement = (0, hasClosest.a1)(startContainer, "data-type", "blockquote-marker");
            if (!blockquoteMarkerElement && range.startOffset === 0 && textElement && textElement.previousElementSibling && textElement.previousElementSibling.getAttribute("data-type") === "blockquote-marker") {
              blockquoteMarkerElement = textElement.previousElementSibling;
            }
            if (blockquoteMarkerElement) {
              if (event.key === "Enter" && !(0, compatibility.yl)(event) && !event.altKey && blockquoteMarkerElement.nextElementSibling.textContent.trim() === "" && (0, selection.im)(blockquoteMarkerElement, vditor.sv.element, range).start === blockquoteMarkerElement.textContent.length) {
                if (((_a = blockquoteMarkerElement.previousElementSibling) === null || _a === void 0 ? void 0 : _a.getAttribute("data-type")) === "padding") {
                  blockquoteMarkerElement.previousElementSibling.setAttribute("data-action", "enter-remove");
                }
                blockquoteMarkerElement.remove();
                processAfterRender(vditor);
                event.preventDefault();
                return true;
              }
            }
            var listMarkerElement = (0, hasClosest.a1)(startContainer, "data-type", "li-marker");
            var taskMarkerElement = (0, hasClosest.a1)(startContainer, "data-type", "task-marker");
            var listLastMarkerElement = listMarkerElement;
            if (!listLastMarkerElement) {
              if (taskMarkerElement && taskMarkerElement.nextElementSibling.getAttribute("data-type") !== "task-marker") {
                listLastMarkerElement = taskMarkerElement;
              }
            }
            if (!listLastMarkerElement && range.startOffset === 0 && textElement && textElement.previousElementSibling && (textElement.previousElementSibling.getAttribute("data-type") === "li-marker" || textElement.previousElementSibling.getAttribute("data-type") === "task-marker")) {
              listLastMarkerElement = textElement.previousElementSibling;
            }
            if (listLastMarkerElement) {
              var startIndex = (0, selection.im)(listLastMarkerElement, vditor.sv.element, range).start;
              var isTask = listLastMarkerElement.getAttribute("data-type") === "task-marker";
              var listFirstMarkerElement = listLastMarkerElement;
              if (isTask) {
                listFirstMarkerElement = listLastMarkerElement.previousElementSibling.previousElementSibling.previousElementSibling;
              }
              if (startIndex === listLastMarkerElement.textContent.length) {
                if (event.key === "Enter" && !(0, compatibility.yl)(event) && !event.altKey && !event.shiftKey && listLastMarkerElement.nextElementSibling.textContent.trim() === "") {
                  if (((_b = listFirstMarkerElement.previousElementSibling) === null || _b === void 0 ? void 0 : _b.getAttribute("data-type")) === "padding") {
                    listFirstMarkerElement.previousElementSibling.remove();
                    inputEvent(vditor);
                  } else {
                    if (isTask) {
                      listFirstMarkerElement.remove();
                      listLastMarkerElement.previousElementSibling.previousElementSibling.remove();
                      listLastMarkerElement.previousElementSibling.remove();
                    }
                    listLastMarkerElement.nextElementSibling.remove();
                    listLastMarkerElement.remove();
                    processAfterRender(vditor);
                  }
                  event.preventDefault();
                  return true;
                }
                if (event.key === "Tab") {
                  listFirstMarkerElement.insertAdjacentHTML("beforebegin", '<span data-type="padding">' + listFirstMarkerElement.textContent.replace(/\S/g, " ") + "</span>");
                  if (/^\d/.test(listFirstMarkerElement.textContent)) {
                    listFirstMarkerElement.textContent = listFirstMarkerElement.textContent.replace(/^\d{1,}/, "1");
                    range.selectNodeContents(listLastMarkerElement.firstChild);
                    range.collapse(false);
                  }
                  inputEvent(vditor);
                  event.preventDefault();
                  return true;
                }
              }
            }
            if (fixTab(vditor, range, event)) {
              return true;
            }
            var blockElement = (0, hasClosest.a1)(startContainer, "data-block", "0");
            var spanElement = (0, hasClosestByHeadings.S)(startContainer, "SPAN");
            if (event.key === "Enter" && !(0, compatibility.yl)(event) && !event.altKey && !event.shiftKey && blockElement) {
              var isFirst = false;
              var newLineMatch = blockElement.textContent.match(/^\n+/);
              if ((0, selection.im)(blockElement, vditor.sv.element).start <= (newLineMatch ? newLineMatch[0].length : 0)) {
                isFirst = true;
              }
              var newLineText = "\n";
              if (spanElement) {
                if (((_c = spanElement.previousElementSibling) === null || _c === void 0 ? void 0 : _c.getAttribute("data-action")) === "enter-remove") {
                  spanElement.previousElementSibling.remove();
                  processAfterRender(vditor);
                  event.preventDefault();
                  return true;
                } else {
                  newLineText += processPreviousMarkers(spanElement);
                }
              }
              range.insertNode(document.createTextNode(newLineText));
              range.collapse(false);
              if (blockElement && blockElement.textContent.trim() !== "" && !isFirst) {
                inputEvent(vditor);
              } else {
                processAfterRender(vditor);
              }
              event.preventDefault();
              return true;
            }
            if (event.key === "Backspace" && !(0, compatibility.yl)(event) && !event.altKey && !event.shiftKey) {
              if (spanElement && ((_d = spanElement.previousElementSibling) === null || _d === void 0 ? void 0 : _d.getAttribute("data-type")) === "newline" && (0, selection.im)(spanElement, vditor.sv.element, range).start === 1 && spanElement.getAttribute("data-type").indexOf("code-block-") === -1) {
                range.setStart(spanElement, 0);
                range.extractContents();
                if (spanElement.textContent.trim() !== "") {
                  inputEvent(vditor);
                } else {
                  processAfterRender(vditor);
                }
                event.preventDefault();
                return true;
              }
              if (blockElement && (0, selection.im)(blockElement, vditor.sv.element, range).start === 0 && blockElement.previousElementSibling) {
                range.extractContents();
                var previousLastElement = blockElement.previousElementSibling.lastElementChild;
                if (previousLastElement.getAttribute("data-type") === "newline") {
                  previousLastElement.remove();
                  previousLastElement = blockElement.previousElementSibling.lastElementChild;
                }
                if (previousLastElement.getAttribute("data-type") !== "newline") {
                  previousLastElement.insertAdjacentHTML("afterend", blockElement.innerHTML);
                  blockElement.remove();
                }
                if (blockElement.textContent.trim() !== "" && !((_e = blockElement.previousElementSibling) === null || _e === void 0 ? void 0 : _e.querySelector('[data-type="code-block-open-marker"]'))) {
                  inputEvent(vditor);
                } else {
                  if (previousLastElement.getAttribute("data-type") !== "newline") {
                    range.selectNodeContents(previousLastElement.lastChild);
                    range.collapse(false);
                  }
                  processAfterRender(vditor);
                }
                event.preventDefault();
                return true;
              }
            }
            return false;
          };
          var setContentTheme = __webpack_require__(958);
          ;
          var setTheme = function(vditor) {
            if (vditor.options.theme === "dark") {
              vditor.element.classList.add("vditor--dark");
            } else {
              vditor.element.classList.remove("vditor--dark");
            }
          };
          ;
          var initUI = function(vditor) {
            vditor.element.innerHTML = "";
            vditor.element.classList.add("vditor");
            setTheme(vditor);
            (0, setContentTheme.Z)(vditor.options.preview.theme.current, vditor.options.preview.theme.path);
            if (typeof vditor.options.height === "number") {
              vditor.element.style.height = vditor.options.height + "px";
            }
            if (typeof vditor.options.minHeight === "number") {
              vditor.element.style.minHeight = vditor.options.minHeight + "px";
            }
            if (typeof vditor.options.width === "number") {
              vditor.element.style.width = vditor.options.width + "px";
            } else {
              vditor.element.style.width = vditor.options.width;
            }
            vditor.element.appendChild(vditor.toolbar.element);
            var contentElement = document.createElement("div");
            contentElement.className = "vditor-content";
            if (vditor.options.outline.position === "left") {
              contentElement.appendChild(vditor.outline.element);
            }
            contentElement.appendChild(vditor.wysiwyg.element.parentElement);
            contentElement.appendChild(vditor.sv.element);
            contentElement.appendChild(vditor.ir.element.parentElement);
            contentElement.appendChild(vditor.preview.element);
            if (vditor.toolbar.elements.devtools) {
              contentElement.appendChild(vditor.devtools.element);
            }
            if (vditor.options.outline.position === "right") {
              vditor.outline.element.classList.add("vditor-outline--right");
              contentElement.appendChild(vditor.outline.element);
            }
            if (vditor.upload) {
              contentElement.appendChild(vditor.upload.element);
            }
            if (vditor.options.resize.enable) {
              contentElement.appendChild(vditor.resize.element);
            }
            contentElement.appendChild(vditor.hint.element);
            contentElement.appendChild(vditor.tip.element);
            vditor.element.appendChild(contentElement);
            if (vditor.toolbar.elements.export) {
              vditor.element.insertAdjacentHTML("beforeend", '<iframe style="width: 100%;height: 0;border: 0"></iframe>');
            }
            setEditMode(vditor, vditor.options.mode, afterRender(vditor, contentElement));
            document.execCommand("DefaultParagraphSeparator", false, "p");
            if (navigator.userAgent.indexOf("iPhone") > -1 && typeof window.visualViewport !== "undefined") {
              var pendingUpdate_1 = false;
              var viewportHandler = function(event) {
                if (pendingUpdate_1) {
                  return;
                }
                pendingUpdate_1 = true;
                requestAnimationFrame(function() {
                  pendingUpdate_1 = false;
                  var layoutViewport = vditor.toolbar.element;
                  layoutViewport.style.transform = "none";
                  if (layoutViewport.getBoundingClientRect().top < 0) {
                    layoutViewport.style.transform = "translate(0, " + -layoutViewport.getBoundingClientRect().top + "px)";
                  }
                });
              };
              window.visualViewport.addEventListener("scroll", viewportHandler);
              window.visualViewport.addEventListener("resize", viewportHandler);
            }
          };
          var setPadding = function(vditor) {
            var minPadding = window.innerWidth <= constants.g.MOBILE_WIDTH ? 10 : 35;
            if (vditor.wysiwyg.element.parentElement.style.display !== "none") {
              var padding = (vditor.wysiwyg.element.parentElement.clientWidth - vditor.options.preview.maxWidth) / 2;
              vditor.wysiwyg.element.style.padding = "10px " + Math.max(minPadding, padding) + "px";
            }
            if (vditor.ir.element.parentElement.style.display !== "none") {
              var padding = (vditor.ir.element.parentElement.clientWidth - vditor.options.preview.maxWidth) / 2;
              vditor.ir.element.style.padding = "10px " + Math.max(minPadding, padding) + "px";
            }
            if (vditor.preview.element.style.display !== "block" || vditor.currentMode === "sv") {
              vditor.toolbar.element.style.paddingLeft = Math.max(5, parseInt(vditor[vditor.currentMode].element.style.paddingLeft || "0", 10) + (vditor.options.outline.position === "left" ? vditor.outline.element.offsetWidth : 0)) + "px";
            }
          };
          var setTypewriterPosition = function(vditor) {
            if (!vditor.options.typewriterMode) {
              return;
            }
            var height = window.innerHeight;
            if (typeof vditor.options.height === "number") {
              height = vditor.options.height;
              if (typeof vditor.options.minHeight === "number") {
                height = Math.max(height, vditor.options.minHeight);
              }
              height = Math.min(window.innerHeight, height);
            }
            if (vditor.element.classList.contains("vditor--fullscreen")) {
              height = window.innerHeight;
            }
            vditor[vditor.currentMode].element.style.setProperty("--editor-bottom", (height - vditor.toolbar.element.offsetHeight) / 2 + "px");
          };
          var afterRender = function(vditor, contentElement) {
            setTypewriterPosition(vditor);
            window.addEventListener("resize", function() {
              setPadding(vditor);
              setTypewriterPosition(vditor);
            });
            var initValue = (0, compatibility.pK)() && localStorage.getItem(vditor.options.cache.id);
            if (!vditor.options.cache.enable || !initValue) {
              if (vditor.options.value) {
                initValue = vditor.options.value;
              } else if (vditor.originalInnerHTML) {
                initValue = vditor.lute.HTML2Md(vditor.originalInnerHTML);
              } else if (!vditor.options.cache.enable) {
                initValue = "";
              }
            }
            return initValue || "";
          };
          ;
          var highlightToolbarIR = function(vditor) {
            clearTimeout(vditor[vditor.currentMode].hlToolbarTimeoutId);
            vditor[vditor.currentMode].hlToolbarTimeoutId = window.setTimeout(function() {
              if (vditor[vditor.currentMode].element.getAttribute("contenteditable") === "false") {
                return;
              }
              if (!(0, selection.Gb)(vditor[vditor.currentMode].element)) {
                return;
              }
              removeCurrentToolbar(vditor.toolbar.elements, constants.g.EDIT_TOOLBARS);
              enableToolbar(vditor.toolbar.elements, constants.g.EDIT_TOOLBARS);
              var range = (0, selection.zh)(vditor);
              var typeElement = range.startContainer;
              if (range.startContainer.nodeType === 3) {
                typeElement = range.startContainer.parentElement;
              }
              if (typeElement.classList.contains("vditor-reset")) {
                typeElement = typeElement.childNodes[range.startOffset];
              }
              var headingElement = vditor.currentMode === "sv" ? (0, hasClosest.a1)(typeElement, "data-type", "heading") : (0, hasClosestByHeadings.W)(typeElement);
              if (headingElement) {
                setCurrentToolbar(vditor.toolbar.elements, ["headings"]);
              }
              var quoteElement = vditor.currentMode === "sv" ? (0, hasClosest.a1)(typeElement, "data-type", "blockquote") : (0, hasClosest.lG)(typeElement, "BLOCKQUOTE");
              if (quoteElement) {
                setCurrentToolbar(vditor.toolbar.elements, ["quote"]);
              }
              var strongElement = (0, hasClosest.a1)(typeElement, "data-type", "strong");
              if (strongElement) {
                setCurrentToolbar(vditor.toolbar.elements, ["bold"]);
              }
              var emElement = (0, hasClosest.a1)(typeElement, "data-type", "em");
              if (emElement) {
                setCurrentToolbar(vditor.toolbar.elements, ["italic"]);
              }
              var sElement = (0, hasClosest.a1)(typeElement, "data-type", "s");
              if (sElement) {
                setCurrentToolbar(vditor.toolbar.elements, ["strike"]);
              }
              var aElement = (0, hasClosest.a1)(typeElement, "data-type", "a");
              if (aElement) {
                setCurrentToolbar(vditor.toolbar.elements, ["link"]);
              }
              var liElement = (0, hasClosest.lG)(typeElement, "LI");
              if (liElement) {
                if (liElement.classList.contains("vditor-task")) {
                  setCurrentToolbar(vditor.toolbar.elements, ["check"]);
                } else if (liElement.parentElement.tagName === "OL") {
                  setCurrentToolbar(vditor.toolbar.elements, ["ordered-list"]);
                } else if (liElement.parentElement.tagName === "UL") {
                  setCurrentToolbar(vditor.toolbar.elements, ["list"]);
                }
                enableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
              } else {
                disableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
              }
              var codeBlockElement = (0, hasClosest.a1)(typeElement, "data-type", "code-block");
              if (codeBlockElement) {
                disableToolbar(vditor.toolbar.elements, [
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "line",
                  "quote",
                  "list",
                  "ordered-list",
                  "check",
                  "code",
                  "inline-code",
                  "upload",
                  "link",
                  "table",
                  "record"
                ]);
                setCurrentToolbar(vditor.toolbar.elements, ["code"]);
              }
              var codeElement = (0, hasClosest.a1)(typeElement, "data-type", "code");
              if (codeElement) {
                disableToolbar(vditor.toolbar.elements, [
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "line",
                  "quote",
                  "list",
                  "ordered-list",
                  "check",
                  "code",
                  "upload",
                  "link",
                  "table",
                  "record"
                ]);
                setCurrentToolbar(vditor.toolbar.elements, ["inline-code"]);
              }
              var tableElement = (0, hasClosest.a1)(typeElement, "data-type", "table");
              if (tableElement) {
                disableToolbar(vditor.toolbar.elements, [
                  "headings",
                  "list",
                  "ordered-list",
                  "check",
                  "line",
                  "quote",
                  "code",
                  "table"
                ]);
              }
            }, 200);
          };
          ;
          var afterRenderEvent = function(vditor, options) {
            if (options === void 0) {
              options = {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: true
              };
            }
            if (options.enableHint) {
              vditor.hint.render(vditor);
            }
            clearTimeout(vditor.wysiwyg.afterRenderTimeoutId);
            vditor.wysiwyg.afterRenderTimeoutId = window.setTimeout(function() {
              if (vditor.wysiwyg.composingLock) {
                return;
              }
              var text = getMarkdown(vditor);
              if (typeof vditor.options.input === "function" && options.enableInput) {
                vditor.options.input(text);
              }
              if (vditor.options.counter.enable) {
                vditor.counter.render(vditor, text);
              }
              if (vditor.options.cache.enable && (0, compatibility.pK)()) {
                localStorage.setItem(vditor.options.cache.id, text);
                if (vditor.options.cache.after) {
                  vditor.options.cache.after(text);
                }
              }
              if (vditor.devtools) {
                vditor.devtools.renderEchart(vditor);
              }
              if (options.enableAddUndoStack) {
                vditor.undo.addToUndoStack(vditor);
              }
            }, vditor.options.undoDelay);
          };
          ;
          var previoueIsEmptyA = function(node) {
            var previousNode = node.previousSibling;
            while (previousNode) {
              if (previousNode.nodeType !== 3 && previousNode.tagName === "A" && !previousNode.previousSibling && previousNode.innerHTML.replace(constants.g.ZWSP, "") === "" && previousNode.nextSibling) {
                return previousNode;
              }
              previousNode = previousNode.previousSibling;
            }
            return false;
          };
          var nextIsCode = function(range) {
            var nextNode = range.startContainer.nextSibling;
            while (nextNode && nextNode.textContent === "") {
              nextNode = nextNode.nextSibling;
            }
            if (nextNode && nextNode.nodeType !== 3 && (nextNode.tagName === "CODE" || nextNode.getAttribute("data-type") === "math-inline" || nextNode.getAttribute("data-type") === "html-entity" || nextNode.getAttribute("data-type") === "html-inline")) {
              return true;
            }
            return false;
          };
          var getNextHTML = function(node) {
            var html = "";
            var nextNode = node.nextSibling;
            while (nextNode) {
              if (nextNode.nodeType === 3) {
                html += nextNode.textContent;
              } else {
                html += nextNode.outerHTML;
              }
              nextNode = nextNode.nextSibling;
            }
            return html;
          };
          var getPreviousHTML = function(node) {
            var html = "";
            var previousNode = node.previousSibling;
            while (previousNode) {
              if (previousNode.nodeType === 3) {
                html = previousNode.textContent + html;
              } else {
                html = previousNode.outerHTML + html;
              }
              previousNode = previousNode.previousSibling;
            }
            return html;
          };
          var getRenderElementNextNode = function(blockCodeElement) {
            var nextNode = blockCodeElement;
            while (nextNode && !nextNode.nextSibling) {
              nextNode = nextNode.parentElement;
            }
            return nextNode.nextSibling;
          };
          var splitElement = function(range) {
            var previousHTML = getPreviousHTML(range.startContainer);
            var nextHTML = getNextHTML(range.startContainer);
            var text = range.startContainer.textContent;
            var offset = range.startOffset;
            var beforeHTML = "";
            var afterHTML = "";
            if (text.substr(0, offset) !== "" && text.substr(0, offset) !== constants.g.ZWSP || previousHTML) {
              beforeHTML = "" + previousHTML + text.substr(0, offset);
            }
            if (text.substr(offset) !== "" && text.substr(offset) !== constants.g.ZWSP || nextHTML) {
              afterHTML = "" + text.substr(offset) + nextHTML;
            }
            return {
              afterHTML,
              beforeHTML
            };
          };
          var modifyPre = function(vditor, range) {
            Array.from(vditor.wysiwyg.element.childNodes).find(function(node) {
              if (node.nodeType === 3) {
                var pElement = document.createElement("p");
                pElement.setAttribute("data-block", "0");
                pElement.textContent = node.textContent;
                var cloneRangeOffset = range.startContainer.nodeType === 3 ? range.startOffset : node.textContent.length;
                node.parentNode.insertBefore(pElement, node);
                node.remove();
                range.setStart(pElement.firstChild, Math.min(pElement.firstChild.textContent.length, cloneRangeOffset));
                range.collapse(true);
                (0, selection.Hc)(range);
                return true;
              } else if (!node.getAttribute("data-block")) {
                if (node.tagName === "P") {
                  node.remove();
                } else {
                  if (node.tagName === "DIV") {
                    range.insertNode(document.createElement("wbr"));
                    node.outerHTML = '<p data-block="0">' + node.innerHTML + "</p>";
                  } else {
                    if (node.tagName === "BR") {
                      node.outerHTML = '<p data-block="0">' + node.outerHTML + "<wbr></p>";
                    } else {
                      range.insertNode(document.createElement("wbr"));
                      node.outerHTML = '<p data-block="0">' + node.outerHTML + "</p>";
                    }
                  }
                  (0, selection.ib)(vditor.wysiwyg.element, range);
                  range = getSelection().getRangeAt(0);
                }
                return true;
              }
            });
          };
          ;
          var setHeading = function(vditor, tagName) {
            var range = (0, selection.zh)(vditor);
            var blockElement = (0, hasClosest.F9)(range.startContainer);
            if (!blockElement) {
              blockElement = range.startContainer.childNodes[range.startOffset];
            }
            if (!blockElement && vditor.wysiwyg.element.children.length === 0) {
              blockElement = vditor.wysiwyg.element;
            }
            if (blockElement && !blockElement.classList.contains("vditor-wysiwyg__block")) {
              range.insertNode(document.createElement("wbr"));
              if (blockElement.innerHTML.trim() === "<wbr>") {
                blockElement.innerHTML = "<wbr><br>";
              }
              if (blockElement.tagName === "BLOCKQUOTE" || blockElement.classList.contains("vditor-reset")) {
                blockElement.innerHTML = "<" + tagName + ' data-block="0">' + blockElement.innerHTML.trim() + "</" + tagName + ">";
              } else {
                blockElement.outerHTML = "<" + tagName + ' data-block="0">' + blockElement.innerHTML.trim() + "</" + tagName + ">";
              }
              (0, selection.ib)(vditor.wysiwyg.element, range);
              renderToc(vditor);
            }
          };
          var removeHeading = function(vditor) {
            var range = getSelection().getRangeAt(0);
            var blockElement = (0, hasClosest.F9)(range.startContainer);
            if (!blockElement) {
              blockElement = range.startContainer.childNodes[range.startOffset];
            }
            if (blockElement) {
              range.insertNode(document.createElement("wbr"));
              blockElement.outerHTML = '<p data-block="0">' + blockElement.innerHTML + "</p>";
              (0, selection.ib)(vditor.wysiwyg.element, range);
            }
            vditor.wysiwyg.popover.style.display = "none";
          };
          ;
          var showCode = function(previewElement, vditor, first) {
            if (first === void 0) {
              first = true;
            }
            var previousElement = previewElement.previousElementSibling;
            var range = previousElement.ownerDocument.createRange();
            if (previousElement.tagName === "CODE") {
              previousElement.style.display = "inline-block";
              if (first) {
                range.setStart(previousElement.firstChild, 1);
              } else {
                range.selectNodeContents(previousElement);
              }
            } else {
              previousElement.style.display = "block";
              if (!previousElement.firstChild.firstChild) {
                previousElement.firstChild.appendChild(document.createTextNode(""));
              }
              range.selectNodeContents(previousElement.firstChild);
            }
            if (first) {
              range.collapse(true);
            } else {
              range.collapse(false);
            }
            (0, selection.Hc)(range);
            if (previewElement.firstElementChild.classList.contains("language-mindmap")) {
              return;
            }
            scrollCenter(vditor);
          };
          ;
          var wysiwyg_processKeydown_processKeydown = function(vditor, event) {
            vditor.wysiwyg.composingLock = event.isComposing;
            if (event.isComposing) {
              return false;
            }
            if (event.key.indexOf("Arrow") === -1 && event.key !== "Meta" && event.key !== "Control" && event.key !== "Alt" && event.key !== "Shift" && event.key !== "CapsLock" && event.key !== "Escape" && !/^F\d{1,2}$/.test(event.key)) {
              vditor.undo.recordFirstPosition(vditor, event);
            }
            var range = (0, selection.zh)(vditor);
            var startContainer = range.startContainer;
            if (!fixGSKeyBackspace(event, vditor, startContainer)) {
              return false;
            }
            fixCJKPosition(range, vditor, event);
            fixHR(range);
            if (event.key !== "Enter" && event.key !== "Tab" && event.key !== "Backspace" && event.key.indexOf("Arrow") === -1 && !(0, compatibility.yl)(event) && event.key !== "Escape" && event.key !== "Delete") {
              return false;
            }
            var blockElement = (0, hasClosest.F9)(startContainer);
            var pElement = (0, hasClosest.lG)(startContainer, "P");
            if (fixMarkdown(event, vditor, pElement, range)) {
              return true;
            }
            if (fixList(range, vditor, pElement, event)) {
              return true;
            }
            if (fixTable(vditor, event, range)) {
              return true;
            }
            var codeRenderElement = (0, hasClosest.fb)(startContainer, "vditor-wysiwyg__block");
            if (codeRenderElement) {
              if (event.key === "Escape" && codeRenderElement.children.length === 2) {
                vditor.wysiwyg.popover.style.display = "none";
                codeRenderElement.firstElementChild.style.display = "none";
                vditor.wysiwyg.element.blur();
                event.preventDefault();
                return true;
              }
              if (!(0, compatibility.yl)(event) && !event.shiftKey && event.altKey && event.key === "Enter" && codeRenderElement.getAttribute("data-type") === "code-block") {
                var inputElemment = vditor.wysiwyg.popover.querySelector(".vditor-input");
                inputElemment.focus();
                inputElemment.select();
                event.preventDefault();
                return true;
              }
              if (codeRenderElement.getAttribute("data-block") === "0") {
                if (fixCodeBlock(vditor, event, codeRenderElement.firstElementChild, range)) {
                  return true;
                }
                if (insertAfterBlock(vditor, event, range, codeRenderElement.firstElementChild, codeRenderElement)) {
                  return true;
                }
                if (codeRenderElement.getAttribute("data-type") !== "yaml-front-matter" && insertBeforeBlock(vditor, event, range, codeRenderElement.firstElementChild, codeRenderElement)) {
                  return true;
                }
              }
            }
            if (fixBlockquote(vditor, range, event, pElement)) {
              return true;
            }
            var topBQElement = (0, hasClosest.E2)(startContainer, "BLOCKQUOTE");
            if (topBQElement) {
              if (!event.shiftKey && event.altKey && event.key === "Enter") {
                if (!(0, compatibility.yl)(event)) {
                  range.setStartAfter(topBQElement);
                } else {
                  range.setStartBefore(topBQElement);
                }
                (0, selection.Hc)(range);
                var node = document.createElement("p");
                node.setAttribute("data-block", "0");
                node.innerHTML = "\n";
                range.insertNode(node);
                range.collapse(true);
                (0, selection.Hc)(range);
                afterRenderEvent(vditor);
                scrollCenter(vditor);
                event.preventDefault();
                return true;
              }
            }
            var headingElement = (0, hasClosestByHeadings.W)(startContainer);
            if (headingElement) {
              if (headingElement.tagName === "H6" && startContainer.textContent.length === range.startOffset && !(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && event.key === "Enter") {
                var pTempElement = document.createElement("p");
                pTempElement.textContent = "\n";
                pTempElement.setAttribute("data-block", "0");
                startContainer.parentElement.insertAdjacentElement("afterend", pTempElement);
                range.setStart(pTempElement, 0);
                (0, selection.Hc)(range);
                afterRenderEvent(vditor);
                scrollCenter(vditor);
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u2318=", event)) {
                var index = parseInt(headingElement.tagName.substr(1), 10) - 1;
                if (index > 0) {
                  setHeading(vditor, "h" + index);
                  afterRenderEvent(vditor);
                }
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u2318-", event)) {
                var index = parseInt(headingElement.tagName.substr(1), 10) + 1;
                if (index < 7) {
                  setHeading(vditor, "h" + index);
                  afterRenderEvent(vditor);
                }
                event.preventDefault();
                return true;
              }
              if (event.key === "Backspace" && !(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && headingElement.textContent.length === 1) {
                removeHeading(vditor);
              }
            }
            if (fixTask(vditor, range, event)) {
              return true;
            }
            if (event.altKey && event.key === "Enter" && !(0, compatibility.yl)(event) && !event.shiftKey) {
              var aElement = (0, hasClosest.lG)(startContainer, "A");
              var linRefElement = (0, hasClosest.a1)(startContainer, "data-type", "link-ref");
              var footnoteRefElement = (0, hasClosest.a1)(startContainer, "data-type", "footnotes-ref");
              if (aElement || linRefElement || footnoteRefElement || headingElement && headingElement.tagName.length === 2) {
                var inputElement = vditor.wysiwyg.popover.querySelector("input");
                inputElement.focus();
                inputElement.select();
              }
            }
            if (removeBlockElement(vditor, event)) {
              return true;
            }
            if (matchHotKey("\u21E7\u2318U", event)) {
              var itemElement = vditor.wysiwyg.popover.querySelector('[data-type="up"]');
              if (itemElement) {
                itemElement.click();
                event.preventDefault();
                return true;
              }
            }
            if (matchHotKey("\u21E7\u2318D", event)) {
              var itemElement = vditor.wysiwyg.popover.querySelector('[data-type="down"]');
              if (itemElement) {
                itemElement.click();
                event.preventDefault();
                return true;
              }
            }
            if (fixTab(vditor, range, event)) {
              return true;
            }
            if (!(0, compatibility.yl)(event) && event.shiftKey && !event.altKey && event.key === "Enter" && startContainer.parentElement.tagName !== "LI" && startContainer.parentElement.tagName !== "P") {
              if (["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(startContainer.parentElement.tagName)) {
                range.insertNode(document.createTextNode("\n" + constants.g.ZWSP));
              } else {
                range.insertNode(document.createTextNode("\n"));
              }
              range.collapse(false);
              (0, selection.Hc)(range);
              afterRenderEvent(vditor);
              scrollCenter(vditor);
              event.preventDefault();
              return true;
            }
            if (event.key === "Backspace" && !(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && range.toString() === "") {
              if (fixDelete(vditor, range, event, pElement)) {
                return true;
              }
              if (blockElement) {
                if (blockElement.previousElementSibling && blockElement.previousElementSibling.classList.contains("vditor-wysiwyg__block") && blockElement.previousElementSibling.getAttribute("data-block") === "0" && blockElement.tagName !== "UL" && blockElement.tagName !== "OL") {
                  var rangeStart = (0, selection.im)(blockElement, vditor.wysiwyg.element, range).start;
                  if (rangeStart === 0 && range.startOffset === 0 || rangeStart === 1 && blockElement.innerText.startsWith(constants.g.ZWSP)) {
                    showCode(blockElement.previousElementSibling.lastElementChild, vditor, false);
                    if (blockElement.innerHTML.trim().replace(constants.g.ZWSP, "") === "") {
                      blockElement.remove();
                      afterRenderEvent(vditor);
                    }
                    event.preventDefault();
                    return true;
                  }
                }
                var rangeStartOffset = range.startOffset;
                if (range.toString() === "" && startContainer.nodeType === 3 && startContainer.textContent.charAt(rangeStartOffset - 2) === "\n" && startContainer.textContent.charAt(rangeStartOffset - 1) !== constants.g.ZWSP && ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(startContainer.parentElement.tagName)) {
                  startContainer.textContent = startContainer.textContent.substring(0, rangeStartOffset - 1) + constants.g.ZWSP;
                  range.setStart(startContainer, rangeStartOffset);
                  range.collapse(true);
                  afterRenderEvent(vditor);
                  event.preventDefault();
                  return true;
                }
                if (startContainer.textContent === constants.g.ZWSP && range.startOffset === 1 && !startContainer.previousSibling && nextIsCode(range)) {
                  startContainer.textContent = "";
                }
                blockElement.querySelectorAll("span.vditor-wysiwyg__block[data-type='math-inline']").forEach(function(item) {
                  item.firstElementChild.style.display = "inline";
                  item.lastElementChild.style.display = "none";
                });
                blockElement.querySelectorAll("span.vditor-wysiwyg__block[data-type='html-entity']").forEach(function(item) {
                  item.firstElementChild.style.display = "inline";
                  item.lastElementChild.style.display = "none";
                });
              }
            }
            if ((0, compatibility.vU)() && range.startOffset === 1 && startContainer.textContent.indexOf(constants.g.ZWSP) > -1 && startContainer.previousSibling && startContainer.previousSibling.nodeType !== 3 && startContainer.previousSibling.tagName === "CODE" && (event.key === "Backspace" || event.key === "ArrowLeft")) {
              range.selectNodeContents(startContainer.previousSibling);
              range.collapse(false);
              event.preventDefault();
              return true;
            }
            if (fixFirefoxArrowUpTable(event, blockElement, range)) {
              event.preventDefault();
              return true;
            }
            fixCursorDownInlineMath(range, event.key);
            if (event.key === "ArrowDown") {
              var nextElement = startContainer.nextSibling;
              if (nextElement && nextElement.nodeType !== 3 && nextElement.getAttribute("data-type") === "math-inline") {
                range.setStartAfter(nextElement);
              }
            }
            if (blockElement && keydownToc(blockElement, vditor, event, range)) {
              event.preventDefault();
              return true;
            }
            return false;
          };
          var removeBlockElement = function(vditor, event) {
            if (matchHotKey("\u21E7\u2318X", event)) {
              var itemElement = vditor.wysiwyg.popover.querySelector('[data-type="remove"]');
              if (itemElement) {
                itemElement.click();
                event.preventDefault();
                return true;
              }
            }
          };
          ;
          var highlightToolbarWYSIWYG = function(vditor) {
            clearTimeout(vditor.wysiwyg.hlToolbarTimeoutId);
            vditor.wysiwyg.hlToolbarTimeoutId = window.setTimeout(function() {
              if (vditor.wysiwyg.element.getAttribute("contenteditable") === "false") {
                return;
              }
              if (!(0, selection.Gb)(vditor.wysiwyg.element)) {
                return;
              }
              removeCurrentToolbar(vditor.toolbar.elements, constants.g.EDIT_TOOLBARS);
              enableToolbar(vditor.toolbar.elements, constants.g.EDIT_TOOLBARS);
              var range = getSelection().getRangeAt(0);
              var typeElement = range.startContainer;
              if (range.startContainer.nodeType === 3) {
                typeElement = range.startContainer.parentElement;
              } else {
                typeElement = typeElement.childNodes[range.startOffset >= typeElement.childNodes.length ? typeElement.childNodes.length - 1 : range.startOffset];
              }
              var footnotesElement = (0, hasClosest.a1)(typeElement, "data-type", "footnotes-block");
              if (footnotesElement) {
                vditor.wysiwyg.popover.innerHTML = "";
                genClose(footnotesElement, vditor);
                setPopoverPosition(vditor, footnotesElement);
                return;
              }
              var liElement = (0, hasClosest.lG)(typeElement, "LI");
              if (liElement) {
                if (liElement.classList.contains("vditor-task")) {
                  setCurrentToolbar(vditor.toolbar.elements, ["check"]);
                } else if (liElement.parentElement.tagName === "OL") {
                  setCurrentToolbar(vditor.toolbar.elements, ["ordered-list"]);
                } else if (liElement.parentElement.tagName === "UL") {
                  setCurrentToolbar(vditor.toolbar.elements, ["list"]);
                }
                enableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
              } else {
                disableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
              }
              if ((0, hasClosest.lG)(typeElement, "BLOCKQUOTE")) {
                setCurrentToolbar(vditor.toolbar.elements, ["quote"]);
              }
              if ((0, hasClosest.lG)(typeElement, "B") || (0, hasClosest.lG)(typeElement, "STRONG")) {
                setCurrentToolbar(vditor.toolbar.elements, ["bold"]);
              }
              if ((0, hasClosest.lG)(typeElement, "I") || (0, hasClosest.lG)(typeElement, "EM")) {
                setCurrentToolbar(vditor.toolbar.elements, ["italic"]);
              }
              if ((0, hasClosest.lG)(typeElement, "STRIKE") || (0, hasClosest.lG)(typeElement, "S")) {
                setCurrentToolbar(vditor.toolbar.elements, ["strike"]);
              }
              vditor.wysiwyg.element.querySelectorAll(".vditor-comment--focus").forEach(function(item) {
                item.classList.remove("vditor-comment--focus");
              });
              var commentElement = (0, hasClosest.fb)(typeElement, "vditor-comment");
              if (commentElement) {
                var ids_1 = commentElement.getAttribute("data-cmtids").split(" ");
                if (ids_1.length > 1 && commentElement.nextSibling.isSameNode(commentElement.nextElementSibling)) {
                  var nextIds_1 = commentElement.nextElementSibling.getAttribute("data-cmtids").split(" ");
                  ids_1.find(function(id) {
                    if (nextIds_1.includes(id)) {
                      ids_1 = [id];
                      return true;
                    }
                  });
                }
                vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(item) {
                  if (item.getAttribute("data-cmtids").indexOf(ids_1[0]) > -1) {
                    item.classList.add("vditor-comment--focus");
                  }
                });
              }
              var aElement = (0, hasClosest.lG)(typeElement, "A");
              if (aElement) {
                setCurrentToolbar(vditor.toolbar.elements, ["link"]);
              }
              var tableElement = (0, hasClosest.lG)(typeElement, "TABLE");
              var headingElement = (0, hasClosestByHeadings.W)(typeElement);
              if ((0, hasClosest.lG)(typeElement, "CODE")) {
                if ((0, hasClosest.lG)(typeElement, "PRE")) {
                  disableToolbar(vditor.toolbar.elements, [
                    "headings",
                    "bold",
                    "italic",
                    "strike",
                    "line",
                    "quote",
                    "list",
                    "ordered-list",
                    "check",
                    "code",
                    "inline-code",
                    "upload",
                    "link",
                    "table",
                    "record"
                  ]);
                  setCurrentToolbar(vditor.toolbar.elements, ["code"]);
                } else {
                  disableToolbar(vditor.toolbar.elements, [
                    "headings",
                    "bold",
                    "italic",
                    "strike",
                    "line",
                    "quote",
                    "list",
                    "ordered-list",
                    "check",
                    "code",
                    "upload",
                    "link",
                    "table",
                    "record"
                  ]);
                  setCurrentToolbar(vditor.toolbar.elements, ["inline-code"]);
                }
              } else if (headingElement) {
                disableToolbar(vditor.toolbar.elements, ["bold"]);
                setCurrentToolbar(vditor.toolbar.elements, ["headings"]);
              } else if (tableElement) {
                disableToolbar(vditor.toolbar.elements, ["table"]);
              }
              var tocElement = (0, hasClosest.fb)(typeElement, "vditor-toc");
              if (tocElement) {
                vditor.wysiwyg.popover.innerHTML = "";
                genClose(tocElement, vditor);
                setPopoverPosition(vditor, tocElement);
                return;
              }
              var blockquoteElement = (0, hasClosestByHeadings.S)(typeElement, "BLOCKQUOTE");
              if (blockquoteElement) {
                vditor.wysiwyg.popover.innerHTML = "";
                genUp(range, blockquoteElement, vditor);
                genDown(range, blockquoteElement, vditor);
                genClose(blockquoteElement, vditor);
                setPopoverPosition(vditor, blockquoteElement);
              }
              if (liElement) {
                vditor.wysiwyg.popover.innerHTML = "";
                genUp(range, liElement, vditor);
                genDown(range, liElement, vditor);
                genClose(liElement, vditor);
                setPopoverPosition(vditor, liElement);
              }
              if (tableElement) {
                var lang = vditor.options.lang;
                var options = vditor.options;
                vditor.wysiwyg.popover.innerHTML = "";
                var updateTable_1 = function() {
                  var oldRow = tableElement.rows.length;
                  var oldColumn = tableElement.rows[0].cells.length;
                  var row = parseInt(input_1.value, 10) || oldRow;
                  var column = parseInt(input2_1.value, 10) || oldColumn;
                  if (row === oldRow && oldColumn === column) {
                    return;
                  }
                  if (oldColumn !== column) {
                    var columnDiff = column - oldColumn;
                    for (var i2 = 0; i2 < tableElement.rows.length; i2++) {
                      if (columnDiff > 0) {
                        for (var j = 0; j < columnDiff; j++) {
                          if (i2 === 0) {
                            tableElement.rows[i2].lastElementChild.insertAdjacentHTML("afterend", "<th> </th>");
                          } else {
                            tableElement.rows[i2].lastElementChild.insertAdjacentHTML("afterend", "<td> </td>");
                          }
                        }
                      } else {
                        for (var k = oldColumn - 1; k >= column; k--) {
                          tableElement.rows[i2].cells[k].remove();
                        }
                      }
                    }
                  }
                  if (oldRow !== row) {
                    var rowDiff = row - oldRow;
                    if (rowDiff > 0) {
                      var rowHTML = "<tr>";
                      for (var m = 0; m < column; m++) {
                        rowHTML += "<td> </td>";
                      }
                      for (var l = 0; l < rowDiff; l++) {
                        if (tableElement.querySelector("tbody")) {
                          tableElement.querySelector("tbody").insertAdjacentHTML("beforeend", rowHTML);
                        } else {
                          tableElement.querySelector("thead").insertAdjacentHTML("afterend", rowHTML + "</tr>");
                        }
                      }
                    } else {
                      for (var m = oldRow - 1; m >= row; m--) {
                        tableElement.rows[m].remove();
                        if (tableElement.rows.length === 1) {
                          tableElement.querySelector("tbody").remove();
                        }
                      }
                    }
                  }
                };
                var setAlign_1 = function(type) {
                  setTableAlign(tableElement, type);
                  if (type === "right") {
                    left_1.classList.remove("vditor-icon--current");
                    center_1.classList.remove("vditor-icon--current");
                    right_1.classList.add("vditor-icon--current");
                  } else if (type === "center") {
                    left_1.classList.remove("vditor-icon--current");
                    right_1.classList.remove("vditor-icon--current");
                    center_1.classList.add("vditor-icon--current");
                  } else {
                    center_1.classList.remove("vditor-icon--current");
                    right_1.classList.remove("vditor-icon--current");
                    left_1.classList.add("vditor-icon--current");
                  }
                  (0, selection.Hc)(range);
                  afterRenderEvent(vditor);
                };
                var td = (0, hasClosest.lG)(typeElement, "TD");
                var th = (0, hasClosest.lG)(typeElement, "TH");
                var alignType = "left";
                if (td) {
                  alignType = td.getAttribute("align") || "left";
                } else if (th) {
                  alignType = th.getAttribute("align") || "center";
                }
                var left_1 = document.createElement("button");
                left_1.setAttribute("type", "button");
                left_1.setAttribute("aria-label", window.VditorI18n.alignLeft + "<" + (0, compatibility.ns)("\u21E7\u2318L") + ">");
                left_1.setAttribute("data-type", "left");
                left_1.innerHTML = '<svg><use xlink:href="#vditor-icon-align-left"></use></svg>';
                left_1.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (alignType === "left" ? " vditor-icon--current" : "");
                left_1.onclick = function() {
                  setAlign_1("left");
                };
                var center_1 = document.createElement("button");
                center_1.setAttribute("type", "button");
                center_1.setAttribute("aria-label", window.VditorI18n.alignCenter + "<" + (0, compatibility.ns)("\u21E7\u2318C") + ">");
                center_1.setAttribute("data-type", "center");
                center_1.innerHTML = '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>';
                center_1.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (alignType === "center" ? " vditor-icon--current" : "");
                center_1.onclick = function() {
                  setAlign_1("center");
                };
                var right_1 = document.createElement("button");
                right_1.setAttribute("type", "button");
                right_1.setAttribute("aria-label", window.VditorI18n.alignRight + "<" + (0, compatibility.ns)("\u21E7\u2318R") + ">");
                right_1.setAttribute("data-type", "right");
                right_1.innerHTML = '<svg><use xlink:href="#vditor-icon-align-right"></use></svg>';
                right_1.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (alignType === "right" ? " vditor-icon--current" : "");
                right_1.onclick = function() {
                  setAlign_1("right");
                };
                var insertRowElement = document.createElement("button");
                insertRowElement.setAttribute("type", "button");
                insertRowElement.setAttribute("aria-label", window.VditorI18n.insertRowBelow + "<" + (0, compatibility.ns)("\u2318=") + ">");
                insertRowElement.setAttribute("data-type", "insertRow");
                insertRowElement.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-row"></use></svg>';
                insertRowElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
                insertRowElement.onclick = function() {
                  var startContainer = getSelection().getRangeAt(0).startContainer;
                  var cellElement = (0, hasClosest.lG)(startContainer, "TD") || (0, hasClosest.lG)(startContainer, "TH");
                  if (cellElement) {
                    insertRow(vditor, range, cellElement);
                  }
                };
                var insertRowBElement = document.createElement("button");
                insertRowBElement.setAttribute("type", "button");
                insertRowBElement.setAttribute("aria-label", window.VditorI18n.insertRowAbove + "<" + (0, compatibility.ns)("\u21E7\u2318F") + ">");
                insertRowBElement.setAttribute("data-type", "insertRow");
                insertRowBElement.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-rowb"></use></svg>';
                insertRowBElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
                insertRowBElement.onclick = function() {
                  var startContainer = getSelection().getRangeAt(0).startContainer;
                  var cellElement = (0, hasClosest.lG)(startContainer, "TD") || (0, hasClosest.lG)(startContainer, "TH");
                  if (cellElement) {
                    insertRowAbove(vditor, range, cellElement);
                  }
                };
                var insertColumnElement = document.createElement("button");
                insertColumnElement.setAttribute("type", "button");
                insertColumnElement.setAttribute("aria-label", window.VditorI18n.insertColumnRight + "<" + (0, compatibility.ns)("\u21E7\u2318=") + ">");
                insertColumnElement.setAttribute("data-type", "insertColumn");
                insertColumnElement.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-column"></use></svg>';
                insertColumnElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
                insertColumnElement.onclick = function() {
                  var startContainer = getSelection().getRangeAt(0).startContainer;
                  var cellElement = (0, hasClosest.lG)(startContainer, "TD") || (0, hasClosest.lG)(startContainer, "TH");
                  if (cellElement) {
                    insertColumn(vditor, tableElement, cellElement);
                  }
                };
                var insertColumnBElement = document.createElement("button");
                insertColumnBElement.setAttribute("type", "button");
                insertColumnBElement.setAttribute("aria-label", window.VditorI18n.insertColumnLeft + "<" + (0, compatibility.ns)("\u21E7\u2318G") + ">");
                insertColumnBElement.setAttribute("data-type", "insertColumn");
                insertColumnBElement.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-columnb"></use></svg>';
                insertColumnBElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
                insertColumnBElement.onclick = function() {
                  var startContainer = getSelection().getRangeAt(0).startContainer;
                  var cellElement = (0, hasClosest.lG)(startContainer, "TD") || (0, hasClosest.lG)(startContainer, "TH");
                  if (cellElement) {
                    insertColumn(vditor, tableElement, cellElement, "beforebegin");
                  }
                };
                var deleteRowElement = document.createElement("button");
                deleteRowElement.setAttribute("type", "button");
                deleteRowElement.setAttribute("aria-label", window.VditorI18n["delete-row"] + "<" + (0, compatibility.ns)("\u2318-") + ">");
                deleteRowElement.setAttribute("data-type", "deleteRow");
                deleteRowElement.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-row"></use></svg>';
                deleteRowElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
                deleteRowElement.onclick = function() {
                  var startContainer = getSelection().getRangeAt(0).startContainer;
                  var cellElement = (0, hasClosest.lG)(startContainer, "TD") || (0, hasClosest.lG)(startContainer, "TH");
                  if (cellElement) {
                    deleteRow(vditor, range, cellElement);
                  }
                };
                var deleteColumnElement = document.createElement("button");
                deleteColumnElement.setAttribute("type", "button");
                deleteColumnElement.setAttribute("aria-label", window.VditorI18n["delete-column"] + "<" + (0, compatibility.ns)("\u21E7\u2318-") + ">");
                deleteColumnElement.setAttribute("data-type", "deleteColumn");
                deleteColumnElement.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-column"></use></svg>';
                deleteColumnElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
                deleteColumnElement.onclick = function() {
                  var startContainer = getSelection().getRangeAt(0).startContainer;
                  var cellElement = (0, hasClosest.lG)(startContainer, "TD") || (0, hasClosest.lG)(startContainer, "TH");
                  if (cellElement) {
                    deleteColumn(vditor, range, tableElement, cellElement);
                  }
                };
                var inputWrap = document.createElement("span");
                inputWrap.setAttribute("aria-label", window.VditorI18n.row);
                inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
                var input_1 = document.createElement("input");
                inputWrap.appendChild(input_1);
                input_1.type = "number";
                input_1.min = "1";
                input_1.className = "vditor-input";
                input_1.style.width = "42px";
                input_1.style.textAlign = "center";
                input_1.setAttribute("placeholder", window.VditorI18n.row);
                input_1.value = tableElement.rows.length.toString();
                input_1.oninput = function() {
                  updateTable_1();
                };
                input_1.onkeydown = function(event) {
                  if (event.isComposing) {
                    return;
                  }
                  if (event.key === "Tab") {
                    input2_1.focus();
                    input2_1.select();
                    event.preventDefault();
                    return;
                  }
                  removeBlockElement(vditor, event);
                };
                var input2Wrap = document.createElement("span");
                input2Wrap.setAttribute("aria-label", window.VditorI18n.column);
                input2Wrap.className = "vditor-tooltipped vditor-tooltipped__n";
                var input2_1 = document.createElement("input");
                input2Wrap.appendChild(input2_1);
                input2_1.type = "number";
                input2_1.min = "1";
                input2_1.className = "vditor-input";
                input2_1.style.width = "42px";
                input2_1.style.textAlign = "center";
                input2_1.setAttribute("placeholder", window.VditorI18n.column);
                input2_1.value = tableElement.rows[0].cells.length.toString();
                input2_1.oninput = function() {
                  updateTable_1();
                };
                input2_1.onkeydown = function(event) {
                  if (event.isComposing) {
                    return;
                  }
                  if (event.key === "Tab") {
                    input_1.focus();
                    input_1.select();
                    event.preventDefault();
                    return;
                  }
                  removeBlockElement(vditor, event);
                };
                genUp(range, tableElement, vditor);
                genDown(range, tableElement, vditor);
                genClose(tableElement, vditor);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", left_1);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", center_1);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", right_1);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", insertRowBElement);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", insertRowElement);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", insertColumnBElement);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", insertColumnElement);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", deleteRowElement);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", deleteColumnElement);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
                vditor.wysiwyg.popover.insertAdjacentHTML("beforeend", " x ");
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", input2Wrap);
                setPopoverPosition(vditor, tableElement);
              }
              var linkRefElement = (0, hasClosest.a1)(typeElement, "data-type", "link-ref");
              if (linkRefElement) {
                genLinkRefPopover(vditor, linkRefElement);
              }
              var footnotesRefElement = (0, hasClosest.a1)(typeElement, "data-type", "footnotes-ref");
              if (footnotesRefElement) {
                var lang = vditor.options.lang;
                var options = vditor.options;
                vditor.wysiwyg.popover.innerHTML = "";
                var inputWrap = document.createElement("span");
                inputWrap.setAttribute("aria-label", window.VditorI18n.footnoteRef + "<" + (0, compatibility.ns)("\u2325Enter") + ">");
                inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
                var input_2 = document.createElement("input");
                inputWrap.appendChild(input_2);
                input_2.className = "vditor-input";
                input_2.setAttribute("placeholder", window.VditorI18n.footnoteRef + "<" + (0, compatibility.ns)("\u2325Enter") + ">");
                input_2.style.width = "120px";
                input_2.value = footnotesRefElement.getAttribute("data-footnotes-label");
                input_2.oninput = function() {
                  if (input_2.value.trim() !== "") {
                    footnotesRefElement.setAttribute("data-footnotes-label", input_2.value);
                  }
                };
                input_2.onkeydown = function(event) {
                  if (event.isComposing) {
                    return;
                  }
                  if (!(0, compatibility.yl)(event) && !event.shiftKey && event.altKey && event.key === "Enter") {
                    range.selectNodeContents(footnotesRefElement);
                    range.collapse(false);
                    (0, selection.Hc)(range);
                    event.preventDefault();
                    return;
                  }
                  removeBlockElement(vditor, event);
                };
                genClose(footnotesRefElement, vditor);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
                setPopoverPosition(vditor, footnotesRefElement);
              }
              var blockRenderElement = (0, hasClosest.fb)(typeElement, "vditor-wysiwyg__block");
              if (blockRenderElement && blockRenderElement.getAttribute("data-type").indexOf("block") > -1) {
                var lang = vditor.options.lang;
                var options = vditor.options;
                vditor.wysiwyg.popover.innerHTML = "";
                genUp(range, blockRenderElement, vditor);
                genDown(range, blockRenderElement, vditor);
                genClose(blockRenderElement, vditor);
                if (blockRenderElement.getAttribute("data-type") === "code-block") {
                  var languageWrap = document.createElement("span");
                  languageWrap.setAttribute("aria-label", window.VditorI18n.language + "<" + (0, compatibility.ns)("\u2325Enter") + ">");
                  languageWrap.className = "vditor-tooltipped vditor-tooltipped__n";
                  var language_1 = document.createElement("input");
                  languageWrap.appendChild(language_1);
                  var codeElement_1 = blockRenderElement.firstElementChild.firstElementChild;
                  language_1.className = "vditor-input";
                  language_1.setAttribute("placeholder", window.VditorI18n.language + "<" + (0, compatibility.ns)("\u2325Enter") + ">");
                  language_1.value = codeElement_1.className.indexOf("language-") > -1 ? codeElement_1.className.split("-")[1].split(" ")[0] : "";
                  language_1.oninput = function() {
                    if (language_1.value.trim() !== "") {
                      codeElement_1.className = "language-" + language_1.value;
                    } else {
                      codeElement_1.className = "";
                      vditor.hint.recentLanguage = "";
                    }
                    if (blockRenderElement.lastElementChild.classList.contains("vditor-wysiwyg__preview")) {
                      blockRenderElement.lastElementChild.innerHTML = blockRenderElement.firstElementChild.innerHTML;
                      processCodeRender(blockRenderElement.lastElementChild, vditor);
                    }
                    afterRenderEvent(vditor);
                  };
                  language_1.onkeydown = function(event) {
                    if (event.isComposing) {
                      return;
                    }
                    if (removeBlockElement(vditor, event)) {
                      return;
                    }
                    if (event.key === "Escape" && vditor.hint.element.style.display === "block") {
                      vditor.hint.element.style.display = "none";
                      event.preventDefault();
                      return;
                    }
                    if (!(0, compatibility.yl)(event) && !event.shiftKey && event.altKey && event.key === "Enter") {
                      range.setStart(codeElement_1.firstChild, 0);
                      range.collapse(true);
                      (0, selection.Hc)(range);
                    }
                    vditor.hint.select(event, vditor);
                  };
                  language_1.onkeyup = function(event) {
                    if (event.isComposing || event.key === "Enter" || event.key === "ArrowUp" || event.key === "Escape" || event.key === "ArrowDown") {
                      return;
                    }
                    var matchLangData = [];
                    var key = language_1.value.substring(0, language_1.selectionStart);
                    constants.g.CODE_LANGUAGES.forEach(function(keyName) {
                      if (keyName.indexOf(key.toLowerCase()) > -1) {
                        matchLangData.push({
                          html: keyName,
                          value: keyName
                        });
                      }
                    });
                    vditor.hint.genHTML(matchLangData, key, vditor);
                    event.preventDefault();
                  };
                  vditor.wysiwyg.popover.insertAdjacentElement("beforeend", languageWrap);
                }
                setPopoverPosition(vditor, blockRenderElement);
              } else {
                if (!blockRenderElement) {
                  vditor.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(itemElement) {
                    var previousElement = itemElement.previousElementSibling;
                    previousElement.style.display = "none";
                  });
                }
                blockRenderElement = void 0;
              }
              if (headingElement) {
                vditor.wysiwyg.popover.innerHTML = "";
                var inputWrap = document.createElement("span");
                inputWrap.setAttribute("aria-label", "ID<" + (0, compatibility.ns)("\u2325Enter") + ">");
                inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
                var input_3 = document.createElement("input");
                inputWrap.appendChild(input_3);
                input_3.className = "vditor-input";
                input_3.setAttribute("placeholder", "ID<" + (0, compatibility.ns)("\u2325Enter") + ">");
                input_3.style.width = "120px";
                input_3.value = headingElement.getAttribute("data-id") || "";
                input_3.oninput = function() {
                  headingElement.setAttribute("data-id", input_3.value);
                };
                input_3.onkeydown = function(event) {
                  if (event.isComposing) {
                    return;
                  }
                  if (!(0, compatibility.yl)(event) && !event.shiftKey && event.altKey && event.key === "Enter") {
                    range.selectNodeContents(headingElement);
                    range.collapse(false);
                    (0, selection.Hc)(range);
                    event.preventDefault();
                    return;
                  }
                  removeBlockElement(vditor, event);
                };
                genUp(range, headingElement, vditor);
                genDown(range, headingElement, vditor);
                genClose(headingElement, vditor);
                vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
                setPopoverPosition(vditor, headingElement);
              }
              if (aElement) {
                genAPopover(vditor, aElement);
              }
              if (!blockquoteElement && !liElement && !tableElement && !blockRenderElement && !aElement && !linkRefElement && !footnotesRefElement && !headingElement && !tocElement) {
                var blockElement = (0, hasClosest.a1)(typeElement, "data-block", "0");
                if (blockElement && blockElement.parentElement.isEqualNode(vditor.wysiwyg.element)) {
                  vditor.wysiwyg.popover.innerHTML = "";
                  genUp(range, blockElement, vditor);
                  genDown(range, blockElement, vditor);
                  genClose(blockElement, vditor);
                  setPopoverPosition(vditor, blockElement);
                } else {
                  vditor.wysiwyg.popover.style.display = "none";
                }
              }
              vditor.wysiwyg.element.querySelectorAll('span[data-type="backslash"] > span').forEach(function(item) {
                item.style.display = "none";
              });
              var backslashElement = (0, hasClosest.a1)(range.startContainer, "data-type", "backslash");
              if (backslashElement) {
                backslashElement.querySelector("span").style.display = "inline";
              }
            }, 200);
          };
          var setPopoverPosition = function(vditor, element) {
            var targetElement = element;
            var tableElement = (0, hasClosest.lG)(element, "TABLE");
            if (tableElement) {
              targetElement = tableElement;
            }
            vditor.wysiwyg.popover.style.left = "0";
            vditor.wysiwyg.popover.style.display = "block";
            vditor.wysiwyg.popover.style.top = Math.max(-8, targetElement.offsetTop - 21 - vditor.wysiwyg.element.scrollTop) + "px";
            vditor.wysiwyg.popover.style.left = Math.min(targetElement.offsetLeft, vditor.wysiwyg.element.clientWidth - vditor.wysiwyg.popover.clientWidth) + "px";
            vditor.wysiwyg.popover.setAttribute("data-top", (targetElement.offsetTop - 21).toString());
          };
          var genLinkRefPopover = function(vditor, linkRefElement) {
            vditor.wysiwyg.popover.innerHTML = "";
            var updateLinkRef = function() {
              if (input2.value.trim() !== "") {
                if (linkRefElement.tagName === "IMG") {
                  linkRefElement.setAttribute("alt", input2.value);
                } else {
                  linkRefElement.textContent = input2.value;
                }
              }
              if (input1.value.trim() !== "") {
                linkRefElement.setAttribute("data-link-label", input1.value);
              }
            };
            var inputWrap = document.createElement("span");
            inputWrap.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty);
            inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
            var input2 = document.createElement("input");
            inputWrap.appendChild(input2);
            input2.className = "vditor-input";
            input2.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty);
            input2.style.width = "120px";
            input2.value = linkRefElement.getAttribute("alt") || linkRefElement.textContent;
            input2.oninput = function() {
              updateLinkRef();
            };
            input2.onkeydown = function(event) {
              if (removeBlockElement(vditor, event)) {
                return;
              }
              linkHotkey(vditor, linkRefElement, event, input1);
            };
            var input1Wrap = document.createElement("span");
            input1Wrap.setAttribute("aria-label", window.VditorI18n.linkRef);
            input1Wrap.className = "vditor-tooltipped vditor-tooltipped__n";
            var input1 = document.createElement("input");
            input1Wrap.appendChild(input1);
            input1.className = "vditor-input";
            input1.setAttribute("placeholder", window.VditorI18n.linkRef);
            input1.value = linkRefElement.getAttribute("data-link-label");
            input1.oninput = function() {
              updateLinkRef();
            };
            input1.onkeydown = function(event) {
              if (removeBlockElement(vditor, event)) {
                return;
              }
              linkHotkey(vditor, linkRefElement, event, input2);
            };
            genClose(linkRefElement, vditor);
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", input1Wrap);
            setPopoverPosition(vditor, linkRefElement);
          };
          var genUp = function(range, element, vditor) {
            var previousElement = element.previousElementSibling;
            if (!previousElement || !element.parentElement.isEqualNode(vditor.wysiwyg.element) && element.tagName !== "LI") {
              return;
            }
            var upElement = document.createElement("button");
            upElement.setAttribute("type", "button");
            upElement.setAttribute("data-type", "up");
            upElement.setAttribute("aria-label", window.VditorI18n.up + "<" + (0, compatibility.ns)("\u21E7\u2318U") + ">");
            upElement.innerHTML = '<svg><use xlink:href="#vditor-icon-up"></use></svg>';
            upElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
            upElement.onclick = function() {
              range.insertNode(document.createElement("wbr"));
              previousElement.insertAdjacentElement("beforebegin", element);
              (0, selection.ib)(vditor.wysiwyg.element, range);
              afterRenderEvent(vditor);
              highlightToolbarWYSIWYG(vditor);
              scrollCenter(vditor);
            };
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", upElement);
          };
          var genDown = function(range, element, vditor) {
            var nextElement = element.nextElementSibling;
            if (!nextElement || !element.parentElement.isEqualNode(vditor.wysiwyg.element) && element.tagName !== "LI") {
              return;
            }
            var downElement = document.createElement("button");
            downElement.setAttribute("type", "button");
            downElement.setAttribute("data-type", "down");
            downElement.setAttribute("aria-label", window.VditorI18n.down + "<" + (0, compatibility.ns)("\u21E7\u2318D") + ">");
            downElement.innerHTML = '<svg><use xlink:href="#vditor-icon-down"></use></svg>';
            downElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
            downElement.onclick = function() {
              range.insertNode(document.createElement("wbr"));
              nextElement.insertAdjacentElement("afterend", element);
              (0, selection.ib)(vditor.wysiwyg.element, range);
              afterRenderEvent(vditor);
              highlightToolbarWYSIWYG(vditor);
              scrollCenter(vditor);
            };
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", downElement);
          };
          var genClose = function(element, vditor) {
            var close = document.createElement("button");
            close.setAttribute("type", "button");
            close.setAttribute("data-type", "remove");
            close.setAttribute("aria-label", window.VditorI18n.remove + "<" + (0, compatibility.ns)("\u21E7\u2318X") + ">");
            close.innerHTML = '<svg><use xlink:href="#vditor-icon-trashcan"></use></svg>';
            close.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
            close.onclick = function() {
              var range = (0, selection.zh)(vditor);
              range.setStartAfter(element);
              (0, selection.Hc)(range);
              element.remove();
              afterRenderEvent(vditor);
              highlightToolbarWYSIWYG(vditor);
            };
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", close);
          };
          var linkHotkey = function(vditor, element, event, nextInputElement) {
            if (event.isComposing) {
              return;
            }
            if (event.key === "Tab") {
              nextInputElement.focus();
              nextInputElement.select();
              event.preventDefault();
              return;
            }
            if (!(0, compatibility.yl)(event) && !event.shiftKey && event.altKey && event.key === "Enter") {
              var range = (0, selection.zh)(vditor);
              element.insertAdjacentHTML("afterend", constants.g.ZWSP);
              range.setStartAfter(element.nextSibling);
              range.collapse(true);
              (0, selection.Hc)(range);
              event.preventDefault();
            }
          };
          var genAPopover = function(vditor, aElement) {
            var lang = vditor.options.lang;
            var options = vditor.options;
            vditor.wysiwyg.popover.innerHTML = "";
            var updateA = function() {
              if (input2.value.trim() !== "") {
                aElement.innerHTML = input2.value;
              }
              aElement.setAttribute("href", input1.value);
              aElement.setAttribute("title", input22.value);
            };
            aElement.querySelectorAll("[data-marker]").forEach(function(item) {
              item.removeAttribute("data-marker");
            });
            var inputWrap = document.createElement("span");
            inputWrap.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty);
            inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
            var input2 = document.createElement("input");
            inputWrap.appendChild(input2);
            input2.className = "vditor-input";
            input2.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty);
            input2.style.width = "120px";
            input2.value = aElement.innerHTML || "";
            input2.oninput = function() {
              updateA();
            };
            input2.onkeydown = function(event) {
              if (removeBlockElement(vditor, event)) {
                return;
              }
              linkHotkey(vditor, aElement, event, input1);
            };
            var input1Wrap = document.createElement("span");
            input1Wrap.setAttribute("aria-label", window.VditorI18n.link);
            input1Wrap.className = "vditor-tooltipped vditor-tooltipped__n";
            var input1 = document.createElement("input");
            input1Wrap.appendChild(input1);
            input1.className = "vditor-input";
            input1.setAttribute("placeholder", window.VditorI18n.link);
            input1.value = aElement.getAttribute("href") || "";
            input1.oninput = function() {
              updateA();
            };
            input1.onkeydown = function(event) {
              if (removeBlockElement(vditor, event)) {
                return;
              }
              linkHotkey(vditor, aElement, event, input22);
            };
            var input2Wrap = document.createElement("span");
            input2Wrap.setAttribute("aria-label", window.VditorI18n.tooltipText);
            input2Wrap.className = "vditor-tooltipped vditor-tooltipped__n";
            var input22 = document.createElement("input");
            input2Wrap.appendChild(input22);
            input22.className = "vditor-input";
            input22.setAttribute("placeholder", window.VditorI18n.tooltipText);
            input22.style.width = "60px";
            input22.value = aElement.getAttribute("title") || "";
            input22.oninput = function() {
              updateA();
            };
            input22.onkeydown = function(event) {
              if (removeBlockElement(vditor, event)) {
                return;
              }
              linkHotkey(vditor, aElement, event, input2);
            };
            genClose(aElement, vditor);
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", input1Wrap);
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", input2Wrap);
            setPopoverPosition(vditor, aElement);
          };
          var genImagePopover = function(event, vditor) {
            var imgElement = event.target;
            vditor.wysiwyg.popover.innerHTML = "";
            var updateImg = function() {
              imgElement.setAttribute("src", inputElement.value);
              imgElement.setAttribute("alt", alt.value);
              imgElement.setAttribute("title", title.value);
            };
            var inputWrap = document.createElement("span");
            inputWrap.setAttribute("aria-label", window.VditorI18n.imageURL);
            inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
            var inputElement = document.createElement("input");
            inputWrap.appendChild(inputElement);
            inputElement.className = "vditor-input";
            inputElement.setAttribute("placeholder", window.VditorI18n.imageURL);
            inputElement.value = imgElement.getAttribute("src") || "";
            inputElement.oninput = function() {
              updateImg();
            };
            inputElement.onkeydown = function(elementEvent) {
              removeBlockElement(vditor, elementEvent);
            };
            var altWrap = document.createElement("span");
            altWrap.setAttribute("aria-label", window.VditorI18n.alternateText);
            altWrap.className = "vditor-tooltipped vditor-tooltipped__n";
            var alt = document.createElement("input");
            altWrap.appendChild(alt);
            alt.className = "vditor-input";
            alt.setAttribute("placeholder", window.VditorI18n.alternateText);
            alt.style.width = "52px";
            alt.value = imgElement.getAttribute("alt") || "";
            alt.oninput = function() {
              updateImg();
            };
            alt.onkeydown = function(elementEvent) {
              removeBlockElement(vditor, elementEvent);
            };
            var titleWrap = document.createElement("span");
            titleWrap.setAttribute("aria-label", window.VditorI18n.title);
            titleWrap.className = "vditor-tooltipped vditor-tooltipped__n";
            var title = document.createElement("input");
            titleWrap.appendChild(title);
            title.className = "vditor-input";
            title.setAttribute("placeholder", window.VditorI18n.title);
            title.value = imgElement.getAttribute("title") || "";
            title.oninput = function() {
              updateImg();
            };
            title.onkeydown = function(elementEvent) {
              removeBlockElement(vditor, elementEvent);
            };
            genClose(imgElement, vditor);
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", altWrap);
            vditor.wysiwyg.popover.insertAdjacentElement("beforeend", titleWrap);
            setPopoverPosition(vditor, imgElement);
          };
          ;
          var highlightToolbar = function(vditor) {
            if (vditor.currentMode === "wysiwyg") {
              highlightToolbarWYSIWYG(vditor);
            } else if (vditor.currentMode === "ir") {
              highlightToolbarIR(vditor);
            }
          };
          ;
          var renderDomByMd = function(vditor, md, options) {
            if (options === void 0) {
              options = {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: true
              };
            }
            var editorElement = vditor.wysiwyg.element;
            editorElement.innerHTML = vditor.lute.Md2VditorDOM(md);
            editorElement.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(item) {
              processCodeRender(item, vditor);
              item.previousElementSibling.setAttribute("style", "display:none");
            });
            afterRenderEvent(vditor, options);
          };
          ;
          var cancelBES = function(range, vditor, commandName) {
            var element = range.startContainer.parentElement;
            var jump = false;
            var lastTagName = "";
            var lastEndTagName = "";
            var splitHTML = splitElement(range);
            var lastBeforeHTML = splitHTML.beforeHTML;
            var lastAfterHTML = splitHTML.afterHTML;
            while (element && !jump) {
              var tagName = element.tagName;
              if (tagName === "STRIKE") {
                tagName = "S";
              }
              if (tagName === "I") {
                tagName = "EM";
              }
              if (tagName === "B") {
                tagName = "STRONG";
              }
              if (tagName === "S" || tagName === "STRONG" || tagName === "EM") {
                var insertHTML = "";
                var previousHTML = "";
                var nextHTML = "";
                if (element.parentElement.getAttribute("data-block") !== "0") {
                  previousHTML = getPreviousHTML(element);
                  nextHTML = getNextHTML(element);
                }
                if (lastBeforeHTML || previousHTML) {
                  insertHTML = previousHTML + "<" + tagName + ">" + lastBeforeHTML + "</" + tagName + ">";
                  lastBeforeHTML = insertHTML;
                }
                if (commandName === "bold" && tagName === "STRONG" || commandName === "italic" && tagName === "EM" || commandName === "strikeThrough" && tagName === "S") {
                  insertHTML += "" + lastTagName + constants.g.ZWSP + "<wbr>" + lastEndTagName;
                  jump = true;
                }
                if (lastAfterHTML || nextHTML) {
                  lastAfterHTML = "<" + tagName + ">" + lastAfterHTML + "</" + tagName + ">" + nextHTML;
                  insertHTML += lastAfterHTML;
                }
                if (element.parentElement.getAttribute("data-block") !== "0") {
                  element = element.parentElement;
                  element.innerHTML = insertHTML;
                } else {
                  element.outerHTML = insertHTML;
                  element = element.parentElement;
                }
                lastTagName = "<" + tagName + ">" + lastTagName;
                lastEndTagName = "</" + tagName + ">" + lastEndTagName;
              } else {
                jump = true;
              }
            }
            (0, selection.ib)(vditor.wysiwyg.element, range);
          };
          var toolbarEvent = function(vditor, actionBtn, event) {
            if (vditor.wysiwyg.composingLock && event instanceof CustomEvent) {
              return;
            }
            var useHighlight = true;
            var useRender = true;
            if (vditor.wysiwyg.element.querySelector("wbr")) {
              vditor.wysiwyg.element.querySelector("wbr").remove();
            }
            var range = (0, selection.zh)(vditor);
            var commandName = actionBtn.getAttribute("data-type");
            if (actionBtn.classList.contains("vditor-menu--current")) {
              if (commandName === "strike") {
                commandName = "strikeThrough";
              }
              if (commandName === "quote") {
                var quoteElement = (0, hasClosest.lG)(range.startContainer, "BLOCKQUOTE");
                if (!quoteElement) {
                  quoteElement = range.startContainer.childNodes[range.startOffset];
                }
                if (quoteElement) {
                  useHighlight = false;
                  actionBtn.classList.remove("vditor-menu--current");
                  range.insertNode(document.createElement("wbr"));
                  quoteElement.outerHTML = quoteElement.innerHTML.trim() === "" ? '<p data-block="0">' + quoteElement.innerHTML + "</p>" : quoteElement.innerHTML;
                  (0, selection.ib)(vditor.wysiwyg.element, range);
                }
              } else if (commandName === "inline-code") {
                var inlineCodeElement = (0, hasClosest.lG)(range.startContainer, "CODE");
                if (!inlineCodeElement) {
                  inlineCodeElement = range.startContainer.childNodes[range.startOffset];
                }
                if (inlineCodeElement) {
                  inlineCodeElement.outerHTML = inlineCodeElement.innerHTML.replace(constants.g.ZWSP, "") + "<wbr>";
                  (0, selection.ib)(vditor.wysiwyg.element, range);
                }
              } else if (commandName === "link") {
                if (!range.collapsed) {
                  document.execCommand("unlink", false, "");
                } else {
                  range.selectNode(range.startContainer.parentElement);
                  document.execCommand("unlink", false, "");
                }
              } else if (commandName === "check" || commandName === "list" || commandName === "ordered-list") {
                listToggle(vditor, range, commandName);
                (0, selection.ib)(vditor.wysiwyg.element, range);
                useHighlight = false;
                actionBtn.classList.remove("vditor-menu--current");
              } else {
                useHighlight = false;
                actionBtn.classList.remove("vditor-menu--current");
                if (range.toString() === "") {
                  cancelBES(range, vditor, commandName);
                } else {
                  document.execCommand(commandName, false, "");
                }
              }
            } else {
              if (vditor.wysiwyg.element.childNodes.length === 0) {
                vditor.wysiwyg.element.innerHTML = '<p data-block="0"><wbr></p>';
                (0, selection.ib)(vditor.wysiwyg.element, range);
              }
              var blockElement = (0, hasClosest.F9)(range.startContainer);
              if (commandName === "quote") {
                if (!blockElement) {
                  blockElement = range.startContainer.childNodes[range.startOffset];
                }
                if (blockElement) {
                  useHighlight = false;
                  actionBtn.classList.add("vditor-menu--current");
                  range.insertNode(document.createElement("wbr"));
                  var liElement = (0, hasClosest.lG)(range.startContainer, "LI");
                  if (liElement && blockElement.contains(liElement)) {
                    liElement.innerHTML = '<blockquote data-block="0">' + liElement.innerHTML + "</blockquote>";
                  } else {
                    blockElement.outerHTML = '<blockquote data-block="0">' + blockElement.outerHTML + "</blockquote>";
                  }
                  (0, selection.ib)(vditor.wysiwyg.element, range);
                }
              } else if (commandName === "check" || commandName === "list" || commandName === "ordered-list") {
                listToggle(vditor, range, commandName, false);
                (0, selection.ib)(vditor.wysiwyg.element, range);
                useHighlight = false;
                removeCurrentToolbar(vditor.toolbar.elements, ["check", "list", "ordered-list"]);
                actionBtn.classList.add("vditor-menu--current");
              } else if (commandName === "inline-code") {
                if (range.toString() === "") {
                  var node = document.createElement("code");
                  node.textContent = constants.g.ZWSP;
                  range.insertNode(node);
                  range.setStart(node.firstChild, 1);
                  range.collapse(true);
                  (0, selection.Hc)(range);
                } else if (range.startContainer.nodeType === 3) {
                  var node = document.createElement("code");
                  range.surroundContents(node);
                  range.insertNode(node);
                  (0, selection.Hc)(range);
                }
                actionBtn.classList.add("vditor-menu--current");
              } else if (commandName === "code") {
                var node = document.createElement("div");
                node.className = "vditor-wysiwyg__block";
                node.setAttribute("data-type", "code-block");
                node.setAttribute("data-block", "0");
                node.setAttribute("data-marker", "```");
                if (range.toString() === "") {
                  node.innerHTML = "<pre><code><wbr>\n</code></pre>";
                } else {
                  node.innerHTML = "<pre><code>" + range.toString() + "<wbr></code></pre>";
                  range.deleteContents();
                }
                range.insertNode(node);
                if (blockElement) {
                  blockElement.outerHTML = vditor.lute.SpinVditorDOM(blockElement.outerHTML);
                }
                (0, selection.ib)(vditor.wysiwyg.element, range);
                vditor.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(item) {
                  processCodeRender(item, vditor);
                });
                actionBtn.classList.add("vditor-menu--disabled");
              } else if (commandName === "link") {
                if (range.toString() === "") {
                  var aElement = document.createElement("a");
                  aElement.innerText = constants.g.ZWSP;
                  range.insertNode(aElement);
                  range.setStart(aElement.firstChild, 1);
                  range.collapse(true);
                  genAPopover(vditor, aElement);
                  var textInputElement = vditor.wysiwyg.popover.querySelector("input");
                  textInputElement.value = "";
                  textInputElement.focus();
                  useRender = false;
                } else {
                  var node = document.createElement("a");
                  node.setAttribute("href", "");
                  node.innerHTML = range.toString();
                  range.surroundContents(node);
                  range.insertNode(node);
                  (0, selection.Hc)(range);
                  genAPopover(vditor, node);
                  var textInputElements = vditor.wysiwyg.popover.querySelectorAll("input");
                  textInputElements[0].value = node.innerText;
                  textInputElements[1].focus();
                }
                useHighlight = false;
                actionBtn.classList.add("vditor-menu--current");
              } else if (commandName === "table") {
                var tableHTML_1 = '<table data-block="0"><thead><tr><th>col1<wbr></th><th>col2</th><th>col3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table>';
                if (range.toString().trim() === "") {
                  if (blockElement && blockElement.innerHTML.trim().replace(constants.g.ZWSP, "") === "") {
                    blockElement.outerHTML = tableHTML_1;
                  } else {
                    document.execCommand("insertHTML", false, tableHTML_1);
                  }
                  range.selectNode(vditor.wysiwyg.element.querySelector("wbr").previousSibling);
                  vditor.wysiwyg.element.querySelector("wbr").remove();
                  (0, selection.Hc)(range);
                } else {
                  tableHTML_1 = '<table data-block="0"><thead><tr>';
                  var tableText = range.toString().split("\n");
                  var delimiter_1 = tableText[0].split(",").length > tableText[0].split("	").length ? "," : "	";
                  tableText.forEach(function(rows, index) {
                    if (index === 0) {
                      rows.split(delimiter_1).forEach(function(header, subIndex) {
                        if (subIndex === 0) {
                          tableHTML_1 += "<th>" + header + "<wbr></th>";
                        } else {
                          tableHTML_1 += "<th>" + header + "</th>";
                        }
                      });
                      tableHTML_1 += "</tr></thead>";
                    } else {
                      if (index === 1) {
                        tableHTML_1 += "<tbody><tr>";
                      } else {
                        tableHTML_1 += "<tr>";
                      }
                      rows.split(delimiter_1).forEach(function(cell) {
                        tableHTML_1 += "<td>" + cell + "</td>";
                      });
                      tableHTML_1 += "</tr>";
                    }
                  });
                  tableHTML_1 += "</tbody></table>";
                  document.execCommand("insertHTML", false, tableHTML_1);
                  (0, selection.ib)(vditor.wysiwyg.element, range);
                }
                useHighlight = false;
                actionBtn.classList.add("vditor-menu--disabled");
              } else if (commandName === "line") {
                if (blockElement) {
                  var hrHTML = '<hr data-block="0"><p data-block="0"><wbr>\n</p>';
                  if (blockElement.innerHTML.trim() === "") {
                    blockElement.outerHTML = hrHTML;
                  } else {
                    blockElement.insertAdjacentHTML("afterend", hrHTML);
                  }
                  (0, selection.ib)(vditor.wysiwyg.element, range);
                }
              } else {
                useHighlight = false;
                actionBtn.classList.add("vditor-menu--current");
                if (commandName === "strike") {
                  commandName = "strikeThrough";
                }
                if (range.toString() === "" && (commandName === "bold" || commandName === "italic" || commandName === "strikeThrough")) {
                  var tagName = "strong";
                  if (commandName === "italic") {
                    tagName = "em";
                  } else if (commandName === "strikeThrough") {
                    tagName = "s";
                  }
                  var node = document.createElement(tagName);
                  node.textContent = constants.g.ZWSP;
                  range.insertNode(node);
                  if (node.previousSibling && node.previousSibling.textContent === constants.g.ZWSP) {
                    node.previousSibling.textContent = "";
                  }
                  range.setStart(node.firstChild, 1);
                  range.collapse(true);
                  (0, selection.Hc)(range);
                } else {
                  document.execCommand(commandName, false, "");
                }
              }
            }
            if (useHighlight) {
              highlightToolbarWYSIWYG(vditor);
            }
            if (useRender) {
              afterRenderEvent(vditor);
            }
          };
          ;
          var MenuItem = function() {
            function MenuItem2(vditor, menuItem) {
              var _a;
              var _this = this;
              this.element = document.createElement("div");
              if (menuItem.className) {
                (_a = this.element.classList).add.apply(_a, menuItem.className.split(" "));
              }
              var hotkey = menuItem.hotkey ? " <" + (0, compatibility.ns)(menuItem.hotkey) + ">" : "";
              if (menuItem.level === 2) {
                hotkey = menuItem.hotkey ? " &lt;" + (0, compatibility.ns)(menuItem.hotkey) + "&gt;" : "";
              }
              var tip = menuItem.tip ? menuItem.tip + hotkey : "" + window.VditorI18n[menuItem.name] + hotkey;
              var tagName = menuItem.name === "upload" ? "div" : "button";
              if (menuItem.level === 2) {
                this.element.innerHTML = "<" + tagName + ' data-type="' + menuItem.name + '">' + tip + "</" + tagName + ">";
              } else {
                this.element.classList.add("vditor-toolbar__item");
                var iconElement = document.createElement(tagName);
                iconElement.setAttribute("data-type", menuItem.name);
                iconElement.className = "vditor-tooltipped vditor-tooltipped__" + menuItem.tipPosition;
                iconElement.setAttribute("aria-label", tip);
                iconElement.innerHTML = menuItem.icon;
                this.element.appendChild(iconElement);
              }
              if (!menuItem.prefix) {
                return;
              }
              this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                if (vditor.currentMode === "wysiwyg") {
                  toolbarEvent(vditor, _this.element.children[0], event);
                } else if (vditor.currentMode === "ir") {
                  process_processToolbar(vditor, _this.element.children[0], menuItem.prefix || "", menuItem.suffix || "");
                } else {
                  processToolbar(vditor, _this.element.children[0], menuItem.prefix || "", menuItem.suffix || "");
                }
              });
            }
            return MenuItem2;
          }();
          ;
          var __extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var setEditMode = function(vditor, type, event) {
            var markdownText;
            if (typeof event !== "string") {
              hidePanel(vditor, ["subToolbar", "hint"]);
              event.preventDefault();
              markdownText = getMarkdown(vditor);
            } else {
              markdownText = event;
            }
            if (vditor.currentMode === type && typeof event !== "string") {
              return;
            }
            if (vditor.devtools) {
              vditor.devtools.renderEchart(vditor);
            }
            if (vditor.options.preview.mode === "both" && type === "sv") {
              vditor.preview.element.style.display = "block";
            } else {
              vditor.preview.element.style.display = "none";
            }
            enableToolbar(vditor.toolbar.elements, constants.g.EDIT_TOOLBARS);
            removeCurrentToolbar(vditor.toolbar.elements, constants.g.EDIT_TOOLBARS);
            disableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
            if (type === "ir") {
              hideToolbar(vditor.toolbar.elements, ["both"]);
              showToolbar(vditor.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]);
              vditor.sv.element.style.display = "none";
              vditor.wysiwyg.element.parentElement.style.display = "none";
              vditor.ir.element.parentElement.style.display = "block";
              vditor.lute.SetVditorIR(true);
              vditor.lute.SetVditorWYSIWYG(false);
              vditor.lute.SetVditorSV(false);
              vditor.currentMode = "ir";
              vditor.ir.element.innerHTML = vditor.lute.Md2VditorIRDOM(markdownText);
              process_processAfterRender(vditor, {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: false
              });
              setPadding(vditor);
              vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(item) {
                processCodeRender(item, vditor);
              });
              vditor.ir.element.querySelectorAll(".vditor-toc").forEach(function(item) {
                (0, mathRender.H)(item, {
                  cdn: vditor.options.cdn,
                  math: vditor.options.preview.math
                });
              });
            } else if (type === "wysiwyg") {
              hideToolbar(vditor.toolbar.elements, ["both"]);
              showToolbar(vditor.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]);
              vditor.sv.element.style.display = "none";
              vditor.wysiwyg.element.parentElement.style.display = "block";
              vditor.ir.element.parentElement.style.display = "none";
              vditor.lute.SetVditorIR(false);
              vditor.lute.SetVditorWYSIWYG(true);
              vditor.lute.SetVditorSV(false);
              vditor.currentMode = "wysiwyg";
              setPadding(vditor);
              renderDomByMd(vditor, markdownText, {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: false
              });
              vditor.wysiwyg.element.querySelectorAll(".vditor-toc").forEach(function(item) {
                (0, mathRender.H)(item, {
                  cdn: vditor.options.cdn,
                  math: vditor.options.preview.math
                });
              });
              vditor.wysiwyg.popover.style.display = "none";
            } else if (type === "sv") {
              showToolbar(vditor.toolbar.elements, ["both"]);
              hideToolbar(vditor.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]);
              vditor.wysiwyg.element.parentElement.style.display = "none";
              vditor.ir.element.parentElement.style.display = "none";
              if (vditor.options.preview.mode === "both") {
                vditor.sv.element.style.display = "block";
              } else if (vditor.options.preview.mode === "editor") {
                vditor.sv.element.style.display = "block";
              }
              vditor.lute.SetVditorIR(false);
              vditor.lute.SetVditorWYSIWYG(false);
              vditor.lute.SetVditorSV(true);
              vditor.currentMode = "sv";
              var svHTML = processSpinVditorSVDOM(markdownText, vditor);
              if (svHTML === "<div data-block='0'></div>") {
                svHTML = "";
              }
              vditor.sv.element.innerHTML = svHTML;
              processAfterRender(vditor, {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: false
              });
              setPadding(vditor);
            }
            vditor.undo.resetIcon(vditor);
            if (typeof event !== "string") {
              vditor[vditor.currentMode].element.focus();
              highlightToolbar(vditor);
            }
            renderToc(vditor);
            setTypewriterPosition(vditor);
            if (vditor.toolbar.elements["edit-mode"]) {
              vditor.toolbar.elements["edit-mode"].querySelectorAll("button").forEach(function(item) {
                item.classList.remove("vditor-menu--current");
              });
              vditor.toolbar.elements["edit-mode"].querySelector('button[data-mode="' + vditor.currentMode + '"]').classList.add("vditor-menu--current");
            }
            vditor.outline.toggle(vditor, vditor.currentMode !== "sv" && vditor.options.outline.enable);
          };
          var EditMode = function(_super) {
            __extends(EditMode2, _super);
            function EditMode2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              var panelElement = document.createElement("div");
              panelElement.className = "vditor-hint" + (menuItem.level === 2 ? "" : " vditor-panel--arrow");
              panelElement.innerHTML = '<button data-mode="wysiwyg">' + window.VditorI18n.wysiwyg + " &lt;" + (0, compatibility.ns)("\u2325\u23187") + '></button>\n<button data-mode="ir">' + window.VditorI18n.instantRendering + " &lt;" + (0, compatibility.ns)("\u2325\u23188") + '></button>\n<button data-mode="sv">' + window.VditorI18n.splitView + " &lt;" + (0, compatibility.ns)("\u2325\u23189") + "></button>";
              _this.element.appendChild(panelElement);
              _this._bindEvent(vditor, panelElement, menuItem);
              return _this;
            }
            EditMode2.prototype._bindEvent = function(vditor, panelElement, menuItem) {
              var actionBtn = this.element.children[0];
              toggleSubMenu(vditor, panelElement, actionBtn, menuItem.level);
              panelElement.children.item(0).addEventListener((0, compatibility.Le)(), function(event) {
                setEditMode(vditor, "wysiwyg", event);
                event.preventDefault();
                event.stopPropagation();
              });
              panelElement.children.item(1).addEventListener((0, compatibility.Le)(), function(event) {
                setEditMode(vditor, "ir", event);
                event.preventDefault();
                event.stopPropagation();
              });
              panelElement.children.item(2).addEventListener((0, compatibility.Le)(), function(event) {
                setEditMode(vditor, "sv", event);
                event.preventDefault();
                event.stopPropagation();
              });
            };
            return EditMode2;
          }(MenuItem);
          ;
          var getSelectText = function(editor, range) {
            if ((0, selection.Gb)(editor, range)) {
              return getSelection().toString();
            }
            return "";
          };
          ;
          var focusEvent = function(vditor, editorElement) {
            editorElement.addEventListener("focus", function() {
              if (vditor.options.focus) {
                vditor.options.focus(getMarkdown(vditor));
              }
              hidePanel(vditor, ["subToolbar"]);
            });
          };
          var dblclickEvent = function(vditor, editorElement) {
            editorElement.addEventListener("dblclick", function(event) {
              if (event.target.tagName === "IMG") {
                (0, preview_image.E)(event.target, vditor.options.lang, vditor.options.theme);
              }
            });
          };
          var blurEvent = function(vditor, editorElement) {
            editorElement.addEventListener("blur", function(event) {
              if (vditor.currentMode === "ir") {
                var expandElement = vditor.ir.element.querySelector(".vditor-ir__node--expand");
                if (expandElement) {
                  expandElement.classList.remove("vditor-ir__node--expand");
                }
              } else if (vditor.currentMode === "wysiwyg" && !vditor.wysiwyg.selectPopover.contains(event.relatedTarget)) {
                vditor.wysiwyg.hideComment();
              }
              vditor[vditor.currentMode].range = (0, selection.zh)(vditor);
              if (vditor.options.blur) {
                vditor.options.blur(getMarkdown(vditor));
              }
            });
          };
          var dropEvent = function(vditor, editorElement) {
            editorElement.addEventListener("dragstart", function(event) {
              event.dataTransfer.setData(constants.g.DROP_EDITOR, constants.g.DROP_EDITOR);
            });
            editorElement.addEventListener("drop", function(event) {
              if (event.dataTransfer.getData(constants.g.DROP_EDITOR)) {
                execAfterRender(vditor);
              } else if (event.dataTransfer.types[0] === "Files" || event.dataTransfer.types.includes("text/html")) {
                paste(vditor, event, {
                  pasteCode: function(code) {
                    document.execCommand("insertHTML", false, code);
                  }
                });
              }
            });
          };
          var copyEvent = function(vditor, editorElement, copy) {
            editorElement.addEventListener("copy", function(event) {
              return copy(event, vditor);
            });
          };
          var cutEvent = function(vditor, editorElement, copy) {
            editorElement.addEventListener("cut", function(event) {
              copy(event, vditor);
              if (vditor.options.comment.enable && vditor.currentMode === "wysiwyg") {
                vditor.wysiwyg.getComments(vditor);
              }
              document.execCommand("delete");
            });
          };
          var scrollCenter = function(vditor) {
            if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable) {
              vditor.options.comment.adjustTop(vditor.wysiwyg.getComments(vditor, true));
            }
            if (!vditor.options.typewriterMode) {
              return;
            }
            var editorElement = vditor[vditor.currentMode].element;
            var cursorTop = (0, selection.Ny)(editorElement).top;
            if (typeof vditor.options.height === "string" && !vditor.element.classList.contains("vditor--fullscreen")) {
              window.scrollTo(window.scrollX, cursorTop + vditor.element.offsetTop + vditor.toolbar.element.offsetHeight - window.innerHeight / 2 + 10);
            }
            if (typeof vditor.options.height === "number" || vditor.element.classList.contains("vditor--fullscreen")) {
              editorElement.scrollTop = cursorTop + editorElement.scrollTop - editorElement.clientHeight / 2 + 10;
            }
          };
          var hotkeyEvent = function(vditor, editorElement) {
            editorElement.addEventListener("keydown", function(event) {
              if ((vditor.options.hint.extend.length > 1 || vditor.toolbar.elements.emoji) && vditor.hint.select(event, vditor)) {
                return;
              }
              if (vditor.options.comment.enable && vditor.currentMode === "wysiwyg" && (event.key === "Backspace" || matchHotKey("\u2318X", event))) {
                vditor.wysiwyg.getComments(vditor);
              }
              if (vditor.currentMode === "sv") {
                if (processKeydown_processKeydown(vditor, event)) {
                  return;
                }
              } else if (vditor.currentMode === "wysiwyg") {
                if (wysiwyg_processKeydown_processKeydown(vditor, event)) {
                  return;
                }
              } else if (vditor.currentMode === "ir") {
                if (processKeydown(vditor, event)) {
                  return;
                }
              }
              if (vditor.options.ctrlEnter && matchHotKey("\u2318Enter", event)) {
                vditor.options.ctrlEnter(getMarkdown(vditor));
                event.preventDefault();
                return;
              }
              if (matchHotKey("\u2318Z", event) && !vditor.toolbar.elements.undo) {
                vditor.undo.undo(vditor);
                event.preventDefault();
                return;
              }
              if (matchHotKey("\u2318Y", event) && !vditor.toolbar.elements.redo) {
                vditor.undo.redo(vditor);
                event.preventDefault();
                return;
              }
              if (event.key === "Escape") {
                if (vditor.hint.element.style.display === "block") {
                  vditor.hint.element.style.display = "none";
                } else if (vditor.options.esc && !event.isComposing) {
                  vditor.options.esc(getMarkdown(vditor));
                }
                event.preventDefault();
                return;
              }
              if ((0, compatibility.yl)(event) && event.altKey && !event.shiftKey && /^Digit[1-6]$/.test(event.code)) {
                if (vditor.currentMode === "wysiwyg") {
                  var tagName = event.code.replace("Digit", "H");
                  if ((0, hasClosest.lG)(getSelection().getRangeAt(0).startContainer, tagName)) {
                    removeHeading(vditor);
                  } else {
                    setHeading(vditor, tagName);
                  }
                  afterRenderEvent(vditor);
                } else if (vditor.currentMode === "sv") {
                  processHeading(vditor, "#".repeat(parseInt(event.code.replace("Digit", ""), 10)) + " ");
                } else if (vditor.currentMode === "ir") {
                  process_processHeading(vditor, "#".repeat(parseInt(event.code.replace("Digit", ""), 10)) + " ");
                }
                event.preventDefault();
                return true;
              }
              if ((0, compatibility.yl)(event) && event.altKey && !event.shiftKey && /^Digit[7-9]$/.test(event.code)) {
                if (event.code === "Digit7") {
                  setEditMode(vditor, "wysiwyg", event);
                } else if (event.code === "Digit8") {
                  setEditMode(vditor, "ir", event);
                } else if (event.code === "Digit9") {
                  setEditMode(vditor, "sv", event);
                }
                return true;
              }
              vditor.options.toolbar.find(function(menuItem) {
                if (!menuItem.hotkey || menuItem.toolbar) {
                  if (menuItem.toolbar) {
                    var sub = menuItem.toolbar.find(function(subMenuItem) {
                      if (!subMenuItem.hotkey) {
                        return false;
                      }
                      if (matchHotKey(subMenuItem.hotkey, event)) {
                        vditor.toolbar.elements[subMenuItem.name].children[0].dispatchEvent(new CustomEvent((0, compatibility.Le)()));
                        event.preventDefault();
                        return true;
                      }
                    });
                    return sub ? true : false;
                  }
                  return false;
                }
                if (matchHotKey(menuItem.hotkey, event)) {
                  vditor.toolbar.elements[menuItem.name].children[0].dispatchEvent(new CustomEvent((0, compatibility.Le)()));
                  event.preventDefault();
                  return true;
                }
              });
            });
          };
          var selectEvent = function(vditor, editorElement) {
            editorElement.addEventListener("selectstart", function(event) {
              editorElement.onmouseup = function() {
                setTimeout(function() {
                  var selectText = getSelectText(vditor[vditor.currentMode].element);
                  if (selectText.trim()) {
                    if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable) {
                      if (!(0, hasClosest.a1)(event.target, "data-type", "footnotes-block") && !(0, hasClosest.a1)(event.target, "data-type", "link-ref-defs-block")) {
                        vditor.wysiwyg.showComment();
                      } else {
                        vditor.wysiwyg.hideComment();
                      }
                    }
                    if (vditor.options.select) {
                      vditor.options.select(selectText);
                    }
                  } else {
                    if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable) {
                      vditor.wysiwyg.hideComment();
                    }
                  }
                });
              };
            });
          };
          ;
          var processPaste = function(vditor, text) {
            var range = (0, selection.zh)(vditor);
            range.extractContents();
            range.insertNode(document.createTextNode(Lute.Caret));
            range.insertNode(document.createTextNode(text));
            var blockElement = (0, hasClosest.a1)(range.startContainer, "data-block", "0");
            if (!blockElement) {
              blockElement = vditor.sv.element;
            }
            var html = "<div data-block='0'>" + vditor.lute.Md2VditorSVDOM(blockElement.textContent).replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, '<span data-type="newline"><br /><span style="display: none">\n</span></span><span data-type="newline"><br /><span style="display: none">\n</span></span></div><div data-block="0"><') + "</div>";
            if (blockElement.isEqualNode(vditor.sv.element)) {
              blockElement.innerHTML = html;
            } else {
              blockElement.outerHTML = html;
            }
            (0, selection.ib)(vditor.sv.element, range);
            scrollCenter(vditor);
          };
          var getSideByType = function(spanNode, type, isPrevious) {
            if (isPrevious === void 0) {
              isPrevious = true;
            }
            var sideElement = spanNode;
            if (sideElement.nodeType === 3) {
              sideElement = sideElement.parentElement;
            }
            while (sideElement) {
              if (sideElement.getAttribute("data-type") === type) {
                return sideElement;
              }
              if (isPrevious) {
                sideElement = sideElement.previousElementSibling;
              } else {
                sideElement = sideElement.nextElementSibling;
              }
            }
            return false;
          };
          var processSpinVditorSVDOM = function(html, vditor) {
            log("SpinVditorSVDOM", html, "argument", vditor.options.debugger);
            html = "<div data-block='0'>" + vditor.lute.SpinVditorSVDOM(html).replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, '<span data-type="newline"><br /><span style="display: none">\n</span></span><span data-type="newline"><br /><span style="display: none">\n</span></span></div><div data-block="0"><') + "</div>";
            log("SpinVditorSVDOM", html, "result", vditor.options.debugger);
            return html;
          };
          var processPreviousMarkers = function(spanElement) {
            var spanType = spanElement.getAttribute("data-type");
            var previousElement = spanElement.previousElementSibling;
            var markerText = spanType && spanType !== "text" && spanType !== "table" && spanType !== "heading-marker" && spanType !== "newline" && spanType !== "yaml-front-matter-open-marker" && spanType !== "yaml-front-matter-close-marker" && spanType !== "code-block-info" && spanType !== "code-block-close-marker" && spanType !== "code-block-open-marker" ? spanElement.textContent : "";
            var hasNL = false;
            if (spanType === "newline") {
              hasNL = true;
            }
            while (previousElement && !hasNL) {
              var previousType = previousElement.getAttribute("data-type");
              if (previousType === "li-marker" || previousType === "blockquote-marker" || previousType === "task-marker" || previousType === "padding") {
                var previousText = previousElement.textContent;
                if (previousType === "li-marker" && (spanType === "code-block-open-marker" || spanType === "code-block-info")) {
                  markerText = previousText.replace(/\S/g, " ") + markerText;
                } else if (spanType === "code-block-close-marker" && previousElement.nextElementSibling.isSameNode(spanElement)) {
                  var openMarker = getSideByType(spanElement, "code-block-open-marker");
                  if (openMarker && openMarker.previousElementSibling) {
                    previousElement = openMarker.previousElementSibling;
                    markerText = previousText + markerText;
                  }
                } else {
                  markerText = previousText + markerText;
                }
              } else if (previousType === "newline") {
                hasNL = true;
              }
              previousElement = previousElement.previousElementSibling;
            }
            return markerText;
          };
          var processAfterRender = function(vditor, options) {
            if (options === void 0) {
              options = {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: true
              };
            }
            if (options.enableHint) {
              vditor.hint.render(vditor);
            }
            vditor.preview.render(vditor);
            var text = getMarkdown(vditor);
            if (typeof vditor.options.input === "function" && options.enableInput) {
              vditor.options.input(text);
            }
            if (vditor.options.counter.enable) {
              vditor.counter.render(vditor, text);
            }
            if (vditor.options.cache.enable && (0, compatibility.pK)()) {
              localStorage.setItem(vditor.options.cache.id, text);
              if (vditor.options.cache.after) {
                vditor.options.cache.after(text);
              }
            }
            if (vditor.devtools) {
              vditor.devtools.renderEchart(vditor);
            }
            clearTimeout(vditor.sv.processTimeoutId);
            vditor.sv.processTimeoutId = window.setTimeout(function() {
              if (options.enableAddUndoStack && !vditor.sv.composingLock) {
                vditor.undo.addToUndoStack(vditor);
              }
            }, vditor.options.undoDelay);
          };
          var processHeading = function(vditor, value) {
            var range = (0, selection.zh)(vditor);
            var headingElement = (0, hasClosestByHeadings.S)(range.startContainer, "SPAN");
            if (headingElement && headingElement.textContent.trim() !== "") {
              value = "\n" + value;
            }
            range.collapse(true);
            document.execCommand("insertHTML", false, value);
          };
          var processToolbar = function(vditor, actionBtn, prefix, suffix) {
            var range = (0, selection.zh)(vditor);
            var commandName = actionBtn.getAttribute("data-type");
            if (vditor.sv.element.childNodes.length === 0) {
              vditor.sv.element.innerHTML = '<span data-type="p" data-block="0"><span data-type="text"><wbr></span></span><span data-type="newline"><br><span style="display: none">\n</span></span>';
              (0, selection.ib)(vditor.sv.element, range);
            }
            var blockElement = (0, hasClosest.F9)(range.startContainer);
            var spanElement = (0, hasClosestByHeadings.S)(range.startContainer, "SPAN");
            if (!blockElement) {
              return;
            }
            if (commandName === "link") {
              var html = void 0;
              if (range.toString() === "") {
                html = "" + prefix + Lute.Caret + suffix;
              } else {
                html = "" + prefix + range.toString() + suffix.replace(")", Lute.Caret + ")");
              }
              document.execCommand("insertHTML", false, html);
              return;
            } else if (commandName === "italic" || commandName === "bold" || commandName === "strike" || commandName === "inline-code" || commandName === "code" || commandName === "table" || commandName === "line") {
              var html = void 0;
              if (range.toString() === "") {
                html = "" + prefix + Lute.Caret + (commandName === "code" ? "" : suffix);
              } else {
                html = "" + prefix + range.toString() + Lute.Caret + (commandName === "code" ? "" : suffix);
              }
              if (commandName === "table" || commandName === "code" && spanElement && spanElement.textContent !== "") {
                html = "\n\n" + html;
              } else if (commandName === "line") {
                html = "\n\n" + prefix + "\n" + Lute.Caret;
              }
              document.execCommand("insertHTML", false, html);
              return;
            } else if (commandName === "check" || commandName === "list" || commandName === "ordered-list" || commandName === "quote") {
              if (spanElement) {
                var marker = "* ";
                if (commandName === "check") {
                  marker = "* [ ] ";
                } else if (commandName === "ordered-list") {
                  marker = "1. ";
                } else if (commandName === "quote") {
                  marker = "> ";
                }
                var newLine = getSideByType(spanElement, "newline");
                if (newLine) {
                  newLine.insertAdjacentText("afterend", marker);
                } else {
                  blockElement.insertAdjacentText("afterbegin", marker);
                }
                inputEvent(vditor);
                return;
              }
            }
            (0, selection.ib)(vditor.sv.element, range);
            processAfterRender(vditor);
          };
          ;
          var getElement = function(vditor) {
            switch (vditor.currentMode) {
              case "ir":
                return vditor.ir.element;
              case "wysiwyg":
                return vditor.wysiwyg.element;
              case "sv":
                return vditor.sv.element;
            }
          };
          ;
          var setHeaders = function(vditor, xhr) {
            if (vditor.options.upload.setHeaders) {
              vditor.options.upload.headers = vditor.options.upload.setHeaders();
            }
            if (vditor.options.upload.headers) {
              Object.keys(vditor.options.upload.headers).forEach(function(key) {
                xhr.setRequestHeader(key, vditor.options.upload.headers[key]);
              });
            }
          };
          ;
          var __awaiter = function(thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
              });
            }
            return new (P || (P = Promise))(function(resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e2) {
                  reject(e2);
                }
              }
              function rejected(value) {
                try {
                  step(generator["throw"](value));
                } catch (e2) {
                  reject(e2);
                }
              }
              function step(result2) {
                result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
              }
              step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
          };
          var __generator = function(thisArg, body) {
            var _ = { label: 0, sent: function() {
              if (t2[0] & 1)
                throw t2[1];
              return t2[1];
            }, trys: [], ops: [] }, f, y2, t2, g;
            return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
              return this;
            }), g;
            function verb(n3) {
              return function(v) {
                return step([n3, v]);
              };
            }
            function step(op) {
              if (f)
                throw new TypeError("Generator is already executing.");
              while (_)
                try {
                  if (f = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
                    return t2;
                  if (y2 = 0, t2)
                    op = [op[0] & 2, t2.value];
                  switch (op[0]) {
                    case 0:
                    case 1:
                      t2 = op;
                      break;
                    case 4:
                      _.label++;
                      return { value: op[1], done: false };
                    case 5:
                      _.label++;
                      y2 = op[1];
                      op = [0];
                      continue;
                    case 7:
                      op = _.ops.pop();
                      _.trys.pop();
                      continue;
                    default:
                      if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                      }
                      if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                        _.label = op[1];
                        break;
                      }
                      if (op[0] === 6 && _.label < t2[1]) {
                        _.label = t2[1];
                        t2 = op;
                        break;
                      }
                      if (t2 && _.label < t2[2]) {
                        _.label = t2[2];
                        _.ops.push(op);
                        break;
                      }
                      if (t2[2])
                        _.ops.pop();
                      _.trys.pop();
                      continue;
                  }
                  op = body.call(thisArg, _);
                } catch (e2) {
                  op = [6, e2];
                  y2 = 0;
                } finally {
                  f = t2 = 0;
                }
              if (op[0] & 5)
                throw op[1];
              return { value: op[0] ? op[1] : void 0, done: true };
            }
          };
          var Upload = function() {
            function Upload2() {
              this.isUploading = false;
              this.element = document.createElement("div");
              this.element.className = "vditor-upload";
            }
            return Upload2;
          }();
          var validateFile = function(vditor, files) {
            vditor.tip.hide();
            var uploadFileList = [];
            var errorTip = "";
            var uploadingStr = "";
            var lang = vditor.options.lang;
            var options = vditor.options;
            var _loop_1 = function(iMax2, i3) {
              var file = files[i3];
              var validate = true;
              if (!file.name) {
                errorTip += "<li>" + window.VditorI18n.nameEmpty + "</li>";
                validate = false;
              }
              if (file.size > vditor.options.upload.max) {
                errorTip += "<li>" + file.name + " " + window.VditorI18n.over + " " + vditor.options.upload.max / 1024 / 1024 + "M</li>";
                validate = false;
              }
              var lastIndex = file.name.lastIndexOf(".");
              var fileExt = file.name.substr(lastIndex);
              var filename = vditor.options.upload.filename(file.name.substr(0, lastIndex)) + fileExt;
              if (vditor.options.upload.accept) {
                var isAccept = vditor.options.upload.accept.split(",").some(function(item) {
                  var type = item.trim();
                  if (type.indexOf(".") === 0) {
                    if (fileExt.toLowerCase() === type.toLowerCase()) {
                      return true;
                    }
                  } else {
                    if (file.type.split("/")[0] === type.split("/")[0]) {
                      return true;
                    }
                  }
                  return false;
                });
                if (!isAccept) {
                  errorTip += "<li>" + file.name + " " + window.VditorI18n.fileTypeError + "</li>";
                  validate = false;
                }
              }
              if (validate) {
                uploadFileList.push(file);
                uploadingStr += "<li>" + filename + " " + window.VditorI18n.uploading + "</li>";
              }
            };
            for (var iMax = files.length, i2 = 0; i2 < iMax; i2++) {
              _loop_1(iMax, i2);
            }
            vditor.tip.show("<ul>" + errorTip + uploadingStr + "</ul>");
            return uploadFileList;
          };
          var genUploadedLabel = function(responseText, vditor) {
            var editorElement = getElement(vditor);
            editorElement.focus();
            var response = JSON.parse(responseText);
            var errorTip = "";
            if (response.code === 1) {
              errorTip = "" + response.msg;
            }
            if (response.data.errFiles && response.data.errFiles.length > 0) {
              errorTip = "<ul><li>" + errorTip + "</li>";
              response.data.errFiles.forEach(function(data) {
                var lastIndex = data.lastIndexOf(".");
                var filename = vditor.options.upload.filename(data.substr(0, lastIndex)) + data.substr(lastIndex);
                errorTip += "<li>" + filename + " " + window.VditorI18n.uploadError + "</li>";
              });
              errorTip += "</ul>";
            }
            if (errorTip) {
              vditor.tip.show(errorTip);
            } else {
              vditor.tip.hide();
            }
            var succFileText = "";
            Object.keys(response.data.succMap).forEach(function(key) {
              var path = response.data.succMap[key];
              var lastIndex = key.lastIndexOf(".");
              var type = key.substr(lastIndex);
              var filename = vditor.options.upload.filename(key.substr(0, lastIndex)) + type;
              type = type.toLowerCase();
              if (type.indexOf(".wav") === 0 || type.indexOf(".mp3") === 0 || type.indexOf(".ogg") === 0) {
                if (vditor.currentMode === "wysiwyg") {
                  succFileText += '<div class="vditor-wysiwyg__block" data-type="html-block"\n data-block="0"><pre><code>&lt;audio controls="controls" src="' + path + '"&gt;&lt;/audio&gt;</code></pre>';
                } else if (vditor.currentMode === "ir") {
                  succFileText += '<audio controls="controls" src="' + path + '"></audio>\n';
                } else {
                  succFileText += "[" + filename + "](" + path + ")\n";
                }
              } else if (type.indexOf(".apng") === 0 || type.indexOf(".bmp") === 0 || type.indexOf(".gif") === 0 || type.indexOf(".ico") === 0 || type.indexOf(".cur") === 0 || type.indexOf(".jpg") === 0 || type.indexOf(".jpeg") === 0 || type.indexOf(".jfif") === 0 || type.indexOf(".pjp") === 0 || type.indexOf(".pjpeg") === 0 || type.indexOf(".png") === 0 || type.indexOf(".svg") === 0 || type.indexOf(".webp") === 0) {
                if (vditor.currentMode === "wysiwyg") {
                  succFileText += '<img alt="' + filename + '" src="' + path + '">';
                } else {
                  succFileText += "![" + filename + "](" + path + ")\n";
                }
              } else {
                if (vditor.currentMode === "wysiwyg") {
                  succFileText += '<a href="' + path + '">' + filename + "</a>";
                } else {
                  succFileText += "[" + filename + "](" + path + ")\n";
                }
              }
            });
            (0, selection.Hc)(vditor.upload.range);
            document.execCommand("insertHTML", false, succFileText);
            vditor.upload.range = getSelection().getRangeAt(0).cloneRange();
          };
          var uploadFiles = function(vditor, files, element) {
            return __awaiter(void 0, void 0, void 0, function() {
              var fileList, filesMax, i2, fileItem, isValidate, isValidate, editorElement, validateResult, formData, extraData, _i, _a, key, i2, iMax, xhr;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    fileList = [];
                    filesMax = vditor.options.upload.multiple === true ? files.length : 1;
                    for (i2 = 0; i2 < filesMax; i2++) {
                      fileItem = files[i2];
                      if (fileItem instanceof DataTransferItem) {
                        fileItem = fileItem.getAsFile();
                      }
                      fileList.push(fileItem);
                    }
                    if (vditor.options.upload.handler) {
                      isValidate = vditor.options.upload.handler(fileList);
                      if (typeof isValidate === "string") {
                        vditor.tip.show(isValidate);
                        return [2];
                      }
                      return [2];
                    }
                    if (!vditor.options.upload.url || !vditor.upload) {
                      if (element) {
                        element.value = "";
                      }
                      vditor.tip.show("please config: options.upload.url");
                      return [2];
                    }
                    if (!vditor.options.upload.file)
                      return [3, 2];
                    return [4, vditor.options.upload.file(fileList)];
                  case 1:
                    fileList = _b.sent();
                    _b.label = 2;
                  case 2:
                    if (vditor.options.upload.validate) {
                      isValidate = vditor.options.upload.validate(fileList);
                      if (typeof isValidate === "string") {
                        vditor.tip.show(isValidate);
                        return [2];
                      }
                    }
                    editorElement = getElement(vditor);
                    vditor.upload.range = (0, selection.zh)(vditor);
                    validateResult = validateFile(vditor, fileList);
                    if (validateResult.length === 0) {
                      if (element) {
                        element.value = "";
                      }
                      return [2];
                    }
                    formData = new FormData();
                    extraData = vditor.options.upload.extraData;
                    for (_i = 0, _a = Object.keys(extraData); _i < _a.length; _i++) {
                      key = _a[_i];
                      formData.append(key, extraData[key]);
                    }
                    for (i2 = 0, iMax = validateResult.length; i2 < iMax; i2++) {
                      formData.append(vditor.options.upload.fieldName, validateResult[i2]);
                    }
                    xhr = new XMLHttpRequest();
                    xhr.open("POST", vditor.options.upload.url);
                    if (vditor.options.upload.token) {
                      xhr.setRequestHeader("X-Upload-Token", vditor.options.upload.token);
                    }
                    if (vditor.options.upload.withCredentials) {
                      xhr.withCredentials = true;
                    }
                    setHeaders(vditor, xhr);
                    vditor.upload.isUploading = true;
                    editorElement.setAttribute("contenteditable", "false");
                    xhr.onreadystatechange = function() {
                      if (xhr.readyState === XMLHttpRequest.DONE) {
                        vditor.upload.isUploading = false;
                        editorElement.setAttribute("contenteditable", "true");
                        if (xhr.status >= 200 && xhr.status < 300) {
                          if (vditor.options.upload.success) {
                            vditor.options.upload.success(editorElement, xhr.responseText);
                          } else {
                            var responseText = xhr.responseText;
                            if (vditor.options.upload.format) {
                              responseText = vditor.options.upload.format(files, xhr.responseText);
                            }
                            genUploadedLabel(responseText, vditor);
                          }
                        } else {
                          if (vditor.options.upload.error) {
                            vditor.options.upload.error(xhr.responseText);
                          } else {
                            vditor.tip.show(xhr.responseText);
                          }
                        }
                        if (element) {
                          element.value = "";
                        }
                        vditor.upload.element.style.display = "none";
                      }
                    };
                    xhr.upload.onprogress = function(event) {
                      if (!event.lengthComputable) {
                        return;
                      }
                      var progress = event.loaded / event.total * 100;
                      vditor.upload.element.style.display = "block";
                      var progressBar = vditor.upload.element;
                      progressBar.style.width = progress + "%";
                    };
                    xhr.send(formData);
                    return [2];
                }
              });
            });
          };
          ;
          var input_input = function(vditor, range, event) {
            var _a;
            var blockElement = (0, hasClosest.F9)(range.startContainer);
            if (!blockElement) {
              blockElement = vditor.wysiwyg.element;
            }
            if (event && event.inputType !== "formatItalic" && event.inputType !== "deleteByDrag" && event.inputType !== "insertFromDrop" && event.inputType !== "formatBold" && event.inputType !== "formatRemove" && event.inputType !== "formatStrikeThrough" && event.inputType !== "insertUnorderedList" && event.inputType !== "insertOrderedList" && event.inputType !== "formatOutdent" && event.inputType !== "formatIndent" && event.inputType !== "" || !event) {
              var previousAEmptyElement = previoueIsEmptyA(range.startContainer);
              if (previousAEmptyElement) {
                previousAEmptyElement.remove();
              }
              vditor.wysiwyg.element.querySelectorAll("wbr").forEach(function(wbr) {
                wbr.remove();
              });
              range.insertNode(document.createElement("wbr"));
              blockElement.querySelectorAll("[style]").forEach(function(item) {
                item.removeAttribute("style");
              });
              blockElement.querySelectorAll(".vditor-comment").forEach(function(item) {
                if (item.textContent.trim() === "") {
                  item.classList.remove("vditor-comment", "vditor-comment--focus");
                  item.removeAttribute("data-cmtids");
                }
              });
              (_a = blockElement.previousElementSibling) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".vditor-comment").forEach(function(item) {
                if (item.textContent.trim() === "") {
                  item.classList.remove("vditor-comment", "vditor-comment--focus");
                  item.removeAttribute("data-cmtids");
                }
              });
              var html_1 = "";
              if (blockElement.getAttribute("data-type") === "link-ref-defs-block") {
                blockElement = vditor.wysiwyg.element;
              }
              var isWYSIWYGElement = blockElement.isEqualNode(vditor.wysiwyg.element);
              var footnoteElement = (0, hasClosest.a1)(blockElement, "data-type", "footnotes-block");
              if (!isWYSIWYGElement) {
                var topListElement = (0, hasClosest.O9)(range.startContainer);
                if (topListElement && !footnoteElement) {
                  var blockquoteElement = (0, hasClosestByHeadings.S)(range.startContainer, "BLOCKQUOTE");
                  if (blockquoteElement) {
                    blockElement = (0, hasClosest.F9)(range.startContainer) || blockElement;
                  } else {
                    blockElement = topListElement;
                  }
                }
                if (footnoteElement) {
                  blockElement = footnoteElement;
                }
                html_1 = blockElement.outerHTML;
                if (blockElement.tagName === "UL" || blockElement.tagName === "OL") {
                  var listPrevElement = blockElement.previousElementSibling;
                  var listNextElement = blockElement.nextElementSibling;
                  if (listPrevElement && (listPrevElement.tagName === "UL" || listPrevElement.tagName === "OL")) {
                    html_1 = listPrevElement.outerHTML + html_1;
                    listPrevElement.remove();
                  }
                  if (listNextElement && (listNextElement.tagName === "UL" || listNextElement.tagName === "OL")) {
                    html_1 = html_1 + listNextElement.outerHTML;
                    listNextElement.remove();
                  }
                  html_1 = html_1.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
                }
                vditor.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(item) {
                  if (item && !blockElement.isEqualNode(item)) {
                    html_1 += item.outerHTML;
                    item.remove();
                  }
                });
                vditor.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(item) {
                  if (item && !blockElement.isEqualNode(item)) {
                    html_1 += item.outerHTML;
                    item.remove();
                  }
                });
              } else {
                html_1 = blockElement.innerHTML;
              }
              html_1 = html_1.replace(/<\/(strong|b)><strong data-marker="\W{2}">/g, "").replace(/<\/(em|i)><em data-marker="\W{1}">/g, "").replace(/<\/(s|strike)><s data-marker="~{1,2}">/g, "");
              if (html_1 === '<p data-block="0">```<wbr></p>' && vditor.hint.recentLanguage) {
                html_1 = '<p data-block="0">```<wbr></p>'.replace("```", "```" + vditor.hint.recentLanguage);
              }
              log("SpinVditorDOM", html_1, "argument", vditor.options.debugger);
              html_1 = vditor.lute.SpinVditorDOM(html_1);
              log("SpinVditorDOM", html_1, "result", vditor.options.debugger);
              if (isWYSIWYGElement) {
                blockElement.innerHTML = html_1;
              } else {
                blockElement.outerHTML = html_1;
                if (footnoteElement) {
                  var footnoteItemElement = (0, hasClosest.E2)(vditor.wysiwyg.element.querySelector("wbr"), "LI");
                  if (footnoteItemElement) {
                    var footnoteRefElement = vditor.wysiwyg.element.querySelector('sup[data-type="footnotes-ref"][data-footnotes-label="' + footnoteItemElement.getAttribute("data-marker") + '"]');
                    if (footnoteRefElement) {
                      footnoteRefElement.setAttribute("aria-label", footnoteItemElement.textContent.trim().substr(0, 24));
                    }
                  }
                }
              }
              var firstLinkRefDefElement_1;
              var allLinkRefDefsElement = vditor.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']");
              allLinkRefDefsElement.forEach(function(item, index) {
                if (index === 0) {
                  firstLinkRefDefElement_1 = item;
                } else {
                  firstLinkRefDefElement_1.insertAdjacentHTML("beforeend", item.innerHTML);
                  item.remove();
                }
              });
              if (allLinkRefDefsElement.length > 0) {
                vditor.wysiwyg.element.insertAdjacentElement("beforeend", allLinkRefDefsElement[0]);
              }
              var firstFootnoteElement_1;
              var allFootnoteElement = vditor.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']");
              allFootnoteElement.forEach(function(item, index) {
                if (index === 0) {
                  firstFootnoteElement_1 = item;
                } else {
                  firstFootnoteElement_1.insertAdjacentHTML("beforeend", item.innerHTML);
                  item.remove();
                }
              });
              if (allFootnoteElement.length > 0) {
                vditor.wysiwyg.element.insertAdjacentElement("beforeend", allFootnoteElement[0]);
              }
              (0, selection.ib)(vditor.wysiwyg.element, range);
              vditor.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(item) {
                processCodeRender(item, vditor);
              });
              if (event && (event.inputType === "deleteContentBackward" || event.inputType === "deleteContentForward") && vditor.options.comment.enable) {
                vditor.wysiwyg.triggerRemoveComment(vditor);
                vditor.options.comment.adjustTop(vditor.wysiwyg.getComments(vditor, true));
              }
            }
            renderToc(vditor);
            afterRenderEvent(vditor, {
              enableAddUndoStack: true,
              enableHint: true,
              enableInput: true
            });
          };
          ;
          var __makeTemplateObject = function(cooked, raw) {
            if (Object.defineProperty) {
              Object.defineProperty(cooked, "raw", { value: raw });
            } else {
              cooked.raw = raw;
            }
            return cooked;
          };
          var fixBrowserBehavior_awaiter = function(thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
              });
            }
            return new (P || (P = Promise))(function(resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e2) {
                  reject(e2);
                }
              }
              function rejected(value) {
                try {
                  step(generator["throw"](value));
                } catch (e2) {
                  reject(e2);
                }
              }
              function step(result2) {
                result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
              }
              step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
          };
          var fixBrowserBehavior_generator = function(thisArg, body) {
            var _ = { label: 0, sent: function() {
              if (t2[0] & 1)
                throw t2[1];
              return t2[1];
            }, trys: [], ops: [] }, f, y2, t2, g;
            return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
              return this;
            }), g;
            function verb(n3) {
              return function(v) {
                return step([n3, v]);
              };
            }
            function step(op) {
              if (f)
                throw new TypeError("Generator is already executing.");
              while (_)
                try {
                  if (f = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
                    return t2;
                  if (y2 = 0, t2)
                    op = [op[0] & 2, t2.value];
                  switch (op[0]) {
                    case 0:
                    case 1:
                      t2 = op;
                      break;
                    case 4:
                      _.label++;
                      return { value: op[1], done: false };
                    case 5:
                      _.label++;
                      y2 = op[1];
                      op = [0];
                      continue;
                    case 7:
                      op = _.ops.pop();
                      _.trys.pop();
                      continue;
                    default:
                      if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                      }
                      if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                        _.label = op[1];
                        break;
                      }
                      if (op[0] === 6 && _.label < t2[1]) {
                        _.label = t2[1];
                        t2 = op;
                        break;
                      }
                      if (t2 && _.label < t2[2]) {
                        _.label = t2[2];
                        _.ops.push(op);
                        break;
                      }
                      if (t2[2])
                        _.ops.pop();
                      _.trys.pop();
                      continue;
                  }
                  op = body.call(thisArg, _);
                } catch (e2) {
                  op = [6, e2];
                  y2 = 0;
                } finally {
                  f = t2 = 0;
                }
              if (op[0] & 5)
                throw op[1];
              return { value: op[0] ? op[1] : void 0, done: true };
            }
          };
          var fixGSKeyBackspace = function(event, vditor, startContainer) {
            if (event.keyCode === 229 && event.code === "" && event.key === "Unidentified" && vditor.currentMode !== "sv") {
              var blockElement = (0, hasClosest.F9)(startContainer);
              if (blockElement && blockElement.textContent.trim() === "") {
                vditor[vditor.currentMode].composingLock = true;
                return false;
              }
            }
            return true;
          };
          var fixCJKPosition = function(range, vditor, event) {
            if (event.key === "Enter" || event.key === "Tab" || event.key === "Backspace" || event.key.indexOf("Arrow") > -1 || (0, compatibility.yl)(event) || event.key === "Escape" || event.shiftKey || event.altKey) {
              return;
            }
            var pLiElement = (0, hasClosest.lG)(range.startContainer, "P") || (0, hasClosest.lG)(range.startContainer, "LI");
            if (pLiElement && (0, selection.im)(pLiElement, vditor[vditor.currentMode].element, range).start === 0) {
              var zwspNode = document.createTextNode(constants.g.ZWSP);
              range.insertNode(zwspNode);
              range.setStartAfter(zwspNode);
            }
          };
          var fixCursorDownInlineMath = function(range, key) {
            if (key === "ArrowDown" || key === "ArrowUp") {
              var inlineElement = (0, hasClosest.a1)(range.startContainer, "data-type", "math-inline") || (0, hasClosest.a1)(range.startContainer, "data-type", "html-entity") || (0, hasClosest.a1)(range.startContainer, "data-type", "html-inline");
              if (inlineElement) {
                if (key === "ArrowDown") {
                  range.setStartAfter(inlineElement.parentElement);
                }
                if (key === "ArrowUp") {
                  range.setStartBefore(inlineElement.parentElement);
                }
              }
            }
          };
          var insertEmptyBlock = function(vditor, position) {
            var range = (0, selection.zh)(vditor);
            var blockElement = (0, hasClosest.F9)(range.startContainer);
            if (blockElement) {
              blockElement.insertAdjacentHTML(position, '<p data-block="0">' + constants.g.ZWSP + "<wbr>\n</p>");
              (0, selection.ib)(vditor[vditor.currentMode].element, range);
              highlightToolbar(vditor);
              execAfterRender(vditor);
            }
          };
          var isFirstCell = function(cellElement) {
            var tableElement = (0, hasClosest.lG)(cellElement, "TABLE");
            if (tableElement && tableElement.rows[0].cells[0].isSameNode(cellElement)) {
              return tableElement;
            }
            return false;
          };
          var isLastCell = function(cellElement) {
            var tableElement = (0, hasClosest.lG)(cellElement, "TABLE");
            if (tableElement && tableElement.lastElementChild.lastElementChild.lastElementChild.isSameNode(cellElement)) {
              return tableElement;
            }
            return false;
          };
          var goPreviousCell = function(cellElement, range, isSelected) {
            if (isSelected === void 0) {
              isSelected = true;
            }
            var previousElement = cellElement.previousElementSibling;
            if (!previousElement) {
              if (cellElement.parentElement.previousElementSibling) {
                previousElement = cellElement.parentElement.previousElementSibling.lastElementChild;
              } else if (cellElement.parentElement.parentElement.tagName === "TBODY" && cellElement.parentElement.parentElement.previousElementSibling) {
                previousElement = cellElement.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild;
              } else {
                previousElement = null;
              }
            }
            if (previousElement) {
              range.selectNodeContents(previousElement);
              if (!isSelected) {
                range.collapse(false);
              }
              (0, selection.Hc)(range);
            }
            return previousElement;
          };
          var insertAfterBlock = function(vditor, event, range, element, blockElement) {
            var position = (0, selection.im)(element, vditor[vditor.currentMode].element, range);
            if (event.key === "ArrowDown" && element.textContent.trimRight().substr(position.start).indexOf("\n") === -1 || event.key === "ArrowRight" && position.start >= element.textContent.trimRight().length) {
              var nextElement = blockElement.nextElementSibling;
              if (!nextElement || nextElement && (nextElement.tagName === "TABLE" || nextElement.getAttribute("data-type"))) {
                blockElement.insertAdjacentHTML("afterend", '<p data-block="0">' + constants.g.ZWSP + "<wbr></p>");
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
              } else {
                range.selectNodeContents(nextElement);
                range.collapse(true);
                (0, selection.Hc)(range);
              }
              event.preventDefault();
              return true;
            }
            return false;
          };
          var insertBeforeBlock = function(vditor, event, range, element, blockElement) {
            var position = (0, selection.im)(element, vditor[vditor.currentMode].element, range);
            if (event.key === "ArrowUp" && element.textContent.substr(0, position.start).indexOf("\n") === -1 || (event.key === "ArrowLeft" || event.key === "Backspace" && range.toString() === "") && position.start === 0) {
              var previousElement = blockElement.previousElementSibling;
              if (!previousElement || previousElement && (previousElement.tagName === "TABLE" || previousElement.getAttribute("data-type"))) {
                blockElement.insertAdjacentHTML("beforebegin", '<p data-block="0">' + constants.g.ZWSP + "<wbr></p>");
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
              } else {
                range.selectNodeContents(previousElement);
                range.collapse(false);
                (0, selection.Hc)(range);
              }
              event.preventDefault();
              return true;
            }
            return false;
          };
          var listToggle = function(vditor, range, type, cancel) {
            if (cancel === void 0) {
              cancel = true;
            }
            var itemElement = (0, hasClosest.lG)(range.startContainer, "LI");
            vditor[vditor.currentMode].element.querySelectorAll("wbr").forEach(function(wbr) {
              wbr.remove();
            });
            range.insertNode(document.createElement("wbr"));
            if (cancel && itemElement) {
              var pHTML = "";
              for (var i2 = 0; i2 < itemElement.parentElement.childElementCount; i2++) {
                var inputElement = itemElement.parentElement.children[i2].querySelector("input");
                if (inputElement) {
                  inputElement.remove();
                }
                pHTML += '<p data-block="0">' + itemElement.parentElement.children[i2].innerHTML.trimLeft() + "</p>";
              }
              itemElement.parentElement.insertAdjacentHTML("beforebegin", pHTML);
              itemElement.parentElement.remove();
            } else {
              if (!itemElement) {
                var blockElement = (0, hasClosest.a1)(range.startContainer, "data-block", "0");
                if (!blockElement) {
                  vditor[vditor.currentMode].element.querySelector("wbr").remove();
                  blockElement = vditor[vditor.currentMode].element.querySelector("p");
                  blockElement.innerHTML = "<wbr>";
                }
                if (type === "check") {
                  blockElement.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li class="vditor-task"><input type="checkbox" /> ' + blockElement.innerHTML + "</li></ul>");
                  blockElement.remove();
                } else if (type === "list") {
                  blockElement.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li>' + blockElement.innerHTML + "</li></ul>");
                  blockElement.remove();
                } else if (type === "ordered-list") {
                  blockElement.insertAdjacentHTML("beforebegin", '<ol data-block="0"><li>' + blockElement.innerHTML + "</li></ol>");
                  blockElement.remove();
                }
              } else {
                if (type === "check") {
                  itemElement.parentElement.querySelectorAll("li").forEach(function(item) {
                    item.insertAdjacentHTML("afterbegin", '<input type="checkbox" />' + (item.textContent.indexOf(" ") === 0 ? "" : " "));
                    item.classList.add("vditor-task");
                  });
                } else {
                  if (itemElement.querySelector("input")) {
                    itemElement.parentElement.querySelectorAll("li").forEach(function(item) {
                      item.querySelector("input").remove();
                      item.classList.remove("vditor-task");
                    });
                  }
                  var element = void 0;
                  if (type === "list") {
                    element = document.createElement("ul");
                    element.setAttribute("data-marker", "*");
                  } else {
                    element = document.createElement("ol");
                    element.setAttribute("data-marker", "1.");
                  }
                  element.setAttribute("data-block", "0");
                  element.setAttribute("data-tight", itemElement.parentElement.getAttribute("data-tight"));
                  element.innerHTML = itemElement.parentElement.innerHTML;
                  itemElement.parentElement.parentNode.replaceChild(element, itemElement.parentElement);
                }
              }
            }
          };
          var listIndent = function(vditor, liElement, range) {
            var previousElement = liElement.previousElementSibling;
            if (liElement && previousElement) {
              var liElements_1 = [liElement];
              Array.from(range.cloneContents().children).forEach(function(item, index) {
                if (item.nodeType !== 3 && liElement && item.textContent.trim() !== "" && liElement.getAttribute("data-node-id") === item.getAttribute("data-node-id")) {
                  if (index !== 0) {
                    liElements_1.push(liElement);
                  }
                  liElement = liElement.nextElementSibling;
                }
              });
              vditor[vditor.currentMode].element.querySelectorAll("wbr").forEach(function(wbr) {
                wbr.remove();
              });
              range.insertNode(document.createElement("wbr"));
              var liParentElement = previousElement.parentElement;
              var liHTML_1 = "";
              liElements_1.forEach(function(item) {
                var marker = item.getAttribute("data-marker");
                if (marker.length !== 1) {
                  marker = "1" + marker.slice(-1);
                }
                liHTML_1 += '<li data-node-id="' + item.getAttribute("data-node-id") + '" data-marker="' + marker + '">' + item.innerHTML + "</li>";
                item.remove();
              });
              previousElement.insertAdjacentHTML("beforeend", "<" + liParentElement.tagName + ' data-block="0">' + liHTML_1 + "</" + liParentElement.tagName + ">");
              if (vditor.currentMode === "wysiwyg") {
                liParentElement.outerHTML = vditor.lute.SpinVditorDOM(liParentElement.outerHTML);
              } else {
                liParentElement.outerHTML = vditor.lute.SpinVditorIRDOM(liParentElement.outerHTML);
              }
              (0, selection.ib)(vditor[vditor.currentMode].element, range);
              var tempTopListElement = (0, hasClosest.O9)(range.startContainer);
              if (tempTopListElement) {
                tempTopListElement.querySelectorAll(".vditor-" + vditor.currentMode + "__preview[data-render='2']").forEach(function(item) {
                  processCodeRender(item, vditor);
                  if (vditor.currentMode === "wysiwyg") {
                    item.previousElementSibling.setAttribute("style", "display:none");
                  }
                });
              }
              execAfterRender(vditor);
              highlightToolbar(vditor);
            } else {
              vditor[vditor.currentMode].element.focus();
            }
          };
          var listOutdent = function(vditor, liElement, range, topListElement) {
            var liParentLiElement = (0, hasClosest.lG)(liElement.parentElement, "LI");
            if (liParentLiElement) {
              vditor[vditor.currentMode].element.querySelectorAll("wbr").forEach(function(wbr) {
                wbr.remove();
              });
              range.insertNode(document.createElement("wbr"));
              var liParentElement = liElement.parentElement;
              var liParentAfterElement = liParentElement.cloneNode();
              var liElements_2 = [liElement];
              Array.from(range.cloneContents().children).forEach(function(item, index) {
                if (item.nodeType !== 3 && liElement && item.textContent.trim() !== "" && liElement.getAttribute("data-node-id") === item.getAttribute("data-node-id")) {
                  if (index !== 0) {
                    liElements_2.push(liElement);
                  }
                  liElement = liElement.nextElementSibling;
                }
              });
              var isMatch_1 = false;
              var afterHTML_1 = "";
              liParentElement.querySelectorAll("li").forEach(function(item) {
                if (isMatch_1) {
                  afterHTML_1 += item.outerHTML;
                  if (!item.nextElementSibling && !item.previousElementSibling) {
                    item.parentElement.remove();
                  } else {
                    item.remove();
                  }
                }
                if (item.isSameNode(liElements_2[liElements_2.length - 1])) {
                  isMatch_1 = true;
                }
              });
              liElements_2.reverse().forEach(function(item) {
                liParentLiElement.insertAdjacentElement("afterend", item);
              });
              if (afterHTML_1) {
                liParentAfterElement.innerHTML = afterHTML_1;
                liElements_2[0].insertAdjacentElement("beforeend", liParentAfterElement);
              }
              if (vditor.currentMode === "wysiwyg") {
                topListElement.outerHTML = vditor.lute.SpinVditorDOM(topListElement.outerHTML);
              } else {
                topListElement.outerHTML = vditor.lute.SpinVditorIRDOM(topListElement.outerHTML);
              }
              (0, selection.ib)(vditor[vditor.currentMode].element, range);
              var tempTopListElement = (0, hasClosest.O9)(range.startContainer);
              if (tempTopListElement) {
                tempTopListElement.querySelectorAll(".vditor-" + vditor.currentMode + "__preview[data-render='2']").forEach(function(item) {
                  processCodeRender(item, vditor);
                  if (vditor.currentMode === "wysiwyg") {
                    item.previousElementSibling.setAttribute("style", "display:none");
                  }
                });
              }
              execAfterRender(vditor);
              highlightToolbar(vditor);
            } else {
              vditor[vditor.currentMode].element.focus();
            }
          };
          var setTableAlign = function(tableElement, type) {
            var cell = getSelection().getRangeAt(0).startContainer.parentElement;
            var columnCnt = tableElement.rows[0].cells.length;
            var rowCnt = tableElement.rows.length;
            var currentColumn = 0;
            for (var i2 = 0; i2 < rowCnt; i2++) {
              for (var j = 0; j < columnCnt; j++) {
                if (tableElement.rows[i2].cells[j].isSameNode(cell)) {
                  currentColumn = j;
                  break;
                }
              }
            }
            for (var k = 0; k < rowCnt; k++) {
              tableElement.rows[k].cells[currentColumn].setAttribute("align", type);
            }
          };
          var isHrMD = function(text) {
            var marker = text.trimRight().split("\n").pop();
            if (marker === "") {
              return false;
            }
            if (marker.replace(/ |-/g, "") === "" || marker.replace(/ |_/g, "") === "" || marker.replace(/ |\*/g, "") === "") {
              if (marker.replace(/ /g, "").length > 2) {
                if (marker.indexOf("-") > -1 && marker.trimLeft().indexOf(" ") === -1 && text.trimRight().split("\n").length > 1) {
                  return false;
                }
                if (marker.indexOf("    ") === 0 || marker.indexOf("	") === 0) {
                  return false;
                }
                return true;
              }
              return false;
            }
            return false;
          };
          var isHeadingMD = function(text) {
            var textArray = text.trimRight().split("\n");
            text = textArray.pop();
            if (text.indexOf("    ") === 0 || text.indexOf("	") === 0) {
              return false;
            }
            text = text.trimLeft();
            if (text === "" || textArray.length === 0) {
              return false;
            }
            if (text.replace(/-/g, "") === "" || text.replace(/=/g, "") === "") {
              return true;
            }
            return false;
          };
          var execAfterRender = function(vditor, options) {
            if (options === void 0) {
              options = {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: true
              };
            }
            if (vditor.currentMode === "wysiwyg") {
              afterRenderEvent(vditor, options);
            } else if (vditor.currentMode === "ir") {
              process_processAfterRender(vditor, options);
            } else if (vditor.currentMode === "sv") {
              processAfterRender(vditor, options);
            }
          };
          var fixList = function(range, vditor, pElement, event) {
            var _a;
            var startContainer = range.startContainer;
            var liElement = (0, hasClosest.lG)(startContainer, "LI");
            if (liElement) {
              if (!(0, compatibility.yl)(event) && !event.altKey && event.key === "Enter" && (!event.shiftKey && pElement && liElement.contains(pElement) && pElement.nextElementSibling)) {
                if (liElement && !liElement.textContent.endsWith("\n")) {
                  liElement.insertAdjacentText("beforeend", "\n");
                }
                range.insertNode(document.createTextNode("\n\n"));
                range.collapse(false);
                execAfterRender(vditor);
                event.preventDefault();
                return true;
              }
              if (!(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && event.key === "Backspace" && !liElement.previousElementSibling && range.toString() === "" && (0, selection.im)(liElement, vditor[vditor.currentMode].element, range).start === 0) {
                if (liElement.nextElementSibling) {
                  liElement.parentElement.insertAdjacentHTML("beforebegin", '<p data-block="0"><wbr>' + liElement.innerHTML + "</p>");
                  liElement.remove();
                } else {
                  liElement.parentElement.outerHTML = '<p data-block="0"><wbr>' + liElement.innerHTML + "</p>";
                }
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                event.preventDefault();
                return true;
              }
              if (!(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && event.key === "Backspace" && liElement.textContent.trim().replace(constants.g.ZWSP, "") === "" && range.toString() === "" && ((_a = liElement.previousElementSibling) === null || _a === void 0 ? void 0 : _a.tagName) === "LI") {
                liElement.previousElementSibling.insertAdjacentText("beforeend", "\n\n");
                range.selectNodeContents(liElement.previousElementSibling);
                range.collapse(false);
                liElement.remove();
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                event.preventDefault();
                return true;
              }
              if (!(0, compatibility.yl)(event) && !event.altKey && event.key === "Tab") {
                var isFirst = false;
                if (range.startOffset === 0 && (startContainer.nodeType === 3 && !startContainer.previousSibling || startContainer.nodeType !== 3 && startContainer.nodeName === "LI")) {
                  isFirst = true;
                } else if (liElement.classList.contains("vditor-task") && range.startOffset === 1 && startContainer.previousSibling.nodeType !== 3 && startContainer.previousSibling.tagName === "INPUT") {
                  isFirst = true;
                }
                if (isFirst || range.toString() !== "") {
                  if (event.shiftKey) {
                    listOutdent(vditor, liElement, range, liElement.parentElement);
                  } else {
                    listIndent(vditor, liElement, range);
                  }
                  event.preventDefault();
                  return true;
                }
              }
            }
            return false;
          };
          var fixTab = function(vditor, range, event) {
            if (vditor.options.tab && event.key === "Tab") {
              if (event.shiftKey) {
              } else {
                if (range.toString() === "") {
                  range.insertNode(document.createTextNode(vditor.options.tab));
                  range.collapse(false);
                } else {
                  range.extractContents();
                  range.insertNode(document.createTextNode(vditor.options.tab));
                  range.collapse(false);
                }
              }
              (0, selection.Hc)(range);
              execAfterRender(vditor);
              event.preventDefault();
              return true;
            }
          };
          var fixMarkdown = function(event, vditor, pElement, range) {
            if (!pElement) {
              return;
            }
            if (!(0, compatibility.yl)(event) && !event.altKey && event.key === "Enter") {
              var pText = String.raw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), pElement.textContent).replace(/\\\|/g, "").trim();
              var pTextList = pText.split("|");
              if (pText.startsWith("|") && pText.endsWith("|") && pTextList.length > 3) {
                var tableHeaderMD = pTextList.map(function() {
                  return "---";
                }).join("|");
                tableHeaderMD = pElement.textContent + "\n" + tableHeaderMD.substring(3, tableHeaderMD.length - 3) + "\n|<wbr>";
                pElement.outerHTML = vditor.lute.SpinVditorDOM(tableHeaderMD);
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                scrollCenter(vditor);
                event.preventDefault();
                return true;
              }
              if (isHrMD(pElement.innerHTML) && pElement.previousElementSibling) {
                var pInnerHTML = "";
                var innerHTMLList = pElement.innerHTML.trimRight().split("\n");
                if (innerHTMLList.length > 1) {
                  innerHTMLList.pop();
                  pInnerHTML = '<p data-block="0">' + innerHTMLList.join("\n") + "</p>";
                }
                pElement.insertAdjacentHTML("afterend", pInnerHTML + '<hr data-block="0"><p data-block="0"><wbr>\n</p>');
                pElement.remove();
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                scrollCenter(vditor);
                event.preventDefault();
                return true;
              }
              if (isHeadingMD(pElement.innerHTML)) {
                if (vditor.currentMode === "wysiwyg") {
                  pElement.outerHTML = vditor.lute.SpinVditorDOM(pElement.innerHTML + '<p data-block="0"><wbr>\n</p>');
                } else {
                  pElement.outerHTML = vditor.lute.SpinVditorIRDOM(pElement.innerHTML + '<p data-block="0"><wbr>\n</p>');
                }
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                scrollCenter(vditor);
                event.preventDefault();
                return true;
              }
            }
            if (range.collapsed && pElement.previousElementSibling && event.key === "Backspace" && !(0, compatibility.yl)(event) && !event.altKey && !event.shiftKey && pElement.textContent.trimRight().split("\n").length > 1 && (0, selection.im)(pElement, vditor[vditor.currentMode].element, range).start === 0) {
              var lastElement = (0, hasClosest.DX)(pElement.previousElementSibling);
              if (!lastElement.textContent.endsWith("\n")) {
                lastElement.textContent = lastElement.textContent + "\n";
              }
              lastElement.parentElement.insertAdjacentHTML("beforeend", "<wbr>" + pElement.innerHTML);
              pElement.remove();
              (0, selection.ib)(vditor[vditor.currentMode].element, range);
              return false;
            }
            return false;
          };
          var insertRow = function(vditor, range, cellElement) {
            var rowHTML = "";
            for (var m = 0; m < cellElement.parentElement.childElementCount; m++) {
              rowHTML += '<td align="' + cellElement.parentElement.children[m].getAttribute("align") + '"> </td>';
            }
            if (cellElement.tagName === "TH") {
              cellElement.parentElement.parentElement.insertAdjacentHTML("afterend", "<tbody><tr>" + rowHTML + "</tr></tbody>");
            } else {
              cellElement.parentElement.insertAdjacentHTML("afterend", "<tr>" + rowHTML + "</tr>");
            }
            execAfterRender(vditor);
          };
          var insertRowAbove = function(vditor, range, cellElement) {
            var rowHTML = "";
            for (var m = 0; m < cellElement.parentElement.childElementCount; m++) {
              if (cellElement.tagName === "TH") {
                rowHTML += '<th align="' + cellElement.parentElement.children[m].getAttribute("align") + '"> </th>';
              } else {
                rowHTML += '<td align="' + cellElement.parentElement.children[m].getAttribute("align") + '"> </td>';
              }
            }
            if (cellElement.tagName === "TH") {
              cellElement.parentElement.parentElement.insertAdjacentHTML("beforebegin", "<thead><tr>" + rowHTML + "</tr></thead>");
              range.insertNode(document.createElement("wbr"));
              var theadHTML = cellElement.parentElement.innerHTML.replace(/<th>/g, "<td>").replace(/<\/th>/g, "</td>");
              cellElement.parentElement.parentElement.nextElementSibling.insertAdjacentHTML("afterbegin", theadHTML);
              cellElement.parentElement.parentElement.remove();
              (0, selection.ib)(vditor.ir.element, range);
            } else {
              cellElement.parentElement.insertAdjacentHTML("beforebegin", "<tr>" + rowHTML + "</tr>");
            }
            execAfterRender(vditor);
          };
          var insertColumn = function(vditor, tableElement, cellElement, type) {
            if (type === void 0) {
              type = "afterend";
            }
            var index = 0;
            var previousElement = cellElement.previousElementSibling;
            while (previousElement) {
              index++;
              previousElement = previousElement.previousElementSibling;
            }
            for (var i2 = 0; i2 < tableElement.rows.length; i2++) {
              if (i2 === 0) {
                tableElement.rows[i2].cells[index].insertAdjacentHTML(type, "<th> </th>");
              } else {
                tableElement.rows[i2].cells[index].insertAdjacentHTML(type, "<td> </td>");
              }
            }
            execAfterRender(vditor);
          };
          var deleteRow = function(vditor, range, cellElement) {
            if (cellElement.tagName === "TD") {
              var tbodyElement = cellElement.parentElement.parentElement;
              if (cellElement.parentElement.previousElementSibling) {
                range.selectNodeContents(cellElement.parentElement.previousElementSibling.lastElementChild);
              } else {
                range.selectNodeContents(tbodyElement.previousElementSibling.lastElementChild.lastElementChild);
              }
              if (tbodyElement.childElementCount === 1) {
                tbodyElement.remove();
              } else {
                cellElement.parentElement.remove();
              }
              range.collapse(false);
              (0, selection.Hc)(range);
              execAfterRender(vditor);
            }
          };
          var deleteColumn = function(vditor, range, tableElement, cellElement) {
            var index = 0;
            var previousElement = cellElement.previousElementSibling;
            while (previousElement) {
              index++;
              previousElement = previousElement.previousElementSibling;
            }
            if (cellElement.previousElementSibling || cellElement.nextElementSibling) {
              range.selectNodeContents(cellElement.previousElementSibling || cellElement.nextElementSibling);
              range.collapse(true);
            }
            for (var i2 = 0; i2 < tableElement.rows.length; i2++) {
              var cells = tableElement.rows[i2].cells;
              if (cells.length === 1) {
                tableElement.remove();
                highlightToolbar(vditor);
                break;
              }
              cells[index].remove();
            }
            (0, selection.Hc)(range);
            execAfterRender(vditor);
          };
          var fixTable = function(vditor, event, range) {
            var startContainer = range.startContainer;
            var cellElement = (0, hasClosest.lG)(startContainer, "TD") || (0, hasClosest.lG)(startContainer, "TH");
            if (cellElement) {
              if (!(0, compatibility.yl)(event) && !event.altKey && event.key === "Enter") {
                if (!cellElement.lastElementChild || cellElement.lastElementChild && (!cellElement.lastElementChild.isSameNode(cellElement.lastChild) || cellElement.lastElementChild.tagName !== "BR")) {
                  cellElement.insertAdjacentHTML("beforeend", "<br>");
                }
                var brElement = document.createElement("br");
                range.insertNode(brElement);
                range.setStartAfter(brElement);
                execAfterRender(vditor);
                scrollCenter(vditor);
                event.preventDefault();
                return true;
              }
              if (event.key === "Tab") {
                if (event.shiftKey) {
                  goPreviousCell(cellElement, range);
                  event.preventDefault();
                  return true;
                }
                var nextElement = cellElement.nextElementSibling;
                if (!nextElement) {
                  if (cellElement.parentElement.nextElementSibling) {
                    nextElement = cellElement.parentElement.nextElementSibling.firstElementChild;
                  } else if (cellElement.parentElement.parentElement.tagName === "THEAD" && cellElement.parentElement.parentElement.nextElementSibling) {
                    nextElement = cellElement.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild;
                  } else {
                    nextElement = null;
                  }
                }
                if (nextElement) {
                  range.selectNodeContents(nextElement);
                  (0, selection.Hc)(range);
                }
                event.preventDefault();
                return true;
              }
              var tableElement = cellElement.parentElement.parentElement.parentElement;
              if (event.key === "ArrowUp") {
                event.preventDefault();
                if (cellElement.tagName === "TH") {
                  if (tableElement.previousElementSibling) {
                    range.selectNodeContents(tableElement.previousElementSibling);
                    range.collapse(false);
                    (0, selection.Hc)(range);
                  } else {
                    insertEmptyBlock(vditor, "beforebegin");
                  }
                  return true;
                }
                var m = 0;
                var trElement = cellElement.parentElement;
                for (; m < trElement.cells.length; m++) {
                  if (trElement.cells[m].isSameNode(cellElement)) {
                    break;
                  }
                }
                var previousElement = trElement.previousElementSibling;
                if (!previousElement) {
                  previousElement = trElement.parentElement.previousElementSibling.firstChild;
                }
                range.selectNodeContents(previousElement.cells[m]);
                range.collapse(false);
                (0, selection.Hc)(range);
                return true;
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                var trElement = cellElement.parentElement;
                if (!trElement.nextElementSibling && cellElement.tagName === "TD") {
                  if (tableElement.nextElementSibling) {
                    range.selectNodeContents(tableElement.nextElementSibling);
                    range.collapse(true);
                    (0, selection.Hc)(range);
                  } else {
                    insertEmptyBlock(vditor, "afterend");
                  }
                  return true;
                }
                var m = 0;
                for (; m < trElement.cells.length; m++) {
                  if (trElement.cells[m].isSameNode(cellElement)) {
                    break;
                  }
                }
                var nextElement = trElement.nextElementSibling;
                if (!nextElement) {
                  nextElement = trElement.parentElement.nextElementSibling.firstChild;
                }
                range.selectNodeContents(nextElement.cells[m]);
                range.collapse(true);
                (0, selection.Hc)(range);
                return true;
              }
              if (vditor.currentMode === "wysiwyg" && !(0, compatibility.yl)(event) && event.key === "Enter" && !event.shiftKey && event.altKey) {
                var inputElement = vditor.wysiwyg.popover.querySelector(".vditor-input");
                inputElement.focus();
                inputElement.select();
                event.preventDefault();
                return true;
              }
              if (!(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && event.key === "Backspace" && range.startOffset === 0 && range.toString() === "") {
                var previousCellElement = goPreviousCell(cellElement, range, false);
                if (!previousCellElement && tableElement) {
                  if (tableElement.textContent.trim() === "") {
                    tableElement.outerHTML = '<p data-block="0"><wbr>\n</p>';
                    (0, selection.ib)(vditor[vditor.currentMode].element, range);
                  } else {
                    range.setStartBefore(tableElement);
                    range.collapse(true);
                  }
                  execAfterRender(vditor);
                }
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u21E7\u2318F", event)) {
                insertRowAbove(vditor, range, cellElement);
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u2318=", event)) {
                insertRow(vditor, range, cellElement);
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u21E7\u2318G", event)) {
                insertColumn(vditor, tableElement, cellElement, "beforebegin");
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u21E7\u2318=", event)) {
                insertColumn(vditor, tableElement, cellElement);
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u2318-", event)) {
                deleteRow(vditor, range, cellElement);
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u21E7\u2318-", event)) {
                deleteColumn(vditor, range, tableElement, cellElement);
                event.preventDefault();
                return true;
              }
              if (matchHotKey("\u21E7\u2318L", event)) {
                if (vditor.currentMode === "ir") {
                  setTableAlign(tableElement, "left");
                  execAfterRender(vditor);
                  event.preventDefault();
                  return true;
                } else {
                  var itemElement = vditor.wysiwyg.popover.querySelector('[data-type="left"]');
                  if (itemElement) {
                    itemElement.click();
                    event.preventDefault();
                    return true;
                  }
                }
              }
              if (matchHotKey("\u21E7\u2318C", event)) {
                if (vditor.currentMode === "ir") {
                  setTableAlign(tableElement, "center");
                  execAfterRender(vditor);
                  event.preventDefault();
                  return true;
                } else {
                  var itemElement = vditor.wysiwyg.popover.querySelector('[data-type="center"]');
                  if (itemElement) {
                    itemElement.click();
                    event.preventDefault();
                    return true;
                  }
                }
              }
              if (matchHotKey("\u21E7\u2318R", event)) {
                if (vditor.currentMode === "ir") {
                  setTableAlign(tableElement, "right");
                  execAfterRender(vditor);
                  event.preventDefault();
                  return true;
                } else {
                  var itemElement = vditor.wysiwyg.popover.querySelector('[data-type="right"]');
                  if (itemElement) {
                    itemElement.click();
                    event.preventDefault();
                    return true;
                  }
                }
              }
            }
            return false;
          };
          var fixCodeBlock = function(vditor, event, codeRenderElement, range) {
            if (codeRenderElement.tagName === "PRE" && matchHotKey("\u2318A", event)) {
              range.selectNodeContents(codeRenderElement.firstElementChild);
              event.preventDefault();
              return true;
            }
            if (vditor.options.tab && event.key === "Tab" && !event.shiftKey && range.toString() === "") {
              range.insertNode(document.createTextNode(vditor.options.tab));
              range.collapse(false);
              execAfterRender(vditor);
              event.preventDefault();
              return true;
            }
            if (event.key === "Backspace" && !(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey) {
              var codePosition = (0, selection.im)(codeRenderElement, vditor[vditor.currentMode].element, range);
              if ((codePosition.start === 0 || codePosition.start === 1 && codeRenderElement.innerText === "\n") && range.toString() === "") {
                codeRenderElement.parentElement.outerHTML = '<p data-block="0"><wbr>' + codeRenderElement.firstElementChild.innerHTML + "</p>";
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                event.preventDefault();
                return true;
              }
            }
            if (!(0, compatibility.yl)(event) && !event.altKey && event.key === "Enter") {
              if (!codeRenderElement.firstElementChild.textContent.endsWith("\n")) {
                codeRenderElement.firstElementChild.insertAdjacentText("beforeend", "\n");
              }
              range.extractContents();
              range.insertNode(document.createTextNode("\n"));
              range.collapse(false);
              (0, selection.Hc)(range);
              if (!(0, compatibility.vU)()) {
                if (vditor.currentMode === "wysiwyg") {
                  input_input(vditor, range);
                } else {
                  input(vditor, range);
                }
              }
              scrollCenter(vditor);
              event.preventDefault();
              return true;
            }
            return false;
          };
          var fixBlockquote = function(vditor, range, event, pElement) {
            var startContainer = range.startContainer;
            var blockquoteElement = (0, hasClosest.lG)(startContainer, "BLOCKQUOTE");
            if (blockquoteElement && range.toString() === "") {
              if (event.key === "Backspace" && !(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && (0, selection.im)(blockquoteElement, vditor[vditor.currentMode].element, range).start === 0) {
                range.insertNode(document.createElement("wbr"));
                blockquoteElement.outerHTML = blockquoteElement.innerHTML;
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                event.preventDefault();
                return true;
              }
              if (pElement && event.key === "Enter" && !(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && pElement.parentElement.tagName === "BLOCKQUOTE") {
                var isEmpty = false;
                if (pElement.innerHTML.replace(constants.g.ZWSP, "") === "\n" || pElement.innerHTML.replace(constants.g.ZWSP, "") === "") {
                  isEmpty = true;
                  pElement.remove();
                } else if (pElement.innerHTML.endsWith("\n\n") && (0, selection.im)(pElement, vditor[vditor.currentMode].element, range).start === pElement.textContent.length - 1) {
                  pElement.innerHTML = pElement.innerHTML.substr(0, pElement.innerHTML.length - 2);
                  isEmpty = true;
                }
                if (isEmpty) {
                  blockquoteElement.insertAdjacentHTML("afterend", '<p data-block="0">' + constants.g.ZWSP + "<wbr>\n</p>");
                  (0, selection.ib)(vditor[vditor.currentMode].element, range);
                  execAfterRender(vditor);
                  event.preventDefault();
                  return true;
                }
              }
              var blockElement = (0, hasClosest.F9)(startContainer);
              if (vditor.currentMode === "wysiwyg" && blockElement && matchHotKey("\u21E7\u2318;", event)) {
                range.insertNode(document.createElement("wbr"));
                blockElement.outerHTML = '<blockquote data-block="0">' + blockElement.outerHTML + "</blockquote>";
                (0, selection.ib)(vditor.wysiwyg.element, range);
                afterRenderEvent(vditor);
                event.preventDefault();
                return true;
              }
              if (insertAfterBlock(vditor, event, range, blockquoteElement, blockquoteElement)) {
                return true;
              }
              if (insertBeforeBlock(vditor, event, range, blockquoteElement, blockquoteElement)) {
                return true;
              }
            }
            return false;
          };
          var fixTask = function(vditor, range, event) {
            var startContainer = range.startContainer;
            var taskItemElement = (0, hasClosest.fb)(startContainer, "vditor-task");
            if (taskItemElement) {
              if (matchHotKey("\u21E7\u2318J", event)) {
                var inputElement = taskItemElement.firstElementChild;
                if (inputElement.checked) {
                  inputElement.removeAttribute("checked");
                } else {
                  inputElement.setAttribute("checked", "checked");
                }
                execAfterRender(vditor);
                event.preventDefault();
                return true;
              }
              if (event.key === "Backspace" && !(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && range.toString() === "" && range.startOffset === 1 && (startContainer.nodeType === 3 && startContainer.previousSibling && startContainer.previousSibling.tagName === "INPUT" || startContainer.nodeType !== 3)) {
                var previousElement = taskItemElement.previousElementSibling;
                taskItemElement.querySelector("input").remove();
                if (previousElement) {
                  var lastNode = (0, hasClosest.DX)(previousElement);
                  lastNode.parentElement.insertAdjacentHTML("beforeend", "<wbr>" + taskItemElement.innerHTML.trim());
                  taskItemElement.remove();
                } else {
                  taskItemElement.parentElement.insertAdjacentHTML("beforebegin", '<p data-block="0"><wbr>' + (taskItemElement.innerHTML.trim() || "\n") + "</p>");
                  if (taskItemElement.nextElementSibling) {
                    taskItemElement.remove();
                  } else {
                    taskItemElement.parentElement.remove();
                  }
                }
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                event.preventDefault();
                return true;
              }
              if (event.key === "Enter" && !(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey) {
                if (taskItemElement.textContent.trim() === "") {
                  if ((0, hasClosest.fb)(taskItemElement.parentElement, "vditor-task")) {
                    var topListElement = (0, hasClosest.O9)(startContainer);
                    if (topListElement) {
                      listOutdent(vditor, taskItemElement, range, topListElement);
                    }
                  } else {
                    if (taskItemElement.nextElementSibling) {
                      var afterHTML_2 = "";
                      var beforeHTML_1 = "";
                      var isAfter_1 = false;
                      Array.from(taskItemElement.parentElement.children).forEach(function(taskItem) {
                        if (taskItemElement.isSameNode(taskItem)) {
                          isAfter_1 = true;
                        } else {
                          if (isAfter_1) {
                            afterHTML_2 += taskItem.outerHTML;
                          } else {
                            beforeHTML_1 += taskItem.outerHTML;
                          }
                        }
                      });
                      var parentTagName = taskItemElement.parentElement.tagName;
                      var dataMarker = taskItemElement.parentElement.tagName === "OL" ? "" : ' data-marker="' + taskItemElement.parentElement.getAttribute("data-marker") + '"';
                      var startAttribute = "";
                      if (beforeHTML_1) {
                        startAttribute = taskItemElement.parentElement.tagName === "UL" ? "" : ' start="1"';
                        beforeHTML_1 = "<" + parentTagName + ' data-tight="true"' + dataMarker + ' data-block="0">' + beforeHTML_1 + "</" + parentTagName + ">";
                      }
                      taskItemElement.parentElement.outerHTML = beforeHTML_1 + '<p data-block="0"><wbr>\n</p><' + parentTagName + '\n data-tight="true"' + dataMarker + ' data-block="0"' + startAttribute + ">" + afterHTML_2 + "</" + parentTagName + ">";
                    } else {
                      taskItemElement.parentElement.insertAdjacentHTML("afterend", '<p data-block="0"><wbr>\n</p>');
                      if (taskItemElement.parentElement.querySelectorAll("li").length === 1) {
                        taskItemElement.parentElement.remove();
                      } else {
                        taskItemElement.remove();
                      }
                    }
                  }
                } else if (startContainer.nodeType !== 3 && range.startOffset === 0 && startContainer.firstChild.tagName === "INPUT") {
                  range.setStart(startContainer.childNodes[1], 1);
                } else {
                  range.setEndAfter(taskItemElement.lastChild);
                  taskItemElement.insertAdjacentHTML("afterend", '<li class="vditor-task" data-marker="' + taskItemElement.getAttribute("data-marker") + '"><input type="checkbox"> <wbr></li>');
                  document.querySelector("wbr").after(range.extractContents());
                }
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                scrollCenter(vditor);
                event.preventDefault();
                return true;
              }
            }
            return false;
          };
          var fixDelete = function(vditor, range, event, pElement) {
            if (range.startContainer.nodeType !== 3) {
              var rangeElement = range.startContainer.children[range.startOffset];
              if (rangeElement && rangeElement.tagName === "HR") {
                range.selectNodeContents(rangeElement.previousElementSibling);
                range.collapse(false);
                event.preventDefault();
                return true;
              }
            }
            if (pElement) {
              var previousElement = pElement.previousElementSibling;
              if (previousElement && (0, selection.im)(pElement, vditor[vditor.currentMode].element, range).start === 0 && ((0, compatibility.vU)() && previousElement.tagName === "HR" || previousElement.tagName === "TABLE")) {
                if (previousElement.tagName === "TABLE") {
                  var lastCellElement = previousElement.lastElementChild.lastElementChild.lastElementChild;
                  lastCellElement.innerHTML = lastCellElement.innerHTML.trimLeft() + "<wbr>" + pElement.textContent.trim();
                  pElement.remove();
                } else {
                  previousElement.remove();
                }
                (0, selection.ib)(vditor[vditor.currentMode].element, range);
                execAfterRender(vditor);
                event.preventDefault();
                return true;
              }
            }
            return false;
          };
          var fixHR = function(range) {
            if ((0, compatibility.vU)() && range.startContainer.nodeType !== 3 && range.startContainer.tagName === "HR") {
              range.setStartBefore(range.startContainer);
            }
          };
          var fixFirefoxArrowUpTable = function(event, blockElement, range) {
            var _a, _b;
            if (!(0, compatibility.vU)()) {
              return false;
            }
            if (event.key === "ArrowUp" && blockElement && ((_a = blockElement.previousElementSibling) === null || _a === void 0 ? void 0 : _a.tagName) === "TABLE") {
              var tableElement = blockElement.previousElementSibling;
              range.selectNodeContents(tableElement.rows[tableElement.rows.length - 1].lastElementChild);
              range.collapse(false);
              event.preventDefault();
              return true;
            }
            if (event.key === "ArrowDown" && blockElement && ((_b = blockElement.nextElementSibling) === null || _b === void 0 ? void 0 : _b.tagName) === "TABLE") {
              range.selectNodeContents(blockElement.nextElementSibling.rows[0].cells[0]);
              range.collapse(true);
              event.preventDefault();
              return true;
            }
            return false;
          };
          var paste = function(vditor, event, callback) {
            return fixBrowserBehavior_awaiter(void 0, void 0, void 0, function() {
              var textHTML, textPlain, files, renderers, renderLinkDest, doc, height, code, codeElement, position, tempElement, blockElement, range;
              var _a;
              return fixBrowserBehavior_generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    event.stopPropagation();
                    event.preventDefault();
                    if ("clipboardData" in event) {
                      textHTML = event.clipboardData.getData("text/html");
                      textPlain = event.clipboardData.getData("text/plain");
                      files = event.clipboardData.files;
                    } else {
                      textHTML = event.dataTransfer.getData("text/html");
                      textPlain = event.dataTransfer.getData("text/plain");
                      if (event.dataTransfer.types[0] === "Files") {
                        files = event.dataTransfer.items;
                      }
                    }
                    renderers = {};
                    renderLinkDest = function(node, entering) {
                      if (!entering) {
                        return ["", Lute.WalkContinue];
                      }
                      var src2 = node.TokensStr();
                      if (node.__internal_object__.Parent.Type === 34 && src2 && src2.indexOf("file://") === -1 && vditor.options.upload.linkToImgUrl) {
                        var xhr_1 = new XMLHttpRequest();
                        xhr_1.open("POST", vditor.options.upload.linkToImgUrl);
                        if (vditor.options.upload.token) {
                          xhr_1.setRequestHeader("X-Upload-Token", vditor.options.upload.token);
                        }
                        if (vditor.options.upload.withCredentials) {
                          xhr_1.withCredentials = true;
                        }
                        setHeaders(vditor, xhr_1);
                        xhr_1.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                        xhr_1.onreadystatechange = function() {
                          if (xhr_1.readyState === XMLHttpRequest.DONE) {
                            if (xhr_1.status === 200) {
                              var responseText = xhr_1.responseText;
                              if (vditor.options.upload.linkToImgFormat) {
                                responseText = vditor.options.upload.linkToImgFormat(xhr_1.responseText);
                              }
                              var responseJSON_1 = JSON.parse(responseText);
                              if (responseJSON_1.code !== 0) {
                                vditor.tip.show(responseJSON_1.msg);
                                return;
                              }
                              var original_1 = responseJSON_1.data.originalURL;
                              if (vditor.currentMode === "sv") {
                                vditor.sv.element.querySelectorAll(".vditor-sv__marker--link").forEach(function(item) {
                                  if (item.textContent === original_1) {
                                    item.textContent = responseJSON_1.data.url;
                                  }
                                });
                              } else {
                                var imgElement = vditor[vditor.currentMode].element.querySelector('img[src="' + original_1 + '"]');
                                imgElement.src = responseJSON_1.data.url;
                                if (vditor.currentMode === "ir") {
                                  imgElement.previousElementSibling.previousElementSibling.innerHTML = responseJSON_1.data.url;
                                }
                              }
                              execAfterRender(vditor);
                            } else {
                              vditor.tip.show(xhr_1.responseText);
                            }
                            if (vditor.options.upload.linkToImgCallback) {
                              vditor.options.upload.linkToImgCallback(xhr_1.responseText);
                            }
                          }
                        };
                        xhr_1.send(JSON.stringify({ url: src2 }));
                      }
                      if (vditor.currentMode === "ir") {
                        return ['<span class="vditor-ir__marker vditor-ir__marker--link">' + src2 + "</span>", Lute.WalkContinue];
                      } else if (vditor.currentMode === "wysiwyg") {
                        return ["", Lute.WalkContinue];
                      } else {
                        return ['<span class="vditor-sv__marker--link">' + src2 + "</span>", Lute.WalkContinue];
                      }
                    };
                    if (textHTML.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === '<a href="' + textPlain + '">' + textPlain + "</a>" || textHTML.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === '<!--StartFragment--><a href="' + textPlain + '">' + textPlain + "</a><!--EndFragment-->") {
                      textHTML = "";
                    }
                    doc = new DOMParser().parseFromString(textHTML, "text/html");
                    if (doc.body) {
                      textHTML = doc.body.innerHTML;
                    }
                    textHTML = Lute.Sanitize(textHTML);
                    vditor.wysiwyg.getComments(vditor);
                    height = vditor[vditor.currentMode].element.scrollHeight;
                    code = processPasteCode(textHTML, textPlain, vditor.currentMode);
                    codeElement = vditor.currentMode === "sv" ? (0, hasClosest.a1)(event.target, "data-type", "code-block") : (0, hasClosest.lG)(event.target, "CODE");
                    if (!codeElement)
                      return [3, 1];
                    if (vditor.currentMode === "sv") {
                      document.execCommand("insertHTML", false, textPlain.replace(/&/g, "&amp;").replace(/</g, "&lt;"));
                    } else {
                      position = (0, selection.im)(event.target, vditor[vditor.currentMode].element);
                      if (codeElement.parentElement.tagName !== "PRE") {
                        textPlain += constants.g.ZWSP;
                      }
                      codeElement.textContent = codeElement.textContent.substring(0, position.start) + textPlain + codeElement.textContent.substring(position.end);
                      (0, selection.$j)(position.start + textPlain.length, position.start + textPlain.length, codeElement.parentElement);
                      if ((_a = codeElement.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling.classList.contains("vditor-" + vditor.currentMode + "__preview")) {
                        codeElement.parentElement.nextElementSibling.innerHTML = codeElement.outerHTML;
                        processCodeRender(codeElement.parentElement.nextElementSibling, vditor);
                      }
                    }
                    return [3, 6];
                  case 1:
                    if (!code)
                      return [3, 2];
                    callback.pasteCode(code);
                    return [3, 6];
                  case 2:
                    if (!(textHTML.trim() !== ""))
                      return [3, 3];
                    tempElement = document.createElement("div");
                    tempElement.innerHTML = textHTML;
                    tempElement.querySelectorAll("[style]").forEach(function(e2) {
                      e2.removeAttribute("style");
                    });
                    tempElement.querySelectorAll(".vditor-copy").forEach(function(e2) {
                      e2.remove();
                    });
                    if (vditor.currentMode === "ir") {
                      renderers.HTML2VditorIRDOM = { renderLinkDest };
                      vditor.lute.SetJSRenderers({ renderers });
                      (0, selection.oC)(vditor.lute.HTML2VditorIRDOM(tempElement.innerHTML), vditor);
                    } else if (vditor.currentMode === "wysiwyg") {
                      renderers.HTML2VditorDOM = { renderLinkDest };
                      vditor.lute.SetJSRenderers({ renderers });
                      (0, selection.oC)(vditor.lute.HTML2VditorDOM(tempElement.innerHTML), vditor);
                    } else {
                      renderers.Md2VditorSVDOM = { renderLinkDest };
                      vditor.lute.SetJSRenderers({ renderers });
                      processPaste(vditor, vditor.lute.HTML2Md(tempElement.innerHTML).trimRight());
                    }
                    vditor.outline.render(vditor);
                    return [3, 6];
                  case 3:
                    if (!(files.length > 0 && vditor.options.upload.url))
                      return [3, 5];
                    return [4, uploadFiles(vditor, files)];
                  case 4:
                    _b.sent();
                    return [3, 6];
                  case 5:
                    if (textPlain.trim() !== "" && files.length === 0) {
                      if (vditor.currentMode === "ir") {
                        renderers.Md2VditorIRDOM = { renderLinkDest };
                        vditor.lute.SetJSRenderers({ renderers });
                        (0, selection.oC)(vditor.lute.Md2VditorIRDOM(textPlain), vditor);
                      } else if (vditor.currentMode === "wysiwyg") {
                        renderers.Md2VditorDOM = { renderLinkDest };
                        vditor.lute.SetJSRenderers({ renderers });
                        (0, selection.oC)(vditor.lute.Md2VditorDOM(textPlain), vditor);
                      } else {
                        renderers.Md2VditorSVDOM = { renderLinkDest };
                        vditor.lute.SetJSRenderers({ renderers });
                        processPaste(vditor, textPlain);
                      }
                      vditor.outline.render(vditor);
                    }
                    _b.label = 6;
                  case 6:
                    if (vditor.currentMode !== "sv") {
                      blockElement = (0, hasClosest.F9)((0, selection.zh)(vditor).startContainer);
                      if (blockElement) {
                        range = (0, selection.zh)(vditor);
                        vditor[vditor.currentMode].element.querySelectorAll("wbr").forEach(function(wbr) {
                          wbr.remove();
                        });
                        range.insertNode(document.createElement("wbr"));
                        if (vditor.currentMode === "wysiwyg") {
                          blockElement.outerHTML = vditor.lute.SpinVditorDOM(blockElement.outerHTML);
                        } else {
                          blockElement.outerHTML = vditor.lute.SpinVditorIRDOM(blockElement.outerHTML);
                        }
                        (0, selection.ib)(vditor[vditor.currentMode].element, range);
                      }
                      vditor[vditor.currentMode].element.querySelectorAll(".vditor-" + vditor.currentMode + "__preview[data-render='2']").forEach(function(item) {
                        processCodeRender(item, vditor);
                      });
                    }
                    vditor.wysiwyg.triggerRemoveComment(vditor);
                    execAfterRender(vditor);
                    if (vditor[vditor.currentMode].element.scrollHeight - height > Math.min(vditor[vditor.currentMode].element.clientHeight, window.innerHeight) / 2) {
                      scrollCenter(vditor);
                    }
                    return [2];
                }
              });
            });
          };
          var templateObject_1;
          ;
          var processHint = function(vditor) {
            vditor.hint.render(vditor);
            var startContainer = (0, selection.zh)(vditor).startContainer;
            var preBeforeElement = (0, hasClosest.a1)(startContainer, "data-type", "code-block-info");
            if (preBeforeElement) {
              if (preBeforeElement.textContent.replace(constants.g.ZWSP, "") === "" && vditor.hint.recentLanguage) {
                preBeforeElement.textContent = constants.g.ZWSP + vditor.hint.recentLanguage;
                var range = (0, selection.zh)(vditor);
                range.selectNodeContents(preBeforeElement);
              } else {
                var matchLangData_1 = [];
                var key_1 = preBeforeElement.textContent.substring(0, (0, selection.im)(preBeforeElement, vditor.ir.element).start).replace(constants.g.ZWSP, "");
                constants.g.CODE_LANGUAGES.forEach(function(keyName) {
                  if (keyName.indexOf(key_1.toLowerCase()) > -1) {
                    matchLangData_1.push({
                      html: keyName,
                      value: keyName
                    });
                  }
                });
                vditor.hint.genHTML(matchLangData_1, key_1, vditor);
              }
            }
          };
          var process_processAfterRender = function(vditor, options) {
            if (options === void 0) {
              options = {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: true
              };
            }
            if (options.enableHint) {
              processHint(vditor);
            }
            clearTimeout(vditor.ir.processTimeoutId);
            vditor.ir.processTimeoutId = window.setTimeout(function() {
              if (vditor.ir.composingLock) {
                return;
              }
              var text = getMarkdown(vditor);
              if (typeof vditor.options.input === "function" && options.enableInput) {
                vditor.options.input(text);
              }
              if (vditor.options.counter.enable) {
                vditor.counter.render(vditor, text);
              }
              if (vditor.options.cache.enable && (0, compatibility.pK)()) {
                localStorage.setItem(vditor.options.cache.id, text);
                if (vditor.options.cache.after) {
                  vditor.options.cache.after(text);
                }
              }
              if (vditor.devtools) {
                vditor.devtools.renderEchart(vditor);
              }
              if (options.enableAddUndoStack) {
                vditor.undo.addToUndoStack(vditor);
              }
            }, vditor.options.undoDelay);
          };
          var process_processHeading = function(vditor, value) {
            var range = (0, selection.zh)(vditor);
            var headingElement = (0, hasClosest.F9)(range.startContainer) || range.startContainer;
            if (headingElement) {
              var headingMarkerElement = headingElement.querySelector(".vditor-ir__marker--heading");
              if (headingMarkerElement) {
                headingMarkerElement.innerHTML = value;
              } else {
                headingElement.insertAdjacentText("afterbegin", value);
                range.selectNodeContents(headingElement);
                range.collapse(false);
              }
              input(vditor, range.cloneRange());
              highlightToolbarIR(vditor);
            }
          };
          var removeInline = function(range, vditor, type) {
            var inlineElement = (0, hasClosest.a1)(range.startContainer, "data-type", type);
            if (inlineElement) {
              inlineElement.firstElementChild.remove();
              inlineElement.lastElementChild.remove();
              range.insertNode(document.createElement("wbr"));
              var tempElement = document.createElement("div");
              tempElement.innerHTML = vditor.lute.SpinVditorIRDOM(inlineElement.outerHTML);
              inlineElement.outerHTML = tempElement.firstElementChild.innerHTML.trim();
            }
          };
          var process_processToolbar = function(vditor, actionBtn, prefix, suffix) {
            var range = (0, selection.zh)(vditor);
            var commandName = actionBtn.getAttribute("data-type");
            var typeElement = range.startContainer;
            if (typeElement.nodeType === 3) {
              typeElement = typeElement.parentElement;
            }
            var useHighlight = true;
            if (actionBtn.classList.contains("vditor-menu--current")) {
              if (commandName === "quote") {
                var quoteElement = (0, hasClosest.lG)(typeElement, "BLOCKQUOTE");
                if (quoteElement) {
                  range.insertNode(document.createElement("wbr"));
                  quoteElement.outerHTML = quoteElement.innerHTML.trim() === "" ? '<p data-block="0">' + quoteElement.innerHTML + "</p>" : quoteElement.innerHTML;
                }
              } else if (commandName === "link") {
                var aElement = (0, hasClosest.a1)(range.startContainer, "data-type", "a");
                if (aElement) {
                  var aTextElement = (0, hasClosest.fb)(range.startContainer, "vditor-ir__link");
                  if (aTextElement) {
                    range.insertNode(document.createElement("wbr"));
                    aElement.outerHTML = aTextElement.innerHTML;
                  } else {
                    aElement.outerHTML = aElement.querySelector(".vditor-ir__link").innerHTML + "<wbr>";
                  }
                }
              } else if (commandName === "italic") {
                removeInline(range, vditor, "em");
              } else if (commandName === "bold") {
                removeInline(range, vditor, "strong");
              } else if (commandName === "strike") {
                removeInline(range, vditor, "s");
              } else if (commandName === "inline-code") {
                removeInline(range, vditor, "code");
              } else if (commandName === "check" || commandName === "list" || commandName === "ordered-list") {
                listToggle(vditor, range, commandName);
                useHighlight = false;
                actionBtn.classList.remove("vditor-menu--current");
              }
            } else {
              if (vditor.ir.element.childNodes.length === 0) {
                vditor.ir.element.innerHTML = '<p data-block="0"><wbr></p>';
                (0, selection.ib)(vditor.ir.element, range);
              }
              var blockElement = (0, hasClosest.F9)(range.startContainer);
              if (commandName === "line") {
                if (blockElement) {
                  var hrHTML = '<hr data-block="0"><p data-block="0"><wbr>\n</p>';
                  if (blockElement.innerHTML.trim() === "") {
                    blockElement.outerHTML = hrHTML;
                  } else {
                    blockElement.insertAdjacentHTML("afterend", hrHTML);
                  }
                }
              } else if (commandName === "quote") {
                if (blockElement) {
                  range.insertNode(document.createElement("wbr"));
                  blockElement.outerHTML = '<blockquote data-block="0">' + blockElement.outerHTML + "</blockquote>";
                  useHighlight = false;
                  actionBtn.classList.add("vditor-menu--current");
                }
              } else if (commandName === "link") {
                var html = void 0;
                if (range.toString() === "") {
                  html = prefix + "<wbr>" + suffix;
                } else {
                  html = "" + prefix + range.toString() + suffix.replace(")", "<wbr>)");
                }
                document.execCommand("insertHTML", false, html);
                useHighlight = false;
                actionBtn.classList.add("vditor-menu--current");
              } else if (commandName === "italic" || commandName === "bold" || commandName === "strike" || commandName === "inline-code" || commandName === "code" || commandName === "table") {
                var html = void 0;
                if (range.toString() === "") {
                  html = prefix + "<wbr>" + suffix;
                } else {
                  if (commandName === "code" || commandName === "table") {
                    html = "" + prefix + range.toString() + "<wbr>" + suffix;
                  } else {
                    html = "" + prefix + range.toString() + suffix + "<wbr>";
                  }
                  range.deleteContents();
                }
                if (commandName === "table" || commandName === "code") {
                  html = "\n" + html + "\n\n";
                }
                var spanElement = document.createElement("span");
                spanElement.innerHTML = html;
                range.insertNode(spanElement);
                input(vditor, range);
                if (commandName === "table") {
                  range.selectNodeContents(getSelection().getRangeAt(0).startContainer.parentElement);
                  (0, selection.Hc)(range);
                }
              } else if (commandName === "check" || commandName === "list" || commandName === "ordered-list") {
                listToggle(vditor, range, commandName, false);
                useHighlight = false;
                removeCurrentToolbar(vditor.toolbar.elements, ["check", "list", "ordered-list"]);
                actionBtn.classList.add("vditor-menu--current");
              }
            }
            (0, selection.ib)(vditor.ir.element, range);
            process_processAfterRender(vditor);
            if (useHighlight) {
              highlightToolbarIR(vditor);
            }
          };
          ;
          var Hint = function() {
            function Hint2(hintExtends) {
              var _this = this;
              this.splitChar = "";
              this.lastIndex = -1;
              this.fillEmoji = function(element, vditor) {
                _this.element.style.display = "none";
                var value = decodeURIComponent(element.getAttribute("data-value"));
                var range = window.getSelection().getRangeAt(0);
                if (vditor.currentMode === "ir") {
                  var preBeforeElement = (0, hasClosest.a1)(range.startContainer, "data-type", "code-block-info");
                  if (preBeforeElement) {
                    preBeforeElement.textContent = constants.g.ZWSP + value.trimRight();
                    range.selectNodeContents(preBeforeElement);
                    range.collapse(false);
                    process_processAfterRender(vditor);
                    preBeforeElement.parentElement.querySelectorAll("code").forEach(function(item) {
                      item.className = "language-" + value.trimRight();
                    });
                    processCodeRender(preBeforeElement.parentElement.querySelector(".vditor-ir__preview"), vditor);
                    _this.recentLanguage = value.trimRight();
                    return;
                  }
                }
                if (vditor.currentMode === "wysiwyg" && range.startContainer.nodeType !== 3 && range.startContainer.firstElementChild.classList.contains("vditor-input")) {
                  var inputElement = range.startContainer.firstElementChild;
                  inputElement.value = value.trimRight();
                  range.selectNodeContents(inputElement);
                  range.collapse(false);
                  inputElement.dispatchEvent(new CustomEvent("input"));
                  _this.recentLanguage = value.trimRight();
                  return;
                }
                range.setStart(range.startContainer, _this.lastIndex);
                range.deleteContents();
                if (vditor.options.hint.parse) {
                  if (vditor.currentMode === "sv") {
                    (0, selection.oC)(vditor.lute.SpinVditorSVDOM(value), vditor);
                  } else if (vditor.currentMode === "wysiwyg") {
                    (0, selection.oC)(vditor.lute.SpinVditorDOM(value), vditor);
                  } else {
                    (0, selection.oC)(vditor.lute.SpinVditorIRDOM(value), vditor);
                  }
                } else {
                  (0, selection.oC)(value, vditor);
                }
                if (_this.splitChar === ":" && value.indexOf(":") > -1 && vditor.currentMode !== "sv") {
                  range.insertNode(document.createTextNode(" "));
                }
                range.collapse(false);
                (0, selection.Hc)(range);
                if (vditor.currentMode === "wysiwyg") {
                  var preElement = (0, hasClosest.fb)(range.startContainer, "vditor-wysiwyg__block");
                  if (preElement && preElement.lastElementChild.classList.contains("vditor-wysiwyg__preview")) {
                    preElement.lastElementChild.innerHTML = preElement.firstElementChild.innerHTML;
                    processCodeRender(preElement.lastElementChild, vditor);
                  }
                } else if (vditor.currentMode === "ir") {
                  var preElement = (0, hasClosest.fb)(range.startContainer, "vditor-ir__marker--pre");
                  if (preElement && preElement.nextElementSibling.classList.contains("vditor-ir__preview")) {
                    preElement.nextElementSibling.innerHTML = preElement.innerHTML;
                    processCodeRender(preElement.nextElementSibling, vditor);
                  }
                }
                execAfterRender(vditor);
              };
              this.timeId = -1;
              this.element = document.createElement("div");
              this.element.className = "vditor-hint";
              this.recentLanguage = "";
              hintExtends.push({ key: ":" });
            }
            Hint2.prototype.render = function(vditor) {
              var _this = this;
              if (!window.getSelection().focusNode) {
                return;
              }
              var currentLineValue;
              var range = getSelection().getRangeAt(0);
              currentLineValue = range.startContainer.textContent.substring(0, range.startOffset) || "";
              var key = this.getKey(currentLineValue, vditor.options.hint.extend);
              if (typeof key === "undefined") {
                this.element.style.display = "none";
                clearTimeout(this.timeId);
              } else {
                if (this.splitChar === ":") {
                  var emojiHint_1 = key === "" ? vditor.options.hint.emoji : vditor.lute.GetEmojis();
                  var matchEmojiData_1 = [];
                  Object.keys(emojiHint_1).forEach(function(keyName) {
                    if (keyName.indexOf(key.toLowerCase()) === 0) {
                      if (emojiHint_1[keyName].indexOf(".") > -1) {
                        matchEmojiData_1.push({
                          html: '<img src="' + emojiHint_1[keyName] + '" title=":' + keyName + ':"/> :' + keyName + ":",
                          value: ":" + keyName + ":"
                        });
                      } else {
                        matchEmojiData_1.push({
                          html: '<span class="vditor-hint__emoji">' + emojiHint_1[keyName] + "</span>" + keyName,
                          value: emojiHint_1[keyName]
                        });
                      }
                    }
                  });
                  this.genHTML(matchEmojiData_1, key, vditor);
                } else {
                  vditor.options.hint.extend.forEach(function(item) {
                    if (item.key === _this.splitChar) {
                      clearTimeout(_this.timeId);
                      _this.timeId = window.setTimeout(function() {
                        _this.genHTML(item.hint(key), key, vditor);
                      }, vditor.options.hint.delay);
                    }
                  });
                }
              }
            };
            Hint2.prototype.genHTML = function(data, key, vditor) {
              var _this = this;
              if (data.length === 0) {
                this.element.style.display = "none";
                return;
              }
              var editorElement = vditor[vditor.currentMode].element;
              var textareaPosition = (0, selection.Ny)(editorElement);
              var x = textareaPosition.left + (vditor.options.outline.position === "left" ? vditor.outline.element.offsetWidth : 0);
              var y2 = textareaPosition.top;
              var hintsHTML = "";
              data.forEach(function(hintData, i2) {
                if (i2 > 7) {
                  return;
                }
                var html = hintData.html;
                if (key !== "") {
                  var lastIndex = html.lastIndexOf(">") + 1;
                  var replaceHtml = html.substr(lastIndex);
                  var replaceIndex = replaceHtml.toLowerCase().indexOf(key.toLowerCase());
                  if (replaceIndex > -1) {
                    replaceHtml = replaceHtml.substring(0, replaceIndex) + "<b>" + replaceHtml.substring(replaceIndex, replaceIndex + key.length) + "</b>" + replaceHtml.substring(replaceIndex + key.length);
                    html = html.substr(0, lastIndex) + replaceHtml;
                  }
                }
                hintsHTML += '<button data-value="' + encodeURIComponent(hintData.value) + ' "\n' + (i2 === 0 ? "class='vditor-hint--current'" : "") + "> " + html + "</button>";
              });
              this.element.innerHTML = hintsHTML;
              var lineHeight = parseInt(document.defaultView.getComputedStyle(editorElement, null).getPropertyValue("line-height"), 10);
              this.element.style.top = y2 + (lineHeight || 22) + "px";
              this.element.style.left = x + "px";
              this.element.style.display = "block";
              this.element.style.right = "auto";
              this.element.querySelectorAll("button").forEach(function(element) {
                element.addEventListener("click", function(event) {
                  _this.fillEmoji(element, vditor);
                  event.preventDefault();
                });
              });
              if (this.element.getBoundingClientRect().bottom > window.innerHeight) {
                this.element.style.top = y2 - this.element.offsetHeight + "px";
              }
              if (this.element.getBoundingClientRect().right > window.innerWidth) {
                this.element.style.left = "auto";
                this.element.style.right = "0";
              }
            };
            Hint2.prototype.select = function(event, vditor) {
              if (this.element.querySelectorAll("button").length === 0 || this.element.style.display === "none") {
                return false;
              }
              var currentHintElement = this.element.querySelector(".vditor-hint--current");
              if (event.key === "ArrowDown") {
                event.preventDefault();
                event.stopPropagation();
                currentHintElement.removeAttribute("class");
                if (!currentHintElement.nextElementSibling) {
                  this.element.children[0].className = "vditor-hint--current";
                } else {
                  currentHintElement.nextElementSibling.className = "vditor-hint--current";
                }
                return true;
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                event.stopPropagation();
                currentHintElement.removeAttribute("class");
                if (!currentHintElement.previousElementSibling) {
                  var length_1 = this.element.children.length;
                  this.element.children[length_1 - 1].className = "vditor-hint--current";
                } else {
                  currentHintElement.previousElementSibling.className = "vditor-hint--current";
                }
                return true;
              } else if (!(0, compatibility.yl)(event) && !event.shiftKey && !event.altKey && event.key === "Enter" && !event.isComposing) {
                event.preventDefault();
                event.stopPropagation();
                this.fillEmoji(currentHintElement, vditor);
                return true;
              }
              return false;
            };
            Hint2.prototype.getKey = function(currentLineValue, extend) {
              var _this = this;
              this.lastIndex = -1;
              this.splitChar = "";
              extend.forEach(function(item) {
                var currentLastIndex = currentLineValue.lastIndexOf(item.key);
                if (_this.lastIndex < currentLastIndex) {
                  _this.splitChar = item.key;
                  _this.lastIndex = currentLastIndex;
                }
              });
              var key;
              if (this.lastIndex === -1) {
                return key;
              }
              var lineArray = currentLineValue.split(this.splitChar);
              var lastItem = lineArray[lineArray.length - 1];
              var maxLength = 32;
              if (lineArray.length > 1 && lastItem.trim() === lastItem) {
                if (lineArray.length === 2 && lineArray[0] === "" && lineArray[1].length < maxLength) {
                  key = lineArray[1];
                } else {
                  var preChar = lineArray[lineArray.length - 2].slice(-1);
                  if ((0, code160to32.X)(preChar) === " " && lastItem.length < maxLength) {
                    key = lastItem;
                  }
                }
              }
              return key;
            };
            return Hint2;
          }();
          ;
          var IR = function() {
            function IR2(vditor) {
              this.composingLock = false;
              var divElement = document.createElement("div");
              divElement.className = "vditor-ir";
              divElement.innerHTML = '<pre class="vditor-reset" placeholder="' + vditor.options.placeholder + '"\n contenteditable="true" spellcheck="false"></pre>';
              this.element = divElement.firstElementChild;
              this.bindEvent(vditor);
              focusEvent(vditor, this.element);
              dblclickEvent(vditor, this.element);
              blurEvent(vditor, this.element);
              hotkeyEvent(vditor, this.element);
              selectEvent(vditor, this.element);
              dropEvent(vditor, this.element);
              copyEvent(vditor, this.element, this.copy);
              cutEvent(vditor, this.element, this.copy);
            }
            IR2.prototype.copy = function(event, vditor) {
              var range = getSelection().getRangeAt(0);
              if (range.toString() === "") {
                return;
              }
              event.stopPropagation();
              event.preventDefault();
              var tempElement = document.createElement("div");
              tempElement.appendChild(range.cloneContents());
              event.clipboardData.setData("text/plain", vditor.lute.VditorIRDOM2Md(tempElement.innerHTML).trim());
              event.clipboardData.setData("text/html", "");
            };
            IR2.prototype.bindEvent = function(vditor) {
              var _this = this;
              this.element.addEventListener("paste", function(event) {
                paste(vditor, event, {
                  pasteCode: function(code) {
                    document.execCommand("insertHTML", false, code);
                  }
                });
              });
              this.element.addEventListener("compositionstart", function(event) {
                _this.composingLock = true;
              });
              this.element.addEventListener("compositionend", function(event) {
                if (!(0, compatibility.vU)()) {
                  input(vditor, getSelection().getRangeAt(0).cloneRange());
                }
                _this.composingLock = false;
              });
              this.element.addEventListener("input", function(event) {
                if (event.inputType === "deleteByDrag" || event.inputType === "insertFromDrop") {
                  return;
                }
                if (_this.preventInput) {
                  _this.preventInput = false;
                  return;
                }
                if (_this.composingLock || event.data === "\u2018" || event.data === "\u201C" || event.data === "\u300A") {
                  return;
                }
                input(vditor, getSelection().getRangeAt(0).cloneRange(), false, event);
              });
              this.element.addEventListener("click", function(event) {
                if (event.target.tagName === "INPUT") {
                  if (event.target.checked) {
                    event.target.setAttribute("checked", "checked");
                  } else {
                    event.target.removeAttribute("checked");
                  }
                  _this.preventInput = true;
                  process_processAfterRender(vditor);
                  return;
                }
                var range = (0, selection.zh)(vditor);
                var previewElement = (0, hasClosest.fb)(event.target, "vditor-ir__preview");
                if (!previewElement) {
                  previewElement = (0, hasClosest.fb)(range.startContainer, "vditor-ir__preview");
                }
                if (previewElement) {
                  if (previewElement.previousElementSibling.firstElementChild) {
                    range.selectNodeContents(previewElement.previousElementSibling.firstElementChild);
                  } else {
                    range.selectNodeContents(previewElement.previousElementSibling);
                  }
                  range.collapse(true);
                  (0, selection.Hc)(range);
                  scrollCenter(vditor);
                }
                if (event.target.tagName === "IMG") {
                  var linkElement = event.target.parentElement.querySelector(".vditor-ir__marker--link");
                  if (linkElement) {
                    range.selectNode(linkElement);
                    (0, selection.Hc)(range);
                  }
                }
                var aElement = (0, hasClosest.a1)(event.target, "data-type", "a");
                if (aElement && !aElement.classList.contains("vditor-ir__node--expand")) {
                  window.open(aElement.querySelector(":scope > .vditor-ir__marker--link").textContent);
                  return;
                }
                if (event.target.isEqualNode(_this.element) && _this.element.lastElementChild && range.collapsed) {
                  var lastRect = _this.element.lastElementChild.getBoundingClientRect();
                  if (event.y > lastRect.top + lastRect.height) {
                    if (_this.element.lastElementChild.tagName === "P" && _this.element.lastElementChild.textContent.trim().replace(constants.g.ZWSP, "") === "") {
                      range.selectNodeContents(_this.element.lastElementChild);
                      range.collapse(false);
                    } else {
                      _this.element.insertAdjacentHTML("beforeend", '<p data-block="0">' + constants.g.ZWSP + "<wbr></p>");
                      (0, selection.ib)(_this.element, range);
                    }
                  }
                }
                if (range.toString() === "") {
                  expandMarker(range, vditor);
                } else {
                  setTimeout(function() {
                    expandMarker((0, selection.zh)(vditor), vditor);
                  });
                }
                clickToc(event, vditor);
                highlightToolbarIR(vditor);
              });
              this.element.addEventListener("keyup", function(event) {
                if (event.isComposing || (0, compatibility.yl)(event)) {
                  return;
                }
                if (event.key === "Enter") {
                  scrollCenter(vditor);
                }
                highlightToolbarIR(vditor);
                if ((event.key === "Backspace" || event.key === "Delete") && vditor.ir.element.innerHTML !== "" && vditor.ir.element.childNodes.length === 1 && vditor.ir.element.firstElementChild && vditor.ir.element.firstElementChild.tagName === "P" && vditor.ir.element.firstElementChild.childElementCount === 0 && (vditor.ir.element.textContent === "" || vditor.ir.element.textContent === "\n")) {
                  vditor.ir.element.innerHTML = "";
                  return;
                }
                var range = (0, selection.zh)(vditor);
                if (event.key === "Backspace") {
                  if ((0, compatibility.vU)() && range.startContainer.textContent === "\n" && range.startOffset === 1) {
                    range.startContainer.textContent = "";
                    expandMarker(range, vditor);
                  }
                  _this.element.querySelectorAll(".language-math").forEach(function(item) {
                    var brElement = item.querySelector("br");
                    if (brElement) {
                      brElement.remove();
                    }
                  });
                } else if (event.key.indexOf("Arrow") > -1) {
                  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    processHint(vditor);
                  }
                  expandMarker(range, vditor);
                } else if (event.keyCode === 229 && event.code === "" && event.key === "Unidentified") {
                  expandMarker(range, vditor);
                }
                var previewRenderElement = (0, hasClosest.fb)(range.startContainer, "vditor-ir__preview");
                if (previewRenderElement) {
                  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    if (previewRenderElement.previousElementSibling.firstElementChild) {
                      range.selectNodeContents(previewRenderElement.previousElementSibling.firstElementChild);
                    } else {
                      range.selectNodeContents(previewRenderElement.previousElementSibling);
                    }
                    range.collapse(false);
                    event.preventDefault();
                    return true;
                  }
                  if (previewRenderElement.tagName === "SPAN" && (event.key === "ArrowDown" || event.key === "ArrowRight")) {
                    if (previewRenderElement.parentElement.getAttribute("data-type") === "html-entity") {
                      previewRenderElement.parentElement.insertAdjacentText("afterend", constants.g.ZWSP);
                      range.setStart(previewRenderElement.parentElement.nextSibling, 1);
                    } else {
                      range.selectNodeContents(previewRenderElement.parentElement.lastElementChild);
                    }
                    range.collapse(false);
                    event.preventDefault();
                    return true;
                  }
                }
              });
            };
            return IR2;
          }();
          ;
          var getHTML = function(vditor) {
            if (vditor.currentMode === "sv") {
              return vditor.lute.Md2HTML(getMarkdown(vditor));
            } else if (vditor.currentMode === "wysiwyg") {
              return vditor.lute.VditorDOM2HTML(vditor.wysiwyg.element.innerHTML);
            } else if (vditor.currentMode === "ir") {
              return vditor.lute.VditorIRDOM2HTML(vditor.ir.element.innerHTML);
            }
          };
          var setLute = __webpack_require__(792);
          var outlineRender = __webpack_require__(198);
          ;
          var Outline = function() {
            function Outline2(outlineLabel) {
              this.element = document.createElement("div");
              this.element.className = "vditor-outline";
              this.element.innerHTML = '<div class="vditor-outline__title">' + outlineLabel + '</div>\n<div class="vditor-outline__content"></div>';
            }
            Outline2.prototype.render = function(vditor) {
              var html = "";
              if (vditor.preview.element.style.display === "block") {
                html = (0, outlineRender.k)(vditor.preview.element.lastElementChild, this.element.lastElementChild, vditor);
              } else {
                html = (0, outlineRender.k)(vditor[vditor.currentMode].element, this.element.lastElementChild, vditor);
              }
              return html;
            };
            Outline2.prototype.toggle = function(vditor, show) {
              var _a;
              if (show === void 0) {
                show = true;
              }
              var btnElement = (_a = vditor.toolbar.elements.outline) === null || _a === void 0 ? void 0 : _a.firstElementChild;
              if (show && window.innerWidth >= constants.g.MOBILE_WIDTH) {
                this.element.style.display = "block";
                this.render(vditor);
                btnElement === null || btnElement === void 0 ? void 0 : btnElement.classList.add("vditor-menu--current");
              } else {
                this.element.style.display = "none";
                btnElement === null || btnElement === void 0 ? void 0 : btnElement.classList.remove("vditor-menu--current");
              }
              if (getSelection().rangeCount > 0) {
                var range = getSelection().getRangeAt(0);
                if (vditor[vditor.currentMode].element.contains(range.startContainer)) {
                  (0, selection.Hc)(range);
                } else {
                  vditor[vditor.currentMode].element.focus();
                }
              }
              setPadding(vditor);
            };
            return Outline2;
          }();
          var mediaRender = __webpack_require__(207);
          ;
          var Preview = function() {
            function Preview2(vditor) {
              var _this = this;
              this.element = document.createElement("div");
              this.element.className = "vditor-preview";
              var previewElement = document.createElement("div");
              previewElement.className = "vditor-reset";
              if (vditor.options.classes.preview) {
                previewElement.classList.add(vditor.options.classes.preview);
              }
              previewElement.style.maxWidth = vditor.options.preview.maxWidth + "px";
              previewElement.addEventListener("copy", function(event) {
                if (event.target.tagName === "TEXTAREA") {
                  return;
                }
                var tempElement = document.createElement("div");
                tempElement.className = "vditor-reset";
                tempElement.appendChild(getSelection().getRangeAt(0).cloneContents());
                _this.copyToX(vditor, tempElement);
                event.preventDefault();
              });
              previewElement.addEventListener("click", function(event) {
                var spanElement = (0, hasClosest.lG)(event.target, "SPAN");
                if (spanElement && (0, hasClosest.fb)(spanElement, "vditor-toc")) {
                  var headingElement = previewElement.querySelector("#" + spanElement.getAttribute("data-target-id"));
                  if (headingElement) {
                    _this.element.scrollTop = headingElement.offsetTop;
                  }
                  return;
                }
                if (event.target.tagName === "IMG") {
                  (0, preview_image.E)(event.target, vditor.options.lang, vditor.options.theme);
                }
              });
              var actions = vditor.options.preview.actions;
              var actionElement = document.createElement("div");
              actionElement.className = "vditor-preview__action";
              var actionHtml = [];
              for (var i2 = 0; i2 < actions.length; i2++) {
                var action = actions[i2];
                if (typeof action === "object") {
                  actionHtml.push('<button type="button" data-type="' + action.key + '" class="' + action.className + '"' + (action.tooltip ? ' aria-label="' + action.tooltip + '"' : "") + '">' + action.text + "</button>");
                  continue;
                }
                switch (action) {
                  case "desktop":
                    actionHtml.push('<button type="button" class="vditor-preview__action--current" data-type="desktop">Desktop</button>');
                    break;
                  case "tablet":
                    actionHtml.push('<button type="button" data-type="tablet">Tablet</button>');
                    break;
                  case "mobile":
                    actionHtml.push('<button type="button" data-type="mobile">Mobile/Wechat</button>');
                    break;
                  case "mp-wechat":
                    actionHtml.push('<button type="button" data-type="mp-wechat" class="vditor-tooltipped vditor-tooltipped__w" aria-label="\u590D\u5236\u5230\u516C\u4F17\u53F7"><svg><use xlink:href="#vditor-icon-mp-wechat"></use></svg></button>');
                    break;
                  case "zhihu":
                    actionHtml.push('<button type="button" data-type="zhihu" class="vditor-tooltipped vditor-tooltipped__w" aria-label="\u590D\u5236\u5230\u77E5\u4E4E"><svg><use xlink:href="#vditor-icon-zhihu"></use></svg></button>');
                    break;
                }
              }
              actionElement.innerHTML = actionHtml.join("");
              if (actions.length === 0) {
                actionElement.style.display = "none";
              }
              this.element.appendChild(actionElement);
              this.element.appendChild(previewElement);
              actionElement.addEventListener((0, compatibility.Le)(), function(event) {
                var btn = (0, hasClosestByHeadings.S)(event.target, "BUTTON");
                if (!btn) {
                  return;
                }
                var type = btn.getAttribute("data-type");
                var actionCustom = actions.find(function(w) {
                  return (w === null || w === void 0 ? void 0 : w.key) === type;
                });
                if (actionCustom) {
                  actionCustom.click(type);
                  return;
                }
                if (type === "mp-wechat" || type === "zhihu") {
                  _this.copyToX(vditor, _this.element.lastElementChild.cloneNode(true), type);
                  return;
                }
                if (type === "desktop") {
                  previewElement.style.width = "auto";
                } else if (type === "tablet") {
                  previewElement.style.width = "780px";
                } else {
                  previewElement.style.width = "360px";
                }
                if (previewElement.scrollWidth > previewElement.parentElement.clientWidth) {
                  previewElement.style.width = "auto";
                }
                _this.render(vditor);
                actionElement.querySelectorAll("button").forEach(function(item) {
                  item.classList.remove("vditor-preview__action--current");
                });
                btn.classList.add("vditor-preview__action--current");
              });
            }
            Preview2.prototype.render = function(vditor, value) {
              var _this = this;
              clearTimeout(this.mdTimeoutId);
              if (this.element.style.display === "none") {
                if (this.element.getAttribute("data-type") === "renderPerformance") {
                  vditor.tip.hide();
                }
                return;
              }
              if (value) {
                this.element.lastElementChild.innerHTML = value;
                return;
              }
              if (getMarkdown(vditor).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === "") {
                this.element.lastElementChild.innerHTML = "";
                return;
              }
              var renderStartTime = new Date().getTime();
              var markdownText = getMarkdown(vditor);
              this.mdTimeoutId = window.setTimeout(function() {
                if (vditor.options.preview.url) {
                  var xhr_1 = new XMLHttpRequest();
                  xhr_1.open("POST", vditor.options.preview.url);
                  xhr_1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                  xhr_1.onreadystatechange = function() {
                    if (xhr_1.readyState === XMLHttpRequest.DONE) {
                      if (xhr_1.status === 200) {
                        var responseJSON = JSON.parse(xhr_1.responseText);
                        if (responseJSON.code !== 0) {
                          vditor.tip.show(responseJSON.msg);
                          return;
                        }
                        if (vditor.options.preview.transform) {
                          responseJSON.data = vditor.options.preview.transform(responseJSON.data);
                        }
                        _this.element.lastElementChild.innerHTML = responseJSON.data;
                        _this.afterRender(vditor, renderStartTime);
                      } else {
                        var html2 = vditor.lute.Md2HTML(markdownText);
                        if (vditor.options.preview.transform) {
                          html2 = vditor.options.preview.transform(html2);
                        }
                        _this.element.lastElementChild.innerHTML = html2;
                        _this.afterRender(vditor, renderStartTime);
                      }
                    }
                  };
                  xhr_1.send(JSON.stringify({ markdownText }));
                } else {
                  var html = vditor.lute.Md2HTML(markdownText);
                  if (vditor.options.preview.transform) {
                    html = vditor.options.preview.transform(html);
                  }
                  _this.element.lastElementChild.innerHTML = html;
                  _this.afterRender(vditor, renderStartTime);
                }
              }, vditor.options.preview.delay);
            };
            Preview2.prototype.afterRender = function(vditor, startTime) {
              if (vditor.options.preview.parse) {
                vditor.options.preview.parse(this.element);
              }
              var time = new Date().getTime() - startTime;
              if (new Date().getTime() - startTime > 2600) {
                vditor.tip.show(window.VditorI18n.performanceTip.replace("${x}", time.toString()));
                vditor.preview.element.setAttribute("data-type", "renderPerformance");
              } else if (vditor.preview.element.getAttribute("data-type") === "renderPerformance") {
                vditor.tip.hide();
                vditor.preview.element.removeAttribute("data-type");
              }
              var cmtFocusElement = vditor.preview.element.querySelector(".vditor-comment--focus");
              if (cmtFocusElement) {
                cmtFocusElement.classList.remove("vditor-comment--focus");
              }
              (0, codeRender.O)(vditor.preview.element.lastElementChild);
              (0, highlightRender.s)(vditor.options.preview.hljs, vditor.preview.element.lastElementChild, vditor.options.cdn);
              (0, mermaidRender.i)(vditor.preview.element.lastElementChild, vditor.options.cdn, vditor.options.theme);
              (0, flowchartRender.P)(vditor.preview.element.lastElementChild, vditor.options.cdn);
              (0, graphvizRender.v)(vditor.preview.element.lastElementChild, vditor.options.cdn);
              (0, chartRender.p)(vditor.preview.element.lastElementChild, vditor.options.cdn, vditor.options.theme);
              (0, mindmapRender.P)(vditor.preview.element.lastElementChild, vditor.options.cdn, vditor.options.theme);
              (0, plantumlRender.B)(vditor.preview.element.lastElementChild, vditor.options.cdn);
              (0, abcRender.Q)(vditor.preview.element.lastElementChild, vditor.options.cdn);
              (0, mediaRender.Y)(vditor.preview.element.lastElementChild);
              var editorElement = vditor.preview.element;
              var tocHTML = vditor.outline.render(vditor);
              if (tocHTML === "") {
                tocHTML = "[ToC]";
              }
              editorElement.querySelectorAll('[data-type="toc-block"]').forEach(function(item) {
                item.innerHTML = tocHTML;
                (0, mathRender.H)(item, {
                  cdn: vditor.options.cdn,
                  math: vditor.options.preview.math
                });
              });
              (0, mathRender.H)(vditor.preview.element.lastElementChild, {
                cdn: vditor.options.cdn,
                math: vditor.options.preview.math
              });
            };
            Preview2.prototype.copyToX = function(vditor, copyElement, type) {
              if (type === void 0) {
                type = "mp-wechat";
              }
              if (type !== "zhihu") {
                copyElement.querySelectorAll(".katex-html .base").forEach(function(item) {
                  item.style.display = "initial";
                });
              } else {
                copyElement.querySelectorAll(".language-math").forEach(function(item) {
                  item.outerHTML = '<img class="Formula-image" data-eeimg="true" src="//www.zhihu.com/equation?tex=" alt="' + item.getAttribute("data-math") + '\\" style="display: block; margin: 0 auto; max-width: 100%;">';
                });
              }
              copyElement.style.backgroundColor = "#fff";
              copyElement.querySelectorAll("code").forEach(function(item) {
                item.style.backgroundImage = "none";
              });
              this.element.append(copyElement);
              var range = copyElement.ownerDocument.createRange();
              range.selectNode(copyElement);
              (0, selection.Hc)(range);
              document.execCommand("copy");
              this.element.lastElementChild.remove();
              vditor.tip.show("\u5DF2\u590D\u5236\uFF0C\u53EF\u5230" + (type === "zhihu" ? "\u77E5\u4E4E" : "\u5FAE\u4FE1\u516C\u4F17\u53F7\u5E73\u53F0") + "\u8FDB\u884C\u7C98\u8D34");
            };
            return Preview2;
          }();
          ;
          var Resize = function() {
            function Resize2(vditor) {
              this.element = document.createElement("div");
              this.element.className = "vditor-resize vditor-resize--" + vditor.options.resize.position;
              this.element.innerHTML = '<div><svg><use xlink:href="#vditor-icon-resize"></use></svg></div>';
              this.bindEvent(vditor);
            }
            Resize2.prototype.bindEvent = function(vditor) {
              var _this = this;
              this.element.addEventListener("mousedown", function(event) {
                var documentSelf = document;
                var y2 = event.clientY;
                var height = vditor.element.offsetHeight;
                var minHeight = 63 + vditor.element.querySelector(".vditor-toolbar").clientHeight;
                documentSelf.ondragstart = function() {
                  return false;
                };
                if (window.captureEvents) {
                  window.captureEvents();
                }
                _this.element.classList.add("vditor-resize--selected");
                documentSelf.onmousemove = function(moveEvent) {
                  if (vditor.options.resize.position === "top") {
                    vditor.element.style.height = Math.max(minHeight, height + (y2 - moveEvent.clientY)) + "px";
                  } else {
                    vditor.element.style.height = Math.max(minHeight, height + (moveEvent.clientY - y2)) + "px";
                  }
                  if (vditor.options.typewriterMode) {
                    vditor.sv.element.style.paddingBottom = vditor.sv.element.parentElement.offsetHeight / 2 + "px";
                  }
                };
                documentSelf.onmouseup = function() {
                  if (vditor.options.resize.after) {
                    vditor.options.resize.after(vditor.element.offsetHeight - height);
                  }
                  if (window.captureEvents) {
                    window.captureEvents();
                  }
                  documentSelf.onmousemove = null;
                  documentSelf.onmouseup = null;
                  documentSelf.ondragstart = null;
                  documentSelf.onselectstart = null;
                  documentSelf.onselect = null;
                  _this.element.classList.remove("vditor-resize--selected");
                };
              });
            };
            return Resize2;
          }();
          ;
          var Editor = function() {
            function Editor2(vditor) {
              this.composingLock = false;
              this.element = document.createElement("pre");
              this.element.className = "vditor-sv vditor-reset";
              this.element.setAttribute("placeholder", vditor.options.placeholder);
              this.element.setAttribute("contenteditable", "true");
              this.element.setAttribute("spellcheck", "false");
              this.bindEvent(vditor);
              focusEvent(vditor, this.element);
              blurEvent(vditor, this.element);
              hotkeyEvent(vditor, this.element);
              selectEvent(vditor, this.element);
              dropEvent(vditor, this.element);
              copyEvent(vditor, this.element, this.copy);
              cutEvent(vditor, this.element, this.copy);
            }
            Editor2.prototype.copy = function(event, vditor) {
              event.stopPropagation();
              event.preventDefault();
              event.clipboardData.setData("text/plain", getSelectText(vditor[vditor.currentMode].element));
            };
            Editor2.prototype.bindEvent = function(vditor) {
              var _this = this;
              this.element.addEventListener("paste", function(event) {
                paste(vditor, event, {
                  pasteCode: function(code) {
                    document.execCommand("insertHTML", false, code);
                  }
                });
              });
              this.element.addEventListener("scroll", function() {
                if (vditor.preview.element.style.display !== "block") {
                  return;
                }
                var textScrollTop = _this.element.scrollTop;
                var textHeight = _this.element.clientHeight;
                var textScrollHeight = _this.element.scrollHeight - parseFloat(_this.element.style.paddingBottom || "0");
                var preview = vditor.preview.element;
                if (textScrollTop / textHeight > 0.5) {
                  preview.scrollTop = (textScrollTop + textHeight) * preview.scrollHeight / textScrollHeight - textHeight;
                } else {
                  preview.scrollTop = textScrollTop * preview.scrollHeight / textScrollHeight;
                }
              });
              this.element.addEventListener("compositionstart", function(event) {
                _this.composingLock = true;
              });
              this.element.addEventListener("compositionend", function(event) {
                if (!(0, compatibility.vU)()) {
                  inputEvent(vditor, event);
                }
                _this.composingLock = false;
              });
              this.element.addEventListener("input", function(event) {
                if (event.inputType === "deleteByDrag" || event.inputType === "insertFromDrop") {
                  return;
                }
                if (_this.composingLock || event.data === "\u2018" || event.data === "\u201C" || event.data === "\u300A") {
                  return;
                }
                if (_this.preventInput) {
                  _this.preventInput = false;
                  return;
                }
                inputEvent(vditor, event);
              });
              this.element.addEventListener("keyup", function(event) {
                if (event.isComposing || (0, compatibility.yl)(event)) {
                  return;
                }
                if ((event.key === "Backspace" || event.key === "Delete") && vditor.sv.element.innerHTML !== "" && vditor.sv.element.childNodes.length === 1 && vditor.sv.element.firstElementChild && vditor.sv.element.firstElementChild.tagName === "DIV" && vditor.sv.element.firstElementChild.childElementCount === 2 && (vditor.sv.element.firstElementChild.textContent === "" || vditor.sv.element.textContent === "\n")) {
                  vditor.sv.element.innerHTML = "";
                  return;
                }
                if (event.key === "Enter") {
                  scrollCenter(vditor);
                }
              });
            };
            return Editor2;
          }();
          ;
          var Tip = function() {
            function Tip2() {
              this.element = document.createElement("div");
              this.element.className = "vditor-tip";
            }
            Tip2.prototype.show = function(text, time) {
              var _this = this;
              if (time === void 0) {
                time = 6e3;
              }
              this.element.className = "vditor-tip vditor-tip--show";
              if (time === 0) {
                this.element.innerHTML = '<div class="vditor-tip__content">' + text + '\n<div class="vditor-tip__close">X</div></div>';
                this.element.querySelector(".vditor-tip__close").addEventListener("click", function() {
                  _this.hide();
                });
                return;
              }
              this.element.innerHTML = '<div class="vditor-tip__content">' + text + "</div>";
              setTimeout(function() {
                _this.hide();
              }, time);
            };
            Tip2.prototype.hide = function() {
              this.element.className = "vditor-messageElementtip";
              this.element.innerHTML = "";
            };
            return Tip2;
          }();
          ;
          var setPreviewMode = function(mode, vditor) {
            if (vditor.options.preview.mode === mode) {
              return;
            }
            vditor.options.preview.mode = mode;
            switch (mode) {
              case "both":
                vditor.sv.element.style.display = "block";
                vditor.preview.element.style.display = "block";
                vditor.preview.render(vditor);
                setCurrentToolbar(vditor.toolbar.elements, ["both"]);
                break;
              case "editor":
                vditor.sv.element.style.display = "block";
                vditor.preview.element.style.display = "none";
                removeCurrentToolbar(vditor.toolbar.elements, ["both"]);
                break;
              default:
                break;
            }
            if (vditor.devtools) {
              vditor.devtools.renderEchart(vditor);
            }
          };
          ;
          var Both_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Both = function(_super) {
            Both_extends(Both2, _super);
            function Both2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              if (vditor.options.preview.mode === "both") {
                _this.element.children[0].classList.add("vditor-menu--current");
              }
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                var btnElement = _this.element.firstElementChild;
                if (btnElement.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                event.preventDefault();
                if (vditor.currentMode !== "sv") {
                  return;
                }
                if (vditor.options.preview.mode === "both") {
                  setPreviewMode("editor", vditor);
                } else {
                  setPreviewMode("both", vditor);
                }
              });
              return _this;
            }
            return Both2;
          }(MenuItem);
          ;
          var Br = function() {
            function Br2() {
              this.element = document.createElement("div");
              this.element.className = "vditor-toolbar__br";
            }
            return Br2;
          }();
          var setCodeTheme = __webpack_require__(968);
          ;
          var CodeTheme_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var CodeTheme = function(_super) {
            CodeTheme_extends(CodeTheme2, _super);
            function CodeTheme2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              var actionBtn = _this.element.children[0];
              var panelElement = document.createElement("div");
              panelElement.className = "vditor-hint" + (menuItem.level === 2 ? "" : " vditor-panel--arrow");
              var innerHTML = "";
              constants.g.CODE_THEME.forEach(function(theme) {
                innerHTML += "<button>" + theme + "</button>";
              });
              panelElement.innerHTML = '<div style="overflow: auto;max-height:' + window.innerHeight / 2 + 'px">' + innerHTML + "</div>";
              panelElement.addEventListener((0, compatibility.Le)(), function(event) {
                if (event.target.tagName === "BUTTON") {
                  hidePanel(vditor, ["subToolbar"]);
                  vditor.options.preview.hljs.style = event.target.textContent;
                  (0, setCodeTheme.Y)(event.target.textContent, vditor.options.cdn);
                  event.preventDefault();
                  event.stopPropagation();
                }
              });
              _this.element.appendChild(panelElement);
              toggleSubMenu(vditor, panelElement, actionBtn, menuItem.level);
              return _this;
            }
            return CodeTheme2;
          }(MenuItem);
          ;
          var ContentTheme_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var ContentTheme = function(_super) {
            ContentTheme_extends(ContentTheme2, _super);
            function ContentTheme2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              var actionBtn = _this.element.children[0];
              var panelElement = document.createElement("div");
              panelElement.className = "vditor-hint" + (menuItem.level === 2 ? "" : " vditor-panel--arrow");
              var innerHTML = "";
              Object.keys(vditor.options.preview.theme.list).forEach(function(key) {
                innerHTML += '<button data-type="' + key + '">' + vditor.options.preview.theme.list[key] + "</button>";
              });
              panelElement.innerHTML = '<div style="overflow: auto;max-height:' + window.innerHeight / 2 + 'px">' + innerHTML + "</div>";
              panelElement.addEventListener((0, compatibility.Le)(), function(event) {
                if (event.target.tagName === "BUTTON") {
                  hidePanel(vditor, ["subToolbar"]);
                  vditor.options.preview.theme.current = event.target.getAttribute("data-type");
                  (0, setContentTheme.Z)(vditor.options.preview.theme.current, vditor.options.preview.theme.path);
                  event.preventDefault();
                  event.stopPropagation();
                }
              });
              _this.element.appendChild(panelElement);
              toggleSubMenu(vditor, panelElement, actionBtn, menuItem.level);
              return _this;
            }
            return ContentTheme2;
          }(MenuItem);
          ;
          var Counter = function() {
            function Counter2(vditor) {
              this.element = document.createElement("span");
              this.element.className = "vditor-counter vditor-tooltipped vditor-tooltipped__nw";
              this.render(vditor, "");
            }
            Counter2.prototype.render = function(vditor, mdText) {
              var length = mdText.endsWith("\n") ? mdText.length - 1 : mdText.length;
              if (vditor.options.counter.type === "text" && vditor[vditor.currentMode]) {
                var tempElement = vditor[vditor.currentMode].element.cloneNode(true);
                tempElement.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(item) {
                  item.remove();
                });
                length = tempElement.textContent.length;
              }
              if (typeof vditor.options.counter.max === "number") {
                if (length > vditor.options.counter.max) {
                  this.element.className = "vditor-counter vditor-counter--error";
                } else {
                  this.element.className = "vditor-counter";
                }
                this.element.innerHTML = length + "/" + vditor.options.counter.max;
              } else {
                this.element.innerHTML = "" + length;
              }
              this.element.setAttribute("aria-label", vditor.options.counter.type);
              if (vditor.options.counter.after) {
                vditor.options.counter.after(length, {
                  enable: vditor.options.counter.enable,
                  max: vditor.options.counter.max,
                  type: vditor.options.counter.type
                });
              }
            };
            return Counter2;
          }();
          ;
          var Custom_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Custom = function(_super) {
            Custom_extends(Custom2, _super);
            function Custom2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this.element.children[0].innerHTML = menuItem.icon;
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (event.currentTarget.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                menuItem.click(event, vditor);
              });
              return _this;
            }
            return Custom2;
          }(MenuItem);
          ;
          var Devtools_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Devtools = function(_super) {
            Devtools_extends(Devtools2, _super);
            function Devtools2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this.element.firstElementChild.addEventListener((0, compatibility.Le)(), function(event) {
                var btnElement = _this.element.firstElementChild;
                if (btnElement.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                event.preventDefault();
                if (btnElement.classList.contains("vditor-menu--current")) {
                  btnElement.classList.remove("vditor-menu--current");
                  vditor.devtools.element.style.display = "none";
                  setPadding(vditor);
                } else {
                  btnElement.classList.add("vditor-menu--current");
                  vditor.devtools.element.style.display = "block";
                  setPadding(vditor);
                  vditor.devtools.renderEchart(vditor);
                }
              });
              return _this;
            }
            return Devtools2;
          }(MenuItem);
          ;
          var Divider = function() {
            function Divider2() {
              this.element = document.createElement("div");
              this.element.className = "vditor-toolbar__divider";
            }
            return Divider2;
          }();
          ;
          var Emoji_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Emoji = function(_super) {
            Emoji_extends(Emoji2, _super);
            function Emoji2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              var panelElement = document.createElement("div");
              panelElement.className = "vditor-panel vditor-panel--arrow";
              var commonEmojiHTML = "";
              Object.keys(vditor.options.hint.emoji).forEach(function(key) {
                var emojiValue = vditor.options.hint.emoji[key];
                if (emojiValue.indexOf(".") > -1) {
                  commonEmojiHTML += '<button data-value=":' + key + ': " data-key=":' + key + ':"><img\ndata-value=":' + key + ': " data-key=":' + key + ':" class="vditor-emojis__icon" src="' + emojiValue + '"/></button>';
                } else {
                  commonEmojiHTML += '<button data-value="' + emojiValue + ' "\n data-key="' + key + '"><span class="vditor-emojis__icon">' + emojiValue + "</span></button>";
                }
              });
              var tailHTML = '<div class="vditor-emojis__tail">\n    <span class="vditor-emojis__tip"></span><span>' + (vditor.options.hint.emojiTail || "") + "</span>\n</div>";
              panelElement.innerHTML = '<div class="vditor-emojis" style="max-height: ' + (vditor.options.height === "auto" ? "auto" : vditor.options.height - 80) + 'px">' + commonEmojiHTML + "</div>" + tailHTML;
              _this.element.appendChild(panelElement);
              toggleSubMenu(vditor, panelElement, _this.element.children[0], menuItem.level);
              _this._bindEvent(vditor, panelElement);
              return _this;
            }
            Emoji2.prototype._bindEvent = function(vditor, panelElement) {
              panelElement.querySelectorAll(".vditor-emojis button").forEach(function(element) {
                element.addEventListener((0, compatibility.Le)(), function(event) {
                  event.preventDefault();
                  var value = element.getAttribute("data-value");
                  var range = (0, selection.zh)(vditor);
                  var html = value;
                  if (vditor.currentMode === "wysiwyg") {
                    html = vditor.lute.SpinVditorDOM(value);
                  } else if (vditor.currentMode === "ir") {
                    html = vditor.lute.SpinVditorIRDOM(value);
                  }
                  if (value.indexOf(":") > -1 && vditor.currentMode !== "sv") {
                    var tempElement = document.createElement("div");
                    tempElement.innerHTML = html;
                    html = tempElement.firstElementChild.firstElementChild.outerHTML + " ";
                    (0, selection.oC)(html, vditor);
                  } else {
                    range.extractContents();
                    range.insertNode(document.createTextNode(value));
                  }
                  range.collapse(false);
                  (0, selection.Hc)(range);
                  panelElement.style.display = "none";
                  execAfterRender(vditor);
                });
                element.addEventListener("mouseover", function(event) {
                  if (event.target.tagName === "BUTTON") {
                    panelElement.querySelector(".vditor-emojis__tip").innerHTML = event.target.getAttribute("data-key");
                  }
                });
              });
            };
            return Emoji2;
          }(MenuItem);
          ;
          var download = function(vditor, content, filename) {
            var aElement = document.createElement("a");
            if ("download" in aElement) {
              aElement.download = filename;
              aElement.style.display = "none";
              aElement.href = URL.createObjectURL(new Blob([content]));
              document.body.appendChild(aElement);
              aElement.click();
              aElement.remove();
            } else {
              vditor.tip.show(window.VditorI18n.downloadTip, 0);
            }
          };
          var exportMarkdown = function(vditor) {
            var content = getMarkdown(vditor);
            download(vditor, content, content.substr(0, 10) + ".md");
          };
          var exportPDF = function(vditor) {
            vditor.tip.show(window.VditorI18n.generate, 3800);
            var iframe = document.querySelector("iframe");
            iframe.contentDocument.open();
            iframe.contentDocument.write('<link rel="stylesheet" href="' + vditor.options.cdn + '/dist/index.css"/>\n<script src="' + vditor.options.cdn + `/dist/method.min.js"></script>
<div id="preview"></div>
<script>
window.addEventListener("message", (e) => {
  if(!e.data) {
    return;
  }
  Vditor.preview(document.getElementById('preview'), e.data, {
    markdown: {
      theme: "` + vditor.options.preview.theme + '"\n    },\n    hljs: {\n      style: "' + vditor.options.preview.hljs.style + '"\n    }\n  });\n  setTimeout(() => {\n        window.print();\n    }, 3600);\n}, false);\n</script>');
            iframe.contentDocument.close();
            setTimeout(function() {
              iframe.contentWindow.postMessage(getMarkdown(vditor), "*");
            }, 200);
          };
          var exportHTML = function(vditor) {
            var content = getHTML(vditor);
            var html = '<html><head><link rel="stylesheet" type="text/css" href="' + vditor.options.cdn + '/dist/index.css"/>\n<script src="' + vditor.options.cdn + "/dist/js/i18n/" + vditor.options.lang + '.js"></script>\n<script src="' + vditor.options.cdn + '/dist/method.min.js"></script></head>\n<body><div class="vditor-reset" id="preview">' + content + "</div>\n<script>\n    const previewElement = document.getElementById('preview')\n    Vditor.setContentTheme('" + vditor.options.preview.theme.current + "', '" + vditor.options.preview.theme.path + "');\n    Vditor.codeRender(previewElement);\n    Vditor.highlightRender(" + JSON.stringify(vditor.options.preview.hljs) + ", previewElement, '" + vditor.options.cdn + "');\n    Vditor.mathRender(previewElement, {\n        cdn: '" + vditor.options.cdn + "',\n        math: " + JSON.stringify(vditor.options.preview.math) + ",\n    });\n    Vditor.mermaidRender(previewElement, '" + vditor.options.cdn + "', '" + vditor.options.theme + "');\n    Vditor.flowchartRender(previewElement, '" + vditor.options.cdn + "');\n    Vditor.graphvizRender(previewElement, '" + vditor.options.cdn + "');\n    Vditor.chartRender(previewElement, '" + vditor.options.cdn + "', '" + vditor.options.theme + "');\n    Vditor.mindmapRender(previewElement, '" + vditor.options.cdn + "', '" + vditor.options.theme + "');\n    Vditor.abcRender(previewElement, '" + vditor.options.cdn + `');
    Vditor.mediaRender(previewElement);
    Vditor.speechRender(previewElement);
</script>
<script src="` + vditor.options.cdn + "/dist/js/icons/" + vditor.options.icon + '.js"></script></body></html>';
            download(vditor, html, content.substr(0, 10) + ".html");
          };
          ;
          var Export_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Export = function(_super) {
            Export_extends(Export2, _super);
            function Export2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              var actionBtn = _this.element.children[0];
              var panelElement = document.createElement("div");
              panelElement.className = "vditor-hint" + (menuItem.level === 2 ? "" : " vditor-panel--arrow");
              panelElement.innerHTML = '<button data-type="markdown">Markdown</button>\n<button data-type="pdf">PDF</button>\n<button data-type="html">HTML</button>';
              panelElement.addEventListener((0, compatibility.Le)(), function(event) {
                var btnElement = event.target;
                if (btnElement.tagName === "BUTTON") {
                  switch (btnElement.getAttribute("data-type")) {
                    case "markdown":
                      exportMarkdown(vditor);
                      break;
                    case "pdf":
                      exportPDF(vditor);
                      break;
                    case "html":
                      exportHTML(vditor);
                      break;
                    default:
                      break;
                  }
                  hidePanel(vditor, ["subToolbar"]);
                  event.preventDefault();
                  event.stopPropagation();
                }
              });
              _this.element.appendChild(panelElement);
              toggleSubMenu(vditor, panelElement, actionBtn, menuItem.level);
              return _this;
            }
            return Export2;
          }(MenuItem);
          ;
          var Fullscreen_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Fullscreen = function(_super) {
            Fullscreen_extends(Fullscreen2, _super);
            function Fullscreen2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this._bindEvent(vditor, menuItem);
              return _this;
            }
            Fullscreen2.prototype._bindEvent = function(vditor, menuItem) {
              this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (vditor.element.className.includes("vditor--fullscreen")) {
                  if (!menuItem.level) {
                    this.innerHTML = menuItem.icon;
                  }
                  vditor.element.style.zIndex = "";
                  document.body.style.overflow = "";
                  vditor.element.classList.remove("vditor--fullscreen");
                  Object.keys(vditor.toolbar.elements).forEach(function(key) {
                    var svgElement = vditor.toolbar.elements[key].firstChild;
                    if (svgElement) {
                      svgElement.className = svgElement.className.replace("__s", "__n");
                    }
                  });
                  if (vditor.counter) {
                    vditor.counter.element.className = vditor.counter.element.className.replace("__s", "__n");
                  }
                } else {
                  if (!menuItem.level) {
                    this.innerHTML = '<svg><use xlink:href="#vditor-icon-contract"></use></svg>';
                  }
                  vditor.element.style.zIndex = vditor.options.fullscreen.index.toString();
                  document.body.style.overflow = "hidden";
                  vditor.element.classList.add("vditor--fullscreen");
                  Object.keys(vditor.toolbar.elements).forEach(function(key) {
                    var svgElement = vditor.toolbar.elements[key].firstChild;
                    if (svgElement) {
                      svgElement.className = svgElement.className.replace("__n", "__s");
                    }
                  });
                  if (vditor.counter) {
                    vditor.counter.element.className = vditor.counter.element.className.replace("__n", "__s");
                  }
                }
                if (vditor.devtools) {
                  vditor.devtools.renderEchart(vditor);
                }
                if (menuItem.click) {
                  menuItem.click(event, vditor);
                }
                setPadding(vditor);
                setTypewriterPosition(vditor);
              });
            };
            return Fullscreen2;
          }(MenuItem);
          ;
          var Headings_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Headings = function(_super) {
            Headings_extends(Headings2, _super);
            function Headings2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              var panelElement = document.createElement("div");
              panelElement.className = "vditor-hint vditor-panel--arrow";
              panelElement.innerHTML = '<button data-tag="h1" data-value="# ">' + window.VditorI18n.heading1 + " " + (0, compatibility.ns)("&lt;\u2325\u23181>") + '</button>\n<button data-tag="h2" data-value="## ">' + window.VditorI18n.heading2 + " &lt;" + (0, compatibility.ns)("\u2325\u23182") + '></button>\n<button data-tag="h3" data-value="### ">' + window.VditorI18n.heading3 + " &lt;" + (0, compatibility.ns)("\u2325\u23183") + '></button>\n<button data-tag="h4" data-value="#### ">' + window.VditorI18n.heading4 + " &lt;" + (0, compatibility.ns)("\u2325\u23184") + '></button>\n<button data-tag="h5" data-value="##### ">' + window.VditorI18n.heading5 + " &lt;" + (0, compatibility.ns)("\u2325\u23185") + '></button>\n<button data-tag="h6" data-value="###### ">' + window.VditorI18n.heading6 + " &lt;" + (0, compatibility.ns)("\u2325\u23186") + "></button>";
              _this.element.appendChild(panelElement);
              _this._bindEvent(vditor, panelElement);
              return _this;
            }
            Headings2.prototype._bindEvent = function(vditor, panelElement) {
              var actionBtn = this.element.children[0];
              actionBtn.addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (actionBtn.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                actionBtn.blur();
                if (actionBtn.classList.contains("vditor-menu--current")) {
                  if (vditor.currentMode === "wysiwyg") {
                    removeHeading(vditor);
                    afterRenderEvent(vditor);
                  } else if (vditor.currentMode === "ir") {
                    process_processHeading(vditor, "");
                  }
                  actionBtn.classList.remove("vditor-menu--current");
                } else {
                  hidePanel(vditor, ["subToolbar"]);
                  panelElement.style.display = "block";
                }
              });
              for (var i2 = 0; i2 < 6; i2++) {
                panelElement.children.item(i2).addEventListener((0, compatibility.Le)(), function(event) {
                  event.preventDefault();
                  if (vditor.currentMode === "wysiwyg") {
                    setHeading(vditor, event.target.getAttribute("data-tag"));
                    afterRenderEvent(vditor);
                    actionBtn.classList.add("vditor-menu--current");
                  } else if (vditor.currentMode === "ir") {
                    process_processHeading(vditor, event.target.getAttribute("data-value"));
                    actionBtn.classList.add("vditor-menu--current");
                  } else {
                    processHeading(vditor, event.target.getAttribute("data-value"));
                  }
                  panelElement.style.display = "none";
                });
              }
            };
            return Headings2;
          }(MenuItem);
          ;
          var Help_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Help = function(_super) {
            Help_extends(Help2, _super);
            function Help2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                vditor.tip.show('<div style="margin-bottom:14px;font-size: 14px;line-height: 22px;min-width:300px;max-width: 360px;display: flex;">\n<div style="margin-top: 14px;flex: 1">\n    <div>Markdown \u4F7F\u7528\u6307\u5357</div>\n    <ul style="list-style: none">\n        <li><a href="https://ld246.com/article/1583308420519" target="_blank">\u8BED\u6CD5\u901F\u67E5\u624B\u518C</a></li>\n        <li><a href="https://ld246.com/article/1583129520165" target="_blank">\u57FA\u7840\u8BED\u6CD5</a></li>\n        <li><a href="https://ld246.com/article/1583305480675" target="_blank">\u6269\u5C55\u8BED\u6CD5</a></li>\n        <li><a href="https://ld246.com/article/1582778815353" target="_blank">\u952E\u76D8\u5FEB\u6377\u952E</a></li>\n    </ul>\n</div>\n<div style="margin-top: 14px;flex: 1">\n    <div>Vditor \u652F\u6301</div>\n    <ul style="list-style: none">\n        <li><a href="https://github.com/Vanessa219/vditor/issues" target="_blank">Issues</a></li>\n        <li><a href="https://ld246.com/tag/vditor" target="_blank">\u5B98\u65B9\u8BA8\u8BBA\u533A</a></li>\n        <li><a href="https://ld246.com/article/1549638745630" target="_blank">\u5F00\u53D1\u624B\u518C</a></li>\n        <li><a href="https://ld246.com/guide/markdown" target="_blank">\u6F14\u793A\u5730\u5740</a></li>\n    </ul>\n</div></div>', 0);
              });
              return _this;
            }
            return Help2;
          }(MenuItem);
          ;
          var Indent_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Indent = function(_super) {
            Indent_extends(Indent2, _super);
            function Indent2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED) || vditor.currentMode === "sv") {
                  return;
                }
                var range = (0, selection.zh)(vditor);
                var liElement = (0, hasClosest.lG)(range.startContainer, "LI");
                if (liElement) {
                  listIndent(vditor, liElement, range);
                }
              });
              return _this;
            }
            return Indent2;
          }(MenuItem);
          ;
          var Info_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Info = function(_super) {
            Info_extends(Info2, _super);
            function Info2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                vditor.tip.show('<div style="max-width: 520px; font-size: 14px;line-height: 22px;margin-bottom: 14px;">\n<p style="text-align: center;margin: 14px 0">\n    <em>\u4E0B\u4E00\u4EE3\u7684 Markdown \u7F16\u8F91\u5668\uFF0C\u4E3A\u672A\u6765\u800C\u6784\u5EFA</em>\n</p>\n<div style="display: flex;margin-bottom: 14px;flex-wrap: wrap;align-items: center">\n    <img src="https://cdn.jsdelivr.net/npm/vditor/src/assets/images/logo.png" style="margin: 0 auto;height: 68px"/>\n    <div>&nbsp;&nbsp;</div>\n    <div style="flex: 1;min-width: 250px">\n        Vditor \u662F\u4E00\u6B3E\u6D4F\u89C8\u5668\u7AEF\u7684 Markdown \u7F16\u8F91\u5668\uFF0C\u652F\u6301\u6240\u89C1\u5373\u6240\u5F97\u3001\u5373\u65F6\u6E32\u67D3\uFF08\u7C7B\u4F3C Typora\uFF09\u548C\u5206\u5C4F\u9884\u89C8\u6A21\u5F0F\u3002\n        \u5B83\u4F7F\u7528 TypeScript \u5B9E\u73B0\uFF0C\u652F\u6301\u539F\u751F JavaScript\u3001Vue\u3001React\u3001Angular\uFF0C\u63D0\u4F9B<a target="_blank" href="https://b3log.org/siyuan">\u684C\u9762\u7248</a>\u3002\n    </div>\n</div>\n<div style="display: flex;flex-wrap: wrap;">\n    <ul style="list-style: none;flex: 1;min-width:148px">\n        <li>\n        \u9879\u76EE\u5730\u5740\uFF1A<a href="https://b3log.org/vditor" target="_blank">b3log.org/vditor</a>\n        </li>\n        <li>\n        \u5F00\u6E90\u534F\u8BAE\uFF1AMIT\n        </li>\n    </ul>\n    <ul style="list-style: none;margin-right: 18px">\n        <li>\n        \u7EC4\u4EF6\u7248\u672C\uFF1AVditor v' + constants.H + " / Lute v" + Lute.Version + '\n        </li>\n        <li>\n        \u8D5E\u52A9\u6350\u8D60\uFF1A<a href="https://ld246.com/sponsor" target="_blank">https://ld246.com/sponsor</a>\n        </li>\n    </ul>\n</div>\n</div>', 0);
              });
              return _this;
            }
            return Info2;
          }(MenuItem);
          ;
          var InsertAfter_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var InsertAfter = function(_super) {
            InsertAfter_extends(InsertAfter2, _super);
            function InsertAfter2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED) || vditor.currentMode === "sv") {
                  return;
                }
                insertEmptyBlock(vditor, "afterend");
              });
              return _this;
            }
            return InsertAfter2;
          }(MenuItem);
          ;
          var InsertBefore_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var InsertBefore = function(_super) {
            InsertBefore_extends(InsertBefore2, _super);
            function InsertBefore2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED) || vditor.currentMode === "sv") {
                  return;
                }
                insertEmptyBlock(vditor, "beforebegin");
              });
              return _this;
            }
            return InsertBefore2;
          }(MenuItem);
          ;
          var Outdent_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Outdent = function(_super) {
            Outdent_extends(Outdent2, _super);
            function Outdent2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED) || vditor.currentMode === "sv") {
                  return;
                }
                var range = (0, selection.zh)(vditor);
                var liElement = (0, hasClosest.lG)(range.startContainer, "LI");
                if (liElement) {
                  listOutdent(vditor, liElement, range, liElement.parentElement);
                }
              });
              return _this;
            }
            return Outdent2;
          }(MenuItem);
          ;
          var Outline_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Outline_Outline = function(_super) {
            Outline_extends(Outline2, _super);
            function Outline2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              if (vditor.options.outline) {
                _this.element.firstElementChild.classList.add("vditor-menu--current");
              }
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                var btnElement = vditor.toolbar.elements.outline.firstElementChild;
                if (btnElement.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                vditor.options.outline.enable = !_this.element.firstElementChild.classList.contains("vditor-menu--current");
                vditor.outline.toggle(vditor, vditor.options.outline.enable);
              });
              return _this;
            }
            return Outline2;
          }(MenuItem);
          ;
          var Preview_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Preview_Preview = function(_super) {
            Preview_extends(Preview2, _super);
            function Preview2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this._bindEvent(vditor);
              return _this;
            }
            Preview2.prototype._bindEvent = function(vditor) {
              var _this = this;
              this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                var btnElement = _this.element.firstElementChild;
                if (btnElement.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                var toolbars = constants.g.EDIT_TOOLBARS.concat(["both", "edit-mode", "devtools"]);
                if (btnElement.classList.contains("vditor-menu--current")) {
                  btnElement.classList.remove("vditor-menu--current");
                  if (vditor.currentMode === "sv") {
                    vditor.sv.element.style.display = "block";
                    if (vditor.options.preview.mode === "both") {
                      vditor.preview.element.style.display = "block";
                    } else {
                      vditor.preview.element.style.display = "none";
                    }
                  } else {
                    vditor[vditor.currentMode].element.parentElement.style.display = "block";
                    vditor.preview.element.style.display = "none";
                  }
                  enableToolbar(vditor.toolbar.elements, toolbars);
                  vditor.outline.render(vditor);
                } else {
                  disableToolbar(vditor.toolbar.elements, toolbars);
                  vditor.preview.element.style.display = "block";
                  if (vditor.currentMode === "sv") {
                    vditor.sv.element.style.display = "none";
                  } else {
                    vditor[vditor.currentMode].element.parentElement.style.display = "none";
                  }
                  vditor.preview.render(vditor);
                  btnElement.classList.add("vditor-menu--current");
                  hidePanel(vditor, ["subToolbar", "hint", "popover"]);
                  setTimeout(function() {
                    vditor.outline.render(vditor);
                  }, vditor.options.preview.delay + 10);
                }
                setPadding(vditor);
              });
            };
            return Preview2;
          }(MenuItem);
          ;
          var RecordMedia = function() {
            function RecordMedia2(e2) {
              this.SAMPLE_RATE = 5e3;
              this.isRecording = false;
              this.readyFlag = false;
              this.leftChannel = [];
              this.rightChannel = [];
              this.recordingLength = 0;
              var context;
              if (typeof AudioContext !== "undefined") {
                context = new AudioContext();
              } else if (webkitAudioContext) {
                context = new webkitAudioContext();
              } else {
                return;
              }
              this.DEFAULT_SAMPLE_RATE = context.sampleRate;
              var volume = context.createGain();
              var audioInput = context.createMediaStreamSource(e2);
              audioInput.connect(volume);
              this.recorder = context.createScriptProcessor(2048, 2, 1);
              this.recorder.onaudioprocess = null;
              volume.connect(this.recorder);
              this.recorder.connect(context.destination);
              this.readyFlag = true;
            }
            RecordMedia2.prototype.cloneChannelData = function(leftChannelData, rightChannelData) {
              this.leftChannel.push(new Float32Array(leftChannelData));
              this.rightChannel.push(new Float32Array(rightChannelData));
              this.recordingLength += 2048;
            };
            RecordMedia2.prototype.startRecordingNewWavFile = function() {
              if (this.readyFlag) {
                this.isRecording = true;
                this.leftChannel.length = this.rightChannel.length = 0;
                this.recordingLength = 0;
              }
            };
            RecordMedia2.prototype.stopRecording = function() {
              this.isRecording = false;
            };
            RecordMedia2.prototype.buildWavFileBlob = function() {
              var leftBuffer = this.mergeBuffers(this.leftChannel);
              var rightBuffer = this.mergeBuffers(this.rightChannel);
              var interleaved = new Float32Array(leftBuffer.length);
              for (var i2 = 0; i2 < leftBuffer.length; ++i2) {
                interleaved[i2] = 0.5 * (leftBuffer[i2] + rightBuffer[i2]);
              }
              if (this.DEFAULT_SAMPLE_RATE > this.SAMPLE_RATE) {
                interleaved = this.downSampleBuffer(interleaved, this.SAMPLE_RATE);
              }
              var totalByteCount = 44 + interleaved.length * 2;
              var buffer = new ArrayBuffer(totalByteCount);
              var view = new DataView(buffer);
              this.writeUTFBytes(view, 0, "RIFF");
              view.setUint32(4, totalByteCount, true);
              this.writeUTFBytes(view, 8, "WAVE");
              this.writeUTFBytes(view, 12, "fmt ");
              view.setUint32(16, 16, true);
              view.setUint16(20, 1, true);
              view.setUint16(22, 1, true);
              view.setUint32(24, this.SAMPLE_RATE, true);
              view.setUint32(28, this.SAMPLE_RATE * 2, true);
              view.setUint16(32, 2, true);
              view.setUint16(34, 16, true);
              var subChunk2ByteCount = interleaved.length * 2;
              this.writeUTFBytes(view, 36, "data");
              view.setUint32(40, subChunk2ByteCount, true);
              var lng = interleaved.length;
              var index = 44;
              var volume = 1;
              for (var j = 0; j < lng; j++) {
                view.setInt16(index, interleaved[j] * (32767 * volume), true);
                index += 2;
              }
              return new Blob([view], { type: "audio/wav" });
            };
            RecordMedia2.prototype.downSampleBuffer = function(buffer, rate) {
              if (rate === this.DEFAULT_SAMPLE_RATE) {
                return buffer;
              }
              if (rate > this.DEFAULT_SAMPLE_RATE) {
                return buffer;
              }
              var sampleRateRatio = this.DEFAULT_SAMPLE_RATE / rate;
              var newLength = Math.round(buffer.length / sampleRateRatio);
              var result2 = new Float32Array(newLength);
              var offsetResult = 0;
              var offsetBuffer = 0;
              while (offsetResult < result2.length) {
                var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
                var accum = 0;
                var count = 0;
                for (var i2 = offsetBuffer; i2 < nextOffsetBuffer && i2 < buffer.length; i2++) {
                  accum += buffer[i2];
                  count++;
                }
                result2[offsetResult] = accum / count;
                offsetResult++;
                offsetBuffer = nextOffsetBuffer;
              }
              return result2;
            };
            RecordMedia2.prototype.mergeBuffers = function(desiredChannelBuffer) {
              var result2 = new Float32Array(this.recordingLength);
              var offset = 0;
              var lng = desiredChannelBuffer.length;
              for (var i2 = 0; i2 < lng; ++i2) {
                var buffer = desiredChannelBuffer[i2];
                result2.set(buffer, offset);
                offset += buffer.length;
              }
              return result2;
            };
            RecordMedia2.prototype.writeUTFBytes = function(view, offset, value) {
              var lng = value.length;
              for (var i2 = 0; i2 < lng; i2++) {
                view.setUint8(offset + i2, value.charCodeAt(i2));
              }
            };
            return RecordMedia2;
          }();
          ;
          var Record_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Record = function(_super) {
            Record_extends(Record2, _super);
            function Record2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              _this._bindEvent(vditor);
              return _this;
            }
            Record2.prototype._bindEvent = function(vditor) {
              var _this = this;
              var mediaRecorder;
              this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                var editorElement = vditor[vditor.currentMode].element;
                if (!mediaRecorder) {
                  navigator.mediaDevices.getUserMedia({ audio: true }).then(function(mediaStream) {
                    mediaRecorder = new RecordMedia(mediaStream);
                    mediaRecorder.recorder.onaudioprocess = function(e2) {
                      if (!mediaRecorder.isRecording) {
                        return;
                      }
                      var left = e2.inputBuffer.getChannelData(0);
                      var right = e2.inputBuffer.getChannelData(1);
                      mediaRecorder.cloneChannelData(left, right);
                    };
                    mediaRecorder.startRecordingNewWavFile();
                    vditor.tip.show(window.VditorI18n.recording);
                    editorElement.setAttribute("contenteditable", "false");
                    _this.element.children[0].classList.add("vditor-menu--current");
                  }).catch(function() {
                    vditor.tip.show(window.VditorI18n["record-tip"]);
                  });
                  return;
                }
                if (mediaRecorder.isRecording) {
                  mediaRecorder.stopRecording();
                  vditor.tip.hide();
                  var file = new File([mediaRecorder.buildWavFileBlob()], "record" + new Date().getTime() + ".wav", { type: "video/webm" });
                  uploadFiles(vditor, [file]);
                  _this.element.children[0].classList.remove("vditor-menu--current");
                } else {
                  vditor.tip.show(window.VditorI18n.recording);
                  editorElement.setAttribute("contenteditable", "false");
                  mediaRecorder.startRecordingNewWavFile();
                  _this.element.children[0].classList.add("vditor-menu--current");
                }
              });
            };
            return Record2;
          }(MenuItem);
          ;
          var Redo_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Redo = function(_super) {
            Redo_extends(Redo2, _super);
            function Redo2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              disableToolbar({ redo: _this.element }, ["redo"]);
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                vditor.undo.redo(vditor);
              });
              return _this;
            }
            return Redo2;
          }(MenuItem);
          ;
          var Undo_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Undo = function(_super) {
            Undo_extends(Undo2, _super);
            function Undo2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              disableToolbar({ undo: _this.element }, ["undo"]);
              _this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                event.preventDefault();
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  return;
                }
                vditor.undo.undo(vditor);
              });
              return _this;
            }
            return Undo2;
          }(MenuItem);
          ;
          var Upload_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Upload_Upload = function(_super) {
            Upload_extends(Upload2, _super);
            function Upload2(vditor, menuItem) {
              var _this = _super.call(this, vditor, menuItem) || this;
              var inputHTML = '<input type="file"';
              if (vditor.options.upload.multiple) {
                inputHTML += ' multiple="multiple"';
              }
              if (vditor.options.upload.accept) {
                inputHTML += ' accept="' + vditor.options.upload.accept + '"';
              }
              _this.element.children[0].innerHTML = "" + (menuItem.icon || '<svg><use xlink:href="#vditor-icon-upload"></use></svg>') + inputHTML + ">";
              _this._bindEvent(vditor);
              return _this;
            }
            Upload2.prototype._bindEvent = function(vditor) {
              var _this = this;
              this.element.children[0].addEventListener((0, compatibility.Le)(), function(event) {
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  event.stopPropagation();
                  event.preventDefault();
                  return;
                }
              });
              this.element.querySelector("input").addEventListener("change", function(event) {
                if (_this.element.firstElementChild.classList.contains(constants.g.CLASS_MENU_DISABLED)) {
                  event.stopPropagation();
                  event.preventDefault();
                  return;
                }
                if (event.target.files.length === 0) {
                  return;
                }
                uploadFiles(vditor, event.target.files, event.target);
              });
            };
            return Upload2;
          }(MenuItem);
          ;
          var Toolbar = function() {
            function Toolbar2(vditor) {
              var _this = this;
              var options = vditor.options;
              this.elements = {};
              this.element = document.createElement("div");
              this.element.className = "vditor-toolbar";
              options.toolbar.forEach(function(menuItem, i2) {
                var itemElement = _this.genItem(vditor, menuItem, i2);
                _this.element.appendChild(itemElement);
                if (menuItem.toolbar) {
                  var panelElement_1 = document.createElement("div");
                  panelElement_1.className = "vditor-hint vditor-panel--arrow";
                  panelElement_1.addEventListener((0, compatibility.Le)(), function(event) {
                    panelElement_1.style.display = "none";
                  });
                  menuItem.toolbar.forEach(function(subMenuItem, subI) {
                    subMenuItem.level = 2;
                    panelElement_1.appendChild(_this.genItem(vditor, subMenuItem, i2 + subI));
                  });
                  itemElement.appendChild(panelElement_1);
                  toggleSubMenu(vditor, panelElement_1, itemElement.children[0], 2);
                }
              });
              if (vditor.options.toolbarConfig.hide) {
                this.element.classList.add("vditor-toolbar--hide");
              }
              if (vditor.options.toolbarConfig.pin) {
                this.element.classList.add("vditor-toolbar--pin");
              }
              if (vditor.options.counter.enable) {
                vditor.counter = new Counter(vditor);
                this.element.appendChild(vditor.counter.element);
              }
            }
            Toolbar2.prototype.genItem = function(vditor, menuItem, index) {
              var menuItemObj;
              switch (menuItem.name) {
                case "bold":
                case "italic":
                case "more":
                case "strike":
                case "line":
                case "quote":
                case "list":
                case "ordered-list":
                case "check":
                case "code":
                case "inline-code":
                case "link":
                case "table":
                  menuItemObj = new MenuItem(vditor, menuItem);
                  break;
                case "emoji":
                  menuItemObj = new Emoji(vditor, menuItem);
                  break;
                case "headings":
                  menuItemObj = new Headings(vditor, menuItem);
                  break;
                case "|":
                  menuItemObj = new Divider();
                  break;
                case "br":
                  menuItemObj = new Br();
                  break;
                case "undo":
                  menuItemObj = new Undo(vditor, menuItem);
                  break;
                case "redo":
                  menuItemObj = new Redo(vditor, menuItem);
                  break;
                case "help":
                  menuItemObj = new Help(vditor, menuItem);
                  break;
                case "both":
                  menuItemObj = new Both(vditor, menuItem);
                  break;
                case "preview":
                  menuItemObj = new Preview_Preview(vditor, menuItem);
                  break;
                case "fullscreen":
                  menuItemObj = new Fullscreen(vditor, menuItem);
                  break;
                case "upload":
                  menuItemObj = new Upload_Upload(vditor, menuItem);
                  break;
                case "record":
                  menuItemObj = new Record(vditor, menuItem);
                  break;
                case "info":
                  menuItemObj = new Info(vditor, menuItem);
                  break;
                case "edit-mode":
                  menuItemObj = new EditMode(vditor, menuItem);
                  break;
                case "devtools":
                  menuItemObj = new Devtools(vditor, menuItem);
                  break;
                case "outdent":
                  menuItemObj = new Outdent(vditor, menuItem);
                  break;
                case "indent":
                  menuItemObj = new Indent(vditor, menuItem);
                  break;
                case "outline":
                  menuItemObj = new Outline_Outline(vditor, menuItem);
                  break;
                case "insert-after":
                  menuItemObj = new InsertAfter(vditor, menuItem);
                  break;
                case "insert-before":
                  menuItemObj = new InsertBefore(vditor, menuItem);
                  break;
                case "code-theme":
                  menuItemObj = new CodeTheme(vditor, menuItem);
                  break;
                case "content-theme":
                  menuItemObj = new ContentTheme(vditor, menuItem);
                  break;
                case "export":
                  menuItemObj = new Export(vditor, menuItem);
                  break;
                default:
                  menuItemObj = new Custom(vditor, menuItem);
                  break;
              }
              if (!menuItemObj) {
                return;
              }
              var key = menuItem.name;
              if (key === "br" || key === "|") {
                key = key + index;
              }
              this.elements[key] = menuItemObj.element;
              return menuItemObj.element;
            };
            return Toolbar2;
          }();
          var diff_match_patch = __webpack_require__(694);
          ;
          var undo_Undo = function() {
            function Undo2() {
              this.stackSize = 50;
              this.resetStack();
              this.dmp = new diff_match_patch();
            }
            Undo2.prototype.clearStack = function(vditor) {
              this.resetStack();
              this.resetIcon(vditor);
            };
            Undo2.prototype.resetIcon = function(vditor) {
              if (!vditor.toolbar) {
                return;
              }
              if (this[vditor.currentMode].undoStack.length > 1) {
                enableToolbar(vditor.toolbar.elements, ["undo"]);
              } else {
                disableToolbar(vditor.toolbar.elements, ["undo"]);
              }
              if (this[vditor.currentMode].redoStack.length !== 0) {
                enableToolbar(vditor.toolbar.elements, ["redo"]);
              } else {
                disableToolbar(vditor.toolbar.elements, ["redo"]);
              }
            };
            Undo2.prototype.undo = function(vditor) {
              if (vditor[vditor.currentMode].element.getAttribute("contenteditable") === "false") {
                return;
              }
              if (this[vditor.currentMode].undoStack.length < 2) {
                return;
              }
              var state = this[vditor.currentMode].undoStack.pop();
              if (!state) {
                return;
              }
              this[vditor.currentMode].redoStack.push(state);
              this.renderDiff(state, vditor);
              this[vditor.currentMode].hasUndo = true;
              hidePanel(vditor, ["hint"]);
            };
            Undo2.prototype.redo = function(vditor) {
              if (vditor[vditor.currentMode].element.getAttribute("contenteditable") === "false") {
                return;
              }
              var state = this[vditor.currentMode].redoStack.pop();
              if (!state) {
                return;
              }
              this[vditor.currentMode].undoStack.push(state);
              this.renderDiff(state, vditor, true);
            };
            Undo2.prototype.recordFirstPosition = function(vditor, event) {
              if (getSelection().rangeCount === 0) {
                return;
              }
              if (this[vditor.currentMode].undoStack.length !== 1 || this[vditor.currentMode].undoStack[0].length === 0 || this[vditor.currentMode].redoStack.length > 0) {
                return;
              }
              if ((0, compatibility.vU)() && event.key === "Backspace") {
                return;
              }
              if ((0, compatibility.G6)()) {
                return;
              }
              var text = this.addCaret(vditor);
              if (text.replace("<wbr>", "").replace(" vditor-ir__node--expand", "") !== this[vditor.currentMode].undoStack[0][0].diffs[0][1].replace("<wbr>", "")) {
                return;
              }
              this[vditor.currentMode].undoStack[0][0].diffs[0][1] = text;
              this[vditor.currentMode].lastText = text;
            };
            Undo2.prototype.addToUndoStack = function(vditor) {
              var text = this.addCaret(vditor, true);
              var diff = this.dmp.diff_main(text, this[vditor.currentMode].lastText, true);
              var patchList = this.dmp.patch_make(text, this[vditor.currentMode].lastText, diff);
              if (patchList.length === 0 && this[vditor.currentMode].undoStack.length > 0) {
                return;
              }
              this[vditor.currentMode].lastText = text;
              this[vditor.currentMode].undoStack.push(patchList);
              if (this[vditor.currentMode].undoStack.length > this.stackSize) {
                this[vditor.currentMode].undoStack.shift();
              }
              if (this[vditor.currentMode].hasUndo) {
                this[vditor.currentMode].redoStack = [];
                this[vditor.currentMode].hasUndo = false;
                disableToolbar(vditor.toolbar.elements, ["redo"]);
              }
              if (this[vditor.currentMode].undoStack.length > 1) {
                enableToolbar(vditor.toolbar.elements, ["undo"]);
              }
            };
            Undo2.prototype.renderDiff = function(state, vditor, isRedo) {
              if (isRedo === void 0) {
                isRedo = false;
              }
              var text;
              if (isRedo) {
                var redoPatchList = this.dmp.patch_deepCopy(state).reverse();
                redoPatchList.forEach(function(patch) {
                  patch.diffs.forEach(function(diff) {
                    diff[0] = -diff[0];
                  });
                });
                text = this.dmp.patch_apply(redoPatchList, this[vditor.currentMode].lastText)[0];
              } else {
                text = this.dmp.patch_apply(state, this[vditor.currentMode].lastText)[0];
              }
              this[vditor.currentMode].lastText = text;
              vditor[vditor.currentMode].element.innerHTML = text;
              if (vditor.currentMode !== "sv") {
                vditor[vditor.currentMode].element.querySelectorAll(".vditor-" + vditor.currentMode + "__preview[data-render='2']").forEach(function(blockElement) {
                  processCodeRender(blockElement, vditor);
                });
              }
              if (!vditor[vditor.currentMode].element.querySelector("wbr")) {
                var range = getSelection().getRangeAt(0);
                range.setEndBefore(vditor[vditor.currentMode].element);
                range.collapse(false);
              } else {
                (0, selection.ib)(vditor[vditor.currentMode].element, vditor[vditor.currentMode].element.ownerDocument.createRange());
                scrollCenter(vditor);
              }
              execAfterRender(vditor, {
                enableAddUndoStack: false,
                enableHint: false,
                enableInput: true
              });
              highlightToolbar(vditor);
              vditor[vditor.currentMode].element.querySelectorAll(".vditor-" + vditor.currentMode + "__preview[data-render='2']").forEach(function(item) {
                processCodeRender(item, vditor);
              });
              if (this[vditor.currentMode].undoStack.length > 1) {
                enableToolbar(vditor.toolbar.elements, ["undo"]);
              } else {
                disableToolbar(vditor.toolbar.elements, ["undo"]);
              }
              if (this[vditor.currentMode].redoStack.length !== 0) {
                enableToolbar(vditor.toolbar.elements, ["redo"]);
              } else {
                disableToolbar(vditor.toolbar.elements, ["redo"]);
              }
            };
            Undo2.prototype.resetStack = function() {
              this.ir = {
                hasUndo: false,
                lastText: "",
                redoStack: [],
                undoStack: []
              };
              this.sv = {
                hasUndo: false,
                lastText: "",
                redoStack: [],
                undoStack: []
              };
              this.wysiwyg = {
                hasUndo: false,
                lastText: "",
                redoStack: [],
                undoStack: []
              };
            };
            Undo2.prototype.addCaret = function(vditor, setFocus) {
              if (setFocus === void 0) {
                setFocus = false;
              }
              var cloneRange;
              if (getSelection().rangeCount !== 0 && !vditor[vditor.currentMode].element.querySelector("wbr")) {
                var range = getSelection().getRangeAt(0);
                if (vditor[vditor.currentMode].element.contains(range.startContainer)) {
                  cloneRange = range.cloneRange();
                  var wbrElement = document.createElement("span");
                  wbrElement.className = "vditor-wbr";
                  range.insertNode(wbrElement);
                }
              }
              var cloneElement = vditor.ir.element.cloneNode(true);
              cloneElement.querySelectorAll(".vditor-" + vditor.currentMode + "__preview[data-render='1']").forEach(function(item) {
                if (item.firstElementChild.classList.contains("language-echarts") || item.firstElementChild.classList.contains("language-plantuml") || item.firstElementChild.classList.contains("language-mindmap")) {
                  item.firstElementChild.removeAttribute("_echarts_instance_");
                  item.firstElementChild.removeAttribute("data-processed");
                  item.firstElementChild.innerHTML = item.previousElementSibling.firstElementChild.innerHTML;
                  item.setAttribute("data-render", "2");
                }
                if (item.firstElementChild.classList.contains("language-math")) {
                  item.setAttribute("data-render", "2");
                  item.firstElementChild.textContent = item.firstElementChild.getAttribute("data-math");
                  item.firstElementChild.removeAttribute("data-math");
                }
              });
              var text = vditor[vditor.currentMode].element.innerHTML;
              vditor[vditor.currentMode].element.querySelectorAll(".vditor-wbr").forEach(function(item) {
                item.remove();
              });
              if (setFocus && cloneRange) {
                (0, selection.Hc)(cloneRange);
              }
              return text.replace('<span class="vditor-wbr"></span>', "<wbr>");
            };
            return Undo2;
          }();
          var merge = __webpack_require__(224);
          ;
          var Options = function() {
            function Options2(options) {
              this.defaultOptions = {
                after: void 0,
                cache: {
                  enable: true
                },
                cdn: constants.g.CDN,
                classes: {
                  preview: ""
                },
                comment: {
                  enable: false
                },
                counter: {
                  enable: false,
                  type: "markdown"
                },
                debugger: false,
                fullscreen: {
                  index: 90
                },
                height: "auto",
                hint: {
                  delay: 200,
                  emoji: {
                    "+1": "\u{1F44D}",
                    "-1": "\u{1F44E}",
                    "confused": "\u{1F615}",
                    "eyes": "\u{1F440}\uFE0F",
                    "heart": "\u2764\uFE0F",
                    "rocket": "\u{1F680}\uFE0F",
                    "smile": "\u{1F604}",
                    "tada": "\u{1F389}\uFE0F"
                  },
                  emojiPath: constants.g.CDN + "/dist/images/emoji",
                  extend: [],
                  parse: true
                },
                icon: "ant",
                lang: "zh_CN",
                mode: "ir",
                outline: {
                  enable: false,
                  position: "left"
                },
                placeholder: "",
                preview: {
                  actions: ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"],
                  delay: 1e3,
                  hljs: constants.g.HLJS_OPTIONS,
                  markdown: constants.g.MARKDOWN_OPTIONS,
                  math: constants.g.MATH_OPTIONS,
                  maxWidth: 800,
                  mode: "both",
                  theme: constants.g.THEME_OPTIONS
                },
                resize: {
                  enable: false,
                  position: "bottom"
                },
                theme: "classic",
                toolbar: [
                  "emoji",
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "link",
                  "|",
                  "list",
                  "ordered-list",
                  "check",
                  "outdent",
                  "indent",
                  "|",
                  "quote",
                  "line",
                  "code",
                  "inline-code",
                  "insert-before",
                  "insert-after",
                  "|",
                  "upload",
                  "record",
                  "table",
                  "|",
                  "undo",
                  "redo",
                  "|",
                  "fullscreen",
                  "edit-mode",
                  {
                    name: "more",
                    toolbar: [
                      "both",
                      "code-theme",
                      "content-theme",
                      "export",
                      "outline",
                      "preview",
                      "devtools",
                      "info",
                      "help"
                    ]
                  }
                ],
                toolbarConfig: {
                  hide: false,
                  pin: false
                },
                typewriterMode: false,
                undoDelay: 800,
                upload: {
                  extraData: {},
                  fieldName: "file[]",
                  filename: function(name) {
                    return name.replace(/\W/g, "");
                  },
                  linkToImgUrl: "",
                  max: 10 * 1024 * 1024,
                  multiple: true,
                  url: "",
                  withCredentials: false
                },
                value: "",
                width: "auto"
              };
              this.options = options;
            }
            Options2.prototype.merge = function() {
              var _a, _b, _c;
              if (this.options) {
                if (this.options.toolbar) {
                  this.options.toolbar = this.mergeToolbar(this.options.toolbar);
                } else {
                  this.options.toolbar = this.mergeToolbar(this.defaultOptions.toolbar);
                }
                if ((_b = (_a = this.options.preview) === null || _a === void 0 ? void 0 : _a.theme) === null || _b === void 0 ? void 0 : _b.list) {
                  this.defaultOptions.preview.theme.list = this.options.preview.theme.list;
                }
                if ((_c = this.options.hint) === null || _c === void 0 ? void 0 : _c.emoji) {
                  this.defaultOptions.hint.emoji = this.options.hint.emoji;
                }
                if (this.options.comment) {
                  this.defaultOptions.comment = this.options.comment;
                }
              }
              var mergedOptions = (0, merge.T)(this.defaultOptions, this.options);
              if (mergedOptions.cache.enable && !mergedOptions.cache.id) {
                throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
              }
              return mergedOptions;
            };
            Options2.prototype.mergeToolbar = function(toolbar) {
              var _this = this;
              var toolbarItem = [
                {
                  icon: '<svg><use xlink:href="#vditor-icon-export"></use></svg>',
                  name: "export",
                  tipPosition: "ne"
                },
                {
                  hotkey: "\u2318E",
                  icon: '<svg><use xlink:href="#vditor-icon-emoji"></use></svg>',
                  name: "emoji",
                  tipPosition: "ne"
                },
                {
                  hotkey: "\u2318H",
                  icon: '<svg><use xlink:href="#vditor-icon-headings"></use></svg>',
                  name: "headings",
                  tipPosition: "ne"
                },
                {
                  hotkey: "\u2318B",
                  icon: '<svg><use xlink:href="#vditor-icon-bold"></use></svg>',
                  name: "bold",
                  prefix: "**",
                  suffix: "**",
                  tipPosition: "ne"
                },
                {
                  hotkey: "\u2318I",
                  icon: '<svg><use xlink:href="#vditor-icon-italic"></use></svg>',
                  name: "italic",
                  prefix: "*",
                  suffix: "*",
                  tipPosition: "ne"
                },
                {
                  hotkey: "\u2318D",
                  icon: '<svg><use xlink:href="#vditor-icon-strike"></use></svg>',
                  name: "strike",
                  prefix: "~~",
                  suffix: "~~",
                  tipPosition: "ne"
                },
                {
                  hotkey: "\u2318K",
                  icon: '<svg><use xlink:href="#vditor-icon-link"></use></svg>',
                  name: "link",
                  prefix: "[",
                  suffix: "](https://)",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  hotkey: "\u2318L",
                  icon: '<svg><use xlink:href="#vditor-icon-list"></use></svg>',
                  name: "list",
                  prefix: "* ",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u2318O",
                  icon: '<svg><use xlink:href="#vditor-icon-ordered-list"></use></svg>',
                  name: "ordered-list",
                  prefix: "1. ",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u2318J",
                  icon: '<svg><use xlink:href="#vditor-icon-check"></use></svg>',
                  name: "check",
                  prefix: "* [ ] ",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u21E7\u2318I",
                  icon: '<svg><use xlink:href="#vditor-icon-outdent"></use></svg>',
                  name: "outdent",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u21E7\u2318O",
                  icon: '<svg><use xlink:href="#vditor-icon-indent"></use></svg>',
                  name: "indent",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  hotkey: "\u2318;",
                  icon: '<svg><use xlink:href="#vditor-icon-quote"></use></svg>',
                  name: "quote",
                  prefix: "> ",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u21E7\u2318H",
                  icon: '<svg><use xlink:href="#vditor-icon-line"></use></svg>',
                  name: "line",
                  prefix: "---",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u2318U",
                  icon: '<svg><use xlink:href="#vditor-icon-code"></use></svg>',
                  name: "code",
                  prefix: "```",
                  suffix: "\n```",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u2318G",
                  icon: '<svg><use xlink:href="#vditor-icon-inline-code"></use></svg>',
                  name: "inline-code",
                  prefix: "`",
                  suffix: "`",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u21E7\u2318B",
                  icon: '<svg><use xlink:href="#vditor-icon-before"></use></svg>',
                  name: "insert-before",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u21E7\u2318E",
                  icon: '<svg><use xlink:href="#vditor-icon-after"></use></svg>',
                  name: "insert-after",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
                  name: "upload",
                  tipPosition: "n"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-record"></use></svg>',
                  name: "record",
                  tipPosition: "n"
                },
                {
                  hotkey: "\u2318M",
                  icon: '<svg><use xlink:href="#vditor-icon-table"></use></svg>',
                  name: "table",
                  prefix: "| col1",
                  suffix: " | col2 | col3 |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  hotkey: "\u2318Z",
                  icon: '<svg><use xlink:href="#vditor-icon-undo"></use></svg>',
                  name: "undo",
                  tipPosition: "nw"
                },
                {
                  hotkey: "\u2318Y",
                  icon: '<svg><use xlink:href="#vditor-icon-redo"></use></svg>',
                  name: "redo",
                  tipPosition: "nw"
                },
                {
                  name: "|"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-more"></use></svg>',
                  name: "more",
                  tipPosition: "e"
                },
                {
                  hotkey: "\u2318'",
                  icon: '<svg><use xlink:href="#vditor-icon-fullscreen"></use></svg>',
                  name: "fullscreen",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-edit"></use></svg>',
                  name: "edit-mode",
                  tipPosition: "nw"
                },
                {
                  hotkey: "\u2318P",
                  icon: '<svg><use xlink:href="#vditor-icon-both"></use></svg>',
                  name: "both",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-preview"></use></svg>',
                  name: "preview",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>',
                  name: "outline",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-theme"></use></svg>',
                  name: "content-theme",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-code-theme"></use></svg>',
                  name: "code-theme",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-bug"></use></svg>',
                  name: "devtools",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-info"></use></svg>',
                  name: "info",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-help"></use></svg>',
                  name: "help",
                  tipPosition: "nw"
                },
                {
                  name: "br"
                }
              ];
              var toolbarResult = [];
              toolbar.forEach(function(menuItem) {
                var currentMenuItem = menuItem;
                toolbarItem.forEach(function(defaultMenuItem) {
                  if (typeof menuItem === "string" && defaultMenuItem.name === menuItem) {
                    currentMenuItem = defaultMenuItem;
                  }
                  if (typeof menuItem === "object" && defaultMenuItem.name === menuItem.name) {
                    currentMenuItem = Object.assign({}, defaultMenuItem, menuItem);
                  }
                });
                if (menuItem.toolbar) {
                  currentMenuItem.toolbar = _this.mergeToolbar(menuItem.toolbar);
                }
                toolbarResult.push(currentMenuItem);
              });
              return toolbarResult;
            };
            return Options2;
          }();
          ;
          var WYSIWYG = function() {
            function WYSIWYG2(vditor) {
              var _this = this;
              this.composingLock = false;
              this.commentIds = [];
              var divElement = document.createElement("div");
              divElement.className = "vditor-wysiwyg";
              divElement.innerHTML = '<pre class="vditor-reset" placeholder="' + vditor.options.placeholder + '"\n contenteditable="true" spellcheck="false"></pre>\n<div class="vditor-panel vditor-panel--none"></div>\n<div class="vditor-panel vditor-panel--none">\n    <button type="button" aria-label="' + window.VditorI18n.comment + '" class="vditor-icon vditor-tooltipped vditor-tooltipped__n">\n        <svg><use xlink:href="#vditor-icon-comment"></use></svg>\n    </button>\n</div>';
              this.element = divElement.firstElementChild;
              this.popover = divElement.firstElementChild.nextElementSibling;
              this.selectPopover = divElement.lastElementChild;
              this.bindEvent(vditor);
              focusEvent(vditor, this.element);
              dblclickEvent(vditor, this.element);
              blurEvent(vditor, this.element);
              hotkeyEvent(vditor, this.element);
              selectEvent(vditor, this.element);
              dropEvent(vditor, this.element);
              copyEvent(vditor, this.element, this.copy);
              cutEvent(vditor, this.element, this.copy);
              if (vditor.options.comment.enable) {
                this.selectPopover.querySelector("button").onclick = function() {
                  var id = Lute.NewNodeID();
                  var range = getSelection().getRangeAt(0);
                  var rangeClone = range.cloneRange();
                  var contents = range.extractContents();
                  var blockStartElement;
                  var blockEndElement;
                  var removeStart = false;
                  var removeEnd = false;
                  contents.childNodes.forEach(function(item, index) {
                    var wrap = false;
                    if (item.nodeType === 3) {
                      wrap = true;
                    } else if (!item.classList.contains("vditor-comment")) {
                      wrap = true;
                    } else if (item.classList.contains("vditor-comment")) {
                      item.setAttribute("data-cmtids", item.getAttribute("data-cmtids") + " " + id);
                    }
                    if (wrap) {
                      if (item.nodeType !== 3 && item.getAttribute("data-block") === "0" && index === 0 && rangeClone.startOffset > 0) {
                        item.innerHTML = '<span class="vditor-comment" data-cmtids="' + id + '">' + item.innerHTML + "</span>";
                        blockStartElement = item;
                      } else if (item.nodeType !== 3 && item.getAttribute("data-block") === "0" && index === contents.childNodes.length - 1 && rangeClone.endOffset < rangeClone.endContainer.textContent.length) {
                        item.innerHTML = '<span class="vditor-comment" data-cmtids="' + id + '">' + item.innerHTML + "</span>";
                        blockEndElement = item;
                      } else if (item.nodeType !== 3 && item.getAttribute("data-block") === "0") {
                        if (index === 0) {
                          removeStart = true;
                        } else if (index === contents.childNodes.length - 1) {
                          removeEnd = true;
                        }
                        item.innerHTML = '<span class="vditor-comment" data-cmtids="' + id + '">' + item.innerHTML + "</span>";
                      } else {
                        var commentElement = document.createElement("span");
                        commentElement.classList.add("vditor-comment");
                        commentElement.setAttribute("data-cmtids", id);
                        item.parentNode.insertBefore(commentElement, item);
                        commentElement.appendChild(item);
                      }
                    }
                  });
                  var startElement = (0, hasClosest.F9)(rangeClone.startContainer);
                  if (startElement) {
                    if (blockStartElement) {
                      startElement.insertAdjacentHTML("beforeend", blockStartElement.innerHTML);
                      blockStartElement.remove();
                    } else if (startElement.textContent.trim().replace(constants.g.ZWSP, "") === "" && removeStart) {
                      startElement.remove();
                    }
                  }
                  var endElement = (0, hasClosest.F9)(rangeClone.endContainer);
                  if (endElement) {
                    if (blockEndElement) {
                      endElement.insertAdjacentHTML("afterbegin", blockEndElement.innerHTML);
                      blockEndElement.remove();
                    } else if (endElement.textContent.trim().replace(constants.g.ZWSP, "") === "" && removeEnd) {
                      endElement.remove();
                    }
                  }
                  range.insertNode(contents);
                  vditor.options.comment.add(id, range.toString(), _this.getComments(vditor, true));
                  afterRenderEvent(vditor, {
                    enableAddUndoStack: true,
                    enableHint: false,
                    enableInput: false
                  });
                  _this.hideComment();
                };
              }
            }
            WYSIWYG2.prototype.getComments = function(vditor, getData) {
              var _this = this;
              if (getData === void 0) {
                getData = false;
              }
              if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable) {
                this.commentIds = [];
                this.element.querySelectorAll(".vditor-comment").forEach(function(item) {
                  _this.commentIds = _this.commentIds.concat(item.getAttribute("data-cmtids").split(" "));
                });
                this.commentIds = Array.from(new Set(this.commentIds));
                var comments_1 = [];
                if (getData) {
                  this.commentIds.forEach(function(id) {
                    comments_1.push({
                      id,
                      top: _this.element.querySelector('.vditor-comment[data-cmtids="' + id + '"]').offsetTop
                    });
                  });
                  return comments_1;
                }
              } else {
                return [];
              }
            };
            WYSIWYG2.prototype.triggerRemoveComment = function(vditor) {
              var difference = function(a, b) {
                var s = new Set(b);
                return a.filter(function(x) {
                  return !s.has(x);
                });
              };
              if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable && vditor.wysiwyg.commentIds.length > 0) {
                var oldIds = JSON.parse(JSON.stringify(this.commentIds));
                this.getComments(vditor);
                var removedIds = difference(oldIds, this.commentIds);
                if (removedIds.length > 0) {
                  vditor.options.comment.remove(removedIds);
                }
              }
            };
            WYSIWYG2.prototype.showComment = function() {
              var position = (0, selection.Ny)(this.element);
              this.selectPopover.setAttribute("style", "left:" + position.left + "px;display:block;top:" + Math.max(-8, position.top - 21) + "px");
            };
            WYSIWYG2.prototype.hideComment = function() {
              this.selectPopover.setAttribute("style", "display:none");
            };
            WYSIWYG2.prototype.copy = function(event, vditor) {
              var range = getSelection().getRangeAt(0);
              if (range.toString() === "") {
                return;
              }
              event.stopPropagation();
              event.preventDefault();
              var codeElement = (0, hasClosest.lG)(range.startContainer, "CODE");
              var codeEndElement = (0, hasClosest.lG)(range.endContainer, "CODE");
              if (codeElement && codeEndElement && codeEndElement.isSameNode(codeElement)) {
                var codeText = "";
                if (codeElement.parentElement.tagName === "PRE") {
                  codeText = range.toString();
                } else {
                  codeText = "`" + range.toString() + "`";
                }
                event.clipboardData.setData("text/plain", codeText);
                event.clipboardData.setData("text/html", "");
                return;
              }
              var aElement = (0, hasClosest.lG)(range.startContainer, "A");
              var aEndElement = (0, hasClosest.lG)(range.endContainer, "A");
              if (aElement && aEndElement && aEndElement.isSameNode(aElement)) {
                var aTitle = aElement.getAttribute("title") || "";
                if (aTitle) {
                  aTitle = ' "' + aTitle + '"';
                }
                event.clipboardData.setData("text/plain", "[" + range.toString() + "](" + aElement.getAttribute("href") + aTitle + ")");
                event.clipboardData.setData("text/html", "");
                return;
              }
              var tempElement = document.createElement("div");
              tempElement.appendChild(range.cloneContents());
              event.clipboardData.setData("text/plain", vditor.lute.VditorDOM2Md(tempElement.innerHTML).trim());
              event.clipboardData.setData("text/html", "");
            };
            WYSIWYG2.prototype.bindEvent = function(vditor) {
              var _this = this;
              window.addEventListener("scroll", function() {
                hidePanel(vditor, ["hint"]);
                if (_this.popover.style.display !== "block" || _this.selectPopover.style.display !== "block") {
                  return;
                }
                var top = parseInt(_this.popover.getAttribute("data-top"), 10);
                if (vditor.options.height !== "auto") {
                  if (vditor.options.toolbarConfig.pin && vditor.toolbar.element.getBoundingClientRect().top === 0) {
                    var popoverTop = Math.max(window.scrollY - vditor.element.offsetTop - 8, Math.min(top - vditor.wysiwyg.element.scrollTop, _this.element.clientHeight - 21)) + "px";
                    if (_this.popover.style.display === "block") {
                      _this.popover.style.top = popoverTop;
                    }
                    if (_this.selectPopover.style.display === "block") {
                      _this.selectPopover.style.top = popoverTop;
                    }
                  }
                  return;
                } else if (!vditor.options.toolbarConfig.pin) {
                  return;
                }
                var popoverTop1 = Math.max(top, window.scrollY - vditor.element.offsetTop - 8) + "px";
                if (_this.popover.style.display === "block") {
                  _this.popover.style.top = popoverTop1;
                }
                if (_this.selectPopover.style.display === "block") {
                  _this.selectPopover.style.top = popoverTop1;
                }
              });
              this.element.addEventListener("scroll", function() {
                hidePanel(vditor, ["hint"]);
                if (vditor.options.comment && vditor.options.comment.enable && vditor.options.comment.scroll) {
                  vditor.options.comment.scroll(vditor.wysiwyg.element.scrollTop);
                }
                if (_this.popover.style.display !== "block") {
                  return;
                }
                var top = parseInt(_this.popover.getAttribute("data-top"), 10) - vditor.wysiwyg.element.scrollTop;
                var max = -8;
                if (vditor.options.toolbarConfig.pin && vditor.toolbar.element.getBoundingClientRect().top === 0) {
                  max = window.scrollY - vditor.element.offsetTop + max;
                }
                var topPx = Math.max(max, Math.min(top, _this.element.clientHeight - 21)) + "px";
                _this.popover.style.top = topPx;
                _this.selectPopover.style.top = topPx;
              });
              this.element.addEventListener("paste", function(event) {
                paste(vditor, event, {
                  pasteCode: function(code) {
                    var range = (0, selection.zh)(vditor);
                    var node = document.createElement("template");
                    node.innerHTML = code;
                    range.insertNode(node.content.cloneNode(true));
                    var blockElement = (0, hasClosest.a1)(range.startContainer, "data-block", "0");
                    if (blockElement) {
                      blockElement.outerHTML = vditor.lute.SpinVditorDOM(blockElement.outerHTML);
                    } else {
                      vditor.wysiwyg.element.innerHTML = vditor.lute.SpinVditorDOM(vditor.wysiwyg.element.innerHTML);
                    }
                    (0, selection.ib)(vditor.wysiwyg.element, range);
                  }
                });
              });
              this.element.addEventListener("compositionstart", function() {
                _this.composingLock = true;
              });
              this.element.addEventListener("compositionend", function(event) {
                var headingElement = (0, hasClosestByHeadings.W)(getSelection().getRangeAt(0).startContainer);
                if (headingElement && headingElement.textContent === "") {
                  renderToc(vditor);
                  return;
                }
                if (!(0, compatibility.vU)()) {
                  input_input(vditor, getSelection().getRangeAt(0).cloneRange(), event);
                }
                _this.composingLock = false;
              });
              this.element.addEventListener("input", function(event) {
                if (event.inputType === "deleteByDrag" || event.inputType === "insertFromDrop") {
                  return;
                }
                if (_this.preventInput) {
                  _this.preventInput = false;
                  return;
                }
                if (_this.composingLock || event.data === "\u2018" || event.data === "\u201C" || event.data === "\u300A") {
                  return;
                }
                var range = getSelection().getRangeAt(0);
                var blockElement = (0, hasClosest.F9)(range.startContainer);
                if (!blockElement) {
                  modifyPre(vditor, range);
                  blockElement = (0, hasClosest.F9)(range.startContainer);
                }
                if (!blockElement) {
                  return;
                }
                var startOffset = (0, selection.im)(blockElement, vditor.wysiwyg.element, range).start;
                var startSpace = true;
                for (var i2 = startOffset - 1; i2 > blockElement.textContent.substr(0, startOffset).lastIndexOf("\n"); i2--) {
                  if (blockElement.textContent.charAt(i2) !== " " && blockElement.textContent.charAt(i2) !== "	") {
                    startSpace = false;
                    break;
                  }
                }
                if (startOffset === 0) {
                  startSpace = false;
                }
                var endSpace = true;
                for (var i2 = startOffset - 1; i2 < blockElement.textContent.length; i2++) {
                  if (blockElement.textContent.charAt(i2) !== " " && blockElement.textContent.charAt(i2) !== "\n") {
                    endSpace = false;
                    break;
                  }
                }
                var headingElement = (0, hasClosestByHeadings.W)(getSelection().getRangeAt(0).startContainer);
                if (headingElement && headingElement.textContent === "") {
                  renderToc(vditor);
                  headingElement.remove();
                }
                if (startSpace && blockElement.getAttribute("data-type") !== "code-block" || endSpace || isHeadingMD(blockElement.innerHTML) || isHrMD(blockElement.innerHTML) && blockElement.previousElementSibling) {
                  return;
                }
                input_input(vditor, range, event);
              });
              this.element.addEventListener("click", function(event) {
                if (event.target.tagName === "INPUT") {
                  var checkElement = event.target;
                  if (checkElement.checked) {
                    checkElement.setAttribute("checked", "checked");
                  } else {
                    checkElement.removeAttribute("checked");
                  }
                  _this.preventInput = true;
                  afterRenderEvent(vditor);
                  return;
                }
                if (event.target.tagName === "IMG" && !event.target.parentElement.classList.contains("vditor-wysiwyg__preview")) {
                  if (event.target.getAttribute("data-type") === "link-ref") {
                    genLinkRefPopover(vditor, event.target);
                  } else {
                    genImagePopover(event, vditor);
                  }
                  return;
                }
                if (event.target.tagName === "A") {
                  window.open(event.target.getAttribute("href"));
                }
                var range = (0, selection.zh)(vditor);
                if (event.target.isEqualNode(_this.element) && _this.element.lastElementChild && range.collapsed) {
                  var lastRect = _this.element.lastElementChild.getBoundingClientRect();
                  if (event.y > lastRect.top + lastRect.height) {
                    if (_this.element.lastElementChild.tagName === "P" && _this.element.lastElementChild.textContent.trim().replace(constants.g.ZWSP, "") === "") {
                      range.selectNodeContents(_this.element.lastElementChild);
                      range.collapse(false);
                    } else {
                      _this.element.insertAdjacentHTML("beforeend", '<p data-block="0">' + constants.g.ZWSP + "<wbr></p>");
                      (0, selection.ib)(_this.element, range);
                    }
                  }
                }
                highlightToolbarWYSIWYG(vditor);
                var previewElement = (0, hasClosest.fb)(event.target, "vditor-wysiwyg__preview");
                if (!previewElement) {
                  previewElement = (0, hasClosest.fb)((0, selection.zh)(vditor).startContainer, "vditor-wysiwyg__preview");
                }
                if (previewElement) {
                  showCode(previewElement, vditor);
                }
                clickToc(event, vditor);
              });
              this.element.addEventListener("keyup", function(event) {
                if (event.isComposing || (0, compatibility.yl)(event)) {
                  return;
                }
                if (event.key === "Enter") {
                  scrollCenter(vditor);
                }
                if ((event.key === "Backspace" || event.key === "Delete") && vditor.wysiwyg.element.innerHTML !== "" && vditor.wysiwyg.element.childNodes.length === 1 && vditor.wysiwyg.element.firstElementChild && vditor.wysiwyg.element.firstElementChild.tagName === "P" && vditor.wysiwyg.element.firstElementChild.childElementCount === 0 && (vditor.wysiwyg.element.textContent === "" || vditor.wysiwyg.element.textContent === "\n")) {
                  vditor.wysiwyg.element.innerHTML = "";
                }
                var range = (0, selection.zh)(vditor);
                if (event.key === "Backspace") {
                  if ((0, compatibility.vU)() && range.startContainer.textContent === "\n" && range.startOffset === 1) {
                    range.startContainer.textContent = "";
                  }
                }
                modifyPre(vditor, range);
                highlightToolbarWYSIWYG(vditor);
                if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "Backspace" && event.key !== "ArrowLeft" && event.key !== "ArrowUp") {
                  return;
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  vditor.hint.render(vditor);
                }
                var previewElement = (0, hasClosest.fb)(range.startContainer, "vditor-wysiwyg__preview");
                if (!previewElement && range.startContainer.nodeType !== 3 && range.startOffset > 0) {
                  var blockRenderElement = range.startContainer;
                  if (blockRenderElement.classList.contains("vditor-wysiwyg__block")) {
                    previewElement = blockRenderElement.lastElementChild;
                  }
                }
                if (!previewElement) {
                  return;
                }
                var previousElement = previewElement.previousElementSibling;
                if (previousElement.style.display === "none") {
                  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                    showCode(previewElement, vditor);
                  } else {
                    showCode(previewElement, vditor, false);
                  }
                  return;
                }
                var codeElement = previewElement.previousElementSibling;
                if (codeElement.tagName === "PRE") {
                  codeElement = codeElement.firstElementChild;
                }
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  var blockRenderElement = previewElement.parentElement;
                  var nextNode = getRenderElementNextNode(blockRenderElement);
                  if (nextNode && nextNode.nodeType !== 3) {
                    var nextRenderElement = nextNode.querySelector(".vditor-wysiwyg__preview");
                    if (nextRenderElement) {
                      showCode(nextRenderElement, vditor);
                      return;
                    }
                  }
                  if (nextNode.nodeType === 3) {
                    while (nextNode.textContent.length === 0 && nextNode.nextSibling) {
                      nextNode = nextNode.nextSibling;
                    }
                    range.setStart(nextNode, 1);
                  } else {
                    range.setStart(nextNode.firstChild, 0);
                  }
                } else {
                  range.selectNodeContents(codeElement);
                  range.collapse(false);
                }
              });
            };
            return WYSIWYG2;
          }();
          ;
          var src_extends = function() {
            var extendStatics = function(d, b) {
              extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (b2.hasOwnProperty(p))
                    d2[p] = b2[p];
              };
              return extendStatics(d, b);
            };
            return function(d, b) {
              extendStatics(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
          }();
          var Vditor2 = function(_super) {
            src_extends(Vditor3, _super);
            function Vditor3(id, options) {
              var _this = _super.call(this) || this;
              _this.version = constants.H;
              if (typeof id === "string") {
                if (!options) {
                  options = {
                    cache: {
                      id: "vditor" + id
                    }
                  };
                } else if (!options.cache) {
                  options.cache = { id: "vditor" + id };
                } else if (!options.cache.id) {
                  options.cache.id = "vditor" + id;
                }
                id = document.getElementById(id);
              }
              var getOptions = new Options(options);
              var mergedOptions = getOptions.merge();
              if (!mergedOptions.i18n) {
                if (!["en_US", "ja_JP", "ko_KR", "ru_RU", "zh_CN", "zh_TW"].includes(mergedOptions.lang)) {
                  throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
                } else {
                  (0, addScript.G)(mergedOptions.cdn + "/dist/js/i18n/" + mergedOptions.lang + ".js", "vditorI18nScript").then(function() {
                    _this.init(id, mergedOptions);
                  });
                }
              } else {
                window.VditorI18n = mergedOptions.i18n;
                _this.init(id, mergedOptions);
              }
              return _this;
            }
            Vditor3.prototype.setTheme = function(theme, contentTheme, codeTheme, contentThemePath) {
              this.vditor.options.theme = theme;
              setTheme(this.vditor);
              if (contentTheme) {
                this.vditor.options.preview.theme.current = contentTheme;
                (0, setContentTheme.Z)(contentTheme, contentThemePath || this.vditor.options.preview.theme.path);
              }
              if (codeTheme) {
                this.vditor.options.preview.hljs.style = codeTheme;
                (0, setCodeTheme.Y)(codeTheme, this.vditor.options.cdn);
              }
            };
            Vditor3.prototype.getValue = function() {
              return getMarkdown(this.vditor);
            };
            Vditor3.prototype.getCurrentMode = function() {
              return this.vditor.currentMode;
            };
            Vditor3.prototype.focus = function() {
              if (this.vditor.currentMode === "sv") {
                this.vditor.sv.element.focus();
              } else if (this.vditor.currentMode === "wysiwyg") {
                this.vditor.wysiwyg.element.focus();
              } else if (this.vditor.currentMode === "ir") {
                this.vditor.ir.element.focus();
              }
            };
            Vditor3.prototype.blur = function() {
              if (this.vditor.currentMode === "sv") {
                this.vditor.sv.element.blur();
              } else if (this.vditor.currentMode === "wysiwyg") {
                this.vditor.wysiwyg.element.blur();
              } else if (this.vditor.currentMode === "ir") {
                this.vditor.ir.element.blur();
              }
            };
            Vditor3.prototype.disabled = function() {
              hidePanel(this.vditor, ["subToolbar", "hint", "popover"]);
              disableToolbar(this.vditor.toolbar.elements, constants.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"]));
              this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "false");
            };
            Vditor3.prototype.enable = function() {
              enableToolbar(this.vditor.toolbar.elements, constants.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"]));
              this.vditor.undo.resetIcon(this.vditor);
              this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "true");
            };
            Vditor3.prototype.getSelection = function() {
              if (this.vditor.currentMode === "wysiwyg") {
                return getSelectText(this.vditor.wysiwyg.element);
              } else if (this.vditor.currentMode === "sv") {
                return getSelectText(this.vditor.sv.element);
              } else if (this.vditor.currentMode === "ir") {
                return getSelectText(this.vditor.ir.element);
              }
            };
            Vditor3.prototype.renderPreview = function(value) {
              this.vditor.preview.render(this.vditor, value);
            };
            Vditor3.prototype.getCursorPosition = function() {
              return (0, selection.Ny)(this.vditor[this.vditor.currentMode].element);
            };
            Vditor3.prototype.isUploading = function() {
              return this.vditor.upload.isUploading;
            };
            Vditor3.prototype.clearCache = function() {
              localStorage.removeItem(this.vditor.options.cache.id);
            };
            Vditor3.prototype.disabledCache = function() {
              this.vditor.options.cache.enable = false;
            };
            Vditor3.prototype.enableCache = function() {
              if (!this.vditor.options.cache.id) {
                throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
              }
              this.vditor.options.cache.enable = true;
            };
            Vditor3.prototype.html2md = function(value) {
              return this.vditor.lute.HTML2Md(value);
            };
            Vditor3.prototype.exportJSON = function(value) {
              return this.vditor.lute.RenderJSON(value);
            };
            Vditor3.prototype.getHTML = function() {
              return getHTML(this.vditor);
            };
            Vditor3.prototype.tip = function(text, time) {
              this.vditor.tip.show(text, time);
            };
            Vditor3.prototype.setPreviewMode = function(mode) {
              setPreviewMode(mode, this.vditor);
            };
            Vditor3.prototype.deleteValue = function() {
              if (window.getSelection().isCollapsed) {
                return;
              }
              document.execCommand("delete", false);
            };
            Vditor3.prototype.updateValue = function(value) {
              document.execCommand("insertHTML", false, value);
            };
            Vditor3.prototype.insertValue = function(value, render) {
              if (render === void 0) {
                render = true;
              }
              var range = (0, selection.zh)(this.vditor);
              range.collapse(true);
              var tmpElement = document.createElement("template");
              tmpElement.innerHTML = value;
              range.insertNode(tmpElement.content.cloneNode(true));
              if (this.vditor.currentMode === "sv") {
                this.vditor.sv.preventInput = true;
                if (render) {
                  inputEvent(this.vditor);
                }
              } else if (this.vditor.currentMode === "wysiwyg") {
                this.vditor.wysiwyg.preventInput = true;
                if (render) {
                  input_input(this.vditor, getSelection().getRangeAt(0));
                }
              } else if (this.vditor.currentMode === "ir") {
                this.vditor.ir.preventInput = true;
                if (render) {
                  input(this.vditor, getSelection().getRangeAt(0), true);
                }
              }
            };
            Vditor3.prototype.setValue = function(markdown, clearStack) {
              var _this = this;
              if (clearStack === void 0) {
                clearStack = false;
              }
              if (this.vditor.currentMode === "sv") {
                this.vditor.sv.element.innerHTML = this.vditor.lute.SpinVditorSVDOM(markdown);
                processAfterRender(this.vditor, {
                  enableAddUndoStack: true,
                  enableHint: false,
                  enableInput: false
                });
              } else if (this.vditor.currentMode === "wysiwyg") {
                renderDomByMd(this.vditor, markdown, {
                  enableAddUndoStack: true,
                  enableHint: false,
                  enableInput: false
                });
              } else {
                this.vditor.ir.element.innerHTML = this.vditor.lute.Md2VditorIRDOM(markdown);
                this.vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(item) {
                  processCodeRender(item, _this.vditor);
                });
                process_processAfterRender(this.vditor, {
                  enableAddUndoStack: true,
                  enableHint: false,
                  enableInput: false
                });
              }
              this.vditor.outline.render(this.vditor);
              if (!markdown) {
                hidePanel(this.vditor, ["emoji", "headings", "submenu", "hint"]);
                if (this.vditor.wysiwyg.popover) {
                  this.vditor.wysiwyg.popover.style.display = "none";
                }
                this.clearCache();
              }
              if (clearStack) {
                this.clearStack();
              }
            };
            Vditor3.prototype.clearStack = function() {
              this.vditor.undo.clearStack(this.vditor);
              this.vditor.undo.addToUndoStack(this.vditor);
            };
            Vditor3.prototype.destroy = function() {
              this.vditor.element.innerHTML = this.vditor.originalInnerHTML;
              this.vditor.element.classList.remove("vditor");
              this.vditor.element.removeAttribute("style");
              document.getElementById("vditorIconScript").remove();
              this.clearCache();
            };
            Vditor3.prototype.getCommentIds = function() {
              if (this.vditor.currentMode !== "wysiwyg") {
                return [];
              }
              return this.vditor.wysiwyg.getComments(this.vditor, true);
            };
            Vditor3.prototype.hlCommentIds = function(ids) {
              if (this.vditor.currentMode !== "wysiwyg") {
                return;
              }
              var hlItem = function(item) {
                item.classList.remove("vditor-comment--hover");
                ids.forEach(function(id) {
                  if (item.getAttribute("data-cmtids").indexOf(id) > -1) {
                    item.classList.add("vditor-comment--hover");
                  }
                });
              };
              this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(item) {
                hlItem(item);
              });
              if (this.vditor.preview.element.style.display !== "none") {
                this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(item) {
                  hlItem(item);
                });
              }
            };
            Vditor3.prototype.unHlCommentIds = function(ids) {
              if (this.vditor.currentMode !== "wysiwyg") {
                return;
              }
              var unHlItem = function(item) {
                ids.forEach(function(id) {
                  if (item.getAttribute("data-cmtids").indexOf(id) > -1) {
                    item.classList.remove("vditor-comment--hover");
                  }
                });
              };
              this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(item) {
                unHlItem(item);
              });
              if (this.vditor.preview.element.style.display !== "none") {
                this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(item) {
                  unHlItem(item);
                });
              }
            };
            Vditor3.prototype.removeCommentIds = function(removeIds) {
              var _this = this;
              if (this.vditor.currentMode !== "wysiwyg") {
                return;
              }
              var removeItem = function(item, removeId) {
                var ids = item.getAttribute("data-cmtids").split(" ");
                ids.find(function(id, index) {
                  if (id === removeId) {
                    ids.splice(index, 1);
                    return true;
                  }
                });
                if (ids.length === 0) {
                  item.outerHTML = item.innerHTML;
                  (0, selection.zh)(_this.vditor).collapse(true);
                } else {
                  item.setAttribute("data-cmtids", ids.join(" "));
                }
              };
              removeIds.forEach(function(removeId) {
                _this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(item) {
                  removeItem(item, removeId);
                });
                if (_this.vditor.preview.element.style.display !== "none") {
                  _this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(item) {
                    removeItem(item, removeId);
                  });
                }
              });
              afterRenderEvent(this.vditor, {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: false
              });
            };
            Vditor3.prototype.init = function(id, mergedOptions) {
              var _this = this;
              this.vditor = {
                currentMode: mergedOptions.mode,
                element: id,
                hint: new Hint(mergedOptions.hint.extend),
                lute: void 0,
                options: mergedOptions,
                originalInnerHTML: id.innerHTML,
                outline: new Outline(window.VditorI18n.outline),
                tip: new Tip()
              };
              this.vditor.sv = new Editor(this.vditor);
              this.vditor.undo = new undo_Undo();
              this.vditor.wysiwyg = new WYSIWYG(this.vditor);
              this.vditor.ir = new IR(this.vditor);
              this.vditor.toolbar = new Toolbar(this.vditor);
              if (mergedOptions.resize.enable) {
                this.vditor.resize = new Resize(this.vditor);
              }
              if (this.vditor.toolbar.elements.devtools) {
                this.vditor.devtools = new DevTools();
              }
              if (mergedOptions.upload.url || mergedOptions.upload.handler) {
                this.vditor.upload = new Upload();
              }
              (0, addScript.G)(mergedOptions._lutePath || mergedOptions.cdn + "/dist/js/lute/lute.min.js", "vditorLuteScript").then(function() {
                _this.vditor.lute = (0, setLute.X)({
                  autoSpace: _this.vditor.options.preview.markdown.autoSpace,
                  codeBlockPreview: _this.vditor.options.preview.markdown.codeBlockPreview,
                  emojiSite: _this.vditor.options.hint.emojiPath,
                  emojis: _this.vditor.options.hint.emoji,
                  fixTermTypo: _this.vditor.options.preview.markdown.fixTermTypo,
                  footnotes: _this.vditor.options.preview.markdown.footnotes,
                  headingAnchor: false,
                  inlineMathDigit: _this.vditor.options.preview.math.inlineDigit,
                  linkBase: _this.vditor.options.preview.markdown.linkBase,
                  linkPrefix: _this.vditor.options.preview.markdown.linkPrefix,
                  listStyle: _this.vditor.options.preview.markdown.listStyle,
                  mark: _this.vditor.options.preview.markdown.mark,
                  mathBlockPreview: _this.vditor.options.preview.markdown.mathBlockPreview,
                  paragraphBeginningSpace: _this.vditor.options.preview.markdown.paragraphBeginningSpace,
                  sanitize: _this.vditor.options.preview.markdown.sanitize,
                  toc: _this.vditor.options.preview.markdown.toc
                });
                _this.vditor.preview = new Preview(_this.vditor);
                initUI(_this.vditor);
                if (mergedOptions.after) {
                  mergedOptions.after();
                }
                if (mergedOptions.icon) {
                  (0, addScript.J)(mergedOptions.cdn + "/dist/js/icons/" + mergedOptions.icon + ".js", "vditorIconScript");
                }
              });
            };
            return Vditor3;
          }(method["default"]);
          const src = Vditor2;
        })();
        __webpack_exports__ = __webpack_exports__["default"];
        return __webpack_exports__;
      })();
    });
  }
});

// src/components/markdown-element/index.litcss
var styles = r`#base{position:relative;height:100%;overflow:auto}`;
var markdown_element_default = styles;

// src/components/markdown-element/markdown-element.styles.ts
var result = r`
  ${component_styles_default}
  ${markdown_element_default}
`;
var markdown_element_styles_default = result;

// src/components/markdown-element/markdown-element.ts
var import_vditor = __toModule(require_index_min());

// node_modules/vditor/dist/css/content-theme/ant-design.css
var _default = {};

// node_modules/vditor/dist/css/content-theme/dark.css
var _default2 = {};

// node_modules/vditor/dist/css/content-theme/light.css
var _default3 = {};

// node_modules/vditor/dist/css/content-theme/wechat.css
var _default4 = {};

// src/components/markdown-element/markdown-element.ts
var mapCssMap = {
  ant: _default,
  dark: _default2,
  light: _default3,
  wechat: _default4
};
var SlMarkdownElement = class extends n {
  constructor() {
    super(...arguments);
    this.theme = "ant";
    this.cdn = "https://cdn.jsdelivr.net/npm/vditor@3.8.6";
    this.fetchMode = "same-origin";
  }
  themeChange() {
    if (mapCssMap[this.theme]) {
      this._themeCss = mapCssMap[this.theme];
    } else {
      this._themeCss = "";
    }
  }
  firstUpdated(map) {
    super.firstUpdated(map);
  }
  update(map) {
    super.update(map);
    if (this.mdsrc && (map.has("mdsrc") || map.has("_themeCss") || map.has("theme"))) {
      this.fetchAsText(this.mdsrc).then((markdown) => {
        this.markdown = markdown;
        import_vditor.default.md2html(markdown).then((res) => {
          this.baseDiv.innerHTML = res;
          import_vditor.default.mindmapRender(this.baseDiv, this.cdn, this.theme);
          import_vditor.default.mathRender(this.baseDiv);
          import_vditor.default.mermaidRender(this.baseDiv, this.cdn, this.theme);
          import_vditor.default.abcRender(this.baseDiv);
          import_vditor.default.mediaRender(this.baseDiv);
          import_vditor.default.highlightRender({ lineNumber: true, enable: true }, this.baseDiv);
          import_vditor.default.graphvizRender(this.baseDiv);
          import_vditor.default.flowchartRender(this.baseDiv);
          import_vditor.default.plantumlRender(this.baseDiv);
          import_vditor.default.chartRender(this.baseDiv, this.cdn, this.theme);
        });
      });
    }
  }
  fetchAsText(src) {
    return fetch(src, {
      mode: this.fetchMode
    }).then((res) => res.text());
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return y`<style>
        ${this._themeCss}
      </style>
      <div id="base"></div>`;
  }
};
SlMarkdownElement.styles = markdown_element_styles_default;
__decorateClass([
  e({ type: String })
], SlMarkdownElement.prototype, "mdsrc", 2);
__decorateClass([
  e({ type: String })
], SlMarkdownElement.prototype, "markdown", 2);
__decorateClass([
  e({ type: String, attribute: false, reflect: true })
], SlMarkdownElement.prototype, "theme", 2);
__decorateClass([
  t()
], SlMarkdownElement.prototype, "_themeCss", 2);
__decorateClass([
  watch("theme")
], SlMarkdownElement.prototype, "themeChange", 1);
__decorateClass([
  t()
], SlMarkdownElement.prototype, "fetchMode", 2);
__decorateClass([
  i("#base")
], SlMarkdownElement.prototype, "baseDiv", 2);
SlMarkdownElement = __decorateClass([
  n2("sl-markdown-element")
], SlMarkdownElement);
var markdown_element_default2 = SlMarkdownElement;

export {
  markdown_element_default2 as markdown_element_default
};
/*!
 * Vditor v3.8.7 - A markdown editor written in TypeScript.
 *
 * MIT License
 *
 * Copyright (c) 2018-present B3log 开源, b3log.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
