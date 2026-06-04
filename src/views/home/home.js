import './home.css';
import { navbarComponent } from '../../components/navbar/navbar.js';
import { Hero } from '../../components/hero/hero.js';
import { About } from '../../components/about/about.js';
import { Features } from '../../components/features/features.js';
import { CTA } from '../../components/CTA/CTA.js';
import { Footer } from '../../components/footer/footer.js';

export const homeView = {
  render() {
    return `
      ${navbarComponent.render(null)}
      <main>
        ${Hero()}
        ${About()}
        ${Features()}
        ${CTA()}
      </main>
      ${Footer()}
    `;
  },

  init() {
    navbarComponent.init();

    document.querySelector('.btn-comenzar')?.addEventListener('click', () => {
      window.location.hash = '#/login';
    });

    document.querySelector('.btn-cta')?.addEventListener('click', () => {
      window.location.hash = '#/login';
    });
  },
};
