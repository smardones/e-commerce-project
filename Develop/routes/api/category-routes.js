const router = require('express').Router();
const { Category, Product } = require('../../models');
const seedProducts = require('../../seeds/product-seeds');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(dbCategoryInfo =>  {
    if(!dbCategoryInfo) {
    res.status(404).json({message: 'No category matches that ID'});
  }
  res.json(dbCategoryInfo)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })

});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(dbCategoryInfo =>  {
    if(!dbCategoryInfo) {
    res.status(404).json({message: 'No category matches that ID'});
  }
  res.json(dbCategoryInfo)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategory => res.json(newCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
    })
  });

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedCat => res.json(updatedCat))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryInfo => {
    if(!dbCategoryInfo) {
      res.status(404).json({message: 'No product with that ID'});
      return;
    }
    res.json(dbCategoryInfo);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;
