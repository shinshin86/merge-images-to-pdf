const imagesToPdf = require('./imagesToPdf');
const directory = process.argv[2] || "./images"
imagesToPdf(directory, 'output.pdf');
