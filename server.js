const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // index.html
    const indexPath = path.join(__dirname, 'index.html');
    return serveFile(indexPath, 'text/html', res);
  } 
  
  else if (req.url === '/iframe.html') {
    // iframe.html
    const iframePath = path.join(__dirname, 'iframe.html');
    return serveFile(iframePath, 'text/html', res);
  } 
  
  else if (req.url === '/portfolioStyle.css') {
    // portfolioStyle.css
    const cssPath = path.join(__dirname, 'portfolioStyle.css');
    return serveFile(cssPath, 'text/css', res);
  } 
  
  else if (req.url.startsWith('/pictures/')) {
    // images from the "pictures" folder
    const imageName = req.url.replace('/pictures/', '');
    return serveImage(imageName, res);
  } 
  
  else if (req.url === '/video.mp4') {
    // video file
    const videoPath = path.join(__dirname, 'pictures/neon-geometry-shapes-moewalls-com.mp4');
    return serveVideo(videoPath, res);
  } 
  
  else if (req.url.startsWith('/fonts/')) {
    // Serve .ttf font files from the "fonts" folder
    const fontName = req.url.replace('/fonts/', '');
    const fontPath = path.join(__dirname, 'fonts', fontName);
    return serveFile(fontPath, 'application/font-sfnt', res);
  } 
  
  else {
    // Handle other requests or resources here
    res.writeHead(404);
    res.end('Not Found');
  }
});

function serveFile(filePath, contentType, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('File not found');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function serveImage(imageName, res) {
  // Serve images from the "pictures" folder
  const imageExtensions = {
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
  };
  const extension = path.extname(imageName).toLowerCase();
  const contentType = imageExtensions[extension] || 'image/jpeg'; // Default to JPEG

  const imagePath = path.join(__dirname, 'pictures', imageName);
  return serveFile(imagePath, contentType, res);
}

function serveVideo(videoPath, res) {
  // Serve the video file
  return serveFile(videoPath, 'video/mp4', res);
}

server.listen(port, () => {
  console.log(`Server is running on localhost port ${port}`);
});
