import DOMPurify from 'dompurify';
import { Base64 } from 'js-base64';

/**
 * Sanitizes a string to prevent XSS attacks by escaping HTML special characters
 * @param text The text to sanitize
 * @returns Sanitized text
 */
export function sanitizeText(text: string): string {
    // Use DOMPurify to sanitize the text, allowing only specific formatting tags
    return DOMPurify.sanitize(text, {
        ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em'],
        ALLOWED_ATTR: []
    });
}

/**
 * Encodes a message to be used in a URL
 * @param message The message to encode
 * @returns Encoded string
 */
export function encodeMessage(message: string): string {
    // Sanitize the message first
    const sanitizedMessage = sanitizeText(message);
    // Convert to URL-safe base64
    const base64 = Base64.encode(sanitizedMessage, true);

    return base64;
}

/**
 * Decodes a message from URL format
 * @param encoded The encoded message
 * @returns Decoded message
 */
export function decodeMessage(encoded: string): string {
    try {
        // First URL decode
        const base64 = decodeURIComponent(encoded);
        // Then convert from Base64
        const decodedMessage = Base64.decode(base64);
        // Extra sanitization for safety
        return sanitizeText(decodedMessage);
    } catch (error) {
        console.error('Failed to decode message:', error);
        return 'Error: Could not decode message';
    }
}

/**
 * Creates a shareable link with the encoded message
 * @param message Message to encode in the link
 * @param baseUrl Base URL for the application
 * @returns Full shareable URL
 */
export function createShareableLink(message: string, baseUrl: string): string {
    const encoded = encodeMessage(message);
    return `${baseUrl}?m=${encoded}`;
}
