import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Pošto radimo čist statički sajt, output je podrazumevano 'static'
  output: 'static',
  
  // Cloudflare Pages podrazumevano traži 'dist' folder za gotov sajt, 
  // što je i Astroov fabrički folder, tako da ovde nema potrebe za menjanjem putanja.
  integrity: true,
  compressHTML: true, // Automatski smanjuje veličinu HTML-a radi bržeg učitavanja sajta
});
