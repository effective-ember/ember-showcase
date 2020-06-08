import CodeBlock from "ember-prism/components/code-block";

export default class CodeBlockComponent extends CodeBlock {
  didRender(...args) {
    // Remove lines numbers before plugin initializations is forced at the
    // end of this didRender hook; this is needed so the line numbers are
    // correct for the new code
    //
    // This is needed as the line-numbers plugin doesn't run again in case
    // line numbers are already shown
    // https://github.com/PrismJS/prism/blob/v1.19.0/plugins/line-numbers/prism-line-numbers.js#L82-L85
    this.getElement()
      .querySelectorAll(".line-numbers-rows")
      .forEach((e) => e.parentNode.removeChild(e));

    return super.didRender(...args);
  }
}
