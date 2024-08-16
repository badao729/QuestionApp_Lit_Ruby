import { html, css, LitElement } from "lit";

const generalStyles = css`
  :host {
    --primary-color: black;
    --secondary-color: white;
  }`;

export class ButtonUnclick extends LitElement {
    static styles = [generalStyles, css`
    :host {
        --blue:#3498db;
        --bg:#2ecc71;
        --font-family: 'Arial, sans-serif';
        --padding: 10px;
        --margin: 10px 0;
    }

    h1 {
        color: var(--blue);
        background-color: var(--bg);
        font-family: var(--font-family);
        padding: var(--padding);
      }
    
    p {
        color: #333;
        line-height: 1.6;
        margin: var(--margin);
      }
    `];

    static properties = {
        title: { type: String },
        content: { type: String },
    };


    constructor(){
        super();
        this.title = "ButtonUnclick";
        this.content = "This is a button that doesn't do anything.";
    }

    render() {
        return html`
        <div class='button'>
            <button><h1>${this.title}</h1></button>
            <button><p>${this.content}</p></button>
        </div>
        `;
    }
}

customElements.define('button-unclick', ButtonUnclick)