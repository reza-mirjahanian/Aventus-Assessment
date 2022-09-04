'use strict';
const expect = require('chai').expect;
const MerkleTreeClass = require('../../src/lib/MerkleTree');
const { randomInt, hash } = require('../../src/utils/helpers');

suite('Testing MerkleTree', () => {
  suite('->createMerkleTree()', () => {
    test('should create the merkle tree correctly', () => {
      const merkleTree = new MerkleTreeClass();
      //5 leaves
      const leaves1 = [
        'd78bc97f1215d5a1357e8f7b5810978ca4611fb5215adb7e4e027a56b60f09a4',
        '65274835768585b229a4b52906dd35abc2311aa4bc0cbb4c27846bcce98aee47',
        'd15c14e827b1c5e6ca6ffbf2680180b04bd89f757e8f4bc22a50f45550c27c31',
        '2b40d2219d8c275ec7ce588ce8140f65721cc31ad20531867d18b9688c9f642e',
        '515088f4dfa62ab0151eda0299960a21f32ee94046cb6c340b72744dd2d74380',
      ];

      const tree = merkleTree.createMerkleTree(leaves1);
      expect(tree.root).to.be.equal(
        '8a954394e1ed30efd7264944f1427921fddb4be39dfa137bb46ce53fb21e1f09'
      );
      expect(tree.nodes).to.be.an('array');
      expect(tree.nodes.length).to.be.equal(4);

      //4 leaves
      const leaves2 = [
        'd78bc97f1215d5a1357e8f7b5810978ca4611fb5215adb7e4e027a56b60f09a4',
        '65274835768585b229a4b52906dd35abc2311aa4bc0cbb4c27846bcce98aee47',
        'd15c14e827b1c5e6ca6ffbf2680180b04bd89f757e8f4bc22a50f45550c27c31',
        '2b40d2219d8c275ec7ce588ce8140f65721cc31ad20531867d18b9688c9f642e',
      ];
      const tree2 = merkleTree.createMerkleTree(leaves2);
      expect(tree2.root).to.be.equal(
        'f2da1926106c90d69d3f7463541bd1862e1df785b9af65ae60bedbe3cee0fd0c'
      );
      expect(tree2.nodes).to.be.an('array');
      expect(tree2.nodes.length).to.be.equal(3);

      //6 leaves
      const leaves3 = [
        'd78bc97f1215d5a1357e8f7b5810978ca4611fb5215adb7e4e027a56b60f09a4',
        '65274835768585b229a4b52906dd35abc2311aa4bc0cbb4c27846bcce98aee47',
        'd15c14e827b1c5e6ca6ffbf2680180b04bd89f757e8f4bc22a50f45550c27c31',
        '2b40d2219d8c275ec7ce588ce8140f65721cc31ad20531867d18b9688c9f642e',
        '515088f4dfa62ab0151eda0299960a21f32ee94046cb6c340b72744dd2d74380',
        '115088f4dfa62ab0151eda0299960a21f32ee94046cb6c340b72744dd2d74389',
      ];
      const tree3 = merkleTree.createMerkleTree(leaves3);

      expect(tree3.root).to.be.equal(
        '5dfc2a2157b4bbfbbc2b2a89f58593b763816ed6f7d3bab1d805ad702388a373'
      );
      expect(tree3.nodes).to.be.an('array');
      expect(tree3.nodes.length).to.be.equal(4);
    });

    test('should handle invalid input correctly', () => {
      const merkleTree = new MerkleTreeClass();

      expect(() => {
        merkleTree.createMerkleTree([]);
      }).to.throw('Data should be array of string');
      expect(() => {
        merkleTree.createMerkleTree();
      }).to.throw('Data should be array of string');
    });
  });

  suite('->createProof()', () => {
    test('should verify the proof correctly', () => {
      const merkleTree = new MerkleTreeClass();

      const dataSamples = [
        'd78bc97f1215d5a1357e8f7b5810978ca4611fb5215adb7e4e027a56b60f09a4',
        '65274835768585b229a4b52906dd35abc2311aa4bc0cbb4c27846bcce98aee47',
        'd15c14e827b1c5e6ca6ffbf2680180b04bd89f757e8f4bc22a50f45550c27c31',
        '2b40d2219d8c275ec7ce588ce8140f65721cc31ad20531867d18b9688c9f642e',
        '515088f4dfa62ab0151eda0299960a21f32ee94046cb6c340b72744dd2d74380',
        '2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
        '7075152d03a5cd92104887b476862778ec0c87be5c2fa1c0a90f87c49fad6eff',
        'e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a',
      ];

      for (let i = 1; i <= dataSamples.length; i++) {
        const leaves = dataSamples.slice(0, i);
        const tree = merkleTree.createMerkleTree(leaves);

        leaves.forEach((leaf, i) => {
          const proof = merkleTree.createProof(tree, i);
          expect(merkleTree.verify(leaf, proof, tree.root)).to.be.equal(true);
          expect(
            merkleTree.verify(hash('randomHash' + i), proof, tree.root)
          ).to.be.equal(false);
        });
      }
    });

    test('should return the proof correctly', () => {
      const merkleTree = new MerkleTreeClass();

      const leaves = [
        'd78bc97f1215d5a1357e8f7b5810978ca4611fb5215adb7e4e027a56b60f09a4',
        '65274835768585b229a4b52906dd35abc2311aa4bc0cbb4c27846bcce98aee47',
        'd15c14e827b1c5e6ca6ffbf2680180b04bd89f757e8f4bc22a50f45550c27c31',
        '2b40d2219d8c275ec7ce588ce8140f65721cc31ad20531867d18b9688c9f642e',
        '515088f4dfa62ab0151eda0299960a21f32ee94046cb6c340b72744dd2d74380',
      ];
      const tree = merkleTree.createMerkleTree(leaves);
      const leafIndex = 2;
      const proof = merkleTree.createProof(tree, leafIndex);
      expect(proof.length).to.be.equal(3);
      expect(proof).to.include.members([
        leaves[3],
        hash(leaves[1] + leaves[0]),
        hash(hash(leaves[4])),
      ]);
    });
  });
});
