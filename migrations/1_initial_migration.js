const AuditManagement = artifacts.require("AuditManagement");

module.exports = function (deployer) {
  deployer.deploy(AuditManagement);
};
