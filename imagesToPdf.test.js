const fs = require('fs');
const mockFs = require('mock-fs');
const imagesToPdf = require('./imagesToPdf');

const imageContent = fs.readFileSync('./test-images/test-image.jpg');

describe('imagesToPdf', () => {
  beforeEach(() => {
    const pdfKitFont = fs.readFileSync('./node_modules/pdfkit/js/data/Helvetica.afm');

    mockFs({
      './node_modules/pdfkit/js/data/': {
        'Helvetica.afm': pdfKitFont
      },
        'test-images': {
            'image1.jpg': imageContent,
            'image2.png': imageContent,
            'image3.jpeg': imageContent
        }
    })
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should create a PDF from images', async () => {
    const imageDir = 'test-images';
    const outputFileName = 'test-output.pdf';
    await imagesToPdf(imageDir, outputFileName);
    expect(fs.existsSync(outputFileName)).toBeTruthy();
  })
})

