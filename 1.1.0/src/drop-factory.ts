import {
  DropCreated as DropCreatedEvent,
  FeeRecipientUpdated as FeeRecipientUpdatedEvent,
  FeeUpdated as FeeUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/DropFactory/DropFactory"
import {
  DropCreated,
  FeeRecipientUpdated,
  FeeUpdated,
  OwnershipTransferred
} from "../generated/schema"

export function handleDropCreated(event: DropCreatedEvent): void {
  let entity = new DropCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.drop = event.params.drop
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.maxClaims = event.params.maxClaims
  entity.zkPassSchemaId = event.params.zkPassSchemaId
  entity.expiration = event.params.expiration
  entity.metadataIpfsHash = event.params.metadataIpfsHash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeRecipientUpdated(
  event: FeeRecipientUpdatedEvent
): void {
  let entity = new FeeRecipientUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFeeRecipient = event.params.newFeeRecipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeUpdated(event: FeeUpdatedEvent): void {
  let entity = new FeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFee = event.params.newFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
