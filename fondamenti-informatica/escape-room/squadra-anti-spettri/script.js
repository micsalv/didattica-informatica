/*
    Autore: Michele Salvemini
    Classe: Prime - studenti che hanno studiato le dispense Lez07 (Architettura degli Elaboratori) e Lez08 (Il Sistema Operativo)
    Argomento: Fondamenti di Informatica - architettura degli elaboratori e sistema operativo
    Obiettivo: Gestire l'escape room: mostrare un enigma alla volta con risposte mescolate, verificare la risposta, assegnare una lettera, misurare il tempo, calcolare il punteggio e comporre la frase finale
    Versione: 1.0
    Data: 02/11/2026
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
//   codice                                   -> schema o dato da analizzare (può essere vuoto)
//   opzioni                                  -> le tre risposte possibili (l'ordine qui NON è quello mostrato)
//   impronta                                 -> numero calcolato dalla risposta corretta (non indica quale sia)
//   lettera                                  -> lettera assegnata quando l'enigma viene risolto
//   spiegazione                              -> commento mostrato dopo la risposta corretta
// Nei testi i frammenti di codice vanno scritti tra apici inversi (`testo`): vengono mostrati
// come codice e i caratteri < > & non vengono interpretati come HTML.
const cEnigmi = [
    {
        id: "S01",
        emoji: "🚪",
        titolo: "Il Portone della Sede",
        luogo: "Ingresso della Sede",
        scena: "È la notte di Halloween a Binaropoli. Davanti al portone della Sede della Squadra Anti-Spettri un custode robotico ti consegna il distintivo: per entrare devi saper leggere i dati del tuo computer di bordo.",
        immagine: "room-01-ingresso.jpg",
        descrizioneImmagine: "Portone metallico con una grande lente circolare luminosa, zucche intagliate ai lati e nebbia viola; un custode robotico porge un distintivo a una recluta.",
        codice: "",
        domanda: "Il processore del computer di bordo lavora a 4 GHz. Che cosa significa?",
        opzioni: ["Compie 4 miliardi di cicli al secondo", "Compie 4 milioni di cicli al secondo", "Ha 4 gigabyte di memoria principale"],
        impronta: 1186275416,
        lettera: "C",
        spiegazione: "La frequenza del clock si misura in hertz: 1 MHz corrisponde a un milione di cicli al secondo, 1 GHz a un miliardo."
    },
    {
        id: "S02",
        emoji: "📋",
        titolo: "Il Briefing della Caposquadra",
        luogo: "Sala briefing",
        scena: "Nella sala briefing la caposquadra spiega che tutte le apparecchiature della Sede, dai rilevatori ai computer, si appoggiano a un unico strato di software.",
        immagine: "room-02-briefing.jpg",
        descrizioneImmagine: "Sala con una lavagna luminosa piena di schemi, una caposquadra dai capelli grigi che indica uno schermo e tre reclute sedute; un piccolo spettro sul soffitto.",
        codice: "",
        domanda: "Qual è il ruolo del sistema operativo?",
        opzioni: ["Fa da strato tra hardware e applicazioni e nasconde i dettagli fisici", "È la parte fisica del computer che esegue tutti i calcoli del processore", "È un programma applicativo che serve a scrivere e modificare documenti"],
        impronta: 3986672792,
        lettera: "A",
        spiegazione: "Il sistema operativo è uno strato software che esonera utenti e programmatori dal doversi occupare dei dettagli dell'hardware."
    },
    {
        id: "S03",
        emoji: "🔌",
        titolo: "Il Rilevatore Cablato",
        luogo: "Laboratorio dei cavi",
        scena: "Il rilevatore di spettri trasmette moltissimi dati e non può perdere il segnale: serve un collegamento con cavo, più veloce e stabile del Wi-Fi.",
        immagine: "room-03-cavi.jpg",
        descrizioneImmagine: "Laboratorio con armadi di rete e spie luminose; un tecnico collega un cavo spesso a un rilevatore a forma di antenna, mentre un fantasmino attorciglia i cavi sul pavimento.",
        codice: "",
        domanda: "Quale porta collega il computer alla rete con un cavo?",
        opzioni: ["Ethernet (RJ45)", "HDMI (audio e video)", "PS/2 (tastiera e mouse)"],
        impronta: 3275738186,
        lettera: "T",
        spiegazione: "La porta Ethernet (RJ45) collega il computer alla rete con cavo, in modo più veloce e stabile del Wi-Fi."
    },
    {
        id: "S04",
        emoji: "🩺",
        titolo: "L'Autodiagnosi",
        luogo: "Cabina diagnostica",
        scena: "Prima di ogni missione la cabina diagnostica controlla che tutti i componenti dell'equipaggiamento funzionino: se qualcosa non va, la porta resta chiusa.",
        immagine: "room-04-diagnostica.jpg",
        descrizioneImmagine: "Cabina circolare con pannelli di luci verdi che si accendono una dopo l'altra; una recluta al centro attraversata da un anello di luce e una zucca-lampada sul tavolo.",
        codice: "",
        domanda: "Come si chiama la verifica dei componenti che il computer esegue appena acceso?",
        opzioni: ["POST", "GUI", "Backup"],
        impronta: 25803388,
        lettera: "T",
        spiegazione: "Il POST (Power-On Self-Test) verifica che i componenti fisici siano integri e funzionanti prima di caricare il sistema operativo."
    },
    {
        id: "S05",
        emoji: "⚡",
        titolo: "Il Cuore del Generatore",
        luogo: "Centrale del generatore",
        scena: "Il generatore della Sede pulsa al ritmo del clock: per capire quanta energia produce devi contare gli impulsi in pochi secondi.",
        immagine: "room-05-generatore.jpg",
        descrizioneImmagine: "Un enorme generatore cilindrico trasparente con un cuore di luce verde che pulsa, indicatori a lancetta e un grande orologio a ingranaggi sul muro.",
        codice: "CPU: 2 GHz\nTempo: 3 secondi",
        domanda: "Quanti cicli di clock compie la CPU in 3 secondi?",
        opzioni: ["6 miliardi (6 × 10⁹)", "6 milioni (6 × 10⁶)", "2 miliardi (2 × 10⁹)"],
        impronta: 3125557904,
        lettera: "U",
        spiegazione: "2 GHz sono 2 × 10⁹ cicli al secondo: in 3 secondi 2 × 10⁹ × 3 = 6 × 10⁹ cicli."
    },
    {
        id: "S06",
        emoji: "🏚️",
        titolo: "La Villa dei Turni",
        luogo: "Villa stregata",
        scena: "Nella villa stregata ogni stanza si ferma quando il custode dà il segnale, ma lo spettro che la abita ricorda esattamente dove era arrivato.",
        immagine: "room-06-villa.jpg",
        descrizioneImmagine: "Villa stregata su una collina con finestre viola illuminate e piccole stanze fluttuanti legate alla casa da fili di luce, sotto la luna piena.",
        codice: "",
        domanda: "Allo scadere del quanto di tempo, che cosa fa il kernel prima di assegnare la CPU al processo successivo?",
        opzioni: ["Salva lo stato del processo, che potrà così riprendere da dove era arrivato", "Cancella il processo sospeso dalla memoria e lo riavvia più tardi da zero", "Chiude le applicazioni collegate al processo e libera tutta la memoria"],
        impronta: 3389750317,
        lettera: "R",
        spiegazione: "Il kernel sospende il processo, ne salva lo stato e assegna la CPU a un altro: il processo sospeso riprenderà esattamente da dove si era fermato."
    },
    {
        id: "S07",
        emoji: "🕯️",
        titolo: "Il Blackout dell'Archivio",
        luogo: "Archivio",
        scena: "Un blackout improvviso spegne la Sede. Quando la corrente torna, nell'archivio mancano le schede su cui stavate lavorando proprio in quel momento.",
        immagine: "room-07-archivio.jpg",
        descrizioneImmagine: "Archivio al buio con scaffali di schedari illuminati da candele, cartellini che svaniscono come fumo e un archivista con una torcia.",
        codice: "",
        domanda: "Dopo uno spegnimento improvviso, quali dati vanno persi?",
        opzioni: ["I dati nella RAM, perché è una memoria volatile", "Quelli salvati sull'SSD, perché si trova sulla scheda madre", "Il firmware contenuto nella ROM, perché è collegato alla RAM"],
        impronta: 1019383629,
        lettera: "A",
        spiegazione: "La RAM è volatile: senza alimentazione perde il contenuto. Le memorie di massa e la ROM sono non volatili e conservano i dati."
    },
    {
        id: "S08",
        emoji: "🔐",
        titolo: "Il Caveau dei Permessi",
        luogo: "Caveau",
        scena: "Il caveau degli strumenti si apre solo a chi ha il permesso giusto: un tecnico deve lanciare il programma di analisi dello spettrometro.",
        immagine: "room-08-caveau.jpg",
        descrizioneImmagine: "Caveau metallico con una porta circolare dalle serrature luminose; sul pavimento tre simboli luminosi: un occhio, una matita e un ingranaggio.",
        codice: "",
        domanda: "Quale permesso serve per eseguire un file che è un programma?",
        opzioni: ["Esecuzione (Execute)", "Lettura e scrittura (Read, Write)", "Solo lettura (Read)"],
        impronta: 3422728760,
        lettera: "I",
        spiegazione: "Il permesso di esecuzione consente di eseguire il file se è un programma; lettura e scrittura riguardano la visualizzazione e la modifica del contenuto."
    },
    {
        id: "S09",
        emoji: "💽",
        titolo: "Il Magazzino dei Dischi",
        luogo: "Magazzino dei dischi",
        scena: "Per recuperare un fascicolo dal vecchio schedario, un braccio meccanico deve prima posizionarsi e perde minuti preziosi; l'archivio nuovo risponde subito.",
        immagine: "room-09-dischi.jpg",
        descrizioneImmagine: "Magazzino con un grande disco meccanico dal braccio lento e un fantasma in attesa, accanto a una lastra elettronica sottile e luminosa da cui parte un fascio istantaneo.",
        codice: "",
        domanda: "Perché un SSD è molto più rapido di un HDD?",
        opzioni: ["Perché è elettronico e non ha testine meccaniche da muovere", "Perché ha più dischi magnetici rotanti al suo interno", "Perché si collega al computer con una porta Ethernet più veloce"],
        impronta: 2320828419,
        lettera: "L",
        spiegazione: "L'HDD ha dischi rotanti e testine meccaniche con tempi morti di posizionamento; l'SSD è elettronico, senza parti meccaniche, e molto più veloce."
    },
    {
        id: "S10",
        emoji: "🛠️",
        titolo: "La Webcam Speciale",
        luogo: "Officina delle periferiche",
        scena: "Hai ricevuto una webcam speciale per i sopralluoghi: collegata al computer funziona, ma le sue funzioni avanzate non si attivano.",
        immagine: "room-10-officina.jpg",
        descrizioneImmagine: "Officina con un banco su cui sta una webcam sferica; un tecnico inserisce un chip e un interprete robotico con cuffia traduce tra due strumenti.",
        codice: "",
        domanda: "Quale software serve per usare le funzioni specifiche di una periferica particolare?",
        opzioni: ["Il driver del produttore", "Un compilatore per i programmi", "Un punto di ripristino del sistema"],
        impronta: 3603254689,
        lettera: "P",
        spiegazione: "Il driver fa da interprete tra il sistema operativo e la periferica: per le periferiche particolari serve quello del produttore."
    },
    {
        id: "S11",
        emoji: "🧵",
        titolo: "La Rete della Centrale",
        luogo: "Centrale dei collegamenti",
        scena: "Nella centrale i quattro grandi quadri della Sede comunicano grazie a una fitta rete di linee elettriche che corre lungo le pareti.",
        immagine: "room-11-centrale.jpg",
        descrizioneImmagine: "Quattro grandi quadri luminosi collegati da tubi di luce lungo le pareti; una recluta segue un tubo con una lanterna.",
        codice: "",
        domanda: "Nel modello di von Neumann, che cosa permette il passaggio di dati e comandi tra i componenti?",
        opzioni: ["Il bus", "Il registro", "Il compilatore"],
        impronta: 741751251,
        lettera: "O",
        spiegazione: "Il bus è l'insieme delle linee elettriche di collegamento che permette il passaggio di dati e comandi tra CPU, memoria e periferiche."
    },
    {
        id: "S12",
        emoji: "🖥️",
        titolo: "Le Tre Analisi",
        luogo: "Torre dei server",
        scena: "I server della Torre lavorano tutta la notte: il tecnico di turno avvia tre volte lo stesso programma di analisi per controllare tre zone della città.",
        immagine: "room-12-server.jpg",
        descrizioneImmagine: "Torre di server con spie verdi e tre schermi identici che mostrano la stessa analisi; una tecnica concentrata e fantasmi tra i rack.",
        codice: "",
        domanda: "Un tecnico avvia tre volte lo stesso programma. Che cosa si ottiene?",
        opzioni: ["Tre processi, tutti generati dallo stesso programma", "Un solo processo, che si divide in tre thread", "Un solo processo, perché il programma è uno solo"],
        impronta: 1460965712,
        lettera: "L",
        spiegazione: "Il programma è il codice memorizzato su una memoria di massa; ogni avvio crea un processo distinto. Dallo stesso programma nascono quindi tanti processi indipendenti."
    },
    {
        id: "S13",
        emoji: "🧮",
        titolo: "Il Calcolo e la Memoria Rapida",
        luogo: "Laboratorio di calcolo",
        scena: "Un'istruzione somma due misure dello spettrometro e deve custodire il risultato per un istante, prima di archiviarlo definitivamente.",
        immagine: "room-13-laboratorio.jpg",
        descrizioneImmagine: "Macchina trasparente con un'unità di calcolo a simboli, cassettini luminosi per i risultati temporanei e un direttore d'orchestra robot che coordina.",
        codice: "",
        domanda: "Quale parte della CPU esegue la somma e quale conserva temporaneamente il risultato prima dell'invio alla RAM?",
        opzioni: ["L'ALU esegue la somma; i registri conservano il risultato", "I registri eseguono la somma; l'ALU conserva il risultato", "L'unità di controllo esegue la somma; il clock conserva il risultato"],
        impronta: 714709082,
        lettera: "T",
        spiegazione: "L'ALU esegue i calcoli e i confronti logici; i registri sono celle velocissime dentro la CPU che conservano i dati temporanei prima dell'invio alla RAM."
    },
    {
        id: "S14",
        emoji: "🎭",
        titolo: "Il Teatro dei Turni",
        luogo: "Teatro dell'Opera",
        scena: "Sul palco i fantasmi recitano a turni brevissimi, ma se i cambi di scena fossero troppo frequenti lo spettacolo non andrebbe mai avanti.",
        immagine: "room-14-teatro.jpg",
        descrizioneImmagine: "Teatro abbandonato con spettri attori che recitano a turno sul palco e un direttore di scena con un grande orologio; un riflettore passa da un attore all'altro.",
        codice: "",
        domanda: "Perché il kernel non cambia processo continuamente, dando a ciascuno la CPU per un solo istante?",
        opzioni: ["Perché passare troppo spesso da un processo all'altro fa perdere tempo", "Perché ogni processo ha bisogno di un core dedicato e tutto per sé", "Perché la RAM verrebbe cancellata a ogni cambio di processo"],
        impronta: 507814989,
        lettera: "E",
        spiegazione: "Ogni cambio di processo richiede tempo: per questo a ciascun processo si assegna un quanto di tempo che contiene milioni di istruzioni."
    },
    {
        id: "S15",
        emoji: "🗺️",
        titolo: "Il Plastico delle Schede Madri",
        luogo: "Sala macchine",
        scena: "Nella sala macchine due schede madri sono esposte come plastici: una più grande con molte fessure di espansione, una più piccola con poche.",
        immagine: "room-15-sala-macchine.jpg",
        descrizioneImmagine: "Due schede madri giganti esposte come plastici su tavoli, una grande con molte fessure e una più piccola con poche; una tecnica con metro e fogli di progetto.",
        codice: "",
        domanda: "ATX e Micro-ATX sono due esempi di quale caratteristica della scheda madre, che determina anche il numero di slot di espansione?",
        opzioni: ["Il form factor", "Il chipset della scheda", "La frequenza di clock"],
        impronta: 2681007168,
        lettera: "R",
        spiegazione: "Il form factor è lo standard di dimensioni, forma e disposizione della scheda madre (ATX, Micro-ATX...) e ne determina il numero di slot di espansione."
    },
    {
        id: "S16",
        emoji: "🕳️",
        titolo: "Il Chip Vuoto",
        luogo: "Corridoio buio",
        scena: "Un fantasma ha cancellato il chip con le istruzioni di avvio: il computer della Sede si accende, ma resta muto.",
        immagine: "room-16-corridoio.jpg",
        descrizioneImmagine: "Lungo corridoio buio; una porta socchiusa da cui sbuca un chip rettangolare vuoto tenuto da una mano trasparente; una lanterna illumina una scheda con spie spente.",
        codice: "",
        domanda: "Se la ROM con il BIOS/UEFI fosse vuota, che cosa accadrebbe all'accensione?",
        opzioni: ["Il SO non verrebbe caricato, perché mancherebbero le istruzioni di avvio", "Il sistema operativo partirebbe lo stesso, ma in modo molto più lento", "Il computer userebbe la RAM al posto della ROM e si avvierebbe normalmente"],
        impronta: 3317041925,
        lettera: "G",
        spiegazione: "All'accensione la RAM è vuota e il sistema operativo è su una memoria di massa: serve il firmware nella ROM, che parte per primo e lo carica."
    },
    {
        id: "S17",
        emoji: "🌡️",
        titolo: "La Sala delle Ventole",
        luogo: "Sala delle ventole",
        scena: "Il portatile usato sul letto durante la veglia si scalda, rallenta e poi si spegne da solo: qualcosa impedisce al calore di uscire.",
        immagine: "room-17-ventole.jpg",
        descrizioneImmagine: "Sala con grandi ventole industriali e nuvole di polvere; un portatile fumante appoggiato su un letto di cuscini, una recluta che lo ventila e un termometro gigante.",
        codice: "",
        domanda: "Quale combinazione di cause può provocare il surriscaldamento del computer?",
        opzioni: ["Prese d'aria ostruite, polvere accumulata e overclocking", "Troppa RAM installata e un SSD montato al posto dell'HDD", "Uso della porta USB al posto della porta HDMI per lo schermo"],
        impronta: 1827671604,
        lettera: "E",
        spiegazione: "Il calore non smaltito dipende da prese d'aria ostruite, polvere e overclocking; se non viene smaltito il computer rallenta e può spegnersi."
    },
    {
        id: "S18",
        emoji: "🛡️",
        titolo: "La Camera Blindata",
        luogo: "Camera blindata",
        scena: "Uno spettro dispettoso ha messo fuori uso il disco della Sede: i dati più preziosi si salvano solo se ne esiste una copia al sicuro, lontano dal disco guasto.",
        immagine: "room-18-camera-blindata.jpg",
        descrizioneImmagine: "Camera blindata con scaffali di dischi esterni e una nuvola luminosa sul soffitto; uno spettro ladro bloccato fuori da una grata e uno scudo luminoso.",
        codice: "",
        domanda: "Quale protezione serve per non perdere i dati personali in caso di guasto del disco o di attacco informatico?",
        opzioni: ["Un backup su un supporto esterno o su un servizio cloud", "Un punto di ripristino salvato sullo stesso disco del sistema", "Un programma applicativo di grafica"],
        impronta: 1089414871,
        lettera: "I",
        spiegazione: "Il backup è una copia dei dati conservata su un supporto diverso (esterno o cloud): protegge da guasti e attacchi. Il punto di ripristino, creato dal sistema, serve ad annullare un aggiornamento fallito."
    },
    {
        id: "S19",
        emoji: "📜",
        titolo: "La Macchina Traduttrice",
        luogo: "Tipografia dei codici",
        scena: "Il manuale degli spettri è scritto in un linguaggio vicino alle parole degli esseri umani: perché la macchina lo capisca serve un lavoro di traduzione.",
        immagine: "room-19-tipografia.jpg",
        descrizioneImmagine: "Macchina a ingranaggi che riceve fogli leggibili da un lato e produce nastri di zeri e uno dall'altro; un traduttore robotico controlla il lavoro.",
        codice: "",
        domanda: "Quale sequenza descrive il percorso di un programma scritto in C fino alla sua esecuzione?",
        opzioni: ["Codice in C → compilatore → codice macchina → CPU", "Codice in C → CPU → compilatore → codice macchina", "Codice macchina → compilatore → codice in C → CPU"],
        impronta: 1893449621,
        lettera: "S",
        spiegazione: "Il compilatore traduce il programma ad alto livello in codice macchina, che la CPU può eseguire direttamente."
    },
    {
        id: "S20",
        emoji: "👻",
        titolo: "Il Covo del Poltergeist Blocco",
        luogo: "Sala server del Poltergeist",
        scena: "Il Poltergeist Blocco è in fondo al corridoio: ha avviato due volte lo stesso strumento e, in ciascun processo, ha attivato più thread. Per fermarlo devi capire che cosa condividono.",
        immagine: "room-20-poltergeist.jpg",
        descrizioneImmagine: "Lo spettro Blocco, azzurro traslucido con bordi a pixel e occhi rettangolari, intrappolato nel fascio viola di tre lanterne tra cavi sospesi; la squadra al completo.",
        codice: "",
        domanda: "Un programma ha generato due processi, ciascuno con tre thread. Quale affermazione è corretta?",
        opzioni: ["I thread di un processo condividono la sua memoria; i processi sono indipendenti", "Tutti e sei i thread, anche di processi diversi, condividono la stessa memoria", "I thread sono processi indipendenti, ognuno con la propria memoria separata"],
        impronta: 2316272757,
        lettera: "T",
        spiegazione: "I thread di uno stesso processo condividono lo spazio di memoria di quel processo; processi diversi sono invece indipendenti."
    }
];

const cTotaleEnigmi = cEnigmi.length;
const cNumeroOpzioni = 3;
const cEtichetteOpzioni = ["A", "B", "C"];

// Cartella che contiene le illustrazioni degli enigmi (un'immagine per ogni tappa della Sede)
const cCartellaImmagini = "immagini/";

// Le lettere raccolte compongono la frase "CATTURA IL POLTERGEIST": la somma deve essere uguale a cTotaleEnigmi
const cLunghezzeParole = [7, 2, 11];

// Tempo (in millisecondi) per cui resta visibile il messaggio di errore prima di poter riprovare
const cRitardoRiprovaMs = 1500;

// Regole del punteggio
const cPuntiRispostaCorretta = 5;   // punti guadagnati per ogni enigma risolto
const cPenalitaErrore = 1;          // punti tolti per ogni risposta sbagliata
const cPuntiBonus = 10;             // punti aggiunti se si rispettano entrambe le condizioni del bonus
const cMinutiBonus = 30;            // condizione 1: finire entro questo numero di minuti
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
const cNumeroFantasmi = 7;
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
let partitaIniziata = false;     // true dopo aver premuto "Entra nella Sede"
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
            etichettaBonus.textContent = "⚡ Bonus ottenuto!";
        } else {
            etichettaBonus.textContent = "⚡ Bonus non ottenuto";
        }
    } else if (bonusRispettato) {
        etichettaBonus.textContent = "⚡ Bonus ancora possibile";
    } else {
        etichettaBonus.textContent = "⚡ Bonus non più possibile";
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
function creaFantasmi() {
    const contenitore = document.getElementById("particles");

    for (let i = 0; i < cNumeroFantasmi; i++) {
        const fantasma = document.createElement("div");

        fantasma.className = "ghost";
        fantasma.textContent = "👻";
        fantasma.style.top = (5 + Math.random() * 60) + "%";
        fantasma.style.animationDuration = (16 + Math.random() * 18) + "s";
        fantasma.style.animationDelay = (Math.random() * 20) + "s";
        fantasma.style.fontSize = (1 + Math.random() * 1.4) + "rem";
        contenitore.appendChild(fantasma);
    }
}

// Crea le gocce di ectoplasma che cadono dall'alto: sono disegnate con il CSS, non con un emoji
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

// Sostituisce un'immagine non trovata con un riquadro che riporta l'emoji e la descrizione della tappa
function sostituisciImmagineMancante(immagine, enigma) {
    const segnaposto = document.createElement("div");

    segnaposto.className = "card-image-placeholder";
    segnaposto.setAttribute("role", "img");
    segnaposto.setAttribute("aria-label", enigma.descrizioneImmagine);
    segnaposto.textContent = enigma.emoji;
    immagine.replaceWith(segnaposto);
}

// Mostra nell'area centrale la card dell'enigma corrente (o il messaggio finale)
function mostraEnigmaCorrente() {
    const areaEnigma = document.getElementById("card-area");
    areaEnigma.innerHTML = "";

    if (indiceCorrente >= cTotaleEnigmi) {
        areaEnigma.innerHTML = '<div class="waiting-screen">🔦 Tutti gli enigmi risolti! 🔦</div>';
        return;
    }

    const enigma = cEnigmi[indiceCorrente];
    const card = document.createElement("div");
    let etichettaAvanti = "➡️ Prossimo enigma";
    let bloccoCodice = "";

    // All'ultimo enigma non esiste un "prossimo": il pulsante apre il portone
    if (indiceCorrente === cTotaleEnigmi - 1) {
        etichettaAvanti = "🔦 Accendi la lampada";
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

    // Se il file dell'illustrazione non è ancora presente, mostra un segnaposto con l'emoji della tappa
    const immagineCard = card.querySelector(".card-image");
    immagineCard.addEventListener("error", function () {
        sostituisciImmagineMancante(immagineCard, enigma);
    });

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
        feedback.innerHTML = "👻 <strong>Sbagliato!</strong> -" + cPenalitaErrore + " punto. Riprova... il Poltergeist si fa più vicino.";

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
            '<div class="waiting-screen">🔦 Tutti gli enigmi risolti! 🔦</div>';
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

// Unisce le lettere raccolte in parole separate da uno spazio (CATTURA IL POLTERGEIST)
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

// Riporta il gioco alla situazione iniziale: si torna alla schermata con il pulsante "Entra nella Sede"
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
creaFantasmi();
creaGocce();
mostraLettere();
aggiornaProgresso();
aggiornaStatistiche();
