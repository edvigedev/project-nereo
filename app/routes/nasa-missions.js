import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MissionsRoute extends Route {
  @service nasaApi;
  async model() {
    return this.nasaApi.fetchMissions();
  }
}
