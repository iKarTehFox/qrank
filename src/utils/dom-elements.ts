import { getElement } from './dom-selectors';

export const menu = {
    creatorSection: getElement<HTMLDivElement>('creator-section'),
    resultSection: getElement<HTMLDivElement>('result-section'),
    messageDisplay: getElement<HTMLDivElement>('message-display'),
    messageInput: getElement<HTMLTextAreaElement>('messageInput'),
    generateBtn: getElement<HTMLButtonElement>('generateBtn'),
    qrcode: getElement<HTMLDivElement>('qrcode'),
    shareLink: getElement<HTMLInputElement>('shareLink'),
    copyBtn: getElement<HTMLButtonElement>('copyBtn'),
    createNewBtn: getElement<HTMLButtonElement>('createNewBtn'),
    displayedMessage: getElement<HTMLDivElement>('displayedMessage'),
    downloadPngBtn: getElement<HTMLButtonElement>('downloadPngBtn'),
    downloadSvgBtn: getElement<HTMLButtonElement>('downloadSvgBtn'),
};