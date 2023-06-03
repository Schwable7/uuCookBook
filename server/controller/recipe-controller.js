const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/recipe/create-abl");
const GetAbl = require("../abl/recipe/get-abl");
const UpdateAbl = require("../abl/recipe/update-abl");
const DeleteAbl = require("../abl/recipe/delete-abl");
const ListAbl = require("../abl/recipe/list-abl");

router.post("/", async (req, res) => {
  await CreateAbl(req, res);
});

router.get("/:id", async (req, res) => {
  await GetAbl(req, res);
});

router.put("/:id", async (req, res) => {
  await UpdateAbl(req, res);
});

router.delete("/:id", async (req, res) => {
  await DeleteAbl(req, res);
});

router.get("/", async (req, res) => {
  await ListAbl(req, res);
});

module.exports = router;
