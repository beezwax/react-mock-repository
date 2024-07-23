import type EventEmitter from "eventemitter3";
import { IPeopleRepository, IPerson } from "../types";

/**
 * This is a mock implementation of `IPeopleRepository`. It's used to simulate
 * a real repository that has a delay in the operations (like a network
 * request).
 */
export class MockPeopleRepository implements IPeopleRepository {
  private emitter: EventEmitter;
  private people: IPerson[] = [];
  private delay: number;

  constructor(emitter: EventEmitter, delay = 300) {
    this.emitter = emitter;
    this.delay = delay;
    this.people = [];
  }

  findByName(name: string): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve) => {
      setTimeout(() => {
        resolve(this.people.filter((person) => person.name.includes(name)));
      }, this.delay);
    });
  }

  async insert(person: IPerson): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.people.push(person);
        this.emitter.emit("people:changed", person);
        resolve();
      }, this.delay);
    });
  }
}
