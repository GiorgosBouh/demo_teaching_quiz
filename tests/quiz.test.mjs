import test from 'node:test';
import assert from 'node:assert/strict';
import { questions, sources } from '../quiz-data.js';

test('Seven distinct questions, exactly one correct answer each, with all 28 explanations', () => {
  assert.equal(questions.length, 7);
  assert.equal(new Set(questions.map(q => q.id)).size, 7);
  const feedback = [];
  for (const q of questions) {
    assert.equal(q.options.length, 4, q.id);
    assert.equal(new Set(q.options.map(o => o.text)).size, 4, q.id);
    assert.equal(q.options.filter(o => o.correct).length, 1, q.id);
    assert.ok(q.hint.length >= 120, q.id);
    for (const o of q.options) {
      assert.equal(typeof o.correct, 'boolean');
      assert.ok(o.feedback.length >= 160, `${q.id}: ${o.text}`);
      feedback.push(o.feedback);
    }
  }
  assert.equal(new Set(feedback).size, 28);
});

test('References use explicit HTTPS links', () => {
  assert.ok(sources.length > 0);
  for (const s of sources) assert.equal(new URL(s.url).protocol, 'https:');
});
