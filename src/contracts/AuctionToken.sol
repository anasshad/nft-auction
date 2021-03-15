// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";

contract AuctionToken is ERC721Holder {
    string public name;
    ERC721 public nft;

    struct Auction {
        address seller;
        uint128 price;
        uint256 startTime;
        uint256 endTime;
        uint256 highestBid;
        address highestBidder;
    }

    mapping(uint256 => Auction) public tokenIdToAuction;

    constructor(address _nftAddress) {
        nft = ERC721(_nftAddress);
        name = "AuctionToken";
    }

    event AuctionCreated(uint256 _tokenId);
    event BidPosted(uint256 _bidAmount, address indexed bidder);

    function createAuction(
        uint256 _tokenId,
        uint128 _price,
        uint256 _startTime,
        uint256 _endTime
    ) public {
        require(
            msg.sender == nft.ownerOf(_tokenId),
            "Should be the owner of token"
        );
        require(_startTime >= block.timestamp);
        require(_endTime >= block.timestamp);
        require(_endTime > _startTime);

        nft.safeTransferFrom(msg.sender, address(this), _tokenId);
        Auction memory auction =
            Auction({
                seller: msg.sender,
                price: _price,
                startTime: _startTime,
                endTime: _endTime,
                highestBid: 0,
                highestBidder: address(0x0)
            });
        tokenIdToAuction[_tokenId] = auction;
        emit AuctionCreated(_tokenId);
    }

    function bid(uint256 _tokenId) public payable {
        require(isBidValid(_tokenId, msg.value));
        Auction memory auction = tokenIdToAuction[_tokenId];
        uint256 highestBid = auction.highestBid;
        if (msg.value > highestBid) {
            tokenIdToAuction[_tokenId].highestBid = msg.value;
            tokenIdToAuction[_tokenId].highestBidder = msg.sender;
            emit BidPosted(msg.value, msg.sender);
        }
    }

    function finalize(uint256 _tokenId, address _to) public {
        Auction memory auction = tokenIdToAuction[_tokenId];
        require(
            msg.sender == auction.seller,
            "Should only be called by the seller"
        );
        require(block.timestamp >= auction.endTime);
        nft.safeTransferFrom(address(this), _to, _tokenId);
        delete tokenIdToAuction[_tokenId];
    }

    function isBidValid(uint256 _tokenId, uint256 _bidAmount)
        internal
        view
        returns (bool)
    {
        Auction memory auction = tokenIdToAuction[_tokenId];
        uint256 startTime = auction.startTime;
        uint256 endTime = auction.endTime;
        address seller = auction.seller;
        uint128 price = auction.price;
        bool withinTime =
            block.timestamp <= startTime && block.timestamp <= endTime;
        bool bidAmountValid = _bidAmount >= price;
        bool sellerValid = seller != address(0);
        return withinTime && bidAmountValid && sellerValid;
    }
}
