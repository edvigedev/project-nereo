import { module, test } from 'qunit';
import { setupTest } from 'project-nereo/tests/helpers';

module('Unit | Route | your-favorites', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:your-favorites');
    assert.ok(route);
  });
});
