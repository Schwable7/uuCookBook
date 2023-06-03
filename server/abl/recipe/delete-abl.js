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

async function DeleteAbl(req, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(schema, req.params);
  try {
    if (valid) {
      const recipeId = req.params.id;
      await dao.deleteRecipe(recipeId);
      res.json({});
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.params,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = DeleteAbl;
