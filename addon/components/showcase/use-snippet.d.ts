import Component from '@glimmer/component';

import { SnippetDescription } from '../showcase';

interface Args extends SnippetDescription {
  registerSnippet: (snippetDescription: SnippetDescription) => void;
}
/* eslint-disable-next-line ember/no-empty-glimmer-component-classes */
declare class UseSnippet extends Component<Args> {}
