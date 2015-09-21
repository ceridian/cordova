cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.bluefletch.motorola/www/datawedge.js",
        "id": "com.bluefletch.motorola.MotorolaDataWedge",
        "clobbers": [
            "datawedge"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "com.bluefletch.motorola": "0.1.0"
}
// BOTTOM OF METADATA
});