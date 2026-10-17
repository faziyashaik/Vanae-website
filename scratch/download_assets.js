const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = 'c:/Users/Ismail Pasha/OneDrive/Desktop/Vanae Website/public/assets';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const assets = [
    // Video and Poster
    { url: 'https://bupara.in/img/bupara-slider.mp4', dest: path.join(publicDir, 'videos/hero.mp4') },
    { url: 'https://bupara.in/img/slider.jpg', dest: path.join(publicDir, 'images/hero-poster.jpg') },

    // Elevation & Backgrounds
    { url: 'https://bupara.in/img/bupara-lb-nagar-elevation.png', dest: path.join(publicDir, 'images/tower-elevation.png') },
    { url: 'https://bupara.in/img/elevation-bg.jpg', dest: path.join(publicDir, 'images/elevation-bg.jpg') },
    { url: 'https://bupara.in/img/home-bg-2.png', dest: path.join(publicDir, 'images/home-bg-texture.png') },
    { url: 'https://bupara.in/img/home-bg-01.jpg', dest: path.join(publicDir, 'images/home-bg-01.jpg') },
    { url: 'https://bupara.in/img/pattrent-1.png', dest: path.join(publicDir, 'images/pattern-1.png') },
    { url: 'https://bupara.in/img/contact-bg.png', dest: path.join(publicDir, 'images/contact-bg.png') },
    { url: 'https://bupara.in/img/menu-bg.jpg', dest: path.join(publicDir, 'images/menu-bg.jpg') },

    // Bespoke Collage
    { url: 'https://bupara.in/img/about-apartment-1.jpg', dest: path.join(publicDir, 'images/bespoke-1.jpg') },
    { url: 'https://bupara.in/img/about-apartment-2.jpg', dest: path.join(publicDir, 'images/bespoke-2.jpg') },
    { url: 'https://bupara.in/img/about-apartment-3.jpg', dest: path.join(publicDir, 'images/bespoke-3.jpg') },

    // Sky Terrace
    { url: 'https://bupara.in/img/bupara-top-view.jpg', dest: path.join(publicDir, 'images/sky-terrace.jpg') },
    { url: 'https://bupara.in/img/pool.png', dest: path.join(publicDir, 'icons/pool.png') },
    { url: 'https://bupara.in/img/partylawn.png', dest: path.join(publicDir, 'icons/partylawn.png') },

    // Amenities
    { url: 'https://bupara.in/img/amenities-1.png', dest: path.join(publicDir, 'icons/amenities-badge.png') },
    { url: 'https://bupara.in/img/bupara-amenities-home-0.jpg', dest: path.join(publicDir, 'images/amenity-fitness.jpg') },
    { url: 'https://bupara.in/img/bupara-amenities-home-1.jpg', dest: path.join(publicDir, 'images/amenity-wellbeing.jpg') },
    { url: 'https://bupara.in/img/bupara-amenities-home-2.jpg', dest: path.join(publicDir, 'images/amenity-banquet.jpg') },
    { url: 'https://bupara.in/img/bupara-amenities-home-3.jpg', dest: path.join(publicDir, 'images/amenity-cafe.jpg') },
    { url: 'https://bupara.in/img/bupara-amenities-home-4.jpg', dest: path.join(publicDir, 'images/amenity-tranquillity.jpg') },
    { url: 'https://bupara.in/img/bupara-amenities-home-5.jpg', dest: path.join(publicDir, 'images/amenity-gaming.jpg') },

    // Sanctuary Building
    { url: 'https://bupara.in/img/bupara-building.jpg', dest: path.join(publicDir, 'images/sanctuary-building.jpg') },

    // Floor Plans
    { url: 'https://bupara.in/img/bupara-floor-plans.jpg', dest: path.join(publicDir, 'images/floor-plan-1.jpg') },
    { url: 'https://bupara.in/img/bupara-floor-plans-1.jpg', dest: path.join(publicDir, 'images/floor-plan-2.jpg') },

    // Location
    { url: 'https://bupara.in/img/location-bupara.jpg', dest: path.join(publicDir, 'images/location-aerial.jpg') },
    { url: 'https://bupara.in/img/train.png', dest: path.join(publicDir, 'icons/train.png') },
    { url: 'https://bupara.in/img/flight.png', dest: path.join(publicDir, 'icons/flight.png') },

    // Gallery
    { url: 'https://bupara.in/img/bupara-gallery-1.jpg', dest: path.join(publicDir, 'images/gallery-1.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-2.jpg', dest: path.join(publicDir, 'images/gallery-2.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-3.jpg', dest: path.join(publicDir, 'images/gallery-3.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-4.jpg', dest: path.join(publicDir, 'images/gallery-4.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-5.jpg', dest: path.join(publicDir, 'images/gallery-5.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-6.jpg', dest: path.join(publicDir, 'images/gallery-6.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-7.jpg', dest: path.join(publicDir, 'images/gallery-7.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-8.jpg', dest: path.join(publicDir, 'images/gallery-8.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-9.jpg', dest: path.join(publicDir, 'images/gallery-9.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-10.jpg', dest: path.join(publicDir, 'images/gallery-10.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-11.jpg', dest: path.join(publicDir, 'images/gallery-11.jpg') },
    { url: 'https://bupara.in/img/bupara-gallery-12.jpg', dest: path.join(publicDir, 'images/gallery-12.jpg') },
  ];

  console.log(`Starting download of ${assets.length} assets...`);
  for (const item of assets) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`Downloaded: ${path.basename(item.dest)}`);
    } catch (e) {
      console.error(`Error downloading ${item.url}:`, e.message);
    }
  }
  console.log('All assets processed.');
}

main();
