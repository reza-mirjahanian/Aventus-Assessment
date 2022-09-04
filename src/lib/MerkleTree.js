const { hash } = require('../utils/helpers');
//Todo private methods
// We can pass the 'hash' function to the class constructor for better decoupling.

module.exports = class MerkleTree {
  /**
   * It is a private function, that generates the next level of the tree.
   * @param {string[]} leaves
   * @returns {string[]}
   */
  _createMerkleTreeLevel(leaves) {
    const numLeaves = leaves.length;

    if (numLeaves < 2) {
      return numLeaves === 1 ? [hash(leaves[0])] : [];
    }

    const treeNodes = [];
    let leafA = '';
    let leafB = leafA;

    for (let i = 0; i < leaves.length; i++) {
      let indexIsEvenCheck = i % 2 === 0;
      if (indexIsEvenCheck) {
        leafA = leaves[i];
      } else {
        leafB = leaves[i];
        let preHash;
        preHash = leafA < leafB ? leafA + leafB : leafB + leafA;

        treeNodes.push(hash(preHash));

        leafA = '';
        leafB = '';
      }
    }

    if (1 <= leafA.length) {
      treeNodes.push(hash(leafA));
    }

    return treeNodes;
  }

  /**
   * creates a Merkle Tree for given data.
   * @param {string[]} data - hashed data as leaves
   * @returns {{nodes: string[][], root: string}}
   */
  createMerkleTree(data) {
    //@todo input validation, maxSize, ...
    if (!Array.isArray(data) || data.length < 1) {
      throw new Error('Data should be array of string');
    }

    let leaves = [...data]; // copy just for not modifying input!
    let tree = {
      nodes: [leaves],
      root: '',
    };

    const maxDepth = 10;

    for (let i = 0; i < maxDepth; i++) {
      let newNodes = this._createMerkleTreeLevel(leaves);

      tree.nodes.push(newNodes);

      if (newNodes.length === 1) {
        tree.root = newNodes[0];
        return tree;
      } else if (newNodes.length === 0) {
        return tree;
      } else {
        leaves = newNodes;
      }
    }
  }

  //create a proof for a tree based on the given index.
  createProof(tree, leafIndex = 0) {
    function _reduceIndexForNextLevel(index) {
      return Math.trunc(index / 2);
    }

    function _remLast(list) {
      return list.slice(0, -1);
    }
    function _findIndex(index) {
      return index % 2 === 0 ? index + 1 : index - 1;
    }
    const resultObj = {
      merklePath: [],
      treeWithoutRoot: '',
    };

    let currentIndex = leafIndex;
    resultObj.treeWithoutRoot = _remLast(tree.nodes);

    for (const nodesOfLevel of resultObj.treeWithoutRoot) {
      let pairIndex = _findIndex(currentIndex);
      resultObj.merklePath.push(
        nodesOfLevel[pairIndex] ? nodesOfLevel[pairIndex] : ''
      );
      currentIndex = _reduceIndexForNextLevel(pairIndex);
    }

    return resultObj.merklePath;
  }

  //Verify the data with proof and root hash
  verify(leaf, proof, root) {
    for (const neighbour of proof) {
      // compare “dictionary” or “lexicographical” order
      leaf = leaf < neighbour ? hash(leaf + neighbour) : hash(neighbour + leaf);
    }
    return leaf === root;
  }
};

// function checkTreeSize(tree) {
//   const MAX_TREE = 1000000;
//
//   if (tree.length > MAX_TREE) {
//     console.log('Max tree size reached');
//   }
//
//   return null;
// }
