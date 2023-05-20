const PDFDocument = require('pdfkit');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const validExt = [".jpg", ".jpeg", ".png"];

async function imagesToPdf(directoryPath, outputPath) {
    const doc = new PDFDocument();
    const output = fs.createWriteStream(outputPath);
    doc.pipe(output);

    let files;

    try {
        files = await fsPromises.readdir(directoryPath);
    } catch(err) {
        console.log('Unable to scan directory: ' + err);
        return;
    }

    let pageCount = 0;
    for(const file of files) {
        if(validExt.includes(path.extname(file))){
            if(pageCount !== 0){
                doc.addPage();
            }
            doc.image(path.join(directoryPath, file), 0, 0, {fit: [595.28, 841.89]});

            pageCount++;
        }
    }

    doc.end();

    return new Promise((resolve, reject) => {
        output.on('finish', resolve);
        output.on('error', reject);
    })
}

module.exports = imagesToPdf;