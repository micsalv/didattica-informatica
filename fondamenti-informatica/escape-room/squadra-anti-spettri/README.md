# La Squadra Anti-Spettri

Escape room a tema Halloween, a risposta multipla, per ripassare architettura degli elaboratori e sistema operativo.

**Autore:** Michele Salvemini **Versione:** 1.0 **Apri l'attività:** [https://micsalv.github.io/didattica-informatica/fondamenti-informatica/escape-room/squadra-anti-spettri/](https://micsalv.github.io/didattica-informatica/fondamenti-informatica/escape-room/squadra-anti-spettri/) 

## Obiettivo

Ripassare i contenuti delle dispense Lez07 «Architettura degli Elaboratori: dal Dato all'Informazione» e Lez08 «Il Sistema Operativo: dai Programma ai Processi»:

- CPU: unità di controllo, ALU, registri, clock e frequenza;

- memorie (RAM, ROM, HDD e SSD), scheda madre, bus e porte;

- ruolo del sistema operativo, kernel, permessi e driver;

- programmi, processi e thread, quanto di tempo e multitasking;

- punto di ripristino e backup, bootstrap e firmware.

## Destinatari

- **Classe:** Prime, dopo lo studio delle dispense Lez07 e Lez08

- **Tempo stimato:** massimo 45 minuti

- **Prerequisiti:** dispense Lez07 e Lez08

## Come si gioca

1. Si legge l'introduzione e si preme «Entra nella Sede»: da quel momento parte il cronometro.

2. Si risolvono 20 enigmi, uno alla volta, dal più facile al più difficile (4 facili, 8 medi, 8 difficili). Ogni enigma è una tappa del percorso nella Sede e a Binaropoli e mostra l'illustrazione, il luogo, la scena e tre risposte, che cambiano ordine a ogni partita.

3. Se la risposta è sbagliata si può riprovare, senza limiti di tentativi: la risposta sbagliata resta segnata in rosso e non si può scegliere di nuovo.

4. Se la risposta è corretta si legge la spiegazione e si ottiene una lettera.

5. Quando si risolve l'ultimo enigma il cronometro si ferma. Con tutte le lettere si compone la frase finale (**CATTURA IL POLTERGEIST**) e compare il riepilogo del punteggio.

## Punteggio

| Voce | Punti |
| - | - |
| Risposta corretta | +5 |
| Errore | −1 |
| Bonus: partita finita entro 30 minuti **e** al massimo 4 errori in totale | +10 |


Il punteggio massimo è 110 punti (20 × 5 + 10 di bonus). I valori sono costanti all'inizio di `script.js` e il testo dell'introduzione si aggiorna di conseguenza. Il riepilogo finale è pensato per essere mostrato al docente.

## File

| File | Contenuto |
| - | - |
| `index.html` | Struttura della pagina |
| `style.css` | Stile grafico |
| `script.js` | Enigmi, verifica delle risposte e logica del gioco |
| `immagini/` | Le 20 illustrazioni delle tappe (`room-01-ingresso.jpg` ... `room-20-poltergeist.jpg`) |

## Illustrazioni

Non raffigurano persone reali né personaggi, divise, veicoli o loghi di film o serie esistenti.

## Licenza

© 2026 Michele Salvemini, licenza [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/): uso in classe e condivisione della versione originale con citazione dell'autore; vietati l'uso commerciale e la pubblicazione di versioni modificate. Vedi il file `LICENSE` nella radice del repository.

