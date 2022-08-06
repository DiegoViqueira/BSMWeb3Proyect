const AuditManagment = artifacts.require("AuditManagment");

module.exports = function (deployer) {
  deployer.deploy(AuditManagment);
};

