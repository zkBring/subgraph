import {
  DropCreated as DropCreatedEvent,
} from "../generated/DropFactory/DropFactory"
import {
  DropCreated
} from "../generated/schema"
import { Address } from '@graphprotocol/graph-ts';
import { DropERC20Template } from "../generated/templates";


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

  DropERC20Template.create(Address.fromBytes(entity.drop));

}

