# Il Laboratorio del Codice Perduto

Escape room di Halloween a risposta multipla per esercitarsi con il linguaggio C/C++.

**Autore:** Michele Salvemini
**Versione:** 2.2
**Apri l'attività:** https://micsalv.github.io/didattica-informatica/c/escape-room/il-laboratorio-del-codice-perduto/

## Obiettivo

Esercitarsi a tracciare il valore delle variabili con:

- operatori di assegnamento composti (`+=`, `-=`, `*=`, `/=`, `%=`);
- pre e post incremento e decremento (`++x`, `x++`, `--x`, `x--`);
- assegnazione all'interno di un'espressione (doppia assegnazione), ad esempio `(x = z + 6) + 3`.

## Destinatari

- **Classe:** Seconda o Terza, al primo approccio ai linguaggi C e C++
- **Tempo stimato:** massimo 45 minuti
- **Prerequisiti:** variabili, operatori aritmetici e operatore di assegnamento.

## Come si gioca

1. Si legge l'introduzione e si preme «Inizia l'avventura»: da quel momento parte il cronometro.
2. Si risolvono 15 enigmi, uno alla volta. Ogni enigma mostra un frammento di codice e tre risposte, che cambiano ordine a ogni partita.
3. Se la risposta è sbagliata si può riprovare, senza limiti di tentativi: la risposta sbagliata resta segnata in rosso e non si può scegliere di nuovo.
4. Se la risposta è corretta si legge la spiegazione e si ottiene una lettera.
5. Quando si risolve l'ultimo enigma il cronometro si ferma. Con tutte le lettere si compone la parola chiave finale e compare il riepilogo del punteggio.

## Punteggio

| Voce | Punti |
|---|---|
| Risposta corretta | +5 |
| Errore | −1 |
| Bonus: partita finita entro 30 minuti **e** al massimo 3 errori in totale | +10 |

Il punteggio massimo è 85 punti (15 × 5 + 10 di bonus). I valori sono costanti all'inizio di `script.js` e il testo dell'introduzione si aggiorna di conseguenza. Il riepilogo finale è pensato per essere mostrato al docente.

## File

| File | Contenuto |
|---|---|
| `index.html` | Struttura della pagina |
| `style.css` | Stile grafico |
| `script.js` | Enigmi, verifica delle risposte e logica del gioco |

## Note tecniche

- Le risposte corrette non sono scritte in chiaro nel codice: ogni enigma contiene un numero (impronta) calcolato dalla risposta giusta, che il gioco confronta con quella scelta.
- Questo rende difficile leggere le risposte dal sorgente, ma non impossibile: è un gioco di ripasso, non uno strumento di verifica.
- Cronometro e punteggio sono calcolati nel browser: possono essere alterati da chi lo desidera, quindi vanno intesi come un incentivo al ripasso e non come una prova di valutazione.
- Per l'autore: per aggiungere o modificare un enigma occorre ricalcolare l'impronta con la funzione `calcolaImpronta` presente in `script.js`, usando come testo `identificativo:risposta corretta`.

## Cronologia

| Versione | Data | Modifiche |
|---|---|---|
| 2.2 | 11/10/2026 | Cronometro, punteggio con bonus, avviso sull'uso corretto dell'attività |
| 2.1 | 10/10/2026 | Pubblicazione su GitHub Pages: separazione in tre file |
| 2.0 | 10/10/2026 | Impronte al posto di risposte codificate, risposte mescolate, correzione enigmi 14 e 15 |

## Licenza

© 2026 Michele Salvemini, licenza [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/): uso in classe e condivisione della versione originale con citazione dell'autore; vietati l'uso commerciale e la pubblicazione di versioni modificate. Vedi il file `LICENSE` nella radice del repository.
