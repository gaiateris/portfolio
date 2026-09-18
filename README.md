# Portfolio — Gaia Terisacco

Sito statico (HTML, CSS, JavaScript vanilla, Bootstrap 5.3 in locale) pronto per GitHub Pages.
Nessuna dipendenza esterna: niente CDN e niente Google Fonts.

Online: https://gaiateris.github.io/portfolio/

## Pubblicare su GitHub Pages

1. Nel repository `portfolio`, elimina i vecchi file (il vecchio `index.html`, le immagini `web-*.png`, `yo-*.png`, i loghi `.svg` e la cartella `logo-proposta-imgs`): ora le immagini ottimizzate sono in `assets/img/`.
2. Carica tutto il contenuto di questo zip nella radice del repository, compreso il file nascosto `.nojekyll`.
3. In **Settings → Pages** scegli *Deploy from a branch*, branch `main`, cartella `/ (root)`.

Se il repository ha un nome diverso da `portfolio`, aggiorna l'indirizzo nei tag `canonical`, `og:url` e `og:image` in testa a `index.html`.

## Struttura

```
index.html              la pagina
.nojekyll               dice a GitHub Pages di pubblicare i file così come sono
favicon.svg, apple-touch-icon.png
assets/
├── css/style.css       stile (chiaro e scuro automatico)
├── js/main.js          menu mobile, lightbox, animazioni
├── img/                immagini WebP ottimizzate
└── vendor/bootstrap/   Bootstrap 5.3
```

## Fuori dai motori di ricerca

Il sito è pubblico ma non indicizzato: chi ha il link lo apre, ma non compare nei risultati di ricerca.
Il blocco è il tag in testa a `index.html`:

```html
<meta name="robots" content="noindex, nofollow">
```

C'è anche un `robots.txt`, ma su un repository di progetto viene servito su `/portfolio/robots.txt`:
i motori di ricerca leggono solo quello nella radice del dominio, quindi da solo non basta. Vale invece
se un giorno il sito verrà pubblicato su un dominio tuo.

Per renderlo di nuovo visibile alle ricerche, elimina quella riga da `index.html`.

Nota: il repository GitHub resta pubblico e indicizzabile (è la condizione per usare GitHub Pages
con un account gratuito). Il blocco riguarda il sito, non la pagina del repository.

## Modificare testi e immagini

I testi sono direttamente in `index.html`.
Per aggiungere un'immagine: esportala in WebP (larghezza massima 1000–1200 px), mettila in `assets/img/…` e scrivi sempre un testo `alt` che la descriva.
