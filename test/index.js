const assert = require('assert');
const test = require('testit');
const diff_match_patch = require('../');

const {
  DIFF_DELETE,
  DIFF_INSERT,
  DIFF_EQUAL
} = diff_match_patch;

// If expected and actual are the identical, print 'Ok', otherwise 'Fail!'
function assertEquals(msg, expected, actual) {
  if (typeof actual == 'undefined') {
    // msg is optional.
    actual = expected;
    expected = msg;
    msg = undefined;
  }
  assert.equal(actual, expected, msg);
}

function assertTrue(msg, actual) {
  if (typeof actual == 'undefined') {
    // msg is optional.
    actual = msg;
    assertEquals(true, actual);
  } else {
    assertEquals(msg, true, actual);
  }
}

function assertFalse(msg, actual) {
  if (typeof actual == 'undefined') {
    // msg is optional.
    actual = msg;
    assertEquals(false, actual);
  } else {
    assertEquals(msg, false, actual);
  }
}

// FETCHED CONTENT START
console.error('An error occured during installation process');
process.exit(1);
// FETCHED CONTENT END

[
  'testDiffCommonPrefix',
  'testDiffCommonSuffix',
  'testDiffCommonOverlap',
  'testDiffHalfMatch',
  'testDiffLinesToChars',
  'testDiffCharsToLines',
  'testDiffCleanupMerge',
  'testDiffCleanupSemanticLossless',
  'testDiffCleanupSemantic',
  'testDiffCleanupEfficiency',
  'testDiffPrettyHtml',
  'testDiffText',
  'testDiffDelta',
  'testDiffXIndex',
  'testDiffLevenshtein',
  'testDiffBisect',
  'testDiffMain',

  'testMatchAlphabet',
  'testMatchBitap',
  'testMatchMain',

  'testPatchObj',
  'testPatchFromText',
  'testPatchToText',
  'testPatchAddContext',
  'testPatchMake',
  'testPatchSplitMax',
  'testPatchAddPadding',
  'testPatchApply'
]
  .map((testName) => ({ testName, testFunction: eval(testName) }))
  .forEach(({ testName, testFunction }) =>
    test(testName, testFunction)
  );
