const allRoles = {
  User: ['getUsers', 'manageUsers', 'managerProduct'],
  Admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
