/*
    Autore: Michele Salvemini
    Classe: studenti che hanno svolto le esercitazioni HTML (HTM010-HTM170)
    Argomento: HTML5 - struttura del documento, testi, liste, tabelle, immagini e collegamenti
    Obiettivo: Gestire l'escape room: mostrare un enigma alla volta con risposte
               mescolate, verificare la risposta, assegnare una lettera, misurare
               il tempo, calcolare il punteggio e comporre la parola chiave finale
    Versione: 1.1
    Data: 25/10/2026
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
        id: "V01",
        emoji: "🚪",
        titolo: "Il Portone di Quercia",
        luogo: "Ingresso",
        scena: "Il portone di quercia si richiude con un tonfo, lasciando solo uno spiraglio di luna. Dall'ombra una voce cavernosa, quella del Conte Markup, recita la struttura di una pagina: risolvi l'enigma e la porta interna si apre.",
        immagine: "room-01-portone.jpg",
        descrizioneImmagine: "Portone di quercia socchiuso nella penombra: dallo spiraglio entra la luce della luna e si intravede l'ombra del Conte con gli occhi luminosi, tra torce e candele.",
        codice: "<!DOCTYPE html>\n<html lang=\"it\">\n    <head>\n        <title>Castello</title>\n    </head>\n    <body>\n        <h1>Benvenuto</h1>\n    </body>\n</html>",
        domanda: "Quale parte del documento contiene tutto ciò che si vede nella pagina?",
        opzioni: ["`<head>`", "`<body>`", "`<title>`"],
        impronta: 2248057086,
        lettera: "S",
        spiegazione: "`<body>` racchiude il contenuto visibile. `<head>` contiene le informazioni non visibili, come il `<title>`."
    },
    {
        id: "V02",
        emoji: "🦇",
        titolo: "Il Pipistrello Scrivano",
        luogo: "Cortile",
        scena: "Attraversi il cortile buio e nebbioso. Un pipistrello, messaggero del Conte, ti sfreccia sulla testa e lascia cadere ai tuoi piedi una pergamena con la prima domanda.",
        immagine: "room-02-cortile.jpg",
        descrizioneImmagine: "Cortile del castello nella nebbia, sotto la luna piena: un pipistrello vola con una pergamena arrotolata tra gli artigli, mentre i gargoyle osservano dai piedistalli.",
        codice: "",
        domanda: "Quale tag scrive il titolo di livello più alto, cioè il più grande?",
        opzioni: ["`<h1>`", "`<h6>`", "`<p>`"],
        impronta: 3800302346,
        lettera: "E",
        spiegazione: "I titoli vanno da `<h1>` (il più grande) a `<h6>` (il più piccolo). `<p>` scrive un paragrafo."
    },
    {
        id: "V03",
        emoji: "🕯️",
        titolo: "Il Candelabro delle Tre Fiamme",
        luogo: "Atrio",
        scena: "La pergamena ti guida nell'atrio. Un candelabro si accende da solo e le sue tre fiamme illuminano su un tavolo gli oggetti che i vampiri temono, annotati in un elenco.",
        immagine: "room-03-atrio.jpg",
        descrizioneImmagine: "Atrio gotico con volte a crociera: su un tavolo un candelabro con tre candele accese, uno spicchio d'aglio, una croce di legno e un paletto.",
        codice: "<ul>\n    <li>Aglio</li>\n    <li>Crocifisso</li>\n    <li>Paletto</li>\n</ul>",
        domanda: "Che cosa mostra il browser accanto a ogni voce?",
        opzioni: ["I numeri 1, 2, 3", "Le lettere a, b, c", "Un punto elenco (disc)"],
        impronta: 1107877115,
        lettera: "I",
        spiegazione: "`<ul>` è una lista non ordinata: senza l'attributo `type` il browser usa il punto elenco di default (disc)."
    },
    {
        id: "V04",
        emoji: "🔑",
        titolo: "La Chiave Arrugginita",
        luogo: "Porta della scala",
        scena: "In fondo all'atrio una grande chiave arrugginita pende da una catena accanto a una porta chiusa. Sulla serratura è inciso un collegamento: indica dove porta la scala a chiocciola che sale verso lo studio del Conte.",
        immagine: "room-04-chiave.jpg",
        descrizioneImmagine: "Porta di legno con una grande serratura di ferro e una catena a cui è appesa una chiave arrugginita; accanto una scala a chiocciola sale nel buio.",
        codice: "<a href=\"cripta.html\">Entra nella cripta</a>",
        domanda: "Che cosa succede cliccando sul testo «Entra nella cripta»?",
        opzioni: ["Si apre il programma di posta", "Si apre la pagina `cripta.html`, salvata nella stessa cartella", "La pagina scorre fino a un punto della stessa pagina"],
        impronta: 1545460895,
        lettera: "L",
        spiegazione: "Un `href` con il nome di un file indica un'altra pagina dello stesso sito (percorso relativo)."
    },
    {
        id: "V05",
        emoji: "🧛",
        titolo: "Il Diario del Conte",
        luogo: "Studio del Conte",
        scena: "Sali nello studio. Sulla scrivania, alla luce di una candela, è aperto il diario del Conte: una frase, scritta con cura, nasconde la prossima prova.",
        immagine: "room-05-studio.jpg",
        descrizioneImmagine: "Scrivania del Conte con un diario aperto dalla scrittura illeggibile, una candela accesa, una penna d'oca nel calamaio e scaffali di libri scuri sullo sfondo.",
        codice: "<p>Il conte è <b>molto</b> <strong>pericoloso</strong>.</p>",
        domanda: "Quale parola ha un valore semantico di importanza, riconosciuto anche dai lettori vocali?",
        opzioni: ["pericoloso", "molto", "conte"],
        impronta: 2682176921,
        lettera: "I",
        spiegazione: "`<strong>` comunica importanza anche a motori di ricerca e lettori vocali. `<b>` cambia soltanto l'aspetto."
    },
    {
        id: "V06",
        emoji: "📜",
        titolo: "La Pergamena Preformattata",
        luogo: "Studio del Conte",
        scena: "In una cassapanca accanto alla scrivania trovi una pergamena ingiallita: è l'inventario delle difese del castello, scritto con spaziature precise che nessuno deve alterare.",
        immagine: "room-06-pergamena.jpg",
        descrizioneImmagine: "Cassapanca aperta che contiene una pergamena ingiallita, due croci di legno e spicchi d'aglio, illuminata da una candela.",
        codice: "<pre>\nAglio:    3\nCrocifissi:    2\n</pre>",
        domanda: "Come appare il testo nel browser?",
        opzioni: ["Tutto sulla stessa riga, con un solo spazio tra le parole", "In grassetto e centrato", "Spazi e a capo restano esattamente come sono scritti"],
        impronta: 3230459847,
        lettera: "B",
        spiegazione: "`<pre>` conserva spazi, tabulazioni e a capo del testo, cosa che un normale paragrafo non fa."
    },
    {
        id: "V07",
        emoji: "🍷",
        titolo: "Il Menù del Banchetto",
        luogo: "Sala del banchetto",
        scena: "Dallo studio passi nella sala da pranzo. Il maggiordomo, pallido e silenzioso, ti porge il menù della cena di mezzanotte, con le portate in un ordine preciso.",
        immagine: "room-07-banchetto.jpg",
        descrizioneImmagine: "Sala del banchetto con lunghe tavole, calici di vino rosso e candelabri accesi: un maggiordomo pallido in livrea nera porge un foglio.",
        codice: "<ol type=\"I\" start=\"3\">\n    <li>Antipasto</li>\n    <li>Primo</li>\n    <li>Secondo</li>\n</ol>",
        domanda: "Quali numeri mostra il browser accanto alle voci?",
        opzioni: ["3, 4, 5", "III, IV, V", "iii, iv, v"],
        impronta: 3646617796,
        lettera: "E",
        spiegazione: "`type=\"I\"` sceglie la numerazione romana maiuscola e `start=\"3\"` fa partire il conteggio da 3, cioè da III."
    },
    {
        id: "V08",
        emoji: "🖼️",
        titolo: "Il Ritratto Scomparso",
        luogo: "Galleria dei ritratti",
        scena: "Lungo la galleria dei ritratti una cornice dorata è vuota: resta solo il codice del quadro, che spiega che cosa dovrebbe contenere.",
        immagine: "room-08-galleria.jpg",
        descrizioneImmagine: "Galleria di ritratti antichi in cornici dorate, illuminata da candele; al centro una cornice vuota con la tela scura.",
        codice: "<img src=\"conte.jpg\" alt=\"Ritratto del Conte\" width=\"50%\">",
        domanda: "Se l'immagine non si carica, il testo di quale attributo la sostituisce e viene letto dai lettori vocali?",
        opzioni: ["`alt`", "`src`", "`width`"],
        impronta: 3310036414,
        lettera: "R",
        spiegazione: "`alt` è il testo alternativo: descrive l'immagine quando non si vede ed è letto dai lettori vocali."
    },
    {
        id: "V09",
        emoji: "🕸️",
        titolo: "La Tela del Ragno",
        luogo: "Soffitta",
        scena: "Una scala stretta porta in soffitta. Un ragno gigante ha tessuto una griglia tra le travi: per passare devi leggere la sua tela.",
        immagine: "room-09-soffitta.jpg",
        descrizioneImmagine: "Soffitta con travi di legno e una grande ragnatela regolare: al centro un ragno dall'aria simpatica, mentre un raggio di luce entra dalla finestra.",
        codice: "<table border=\"1\">\n    <caption>Vittime</caption>\n    <tr>\n        <th>Notte</th>\n        <th>Numero</th>\n    </tr>\n    <tr>\n        <td>Sabato</td>\n        <td>3</td>\n    </tr>\n</table>",
        domanda: "Quante righe e quante colonne ha la tabella, escludendo la didascalia?",
        opzioni: ["3 righe e 2 colonne", "2 righe e 4 colonne", "2 righe e 2 colonne"],
        impronta: 1583699012,
        lettera: "O",
        spiegazione: "Ci sono due `<tr>`, ciascuna con due celle. La `<caption>` è la didascalia, non è una riga."
    },
    {
        id: "V10",
        emoji: "📕",
        titolo: "Il Libro dei Sigilli",
        luogo: "Biblioteca segreta",
        scena: "Oltre la tela si apre una biblioteca nascosta. Su un leggio un grosso libro, chiuso da catene e da un lucchetto d'oro, riporta una formula che dice come aprirlo.",
        immagine: "room-10-libro-sigilli.jpg",
        descrizioneImmagine: "Biblioteca segreta: su un leggio un grosso libro antico avvolto da catene, con un lucchetto d'oro e sigilli di ceralacca.",
        codice: "<a href=\"https://www.example.org\" target=\"_blank\" title=\"Il Grimorio\">Apri il libro</a>",
        domanda: "Che cosa fanno gli attributi `target` e `title`?",
        opzioni: ["`target` mostra un tooltip, `title` apre il link in una nuova scheda", "`target` apre il link in una nuova scheda, `title` mostra un tooltip", "`target` indica la lingua, `title` il nome del file"],
        impronta: 997002214,
        lettera: "D",
        spiegazione: "`target=\"_blank\"` apre la destinazione in una nuova scheda; `title` genera il tooltip al passaggio del mouse."
    },
    {
        id: "V11",
        emoji: "📖",
        titolo: "Il Glossario dei Mostri",
        luogo: "Biblioteca segreta",
        scena: "Sugli scaffali trovi il bestiario del castello: un glossario in cui ogni mostro è seguito dalle sue descrizioni.",
        immagine: "room-11-bestiario.jpg",
        descrizioneImmagine: "Grosso libro antico aperto, il bestiario, con le illustrazioni di un vampiro alato e di un lupo mannaro, davanti agli scaffali della biblioteca.",
        codice: "<dl>\n    <dt>Vampiro</dt>\n        <dd>Creatura della notte</dd>\n        <dd>Teme l'aglio</dd>\n    <dt>Lupo mannaro</dt>\n        <dd>Si trasforma con la luna piena</dd>\n</dl>",
        domanda: "Quanti termini e quante descrizioni contiene la lista?",
        opzioni: ["2 termini e 3 descrizioni", "3 termini e 2 descrizioni", "2 termini e 2 descrizioni"],
        impronta: 1611917404,
        lettera: "A",
        spiegazione: "`<dt>` individua il termine, `<dd>` la descrizione. Un termine può avere più descrizioni."
    },
    {
        id: "V12",
        emoji: "🪦",
        titolo: "Il Cimitero dei Titoli",
        luogo: "Giardino e cimitero",
        scena: "Esci dalla biblioteca verso il giardino. Nella nebbia, sulle lapidi del cimitero, sono incisi tre titoli, tutti uguali nella forma.",
        immagine: "room-12-cimitero.jpg",
        descrizioneImmagine: "Cimitero nella nebbia con tre lapidi gotiche, un cancello di ferro e le finestre illuminate del castello sullo sfondo.",
        codice: "<h1>Il Castello</h1>\n<h1>La Cripta</h1>\n<h1>La Torre</h1>",
        domanda: "Quale buona pratica non è rispettata?",
        opzioni: ["I titoli devono essere scritti in maiuscolo", "Ogni `<h1>` va chiuso con un `<br>`", "Una pagina dovrebbe avere un solo `<h1>`"],
        impronta: 1841051003,
        lettera: "L",
        spiegazione: "Più `<h1>` rompono la gerarchia dei titoli: serve un solo `<h1>` e poi `<h2>`, `<h3>` in ordine."
    },
    {
        id: "V13",
        emoji: "⚰️",
        titolo: "La Bara Nidificata",
        luogo: "Cripta",
        scena: "Una lapide scorre di lato e scendi nella cripta. Una bara contiene un'altra bara, che ne contiene un'altra ancora: dentro c'è un elenco.",
        immagine: "room-13-cripta.jpg",
        descrizioneImmagine: "Cripta di pietra illuminata da torce e candelabri: una bara aperta ne contiene una più piccola, che ne contiene un'altra ancora.",
        codice: "<ul>\n    <li>Armi\n        <ol type=\"a\">\n            <li>Paletto</li>\n            <li>Crocifisso</li>\n        </ol>\n    </li>\n    <li>Difese\n        <ul type=\"square\">\n            <li>Aglio</li>\n        </ul>\n    </li>\n</ul>",
        domanda: "Quali simboli mostra il browser davanti a Paletto, Crocifisso e Aglio?",
        opzioni: ["1. Paletto, 2. Crocifisso, ● Aglio", "a. Paletto, b. Crocifisso, ■ Aglio", "a. Paletto, b. Crocifisso, ● Aglio"],
        impronta: 3611220393,
        lettera: "C",
        spiegazione: "Ogni livello ha il proprio `type`: la lista interna di Armi è alfabetica (a, b), quella interna di Difese ha il quadratino pieno (■)."
    },
    {
        id: "V14",
        emoji: "🌹",
        titolo: "Il Rosaio Capovolto",
        luogo: "Roseto",
        scena: "Una scala ti riporta all'aperto, in un roseto notturno dove le rose pendono con i fiori rivolti verso il basso, come una numerazione che conta all'indietro.",
        immagine: "room-14-roseto.jpg",
        descrizioneImmagine: "Roseto notturno sotto un cielo stellato: rose rosse con i fiori rivolti verso il basso e, sullo sfondo, la sagoma di una torre.",
        codice: "<ol type=\"I\" reversed>\n    <li>Aglio</li>\n    <li>Crocifisso</li>\n    <li>Paletto</li>\n    <li>Specchio</li>\n</ol>",
        domanda: "Quale numero compare accanto a Crocifisso?",
        opzioni: ["III", "II", "2"],
        impronta: 1441453429,
        lettera: "A",
        spiegazione: "`reversed` conta dall'ultimo al primo: Aglio è IV, Crocifisso è III, Paletto è II, Specchio è I. L'ordine nel codice non cambia."
    },
    {
        id: "V15",
        emoji: "🕷️",
        titolo: "La Torre dei Ragni",
        luogo: "Torre",
        scena: "In fondo al roseto si alza la torre, con i mattoni uniti da fili di ragnatela. Per salire devi contare le celle.",
        immagine: "room-15-torre.jpg",
        descrizioneImmagine: "Alta torre di pietra avvolta da grandi ragnatele argentate, con le finestre illuminate e la luna piena nel cielo.",
        codice: "<table border=\"1\">\n    <tr>\n        <td rowspan=\"2\">Torre</td>\n        <td colspan=\"2\">Sala</td>\n    </tr>\n    <tr>\n        <td>Est</td>\n        <td>Ovest</td>\n    </tr>\n</table>",
        domanda: "Quante colonne ha la tabella a video e in quale colonna compare «Est»?",
        opzioni: ["3 colonne; «Est» è nella colonna 1", "2 colonne; «Est» è nella colonna 2", "3 colonne; «Est» è nella colonna 2"],
        impronta: 813611321,
        lettera: "S",
        spiegazione: "«Torre» occupa la colonna 1 anche nella seconda riga (rowspan) e «Sala» occupa le colonne 2 e 3 (colspan): nella seconda riga «Est» finisce nella colonna 2 e «Ovest» nella 3."
    },
    {
        id: "V16",
        emoji: "🏚️",
        titolo: "Il Documento Maledetto",
        luogo: "Ala in rovina",
        scena: "Dalla cima della torre raggiungi un'ala del castello crollata. Su una lastra di pietra c'è il progetto dell'edificio, scritto in fretta: nasconde un errore che ti sbarra il passaggio.",
        immagine: "room-16-rovine.jpg",
        descrizioneImmagine: "Rovine di un'ala del castello con archi crollati e travi spezzate, sotto la luna: su una lastra di pietra è aperta una pergamena con una pianta.",
        codice: "<!DOCTYPE html>\n<html lang=\"it\">\n    <head>\n        <meta charset=\"UTF-8\">\n        <title>Alba</title>\n    <body>\n        <h1>È l'alba</h1>\n    </body>\n</html>",
        domanda: "Quale errore comune contiene il documento?",
        opzioni: ["Il tag `<body>` va scritto prima di `<head>`", "Il tag `<head>` non è mai stato chiuso", "Il tag `<title>` non può stare nel documento"],
        impronta: 808711897,
        lettera: "T",
        spiegazione: "Manca `</head>`: il browser tollera l'errore, ma la struttura del documento non è valida."
    },
    {
        id: "V17",
        emoji: "🌉",
        titolo: "Il Ponte Levatoio",
        luogo: "Fossato",
        scena: "Per tornare al cortile devi attraversare il fossato, ma il ponte levatoio non si abbassa: il meccanismo del collegamento è inceppato.",
        immagine: "room-17-ponte.jpg",
        descrizioneImmagine: "Ponte levatoio di legno sollevato a metà sopra il fossato nebbioso; in primo piano catene e un ingranaggio rotto del meccanismo.",
        codice: "<a href=\"cripta\">Scendi nella cripta</a>\n...\n<h2 id=\"cripta\">La Cripta</h2>",
        domanda: "Il collegamento non porta al titolo «La Cripta». Quale correzione serve?",
        opzioni: ["Scrivere `href=\"#cripta\"`", "Scrivere `id=\"#cripta\"`", "Aggiungere `target=\"_blank\"` al tag `<a>`"],
        impronta: 1317280364,
        lettera: "E",
        spiegazione: "Il cancelletto indica un collegamento interno alla pagina: va nell'`href`. L'`id` si scrive senza `#`."
    },
    {
        id: "V18",
        emoji: "🔦",
        titolo: "La Lanterna Cliccabile",
        luogo: "Cortile d'ingresso",
        scena: "Sei di nuovo vicino al portone. Una lanterna accesa illumina un grande stemma sul muro, ma qualcosa è rimasto aperto.",
        immagine: "room-18-lanterna.jpg",
        descrizioneImmagine: "Cortile d'ingresso con il portone di quercia sullo sfondo: una lanterna accesa illumina un grande stemma con un lupo e una torre.",
        codice: "<a href=\"torre.html\">\n    <img src=\"torre.jpg\" alt=\"La torre\">\n<p>Il sole sorge tra poco.</p>",
        domanda: "Quale conseguenza è possibile, avendo dimenticato `</a>` dopo l'immagine?",
        opzioni: ["L'immagine non viene più mostrata", "Il browser blocca la pagina con un messaggio di errore", "Anche il testo che segue può diventare cliccabile"],
        impronta: 601015838,
        lettera: "L",
        spiegazione: "Il browser recupera l'errore in modo imprevedibile: spesso il resto della pagina diventa cliccabile insieme all'immagine."
    },
    {
        id: "V19",
        emoji: "🧪",
        titolo: "Il Sigillo di Ceralacca",
        luogo: "Portone",
        scena: "Sull'anta del portone è appoggiata una lettera chiusa da un sigillo di ceralacca cliccabile: sul sigillo c'è scritto un codice.",
        immagine: "room-19-sigillo.jpg",
        descrizioneImmagine: "Busta chiusa da un sigillo di ceralacca rosso scuro con un pipistrello e una torre, appoggiata sull'anta del portone di quercia.",
        codice: "<a href=\"mailto:conte@castello.example\" title=\"Scrivi al Conte\">\n    <img src=\"sigillo.png\" alt=\"Sigillo del Conte\" width=\"80px\">\n</a>",
        domanda: "Passando il mouse sull'immagine e poi cliccando, che cosa accade?",
        opzioni: ["Compare il tooltip «Sigillo del Conte» e si apre una nuova scheda", "Compare il tooltip «Scrivi al Conte» e si apre il programma di posta", "Non compare alcun tooltip, perché `title` non può stare su `<a>`"],
        impronta: 221707034,
        lettera: "L",
        spiegazione: "`title` sul tag `<a>` genera il tooltip su tutta l'area cliccabile, mentre `alt` serve solo come testo alternativo. Il `mailto:` apre il programma di posta."
    },
    {
        id: "V20",
        emoji: "🌅",
        titolo: "Il Rituale dell'Alba",
        luogo: "Davanti al portone, all'alba",
        scena: "Il cielo schiarisce e manca poco al sorgere del sole. Ultima prova: sulla lastra di pietra la tabella del rituale nasconde un errore. Correggila e le lettere raccolte comporranno la frase che apre il portone.",
        immagine: "room-20-alba.jpg",
        descrizioneImmagine: "Cortile all'alba con il cielo rosato: su una lastra di pietra è disegnata una griglia di celle e il Conte, avvolto nel mantello, si ritira nell'ombra.",
        codice: "<table border=\"1\">\n    <tr>\n        <th>Ora</th>\n        <th>Evento</th>\n    </tr>\n    <caption>Programma della notte</caption>\n    <tr>\n        <td>00:00</td>\n        <td>Risveglio</td>\n    </tr>\n</table>",
        domanda: "Che cosa non è corretto in questo codice?",
        opzioni: ["`<caption>` va scritto subito dopo `<table>`, prima della prima riga", "Le celle `<th>` non possono stare nella prima riga", "Manca `colspan` nell'ultima riga"],
        impronta: 861341355,
        lettera: "O",
        spiegazione: "La didascalia è l'unico tag di tabella che non sta dentro una riga: va inserita subito dopo l'apertura di `<table>`."
    }
];

const cTotaleEnigmi = cEnigmi.length;
const cNumeroOpzioni = 3;
const cEtichetteOpzioni = ["A", "B", "C"];

// Cartella che contiene le illustrazioni degli enigmi (un'immagine per ogni stanza del castello)
const cCartellaImmagini = "immagini/";

// Le lettere raccolte compongono la frase "SEI LIBERO DAL CASTELLO": la somma deve essere uguale a cTotaleEnigmi
const cLunghezzeParole = [3, 6, 3, 8];

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
const cNumeroPipistrelli = 7;
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
let partitaIniziata = false;     // true dopo aver premuto "Entra nel castello"
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

// Crea i pipistrelli che attraversano lo schermo, con altezza, velocità e dimensione casuali
function creaPipistrelli() {
    const contenitore = document.getElementById("particles");

    for (let i = 0; i < cNumeroPipistrelli; i++) {
        const pipistrello = document.createElement("div");

        pipistrello.className = "bat";
        pipistrello.textContent = "🦇";
        pipistrello.style.top = (5 + Math.random() * 60) + "%";
        pipistrello.style.animationDuration = (16 + Math.random() * 18) + "s";
        pipistrello.style.animationDelay = (Math.random() * 20) + "s";
        pipistrello.style.fontSize = (1 + Math.random() * 1.4) + "rem";
        contenitore.appendChild(pipistrello);
    }
}

// Crea le gocce di sangue che cadono dall'alto: sono disegnate con il CSS, non con un emoji
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
        etichettaAvanti = "🗝️ Apri il portone";
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
        feedback.innerHTML = "🩸 <strong>Sbagliato!</strong> -" + cPenalitaErrore + " punto. Riprova... il Conte Markup ha sete.";

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

// Unisce le lettere raccolte in parole separate da uno spazio (SEI LIBERO DAL CASTELLO)
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

// Riporta il gioco alla situazione iniziale: si torna alla schermata con il pulsante "Entra nel castello"
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
creaPipistrelli();
creaGocce();
mostraLettere();
aggiornaProgresso();
aggiornaStatistiche();
