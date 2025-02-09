const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const errorMessage = { status: 400 }
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
  console.log('checkAccountPayload middleware')
  next();
};


exports.checkAccountNameUnique = (req, res, next) => {
  // const { id } = req.params;
  // const account = await db('accounts').where({ id }).first();
  // if (!account) {
  //   return res.status(404).json({ message: "account not found" });
  // }
  // req.account = account;
  console.log('checkAccountNameUnique middleware')
  next();
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: 'not found' })
    } else {
      req.account = account
      next()
    }
  } catch (err) {
    next(err)
  }
};
