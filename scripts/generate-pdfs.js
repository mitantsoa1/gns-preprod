const fs = require("fs");
const PDFDocument = require("pdfkit");

const files = [
  {
    name: "brochure-gns-btp.pdf",
    text: "Brochure GNS BTP\n\nPrésentation de nos services...",
  },
  {
    name: "catalogue-prestations.pdf",
    text: "Catalogue des Prestations\n\nListe de nos tarifs et services...",
  },
  {
    name: "certifications-qualibat.pdf",
    text: "Certifications Qualibat\n\nNos certifications officielles...",
  },
  { name: "charte-rse.pdf", text: "Charte RSE\n\nNos engagements RSE..." },
];

if (!fs.existsSync("public/doc/pdf")) {
  fs.mkdirSync("public/doc/pdf", { recursive: true });
}

files.forEach((file) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`public/doc/pdf/${file.name}`));
  doc.fontSize(25).text(file.text, 100, 100);
  doc.end();
  console.log(`Created ${file.name}`);
});
