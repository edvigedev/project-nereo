import Service from '@ember/service';
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';

export default class NasaApiService extends Service {
  @tracked missions = [];
  @tracked isLoading = false;
  @tracked error = null;

  apiUrl = `/nasa-api/geode-py/ws/api/missions`;

  async fetchMissions() {
    this.isLoading = true;
    this.error = null;

    // const proxy = config.nasaProxyUrl;
    // console.log('Using proxy:', proxy);

    try {
      // Build the proxied URL

      const response = await fetch(`${this.apiUrl}`, {
        method: 'GET',
        mode: 'cors',
      });
      const missionsList = await response.json();

      const limitedMissions = missionsList.data.slice(0, 10);
      console.log('Basic mission list:', limitedMissions);

      const missionDetails = await Promise.all(
        limitedMissions.map(async (oneMission) => {
          const missionPath = oneMission.mission.split('/ws/api/')[1];
          const proxiedUrl = `/nasa-api/geode-py/ws/api/${missionPath}`;
          const res = await fetch(proxiedUrl);
          return await res.json();
        }),
      );

      // Format each mission object
      const formattedMissions = missionDetails.map((mission) => ({
        name: mission.identifier || 'Unnamed Mission',
        endDate: mission.endDate || 'No end date available',
        startDate: mission.startDate || 'No start date available',
      }));

      console.log('Formatted missions:', formattedMissions);
      this.missions = formattedMissions;

      return formattedMissions;
    } catch (error) {
      console.error('Error fetching missions:', error);
      this.error = 'Failed to load mission data.';
    } finally {
      this.isLoading = false;
    }
  }
}
