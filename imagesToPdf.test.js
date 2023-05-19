const fs = require('fs');
const mockFs = require('mock-fs');
const imagesToPdf = require('./imagesToPdf');

describe('imagesToPdf', () => {
  beforeEach(() => {
    const pdfKitFont = fs.readFileSync('./node_modules/pdfkit/js/data/Helvetica.afm');

    mockFs({
      './node_modules/pdfkit/js/data/': {
        'Helvetica.afm': pdfKitFont
      },
        'images': {
            'image1.jpg': 'dummy content',
            'image2.png': 'dummy content',
            'image3.jpeg': 'dummy content'
        }
    })
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should create a PDF from images', async () => {
    const imageDir = 'test-images';
    const outputFileName = 'test-output.pdf';
    imagesToPdf(imageDir, outputFileName);

    setTimeout(() => {
      expect(fs.existsSync(outputFileName)).toBeTruthy();
      done();
    }, 500);
  })
})

