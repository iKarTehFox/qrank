import { generateQRCode, downloadQRCode } from './utils/qrcode-handler';
import { decodeMessage, createShareableLink } from './utils/message-utils';
import { menu } from './utils/dom-elements';

// Configuration
const config = {
    baseUrl: window.location.origin,
    maxMessageLength: 60,
};

// Global variables
let shareableLink: string;

/**
 * Copies the shareable link to clipboard
 */
async function copyToClipboard(): Promise<void> {
    try {
        await navigator.clipboard.writeText(menu.shareLink.value);
    
        // Visual feedback
        const originalText = menu.copyBtn.innerHTML;
        menu.copyBtn.innerHTML = '<i class="bi bi-check"></i> Copied!';
        menu.copyBtn.classList.add('btn-success');
        menu.copyBtn.classList.remove('btn-outline-secondary');
    
        setTimeout(() => {
            menu.copyBtn.innerHTML = originalText;
            menu.copyBtn.classList.remove('btn-success');
            menu.copyBtn.classList.add('btn-outline-secondary');
        }, 2000);
    } catch (error) {
        console.error('Failed to copy text:', error);
        alert('Failed to copy to clipboard');
    }
}

/**
 * Shows the creator section and hides others
 */
function showCreator(): void {
    menu.creatorSection.classList.remove('d-none');
    menu.resultSection.classList.add('d-none');
    menu.messageDisplay.classList.add('d-none');
    menu.messageInput.value = '';
}

/**
 * Shows the result section with generated QR code
 */
function showResult(message: string): void {
    shareableLink = createShareableLink(message, config.baseUrl);
  
    // Generate QR code
    generateQRCode(shareableLink, menu.qrcode);
  
    // Update shareable link
    menu.shareLink.value = shareableLink;
  
    // Show result section
    menu.creatorSection.classList.add('d-none');
    menu.resultSection.classList.remove('d-none');
    menu.messageDisplay.classList.add('d-none');
}

/**
 * Shows the message display section with large, centered text
 */
function showMessage(message: string): void {
    // Hide all main sections
    menu.creatorSection.classList.add('d-none');
    menu.resultSection.classList.add('d-none');
    
    // Get the container element (the main container of the page)
    const container = document.querySelector('.container') as HTMLElement;
    
    // Clear the container
    container.innerHTML = '';
    
    // Create a simple message display with large, centered text
    const messageElement = document.createElement('div');
    messageElement.className = 'vh-100 d-flex flex-column justify-content-center align-items-center';
    
    // Create the message container structure
    const centerWrapper = document.createElement('div');
    centerWrapper.className = 'text-center mb-5';
    
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container p-4 rounded shadow-sm';
    
    const messageParagraph = document.createElement('p');
    messageParagraph.className = 'display-1 fw-bold';
    // Use innerHTML since we've (hopefully) already sanitized the message
    messageParagraph.innerHTML = message;
    
    messageContainer.appendChild(messageParagraph);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'mt-5';
    
    const createButton = document.createElement('a');
    createButton.href = '/';
    createButton.className = 'btn btn-primary';
    createButton.textContent = 'Create Your Own QRank';
    
    const footerText = document.createElement('p');
    footerText.className = 'text-muted small mt-2';
    footerText.textContent = 'Created by ';
    
    const footerLink = document.createElement('a');
    footerLink.href = 'https://github.com/iKarTehFox/qrank';
    footerLink.className = 'text-muted';
    footerLink.textContent = 'iKarTehFox';
    
    footerText.appendChild(footerLink);
    buttonContainer.appendChild(createButton);
    buttonContainer.appendChild(footerText);
    
    centerWrapper.appendChild(messageContainer);
    centerWrapper.appendChild(buttonContainer);
    
    messageElement.appendChild(centerWrapper);
    container.appendChild(messageElement);
    
    // Add some basic styles for the message
    const style = document.createElement('style');
    style.textContent = `
        body {
            background-color: #f8f9fa;
        }
        .message-container {
            background-color: white;
            max-width: 90vw;
            word-wrap: break-word;
        }
        .display-1 {
            font-size: 4rem;
        }
        @media (max-width: 768px) {
            .display-1 {
                font-size: 2.5rem;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Handles the generation of QR code from user input
 */
function handleGenerate(): void {
    const message = menu.messageInput.value.trim();

    if (!message) {
        alert('Please enter a message');
        return;
    }

    if (message.length > config.maxMessageLength) {
        alert(`Message is too long. Maximum length is ${config.maxMessageLength} characters.`);
        return;
    }
  
    showResult(message);
}

/**
 * Handles downloading the QR code as PNG
 */
function handleDownloadPng(): void {
    downloadQRCode(menu.qrcode, 'png');
}

/**
 * Handles downloading the QR code as SVG
 */
function handleDownloadSvg(): void {
    downloadQRCode(menu.qrcode, 'svg');
}

/**
 * Initialize the application
 */
function init(): void {
    // Check if there's a message in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const encodedMessage = urlParams.get('m');
  
    if (encodedMessage) {
    // We have a message to display
        const message = decodeMessage(encodedMessage);
        showMessage(message);
    } else {
    // Show creator by default
        showCreator();
    }
  
    // Event listeners
    menu.generateBtn.addEventListener('click', handleGenerate);
    menu.copyBtn.addEventListener('click', copyToClipboard);
    menu.downloadPngBtn.addEventListener('click', handleDownloadPng);
    menu.downloadSvgBtn.addEventListener('click', handleDownloadSvg);
    menu.createNewBtn.addEventListener('click', showCreator);
    menu.previewBtn.addEventListener('click', () => {
        window.open(shareableLink);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
