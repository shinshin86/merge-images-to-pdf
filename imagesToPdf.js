const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const validExt = [".jpg", ".jpeg", ".png"];

function imagesToPdf(directoryPath, outputPath) {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(outputPath));

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        let pageCount = 0;
        files.forEach((file) => {
            if(validExt.includes(path.extname(file))){
                if(pageCount !== 0){
                    doc.addPage();
                }
                doc.image(path.join(directoryPath, file), 0, 0, {fit: [595.28, 841.89]});

                pageCount++;
            }
        });

        doc.end();
    });
}

module.exports = imagesToPdf;
