const fs = require("fs");
const QRCode = require("qrcode");

// Data to encode in the QR code
const data =
    "http://localhost:1000/auth-check/v2/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hvdXJ5YSIsImlhdCI6MTcxMDQzOTQ0Nn0.ncc47O53zVP-diZ2DWY5uDUXeUXuYinPOnGjoe3LZIU";

// Options for the QR code (optional)
const options = {
    errorCorrectionLevel: "H", // High error correction level
    type: "png", // Output format (PNG by default)
    color: {
        dark: "#000", // Dark color
        light: "#fff", // Light color
    },
};

// Generate QR code as a data URL
QRCode.toDataURL(data, options, (error, url) => {
    if (error) {
        console.error("Error generating QR code:", error);
    } else {
        console.log("QR code generated successfully");
        console.log("QR code URL:", url);

        // Save QR code image to a file (optional)
        const filePath = "qrcode.png";
        fs.writeFileSync(filePath, url.split(",")[1], "base64");
        console.log("QR code image saved to:", filePath);
    }
});
