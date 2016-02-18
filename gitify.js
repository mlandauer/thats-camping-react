// A browserify transform that replaces __git_revision__ with the
// git revision of the current repository at build time and
// __git_revision_short__ with a shorter version of the same thing

var through = require('through2');
var git = require('git-rev-sync');

module.exports = function (file) {
    return through(function (buf, enc, next) {
        buf = buf.toString('utf8');
        buf = buf.replace(/__git_revision_short__/g, git.short());
        buf = buf.replace(/__git_revision__/g, git.long());
        this.push(buf);
        next();
    });
};
