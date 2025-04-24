import Component from '@glimmer/component';

export default class NasaMissionsCard extends Component {
  get missionStatus() {
    const status = this.args.mission.status;
    return `status ${status}`;
  }
}
