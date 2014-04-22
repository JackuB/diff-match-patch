# diff-match-patch

npm package for https://code.google.com/p/google-diff-match-patch/

[![Build Status](https://img.shields.io/travis/ForbesLindesay/diff-match-patch/master.svg)](https://travis-ci.org/ForbesLindesay/diff-match-patch)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/diff-match-patch.svg)](https://gemnasium.com/ForbesLindesay/diff-match-patch)
[![NPM version](https://img.shields.io/npm/v/diff-match-patch.svg)](http://badge.fury.io/js/diff-match-patch)

## Installation

    npm install diff-match-patch

## API

https://code.google.com/p/google-diff-match-patch/wiki/API

```javascript
var DiffMatchPatch = require('diff-match-patch');
var dmp = new DiffMatchPatch();
//use the methods that dmp has
//see: https://code.google.com/p/google-diff-match-patch/wiki/API

//You can also use the following properties:

DiffMatchPatch.DIFF_DELETE = -1;
DiffMatchPatch.DIFF_INSERT = 1;
DiffMatchPatch.DIFF_EQUAL = 0;
```

## License

  http://www.apache.org/licenses/LICENSE-2.0