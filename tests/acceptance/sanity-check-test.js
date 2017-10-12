import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sanity check');

test('Just a sanity check that the ember app is building ok with the addon', async function(assert) {
  await visit('/');

  assert.equal(currentURL(), '/');
});
