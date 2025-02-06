const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;

  if (name === undefined || budget === undefined) {
    return res.status(400).json({ message: "name and budget are required" });
  }
  const trimmedName = name.trim();
  if (trimmedName.length < 3 || trimmedName.length > 100) {
    return res.status(400).json({ message: "name of account must be between 3 and 100" });
  }
  const budgetNumber = Number(budget);
  if (isNaN(budgetNumber)) {
    return res.status(400).json({ message: "budget of account must be a number" });
  }
  if (budgetNumber < 0 || budgetNumber > 1000000) {
    return res.status(400).json({ message: "budget of account is too larg or too small" });
  }
  next();
};


exports.checkAccountNameUnique = async (req, res, next) => {
  const { id } = req.params;
  const account = await db('accounts').where({ id }).first();
  if (!account) {
    return res.status(404).json({ message: "account not found" });
  }
  req.account = account;
  next(next);
};

exports.checkAccountId = async (req, res, next) => {
  const { name } = req.body;
  const trimmedName = name.trim();

  const existingAccount = await db('accounts').where({ name: trimmedName }).first();
  if (existingAccount) {
    return res.status(400).json({ message: "that name is taken" });
  }
  next();
};
