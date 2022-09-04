const { randomInt, hash } = require('./helpers');

//Just generate a dummy data as leaf
const createLeaf = (seed) => {
  //@todo naming is not very clear
  const _someMagicalHexValue = (seed) => {
    const seedQuarter = seed / 4;
    let shiftedSeedQuarter = 1 << seedQuarter;
    const someVal = shiftedSeedQuarter * seed;
    return someVal.toString(16);
  };

  return {
    account: 'Account' + seed,
    token: _someMagicalHexValue(seed),
    balance: seed * 100,
    print: function () {
      return `${this.account}-${this.token}:${this.balance}`;
    },
  };
};
exports.createLeaf = createLeaf;

//Just generate some dummy data as leaves (count times).
exports.generateBulkHash = (count) => {
  let leaves = [];
  for (let leavesCreated = 0; leavesCreated < count; leavesCreated++) {
    let diceRoll = randomInt(100);
    leaves.push(createLeaf(diceRoll));
  }
  return leaves.map((leaf) => hash(leaf.print()));
};
