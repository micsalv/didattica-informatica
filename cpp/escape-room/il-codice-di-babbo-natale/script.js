/*
    Autore: Michele Salvemini
    Classe: studenti che hanno svolto le esercitazioni di C++ sulla struttura di selezione e sugli operatori logici (SEL010-SEL250, LOG010-LOG170)
    Argomento: Linguaggio C++ - struttura di selezione (if, if-else, if annidati, catena if-else if) e operatori logici (&&, ||, !)
    Obiettivo: Gestire l'escape room: mostrare un enigma alla volta con risposte mescolate, verificare la risposta, assegnare una lettera, misurare il tempo, calcolare il punteggio e comporre la frase finale
    Versione: 1.0
    Data: 20/11/2026
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
//   codice                                   -> codice C++ da analizzare (può essere vuoto)
//   opzioni                                  -> le tre risposte possibili (l'ordine qui NON è quello mostrato)
//   impronta                                 -> numero calcolato dalla risposta corretta (non indica quale sia)
//   lettera                                  -> lettera assegnata quando l'enigma viene risolto
//   spiegazione                              -> commento mostrato dopo la risposta corretta
// Nei testi i frammenti di codice vanno scritti tra apici inversi (`if (x > 3)`): vengono mostrati
// come codice e i caratteri < > & non vengono interpretati come HTML.
const cEnigmi = [
    {
        id: "N01",
        emoji: "🎄",
        titolo: "Il Cancello del Polo Nord",
        luogo: "Cancello del Polo Nord",
        scena: "È la Vigilia di Natale. Sei l'ultimo apprendista elfo arrivato al Polo Nord, ma il Folletto Bug ha rovinato la Macchina dei Doni: ora distribuisce i regali a caso. Il cancello si apre solo a chi conosce le basi del C++.",
        immagine: "room-01-cancello.jpg",
        descrizioneImmagine: "Grande cancello di legno e ferro tra due abeti innevati, con ghirlande e lanterne accese; sullo sfondo un villaggio di casette illuminate sotto un cielo stellato.",
        codice: "",
        domanda: "Quale parola chiave introduce il percorso da seguire quando la condizione dell'`if` è falsa?",
        opzioni: ["`else`", "`then`", "`elif`"],
        impronta: 3637960983,
        lettera: "S",
        spiegazione: "`else` introduce il ramo eseguito quando la condizione è falsa; `then` ed `elif` non fanno parte del C++."
    },
    {
        id: "N02",
        emoji: "🛷",
        titolo: "La Stazione delle Slitte",
        luogo: "Stazione delle slitte",
        scena: "Alla stazione delle slitte un elfo conta i pacchi sul tabellone: la slitta è considerata piena solo se i pacchi sono più di dieci. Controlla bene il confine.",
        immagine: "room-02-slitte.jpg",
        descrizioneImmagine: "Stazione di legno con tante slitte rosse cariche di pacchi colorati, un tabellone con numeri, neve che cade e lampioni accesi.",
        codice: "int pacchi = 10;\nif (pacchi > 10) {\n    cout << \"Slitta piena\";\n}\ncout << \"!\";",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["!", "Slitta piena!", "Slitta piena"],
        impronta: 228435440,
        lettera: "A",
        spiegazione: "10 non è maggiore di 10: la condizione è falsa e viene eseguita solo l'istruzione dopo l'`if`, che stampa `!`."
    },
    {
        id: "N03",
        emoji: "✉️",
        titolo: "L'Ufficio delle Letterine",
        luogo: "Ufficio postale",
        scena: "All'ufficio postale arrivano migliaia di letterine. Una richiesta viene esaudita solo se il bambino è stato bravo e ha scritto bene l'indirizzo: due condizioni da soddisfare insieme.",
        immagine: "room-03-letterine.jpg",
        descrizioneImmagine: "Ufficio postale rustico pieno di buste rosse e sacchi di lettere, un elfo timbra una busta, un camino acceso e una ghirlanda alla finestra.",
        codice: "",
        domanda: "Quale operatore logico richiede che entrambe le condizioni siano vere?",
        opzioni: ["`&&`", "`||`", "`!`"],
        impronta: 1643346780,
        lettera: "L",
        spiegazione: "`&&` (AND) è vero solo se entrambe le condizioni sono vere; `||` richiede che ne basti una e `!` nega una condizione."
    },
    {
        id: "N04",
        emoji: "📐",
        titolo: "Il Progetto della Macchina",
        luogo: "Ufficio dei progetti",
        scena: "Sulla scrivania di Babbo Natale c'è il progetto della Macchina dei Doni, un diagramma a blocchi macchiato di cioccolata: il blocco che rappresenta una decisione è quasi illeggibile.",
        immagine: "room-04-progetto.jpg",
        descrizioneImmagine: "Scrivania di legno con un grande foglio di progetto e un diagramma a blocchi, una tazza di cioccolata calda che ha lasciato una macchia, matite e una lampada.",
        codice: "",
        domanda: "Quale simbolo del diagramma a blocchi rappresenta una decisione, cioè una condizione con due uscite?",
        opzioni: ["Il rombo", "Il rettangolo", "Il parallelogramma"],
        impronta: 2781632293,
        lettera: "V",
        spiegazione: "Il rombo contiene la condizione e ha due uscite, vero e falso; il rettangolo indica un'elaborazione e il parallelogramma l'input o l'output."
    },
    {
        id: "N05",
        emoji: "🗂️",
        titolo: "Lo Schedario dei Nomi",
        luogo: "Schedario dei nomi",
        scena: "Lo schedario dei bambini è ordinato con il codice ASCII: l'elfo archivista deve capire se un nome scritto in minuscolo viene prima o dopo uno scritto in maiuscolo.",
        immagine: "room-05-schedario.jpg",
        descrizioneImmagine: "Stanza con file di cassetti di legno etichettati, schede appese con spago e una scala; un elfo con occhiali consulta una scheda sotto una lampada.",
        codice: "char iniziale = 'b';\nif (iniziale < 'B') {\n    cout << \"Prima\";\n} else {\n    cout << \"Dopo\";\n}",
        domanda: "Che cosa stampa il programma? (A vale 65 e a vale 97)",
        opzioni: ["Dopo", "Prima", "Prima Dopo"],
        impronta: 1720693284,
        lettera: "A",
        spiegazione: "`'b'` vale 98 e `'B'` vale 66: 98 non è minore di 66, quindi la condizione è falsa e si stampa `Dopo`."
    },
    {
        id: "N06",
        emoji: "📜",
        titolo: "La Lista dei Bravi",
        luogo: "Biblioteca della Lista",
        scena: "Nella biblioteca la Lista dei Bravi e quella delle consegne sono in due registri diversi. Un regalo parte se il bambino è bravo e il suo regalo non è ancora stato consegnato.",
        immagine: "room-06-lista.jpg",
        descrizioneImmagine: "Biblioteca di legno con due grandi registri aperti su un leggio, uno elfo che legge un lungo rotolo di pergamena, candele e un camino.",
        codice: "bool bravo = true;\nbool consegnato = false;\nif (bravo && (!consegnato)) {\n    cout << \"Da consegnare\";\n} else {\n    cout << \"Niente\";\n}",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Da consegnare", "Niente", "Da consegnare Niente"],
        impronta: 3357269725,
        lettera: "I",
        spiegazione: "`bravo` è vera e `(!consegnato)` è vera, perché `consegnato` è falsa: l'AND è vero e si stampa `Da consegnare`."
    },
    {
        id: "N07",
        emoji: "🏠",
        titolo: "La Torre dei Camini",
        luogo: "Torre dei camini",
        scena: "La torre dei camini controlla da dove entrare: prima si guarda se la casa ha un camino, poi se ci sono bambini che dormono.",
        immagine: "room-07-camini.jpg",
        descrizioneImmagine: "Torre di mattoni con tanti camini fumanti sopra i tetti innevati di un paesino, di notte; un elfo con un binocolo osserva dalla cima.",
        codice: "int camini = 3;\nint bambini = 0;\nif (camini > 0) {\n    if (bambini > 0) {\n        cout << \"Consegna\";\n    } else {\n        cout << \"Attesa\";\n    }\n} else {\n    cout << \"Stop\";\n}",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Attesa", "Consegna", "Stop"],
        impronta: 455445430,
        lettera: "L",
        spiegazione: "Il primo `if` è vero (3 > 0); nel secondo la condizione è falsa (0 > 0), quindi si esegue l'`else` interno: `Attesa`."
    },
    {
        id: "N08",
        emoji: "🌨️",
        titolo: "L'Osservatorio del Meteo",
        luogo: "Osservatorio meteo",
        scena: "Dall'osservatorio gli elfi leggono neve e vento: la slitta resta a terra se almeno uno dei due valori supera la soglia.",
        immagine: "room-08-meteo.jpg",
        descrizioneImmagine: "Osservatorio in cima a una torre con strumenti di ottone, un anemometro e un pluviometro, bufera di neve fuori dalle finestre, elfo che legge un quadrante.",
        codice: "int neve = 2;\nint vento = 9;\nif ((neve > 5) || (vento > 8)) {\n    cout << \"Tempesta\";\n} else {\n    cout << \"Calma\";\n}",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Tempesta", "Calma", "Tempesta Calma"],
        impronta: 1969667960,
        lettera: "N",
        spiegazione: "`(neve > 5)` è falsa ma `(vento > 8)` è vera: con `||` basta una condizione vera, quindi si stampa `Tempesta`."
    },
    {
        id: "N09",
        emoji: "🍪",
        titolo: "La Cucina dei Biscotti",
        luogo: "Cucina dei biscotti",
        scena: "In cucina il capo pasticciere giudica ogni teglia in base al numero di biscotti: troppo pochi, giusti oppure troppi.",
        immagine: "room-09-biscotti.jpg",
        descrizioneImmagine: "Cucina calda con teglie di biscotti a forma di stella e di omino, un elfo pasticciere con cappello bianco, farina sul tavolo e un forno acceso.",
        codice: "int biscotti = 20;\nif (biscotti < 10) {\n    cout << \"Pochi\";\n} else if (biscotti < 20) {\n    cout << \"Giusti\";\n} else {\n    cout << \"Troppi\";\n}",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Troppi", "Giusti", "Pochi"],
        impronta: 534018292,
        lettera: "A",
        spiegazione: "Con 20 biscotti né `(biscotti < 10)` né `(biscotti < 20)` sono vere: si arriva all'`else` e si stampa `Troppi`."
    },
    {
        id: "N10",
        emoji: "💡",
        titolo: "Il Laboratorio dei Circuiti",
        luogo: "Laboratorio dei circuiti",
        scena: "Per riparare la macchina devi provare tutte le combinazioni di tre interruttori, ciascuno acceso o spento.",
        immagine: "room-10-circuiti.jpg",
        descrizioneImmagine: "Banco da lavoro con tre grandi interruttori rossi, fili colorati, lampadine e un elfo con un cacciavite; alle pareti schemi di circuiti.",
        codice: "",
        domanda: "Quante righe ha la tavola di verità di un'espressione con tre variabili logiche?",
        opzioni: ["8", "6", "9"],
        impronta: 228469222,
        lettera: "T",
        spiegazione: "Ogni variabile ha due valori e le combinazioni sono 2 · 2 · 2 = 8."
    },
    {
        id: "N11",
        emoji: "🧸",
        titolo: "L'Officina dei Giocattoli",
        luogo: "Officina dei giocattoli",
        scena: "Nell'officina un elfo distratto ha dimenticato le parentesi graffe: ora un'istruzione parte anche quando non dovrebbe.",
        immagine: "room-11-officina.jpg",
        descrizioneImmagine: "Officina piena di giocattoli di legno, trenini, orsetti e soldatini, banchi con attrezzi, un elfo che guarda confuso un trenino, luce calda.",
        codice: "int trenini = 2;\nif (trenini > 5)\n    cout << \"Troppi \";\n    cout << \"Controllo\";",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Controllo", "Troppi Controllo", "Troppi "],
        impronta: 2200941291,
        lettera: "A",
        spiegazione: "Senza graffe l'`if` comprende solo la prima istruzione: la seconda viene eseguita sempre e si stampa `Controllo`."
    },
    {
        id: "N12",
        emoji: "🎁",
        titolo: "Il Magazzino dei Regali",
        luogo: "Magazzino dei regali",
        scena: "Nel magazzino i regali vengono contati a ogni turno: la negazione ribalta il risultato del confronto.",
        immagine: "room-12-magazzino.jpg",
        descrizioneImmagine: "Enorme magazzino con scaffali pieni di pacchi regalo con fiocchi colorati, un carrello, un elfo con un blocco per appunti e luci a festone.",
        codice: "int regali = 5;\nif (!(regali > 3)) {\n    cout << \"Pochi\";\n} else {\n    cout << \"Tanti\";\n}",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Tanti", "Pochi", "Pochi Tanti"],
        impronta: 1056106640,
        lettera: "L",
        spiegazione: "`(regali > 3)` è vera e `!` la rende falsa: si esegue l'`else` e si stampa `Tanti`."
    },
    {
        id: "N13",
        emoji: "🦌",
        titolo: "La Stalla delle Renne",
        luogo: "Stalla delle renne",
        scena: "Nella stalla le renne vengono assegnate ai doni in base al numero di regali: prima si guarda se sono tanti, poi quanto sono grandi.",
        immagine: "room-13-stalla.jpg",
        descrizioneImmagine: "Stalla di legno con sei renne dal pelo bruno e fieno fresco, lanterne appese, un elfo che porta un secchio, neve fuori dalla porta.",
        codice: "int regali = 7;\nif (regali > 5) {\n    if (regali > 10) {\n        cout << \"Dono grande \";\n    } else if (regali > 8) {\n        cout << \"Dono medio \";\n    } else {\n        cout << \"Dono piccolo \";\n    }\n} else {\n    cout << \"Nessun dono \";\n}\ncout << \"Fine\";",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Dono piccolo Fine", "Dono piccolo", "Nessun dono Fine"],
        impronta: 217552140,
        lettera: "E",
        spiegazione: "`(regali > 5)` è vera (7 > 5); dentro, né `(regali > 10)` né `(regali > 8)` sono vere: si esegue l'`else` interno (`Dono piccolo `) e poi l'ultima istruzione, `Fine`."
    },
    {
        id: "N14",
        emoji: "💌",
        titolo: "La Sala delle Letterine Speciali",
        luogo: "Sala delle letterine speciali",
        scena: "Le letterine speciali vanno ai bambini sotto i dodici anni che sono stati bravi oppure hanno scritto la letterina: una condizione si somma a un'altra, che a sua volta ne contiene due.",
        immagine: "room-14-speciali.jpg",
        descrizioneImmagine: "Sala con un grande tavolo coperto di lettere decorate con nastri dorati, un elfo con una lente d'ingrandimento, candele e rotoli di carta rossa.",
        codice: "int eta = 9;\nint bravo = 0;\nint letterina = 0;\nif ((eta < 12) && ((bravo == 1) || (letterina == 1))) {\n    cout << \"Regalo\";\n} else {\n    cout << \"Carbone\";\n}",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Carbone", "Regalo", "Errore di compilazione"],
        impronta: 2481508620,
        lettera: "C",
        spiegazione: "`(eta < 12)` è vera, ma `((bravo == 1) || (letterina == 1))` è falsa perché entrambe le condizioni interne sono false: l'AND è falso e si stampa `Carbone`."
    },
    {
        id: "N15",
        emoji: "🌠",
        titolo: "La Pista di Decollo",
        luogo: "Pista di decollo",
        scena: "Prima del decollo il capo pilota controlla l'orario: la slitta parte tra le 22 e le 24, con la mezzanotte esclusa.",
        immagine: "room-15-pista.jpg",
        descrizioneImmagine: "Pista di neve illuminata da lanterne, una grande slitta rossa pronta al decollo, renne in fila e un orologio di legno gigante che segna quasi le undici.",
        codice: "if ((ore >= 22) && (ore < 24)) {\n    cout << \"Parti\";\n}",
        domanda: "Quale struttura con `if` annidati ha lo stesso comportamento del codice mostrato?",
        opzioni: ["`if (ore >= 22) { if (ore < 24) { cout << \"Parti\"; } }`", "`if (ore > 22) { if (ore < 24) { cout << \"Parti\"; } }`", "`if (ore >= 22) { if (ore <= 24) { cout << \"Parti\"; } }`"],
        impronta: 913960674,
        lettera: "O",
        spiegazione: "I due `if` annidati richiedono entrambe le condizioni, come `&&`, ma solo se i confini sono identici: 22 incluso e 24 escluso."
    },
    {
        id: "N16",
        emoji: "✨",
        titolo: "Il Laboratorio delle Luci",
        luogo: "Laboratorio delle luci",
        scena: "Le luci dell'albero hanno tre interruttori, A, B e C. L'elfo elettricista le accende quando vale la condizione `((A && B) || C)`.",
        immagine: "room-16-luci.jpg",
        descrizioneImmagine: "Laboratorio con matasse di lucine colorate appese al soffitto, tre interruttori su un pannello, un elfo elettricista che prova una ghirlanda accesa.",
        codice: "",
        domanda: "In quante delle 8 combinazioni di A, B e C l'espressione `((A && B) || C)` vale Vero?",
        opzioni: ["5", "4", "6"],
        impronta: 228475753,
        lettera: "N",
        spiegazione: "Con C vera l'espressione è sempre vera (4 combinazioni); con C falsa serve `(A && B)`, che dà ancora una combinazione. In totale 5."
    },
    {
        id: "N17",
        emoji: "🔍",
        titolo: "Il Controllo Qualità",
        luogo: "Reparto controllo qualità",
        scena: "Il controllore usa i numeri come condizioni: zero significa falso, qualsiasi altro valore significa vero.",
        immagine: "room-17-qualita.jpg",
        descrizioneImmagine: "Reparto con un nastro trasportatore carico di pacchi, un elfo con un timbro e una lista di controllo, scaffali di nastri e fiocchi colorati.",
        codice: "int pacchi = 2;\nint nastri = 0;\nif ((pacchi && nastri) || (!nastri)) {\n    cout << \"Pronto\";\n} else {\n    cout << \"Incompleto\";\n}",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Pronto", "Incompleto", "Errore di compilazione"],
        impronta: 2994247095,
        lettera: "U",
        spiegazione: "`pacchi` vale 2 (vero) e `nastri` vale 0 (falso): `(pacchi && nastri)` è falsa, ma `(!nastri)` è vera; con `||` la condizione è vera e si stampa `Pronto`."
    },
    {
        id: "N18",
        emoji: "🧊",
        titolo: "La Ghiacciaia",
        luogo: "Ghiacciaia",
        scena: "In ghiacciaia le stelle di zucchero devono essere tra 3 e 9 per cassetta: l'allarme suona quando il numero esce da questo intervallo.",
        immagine: "room-18-ghiacciaia.jpg",
        descrizioneImmagine: "Grotta di ghiaccio azzurra usata come dispensa, cassette di legno con stelle di zucchero, stalattiti luminose, un elfo imbacuccato con una lanterna.",
        codice: "",
        domanda: "Quale condizione è vera quando `stelle` NON è nell'intervallo da 3 a 9, estremi inclusi?",
        opzioni: ["`((stelle < 3) || (stelle > 9))`", "`((stelle < 3) && (stelle > 9))`", "`((stelle <= 3) || (stelle >= 9))`"],
        impronta: 39284601,
        lettera: "N",
        spiegazione: "Negare `((stelle >= 3) && (stelle <= 9))` significa invertire i confronti e usare `||`: `((stelle < 3) || (stelle > 9))`. Con `&&` la condizione sarebbe impossibile."
    },
    {
        id: "N19",
        emoji: "⚙️",
        titolo: "La Sala delle Macchine",
        luogo: "Sala delle macchine",
        scena: "Il Folletto Bug ha lasciato due versioni dello stesso controllo, una con `if` annidati e una con una condizione composta. Una delle due non si comporta come l'altra.",
        immagine: "room-19-macchine.jpg",
        descrizioneImmagine: "Sala di ingranaggi giganti di ottone, tubi e manometri, una grande macchina con leve e lucine, un folletto dispettoso che scappa in un angolo.",
        codice: "// Frammento 1\nif (volume >= 10) {\n    if (grado > 3) {\n        cout << \"Via\";\n    }\n}\n\n// Frammento 2\nif ((volume > 10) && (grado > 3)) {\n    cout << \"Via\";\n}",
        domanda: "Con `volume` uguale a 10 e `grado` uguale a 5, che cosa succede?",
        opzioni: ["Solo il frammento 1 stampa `Via`", "Entrambi stampano `Via`", "Nessuno dei due stampa `Via`"],
        impronta: 1312189769,
        lettera: "I",
        spiegazione: "Nel frammento 1 `(volume >= 10)` è vera con 10 e anche `(grado > 3)` è vera: stampa `Via`. Nel frammento 2 `(volume > 10)` è falsa con 10: non stampa nulla. Il confine cambia il comportamento."
    },
    {
        id: "N20",
        emoji: "🌟",
        titolo: "L'Albero di Natale",
        luogo: "Piazza dell'albero",
        scena: "Eccoti davanti all'albero: per accendere la stella e salvare il Natale devi superare l'ultimo controllo della Macchina dei Doni.",
        immagine: "room-20-albero.jpg",
        descrizioneImmagine: "Grande albero di Natale in una piazza innevata, decorato con palline e luci, con una stella dorata che brilla sulla cima; elfi e renne attorno, cielo stellato.",
        codice: "int regali = 12;\nint elfi = 2;\nint neve = 1;\nif ((regali > 10) && (elfi < 3)) {\n    if (neve == 1) {\n        cout << \"Aiuto \";\n    } else {\n        cout << \"Slitta \";\n    }\n} else if (regali > 10) {\n    cout << \"Renne \";\n} else {\n    cout << \"Riposo \";\n}\ncout << \"Natale\";",
        domanda: "Che cosa stampa il programma?",
        opzioni: ["Aiuto Natale", "Renne Natale", "Slitta Natale"],
        impronta: 7199494,
        lettera: "F",
        spiegazione: "`((regali > 10) && (elfi < 3))` è vera (12 > 10 e 2 < 3): si entra nel primo ramo e, con `neve` uguale a 1, si stampa `Aiuto `; poi `Natale`."
    }
];

const cTotaleEnigmi = cEnigmi.length;
const cNumeroOpzioni = 3;
const cEtichetteOpzioni = ["A", "B", "C"];

// Cartella che contiene le illustrazioni degli enigmi (un'immagine per ogni tappa del Polo Nord)
const cCartellaImmagini = "immagini/";

// Le lettere raccolte compongono la frase "SALVA IL NATALE CON UN IF": la somma deve essere uguale a cTotaleEnigmi
const cLunghezzeParole = [5, 2, 6, 3, 2, 2];

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
const cNumeroRenne = 7;
const cNumeroFiocchi = 16;

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
let partitaIniziata = false;     // true dopo aver premuto "Entra al Polo Nord"
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
            etichettaBonus.textContent = "🎁 Bonus ottenuto!";
        } else {
            etichettaBonus.textContent = "🎁 Bonus non ottenuto";
        }
    } else if (bonusRispettato) {
        etichettaBonus.textContent = "🎁 Bonus ancora possibile";
    } else {
        etichettaBonus.textContent = "🎁 Bonus non più possibile";
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

// Crea le renne che attraversano lo schermo, con altezza, velocità e dimensione casuali
function creaRenne() {
    const contenitore = document.getElementById("particles");

    for (let i = 0; i < cNumeroRenne; i++) {
        const renna = document.createElement("div");

        renna.className = "renna";
        renna.textContent = "🦌";
        renna.style.top = (5 + Math.random() * 60) + "%";
        renna.style.animationDuration = (16 + Math.random() * 18) + "s";
        renna.style.animationDelay = (Math.random() * 20) + "s";
        renna.style.fontSize = (1 + Math.random() * 1.4) + "rem";
        contenitore.appendChild(renna);
    }
}

// Crea i fiocchi di neve che cadono dall'alto: sono disegnati con il CSS, non con un emoji
function creaFiocchi() {
    const contenitore = document.getElementById("particles");

    for (let i = 0; i < cNumeroFiocchi; i++) {
        const fiocco = document.createElement("div");
        const dimensione = 6 + Math.random() * 8;

        fiocco.className = "fiocco";
        fiocco.style.left = (Math.random() * 100) + "%";
        fiocco.style.width = dimensione + "px";
        fiocco.style.height = dimensione + "px";
        fiocco.style.animationDuration = (7 + Math.random() * 9) + "s";
        fiocco.style.animationDelay = (Math.random() * 14) + "s";
        contenitore.appendChild(fiocco);
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
        areaEnigma.innerHTML = '<div class="waiting-screen">🌟 Tutti gli enigmi risolti! 🌟</div>';
        return;
    }

    const enigma = cEnigmi[indiceCorrente];
    const card = document.createElement("div");
    let etichettaAvanti = "➡️ Prossimo enigma";
    let bloccoCodice = "";

    // All'ultimo enigma non esiste un "prossimo": il pulsante accende la stella
    if (indiceCorrente === cTotaleEnigmi - 1) {
        etichettaAvanti = "🌟 Accendi la stella";
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
        feedback.innerHTML = "🎅 <strong>Sbagliato!</strong> -" + cPenalitaErrore + " punto. Riprova... il Folletto Bug se la ride.";

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
            '<div class="waiting-screen">🌟 Tutti gli enigmi risolti! 🌟</div>';
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

// Unisce le lettere raccolte in parole separate da uno spazio (SALVA IL NATALE CON UN IF)
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

// Riporta il gioco alla situazione iniziale: si torna alla schermata con il pulsante "Entra al Polo Nord"
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
creaRenne();
creaFiocchi();
mostraLettere();
aggiornaProgresso();
aggiornaStatistiche();
