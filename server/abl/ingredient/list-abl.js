const path = require("path");
const Ajv = require("ajv").default;
const IngredientDao = require("../../dao/ingredient-dao");
let dao = new IngredientDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

let schema = {
  type: "object",
  properties: {},
  required: [],
};

async function ListAbl(req, res) {
  try {
    const ingredients = await dao.listIngredients();
    res.json(ingredients);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = ListAbl;
