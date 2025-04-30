import Route from '@ember/routing/route';

export default class HomepageRoute extends Route {
  async model() {
    const apiUrl = 'https://f-api.ir/api/facts/category/astronomy';
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    } catch (error) {
      console.error('Error fetching the space fact', error);
      return { spaceFacts: [] };
    }
  }
}
