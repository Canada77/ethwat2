pragma solidity ^0.5.0;

contract RepContract {
  address storedData;
  struct RepObject {
    uint[] repValues;
    bytes32[] repCategories;
  }
  mapping(address => uint) simpleRep;
  mapping (address => RepObject) repProfile;
//address user, uint index, 
  function setRep(address user, uint repValue) public {
    // if (repProfile[user].repValues.length > index) {
    //     repProfile[user].repValues[index] = repValue;
    // } else {
        repProfile[user].repValues.push(repValue);
    //}
  }

  function set(address x) public {
    storedData = x;
  }

   function get() public view returns (address) {
    return storedData;
  }

  function getRepValue(uint categoryIndex, address user) public view returns (uint) {
    return repProfile[user].repValues[categoryIndex];
  }
}
