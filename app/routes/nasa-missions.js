import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MissionsRoute extends Route {
  @service nasaApi;
  @service favorites;
  async model() {
    return {
      missions: await this.nasaApi.fetchMissions(),
      favoriteMissions: this.favorites.getFavorites('missions'),
    };
  }
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('missions', model.missions);
  }
}
