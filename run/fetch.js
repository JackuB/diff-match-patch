const { promisify } = require('util');
const fs = require('fs');
const https = require('https');

const repourl = 'https://raw.githubusercontent.com' +
  '/google/diff-match-patch/master/javascript';

const sourceurl = `${repourl}/diff_match_patch_uncompressed.js`;
const testurl = `${repourl}/tests/diff_match_patch_test.js`;

const sourcepath = 'index.js';
const testpath = 'test/index.js';

const templatePlaceHolder = /(\/\/ FETCHED CONTENT START\n)(?:[.\s\S]*)(\/\/ FETCHED CONTENT END)/;

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const writeToFile = filepath => filecontent => writeFile(filepath, filecontent);

const replaceContent = (placeholder, content) => templatecontent =>
  templatecontent.replace(placeholder, `$1${content}\n$2`);

const feedTemplate = (templatepath, filepath, encoding = 'utf8') => (sourcecontent) => {
  readFile(templatepath, encoding)
    .then(replaceContent(templatePlaceHolder, sourcecontent))
    .then(writeToFile(filepath));
};

const get = (url) => new Promise((resolve, reject) =>
  https.get(url, resolve).on('error', reject)
);

const check = (checker) => (result) => checker(result) || result;
const reject = (message) => Promise.reject(new Error(message));

const checkStatusCode = (expectedCode) =>
  check(({ statusCode }) => {
    if (statusCode !== expectedCode) {
      return reject('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    }
  })

const checkContentType = (expectedType) =>
  check(({ headers }) => {
    if (headers['content-type'].indexOf(expectedType) !== 0) {
      return reject('Invalid content-type.\n' +
        `Expected text/plain but received ${headers['content-type']}`);
    }
  });

const getResponseTextBody = (encoding) => (response) => new Promise((resolve, reject) => {
  response.setEncoding(encoding);
  let textContent = '';
  response.on('data', (chunk) => { textContent += chunk; });
  response.on('end', () => resolve(textContent));
  response.on('error', reject);
});

const fetch = (url, type = 'text/plain', encoding = 'utf8') => get(url)
  .then(checkStatusCode(200))
  .then(checkContentType(type))
  .then(getResponseTextBody(encoding));

fetch(sourceurl)
  .then(feedTemplate(sourcepath, sourcepath))
  .catch(console.error);

fetch(testurl)
  .then(feedTemplate(testpath, testpath))
  .catch(console.error);
