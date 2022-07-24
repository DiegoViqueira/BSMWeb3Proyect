// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract EstablishmentAudit is Ownable{

   string public EstablishmentId;
   address public owner;
   mapping(uint=>bytes32) public AuditLogs;
   
 
   constructor (string memory _establishmentId, address _owner)  {
      EstablishmentId = _establishmentId;
      owner = _owner;
	}
    
    function registerAuditHash(uint memory auditDate , bytes32 memory auditHash) public onlyOwner returns(bool) {
		require(AuditLogs[auditDate] == address(0), "Audit Date allready registered");
		AuditLogs[auditDate] = auditHash;
		return true;
        
    }
	
	
	function getAuditHash(uint memory auditDate ) public view returns(bytes32) {
		require(AuditLogs[auditDate] != address(0), "Audit Date not registered");
		return AuditLogs[auditDate];
    }
	
}