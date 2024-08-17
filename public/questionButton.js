import { html, css, LitElement } from 'https://unpkg.com/lit@2.0.0/index.js?module';

export class QuestionButton extends LitElement {

  static styles = css`
    button {
      background-color: #eaddff;
      border: 2px solid #6750a4;
      padding: 0.5rem;
      text-align: center;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
      transition: background-color 0.3s ease;
      width: 100%;
    }

    button.clicked {
      background-color: white;
    }

    span {
      display: inline-block;
      background-color: #f5eff7;
      color: #6750a4;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      text-align: center;
      line-height: 2rem;
      margin-right: 0.5rem;
    }

    span.clicked {
      background-color: #eaddff;
    }
  `;

  static selectedButton = null;

  static properties = {
    content: { type: String },
    questionId: { type: String }
  };

  constructor() {
    super();
    this.content = 'Question';
    this.questionId = '';
  }

  render() {
    return html`
      <button @click=${this.loadQuestion}><span>?</span>${this.content}</button>
    `;
  }

  loadQuestion() {
    const button = this.shadowRoot.querySelector('button');
    const span = this.shadowRoot.querySelector('span');

    // Reset selected button
    if (QuestionButton.selectedButton) {
      QuestionButton.selectedButton.classList.remove('clicked');
      
    const previousSpan = QuestionButton.selectedButton.querySelector('span');
    if (previousSpan) {
        previousSpan.classList.remove('clicked');
      }
    }

    // Mark button selected
    button.classList.add('clicked');
    span.classList.add('clicked');

    // Update to the currently selected button
    QuestionButton.selectedButton = button;

    // Get question id
    const questionId = this.getAttribute('question-id');

    // Update options in the HTML
    fetch(`/options/${questionId}`)
      .then(response => response.json())
      .then(data => {
        document.querySelector('#option-a').innerText = data.option_a;
        document.querySelector('#option-b').innerText = data.option_b;
      })
      .catch(error => {
        console.error('Error fetching options for questionId:', questionId);
        console.error('Error details:', error);
      });
  }

  updateContent(newContent) {
    this.content = newContent;
    this.requestUpdate();
  }
}

customElements.define('question-button', QuestionButton);
