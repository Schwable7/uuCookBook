const path = require("path");
const Ajv = require("ajv").default;
const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
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
      const recipeId = req.params.id;
      const recipe = await dao.getRecipe(recipeId);
      if (!recipe) {
        res
          .status(400)
          .send({ error: `recipe with id '${recipeId}' doesn't exist` });
      }
      res.json(recipe);
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
