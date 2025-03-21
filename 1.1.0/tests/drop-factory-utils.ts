import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  DropCreated,
  FeeRecipientUpdated,
  FeeUpdated,
  OwnershipTransferred
} from "../generated/DropFactory/DropFactory"

export function createDropCreatedEvent(
  creator: Address,
  drop: Address,
  token: Address,
  amount: BigInt,
  maxClaims: BigInt,
  zkPassSchemaId: Bytes,
  expiration: BigInt,
  metadataIpfsHash: Bytes
): DropCreated {
  let dropCreatedEvent = changetype<DropCreated>(newMockEvent())

  dropCreatedEvent.parameters = new Array()

  dropCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam("drop", ethereum.Value.fromAddress(drop))
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxClaims",
      ethereum.Value.fromUnsignedBigInt(maxClaims)
    )
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "zkPassSchemaId",
      ethereum.Value.fromFixedBytes(zkPassSchemaId)
    )
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "expiration",
      ethereum.Value.fromUnsignedBigInt(expiration)
    )
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "metadataIpfsHash",
      ethereum.Value.fromFixedBytes(metadataIpfsHash)
    )
  )

  return dropCreatedEvent
}

export function createFeeRecipientUpdatedEvent(
  newFeeRecipient: Address
): FeeRecipientUpdated {
  let feeRecipientUpdatedEvent = changetype<FeeRecipientUpdated>(newMockEvent())

  feeRecipientUpdatedEvent.parameters = new Array()

  feeRecipientUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFeeRecipient",
      ethereum.Value.fromAddress(newFeeRecipient)
    )
  )

  return feeRecipientUpdatedEvent
}

export function createFeeUpdatedEvent(newFee: BigInt): FeeUpdated {
  let feeUpdatedEvent = changetype<FeeUpdated>(newMockEvent())

  feeUpdatedEvent.parameters = new Array()

  feeUpdatedEvent.parameters.push(
    new ethereum.EventParam("newFee", ethereum.Value.fromUnsignedBigInt(newFee))
  )

  return feeUpdatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
