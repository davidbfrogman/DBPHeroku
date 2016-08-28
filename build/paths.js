var appRoot = 'src/';
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/'

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  data: appRoot + '**/*.json',
  html: appRoot + '**/*.html',
  styles: appRoot + '**/*.css',
  content: appRoot + '**/*.png',
  imagesIn: './images/**/*.jpg',
  imagesFulls: './images/fulls/*.jpg',
  imagesThumbs: './images/thumbs/',
  imagesOut: outputRoot + '/images/',
  gifsIn: './images/gifs/**/*.gif',
  gifsOut: outputRoot + '/images/gifs/',
  output: outputRoot,
  exportSrv: exporSrvtRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
