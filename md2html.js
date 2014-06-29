
// Read cmd args.
var args = process.argv.slice(2);
var inputFile = args[0];
var outputFile = args[1];

if (!inputFile) {
    throw "Missing input file.";
}

if (!outputFile) {
    throw "Missing output file.";
}

var pagedown = require("pagedown");
var fs = require("fs");

var throwIfErr = function(err) {
    if (err) {
        throw err;
    }
};

fs.open(outputFile, 'w', function(err, fd) {
    throwIfErr(err);

    fs.readFile(inputFile, function(err, data) {
        throwIfErr(err);

        fs.writeSync(fd, '<html>'+'\n'+
'<head><title>Resume - Ben Sorohan</title>'+'\n'+
'<link rel="stylesheet" href="resume.css"/>'+'\n'+
'</head>'+'\n'+
'<body>');

        var converter = new pagedown.Converter();
        var safeConverter = pagedown.getSanitizingConverter();
        var html = converter.makeHtml(data.toString('utf-8'));

        fs.writeSync(fd, html);

        fs.writeSync(fd, '\n' +
'<script src="resume.js"></script>' +
'</body>' +
'</html>'
        );
    });
});
