import Component from '@glimmer/component';

// BEGIN-SNIPPET greeting-component
export default class Greeting extends Component {
  get name() {
    if (!this.args.name) {
      return '<no @name provided>';
    }

    if (this.args.uppercase) {
      return this.args.name.toUpperCase();
    }

    return this.args.name;
  }
}
// END-SNIPPET
