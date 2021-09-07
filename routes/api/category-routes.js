const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryDataAll = await Category.findAll({
      include: [{ model: Product }],
      order: [["id", "ASC"]],
    });
    res.status(200).json(categoryDataAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryDataById) {
      res.status(404).json({
        message: `No category matches the requested id: ${req.params.id}`,
      });
      return;
    }
    res.status(200).json(categoryDataById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categorytoCreat = await Category.create(req.body);
    res.status(200).json(["A category created as follows:", categorytoCreat]);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryDataToUpdateById = await Category.findByPk(req.params.id);
    if (!categoryDataToUpdateById) {
      res.status(404).json({
        message: `No category found with id :${req.params.id} to delete!`,
      });
      return;
    }
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(["The category is updated as follows:", categoryDataToUpdateById]);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDataToDeleteById = await Category.findByPk(req.params.id);
    if (!categoryDataToDeleteById) {
      res.status(404).json({
        message: `No category found with id :${req.params.id} to delete!`,
      });
      return;
    }
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json(["The following category is deleted:", categoryDataToDeleteById]);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
