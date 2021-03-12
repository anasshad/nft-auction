// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GradientToken is ERC721, Ownable {
    struct Gradient {
        string innerColor;
        string outerColor;
    }

    Gradient[] public gradients;

    constructor() ERC721("GradientToken", "GRT") {}

    function getGradient(uint256 _gradientId)
        public
        view
        returns (string memory inner, string memory outer)
    {
        Gradient memory gradient = gradients[_gradientId];
        inner = gradient.innerColor;
        outer = gradient.outerColor;
    }

    function mint(string memory _innerColor, string memory _outerColor)
        public
        payable
        onlyOwner
    {
        uint256 id =
            uint256(keccak256(abi.encodePacked(_innerColor, _outerColor)));
        gradients.push(
            Gradient({innerColor: _innerColor, outerColor: _outerColor})
        );
        _safeMint(msg.sender, id);
    }
}
