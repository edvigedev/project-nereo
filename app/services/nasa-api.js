import Service from '@ember/service';
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';
import config from 'project-nereo/config/environment';

export default class NasaApiService extends Service {
  @tracked missions = [];
  @tracked isLoading = false;
  @tracked error = null;

  proxyBase = config.nasaProxyUrl;
  isProduction = config.environment === 'production';

  async fetchMissions() {
    this.isLoading = true;
    this.error = null;

    // const proxy = config.nasaProxyUrl;
    // console.log('Using proxy:', proxy);

    try {
      const nasaPath = '/geode-py/ws/api/missions';
      const nasaUrl = 'https://osdr.nasa.gov' + nasaPath;

      const fetchUrl = this.isProduction
        ? `${this.proxyBase}/${nasaUrl}`
        : `${this.proxyBase}${nasaPath}`;

      const response = await fetch(fetchUrl, {
        method: 'GET',
        mode: 'cors',

        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      const missionsList = await response.json();

      const limitedMissions = missionsList.data.slice(0, 10);
      console.log('Basic mission list:', limitedMissions);

      const missionDetails = await Promise.all(
        limitedMissions.map(async (oneMission) => {
          const missionUrl = this.isProduction
            ? `${this.proxyBase}/${oneMission.mission}`
            : `${this.proxyBase}${oneMission.mission.replace('https://osdr.nasa.gov', '')}`;
          const res = await fetch(missionUrl, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
          });
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
