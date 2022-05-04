import { BigInt } from "@graphprotocol/graph-ts";
import {
  Message,
  messageDeleted,
  messageSet,
} from "../generated/Message/Message";
import { CreatedEntity, DeletedEntity } from "../generated/schema";

export function handlemessageDeleted(event: messageDeleted): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = DeletedEntity.load(event.transaction.hash.toString());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new DeletedEntity(event.transaction.hash.toString());
  }

  // Entity fields can be set based on event parameters
  entity._sender = event.params._sender;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.readMessage(...)
}

export function handlemessageSet(event: messageSet): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = CreatedEntity.load(event.transaction.hash.toString());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new CreatedEntity(event.transaction.hash.toString());
  }

  entity._sender = event.params._sender;
  entity._message = event.params._message;
  entity._timestamp = event.params._timestamp;

  // Entities can be written to the store with `.save()`
  entity.save();
}
