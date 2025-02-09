const db = require('../../data/db-config');

async function getAll() {
  return await db('accounts');
}

async function getById(id) {
  return await db('accounts').where({ id }).first();
}

async function create(account) {
  const [id] = await db('accounts').insert(account);
  return getById(id);
}

async function updateById(id, changes) {
  await db('accounts').where({ id }).update(changes);
  return getById(id);
}

async function deleteById(id) {
  const account = await getById(id);
  if (account) {
    await db('accounts').where({ id }).delete();
  }
  return account;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
