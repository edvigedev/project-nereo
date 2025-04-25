import Component from '@glimmer/component';
import { action } from '@ember/object';
import L from 'leaflet';

export default class IssTrackerContainerComponent extends Component {
  map = null;
  marker = null;

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

      this.marker = L.marker([
        Number(this.args.iss.latitude),
        Number(this.args.iss.longitude),
      ]).addTo(this.map);
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
