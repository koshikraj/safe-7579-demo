import {
  bundlerActions
} from "./chunk-32UEECII.js";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions
} from "./chunk-YJJSOPWD.js";
import "./chunk-7L37OE6G.js";
import {
  createClient
} from "./chunk-LYDXG5YA.js";
import "./chunk-EUBNUXNN.js";
import "./chunk-NY2Q42KW.js";
import "./chunk-LU3NF5RD.js";
import "./chunk-ABLC2WDW.js";
import "./chunk-J32WSRGE.js";

// node_modules/permissionless/_esm/clients/pimlico.js
var createPimlicoBundlerClient = (parameters) => {
  const { key = "public", name = "Pimlico Bundler Client" } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "pimlicoBundlerClient"
  });
  return client.extend(bundlerActions(parameters.entryPoint)).extend(pimlicoBundlerActions(parameters.entryPoint));
};
var createPimlicoPaymasterClient = (parameters) => {
  const { key = "public", name = "Pimlico Paymaster Client" } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "pimlicoPaymasterClient"
  });
  return client.extend(pimlicoPaymasterActions(parameters.entryPoint));
};
export {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient
};
//# sourceMappingURL=permissionless_clients_pimlico.js.map
