/*
    Autore: Michele Salvemini
    Classe: Prime - ripasso per la verifica su architettura degli elaboratori e sistema operativo (Lez07 e Lez08)
    Argomento: Fondamenti di Informatica - architettura degli elaboratori e sistema operativo
    Obiettivo: Gestire le flash card di ripasso generale: mostrare una carta alla volta, girarla, registrare l'autovalutazione, filtrare per dispensa e argomento e regolare la lettura
    Versione: 1.1
    Data: 03/11/2026
    Licenza: CC BY-NC-ND 4.0 - https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// ============================================================
// DATI: le carte
// ============================================================

// Ogni carta contiene:
//   id          -> codice univoco usato per salvare i progressi
//   dispensa    -> 7 (Architettura degli Elaboratori) oppure 8 (Il Sistema Operativo)
//   argomento   -> nome dell'argomento (serve al filtro)
//   emoji       -> simbolo mostrato nell'intestazione della carta
//   domanda     -> fronte della carta
//   righe       -> retro: coppie [etichetta, testo]; nei testi **parola** diventa grassetto
//   trucco      -> suggerimento per ricordare (può essere vuoto)
const cCarte = [
    // ---------- LEZ07 - Architettura degli Elaboratori ----------
    {
        id: "C01", dispensa: 7, argomento: "Dato e informazione", emoji: "📊",
        domanda: "Che differenza c'è tra dato e informazione?",
        righe: [
            ["Dato", "Misurazione grezza. Esempio: il numero 35."],
            ["Informazione", "Nasce quando il dato è messo in un contesto o in una scala. Esempio: 35 °C a gennaio è una temperatura insolita."],
            ["Informatica", "Studia come automatizzare l'elaborazione dei dati per ricavarne informazioni utili."]
        ],
        trucco: "Dato da solo = poco significato. Dato + contesto = informazione."
    },
    {
        id: "C02", dispensa: 7, argomento: "Dato e informazione", emoji: "🏛️",
        domanda: "Chi sono Babbage, Lovelace, Turing e von Neumann?",
        righe: [
            ["Babbage", "Nell'Ottocento progetta macchine di calcolo meccaniche (la macchina differenziale e la macchina analitica)."],
            ["Lovelace", "Scrive per la macchina analitica il primo algoritmo destinato a una macchina: è considerata la prima programmatrice."],
            ["Turing", "Negli anni Trenta contribuisce con un modello teorico di calcolo."],
            ["von Neumann", "Nel 1945 propone l'architettura che porta il suo nome."]
        ],
        trucco: ""
    },
    {
        id: "C03", dispensa: 7, argomento: "Computer e von Neumann", emoji: "🔢",
        domanda: "Perché il computer è detto elaboratore elettronico digitale?",
        righe: [
            ["Elettronico", "Usa circuiti elettronici."],
            ["Digitale", "Rappresenta i dati con sequenze di **bit**: 0 e 1."],
            ["Perché 0 e 1", "Corrispondono a due livelli di tensione elettrica nei circuiti."]
        ],
        trucco: ""
    },
    {
        id: "C04", dispensa: 7, argomento: "Computer e von Neumann", emoji: "🏗️",
        domanda: "Quali sono i quattro componenti dell'architettura di von Neumann?",
        righe: [
            ["Processore (CPU)", "Esegue le istruzioni e i calcoli."],
            ["Memoria", "Contiene i dati e i programmi in uso."],
            ["Periferiche di input/output", "Permettono di inserire dati dall'esterno e di restituire i risultati."],
            ["Bus", "Insieme delle linee elettriche di collegamento: permette il passaggio di dati e comandi tra i componenti."]
        ],
        trucco: "CPU, memoria, periferiche, bus: eseguire, contenere, comunicare, collegare."
    },
    {
        id: "C05", dispensa: 7, argomento: "CPU", emoji: "🧩",
        domanda: "Da quali quattro parti è composta la CPU?",
        righe: [
            ["Unità di Controllo (UC)", "Gestisce e coordina la successione delle istruzioni da eseguire."],
            ["ALU", "Esegue i calcoli matematici (addizioni, moltiplicazioni) e i confronti logici."],
            ["Registri", "Piccolissime celle di memoria velocissime dentro la CPU: conservano i dati temporanei dei calcoli in corso, prima dell'invio alla RAM."],
            ["Clock", "Orologio interno che scandisce il ritmo di lavoro del processore."]
        ],
        trucco: "UC coordina, ALU calcola, registri conservano, clock dà il ritmo."
    },
    {
        id: "C06", dispensa: 7, argomento: "CPU", emoji: "⏱️",
        domanda: "In quale unità si misura la frequenza del clock?",
        righe: [
            ["Unità", "In hertz (Hz): i cicli di clock al secondo."],
            ["MHz", "1 megahertz = un milione di cicli al secondo."],
            ["GHz", "1 gigahertz = un miliardo di cicli al secondo."],
            ["Esempio", "Una CPU a 3 GHz compie 3 miliardi di cicli al secondo."]
        ],
        trucco: "Mega = milioni. Giga = miliardi."
    },
    {
        id: "C07", dispensa: 7, argomento: "CPU", emoji: "⚖️",
        domanda: "Due CPU con lo stesso clock hanno le stesse prestazioni?",
        righe: [
            ["Risposta", "No. Cambia la ricchezza del **set di istruzioni** integrato nel chip."],
            ["Esempio", "Per 7 × 8: la CPU A ha l'istruzione di moltiplicazione e ne usa una sola. La CPU B conosce solo l'addizione e somma il 7 per otto volte."],
            ["Conclusione", "A parità di clock la CPU A termina prima: la frequenza non basta da sola a misurare le prestazioni."]
        ],
        trucco: ""
    },
    {
        id: "C08", dispensa: 7, argomento: "Memorie", emoji: "🧠",
        domanda: "Che cos'è la RAM e quali caratteristiche ha?",
        righe: [
            ["RAM", "Memoria principale (Random Access Memory)."],
            ["Volatile", "Mantiene i dati solo finché il computer è acceso: allo spegnimento si cancella."],
            ["Contenuto", "Il sistema operativo e i programmi in esecuzione."],
            ["Struttura", "Celle da 1 byte (8 bit), ciascuna con un indirizzo univoco."],
            ["Accesso casuale", "La CPU, conoscendo l'indirizzo, raggiunge direttamente una cella senza scorrere le precedenti."]
        ],
        trucco: "RAM = memoria di lavoro."
    },
    {
        id: "C09", dispensa: 7, argomento: "Memorie", emoji: "🐌",
        domanda: "Che cosa succede quando la RAM si riempie?",
        righe: [
            ["Il problema", "Si aprono troppi programmi e lo spazio in RAM si esaurisce."],
            ["Che cosa fa il sistema", "Usa una parte del disco come memoria di appoggio, molto più lenta della RAM."],
            ["Risultato", "Il computer rallenta, ma non perché la CPU sia diventata più lenta."]
        ],
        trucco: ""
    },
    {
        id: "C10", dispensa: 7, argomento: "Memorie", emoji: "🔒",
        domanda: "Che cos'è la ROM e che cosa contiene?",
        righe: [
            ["ROM", "Memoria a sola lettura (Read-Only Memory)."],
            ["Non volatile", "Il contenuto resta anche a computer spento."],
            ["Contenuto", "Il BIOS (o il più recente UEFI): il firmware necessario per l'avvio."]
        ],
        trucco: "RAM si cancella, ROM resta."
    },
    {
        id: "C11", dispensa: 7, argomento: "Memorie", emoji: "🗄️",
        domanda: "Che cosa sono le memorie di massa?",
        righe: [
            ["Funzione", "Conservano a lungo termine file e programmi, anche a computer spento."],
            ["Perché \"secondarie\"", "La CPU accede direttamente soltanto alla memoria principale: i programmi vengono caricati dalla memoria di massa nella RAM quando si mandano in esecuzione."],
            ["Esempi", "HDD, SSD, chiavette USB e dischi fissi esterni."]
        ],
        trucco: "RAM = memoria di lavoro. Memoria di massa = archivio."
    },
    {
        id: "C12", dispensa: 7, argomento: "Memorie", emoji: "💽",
        domanda: "Che differenza c'è tra HDD e SSD?",
        righe: [
            ["HDD", "Tecnologia magnetica: dischi che girano e testine meccaniche da posizionare. Più lento e sensibile agli urti."],
            ["SSD", "Tecnologia elettronica a stato solido: circuiti senza parti meccaniche in movimento. Molto più rapido e più resistente."]
        ],
        trucco: ""
    },
    {
        id: "C13", dispensa: 7, argomento: "Memorie", emoji: "🚀",
        domanda: "Il computer è lento e non puoi cambiare CPU e RAM: qual è l'intervento più efficace?",
        righe: [
            ["Intervento", "Sostituire l'HDD con un SSD."],
            ["Prima dell'acquisto", "Verifica le specifiche della scheda madre: il **chipset** (quali bus e interfacce supporta) e la presenza di connettori liberi per il nuovo disco."]
        ],
        trucco: ""
    },
    {
        id: "C14", dispensa: 7, argomento: "Scheda madre e case", emoji: "🧱",
        domanda: "Quali due parametri caratterizzano la scheda madre?",
        righe: [
            ["Scheda madre", "Circuito stampato principale su cui sono collegate tutte le componenti hardware."],
            ["Chipset", "Circuiti integrati che stabiliscono quali CPU sono supportate, quanta RAM si può installare e quali bus sono presenti."],
            ["Form factor", "Dimensioni, forma e disposizione standardizzata (ad esempio ATX, Micro-ATX): determina il numero di slot di espansione."],
            ["Limiti", "Un chipset limitato impedisce l'aggiornamento con componenti più veloci. Con tutti gli slot occupati il sistema non si può espandere."]
        ],
        trucco: "Chipset = che cosa supporta. Form factor = quanto spazio e quanti slot."
    },
    {
        id: "C15", dispensa: 7, argomento: "Scheda madre e case", emoji: "📦",
        domanda: "Che cos'è il case e come può essere disposto?",
        righe: [
            ["Case", "Racchiude tutti i componenti interni. È montato su uno scheletro portante detto chassis."],
            ["Desktop", "Disposto in orizzontale."],
            ["Tower", "Disposto in verticale: mini, middle e big tower, in base allo spazio per gli slot di espansione."]
        ],
        trucco: ""
    },
    {
        id: "C16", dispensa: 7, argomento: "Scheda madre e case", emoji: "🌡️",
        domanda: "Quali cause provocano il surriscaldamento del computer?",
        righe: [
            ["Cause", "Prese d'aria ostruite (per esempio un portatile sul letto), accumulo di polvere e overclocking."],
            ["Overclocking", "Far lavorare la CPU a una frequenza di clock superiore a quella dichiarata dal produttore. È sconsigliato: genera molto calore ed è poco utile."],
            ["Conseguenze", "Il computer rallenta, può spegnersi e, nei casi più gravi, subire danni permanenti."]
        ],
        trucco: ""
    },
    {
        id: "C17", dispensa: 7, argomento: "Periferiche e porte", emoji: "🖱️",
        domanda: "Che cosa sono le periferiche di input e di output?",
        righe: [
            ["Input", "Inseriscono dati nel computer. Esempi: tastiera, mouse, microfono."],
            ["Output", "Forniscono dati all'esterno. Esempi: monitor, casse, plotter."],
            ["Ibride", "Fanno entrambe le cose. Esempio: cuffie con microfono."]
        ],
        trucco: "Input = i dati entrano. Output = i dati escono."
    },
    {
        id: "C18", dispensa: 7, argomento: "Periferiche e porte", emoji: "💾",
        domanda: "Quali dispositivi non sono né di input né di output?",
        righe: [
            ["Memorizzazione", "Conservano file e programmi. Esempi: chiavetta USB, hard disk esterno."],
            ["Rete", "Collegano il computer a una rete. Esempio: router Wi-Fi."]
        ],
        trucco: "Attenzione: la chiavetta USB non è una periferica di input o di output."
    },
    {
        id: "C19", dispensa: 7, argomento: "Periferiche e porte", emoji: "🔌",
        domanda: "A che cosa servono le porte USB, HDMI, Ethernet e PS/2?",
        righe: [
            ["USB", "Porta universale ad alta velocità: collega e scollega periferiche a computer acceso."],
            ["HDMI", "Invia segnali audio e video ad alta definizione a monitor e TV."],
            ["Ethernet (RJ45)", "Collega il computer alla rete con un cavo: più veloce e stabile del Wi-Fi."],
            ["PS/2", "Vecchia porta circolare (viola per la tastiera, verde per il mouse). Se scolleghi una periferica a computer acceso, occorre riavviare per farla riconoscere."]
        ],
        trucco: ""
    },
    {
        id: "C20", dispensa: 7, argomento: "Tipi di calcolatori", emoji: "🖥️",
        domanda: "Quali tipi di calcolatori esistono?",
        righe: [
            ["Sistemi embedded", "Piccole schede programmabili per robotica e domotica (per esempio Arduino e Raspberry Pi)."],
            ["Workstation, All-in-One, PC", "Elaboratori per uso individuale, professionale o domestico."],
            ["Mainframe", "Calcoli relativamente semplici su enormi quantità di dati. Architettura client-server: molti terminali inviano richieste e il mainframe restituisce i risultati."],
            ["Supercomputer", "Calcoli estremamente complessi, come simulazioni e previsioni meteorologiche."]
        ],
        trucco: "Mainframe = tanti dati, calcoli semplici. Supercomputer = calcoli complessi."
    },
    {
        id: "C21", dispensa: 7, argomento: "Software e linguaggi", emoji: "🧲",
        domanda: "Che differenza c'è tra hardware e software?",
        righe: [
            ["Hardware", "Tutto ciò che si può toccare fisicamente."],
            ["Software", "L'insieme dei programmi e delle istruzioni che rendono operativo l'hardware."],
            ["Senza software", "La macchina sarebbe un pezzo di ferro inerte."]
        ],
        trucco: ""
    },
    {
        id: "C22", dispensa: 7, argomento: "Software e linguaggi", emoji: "🧰",
        domanda: "Software di sistema o software applicativo?",
        righe: [
            ["Di sistema", "Gestisce le risorse e fa funzionare l'hardware. Esempi: Windows, macOS, Linux e il firmware BIOS/UEFI nella ROM."],
            ["Applicativo", "Serve all'utente per svolgere attività specifiche. Esempi: elaboratori di testo, giochi, antivirus."],
            ["In RAM", "Il software applicativo viene caricato nella RAM solo quando lo esegui."]
        ],
        trucco: "Sistema = fa funzionare la macchina. Applicativo = fa lavorare te."
    },
    {
        id: "C23", dispensa: 7, argomento: "Software e linguaggi", emoji: "🗣️",
        domanda: "Che differenza c'è tra linguaggi di basso e di alto livello?",
        righe: [
            ["Basso livello", "Molto vicini alla macchina, basati sul codice macchina (sequenze di 0 e 1). Difficili per l'uomo, ma la CPU li esegue direttamente."],
            ["Alto livello", "Vicini al modo di esprimersi dell'essere umano, con parole chiave leggibili in inglese (come printf in C e C++)."]
        ],
        trucco: ""
    },
    {
        id: "C24", dispensa: 7, argomento: "Software e linguaggi", emoji: "🔤",
        domanda: "A che cosa serve il compilatore?",
        righe: [
            ["Il problema", "La CPU comprende solo sequenze di 0 e 1 (**codice macchina**)."],
            ["Il compilatore", "Traduce un programma scritto in un linguaggio ad alto livello (come C o C++) in codice macchina."],
            ["Il verso", "Da alto livello a codice macchina, non il contrario."]
        ],
        trucco: ""
    },

    // ---------- LEZ08 - Il Sistema Operativo ----------
    {
        id: "C25", dispensa: 8, argomento: "Dai primi elaboratori al SO", emoji: "🧵",
        domanda: "Come funzionavano i primi elaboratori elettronici?",
        righe: [
            ["Com'erano", "Grandi quanto una stanza, senza sistema operativo, né tastiera né monitor."],
            ["Il calcolo", "Coincideva con la configurazione fisica: valvole, cavi e interruttori da posizionare a mano."],
            ["Rigidità", "Per un calcolo diverso occorreva ricollegare a mano cavi e interruttori."],
            ["A che cosa servivano", "Per esempio a calcolare le traiettorie balistiche dei missili o a decifrare i codici segreti militari."]
        ],
        trucco: ""
    },
    {
        id: "C26", dispensa: 8, argomento: "Dai primi elaboratori al SO", emoji: "💡",
        domanda: "Che cosa ha reso possibile il sistema operativo?",
        righe: [
            ["Il cambiamento", "L'architettura di von Neumann: i programmi sono memorizzati nella memoria insieme ai dati."],
            ["La conseguenza", "Cambiare calcolo significa cambiare programma, non ricablare la macchina."],
            ["Il risultato", "Solo così diventa possibile uno strato di software che gestisca i programmi e l'hardware."]
        ],
        trucco: ""
    },
    {
        id: "C27", dispensa: 8, argomento: "Dai primi elaboratori al SO", emoji: "📱",
        domanda: "Un'applicazione scritta per macOS si esegue direttamente su Windows?",
        righe: [
            ["Risposta", "No. La differenza non dipende dalla marca del dispositivo, ma dal sistema operativo."],
            ["La regola", "Dispositivi con lo stesso sistema operativo eseguono la stessa applicazione, anche se di marche diverse."],
            ["Il ruolo del SO", "È uno strato software tra hardware e applicazioni: nasconde i dettagli dei componenti fisici."]
        ],
        trucco: "Conta il sistema operativo, non la marca."
    },
    {
        id: "C28", dispensa: 8, argomento: "Interfaccia grafica", emoji: "🪟",
        domanda: "Che cos'è la GUI e quale vantaggio ha?",
        righe: [
            ["GUI", "Interfaccia grafica (Graphical User Interface). Usa icone e finestre."],
            ["Metafora", "La scrivania (Desktop): file, cartelle e applicazioni sono rappresentati da icone."],
            ["Vantaggio", "Non devi ricordare i comandi a memoria."]
        ],
        trucco: ""
    },
    {
        id: "C29", dispensa: 8, argomento: "RAM e multitask", emoji: "🧮",
        domanda: "Perché i primi PC eseguivano un programma alla volta e oggi se ne eseguono tanti?",
        righe: [
            ["Monotask", "Un solo programma alla volta, come MS-DOS. Nei primi PC la RAM era dell'ordine di 64 KB."],
            ["Multitask", "I computer attuali hanno da alcuni GB fino a 16 GB di RAM e oltre: molte applicazioni insieme."],
            ["Il motivo", "Ogni programma in esecuzione deve avere in RAM il proprio codice e i propri dati. Con pochi KB non c'è spazio per più di un programma, con molti GB sì."],
            ["Quanta differenza", "Da 64 KB a 16 GB: circa 262.000 volte più memoria."],
            ["Attenzione", "La RAM non è l'unica ragione: il sistema operativo deve anche saper alternare i programmi."]
        ],
        trucco: ""
    },
    {
        id: "C30", dispensa: 8, argomento: "Kernel e processi", emoji: "❤️",
        domanda: "Che cos'è il kernel? È la stessa cosa del sistema operativo?",
        righe: [
            ["Kernel", "Il nocciolo centrale del sistema operativo."],
            ["Compiti", "Gestione dei processi, della memoria e delle periferiche (queste ultime tramite i driver)."],
            ["Non sono sinonimi", "Del sistema operativo fanno parte anche, per esempio, l'interfaccia grafica e i programmi di utilità."]
        ],
        trucco: "Kernel = cuore del SO, non tutto il SO."
    },
    {
        id: "C31", dispensa: 8, argomento: "Kernel e processi", emoji: "⚙️",
        domanda: "Qual è la differenza tra programma e processo?",
        righe: [
            ["Programma", "Entità **statica**: codice eseguibile memorizzato su una memoria di massa (HDD o SSD)."],
            ["Processo", "Entità **dinamica**: il programma caricato in memoria e mandato in esecuzione, con i suoi dati e il suo stato."],
            ["Esempio", "Se apri due volte lo stesso videogioco: 1 programma e 2 processi."]
        ],
        trucco: "Il programma è la ricetta scritta; il processo è la ricetta mentre la stai cucinando."
    },
    {
        id: "C32", dispensa: 8, argomento: "Kernel e processi", emoji: "🧶",
        domanda: "Che cos'è un thread? È un processo?",
        righe: [
            ["Thread", "Parte di un processo: sequenza di istruzioni in esecuzione all'interno di un processo."],
            ["Memoria", "I thread dello stesso processo condividono il suo spazio di memoria."],
            ["Attenzione", "Il thread non è un micro-processo indipendente. Un processo è indipendente dagli altri; un thread no."]
        ],
        trucco: ""
    },
    {
        id: "C33", dispensa: 8, argomento: "Kernel e processi", emoji: "🌐",
        domanda: "Come sono organizzati i processi di un browser con tante schede?",
        righe: [
            ["Padre", "L'applicazione principale è il processo padre."],
            ["Figli", "Ogni scheda è un processo figlio."],
            ["Chiudere un figlio", "Terminare una scheda non chiude le altre schede né la finestra principale."],
            ["Chiudere il padre", "Di norma chiude anche i figli."]
        ],
        trucco: ""
    },
    {
        id: "C34", dispensa: 8, argomento: "Multitasking", emoji: "🎡",
        domanda: "Come fa un solo core a gestire tanti programmi insieme?",
        righe: [
            ["Quanto di tempo", "Il kernel assegna la CPU a un processo per un brevissimo intervallo, detto quanto di tempo."],
            ["A rotazione", "Allo scadere sospende il processo, **salva il suo stato** e assegna la CPU a un altro, e così via."],
            ["Ripresa", "Un processo sospeso riprende esattamente da dove era arrivato."],
            ["Esempio", "Tre processi A, B, C con quanto di 10 ms: A (0-10), B (10-20), C (20-30), poi di nuovo A."]
        ],
        trucco: ""
    },
    {
        id: "C35", dispensa: 8, argomento: "Multitasking", emoji: "🔀",
        domanda: "Qual è la differenza tra parallelismo reale e apparente?",
        righe: [
            ["Reale", "Più core eseguono processi diversi nello stesso istante. Al massimo tanti processi quanti sono i core."],
            ["Apparente", "Un solo core alterna rapidamente i processi (multitasking a divisione di tempo, time sharing). È possibile sempre, anche con un core solo."],
            ["Attenzione", "Con un solo core il parallelismo reale è fisicamente impossibile."]
        ],
        trucco: "Reale = più core. Apparente = un core che alterna veloce."
    },
    {
        id: "C36", dispensa: 8, argomento: "Multitasking", emoji: "⏳",
        domanda: "Il kernel esegue un'istruzione di un processo, poi una del successivo, a rotazione?",
        righe: [
            ["Risposta", "No. Assegna a ciascun processo un intervallo di tempo che contiene **milioni di istruzioni**."],
            ["Esempio", "A 2,5 GHz, in 10 ms la CPU compie 25 milioni di cicli."],
            ["Perché", "Passare troppo spesso da un processo all'altro farebbe perdere tempo prezioso."],
            ["Illusione", "L'alternanza è così rapida che sembra che tutto lavori nello stesso istante."]
        ],
        trucco: ""
    },
    {
        id: "C37", dispensa: 8, argomento: "File system e permessi", emoji: "🗂️",
        domanda: "A che cosa serve il file system?",
        righe: [
            ["Che cos'è", "La parte del sistema operativo che organizza e gestisce le memorie di massa (hard disk, SSD, chiavette USB)."],
            ["Organizzazione", "Struttura le informazioni in file, raccolti in cartelle (directory) e sottocartelle."],
            ["Controllo degli accessi", "Verifica quali utenti possono usare determinati file e risorse."]
        ],
        trucco: ""
    },
    {
        id: "C38", dispensa: 8, argomento: "File system e permessi", emoji: "🔐",
        domanda: "Quali sono i tre permessi di un file?",
        righe: [
            ["Lettura (Read)", "Visualizzare il contenuto del file."],
            ["Scrittura (Write)", "Modificare il contenuto o le proprietà del file."],
            ["Esecuzione (Execute)", "Eseguire il file, se è un programma."],
            ["Chi", "I permessi si definiscono per ogni utente o gruppo di utenti."]
        ],
        trucco: "R, W, X: guardare, modificare, lanciare."
    },
    {
        id: "C39", dispensa: 8, argomento: "Driver", emoji: "🔧",
        domanda: "A che cosa serve un driver?",
        righe: [
            ["Che cos'è", "Un software che permette al sistema operativo di comunicare con una periferica."],
            ["Come funziona", "Fa da **interprete**: traduce i comandi generici del sistema operativo in quelli compresi dalla periferica."],
            ["Senza driver", "La periferica non funziona nelle sue funzioni specifiche, anche se non è guasta."]
        ],
        trucco: "Driver = interprete tra il sistema operativo e la periferica."
    },
    {
        id: "C40", dispensa: 8, argomento: "Driver", emoji: "🛠️",
        domanda: "Dopo un aggiornamento del sistema operativo, una periferica vecchia non funziona più. È rotta?",
        righe: [
            ["Non per forza", "Spesso la nuova versione del sistema operativo non ha i driver adatti."],
            ["Che cosa fare", "Controlla i driver e scarica quelli aggiornati dal sito del produttore."],
            ["Attenzione", "Tastiere, mouse e chiavette USB funzionano subito: il sistema operativo ha già dei driver generici."]
        ],
        trucco: ""
    },
    {
        id: "C41", dispensa: 8, argomento: "Ripristino e backup", emoji: "🛟",
        domanda: "Qual è la differenza tra punto di ripristino e backup?",
        righe: [
            ["Chi lo crea", "Punto di ripristino: il sistema operativo, automaticamente (per esempio durante gli aggiornamenti). Backup: l'utente."],
            ["Che cosa conserva", "Punto di ripristino: copia dei file critici e dello stato del sistema. Backup: copia dei dati personali su un supporto esterno o su un servizio cloud."],
            ["A che cosa serve", "Punto di ripristino: annullare un aggiornamento fallito. Backup: prevenire la perdita di dati per guasti hardware o attacchi informatici."]
        ],
        trucco: ""
    },
    {
        id: "C42", dispensa: 8, argomento: "Ripristino e backup", emoji: "💥",
        domanda: "Un punto di ripristino salvato sul disco del sistema protegge dal guasto di quel disco?",
        righe: [
            ["Risposta", "No. Se il disco si guasta, il punto di ripristino va perso insieme ai dati."],
            ["Che cosa fare", "I dati importanti vanno copiati su un supporto diverso: è il backup."]
        ],
        trucco: ""
    },
    {
        id: "C43", dispensa: 8, argomento: "Avvio del computer", emoji: "🔦",
        domanda: "Che cosa succede quando accendi il computer? Le 4 fasi, in ordine.",
        righe: [
            ["1. Accensione", "L'impulso elettrico avvia la CPU, che esegue il firmware di base."],
            ["2. BIOS/UEFI", "Viene eseguito il codice contenuto nella ROM."],
            ["3. POST", "Controllo dei componenti fisici: RAM, processore, tastiera, dischi."],
            ["4. Caricamento del SO", "Il firmware porta il sistema operativo dalla memoria di massa alla RAM."]
        ],
        trucco: "Le iniziali: Accensione, BIOS, POST, Caricamento."
    },
    {
        id: "C44", dispensa: 8, argomento: "Avvio del computer", emoji: "❓",
        domanda: "Perché il sistema operativo non è il primo software che parte?",
        righe: [
            ["Il problema", "All'accensione la RAM è vuota, perché è volatile. Il sistema operativo è su una memoria di massa."],
            ["La soluzione", "Parte prima il **firmware** (BIOS/UEFI): si trova nella ROM e non va caricato da nessun disco. Poi il firmware carica il sistema operativo."]
        ],
        trucco: ""
    }
];


// ============================================================
// COSTANTI E VARIABILI
// ============================================================

const cChiaveSalvataggio = "fc-fdi010-v2";   // nome con cui il browser conserva i progressi
const cScaleTesto = [1, 1.2, 1.4];            // moltiplicatori della dimensione del testo
const cNomiDispense = { 7: "Lez07 – Architettura degli Elaboratori", 8: "Lez08 – Il Sistema Operativo" };
const cNumeroFantasmi = 5;                    // pochi, per non distrarre durante lo studio
const cNumeroGocce = 10;

let elenco = [];             // carte visibili, dopo la scelta dell'argomento
let ordineBase = [];         // tutte le carte, nell'ordine scelto (originale o mescolato)
let posizione = 0;           // posizione della carta corrente dentro "elenco"
let retroVisibile = false;   // true quando si sta leggendo il retro della carta
let stato = {};              // id carta -> "so" oppure "ripassa"
let impostazioni = { livelloTesto: 0, spaziatura: true, decorazioni: true };

// ============================================================
// FUNZIONI DI SUPPORTO
// ============================================================

// Evita che i caratteri < > & dei testi vengano interpretati come HTML
function proteggi(testo) {
    return testo.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Protegge il testo e trasforma **parola** in grassetto
function formatta(testo) {
    return proteggi(testo).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

// Legge progressi e impostazioni salvati; se il browser non lo consente si parte da zero
function carica() {
    try {
        const dati = JSON.parse(localStorage.getItem(cChiaveSalvataggio));

        if (dati && typeof dati === "object") {
            stato = dati.stato || {};
            impostazioni = Object.assign(impostazioni, dati.impostazioni || {});
        }
    } catch (errore) {
        stato = {};
    }
}

// Salva progressi e impostazioni; un errore (per esempio navigazione privata) non blocca lo studio
function salva() {
    try {
        localStorage.setItem(cChiaveSalvataggio, JSON.stringify({ stato: stato, impostazioni: impostazioni }));
    } catch (errore) {
        // Si continua senza salvare
    }
}

// ============================================================
// IMPOSTAZIONI DI LETTURA
// ============================================================

// Applica al corpo della pagina dimensione del testo, spaziatura e decorazioni
function applicaImpostazioni() {
    const corpo = document.body;

    corpo.style.setProperty("--scala-testo", cScaleTesto[impostazioni.livelloTesto]);
    corpo.classList.toggle("spaziatura-ampia", impostazioni.spaziatura);
    corpo.classList.toggle("senza-decorazioni", !impostazioni.decorazioni);
    document.getElementById("spaziatura-btn").setAttribute("aria-pressed", String(impostazioni.spaziatura));
    document.getElementById("decorazioni-btn").setAttribute("aria-pressed", String(impostazioni.decorazioni));
    document.getElementById("testo-meno").disabled = impostazioni.livelloTesto === 0;
    document.getElementById("testo-piu").disabled = impostazioni.livelloTesto === cScaleTesto.length - 1;
}

function cambiaTesto(passo) {
    impostazioni.livelloTesto = Math.min(cScaleTesto.length - 1, Math.max(0, impostazioni.livelloTesto + passo));
    applicaImpostazioni();
    salva();
}

// ============================================================
// ELENCO DELLE CARTE
// ============================================================

// Riempie il menu con le voci speciali, le due dispense e gli argomenti raggruppati per dispensa
function riempiFiltro() {
    const menu = document.getElementById("filtro");
    let html = "<option value=\"tutte\">Tutte le carte</option>" +
        "<option value=\"ripassare\">Solo quelle da ripassare</option>" +
        "<option value=\"d7\">Tutta la " + cNomiDispense[7] + "</option>" +
        "<option value=\"d8\">Tutta la " + cNomiDispense[8] + "</option>";

    [7, 8].forEach(function (numero) {
        const argomenti = [];

        cCarte.forEach(function (carta) {
            if (carta.dispensa === numero && argomenti.indexOf(carta.argomento) === -1) {
                argomenti.push(carta.argomento);
            }
        });

        html += "<optgroup label=\"" + cNomiDispense[numero] + "\">" + argomenti.map(function (nome) {
            return "<option value=\"a:" + proteggi(nome) + "\">" + proteggi(nome) + "</option>";
        }).join("") + "</optgroup>";
    });

    menu.innerHTML = html;
}

// Ricostruisce l'elenco delle carte visibili in base all'argomento scelto
function costruisciElenco() {
    const scelta = document.getElementById("filtro").value;

    elenco = ordineBase.filter(function (indice) {
        const carta = cCarte[indice];

        if (scelta === "tutte") {
            return true;
        }
        if (scelta === "ripassare") {
            return stato[carta.id] === "ripassa";
        }
        if (scelta === "d7" || scelta === "d8") {
            return carta.dispensa === Number(scelta.charAt(1));
        }
        return "a:" + carta.argomento === scelta;
    });
    posizione = 0;
    retroVisibile = false;
}

// Rimette le carte nell'ordine originale o le mescola (algoritmo di Fisher-Yates)
function ordinaCarte(mescolate) {
    ordineBase = cCarte.map(function (carta, indice) {
        return indice;
    });

    if (mescolate) {
        for (let i = ordineBase.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const appoggio = ordineBase[i];

            ordineBase[i] = ordineBase[j];
            ordineBase[j] = appoggio;
        }
    }
}

// ============================================================
// VISUALIZZAZIONE
// ============================================================

function aggiornaStatistiche() {
    let conosciute = 0;
    let daRipassare = 0;

    cCarte.forEach(function (carta) {
        if (stato[carta.id] === "so") {
            conosciute++;
        } else if (stato[carta.id] === "ripassa") {
            daRipassare++;
        }
    });
    document.getElementById("stat-so").textContent = conosciute;
    document.getElementById("stat-ripassa").textContent = daRipassare;
    document.getElementById("stat-nuove").textContent = cCarte.length - conosciute - daRipassare;
}

// Mostra la carta corrente (fronte o retro) oppure un messaggio se l'elenco è vuoto
function mostraCarta() {
    const area = document.getElementById("card-area");
    const girabtn = document.getElementById("gira-btn");

    aggiornaStatistiche();

    if (elenco.length === 0) {
        area.innerHTML = "<div class=\"fc-card fc-vuota\"><p>🎉 Non ci sono carte da mostrare in questa selezione.</p>" +
            "<p>Scegli «Tutte le carte» per ricominciare.</p></div>";
        document.getElementById("progress-text").textContent = "0 / 0";
        document.getElementById("progress-fill").style.width = "0%";
        girabtn.disabled = true;
        return;
    }

    const carta = cCarte[elenco[posizione]];
    const esito = stato[carta.id];
    let corpo = "";

    if (retroVisibile) {
        corpo = "<p class=\"fc-face-label\">Risposta</p>" + carta.righe.map(function (riga) {
            return "<p class=\"fc-riga\"><strong class=\"fc-etichetta\">" + proteggi(riga[0]) + "</strong> " + formatta(riga[1]) + "</p>";
        }).join("");

        if (carta.trucco !== "") {
            corpo += "<p class=\"fc-trucco\">💡 <strong>Per ricordare:</strong> " + formatta(carta.trucco) + "</p>";
        }

        corpo += "<div class=\"fc-valutazione\" role=\"group\" aria-label=\"Autovalutazione\">" +
            "<button class=\"fc-btn fc-btn-so\" id=\"so-btn\" type=\"button\">✅ Lo so</button>" +
            "<button class=\"fc-btn fc-btn-ripassa\" id=\"ripassa-btn\" type=\"button\">🔁 Da ripassare</button></div>";
    } else {
        corpo = "<p class=\"fc-face-label\">Domanda</p><p class=\"fc-domanda\">" + formatta(carta.domanda) + "</p>" +
            "<p class=\"fc-suggerimento\">Prova a rispondere, poi gira la carta.</p>";
    }

    area.innerHTML = "<div class=\"fc-card" + (retroVisibile ? " fc-retro" : "") + "\">" +
        "<div class=\"fc-card-header\"><span class=\"card-number\">" + (posizione + 1) + "</span>" +
        "<span class=\"fc-argomento\">" + carta.emoji + " " + proteggi(carta.argomento) + "</span>" +
        "<span class=\"fc-dispensa\">Lez0" + carta.dispensa + "</span>" +
        (esito === "so" ? "<span class=\"fc-badge fc-badge-so\">✅ Lo so</span>" : "") +
        (esito === "ripassa" ? "<span class=\"fc-badge fc-badge-ripassa\">🔁 Da ripassare</span>" : "") +
        "</div><div class=\"fc-card-body\">" + corpo + "</div></div>";

    girabtn.disabled = false;
    girabtn.textContent = retroVisibile ? "↩ Torna alla domanda" : "🔄 Gira la carta";
    document.getElementById("progress-text").textContent = (posizione + 1) + " / " + elenco.length;
    document.getElementById("progress-fill").style.width = ((posizione + 1) / elenco.length * 100) + "%";

    if (retroVisibile) {
        document.getElementById("so-btn").addEventListener("click", function () {
            segna("so");
        });
        document.getElementById("ripassa-btn").addEventListener("click", function () {
            segna("ripassa");
        });
    }
}

// ============================================================
// AZIONI
// ============================================================

function giraCarta() {
    if (elenco.length === 0) {
        return;
    }
    retroVisibile = !retroVisibile;
    mostraCarta();
}

function vaiAvanti() {
    if (elenco.length === 0) {
        return;
    }
    posizione = (posizione + 1) % elenco.length;
    retroVisibile = false;
    mostraCarta();
}

function vaiIndietro() {
    if (elenco.length === 0) {
        return;
    }
    posizione = (posizione - 1 + elenco.length) % elenco.length;
    retroVisibile = false;
    mostraCarta();
}

// Registra l'autovalutazione e passa alla carta successiva
function segna(esito) {
    const carta = cCarte[elenco[posizione]];
    const filtro = document.getElementById("filtro").value;

    stato[carta.id] = esito;
    salva();

    // Nell'elenco "da ripassare" una carta ormai nota esce dalla lista: la successiva prende il suo posto
    if (filtro === "ripassare" && esito === "so") {
        elenco.splice(posizione, 1);

        if (posizione >= elenco.length) {
            posizione = 0;
        }
        retroVisibile = false;
        mostraCarta();
        return;
    }

    vaiAvanti();
}

function cambiaArgomento() {
    costruisciElenco();
    mostraCarta();
}

function mescola() {
    ordinaCarte(true);
    costruisciElenco();
    mostraCarta();
}

function azzera() {
    if (!window.confirm("Vuoi cancellare i tuoi progressi (le carte segnate «Lo so» e «Da ripassare»)?")) {
        return;
    }
    stato = {};
    salva();
    document.getElementById("filtro").value = "tutte";
    ordinaCarte(false);
    costruisciElenco();
    mostraCarta();
}

// ============================================================
// DECORAZIONI
// ============================================================

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
// AVVIO
// ============================================================

// Tasti rapidi: frecce per cambiare carta, spazio per girarla (se non si sta usando un pulsante o il menu)
function gestisciTastiera(evento) {
    const elementoAttivo = evento.target.tagName;

    if (elementoAttivo === "SELECT" || elementoAttivo === "BUTTON") {
        return;
    }
    if (evento.key === "ArrowRight") {
        vaiAvanti();
    } else if (evento.key === "ArrowLeft") {
        vaiIndietro();
    } else if (evento.key === " ") {
        evento.preventDefault();
        giraCarta();
    }
}

function avvia() {
    carica();
    document.getElementById("totale-carte").textContent = cCarte.length;
    riempiFiltro();
    ordinaCarte(false);
    costruisciElenco();
    applicaImpostazioni();
    creaFantasmi();
    creaGocce();
    mostraCarta();

    document.getElementById("gira-btn").addEventListener("click", giraCarta);
    document.getElementById("avanti-btn").addEventListener("click", vaiAvanti);
    document.getElementById("indietro-btn").addEventListener("click", vaiIndietro);
    document.getElementById("filtro").addEventListener("change", cambiaArgomento);
    document.getElementById("mescola-btn").addEventListener("click", mescola);
    document.getElementById("azzera-btn").addEventListener("click", azzera);
    document.getElementById("testo-meno").addEventListener("click", function () {
        cambiaTesto(-1);
    });
    document.getElementById("testo-piu").addEventListener("click", function () {
        cambiaTesto(1);
    });
    document.getElementById("spaziatura-btn").addEventListener("click", function () {
        impostazioni.spaziatura = !impostazioni.spaziatura;
        applicaImpostazioni();
        salva();
    });
    document.getElementById("decorazioni-btn").addEventListener("click", function () {
        impostazioni.decorazioni = !impostazioni.decorazioni;
        applicaImpostazioni();
        salva();
    });
    document.addEventListener("keydown", gestisciTastiera);
}

avvia();
