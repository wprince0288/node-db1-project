const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const error = { status: 400 }
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
    next(error)
  } else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
    next(error)
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
    next(error)
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
    next(error)
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
    next(error)
  }
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
