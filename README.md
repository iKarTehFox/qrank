# QRank by iKarTehFox

> **A QR code generator web app which lets you generate a sharable link with any text you want, ideal for pranks or memes.**

Pronounced "crank" /kɹæŋk/, it's simply "QR" mixed with "prank".

**Website:** [View in your browser](https://qranked.pages.dev)

## Highlights
- **Easy Message Creation**: Enter any text message and instantly generate a QR code
- **Shareable Links**: Each QR code links to a unique URL that displays your message
- **Multiple Download Options**: Download your QR code as PNG or SVG

## How It Works
1. Enter your message in the text area
2. Click "Generate QR Code"
3. Share the generated QR code or copy the shareable link
4. When someone scans the QR code or visits the link, they'll see your message displayed prominently

## What's the purpose?
This tool lets you share messages creatively through QR codes. Use it to insult someone, tell a joke, or spread words of positivity.

## Technical Details
QRank uses client-side JavaScript to encode your message into a base64 string, which is then included as a URL parameter. When someone visits the link, the message is decoded and displayed. The QR codes are generated using [node-qrcode](https://github.com/soldair/node-qrcode).

To ensure your privacy and safety, all user input is sanitized to prevent possible XSS attacks. Additionally, no user input is sent to or stored on any server. It all happens locally! :)

## Acknowledgments (OSS)
- **Bootstrap** ([Link](https://getbootstrap.com/)): Licensed under MIT License
  - Copyright (c) 2011-2025 The Bootstrap Authors
- **Material Design Icons by Pictogrammers** ([GitHub](https://github.com/Templarian/MaterialDesign)): Icons licensed under Apache License 2.0
- **node-qrcode** ([GitHub](https://github.com/soldair/node-qrcode)): Licensed under MIT License
  - Copyright (c) 2012 Ryan Day
- **Webpack** ([Link](https://webpack.js.org/)): Licensed under MIT License
  - Copyright JS Foundation and other contributors  

Each license can be found in the code's respective files or website.

<hr>

Copyright (c) 2025 Diego Perez
