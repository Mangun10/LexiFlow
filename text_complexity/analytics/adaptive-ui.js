class AdaptiveCSSManager {
    constructor() {
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      this.debounceTimeout = null;
      
      // Initialize default dyslexia-friendly styles
      this.applyStyles({
        fontFamily: 'OpenDyslexic, Arial',
        lineHeight: '1.6',
        letterSpacing: '0.075em'
      });
    }
  
    debounce = (fn, delay) => {
      return (...args) => {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => fn.apply(this, args), delay);
      };
    };
  
    applyStyles = (styles) => {
      const cssRules = Object.entries(styles)
        .map(([prop, value]) => `${prop}: ${value} !important;`)
        .join('\n');
      
      this.styleElement.textContent = `
        .dyslexia-friendly {
          ${cssRules}
        }
      `;
    };
  
    handleResize = this.debounce(() => {
      const viewportWidth = window.innerWidth;
      const fontSize = viewportWidth < 768 ? '18px' : '20px';
      this.applyStyles({ fontSize });
    }, 300);
  
    init() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize(); // Initial application
    }
  }
  