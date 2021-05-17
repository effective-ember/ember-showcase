import Component from '@glimmer/component';

import UseSnippetComponent from './showcase/use-snippet';
import SnippetComponent from './snippet';
export declare type SnippetDescription = {
  name: string;
  title?: string;
  language: string;
};
export declare type Snippet = {
  name: string;
  title: string;
  language: string;
};
export default class Showcase extends Component {
  snippets: Snippet[];
  activeSnippet: Snippet | null;
  snippetComponent: typeof SnippetComponent;
  useSnippetComponent: typeof UseSnippetComponent;
  get _activeSnippet(): Snippet | undefined;
  registerSnippet(snippetDescription: SnippetDescription): void;
  activateSnippet(snippet: Snippet): void;
  private generateSnippetFromDescription;
}
