import { module, test } from 'qunit';
import { setupTest } from 'project-nereo/tests/helpers';

module('Unit | Route | iss-tracker', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:iss-tracker');
    assert.ok(route);
  });
});
