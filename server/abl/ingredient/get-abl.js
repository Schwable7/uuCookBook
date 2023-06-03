const path = require("path");
const Ajv = require("ajv").default;
const IngredientDao = require("../../dao/ingredient-dao");
let dao = new IngredientDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

let schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

async function GetAbl(req, res) {
  try {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.params);
    if (valid) {
      const ingredientId = req.params.id;
      const ingredient = await dao.getIngredient(ingredientId);
      if (!ingredient) {
        res
          .status(400)
          .send({ error: `Ingredient with id '${ingredientId}' doesn't exist.` });
      }
      res.json(ingredient);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.params,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = GetAbl;
