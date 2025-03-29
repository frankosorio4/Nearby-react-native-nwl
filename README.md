# Nearby

## About Nearby

_Nearby_ is an app that helps users to find fast food stores near them. Also allows us to apply discount coupons for fast food consumed in the local area using the app and the QR code provided in the stores.


## Tecnologies

- _app:_ React native.
- _External API:_ Node.Js.
- Data Bank: Prisma.

## How to execute

1. Install the Expo Go app on your cellphone or use an emulator on your computer.
2. Clone the repository.
3. Open the repository using VSCODE.
4. Run the terminal and install the dependencies using the command ```npm install```.
5. Run the server with the command ```npm start```. After that, the basic configuration will be printed in the terminal.
6. Match the URL in the folder services/api.ts with the URL provided in the terminal when the server is run.
7. Load the app using Expo Go and the QR code provided in the terminal.

## Páginas
- Welcome.
- Store locations.
- Market details and coupons.

## SRC structure
```
src
├── app
│  ├── market
│  │  └── [id].tsx
│  ├── home.tsx
│  ├── index.tsx
│  └── _layout.tsx
├── assets
│  ├── location.png
│  ├── logo.png
│  └── pin.png
├── components
│  ├── button
│  │  ├── index.tsx
│  │  └── styles.ts
│  ├── categories
│  │  ├── index.tsx
│  │  └── styles.ts
│  ├── category
│  │  ├── index.tsx
│  │  └── styles.ts
│  ├── loading
│  │  ├── index.tsx
│  │  └── styles.ts
│  ├── market
│  │  ├── coupon
│  │  │  ├── index.tsx
│  │  │  └── styles.ts
│  │  ├── cover
│  │  │  ├── index.tsx
│  │  │  └── styles.ts
│  │  ├── details
│  │  │  ├── index.tsx
│  │  │  └── styles.ts
│  │  └── info
│  │     ├── index.tsx
│  │     └── styles.ts
│  ├── place
│  │  ├── index.tsx
│  │  └── styles.ts
│  ├── places
│  │  ├── index.tsx
│  │  └── styles.ts
│  ├── step
│  │  ├── index.tsx
│  │  └── styles.ts
│  ├── steps
│  │  ├── index.tsx
│  │  └── styles.ts
│  └── welcome
│     ├── index.tsx
│     └── styles.ts
├── services
│  └── api.ts
├── styles
│  ├── colors.ts
│  ├── font-family.ts
│  └── theme.ts
└── utils
   └── categories-icons.ts
```
