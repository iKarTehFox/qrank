import QRCode from 'qrcode';

// Store the SVG element for later use
let svgElement: SVGElement | null = null;

/**
 * Generates a QR code for the given text
 * @param text Text to encode in QR code
 * @param element Element to render QR code in
 * @param options Optional configuration for QR code
 */
export async function generateQRCode(
    text: string, 
    element: HTMLElement,
    options: QRCode.QRCodeRenderersOptions = {}
): Promise<void> {
    try {
        const defaultOptions: QRCode.QRCodeRenderersOptions = {
            width: 200,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        };
    
        const mergedOptions = { ...defaultOptions, ...options };
    
        // Clear the element first
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    
        // Generate QR code as canvas for display
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, text, mergedOptions);
        element.appendChild(canvas);
        
        // Also generate SVG version and store it for later use
        const svgString = await QRCode.toString(text, {
            ...mergedOptions,
            type: 'svg'
        });
        
        // Create an SVG element from the string
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        svgElement = svgDoc.documentElement as unknown as SVGElement;
    
    } catch (error) {
        console.error('Error generating QR code:', error);
        element.innerHTML = '<p class="text-danger">Failed to generate QR code</p>';
        svgElement = null;
    }
}

/**
 * Downloads the QR code as an image
 * @param qrcodeElement Element containing the QR code canvas
 * @param format Format to download (png or svg)
 * @param filename Name for the downloaded file
 */
export function downloadQRCode(
    qrcodeElement: HTMLElement, 
    format: 'png' | 'svg' = 'png', 
    filename: string = 'qrank-qrcode'
): void {
    if (format === 'png') {
        downloadAsPNG(qrcodeElement, `${filename}.png`);
    } else {
        downloadAsSVG(`${filename}.svg`);
    }
}

/**
 * Downloads the QR code as a PNG image
 * @param qrcodeElement Element containing the QR code canvas
 * @param filename Name for the downloaded file
 */
function downloadAsPNG(qrcodeElement: HTMLElement, filename: string): void {
    const canvas = qrcodeElement.querySelector('canvas');
    if (!canvas) {
        console.error('No canvas found to download');
        return;
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

/**
 * Downloads the QR code as an SVG image
 * @param filename Name for the downloaded file
 */
function downloadAsSVG(filename: string): void {
    if (!svgElement) {
        console.error('No SVG element available to download');
        return;
    }

    // Clone the SVG element to avoid modifying the original
    const svgClone = svgElement.cloneNode(true) as SVGElement;
    
    // Convert SVG to string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);
    
    // Create a Blob from the SVG string
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    
    // Download the SVG
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
}
