import { Claimed } from "../generated/templates/DropERC20Template/DropERC20";

import { ClaimEvent } from "../generated/schema";

export function handleClaim(event: Claimed): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let claimEvent = new ClaimEvent(id);

  claimEvent.recipient = event.params.recipient.toHexString()
  claimEvent.uHash = event.params.uHash.toHexString()
  claimEvent.blockTimestamp = event.block.timestamp;
  claimEvent.dropAddress = event.address.toHexString()

  claimEvent.save();
}
