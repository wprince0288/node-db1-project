const router = require('express').Router()
const Accounts = require('./accounts-model');
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
} = require('./accounts-middeware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    res.json(req.account);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create({ ...req.body, name: req.body.name.trim() });
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, { ...req.body, name: req.body.name.trim() });
    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Accounts.deleteById(req.params.id);
    res.json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = router;
