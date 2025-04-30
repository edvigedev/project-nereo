import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class YourFavoritesRoute extends Route {
  @service favorites;
  @service nasaApi;

  async model() {
    const allMissions = await this.nasaApi.fetchMissions();
    const favoriteIds = this.favorites.getFavorites('missions');

    const favoriteMissions = allMissions.filter((mission) =>
      favoriteIds.includes(mission.name),
    );

    return {
      favoriteMissions,
    };
  }
}
