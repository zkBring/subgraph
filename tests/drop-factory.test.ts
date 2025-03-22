import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { DropCreated } from "../generated/schema"
import { DropCreated as DropCreatedEvent } from "../generated/DropFactory/DropFactory"
import { handleDropCreated } from "../src/drop-factory"
import { createDropCreatedEvent } from "./drop-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let drop = Address.fromString("0x0000000000000000000000000000000000000001")
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let amount = BigInt.fromI32(234)
    let maxClaims = BigInt.fromI32(234)
    let zkPassSchemaId = Bytes.fromI32(1234567890)
    let expiration = BigInt.fromI32(234)
    let metadataIpfsHash = Bytes.fromI32(1234567890)
    let newDropCreatedEvent = createDropCreatedEvent(
      creator,
      drop,
      token,
      amount,
      maxClaims,
      zkPassSchemaId,
      expiration,
      metadataIpfsHash
    )
    handleDropCreated(newDropCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DropCreated created and stored", () => {
    assert.entityCount("DropCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DropCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DropCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "drop",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DropCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DropCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "DropCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "maxClaims",
      "234"
    )
    assert.fieldEquals(
      "DropCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "zkPassSchemaId",
      "1234567890"
    )
    assert.fieldEquals(
      "DropCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expiration",
      "234"
    )
    assert.fieldEquals(
      "DropCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadataIpfsHash",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
