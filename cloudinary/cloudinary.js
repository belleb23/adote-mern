import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dv7fyoaof', 
  api_key: '826388641662275', 
  api_secret: '7KyUmaHmrLyq2hTssQtDRGMhj1k' 
});

// module.exports = cloudinary;

const cloudinary = require('cloudinary').v2;

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: 'dv7fyoaof',
  api_key: '826388641662275',
  api_secret: '7KyUmaHmrLyq2hTssQtDRGMhj1k'
});

module.exports = cloudinary;