//Start:🕒 2026-09-19 Saturday 16:36:42
//Owner:🔧 AOSpro
//Call: 📞 t.me/aospro
//Project: 📌

/**
 * Edits an image to simulate morning, noon, or night.
 * @param {string} picUrl - The source URL or base64 string of the image.
 * @param {'morning' | 'noon' | 'night'} time - The desired time of day.
 * @returns {Promise<string>} A promise that resolves to the edited image data URL.
 */
export const transformImageTime = (picUrl, lightStatus) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.globalCompositeOperation = 'source-over';

      if (lightStatus === 'fajr') {
        // Dawn: Cool, slightly dim, soft purple/pink tint
        ctx.filter = 'brightness(75%) contrast(95%) sepia(20%) hue-rotate(280deg)';
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'color-burn';
        ctx.fillStyle = 'rgba(200, 130, 180, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

      } else if (lightStatus === 'dohr') {
        // Midday: Maximum clarity, clean noon daylight
        ctx.filter = 'brightness(110%) contrast(105%)';
        ctx.drawImage(img, 0, 0);

      } else if (lightStatus === 'asr') {
        // Afternoon: Golden hour warmth, long shadows look
        ctx.filter = 'brightness(95%) contrast(100%) sepia(50%) hue-rotate(-15deg)';
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'color-burn';
        ctx.fillStyle = 'rgba(255, 130, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

      } else if (lightStatus === 'magrib') {
        // Sunset: Deep crimson red and orange tones
        ctx.filter = 'brightness(65%) contrast(105%) saturate(130%) hue-rotate(-30deg)';
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'rgba(230, 90, 40, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

      } else {
        // 'isha' (Night): Dark blue hour
        ctx.filter = 'brightness(40%) contrast(110%) saturate(60%) hue-rotate(20deg)';
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'rgba(10, 20, 65, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = (err) => reject(err);
    img.src = picUrl;
  });
};
