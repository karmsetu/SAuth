import QRCode from 'qrcode';
import fs from 'fs';
import crypto from 'crypto';

// Error handling function (optional)
function handleError(err) {
    console.error('Error generating QR code:', err);
}

const generateQRCode = async (payload) => {
    // Generate the QR code as a data URL
    try {
        const url = await new Promise((resolve, reject) => {
            QRCode.toDataURL(payload, (err, url) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(url);
            });
        });

        // Extract the image data from the data URL
        const idLength = 6; // Adjust as needed
        const idBytes = crypto.randomBytes(idLength / 2);
        const id = idBytes.toString('hex').toUpperCase();
        const base64Image = url.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Image, 'base64');

        // Save the QR code image to a file (replace 'qr_code.png' with your desired filename)
        fs.writeFileSync(`./redis/${id}.png`, imageBuffer);
        console.log('QR code generated and saved successfully!');

        return id;
    } catch (err) {
        handleError(err);
        throw err; // Re-throw the error for caller handling
    }
};

export default generateQRCode;
