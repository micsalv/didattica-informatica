# La Notte del Lupo Rand

Escape room a tema lupi mannari, a risposta multipla, per ripassare il linguaggio C sulla struttura sequenza.

**Autore:** Michele Salvemini
**Versione:** 1.0
**Apri l'attività:** https://micsalv.github.io/didattica-informatica/c/escape-room/la-notte-del-lupo-rand/

## Obiettivo

Esercitarsi a leggere codice C e a prevederne il risultato sugli argomenti della dispensa e delle esercitazioni svolte a lezione:

- struttura di un programma e uso di `printf` e `scanf`;
- operatori aritmetici, divisione intera e resto (`/` e `%`), cast;
- scambio del contenuto di due variabili;
- il tipo `char`, i codici ASCII e l'aritmetica sui caratteri;
- generazione di numeri e di caratteri casuali in un intervallo con `rand()`.

L'attività è complementare a «Il Laboratorio del Codice Perduto», che tratta operatori combinati, pre e post incremento.

## Destinatari

- **Classe:** studenti che hanno svolto le esercitazioni di C sulla struttura sequenza (SEQ010-SEQ270)
- **Tempo stimato:** massimo 60 minuti
- **Prerequisiti:** dispensa «Dal Problema al Codice – Linguaggio C – La Struttura Sequenza».

## Come si gioca

1. Si legge l'introduzione e si preme «Entra nel villaggio»: da quel momento parte il cronometro.
2. Si risolvono 20 enigmi, uno alla volta, dal più facile al più difficile (4 facili, 8 medi, 8 difficili). Ogni enigma è una tappa del percorso nel villaggio di Valpelosa e mostra l'illustrazione della tappa, il luogo, un frammento di codice (quando previsto) e tre risposte, che cambiano ordine a ogni partita.
3. Se la risposta è sbagliata si può riprovare, senza limiti di tentativi: la risposta sbagliata resta segnata in rosso e non si può scegliere di nuovo.
4. Se la risposta è corretta si legge la spiegazione e si ottiene una lettera.
5. Quando si risolve l'ultimo enigma il cronometro si ferma. Con tutte le lettere si compone la frase finale (**FERMA IL LUPO CON LA LUCE**) e compare il riepilogo del punteggio.

## Punteggio

| Voce | Punti |
|---|---|
| Risposta corretta | +5 |
| Errore | −1 |
| Bonus: partita finita entro 40 minuti **e** al massimo 4 errori in totale | +10 |

Il punteggio massimo è 110 punti (20 × 5 + 10 di bonus). I valori sono costanti all'inizio di `script.js` e il testo dell'introduzione si aggiorna di conseguenza. Il riepilogo finale è pensato per essere mostrato al docente.

## File

| File | Contenuto |
|---|---|
| `index.html` | Struttura della pagina |
| `style.css` | Stile grafico |
| `script.js` | Enigmi, verifica delle risposte e logica del gioco |
| `immagini/` | Le 20 illustrazioni delle tappe (`room-01-cancello.jpg` ... `room-20-lupo.jpg`) |

## Illustrazioni

Le 20 illustrazioni sono state generate con l'intelligenza artificiale **Gemini** (Google) a partire da indicazioni scritte dall'autore, che le ha selezionate. Non raffigurano persone reali.

- Formato: JPG, 1280 × 698 pixel, una per ogni tappa. I nomi seguono lo schema `room-NN-nome.jpg`.
- Il file `LICENSE` del repository si applica al codice e ai testi. Per le illustrazioni valgono le condizioni d'uso del servizio con cui sono state generate.

## Licenza

© 2026 Michele Salvemini, licenza [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/): uso in classe e condivisione della versione originale con citazione dell'autore; vietati l'uso commerciale e la pubblicazione di versioni modificate. Vedi il file `LICENSE` nella radice del repository.
