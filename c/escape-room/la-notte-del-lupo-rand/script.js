/*
    Autore: Michele Salvemini
    Classe: studenti che hanno svolto le esercitazioni di C sulla struttura sequenza (SEQ010-SEQ270)
    Argomento: Linguaggio C - struttura sequenza, operatori, char/ASCII e numeri casuali
    Obiettivo: Gestire l'escape room: mostrare un enigma alla volta con risposte mescolate, verificare la risposta, assegnare una lettera, misurare il tempo, calcolare il punteggio e comporre la frase finale
    Versione: 1.0
    Data: 28/10/2026
    Licenza: CC BY-NC-ND 4.0 - https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// ============================================================
// COSTANTI
// ============================================================

// Elenco degli enigmi, dal più facile al più difficile (4 facili, 8 medi, 8 difficili).
// Ogni enigma contiene:
//   id                                       -> codice univoco usato per calcolare l'impronta
//   emoji, titolo, luogo, scena, domanda     -> testi mostrati nella card (luogo e scena raccontano la tappa del percorso)
//   immagine, descrizioneImmagine            -> file nella cartella immagini/ e relativo testo alternativo (alt)
//   codice                                   -> codice HTML da analizzare (può essere vuoto)
//   opzioni                                  -> le tre risposte possibili (l'ordine qui NON è quello mostrato)
//   impronta                                 -> numero calcolato dalla risposta corretta (non indica quale sia)
//   lettera                                  -> lettera assegnata quando l'enigma viene risolto
//   spiegazione                              -> commento mostrato dopo la risposta corretta
// Nei testi i frammenti di codice vanno scritti tra apici inversi (`<body>`): vengono mostrati
// come codice e i caratteri < > & non vengono interpretati come HTML.
const cEnigmi = [
    {
        id: "L01",
        emoji: "🏘️",
        titolo: "Il Cancello di Valpelosa",
        luogo: "Cancello del villaggio",
        scena: "È la notte di luna piena. Il cancello di Valpelosa si chiude alle tue spalle e una voce roca, quella del Lupo Rand, ti sfida: chi conosce le basi del C può proseguire.",
        immagine: "room-01-cancello.jpg",
        descrizioneImmagine: "Cancello di legno e ferro all'ingresso di un villaggio di montagna, di notte sotto una luna piena enorme; tra la nebbia due occhi gialli osservano dal bosco.",
        codice: "",
        domanda: "Quale riga permette di usare `printf` e `scanf`?",
        opzioni: ["`#include <stdio.h>`", "`#include <time.h>`", "`#include <math.h>`"],
        impronta: 778831558,
        lettera: "F",
        spiegazione: "`#include <stdio.h>` rende disponibili `printf` e `scanf`, le funzioni di input e output."
    },
    {
        id: "L02",
        emoji: "🍺",
        titolo: "L'Oste e i Lupi",
        luogo: "Locanda",
        scena: "Nella locanda l'oste, pallido, conta sul registro i lupi avvistati nel bosco: il conto va fatto nell'ordine giusto.",
        immagine: "room-02-locanda.jpg",
        descrizioneImmagine: "Interno di una locanda rustica con il camino acceso: un oste con il grembiule scrive su un grande registro, sul muro è appesa una pelle di lupo.",
        codice: "int lupi = 7, cuccioli = 3;\nprintf(\"%d\", lupi + cuccioli * 2);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["13", "20", "10"],
        impronta: 3165132017,
        lettera: "E",
        spiegazione: "La moltiplicazione ha la precedenza sulla somma: 3 * 2 = 6, poi 7 + 6 = 13."
    },
    {
        id: "L03",
        emoji: "🚪",
        titolo: "La Porta Sbarrata",
        luogo: "Casa del guaritore",
        scena: "Dietro la locanda una porta sbarrata si apre solo digitando il numero delle lune trascorse: serve l'istruzione giusta per leggerlo.",
        immagine: "room-03-porta.jpg",
        descrizioneImmagine: "Porta di legno rinforzata con catena e lucchetto in un vicolo di pietra illuminato da una lanterna, nebbia leggera.",
        codice: "",
        domanda: "Quale istruzione legge un intero nella variabile `lune`?",
        opzioni: ["`scanf(\"%d\", &lune);`", "`scanf(\"%d\", lune);`", "`scanf(\"%f\", &lune);`"],
        impronta: 3332396984,
        lettera: "R",
        spiegazione: "Con `scanf` servono lo specificatore `%d` per gli interi e l'operatore `&` davanti alla variabile."
    },
    {
        id: "L04",
        emoji: "🪧",
        titolo: "L'Iscrizione sul Muro",
        luogo: "Piazza del villaggio",
        scena: "In piazza un'iscrizione graffiata da artigli nasconde una lettera: per leggerla devi sapere come il computer la memorizza.",
        immagine: "room-04-iscrizione.jpg",
        descrizioneImmagine: "Muro di pietra di una piazza con una grande lettera L incisa da artigli profondi, illuminata dalla luna; sullo sfondo una fontana.",
        codice: "char iniziale = 'L';\nprintf(\"%d\", iniziale);",
        domanda: "Che cosa stampa il programma? (A vale 65)",
        opzioni: ["76", "L", "12"],
        impronta: 3165204092,
        lettera: "M",
        spiegazione: "Un `char` è un numero: con `%d` si stampa il codice ASCII, che per `L` è 76 (`A` vale 65)."
    },
    {
        id: "L05",
        emoji: "🏹",
        titolo: "La Divisione delle Trappole",
        luogo: "Bottega del cacciatore",
        scena: "Il cacciatore divide 29 trappole tra 6 compagni: devi dire quante ne spettano a ciascuno e quante avanzano.",
        immagine: "room-05-trappole.jpg",
        descrizioneImmagine: "Bottega del cacciatore con trappole di ferro, balestre e pelli appese; un cacciatore barbuto dispone le trappole su un tavolo in sei mucchietti.",
        codice: "int x = 29, y = 6;\nprintf(\"%d %d\", x / y, x % y);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["4 5", "5 4", "4 1"],
        impronta: 1373701913,
        lettera: "A",
        spiegazione: "Tra interi `/` dà il quoziente (4) e `%` il resto (5): 29 = 6 · 4 + 5."
    },
    {
        id: "L06",
        emoji: "⚖️",
        titolo: "La Bilancia dell'Argentiere",
        luogo: "Bottega dell'argentiere",
        scena: "L'argentiere pesa un lingotto d'argento: la bilancia mostra un valore che non è quello che ti aspetti.",
        immagine: "room-06-argentiere.jpg",
        descrizioneImmagine: "Bottega di un argentiere con una bilancia a due piatti, candelieri e proiettili d'argento su un panno di velluto, luce calda di candela.",
        codice: "float peso = 7 / 2;\nprintf(\"%.1f\", peso);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["3.0", "3.5", "3"],
        impronta: 1374887202,
        lettera: "I",
        spiegazione: "`7 / 2` è una divisione tra interi e dà 3: nella variabile `float` finisce come 3.0."
    },
    {
        id: "L07",
        emoji: "🧿",
        titolo: "Gli Amuleti da Scambiare",
        luogo: "Casa del guaritore",
        scena: "Il guaritore ti affida due amuleti: per proteggere il villaggio vanno scambiati di posto, usando un terzo contenitore.",
        immagine: "room-07-amuleti.jpg",
        descrizioneImmagine: "Stanza di un guaritore con erbe appese: su un tavolino due amuleti, uno d'argento e uno di legno, con una piccola ciotola in mezzo.",
        codice: "int a = 8, b = 3, t;\nt = a;\na = b;\nb = t;\nprintf(\"%d %d\", a, b);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["3 8", "8 3", "3 3"],
        impronta: 1376072669,
        lettera: "L",
        spiegazione: "Per scambiare due variabili serve una variabile d'appoggio (`t`): senza, un valore andrebbe perso."
    },
    {
        id: "L08",
        emoji: "🔔",
        titolo: "Il Biglietto in Codice",
        luogo: "Campanile",
        scena: "Sul campanile trovi un biglietto cifrato: ogni lettera è avanzata di tre posizioni nell'alfabeto.",
        immagine: "room-08-campanile.jpg",
        descrizioneImmagine: "Interno di un campanile di pietra con una grande campana e una scala a chiocciola; su una trave un biglietto scritto a mano e una penna d'oca.",
        codice: "char c = 'b';\nc = c + 3;\nprintf(\"%c\", c);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["e", "d", "101"],
        impronta: 226070200,
        lettera: "L",
        spiegazione: "Un `char` si somma a un intero: `'b'` + 3 vale 101, cioè il carattere `'e'`."
    },
    {
        id: "L09",
        emoji: "🌉",
        titolo: "Il Ponte di Pietra",
        luogo: "Ponte sul torrente",
        scena: "Il ponte sul torrente regge solo se calcoli la giusta distanza tra due lettere incise sui pilastri.",
        immagine: "room-09-ponte.jpg",
        descrizioneImmagine: "Antico ponte di pietra su un torrente nella nebbia; sui due pilastri sono incise le lettere N e U, sotto la luna piena.",
        codice: "printf(\"%d\", 'u' - 'n');",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["7", "8", "117"],
        impronta: 226071243,
        lettera: "U",
        spiegazione: "La differenza tra due `char` è la differenza dei loro codici: `'u'` - `'n'` = 7."
    },
    {
        id: "L10",
        emoji: "🌕",
        titolo: "La Luna e il Numero",
        luogo: "Bosco",
        scena: "Nel bosco la luna sceglie ogni notte un numero a caso tra 5 e 12: scrivi l'espressione che lo genera.",
        immagine: "room-10-bosco.jpg",
        descrizioneImmagine: "Sentiero in un bosco di abeti nella nebbia, la luna piena tra i rami e piccoli numeri luminosi che fluttuano tra gli alberi.",
        codice: "",
        domanda: "Quale espressione genera un intero casuale tra 5 e 12, estremi inclusi?",
        opzioni: ["`5 + rand() % 8`", "`5 + rand() % 7`", "`5 + rand() % 12`"],
        impronta: 3983549951,
        lettera: "P",
        spiegazione: "`minimo + rand() % (massimo - minimo + 1)` con minimo 5 e massimo 12 dà `5 + rand() % 8`."
    },
    {
        id: "L11",
        emoji: "🐦‍⬛",
        titolo: "Il Corvo e la Lettera",
        luogo: "Albero secco",
        scena: "Un corvo lascia cadere una lettera maiuscola a caso, tra la D e la M: devi scrivere l'espressione giusta.",
        immagine: "room-11-corvo.jpg",
        descrizioneImmagine: "Albero secco nel bosco con un corvo nero che lascia cadere una lettera maiuscola luminosa; sullo sfondo la luna piena.",
        codice: "",
        domanda: "Quale espressione genera una lettera maiuscola casuale tra `'D'` e `'M'`, estremi inclusi?",
        opzioni: ["`'D' + rand() % ('M' - 'D' + 1)`", "`'D' + rand() % ('M' - 'D')`", "`'D' + rand() % 'M'`"],
        impronta: 2358127244,
        lettera: "O",
        spiegazione: "Le lettere sono numeri consecutivi: da `'D'` a `'M'` ci sono `'M' - 'D' + 1` = 10 valori."
    },
    {
        id: "L12",
        emoji: "🏚️",
        titolo: "Le Notti della Capanna",
        luogo: "Capanna del boscaiolo",
        scena: "Nella capanna del boscaiolo le notti passano e i giorni vanno ricalcolati, un'istruzione dopo l'altra.",
        immagine: "room-12-capanna.jpg",
        descrizioneImmagine: "Capanna di legno nel bosco con una finestra illuminata; su un tronco accanto alla porta un calendario a tacche.",
        codice: "int giorni = 4, notti;\nnotti = giorni * 2 - 1;\ngiorni = notti + 1;\nprintf(\"%d %d\", giorni, notti);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["8 7", "4 7", "7 8"],
        impronta: 1409283901,
        lettera: "C",
        spiegazione: "Le istruzioni si eseguono in ordine: notti = 4 · 2 − 1 = 7, poi giorni = 7 + 1 = 8."
    },
    {
        id: "L13",
        emoji: "🍎",
        titolo: "Le Provviste nella Radura",
        luogo: "Radura",
        scena: "In una radura dividi 17 mele fra 4 lupi ammaestrati e vuoi la parte esatta, con i decimali.",
        immagine: "room-13-radura.jpg",
        descrizioneImmagine: "Radura illuminata dalla luna con una cesta di mele rosse e quattro lupi grigi seduti attorno, in attesa.",
        codice: "int mele = 17, lupi = 4;\nfloat quota = (float)mele / lupi;\nprintf(\"%.2f\", quota);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["4.25", "4.00", "4.75"],
        impronta: 3595702552,
        lettera: "O",
        spiegazione: "Il cast `(float)` rende reale `mele` prima della divisione: 17 / 4 = 4.25."
    },
    {
        id: "L14",
        emoji: "🥈",
        titolo: "Il Peso dell'Argento",
        luogo: "Fucina",
        scena: "Alla fucina forgi una pallottola d'argento: il peso richiede una divisione intera e un resto.",
        immagine: "room-14-fucina.jpg",
        descrizioneImmagine: "Fucina con un fabbro che versa argento fuso in uno stampo, scintille e luce arancione; sul tavolo una pallottola d'argento.",
        codice: "int p = 7, q = 2;\nprintf(\"%.1f\", (float)(p / q) + p % q);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["4.0", "4.5", "3.5"],
        impronta: 1411651842,
        lettera: "N",
        spiegazione: "`p / q` dà 3, il cast lo rende 3.0 e `p % q` aggiunge 1: il risultato è 4.0."
    },
    {
        id: "L15",
        emoji: "⚰️",
        titolo: "La Lettera del Cimitero",
        luogo: "Cimitero",
        scena: "Nel cimitero una lapide riporta una lettera cifrata: va spostata in avanti restando dentro l'alfabeto.",
        immagine: "room-15-cimitero.jpg",
        descrizioneImmagine: "Cimitero nebbioso con lapidi antiche e una croce di pietra con una lettera incisa; in lontananza la sagoma di un lupo, luna piena.",
        codice: "char c = 'W';\nint k = c - 'A';\nc = 'A' + (k + 9) % 26;\nprintf(\"%c\", c);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["F", "E", "G"],
        impronta: 226102839,
        lettera: "L",
        spiegazione: "Si sottrae `'A'` per avere la posizione, si aggiunge lo spostamento e `% 26` riparte dall'inizio dell'alfabeto."
    },
    {
        id: "L16",
        emoji: "🪣",
        titolo: "Il Pozzo dei Numeri",
        luogo: "Pozzo",
        scena: "Il pozzo del villaggio restituisce numeri tra −6 e 6: scrivi l'espressione che li genera tutti.",
        immagine: "room-16-pozzo.jpg",
        descrizioneImmagine: "Antico pozzo di pietra in un campo, con un secchio che risale pieno di numeri luminosi; luna piena e nebbia.",
        codice: "",
        domanda: "Quale espressione genera un intero casuale tra -6 e 6, estremi inclusi?",
        opzioni: ["`-6 + rand() % 13`", "`-6 + rand() % 12`", "`rand() % 13 - 7`"],
        impronta: 288610943,
        lettera: "A",
        spiegazione: "Da −6 a 6 ci sono 13 valori: `-6 + rand() % 13`."
    },
    {
        id: "L17",
        emoji: "🔒",
        titolo: "Il Lucchetto delle Cifre",
        luogo: "Cancello della cripta",
        scena: "Il cancello della cripta si apre solo con una cifra scelta a caso, scritta come carattere.",
        immagine: "room-17-lucchetto.jpg",
        descrizioneImmagine: "Cancello di ferro di una cripta con un lucchetto a combinazione e dieci cifre incise, torce che illuminano la pietra.",
        codice: "",
        domanda: "Quale espressione genera un carattere cifra casuale tra `'0'` e `'9'`, estremi inclusi?",
        opzioni: ["`'0' + rand() % 10`", "`'0' + rand() % 9`", "`'1' + rand() % 10`"],
        impronta: 2701758392,
        lettera: "L",
        spiegazione: "I caratteri `'0'`...`'9'` sono consecutivi: `'0' + rand() % 10` genera una cifra casuale."
    },
    {
        id: "L18",
        emoji: "🗺️",
        titolo: "La Mappa del Covo",
        luogo: "Cripta",
        scena: "Nella cripta una mappa del covo usa un intervallo variabile: devi dire quali valori può assumere.",
        immagine: "room-18-mappa.jpg",
        descrizioneImmagine: "Cripta di pietra con un tavolo su cui è aperta una mappa del covo dei lupi, illuminata da candele, ombre sulle pareti.",
        codice: "",
        domanda: "Con `minimo` = 12 e `massimo` = 20, quali valori può generare `minimo + rand() % (massimo - minimo + 1)`?",
        opzioni: ["Da 12 a 20, estremi inclusi", "Da 12 a 19", "Da 12 a 21"],
        impronta: 797281563,
        lettera: "U",
        spiegazione: "Il divisore è 20 − 12 + 1 = 9: i valori vanno da 12 a 20, estremi inclusi."
    },
    {
        id: "L19",
        emoji: "🐾",
        titolo: "Il Sigillo del Lupo",
        luogo: "Ingresso del covo",
        scena: "Entri nel covo: sul sigillo del lupo compaiono una lettera e un numero, risultato di un piccolo calcolo.",
        immagine: "room-19-sigillo.jpg",
        descrizioneImmagine: "Caverna con un sigillo circolare inciso sulla parete, un'impronta di lupo al centro e scintille azzurre; luce lunare dall'ingresso.",
        codice: "char c = 'a' + 5;\nint n = c;\nprintf(\"%c%d\", c, n - 'a');",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["f5", "f102", "a5"],
        impronta: 3166571248,
        lettera: "C",
        spiegazione: "`'a' + 5` è `'f'`; il suo codice meno quello di `'a'` fa 5: si stampa `f5`."
    },
    {
        id: "L20",
        emoji: "🐺",
        titolo: "L'Ultimo Cancello",
        luogo: "Covo del Lupo Rand",
        scena: "Davanti al Lupo Rand resta l'ultimo calcolo: se lo risolvi, la luce d'argento lo ferma per sempre.",
        immagine: "room-20-lupo.jpg",
        descrizioneImmagine: "Il Lupo Rand, un grande lupo mannaro grigio dagli occhi gialli, in una caverna: un raggio di luna argentea lo illumina e lo blocca.",
        codice: "int a = 15, b = 4, c;\nc = a % b * 10 + a / b;\na = c / 5;\nprintf(\"%d %d\", a, c);",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["6 33", "7 33", "6 30"],
        impronta: 474853705,
        lettera: "E",
        spiegazione: "`a % b * 10 + a / b` = 3 · 10 + 3 = 33, poi `a = 33 / 5` = 6."
    }
];

const cTotaleEnigmi = cEnigmi.length;
const cNumeroOpzioni = 3;
const cEtichetteOpzioni = ["A", "B", "C"];

// Cartella che contiene le illustrazioni degli enigmi (un'immagine per ogni tappa del villaggio)
const cCartellaImmagini = "immagini/";

// Le lettere raccolte compongono la frase "FERMA IL LUPO CON LA LUCE": la somma deve essere uguale a cTotaleEnigmi
const cLunghezzeParole = [5, 2, 4, 3, 2, 4];

// Tempo (in millisecondi) per cui resta visibile il messaggio di errore prima di poter riprovare
const cRitardoRiprovaMs = 1500;

// Regole del punteggio
const cPuntiRispostaCorretta = 5;   // punti guadagnati per ogni enigma risolto
const cPenalitaErrore = 1;          // punti tolti per ogni risposta sbagliata
const cPuntiBonus = 10;             // punti aggiunti se si rispettano entrambe le condizioni del bonus
const cMinutiBonus = 40;            // condizione 1: finire entro questo numero di minuti
const cErroriMassimiBonus = 4;      // condizione 2: commettere al massimo questo numero di errori in totale

// Conversioni di tempo e frequenza di aggiornamento del cronometro
const cMillisecondiPerSecondo = 1000;
const cMillisecondiPerMinuto = 60000;
const cTempoBonusMs = cMinutiBonus * cMillisecondiPerMinuto;
const cIntervalloCronometroMs = 250;

// Parametri della funzione che calcola l'impronta di una risposta (vedi calcolaImpronta)
const cValoreIniziale = 5381;
const cMoltiplicatore = 33;
const cModuloImpronta = 4294967296;

// Parametri delle decorazioni di sfondo
const cNumeroLupi = 7;
const cNumeroGocce = 16;

// ============================================================
// VARIABILI DI STATO
// ============================================================

// Eccezione motivata alla regola "evitare variabili globali": le funzioni che
// rispondono ai click o agli intervalli di tempo non ricevono parametri dal browser,
// quindi lo stato del gioco deve essere condiviso a livello di script.
let indiceCorrente = 0;          // posizione dell'enigma mostrato (0 = primo)
let enigmiRisolti = 0;           // numero di risposte corrette date
let erroriTotali = 0;            // numero di risposte sbagliate in tutta la partita
let inAttesaProssimo = false;    // true dopo una risposta corretta, finché non si preme il pulsante di avanzamento
let partitaIniziata = false;     // true dopo aver premuto "Entra nel villaggio"
let partitaTerminata = false;    // true quando viene risolto l'ultimo enigma
let istanteInizio = 0;           // orologio del computer (in ms) al momento dell'avvio
let durataFinaleMs = 0;          // durata della partita, fissata quando si risolve l'ultimo enigma
let idCronometro = null;         // identificativo dell'intervallo che aggiorna il cronometro
let lettereRaccolte = new Array(cTotaleEnigmi).fill(null);   // null = lettera non ancora conquistata
let opzioniMostrate = [];        // le tre risposte dell'enigma corrente, nell'ordine (mescolato) in cui appaiono
let opzioneErrata = new Array(cNumeroOpzioni).fill(false);   // true per le risposte già sbagliate nell'enigma corrente

// ============================================================
// TESTI SICURI
// ============================================================

// Sostituisce i caratteri speciali dell'HTML con le rispettive entità, così un testo come
// "<body>" viene mostrato com'è e non interpretato dal browser come un tag
function proteggi(testo) {
    return testo.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Come proteggi(), ma protegge anche le virgolette doppie: serve per i testi scritti dentro un attributo HTML (alt)
function proteggiAttributo(testo) {
    return proteggi(testo).replace(/"/g, "&quot;");
}

// Protegge il testo e trasforma i frammenti scritti tra apici inversi in codice in linea
function formattaTesto(testo) {
    return proteggi(testo).replace(/`([^`]+)`/g, '<code class="inline">$1</code>');
}

// ============================================================
// OFFUSCAMENTO DELLE RISPOSTE
// ============================================================

// Calcola un numero ("impronta") a partire da un testo: lo stesso testo dà sempre
// lo stesso numero, ma dal numero non si risale al testo leggendo il sorgente.
// Il resto della divisione per cModuloImpronta mantiene il risultato entro 32 bit.
function calcolaImpronta(testo) {
    let impronta = cValoreIniziale;

    for (let i = 0; i < testo.length; i++) {
        impronta = (impronta * cMoltiplicatore + testo.charCodeAt(i)) % cModuloImpronta;
    }

    return impronta;
}

// Una risposta è corretta se l'impronta di "identificativo:testo" coincide con quella
// memorizzata nell'enigma. L'identificativo evita che due enigmi con la stessa risposta
// abbiano la stessa impronta.
function rispostaCorretta(enigma, testoScelto) {
    return calcolaImpronta(enigma.id + ":" + testoScelto) === enigma.impronta;
}

// Restituisce una copia dell'elenco con gli elementi in ordine casuale (algoritmo di Fisher-Yates).
// Si lavora su una copia per non alterare l'ordine originale dei dati.
function mescolaOpzioni(elenco) {
    const copia = elenco.slice();

    // Si parte dall'ultima posizione e la si scambia con una posizione casuale tra 0 e i
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temporaneo = copia[i];

        copia[i] = copia[j];
        copia[j] = temporaneo;
    }

    return copia;
}

// ============================================================
// CRONOMETRO E PUNTEGGIO
// ============================================================

// Aggiunge uno zero davanti ai numeri a una cifra (7 diventa "07")
function dueCifre(numero) {
    if (numero < 10) {
        return "0" + numero;
    }

    return String(numero);
}

// Trasforma una durata in millisecondi nel formato mm:ss
function formattaTempo(millisecondi) {
    const minuti = Math.floor(millisecondi / cMillisecondiPerMinuto);
    const secondi = Math.floor((millisecondi % cMillisecondiPerMinuto) / cMillisecondiPerSecondo);

    return dueCifre(minuti) + ":" + dueCifre(secondi);
}

// Durata della partita fino a questo momento.
// Si confrontano due orari dell'orologio (invece di contare quante volte scatta
// l'intervallo) perché i browser rallentano i timer nelle schede in secondo piano.
function durataCorrenteMs() {
    if (partitaTerminata) {
        return durataFinaleMs;
    }

    if (partitaIniziata) {
        return Date.now() - istanteInizio;
    }

    return 0;
}

// Punteggio senza bonus: punti per le risposte corrette meno le penalità per gli errori
function calcolaPunteggioBase() {
    return enigmiRisolti * cPuntiRispostaCorretta - erroriTotali * cPenalitaErrore;
}

// Il bonus spetta solo se si rispettano entrambe le condizioni: tempo e numero di errori
function condizioniBonusRispettate(durataMs) {
    return durataMs <= cTempoBonusMs && erroriTotali <= cErroriMassimiBonus;
}

// Aggiorna cronometro, punti, errori e stato del bonus nel pannello in alto
function aggiornaStatistiche() {
    const durata = durataCorrenteMs();
    const bonusRispettato = condizioniBonusRispettate(durata);
    const etichettaBonus = document.getElementById("bonus-text");
    let punti = calcolaPunteggioBase();

    if (partitaTerminata && bonusRispettato) {
        punti += cPuntiBonus;
    }

    document.getElementById("timer-text").textContent = formattaTempo(durata);
    document.getElementById("score-text").textContent = punti;
    document.getElementById("errors-text").textContent = erroriTotali;

    if (partitaTerminata) {
        if (bonusRispettato) {
            etichettaBonus.textContent = "🌙 Bonus ottenuto!";
        } else {
            etichettaBonus.textContent = "🌙 Bonus non ottenuto";
        }
    } else if (bonusRispettato) {
        etichettaBonus.textContent = "🌙 Bonus ancora possibile";
    } else {
        etichettaBonus.textContent = "🌙 Bonus non più possibile";
    }

    if (bonusRispettato) {
        etichettaBonus.className = "bonus-badge bonus-ok";
    } else {
        etichettaBonus.className = "bonus-badge bonus-perso";
    }
}

// Avvia la partita: parte il cronometro e compare il primo enigma
function avviaPartita() {
    partitaIniziata = true;
    partitaTerminata = false;
    istanteInizio = Date.now();

    document.getElementById("start-area").classList.add("hidden");
    idCronometro = setInterval(aggiornaStatistiche, cIntervalloCronometroMs);
    aggiornaStatistiche();
    mostraEnigmaCorrente();
    document.getElementById("current-card").scrollIntoView({ behavior: "smooth", block: "center" });
}

// Ferma il cronometro e memorizza la durata finale (chiamata quando si risolve l'ultimo enigma)
function fermaCronometro() {
    clearInterval(idCronometro);
    idCronometro = null;
    durataFinaleMs = Date.now() - istanteInizio;
    partitaTerminata = true;
    aggiornaStatistiche();
}

// ============================================================
// DECORAZIONI DI SFONDO
// ============================================================

// Crea i lupi che attraversano lo schermo, con altezza, velocità e dimensione casuali
function creaLupi() {
    const contenitore = document.getElementById("particles");

    for (let i = 0; i < cNumeroLupi; i++) {
        const lupo = document.createElement("div");

        lupo.className = "bat";
        lupo.textContent = "🐺";
        lupo.style.top = (5 + Math.random() * 60) + "%";
        lupo.style.animationDuration = (16 + Math.random() * 18) + "s";
        lupo.style.animationDelay = (Math.random() * 20) + "s";
        lupo.style.fontSize = (1 + Math.random() * 1.4) + "rem";
        contenitore.appendChild(lupo);
    }
}

// Crea le gocce di pioggia che cadono dall'alto: sono disegnate con il CSS, non con un emoji
function creaGocce() {
    const contenitore = document.getElementById("particles");

    for (let i = 0; i < cNumeroGocce; i++) {
        const goccia = document.createElement("div");
        const dimensione = 8 + Math.random() * 8;

        goccia.className = "drop";
        goccia.style.left = (Math.random() * 100) + "%";
        goccia.style.width = dimensione + "px";
        goccia.style.height = dimensione + "px";
        goccia.style.animationDuration = (7 + Math.random() * 9) + "s";
        goccia.style.animationDelay = (Math.random() * 14) + "s";
        contenitore.appendChild(goccia);
    }
}

// ============================================================
// VISUALIZZAZIONE DELL'ENIGMA
// ============================================================

// Carica in anticipo l'immagine di un enigma, così quando compare la card l'immagine è già pronta
function precaricaImmagine(indice) {
    if (indice >= 0 && indice < cTotaleEnigmi) {
        const immagine = new Image();

        immagine.src = cCartellaImmagini + cEnigmi[indice].immagine;
    }
}

// Crea il pulsante di una risposta e collega il click alla funzione di verifica.
// La creazione è in una funzione a parte così ogni pulsante "ricorda" il proprio indice.
function creaOpzione(testo, indice) {
    const pulsante = document.createElement("button");

    pulsante.type = "button";
    pulsante.className = "option";
    pulsante.id = "opt-" + indice;
    pulsante.innerHTML = '<span class="option-letter">' + cEtichetteOpzioni[indice] + "</span>" +
                         '<span class="option-text">' + formattaTesto(testo) + "</span>";
    pulsante.addEventListener("click", function () {
        selezionaOpzione(indice);
    });

    return pulsante;
}

// Mostra nell'area centrale la card dell'enigma corrente (o il messaggio finale)
function mostraEnigmaCorrente() {
    const areaEnigma = document.getElementById("card-area");
    areaEnigma.innerHTML = "";

    if (indiceCorrente >= cTotaleEnigmi) {
        areaEnigma.innerHTML = '<div class="waiting-screen">🌅 Tutti gli enigmi risolti! 🌅</div>';
        return;
    }

    const enigma = cEnigmi[indiceCorrente];
    const card = document.createElement("div");
    let etichettaAvanti = "➡️ Prossimo enigma";
    let bloccoCodice = "";

    // All'ultimo enigma non esiste un "prossimo": il pulsante apre il portone
    if (indiceCorrente === cTotaleEnigmi - 1) {
        etichettaAvanti = "🌕 Accendi la luce";
    }

    // Alcuni enigmi non hanno codice da mostrare: in quel caso non si crea il riquadro
    if (enigma.codice !== "") {
        bloccoCodice = '<pre class="card-code">' + proteggi(enigma.codice) + "</pre>";
    }

    // Le risposte vengono mescolate a ogni visualizzazione, così la posizione
    // della risposta corretta cambia anche ricominciando il gioco
    opzioniMostrate = mescolaOpzioni(enigma.opzioni);

    // Nel nuovo enigma nessuna risposta è ancora stata sbagliata
    opzioneErrata = new Array(cNumeroOpzioni).fill(false);

    card.className = "card";
    card.id = "current-card";
    card.innerHTML =
        '<div class="card-header">' +
            '<div class="card-number">' + (indiceCorrente + 1) + "</div>" +
            '<div class="card-heading">' +
                '<div class="card-title">' + enigma.emoji + " " + proteggi(enigma.titolo) + "</div>" +
                '<div class="card-place">📍 ' + proteggi(enigma.luogo) + "</div>" +
            "</div>" +
        "</div>" +
        '<img class="card-image" src="' + cCartellaImmagini + enigma.immagine + '" alt="' +
            proteggiAttributo(enigma.descrizioneImmagine) + '" width="1280" height="698">' +
        '<div class="card-scene">' + formattaTesto(enigma.scena) + "</div>" +
        bloccoCodice +
        '<div class="card-question">' + formattaTesto(enigma.domanda) + "</div>" +
        '<div class="options" id="options"></div>' +
        '<div class="feedback" id="feedback" aria-live="polite"></div>' +
        '<button class="next-btn" id="next-btn" type="button">' + etichettaAvanti + "</button>";

    areaEnigma.appendChild(card);

    // Mentre lo studente legge questo enigma si prepara l'immagine del prossimo
    precaricaImmagine(indiceCorrente + 1);

    const contenitoreOpzioni = document.getElementById("options");
    for (let i = 0; i < cNumeroOpzioni; i++) {
        contenitoreOpzioni.appendChild(creaOpzione(opzioniMostrate[i], i));
    }

    document.getElementById("next-btn").addEventListener("click", vaiAvanti);
}

// Blocca (false) o sblocca (true) tutti i pulsanti delle risposte
function impostaOpzioniAttive(attive) {
    for (let i = 0; i < cNumeroOpzioni; i++) {
        document.getElementById("opt-" + i).disabled = !attive;
    }
}

// Sblocca solo le risposte non ancora sbagliate: una risposta errata resta segnata in rosso,
// così lo stesso errore non viene penalizzato due volte
function riabilitaOpzioniNonErrate() {
    for (let i = 0; i < cNumeroOpzioni; i++) {
        const pulsante = document.getElementById("opt-" + i);

        // Il pulsante può non esistere più se nel frattempo si è premuto "Ricomincia"
        if (pulsante !== null && !opzioneErrata[i]) {
            pulsante.disabled = false;
        }
    }
}

// ============================================================
// VERIFICA DELLA RISPOSTA
// ============================================================

// Controlla la risposta scelta e aggiorna interfaccia, punteggio e stato
function selezionaOpzione(indiceScelto) {
    if (inAttesaProssimo) {
        return;
    }

    const enigma = cEnigmi[indiceCorrente];
    const card = document.getElementById("current-card");
    const feedback = document.getElementById("feedback");
    const pulsanteScelto = document.getElementById("opt-" + indiceScelto);

    // Blocco le opzioni subito, per evitare click multipli mentre si mostra il feedback
    impostaOpzioniAttive(false);

    if (rispostaCorretta(enigma, opzioniMostrate[indiceScelto])) {
        pulsanteScelto.classList.add("selected-correct");
        feedback.className = "feedback correct show";
        feedback.innerHTML = "✅ <strong>Corretto!</strong> +" + cPuntiRispostaCorretta + " punti. " + formattaTesto(enigma.spiegazione);
        card.classList.add("solved");

        enigmiRisolti++;
        lettereRaccolte[indiceCorrente] = enigma.lettera;
        aggiornaProgresso();
        mostraLettere();

        // Risolto l'ultimo enigma il tempo si ferma; negli altri casi si aggiorna solo il punteggio
        if (enigmiRisolti === cTotaleEnigmi) {
            fermaCronometro();
        } else {
            aggiornaStatistiche();
        }

        // Le opzioni restano bloccate: si può solo proseguire con il pulsante di avanzamento
        inAttesaProssimo = true;
        document.getElementById("next-btn").classList.add("show");
    } else {
        erroriTotali++;
        opzioneErrata[indiceScelto] = true;
        aggiornaStatistiche();

        pulsanteScelto.classList.add("selected-wrong");
        feedback.className = "feedback wrong show";
        feedback.innerHTML = "🐺 <strong>Sbagliato!</strong> -" + cPenalitaErrore + " punto. Riprova... il Lupo Rand ha fame.";

        // La classe .wrong avvia l'animazione di scuotimento (dura 0,5 s)
        card.classList.add("wrong");
        setTimeout(function () {
            card.classList.remove("wrong");
        }, 600);

        // Dopo una breve pausa lo studente può riprovare con le risposte non ancora sbagliate
        setTimeout(function () {
            riabilitaOpzioniNonErrate();
            feedback.classList.remove("show");
        }, cRitardoRiprovaMs);
    }
}

// Passa all'enigma successivo oppure, dopo l'ultimo, controlla il completamento
function vaiAvanti() {
    inAttesaProssimo = false;
    indiceCorrente++;

    if (indiceCorrente >= cTotaleEnigmi) {
        document.getElementById("card-area").innerHTML =
            '<div class="waiting-screen">🌅 Tutti gli enigmi risolti! 🌅</div>';
        controllaCompletamento();
        return;
    }

    mostraEnigmaCorrente();
    document.getElementById("current-card").scrollIntoView({ behavior: "smooth", block: "center" });
}

// ============================================================
// PROGRESSO E LETTERE
// ============================================================

// Aggiorna la barra di avanzamento e il contatore "risolti / totale"
function aggiornaProgresso() {
    const percentuale = (enigmiRisolti / cTotaleEnigmi) * 100;

    document.getElementById("progress-fill").style.width = percentuale + "%";
    document.getElementById("progress-text").textContent = enigmiRisolti + " / " + cTotaleEnigmi;
}

// Ridisegna le caselle delle lettere, raggruppate per parola: piene se conquistate, "?" altrimenti
function mostraLettere() {
    const riga = document.getElementById("letters-row");
    let posizione = 0;

    riga.innerHTML = "";

    for (let p = 0; p < cLunghezzeParole.length; p++) {
        const gruppo = document.createElement("div");

        gruppo.className = "letter-word";

        for (let k = 0; k < cLunghezzeParole[p]; k++) {
            const casella = document.createElement("div");

            casella.className = "letter-slot";

            if (lettereRaccolte[posizione] !== null) {
                casella.classList.add("filled");
                casella.textContent = lettereRaccolte[posizione];
            } else {
                casella.textContent = "?";
            }

            gruppo.appendChild(casella);
            posizione++;
        }

        riga.appendChild(gruppo);
    }
}

// Unisce le lettere raccolte in parole separate da uno spazio (FERMA IL LUPO CON LA LUCE)
function componiFraseChiave() {
    const parole = [];
    let posizione = 0;

    for (let p = 0; p < cLunghezzeParole.length; p++) {
        parole.push(lettereRaccolte.slice(posizione, posizione + cLunghezzeParole[p]).join(""));
        posizione += cLunghezzeParole[p];
    }

    return parole.join(" ");
}

// ============================================================
// COMPLETAMENTO E RESET
// ============================================================

// Se tutti gli enigmi sono risolti mostra la frase chiave, il riepilogo del punteggio e la sezione finale
function controllaCompletamento() {
    if (enigmiRisolti === cTotaleEnigmi) {
        const sezioneFinale = document.getElementById("final-section");
        const puntiCorrette = enigmiRisolti * cPuntiRispostaCorretta;
        const puntiPenalita = erroriTotali * cPenalitaErrore;
        let testoBonus = "nessuno (oltre " + cMinutiBonus + " minuti o più di " + cErroriMassimiBonus + " errori)";
        let puntiBonus = 0;
        let testoPenalita = "0";

        if (condizioniBonusRispettate(durataFinaleMs)) {
            puntiBonus = cPuntiBonus;
            testoBonus = "+" + cPuntiBonus;
        }

        if (puntiPenalita > 0) {
            testoPenalita = erroriTotali + " × " + cPenalitaErrore + " = −" + puntiPenalita;
        }

        document.getElementById("key-display").textContent = componiFraseChiave();
        document.getElementById("sum-tempo").textContent = formattaTempo(durataFinaleMs);
        document.getElementById("sum-corrette").textContent =
            enigmiRisolti + " × " + cPuntiRispostaCorretta + " = +" + puntiCorrette;
        document.getElementById("sum-errori").textContent = testoPenalita;
        document.getElementById("sum-bonus").textContent = testoBonus;
        document.getElementById("sum-totale").textContent = (puntiCorrette - puntiPenalita + puntiBonus) + " punti";

        sezioneFinale.classList.add("show");

        // Attendo 0,4 s così l'ultima lettera è visibile prima dello scorrimento
        setTimeout(function () {
            sezioneFinale.scrollIntoView({ behavior: "smooth" });
        }, 400);
    }
}

// Riporta il gioco alla situazione iniziale: si torna alla schermata con il pulsante "Entra nel villaggio"
function ricominciaGioco() {
    clearInterval(idCronometro);
    idCronometro = null;

    indiceCorrente = 0;
    enigmiRisolti = 0;
    erroriTotali = 0;
    inAttesaProssimo = false;
    partitaIniziata = false;
    partitaTerminata = false;
    istanteInizio = 0;
    durataFinaleMs = 0;
    lettereRaccolte = new Array(cTotaleEnigmi).fill(null);

    document.getElementById("card-area").innerHTML = "";
    document.getElementById("final-section").classList.remove("show");
    document.getElementById("start-area").classList.remove("hidden");
    aggiornaStatistiche();
    aggiornaProgresso();
    mostraLettere();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================
// AVVIO
// ============================================================

// Scrive nelle regole mostrate nell'introduzione i valori delle costanti,
// così testo e punteggio reale non possono andare fuori sincronia
function compilaRegole() {
    document.getElementById("totale-enigmi").textContent = cTotaleEnigmi;
    document.getElementById("regola-punti").textContent = cPuntiRispostaCorretta;
    document.getElementById("regola-penalita").textContent = cPenalitaErrore;
    document.getElementById("regola-bonus").textContent = cPuntiBonus;
    document.getElementById("regola-minuti").textContent = cMinutiBonus;
    document.getElementById("regola-errori").textContent = cErroriMassimiBonus;
}

compilaRegole();
precaricaImmagine(0);
document.getElementById("start-btn").addEventListener("click", avviaPartita);
document.getElementById("reset-btn").addEventListener("click", ricominciaGioco);
creaLupi();
creaGocce();
mostraLettere();
aggiornaProgresso();
aggiornaStatistiche();
