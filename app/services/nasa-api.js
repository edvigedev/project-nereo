import Service from '@ember/service';
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';

export default class NasaApiService extends Service {
  @tracked missions = [];
  @tracked isLoading = false;
  @tracked error = null;

  baseUrl = 'https://osdr.nasa.gov/geode-py/ws/api';

  async fetchMissions() {
    this.isLoading = true;
    this.error = null;

    const proxy = 'https://api.allorigins.win/get?url=';

    try {
      // Build the proxied URL
      const encodedUrl = encodeURIComponent(`${this.baseUrl}/missions`);
      const response = await fetch(`${proxy}${encodedUrl}`);
      const { contents } = await response.json();

      // AllOrigins wraps the real JSON as a string in "contents"
      const missionsList = JSON.parse(contents);

      const limitedMissions = missionsList.data.slice(0, 10);
      console.log('Basic mission list:', limitedMissions);

      const missionDetails = [];
      for (const oneMission of limitedMissions) {
        const encodedMissionUrl = encodeURIComponent(oneMission.mission);
        const res = await fetch(`${proxy}${encodedMissionUrl}`);
        const { contents } = await res.json();
        missionDetails.push(JSON.parse(contents));
      }

      // Format each mission object
      const formattedMissions = missionDetails.map((mission) => ({
        name: mission.identifier || 'Unnamed Mission',
        endDate: mission.endDate || 'No end date available',
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
