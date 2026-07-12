# Palabras Encadenadas

Juego de palabras encadenadas hecho en React para el TFI de UI.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

Abrí la URL que muestra Vite en la terminal, normalmente `http://localhost:5173`.

## Validaciones disponibles

```bash
npm run lint
npm run build
```

## Cómo jugar

1. Ingresá una primera palabra válida.
2. La siguiente palabra debe comenzar con la última letra de la anterior.
3. No podés repetir palabras.
4. Cada palabra válida suma puntos según su cantidad de letras.
5. Si el tiempo llega a cero, la partida termina.

## API utilizada

La validación de diccionario se realiza con la API de la cátedra:

`https://word-api-hmlg.vercel.app/api/validate?word=...`
