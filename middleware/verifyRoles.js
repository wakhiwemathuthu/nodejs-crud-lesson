function verifyRoles(...allowedRoles) {
  return (req, res, next) => {
    const rolesArray = [...allowedRoles];
    const result = req.userInfo.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    return next();
  };
}

module.exports = verifyRoles;
