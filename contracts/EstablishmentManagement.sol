// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";


contract EstablishmentManagement is Ownable{

   address[] public establishmentAudit;
   mapping(string=>address) public addressEstablishments;
   
   
   function newEstablishment(string memory establishmentID ) public onlyOwner returns (bool success) {
		require(addressEstablishments[establishmentID] == address(0), "Establishment allready registered");
		address newEstablishment = address(new EstablishmentAudit(establishmentID,msg.sender));            
		establishmentAudit.push(newEstablishment);   
		addressEstablishments[establishmentID] = newEstablishment;
		returns true;
    }
   
     
    function registerAudit( string memory establishmentID , uint memory auditDate , bytes32 memory auditHash) public returns(bool) {
		require(addressEstablishments[establishmentID] != address(0), "Establishment not registered");	
		assert( EstablishmentAudit(addressEstablishments[establishmentID]).registerAuditHash(auditDate,auditHash));
        
    }
   
    function auditEstablishmentDate( string memory establishmentID , uint memory auditDate ) public view returns(bytes32) {
		require(addressEstablishments[establishmentID] != address(0), "Establishment not registered");	
		return EstablishmentAudit(addressEstablishments[establishmentID]).getAuditHash(auditDate);
        
    }
   
}