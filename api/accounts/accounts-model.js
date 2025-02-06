const db = require('../../data/db-config');

const getAll = () => db('accounts');

const getById = id => db('accounts').where('id', id).first();

const create = async account => {
  const [id] = await db('accounts').insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  const updated = await db('accounts').where('id', id).update(account);
  return updated ? getById(id) : null;
}

const deleteById = async id => {
  const account = await getById(id);
  if (account) {
    await db('accounts').where('id', id).delete();
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
