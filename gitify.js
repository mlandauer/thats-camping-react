// A browserify transform that replaces __git_revision__ with the
// git revision of the current repository at build time and
// __git_revision_short__ with a shorter version of the same thing

var through = require('through2');
var git = require('git-rev-sync');

module.exports = function (file) {
    return through(function (buf, enc, next) {
        // If we're building this on heroku there will be an environment
        // variable SOURCE_VERSION. First try using that
        var revision = process.env.SOURCE_VERSION;
        // If that doesn't work then try using a local git repository
        if (revision == undefined) {
          revision = git.long();
        }

        buf = buf.toString('utf8');
        buf = buf.replace(/__git_revision_short__/g, revision.substring(0, 7));
        buf = buf.replace(/__git_revision__/g, revision);
        this.push(buf);
        next();
    });
};
