const db = require("../../data/db-config");

function find() {
  return db("schemes as sc")
    .select("sc.*")
    .count("st.step_id", { as: "number_of_steps" })
    .leftJoin("steps as st", "sc.scheme_id", "=", "st.scheme_id")
    .groupBy("sc.scheme_id")
    .orderBy("sc.scheme_id");
}

async function findById(id) {
  // EXERCISE B
  const rows = await db("schemes as sc")
    .select("sc.scheme_name", "st.*")
    .leftJoin("steps as st", "sc.scheme_id", "=", "st.scheme_id")
    .where("sc.scheme_id", id)
    .orderBy("st.step_number");

  const result = {
    scheme_id: rows[0].scheme_id,
    scheme_name: rows[0].scheme_name,
    steps: rows[0].step_id
      ? rows.map((row) => {
          return {
            step_id: row.step_id,
            step_number: row.step_number,
            instructions: row.instructions,
          };
        })
      : [],
  };
  return result;
}

async function findSteps(id) {
  // EXERCISE C
  const rows = await db("schemes as sc")
    .select("sc.scheme_name as scheme_name", "st.*")
    .leftJoin("steps as st", "sc.scheme_id", "=", "st.scheme_id")
    .where("sc.scheme_id", id)
    .orderBy("st.step_number");

  const result = rows[0].step_id
    ? rows.map((row) => {
        return {
          step_id: row.step_id,
          step_number: row.step_number,
          scheme_name: row.scheme_name,
          instructions: row.instructions,
        };
      })
    : [];
  return result;
}

async function add(scheme) {
  // EXERCISE D
  const [id] = await db("schemes as sc").insert(scheme);
  return db("schemes").where("scheme_id", id).first();
}

async function addStep(scheme_id, step) {
  // EXERCISE E
  const addStep = await db("steps")
    .insert({ scheme_id, ...step })
    .then(() => {
      return db("steps as st")
        .select("step_id", "step_number", "instructions", "scheme_name")
        .join("schemes as sc", "sc.scheme_id", "=", "st.scheme_id")
        .orderBy("step_number")
        .where("sc.scheme_id", scheme_id);
    });

  return addStep;
}

async function doesSchemeExist(id) {
  const scheme = await db("schemes").where("scheme_id", id).first();

  return scheme;
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  doesSchemeExist,
};
