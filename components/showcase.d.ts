import Component from '@glimmer/component';
declare type SnippetDescription = {
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
  snippetComponent: string;
  useSnippetComponent: string;
  get _activeSnippet(): Snippet | undefined;
  registerSnippet(snippetDescription: SnippetDescription): void;
  activateSnippet(snippet: Snippet): void;
  private generateSnippetFromDescription;
}
export {};
