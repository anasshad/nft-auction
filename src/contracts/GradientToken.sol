// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GradientToken is IERC721, ERC721, Ownable {
    struct Gradient {
        string innerColor;
        string outerColor;
    }

    Gradient[] public gradients;

    address payable public ownerAddress;

    constructor() ERC721("GradientToken", "GRT") {
        ownerAddress = payable(msg.sender);
    }

    mapping(uint256 => Gradient) public tokenIdToGradient;

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
    {
        require(msg.value >= 1 ether);
        ownerAddress.transfer(msg.value);
        uint256 id =
            uint256(keccak256(abi.encodePacked(_innerColor, _outerColor))) %
                10000000000;
        Gradient memory gradient =
            Gradient({innerColor: _innerColor, outerColor: _outerColor});
        gradients.push(gradient);
        tokenIdToGradient[id] = gradient;
        _safeMint(msg.sender, id);
    }

    receive() external payable {}
}
