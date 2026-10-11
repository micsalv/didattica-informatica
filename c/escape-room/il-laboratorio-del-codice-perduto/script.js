/*
    Autore: Michele Salvemini
    Classe: Seconda o Terza (primo approccio ai linguaggi C e C++)
    Argomento: Operatori di assegnamento composti, pre/post incremento e decremento,
               assegnazione all'interno di un'espressione (doppia assegnazione)
    Obiettivo: Gestire l'escape room: mostrare un enigma alla volta con risposte
               mescolate, verificare la risposta, assegnare una lettera, misurare
               il tempo, calcolare il punteggio e comporre la parola chiave finale
    Versione: 2.2
    Data: 11/10/2026
    Licenza: CC BY-NC-ND 4.0 - https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// ============================================================
// COSTANTI
// ============================================================

// Elenco degli enigmi. Ogni enigma contiene:
//   id                                       -> codice univoco usato per calcolare l'impronta
//   emoji, titolo, scena, codice, domanda    -> testi mostrati nella card
//   opzioni                                  -> le tre risposte possibili (l'ordine qui NON è quello mostrato)
//   impronta                                 -> numero calcolato dalla risposta corretta (non indica quale sia)
//   lettera                                  -> lettera assegnata quando l'enigma viene risolto
//   spiegazione                              -> commento mostrato dopo la risposta corretta
const cEnigmi = [
    {
        id: "E01",
        emoji: "🕯️",
        titolo: "La Porta del Cimitero",
        scena: "Un cancello arrugginito blocca l'uscita. Sopra c'è inciso:",
        codice: "int x = 5;\nint a = ++x;",
        domanda: "Quali sono i valori finali di x e a?",
        opzioni: ["x = 5, a = 5", "x = 6, a = 6", "x = 6, a = 5"],
        impronta: 2123097104,
        lettera: "L",
        spiegazione: "++x pre-incrementa x a 6 e poi assegna il valore 6 ad a."
    },
    {
        id: "E02",
        emoji: "🕷️",
        titolo: "Il Ragno Tessitore",
        scena: "Un ragno gigante tesse la sua tela. Per passare devi rispondere:",
        codice: "int y = 12;\nint b = y--;",
        domanda: "Quali sono i valori finali di b e y?",
        opzioni: ["b = 12, y = 11", "b = 11, y = 11", "b = 12, y = 12"],
        impronta: 1101373772,
        lettera: "A",
        spiegazione: "y-- post-decrementa: assegna 12 a b e poi decrementa y a 11."
    },
    {
        id: "E03",
        emoji: "💀",
        titolo: "Il Teschio Numerico",
        scena: "Un teschio luminoso sussurra un calcolo. Sbagliare significa...",
        codice: "int k = 17;\nk %= 5;\nk *= 4;\nk--;",
        domanda: "Qual è il valore finale di k?",
        opzioni: ["7", "8", "6"],
        impronta: 217763262,
        lettera: "B",
        spiegazione: "17 % 5 = 2; 2 * 4 = 8; 8-- = 7."
    },
    {
        id: "E04",
        emoji: "🧙‍♀️",
        titolo: "La Strega dei Due Incrementi",
        scena: "La strega mescola la pozione. Devi calcolare l'effetto:",
        codice: "int x = 3, y = 8;\nint z = x++ + y;",
        domanda: "Quali sono i valori finali di z, x e y?",
        opzioni: ["z = 11, x = 3, y = 8", "z = 12, x = 4, y = 8", "z = 11, x = 4, y = 8"],
        impronta: 802560368,
        lettera: "O",
        spiegazione: "x++ usa il valore corrente 3 per la somma (3 + 8 = 11) e poi incrementa x a 4."
    },
    {
        id: "E05",
        emoji: "🎃",
        titolo: "La Zucca Doppia",
        scena: "Due zucche intagliate mostrano numeri che cambiano:",
        codice: "int p = 20;\nint q = --p;\nq += p;",
        domanda: "Quali sono i valori finali di p e q?",
        opzioni: ["p = 19, q = 38", "p = 20, q = 40", "p = 19, q = 19"],
        impronta: 3230010373,
        lettera: "R",
        spiegazione: "--p decrementa p a 19 e lo assegna a q; q += 19 esegue 19 + 19 = 38."
    },
    {
        id: "E06",
        emoji: "🦇",
        titolo: "Il Pipistrello Operatore",
        scena: "Un pipistrello vola portando un'equazione:",
        codice: "int a = 10;\na += 6;\na /= 2;",
        domanda: "Qual è il valore finale di a?",
        opzioni: ["8", "16", "5"],
        impronta: 217766530,
        lettera: "A",
        spiegazione: "a += 6 porta a a 16; a /= 2 divide 16 per 2 ottenendo 8."
    },
    {
        id: "E07",
        emoji: "👻",
        titolo: "Il Fantasma del Modulo",
        scena: "Un fantasma trasparente appare e chiede:",
        codice: "int x = 25, y = 7;\nx %= y;\ny += x++;",
        domanda: "Quali sono i valori finali di x e y?",
        opzioni: ["x = 4, y = 11", "x = 5, y = 11", "x = 5, y = 10"],
        impronta: 3878966841,
        lettera: "T",
        spiegazione: "x %= y assegna a x il resto 4 (25 % 7). In y += x++ l'espressione x++ vale 4 (il valore prima dell'incremento): y diventa 7 + 4 = 11 e subito dopo x passa a 5."
    },
    {
        id: "E08",
        emoji: "🕸️",
        titolo: "La Trappola di Ragnatele",
        scena: "Per liberarti dalle ragnatele devi risolvere:",
        codice: "int x = 10;\nint r = (x %= 3) + 2;",
        domanda: "Quali sono i valori finali di r e x?",
        opzioni: ["r = 3, x = 1", "r = 1, x = 3", "r = 2, x = 1"],
        impronta: 880016416,
        lettera: "O",
        spiegazione: "(x %= 3) esegue 10 % 3 = 1 e assegna 1 a x; poi 1 + 2 = 3 viene assegnato ad r."
    },
    {
        id: "E09",
        emoji: "⚰️",
        titolo: "La Bara del Pre-incremento",
        scena: "Una bara si apre lentamente. Dentro, un enigma:",
        codice: "int h = 15;\nh %= 6;\nint k = ++h;\nk *= h;",
        domanda: "Quali sono i valori finali di k e h?",
        opzioni: ["k = 16, h = 4", "k = 4, h = 16", "k = 8, h = 4"],
        impronta: 1605857921,
        lettera: "R",
        spiegazione: "15 % 6 = 3 (h = 3); ++h pre-incrementa h a 4 e assegna 4 a k; k *= 4 esegue 4 * 4 = 16."
    },
    {
        id: "E10",
        emoji: "🧟",
        titolo: "Lo Zombie Post-decremento",
        scena: "Uno zombie barcolla verso di te. Recita:",
        codice: "int a = 4, b = 7;\nint c = a++ + --b;",
        domanda: "Quali sono i valori finali di a, b e c?",
        opzioni: ["a = 5, b = 6, c = 10", "a = 4, b = 6, c = 10", "a = 5, b = 7, c = 11"],
        impronta: 1527838726,
        lettera: "I",
        spiegazione: "--b decrementa b a 6; a++ usa 4 nell'addizione (4 + 6 = 10) e poi porta a a 5."
    },
    {
        id: "E11",
        emoji: "🎭",
        titolo: "La Maschera di Halloween",
        scena: "Una maschera ti sussurra un indovinello:",
        codice: "int a = 14;\na %= 4;\na *= 5;\na++;",
        domanda: "Qual è il valore finale di a?",
        opzioni: ["10", "11", "12"],
        impronta: 2892334248,
        lettera: "O",
        spiegazione: "14 % 4 = 2 (a = 2); 2 * 5 = 10 (a = 10); a++ incrementa a a 11."
    },
    {
        id: "E12",
        emoji: "🕯️",
        titolo: "Il Candelabro Maledetto",
        scena: "Un candelabro si accende da solo. La fiamma disegna:",
        codice: "int m = 20, n = 6;\nint res = (m %= n) + 3;",
        domanda: "Quali sono i valori finali di res, m e n?",
        opzioni: ["res = 5, m = 2, n = 6", "res = 2, m = 5, n = 6", "res = 5, m = 6, n = 2"],
        impronta: 3626305368,
        lettera: "B",
        spiegazione: "(m %= 6) esegue 20 % 6 = 2 e assegna 2 a m; res = 2 + 3 = 5."
    },
    {
        id: "E13",
        emoji: "🐈‍⬛",
        titolo: "Il Gatto Nero Finale",
        scena: "Il gatto nero del professor Byte ti guarda fisso:",
        codice: "int x = 8, y = 3;\nint z = --x * y++;",
        domanda: "Quali sono i valori finali di z, x e y?",
        opzioni: ["z = 21, x = 7, y = 4", "z = 24, x = 7, y = 4", "z = 21, x = 8, y = 3"],
        impronta: 1448743440,
        lettera: "Y",
        spiegazione: "--x pre-decrementa x a 7; y++ usa il valore corrente 3 (7 * 3 = 21) e poi incrementa y a 4."
    },
    {
        id: "E14",
        emoji: "🧪",
        titolo: "Il Calderone Ribollente",
        scena: "Un calderone verde bolle emanando un fumo denso. Una voce chiede:",
        codice: "int x = 2, z = 3;\nint y = (x = z + 6) + 3;",
        domanda: "Quali sono i valori finali di y, x e z?",
        opzioni: ["y = 12, x = 9, z = 3", "y = 9, x = 9, z = 3", "y = 12, x = 3, z = 9"],
        impronta: 1820801138,
        lettera: "T",
        spiegazione: "z + 6 = 9, assegnato a x (x = 9). L'espressione (x = 9) restituisce 9, quindi y = 9 + 3 = 12. z resta 3."
    },
    {
        id: "E15",
        emoji: "🔮",
        titolo: "Il Rituale Finale",
        scena: "Una sfera di cristallo mostra un ultimo incantesimo da decifrare:",
        codice: "int a = 5, b = 2;\nint c = (a = b * 4) + b;",
        domanda: "Quali sono i valori finali di c, a e b?",
        opzioni: ["c = 10, a = 8, b = 2", "c = 10, a = 5, b = 2", "c = 8, a = 8, b = 2"],
        impronta: 3111462538,
        lettera: "E",
        spiegazione: "b * 4 = 8, assegnato ad a (a = 8). L'espressione (a = b * 4) restituisce 8, quindi c = 8 + b = 8 + 2 = 10. b resta 2."
    }
];

const cTotaleEnigmi = cEnigmi.length;
const cNumeroOpzioni = 3;
const cEtichetteOpzioni = ["A", "B", "C"];

// Tempo (in millisecondi) per cui resta visibile il messaggio di errore prima di poter riprovare
const cRitardoRiprovaMs = 1500;

// Regole del punteggio
const cPuntiRispostaCorretta = 5;   // punti guadagnati per ogni enigma risolto
const cPenalitaErrore = 1;          // punti tolti per ogni risposta sbagliata
const cPuntiBonus = 10;             // punti aggiunti se si rispettano entrambe le condizioni del bonus
const cMinutiBonus = 30;            // condizione 1: finire entro questo numero di minuti
const cErroriMassimiBonus = 3;      // condizione 2: commettere al massimo questo numero di errori in totale

// Conversioni di tempo e frequenza di aggiornamento del cronometro
const cMillisecondiPerSecondo = 1000;
const cMillisecondiPerMinuto = 60000;
const cTempoBonusMs = cMinutiBonus * cMillisecondiPerMinuto;
const cIntervalloCronometroMs = 250;

// Parametri della funzione che calcola l'impronta di una risposta (vedi calcolaImpronta)
const cValoreIniziale = 5381;
const cMoltiplicatore = 33;
const cModuloImpronta = 4294967296;

// Parametri delle particelle decorative
const cEmojiParticelle = ["🎃", "👻", "🕷️", "🦇", "💀", "🕸️", "🐈‍⬛", "🕯️", "⚰️", "🧟", "🧪", "🔮"];
const cNumeroParticelle = 25;

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
let partitaIniziata = false;     // true dopo aver premuto "Inizia l'avventura"
let partitaTerminata = false;    // true quando viene risolto l'ultimo enigma
let istanteInizio = 0;           // orologio del computer (in ms) al momento dell'avvio
let durataFinaleMs = 0;          // durata della partita, fissata quando si risolve l'ultimo enigma
let idCronometro = null;         // identificativo dell'intervallo che aggiorna il cronometro
let lettereRaccolte = new Array(cTotaleEnigmi).fill(null);   // null = lettera non ancora conquistata
let opzioniMostrate = [];        // le tre risposte dell'enigma corrente, nell'ordine (mescolato) in cui appaiono
let opzioneErrata = new Array(cNumeroOpzioni).fill(false);   // true per le risposte già sbagliate nell'enigma corrente

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
            etichettaBonus.textContent = "🏅 Bonus ottenuto!";
        } else {
            etichettaBonus.textContent = "🏅 Bonus non ottenuto";
        }
    } else if (bonusRispettato) {
        etichettaBonus.textContent = "🏅 Bonus ancora possibile";
    } else {
        etichettaBonus.textContent = "🏅 Bonus non più possibile";
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
// PARTICELLE
// ============================================================

// Crea gli emoji fluttuanti di sfondo con posizione, durata e dimensione casuali
function creaParticelle() {
    const contenitore = document.getElementById("particles");

    for (let i = 0; i < cNumeroParticelle; i++) {
        const particella = document.createElement("div");
        const posizioneEmoji = Math.floor(Math.random() * cEmojiParticelle.length);

        particella.className = "particle";
        particella.textContent = cEmojiParticelle[posizioneEmoji];
        particella.style.left = (Math.random() * 100) + "%";
        particella.style.animationDuration = (12 + Math.random() * 20) + "s";
        particella.style.animationDelay = (Math.random() * 20) + "s";
        particella.style.fontSize = (1 + Math.random() * 1.5) + "rem";
        contenitore.appendChild(particella);
    }
}

// ============================================================
// VISUALIZZAZIONE DELL'ENIGMA
// ============================================================

// Crea il pulsante di una risposta e collega il click alla funzione di verifica.
// La creazione è in una funzione a parte così ogni pulsante "ricorda" il proprio indice.
function creaOpzione(testo, indice) {
    const pulsante = document.createElement("button");

    pulsante.type = "button";
    pulsante.className = "option";
    pulsante.id = "opt-" + indice;
    pulsante.innerHTML = '<span class="option-letter">' + cEtichetteOpzioni[indice] + "</span>" +
                         "<span>" + testo + "</span>";
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
        areaEnigma.innerHTML = '<div class="waiting-screen">✨ Tutti gli enigmi risolti! ✨</div>';
        return;
    }

    const enigma = cEnigmi[indiceCorrente];
    const card = document.createElement("div");
    let etichettaAvanti = "➡️ Prossimo enigma";

    // All'ultimo enigma non esiste un "prossimo": il pulsante apre il lucchetto finale
    if (indiceCorrente === cTotaleEnigmi - 1) {
        etichettaAvanti = "🗝️ Apri il lucchetto";
    }

    // Le risposte vengono mescolate a ogni visualizzazione, così la posizione
    // della risposta corretta cambia anche ricominciando il gioco
    opzioniMostrate = mescolaOpzioni(enigma.opzioni);

    // Nel nuovo enigma nessuna risposta è ancora stata sbagliata
    opzioneErrata = new Array(cNumeroOpzioni).fill(false);

    card.className = "card";
    card.id = "current-card";

    // Nota: i testi vengono inseriti come HTML, quindi non devono contenere i caratteri < e &
    // (ad esempio una condizione con "<"). In tal caso usare i simboli &lt; e &amp;.
    card.innerHTML =
        '<div class="card-header">' +
            '<div class="card-number">' + (indiceCorrente + 1) + "</div>" +
            '<div class="card-title">' + enigma.emoji + " " + enigma.titolo + "</div>" +
        "</div>" +
        '<div class="card-scene">' + enigma.scena + "</div>" +
        '<pre class="card-code">' + enigma.codice + "</pre>" +
        '<div class="card-question">' + enigma.domanda + "</div>" +
        '<div class="options" id="options"></div>' +
        '<div class="feedback" id="feedback"></div>' +
        '<button class="next-btn" id="next-btn" type="button">' + etichettaAvanti + "</button>";

    areaEnigma.appendChild(card);

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
        feedback.innerHTML = "✅ <strong>Corretto!</strong> +" + cPuntiRispostaCorretta + " punti. " + enigma.spiegazione;
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
        feedback.innerHTML = "❌ <strong>Sbagliato!</strong> -" + cPenalitaErrore + " punto. Riprova... il Professor Byte non perdona.";

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
            '<div class="waiting-screen">✨ Tutti gli enigmi risolti! ✨</div>';
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

// Ridisegna le caselle delle lettere: piene se conquistate, "?" altrimenti
function mostraLettere() {
    const riga = document.getElementById("letters-row");
    riga.innerHTML = "";

    for (let i = 0; i < cTotaleEnigmi; i++) {
        const casella = document.createElement("div");
        casella.className = "letter-slot";

        if (lettereRaccolte[i] !== null) {
            casella.classList.add("filled");
            casella.textContent = lettereRaccolte[i];
        } else {
            casella.textContent = "?";
        }

        riga.appendChild(casella);
    }
}

// ============================================================
// COMPLETAMENTO E RESET
// ============================================================

// Se tutti gli enigmi sono risolti mostra parola chiave, riepilogo del punteggio e sezione finale
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

        document.getElementById("key-display").textContent = lettereRaccolte.join("");
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

// Riporta il gioco alla situazione iniziale: si torna alla schermata con il pulsante "Inizia"
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
document.getElementById("start-btn").addEventListener("click", avviaPartita);
document.getElementById("reset-btn").addEventListener("click", ricominciaGioco);
creaParticelle();
mostraLettere();
aggiornaProgresso();
aggiornaStatistiche();
