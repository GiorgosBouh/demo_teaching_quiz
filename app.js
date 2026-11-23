import { questions, sources } from './quiz-data.js';

const $ = id => document.getElementById(id);
const letters = ['Α', 'Β', 'Γ', 'Δ'];
const state = { index: 0, answers: Array(questions.length).fill(null), checked: false };

function textElement(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

function showSection(id) {
  for (const section of ['intro', 'quiz', 'results']) $(section).hidden = section !== id;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderQuestion() {
  const question = questions[state.index];
  state.checked = false;
  $('question-counter').textContent = `Ερώτηση ${state.index + 1} από ${questions.length}`;
  $('topic').textContent = question.topic;
  $('progress').value = state.index;
  $('question-title').textContent = question.question;
  $('question-context').textContent = question.context;
  $('question-fieldset').disabled = false;
  $('hint').open = false;
  $('hint-text').textContent = question.hint;
  $('feedback').hidden = true;
  $('next').hidden = true;
  $('check').hidden = false;
  $('check').disabled = true;
  $('options').replaceChildren();

  question.options.forEach((option, index) => {
    const label = document.createElement('label');
    label.className = 'option';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = String(index);
    radio.required = true;
    const copy = document.createElement('span');
    copy.append(textElement('span', `${letters[index]}.`, 'option-letter'), document.createTextNode(option.text));
    label.append(radio, copy);
    $('options').append(label);
  });
  $('question-title').focus({ preventScroll: true });
}

function start() {
  state.index = 0;
  state.answers = Array(questions.length).fill(null);
  showSection('quiz');
  renderQuestion();
}

$('start').addEventListener('click', start);
$('restart').addEventListener('click', start);
$('question-form').addEventListener('change', event => {
  if (event.target.name === 'answer' && !state.checked) $('check').disabled = false;
});

$('question-form').addEventListener('submit', event => {
  event.preventDefault();
  if (state.checked) return;
  const selectedRadio = document.querySelector('input[name="answer"]:checked');
  if (!selectedRadio) return;
  const selected = Number(selectedRadio.value);
  const question = questions[state.index];
  const option = question.options[selected];
  const correctIndex = question.options.findIndex(item => item.correct);
  state.answers[state.index] = selected;
  state.checked = true;
  $('question-fieldset').disabled = true;
  $('check').hidden = true;
  $('progress').value = state.index + 1;
  document.querySelectorAll('.option').forEach((label, index) => {
    label.classList.add('locked');
    if (index === correctIndex) label.classList.add('is-correct');
    else if (index === selected) label.classList.add('is-wrong');
  });
  $('feedback').className = option.correct ? 'feedback' : 'feedback wrong';
  $('feedback-title').textContent = option.correct ? 'Σωστά!' : 'Δες την εξήγηση';
  $('feedback-text').textContent = option.feedback;
  $('correct-answer').hidden = option.correct;
  $('correct-answer').textContent = `Σωστή επιλογή: ${letters[correctIndex]}. ${question.options[correctIndex].text}`;
  $('feedback').hidden = false;
  $('next').textContent = state.index === questions.length - 1 ? 'Δες το αποτέλεσμα' : 'Επόμενη ερώτηση';
  $('next').hidden = false;
  $('next').focus({ preventScroll: true });
});

$('next').addEventListener('click', () => {
  if (!state.checked) return;
  if (state.index < questions.length - 1) {
    state.index += 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else renderResults();
});

function renderResults() {
  const score = questions.reduce((sum, question, index) => sum + Number(question.options[state.answers[index]]?.correct ?? false), 0);
  $('score-value').textContent = `${score} / ${questions.length}`;
  $('result-message').textContent = score === questions.length
    ? 'Σύνδεσες σωστά τις βασικές έννοιες του μαθήματος. Στην ανασκόπηση μπορείς να δεις την αιτιολόγηση κάθε επιλογής.'
    : 'Η ανασκόπηση σε βοηθά να ξεκαθαρίσεις τις έννοιες και να καταλάβεις το σκεπτικό των προσαρμογών. Δες τις εξηγήσεις και δοκίμασε ξανά όταν θέλεις.';
  $('review').replaceChildren();

  questions.forEach((question, questionIndex) => {
    const selected = state.answers[questionIndex];
    const isCorrect = question.options[selected].correct;
    const details = document.createElement('details');
    details.className = 'review-item';
    const summary = document.createElement('summary');
    summary.append(document.createTextNode(`${questionIndex + 1}. ${question.question}`));
    summary.append(textElement('span', `${isCorrect ? 'Σωστή απάντηση' : 'Χρειάζεται επανάληψη'} · Επέλεξες ${letters[selected]}`, 'review-status'));
    const list = document.createElement('ul');
    list.className = 'review-options';
    question.options.forEach((option, index) => {
      const item = document.createElement('li');
      item.className = 'review-option';
      item.append(textElement('strong', `${letters[index]}. ${option.text}`));
      const status = option.correct ? 'Σωστή επιλογή' : 'Λανθασμένη επιλογή';
      item.append(textElement('span', `${status}${selected === index ? ' · Η απάντησή σου' : ''}`, `choice-status${option.correct ? '' : ' wrong'}`));
      item.append(textElement('p', option.feedback));
      list.append(item);
    });
    details.append(summary, list);
    $('review').append(details);
  });
  showSection('results');
  $('results-title').focus({ preventScroll: true });
}

const sourceList = document.createElement('ul');
sources.forEach(source => {
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.href = source.url;
  link.textContent = source.title;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  item.append(link);
  sourceList.append(item);
});
$('sources-list').append(textElement('p', 'Οι ερωτήσεις ακολουθούν τις έννοιες και τα υποθετικά παραδείγματα του μαθήματος. Οι επαγγελματικοί ορισμοί, οι εκπαιδευτικές αρχές και τα ερευνητικά ευρήματα έχουν διαφορετικό ρόλο. Η AI παρουσιάζεται ως βοήθημα σχεδιασμού και η VR με προσοχή στη μεταφορά ευρημάτων από την αποκατάσταση.', 'source-context'), sourceList);
