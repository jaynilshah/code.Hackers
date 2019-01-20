pragma solidity ^0.5.0;

import "./ERC1155.sol";

contract Asset is ERC1155 {
    mapping (uint256 => address) public minters;

    modifier minterOnly(uint256 _id) {
        require(minters[_id] == msg.sender);
        _;
    }

    function mint(string calldata _name, uint256 _totalSupply, string calldata _uri, uint8 __decimals, string calldata _symbol, uint256 _itemId)
    external returns(uint256 _id) {
        //TODO add require to avoid duplicate items
        _id = _itemId;
        minters[_id] = msg.sender; 

        items[_id].name = _name;
        items[_id].totalSupply = _totalSupply;
        metadataURIs[_id] = _uri;
        _decimals[_id] = __decimals;
        symbols[_id] = _symbol;

        // Grant the items to the minter
        items[_id].balances[msg.sender] = _totalSupply;
    }

    function setURI(uint256 _id, string calldata _uri) external minterOnly(_id) {
        metadataURIs[_id] = _uri;
    }
}
