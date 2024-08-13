## Getting Started

First, run the development server:

```console
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Linters and Formatters

We are using linters and formatters to keep the code clean and consistent. To setup your envrioment, install the following plugins in your vscode:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

As additional, you need use the following configurations in your vscode settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Before commit your code, run the following command to check if your code is following the patterns:

```cmd
npm run lint
```

TO format your code, run the following command:

```bash
npm run format
```
