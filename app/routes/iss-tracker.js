import Route from '@ember/routing/route';
import config from 'project-nereo/config/environment';

export default class IssTrackerRoute extends Route {
  async model() {
    // Pick the right URL for dev or production
    const apiUrl =
      config.environment === 'production'
        ? `${config.nasaProxyUrl}/http://api.open-notify.org/iss-now.json`
        : '/iss-proxy/iss-now.json';

    // Fetch the ISS position
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    });

    // DEBUG: Log the raw text to see if you're getting JSON or HTML
    const text = await response.text();
    const data = JSON.parse(text);

    return {
      latitude: data.iss_position.latitude,
      longitude: data.iss_position.longitude,
      timestamp: data.timestamp,
      formattedTimestamp: new Date(data.timestamp * 1000).toLocaleString(
        'en-GB',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'UTC',
        },
      ),
    };
  }
}
