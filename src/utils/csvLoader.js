import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

export function getRawProducts() {
  const csvPath = path.resolve('src/data/products.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  return records.map(item => {
    // Izvlačimo ID jedinstveno iz Promotion URL-a ili ProductId kolone
    const prodId = item['ProductId'] || Math.random().toString();

    return {
      id: prodId,
      title: item['Product Desc'], // Nova kolona za naziv proizvoda
      imageUrl: item['Image Url'], // Nova kolona za sliku
      videoUrl: item['Video Url'] || null, // Tvoja nova kolona za video
      affiliateUrl: item['Promotion Url'], // Nova kolona za tvoj affiliate link
      price: item['Discount Price'] ? `${item['Currency'] || '$'} ${item['Discount Price']}` : 'Check Price' // Spaja valutu i cenu
    };
  });
}

// Pošto novi fajl nema kategorije, vraćamo prazan niz da ne lomi ostatak koda
export function getAutomatedCategories() {
  return [];
}
