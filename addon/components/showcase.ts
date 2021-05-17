import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { action } from '@ember/object';

import UseSnippetComponent from './showcase/use-snippet';
import SnippetComponent from './snippet';

export type SnippetDescription = {
  name: string;
  title?: string;
  language: string;
};

export type Snippet = {
  name: string;
  title: string;
  language: string;
};

export default class Showcase extends Component {
  @tracked snippets: Snippet[] = [];
  @tracked activeSnippet: Snippet | null = null;

  snippetComponent = SnippetComponent;
  useSnippetComponent = UseSnippetComponent;

  get _activeSnippet(): Snippet | undefined {
    return this.activeSnippet || this.snippets[0];
  }

  @action
  registerSnippet(snippetDescription: SnippetDescription): void {
    this.snippets = [
      ...this.snippets,
      this.generateSnippetFromDescription(snippetDescription),
    ];
  }

  @action
  activateSnippet(snippet: Snippet): void {
    this.activeSnippet = snippet;
  }

  private generateSnippetFromDescription(
    snippetDescription: SnippetDescription
  ): Snippet {
    const { name, title, language } = snippetDescription;

    return {
      name,
      title: title || name,
      language,
    };
  }
}
