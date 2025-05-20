import { getElement } from './dom-selectors';

export const menu = {
    copyBtn: getElement<HTMLButtonElement>('copyBtn'),
    createNewBtn: getElement<HTMLButtonElement>('createNewBtn'),
    creatorSection: getElement<HTMLDivElement>('creator-section'),
    displayedMessage: getElement<HTMLDivElement>('displayedMessage'),
    downloadPngBtn: getElement<HTMLButtonElement>('downloadPngBtn'),
    downloadSvgBtn: getElement<HTMLButtonElement>('downloadSvgBtn'),
    generateBtn: getElement<HTMLButtonElement>('generateBtn'),
    messageDisplay: getElement<HTMLDivElement>('message-display'),
    messageInput: getElement<HTMLTextAreaElement>('messageInput'),
    previewBtn: getElement<HTMLButtonElement>('previewLinkBtn'),
    qrcode: getElement<HTMLDivElement>('qrcode'),
    resultSection: getElement<HTMLDivElement>('result-section'),
    shareLink: getElement<HTMLInputElement>('genField')
};