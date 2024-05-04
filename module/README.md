# Safe Session Module/Fallback handler with ERC-4337 Support

Developed during ETHGlobal Scaling Ethereum hackathon 2024

:warning: **This module MUST only be used with Safe 1.4.1 or newer** :warning:


## Usage

### Install Requirements With NPM:

```bash
npm install
```

### Run Hardhat Integration Tests:

```bash
npm test
```


### Deployments

A collection of the different Safe 4337 modules deployments and their addresses can be found in the [Safe module deployments](https://github.com/safe-global/safe-modules-deployments) repository.

To add support for a new network follow the steps of the Deploy section and create a PR in the [Safe module deployments](https://github.com/safe-global/safe-modules-deployments) repository.

### Deploy

> :warning: **Make sure to use the correct commit when deploying the contracts.** Any change (even comments) within the contract files will result in different addresses. The tagged versions used by the Safe team can be found in the [releases](https://github.com/safe-global/safe-modules/releases).

This will deploy the contracts deterministically and verify the contracts on etherscan and sourcify.

Preparation:

- Set `MNEMONIC` in `.env`
- Set `INFURA_KEY` in `.env`

```bash
npm run deploy-all <network>
```

This will perform the following steps

```bash
npm run build
npx hardhat --network <network> deploy
npx hardhat --network <network> etherscan-verify
npx hardhat --network <network> local-verify
```

### Run script

Preparation:

- Set `DEPLOYMENT_ENTRY_POINT_ADDRESS` in `.env`. This should be the entry point supported by the 4337 bundler RPC endpoint you are connected to.
- Deploy contracts (see _Deploy_ section)
- Set `SCRIPT_*` in `.env`

```bash
npx hardhat run scripts/runOp.ts --network goerli
```

### Compiler settings

The project uses Solidity compiler version `0.8.21` with 10 million optimizer runs, as we want to optimize for the code execution costs. The EVM version is set to `paris` because not all our target networks support the opcodes introduced in the `Shanghai` EVM upgrade.

After careful consideration, we decided to enable the optimizer for the following reasons:

- The most critical functionality, such as signature checks and replay protection, is handled by the Safe and Entrypoint contracts.
- The entrypoint contract uses the optimizer.

#### Custom Networks

It is possible to use the `NODE_URL` env var to connect to any EVM-based network via an RPC endpoint. This connection can then be used with the `custom` network.

E.g. to deploy the Safe contract suite on that network, you would run `yarn deploy-all custom`.

The resulting addresses should be on all networks the same.

Note: The address will vary if the contract code changes or a different Solidity version is used.

### Verify contract

This command will use the deployment artifacts to compile the contracts and compare them to the onchain code.

```bash
npx hardhat --network <network> local-verify
```

This command will upload the contract source to Etherscan.

```bash
npx hardhat --network <network> etherscan-verify
```
