import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class NasaMissionsCard extends Component {
  @service favorites;
  @action
  toggleFavorite() {
    const id = this.args.mission.name;
    this.favorites.toggleFavorite('missions', id);
  }

  get isFavorited() {
    return this.favorites.isFavorite('missions', this.args.mission.name);
  }
}
