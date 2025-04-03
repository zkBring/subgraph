import {
  DropCreated as DropCreatedEvent,
} from "../generated/DropFactory/DropFactory"
import {
  DropCreated
} from "../generated/schema"
import { Address } from '@graphprotocol/graph-ts';
import { DropERC20Template } from "../generated/templates";
import { ERC20 } from "../generated/DropFactory/ERC20";


export function handleDropCreated(event: DropCreatedEvent): void {
  let entity = new DropCreated(
    event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
  )
  entity.creator = event.params.creator.toHexString()
  entity.drop = event.params.drop.toHexString()
  entity.token = event.params.token.toHexString()
  
  // Get token decimals and symbol
  let tokenAddress = event.params.token
  let erc20Token = ERC20.bind(tokenAddress)
  
  // Try to get decimals and symbol
  let decimalsResult = erc20Token.try_decimals()
  let symbolResult = erc20Token.try_symbol()
  
  entity.decimals = decimalsResult.reverted ? 18 : decimalsResult.value
  entity.symbol = symbolResult.reverted ? "Unknown" : symbolResult.value
  
  entity.amount = event.params.amount
  entity.maxClaims = event.params.maxClaims
  entity.zkPassSchemaId = event.params.zkPassSchemaId.toHexString()
  entity.expiration = event.params.expiration
  entity.metadataIpfsHash = event.params.metadataIpfsHash.toString()
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash.toHexString()
  entity.factoryAddress = event.address.toHexString()

  entity.save()

  DropERC20Template.create(Address.fromString(entity.drop));
}

