const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Tag');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
      model: Product,
      attributes: ['product_name'],
      through: ProductTag,
      as: 'product_tags'
      }
  ]
})
    .then(dbTagInfo => {
      if(!dbTagInfo) {
        res.status(404).json({message: 'No tags matches that ID'});
      }
      res.json(dbTagInfo)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    include: [
      {
      model: Product,
      attributes: ['product_name'],
      through: ProductTag,
      as: 'product_tags'
      }
  ]
})
    .then(dbTagInfo => {
      if(!dbTagInfo) {
        res.status(404).json({message: 'No tags matches that ID'});
      }
      res.json(dbTagInfo)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagInfo => res.json(dbTagInfo))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedTag => {
    if(!updatedTag) {
      res.status(404).json({message: 'No tag with this ID'});
    }
    res.json(updatedTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagInfo => {
    if(!dbTagInfo) {
      res.status(404).json({message: 'No tag with that ID'});
      return;
    }
    res.json(dbTagInfo);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
