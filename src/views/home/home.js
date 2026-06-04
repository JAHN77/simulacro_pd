import { Navbar } from "../../components/navbar/navbar.js";
import { Hero } from "../../components/hero/hero.js";
import { About } from "../../components/about/about.js";
import { Features } from "../../components/features/features.js";
import { CTA } from "../../components/CTA/CTA.js";
import { Footer } from "../../components/footer/footer.js";

export function Home() {

  return `
  
    ${Navbar()}
    
    <main>

      ${Hero()}

      ${About()}

      ${Features()}

      ${CTA()}

    </main>

    ${Footer()}
  `;




}

 