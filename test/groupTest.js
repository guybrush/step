require('./helper');

var dirListing = fs.readdirSync(__dirname),
    dirResults = dirListing.map(function (filename) {
      return fs.readFileSync(__dirname + "/" + filename, 'utf8');
    });

expect('one');
expect('two');
expect('three');
Step(
  function readDir() {
    fulfill('one');
    fs.readdir(__dirname, this);
  },
  function readFiles(err, results) {
    fulfill('two');
    if (err) throw err;
    // Create a new group
    assert.deepEqual(dirListing, results);
    var group = this.group();
    results.forEach(function (filename) {
      if (/\.js$/.test(filename)) {
        fs.readFile(__dirname + "/" + filename, 'utf8', group());
      }
    });
  },
  function showAll(err , files) {
    console.log(files)
    console.log(dirResults)
    fulfill('three');
    if (err) throw err;
    //assert.deepEqual(dirResults, files[0][0]);
  }
);
