// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";


contract EstablishmentAudit is Ownable{

   string public EstablishmentId;
   mapping(uint=>string) public AuditLogs;
   
 
   constructor (string memory _establishmentId, address owner) {
      EstablishmentId = _establishmentId;
      transferOwnership(owner);
    }
    
    function registerAuditHash(uint auditDate , string memory _auditHash) public onlyOwner returns(bool) {
	    require(bytes(AuditLogs[auditDate]).length == 0 ,  "Audit Date allready registered");
        AuditLogs[auditDate] = _auditHash;
        return true;
        
    }
	
	
	function getAuditHash(uint auditDate ) public view returns(string memory) {
        require(bytes(AuditLogs[auditDate]).length != 0,  "Audit Date doesnt exist");
		return AuditLogs[auditDate];
    }
	
}