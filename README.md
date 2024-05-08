# PDF text reader

demo: https://main--dreamy-sunflower-469dc1.netlify.app/

this app was built on the [react](https://react.dev/)-ts [vite](https://vitejs.dev/guide/) template

- [Overview](#Overview)
- [Technology used](#technology-used)
- [Running locally](#running-locally)

## Overview

a client side web application for extracting text from a pdf. this application depends on [PDFJS](https://mozilla.github.io/pdf.js/) for converting pdfs first to image and then [Tesseract.js](https://tesseract.projectnaptha.com/) for extracting text from the images. It outputs the result in an easily copyable block on the web page.

[for a demonstration see here](https://main--dreamy-sunflower-469dc1.netlify.app/)

## Technology used

- [TypeScript](https://www.typescriptlang.org/)
- [vite](https://vitejs.dev/guide/)
- [React](https://reactjs.org/)
- [Yarn](https://yarnpkg.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcdn](https://ui.shadcn.com/)
- [PDFJS](https://mozilla.github.io/pdf.js/)
- [Tesseract.js](https://tesseract.projectnaptha.com/)

## running locally

- clone the repo

```sh
git clone git@github.com:318Thorne/pdf-text.git
cd pdf-text
```

- install dependencies

```sh
yarn
```

- run dev

```sh
yarn dev
```

## testing

this project uses vitest and react testing library for unit testing. to test

```sh
yarn test
```
