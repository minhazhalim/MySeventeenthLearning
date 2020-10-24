const template = document.createElement('template');
template.innerHTML = 
     `<style>
     .tooltip-container {
          display: inline-block;
          position: relative;
          z-index: 2;
     }
     svg {
          width: 1em;
          cursor: pointer;
     }
     .cancel {
          display: none;
     }
     .notify-container {
          position: absolute;
          bottom: 125%;
          z-index: 9;
          width: 300px;
          background-color: white;
          box-shadow: 5px 5px 10px rgba(0,0,0,0.1);
          font-size: 0.8em;
          border-radius: 0.5em;
          padding: 1em;
          transform: scale(0);
          transform-origin: bottom left;
          transition: transform 0.5s cubic-bezier(0.860,0.000,0.070,1.000);
     }
     </style>
     <div class="tooltip-container">
     <svg viewBox="0 0 16 16" class="bi bi-exclamation alert" fill="currentColor">
     <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
     </svg>
     <svg viewBox="0 0 16 16" class="bi bi-file-x-fill cancel" fill="currentColor">
     <path fill-rule="evenodd" d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.854 6.146a.5.5 0 1 0-.708.708L7.293 8 6.146 9.146a.5.5 0 1 0 .708.708L8 8.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 8l1.147-1.146a.5.5 0 0 0-.708-.708L8 7.293 6.854 6.146z"/>
     </svg>
     <div class="notify-container">
     <slot name="message"/>
     </div>
     </div>`;
class PopupNotify extends HTMLElement {
     constructor(){
          super();
          this.attachShadow({mode: 'open'});
          this.shadowRoot.appendChild(template.content.cloneNode(true));
     }
     tooltip(expandState){
          const tooltip = this.shadowRoot.querySelector('.notify-container');
          const alert = this.shadowRoot.querySelector('.alert');
          const cancel = this.shadowRoot.querySelector('.cancel');
          if(expandState == true){
               tooltip.style.transform = 'scale(1)';
               alert.style.display = 'none';
               cancel.style.display = 'block';
               expandState = false;
          }else{
               tooltip.style.transform = 'scale(0)';
               cancel.style.display = 'none';
               alert.style.display = 'block';
          }
     }
     connectedCallback(){
          this.shadowRoot.querySelector('.alert').addEventListener('click',() => {
               this.tooltip(true);
          });
          this.shadowRoot.querySelector('.cancel').addEventListener('click',() => {
               this.tooltip(false);
          });
          if(this.getAttribute('tip-background')){
               this.shadowRoot.querySelector('.notify-container').style.background = this.getAttribute('tip-background');
          }
          if(this.getAttribute('tip-color')){
               this.shadowRoot.querySelector('.notify-container').style.color = this.getAttribute('tip-color');
          }
     }
}
window.customElements.define('popup-notify',PopupNotify);