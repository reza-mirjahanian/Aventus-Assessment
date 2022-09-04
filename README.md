## Merkle Tree Task

By: Reza Mirjahanian

### EXERCISE:

> The code in this file represents a node.js app that demonstrates how
> to create a tree, a proof of inclusion for a random leaf and then
> verifies that the proof is correct. The size of the tree to build is
> passed as a CLI argument.
>
> Your goal in this exercise is two-fold:
>
> 1. Imagine you receive this code in a GitHub Pull-Request submitted by one of your teammates. Write a code review for it with comments as you see fit.
> 2. Improve the code if you are able. Ensure it builds and runs.
> 3. Run the test cases you deem necessary to convince yourself the code is working properly.

### Setup

- Node.JS 14 ( or later )
- Install dependencies `yarn` or `npm i`
- Tree size (CLI arg - 5 here) hard coded in package.json
- `npm start` - Runs project.
- `npm test` - Runs tests.
- `npm run coverage` - Runs code coverage.

### My comments. (Please...)

We should put comments near the code. But I'm going to improve, change and remove it, so I will add it right here.

- 💬 For production, we should discuss topics like the unbalanced tree, duplicate leaf nodes, securities and attacks, max size, memory consumption, and input validation, ...
- 💬 Add ESLint, prettier.
- 💬 Add unit tests.
- 💬 A short comment or JsDoc helps for some sections.
- 💬 It is better to refactor libs to separate files.
- 💬 We can use dependency injection pattern and pass a hash function to MerkleTree, like sha256.
- 💬 Try to group and organize functions better. As an example: "createProof()" is placed inside the "main()".
- 💬 "findIndex()" uses parameters, not global variables.
- 💬 Remove unused variables like "fs = require('fs');"
- 💬 Use modern JS. Replace 'var' with let, const.
- 💬 Replace '==' with '==='.
- 💬 Could you tell us about the "checkTreeSize()" ? It is unused.
- 💬 Don't define implicit variables like "for (i=0; ", "main -> leaf".
- 💬 It is better to validate and cast outer inputs like "process.argv[2]"
- 💬 Global is bad most of the time. "currentIndex"
- 💬 "remLast()" could be shorter.
- 💬 the Proof function sometimes returns ['','','123'].(When the index is near the end.) I'm not sure, it is not OK.
- 💬 In my opinion, class and private methods are better for encapsulation.
- 💬 [We should remember]. "Math.random" is not a real random function.
- 💬 [Minor!] "updatedHashAsHex" var is redundant.
- 💬 [minor!] (condition)?a:b is shorter than if else

### Todo

- 💡 Use TypeScript :)
