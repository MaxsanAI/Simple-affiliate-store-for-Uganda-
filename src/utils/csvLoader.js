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

  return records.map(item => ({
    id: item['Product Url'] ? item['Product Url'].split('/').pop().split('.')[0] : Math.random().toString(), 
    title: item['Product Name'],
    categoryId: item['CategoryID'] || 'uncategorized',
    categoryName: item['Category Name'] || 'General',
    imageUrl: item['Product Image Url'],
    affiliateUrl: item['Click url'], 
    price: item['SalePrice']
  }));
}

export function getAutomatedCategories() {
  const products = getRawProducts();
  const uniqueIds = [...new Set(products.map(p => p.categoryId))];
  return uniqueIds.sort();
}
