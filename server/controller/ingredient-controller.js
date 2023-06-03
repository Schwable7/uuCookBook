const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/ingredient/create-abl");
const GetAbl = require("../abl/ingredient/get-abl");
const UpdateAbl = require("../abl/ingredient/update-abl");
const DeleteAbl = require("../abl/ingredient/delete-abl");
const ListAbl = require("../abl/ingredient/list-abl");

router.post("/", async (req, res) => {
  await CreateAbl(req, res);
});

router.get("/:id", async (req, res) => {
  await GetAbl(req, res);
});

router.put("/", async (req, res) => {
  await UpdateAbl(req, res);
});

router.delete("/:id", async (req, res) => {
  await DeleteAbl(req, res);
});

router.get("/", async (req, res) => {
  await ListAbl(req, res);
});

module.exports = router;
