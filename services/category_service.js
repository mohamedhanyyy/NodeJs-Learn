const CategoryModel = require('../models/category_model');
const slugify = require('slugify');

module.exports = async function createCategory(data) {
  if (!data || !data.name) {
    throw new Error('Category name is required');
  }
  const existing = await CategoryModel.findOne({ name: data.name });
  if (existing) {
    return { message: 'Category already exists', data: existing };
  }
  const category = new CategoryModel({
    name: data.name,
    slug: slugify(data.name, { lower: true })
  });
  const saved = await category.save();
  return { message: 'Category created', data: saved };
};
