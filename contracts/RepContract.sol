pragma solidity ^0.5.0;

contract RepContract {
  uint storedData;
  struct RepObject {
    uint[] repValues;
    bytes32[] repCategories;
  }
  mapping (address => RepObject) repProfile;

  function setRep(address user, uint index, uint repValue) public {
    if (repProfile[user].repValues.length > index) {
        repProfile[user].repValues[index] = repValue;
    } else {
        repProfile[user].repValues.push(repValue);
    }
  }

  function getRepValue(uint repIndex, address user) public view returns (uint) {
    return repProfile[user].repValues[repIndex];
  }
}
