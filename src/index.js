const { randomInt } = require('./utils/helpers');
const { generateBulkHash } = require('./utils/dataGenerator');
const MerkleTree = require('./lib/MerkleTree');

async function main() {
  const treeSize = Number(process.argv[2]);
  if (treeSize < 1) {
    throw Error('Invalid size of the tree passed as a CLI argument');
  }

  const merkleTree = new MerkleTree();

  const leaves = generateBulkHash(treeSize);
  const tree = merkleTree.createMerkleTree(leaves);
  console.log('Root', tree.root, '\nTree', tree.nodes);

  const randomIndex = randomInt(leaves.length);
  const proof = merkleTree.createProof(tree, randomIndex);
  console.log('Leaf Index', randomIndex);
  console.log('Proof', proof);

  const leaf = leaves[randomIndex];

  //Check validity
  console.log(
    merkleTree.verify(leaf, proof, tree.root) ? 'is valid' : 'is not valid!'
  );
}

(async () => {
  await main();
})().catch((e) => {
  console.log(e);
  process.exit(0);
});
