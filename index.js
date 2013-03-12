var fs = require('fs'),
    production = process.env.NODE_ENV === 'production',
    map;

if (production) {
    map = JSON.parse(fs.readFileSync('aspa.json', 'utf8'));
}

/**
 * Utility method to get asset path.
 */
exports.getAssetPath = function(asset) {
    if (production) {
        asset = map[asset];
    }
    return asset;
};

/**
 * Connect middleware to adjust response headers for gzipped assets.
 */
exports.adjustResponseHeaders = function(req, res, next) {
    var path = req.path;

    if (path.slice(-3) === '.gz') {
        res.set('Content-Encoding', 'gzip');
        if (path.slice(-7, -3) === '.css') {
            res.set('Content-Type', 'text/css');
        } else if (path.slice(-6, -3) === '.js') {
            res.set('Content-Type', 'application/javascript');
        }
    }
    next();
};
