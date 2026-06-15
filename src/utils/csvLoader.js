import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

function assignCategory(title) {
  if (!title) return { id: 'other', name: 'Other Items' };
  const text = title.toLowerCase();
  if (text.includes('phone') || text.includes('mouse') || text.includes('keyboard') || text.includes('earphone') || text.includes('cable') || text.includes('charger') || text.includes('led') || text.includes('watch') || text.includes('smart')) return { id: 'tech', name: 'Tech & Gadgets' };
  if (text.includes('dress') || text.includes('shirt') || text.includes('jacket') || text.includes('pants') || text.includes('shoes') || text.includes('bag') || text.includes('ring') || text.includes('jewelry')) return { id: 'fashion', name: 'Fashion & Style' };
  if (text.includes('home') || text.includes('kitchen') || text.includes('cup') || text.includes('tool') || text.includes('light') || text.includes('decor') || text.includes('clean')) return { id: 'home', name: 'Home & Kitchen' };
  if (text.includes('beauty') || text.includes('makeup') || text.includes('care') || text.includes('cream') || text.includes('hair')) return { id: 'beauty', name: 'Beauty & Health' };
  return { id: 'trending', name: 'Trending Deals' };
}

export function getRawProducts() {
  const csvPath = path.resolve('src/data/products.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, { columns: true, skip_empty_lines: true, trim: true });
  return records.map(item => {
    const title = item['Product Desc'] || '';
    const catInfo = assignCategory(title);
    return {
      id: item['ProductId'] || Math.random().toString(),
      title: title,
      imageUrl: item['Image Url'],
      videoUrl: item['Video Url'] || null,
      affiliateUrl: item['Promotion Url'],
      price: item['Discount Price'] ? `${item['Currency'] || '$'} ${item['Discount Price']}` : 'Check Price',
      categoryId: catInfo.id,
      categoryName: catInfo.name
    };
  });
}

export function getAutomatedCategories() {
  const products = getRawProducts();
  const uniqueCategories = [];
  const seenIds = new Set();
  products.forEach(p => {
    if (!seenIds.has(p.categoryId)) {
      seenIds.add(p.categoryId);
      uniqueCategories.push({ id: p.categoryId, name: p.categoryName });
    }
  });
  return uniqueCategories.sort((a, b) => a.name.localeCompare(b.name));
}
