import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementRef, fileName = "resume.pdf") => {
  const element = elementRef.current;
  
  // Set explicit dimensions for A4
  const a4Width = 210; // A4 width in mm
  const a4Height = 297; // A4 height in mm
  
  // Create canvas with proper dimensions and settings
  const canvas = await html2canvas(element, {
    scale: 3, // Increased scale for better text quality
    useCORS: true,
    logging: false,
    allowTaint: true,
    backgroundColor: '#ffffff',
    width: a4Width * 3.78,
    height: a4Height * 3.78,
    windowWidth: a4Width * 3.78,
    windowHeight: a4Height * 3.78,
    onclone: (clonedDoc) => {
      // Ensure all text elements are properly rendered
      const textElements = clonedDoc.getElementsByTagName('*');
      for (let element of textElements) {
        if (element.style) {
          element.style.transform = 'none';
          element.style.transformOrigin = 'none';
          element.style.letterSpacing = 'normal';
          element.style.wordSpacing = 'normal';
          element.style.lineHeight = 'normal';
        }
      }
    }
  });

  const imgData = canvas.toDataURL("image/png", 1.0);
  
  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
    precision: 16
  });

  // Calculate dimensions to fit A4 while maintaining aspect ratio
  const imgWidth = a4Width;
  const imgHeight = (canvas.height * a4Width) / canvas.width;

  // Add image to PDF with proper positioning
  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    imgWidth,
    imgHeight,
    undefined,
    'FAST'
  );

  // Save the PDF
  pdf.save(fileName);
}; 