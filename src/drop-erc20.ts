import {
  Claimed as ClaimedEvent,
  MetadataUpdated as MetadataUpdatedEvent,
  BringStaked as BringStakedEvent,
  Stopped as StoppedEvent
} from "../generated/templates/DropERC20Template/DropERC20";
import { Claimed, MetadataUpdated, BringStaked, Stopped } from "../generated/schema";

export function handleClaim(event: ClaimedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let entity = new Claimed(id);

  entity.recipient = event.params.recipient.toHexString()
  entity.uHash = event.params.uHash.toHexString()
  entity.blockTimestamp = event.block.timestamp;
  entity.dropAddress = event.address.toHexString()
  entity.txHash = event.transaction.hash.toHex()
  
  entity.save();
}

export function handleMetadataUpdated(event: MetadataUpdatedEvent): void {
  let id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let entity = new MetadataUpdated(id);
  entity.metadataIpfsHash = event.params.metadataIpfsHash; // already a string
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash.toHexString();
  entity.dropAddress = event.address.toHexString()
  entity.save();
}

export function handleBringStaked(event: BringStakedEvent): void {
  let id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let entity = new BringStaked(id);
  entity.bringToken = event.params.bringToken.toHexString();
  entity.amount = event.params.amount;
  entity.totalStaked = event.params.totalStaked;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash.toHexString();
  entity.dropAddress = event.address.toHexString()
  entity.save();
}

export function handleStopped(event: StoppedEvent): void {
  let id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let entity = new Stopped(id);
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash.toHexString();
  entity.dropAddress = event.address.toHexString()
  entity.save();
}
