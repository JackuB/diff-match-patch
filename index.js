function factory() {
  // FETCHED CONTENT START
  console.error('Installation not completed');
  process.exit(1);
  // FETCHED CONTENT END
  return this;
}

const {
  diff_match_patch,
  DIFF_DELETE,
  DIFF_INSERT,
  DIFF_EQUAL
} = factory.call({});

module.exports = Object.assign(
  diff_match_patch,
  {
    DIFF_DELETE,
    DIFF_INSERT,
    DIFF_EQUAL
  }
);
