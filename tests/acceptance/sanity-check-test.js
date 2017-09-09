import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { find } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | sanity check');

test('Just a sanity check that the ember app is building ok with the addon', async function(assert) {
  await visit('/');

  assert.equal(currentURL(), '/');
});

test('Injects the manifest', async function(assert) {
  await visit('/');

  assert.ok(
    find(`link[rel='manifest'][href='/manifest.webmanifest']`, document.head),
    'Injects the manifest'
  );
});
