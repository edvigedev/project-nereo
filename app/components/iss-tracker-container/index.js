import Component from '@glimmer/component';
import { action } from '@ember/object';
import L from 'leaflet';
import config from 'project-nereo/config/environment';

export default class IssTrackerContainerComponent extends Component {
  map = null;
  marker = null;

  // Helper to get correct base path for images depending on environment
  get markerImageBasePath() {
    return config.environment === 'production'
      ? '/project-nereo/assets/images/'
      : '/assets/images/';
  }

  @action
  setupMap(element) {
    if (!this.map && this.args.iss.latitude && this.args.iss.longitude) {
      // Set up the map on this DOM element
      this.map = L.map(element).setView(
        [Number(this.args.iss.latitude), Number(this.args.iss.longitude)],
        3,
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Explicitly define the marker icon with correct path
      const issIcon = L.icon({
        iconUrl: this.markerImageBasePath + 'marker-icon.png',
        iconRetinaUrl: this.markerImageBasePath + 'marker-icon-2x.png',
        shadowUrl: this.markerImageBasePath + 'marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      this.marker = L.marker(
        [Number(this.args.iss.latitude), Number(this.args.iss.longitude)],
        { icon: issIcon },
      ).addTo(this.map);
    }
  }

  @action
  updateMarker() {
    if (this.marker && this.args.iss.latitude && this.args.iss.longitude) {
      this.marker.setLatLng([
        Number(this.args.iss.latitude),
        Number(this.args.iss.longitude),
      ]);
      this.map.panTo([
        Number(this.args.iss.latitude),
        Number(this.args.iss.longitude),
      ]);
    }
  }
}
