import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const STORAGE_KEY = 'favorites';

export default class FavoriteService extends Service {
  @tracked favorites = {
    missions: [],
    pictures: [],
  };
  constructor() {
    super(...arguments);
    this.loadFavorites();
  }

  loadFavorites() {
    let stored = localStorage.getItem(STORAGE_KEY);
    this.favorites = stored
      ? JSON.parse(stored)
      : { missions: [], pictures: [] };
  }
  saveFavorites() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favorites));
  }

  isFavorite(type, id) {
    return this.favorites[type]?.includes(id);
  }
  toggleFavorite(type, id) {
    const existing = this.favorites[type] ?? [];
    const updated = existing.includes(id)
      ? existing.filter((item) => item !== id)
      : [...existing, id];

    this.favorites = {
      ...this.favorites,
      [type]: updated,
    };

    this.saveFavorites();
  }

  getFavorites(type) {
    return this.favorites[type] ?? [];
  }
}
