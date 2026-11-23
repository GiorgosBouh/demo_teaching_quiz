const API_ORIGIN = 'https://pilot-b-epha-assistant.leafyduck18.chatgpt.site';
const $ = id => document.getElementById(id);

const fallbackAnswers = {
  benefits: {
    text: 'Η βιβλιογραφία εξετάζει περισσότερα από ένα είδη αποτελεσμάτων. Σε παιδιά με νευροκινητική αναπηρία, η δύναμη βελτιώθηκε πιο σταθερά από τη συνολική κινητική επίδοση, ενώ τα ευρήματα για συμμετοχή και ποιότητα ζωής ήταν λιγότερο ομοιόμορφα. Σε νέους με νοητική αναπηρία αναφέρθηκε θετικό συνολικό ψυχοκοινωνικό αποτέλεσμα της φυσικής δραστηριότητας. Για τις κοινωνικές εκβάσεις, τα αποτελέσματα διαφέρουν ανά πρόγραμμα και μελέτη. Άρα μιλάμε για κινητικές, ψυχολογικές και κοινωνικές διαστάσεις, χωρίς να υποσχόμαστε ότι όλες βελτιώνονται σε κάθε άτομο ή πρόγραμμα.',
    sources: [
      { title: 'Faccioli et al. (2025) · συστηματική ανασκόπηση', url: 'https://doi.org/10.3390/children12070815' },
      { title: 'Kapsal et al. (2019) · συστηματική ανασκόπηση και μετα-ανάλυση', url: 'https://pubmed.ncbi.nlm.nih.gov/31586434/' },
      { title: 'Orr et al. (2021) · ανασκόπηση κοινωνικών εκβάσεων', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8115467/' }
    ]
  },
  wheelchair: {
    text: 'Μπορούμε να κρατήσουμε τον στόχο του παιχνιδιού—να συνεργαστούν οι μαθητές με πάσες—και να προσαρμόσουμε την απόσταση, το μέγεθος ή την υφή της μπάλας και τον χρόνο προετοιμασίας, αφού δούμε πώς πασάρει και τι επιλέγει ο συγκεκριμένος μαθητής. Ο μαθητής παραμένει στο αμαξίδιο· δεν συμπεραίνουμε τις ικανότητές του μόνο από το αμαξίδιο. Αυτή είναι ενδεικτική διδακτική πρόταση, όχι πρωτόκολλο που έχει αποδειχθεί από τις συγκεκριμένες μελέτες. Οι πηγές του φακέλου υποστηρίζουν την εξατομίκευση και την προσβασιμότητα γενικά, όχι τη συγκεκριμένη παραλλαγή της πάσας.',
    sources: [
      { title: 'Ramos et al. (2025) · ανάγκες και εξατομίκευση σε φυσική δραστηριότητα', url: 'https://doi.org/10.2196/59704' },
      { title: 'An et al. (2024) · ανασκόπηση προγραμμάτων προσαρμοσμένης φυσικής δραστηριότητας', url: 'https://doi.org/10.1080/20473869.2022.2161987' },
      { title: 'Australian Sports Commission · παραδείγματα συμπεριληπτικών προσαρμογών', url: 'https://www.ausport.gov.au/schools/resource-hub/sports-ability/inclusive-practices' }
    ]
  },
  inclusion: {
    text: 'Οι έρευνες εξετάζουν διαφορετικά πράγματα: στάσεις και αυτοπεποίθηση εκπαιδευτικών, αντιλήψεις μαθητών και εμπόδια που περιγράφουν γονείς. Αυτές οι μετρήσεις βοηθούν να καταλάβουμε το πλαίσιο, αλλά δεν αποδεικνύουν από μόνες τους ότι όλοι οι μαθητές συμμετέχουν ουσιαστικά. Για παράδειγμα, οι έρευνες στάσεων είναι κυρίως παρατηρητικές, ενώ οι θετικές αντιλήψεις των συμμαθητών δεν ισοδυναμούν αυτόματα με εμπειρία συμπερίληψης για τον μαθητή με αναπηρία. Χρειάζεται να αξιολογούμε τη συμμετοχή στην πράξη και να ακούμε τον ίδιο τον μαθητή.',
    sources: [
      { title: 'Braksiek (2022) · στάσεις και αυτοαποτελεσματικότητα εκπαιδευτικών', url: 'https://doi.org/10.1016/j.tate.2021.103547' },
      { title: 'Alhumaid (2022) · διατομεακή έρευνα στάσεων εκπαιδευτικών', url: 'https://doi.org/10.2174/1875399X-v15-e221031-2022-34' },
      { title: 'Russo et al. (2025) · αντιλήψεις μαθητών για τη συμπεριληπτική ΦΑ', url: 'https://doi.org/10.1016/j.heliyon.2024.e41232' },
      { title: 'Columna et al. (2020) · συστηματική ανασκόπηση οπτικής γονέων', url: 'https://doi.org/10.1016/j.dhjo.2019.100851' }
    ]
  },
  limits: {
    text: 'Τα βασικά όρια είναι η μεγάλη ποικιλία σε αναπηρίες, ηλικίες, προγράμματα και μετρήσεις· τα μικρά δείγματα σε αρκετές μελέτες· και η χρήση αποτελεσμάτων που δεν είναι ισοδύναμα μεταξύ τους. Ορισμένες έρευνες μετρούν στάσεις ή χρηστικότητα, όχι αλλαγές στη συμμετοχή ή στην αυτονομία. Άλλες αφορούν δραστηριότητες εκτός σχολείου ή συγκεκριμένες ομάδες, επομένως δεν μεταφέρονται αυτομάτως σε κάθε μάθημα Ειδικής Φυσικής Αγωγής. Καλό είναι κάθε συμπέρασμα να αναφέρει ποιον πληθυσμό και ποιο αποτέλεσμα εξέτασε η συγκεκριμένη μελέτη.',
    sources: [
      { title: 'An et al. (2024) · ετερογένεια προγραμμάτων και εκβάσεων', url: 'https://doi.org/10.1080/20473869.2022.2161987' },
      { title: 'Kalef et al. (2013) · ποιότητα τεκμηρίωσης στην ομότιμη υποστήριξη', url: 'https://doi.org/10.1016/j.ridd.2013.05.004' },
      { title: 'Faccioli et al. (2025) · όρια των δοκιμών σε παιδιατρικούς πληθυσμούς', url: 'https://doi.org/10.3390/children12070815' },
      { title: 'Orr et al. (2021) · μικτά αποτελέσματα σε εξωσχολικά προγράμματα', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8115467/' }
    ]
  }
};

function showSources(sources) {
  const list = $('source-list');
  list.replaceChildren();
  for (const source of sources || []) {
    if (!source || !source.url || !source.url.startsWith('https://')) continue;
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = source.title || 'Άνοιγμα πηγής';
    item.append(link);
    list.append(item);
  }
  $('sources-block').hidden = list.children.length === 0;
}

function showAnswer(text, sources, label) {
  $('answer-label').textContent = label;
  $('answer-text').textContent = text;
  showSources(sources);
  $('answer-panel').hidden = false;
  $('answer-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function offlineMessage() {
  return 'Ο ζωντανός βιβλιογραφικός βοηθός δεν είναι διαθέσιμος αυτή τη στιγμή. Για την παρουσίαση, επίλεξε μία από τις τέσσερις παραπάνω ερωτήσεις: καθεμία διαθέτει εφεδρική απάντηση από τις ελεγμένες σημειώσεις. Η απάντηση που ακολουθεί δεν δημιουργήθηκε ζωντανά από AI.';
}

async function ask(question, fallbackKey = null) {
  $('question').value = question;
  $('char-count').textContent = `${question.length} / 900`;
  $('ask').disabled = true;
  for (const button of document.querySelectorAll('.starter')) button.disabled = true;
  $('status').textContent = 'Αναζητώ στις σημειώσεις και ετοιμάζω απάντηση…';
  $('answer-panel').hidden = true;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 28_000);
  try {
    const response = await fetch(`${API_ORIGIN}/api/answer`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: controller.signal
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'unavailable');
    showAnswer(data.answer, data.sources, 'Απάντηση βιβλιογραφικού βοηθού · ελέγξε και τις πηγές');
    $('status').textContent = 'Η απάντηση βασίστηκε στις εμφανιζόμενες σημειώσεις· έλεγξε τις πηγές για το πλαίσιο και τα όρια.';
  } catch {
    if (fallbackKey && fallbackAnswers[fallbackKey]) {
      const backup = fallbackAnswers[fallbackKey];
      showAnswer(backup.text, backup.sources, 'Εφεδρική απάντηση από ελεγμένες σημειώσεις · χωρίς ζωντανή κλήση AI');
      $('status').textContent = 'Η σύνδεση με τον βοηθό δεν ήταν διαθέσιμη. Εμφανίζεται η προετοιμασμένη εφεδρική απάντηση.';
    } else {
      $('status').textContent = offlineMessage();
    }
  } finally {
    clearTimeout(timeout);
    $('ask').disabled = false;
    for (const button of document.querySelectorAll('.starter')) button.disabled = false;
  }
}

for (const button of document.querySelectorAll('.starter')) {
  button.addEventListener('click', () => ask(button.dataset.question, button.dataset.fallback));
}

$('question').addEventListener('input', () => {
  $('char-count').textContent = `${$('question').value.length} / 900`;
});

$('ask-form').addEventListener('submit', event => {
  event.preventDefault();
  const question = $('question').value.trim();
  if (question.length >= 8) ask(question);
});
