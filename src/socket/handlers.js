import { ProxyParams } from "../constants";

export const handleSocketStart = error => error
  ? console.error('==== Socket not started! ==== ERROR:', error)
  : console.log(`==== Socket started on ${ProxyParams.SOCKET}`);