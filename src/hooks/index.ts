import EventEmitter from "eventemitter3";
import { useCallback, useEffect, useState } from "react";
import { IPerson, IPeopleRepository } from "../repositories/types";
import { MockPeopleRepository } from "../repositories/mock/people";

// Initialization
// =============================================================================

// We create a new event emitter singleton that will be used:
//  1. By the repositories to trigger events
//  2. By the hooks to listen to those events and re-render if needed
const emitter = new EventEmitter();

// Now we initialize the repositories. Note that we set the variable to the
// interface type, not the concrete class. This is key to easily change the
// implementation later. Once we have the actual `IPeopleRepository`
// implementation, we can replace `MockPeopleRepository` with it and it should
// "just work".
//
// Another thing to note is that this is also a singleton. We'll use this
// repository instance across our application. We can use it as a regular
// object and all relevant hooks will be updated when the repository changes.
export const peopleRepository: IPeopleRepository = new MockPeopleRepository(
  emitter,
);

// Application hooks
// =============================================================================
export const usePeopleByName = (name: string) => {
  const [people, setPeople] = useState<IPerson[] | null>(null);
  // The counter is used as a way to force the component to re-render when the
  // person repository changes.
  const [counter, setCounter] = useState(1);

  const handlePeopleRepositoryChanged = useCallback(
    (person: IPerson) => {
      // Because we know that `findByName` will only return people whose name
      // contains our `name` variable, we can check here if the person that
      // changed is relevant to this hook.
      //
      // If not, we don't need a re-render, but this step could be optional if
      // you prefer to keep things simple.
      if (person.name.includes(name)) {
        setCounter((counter) => counter + 1);
      }
    },
    [name],
  );

  useEffect(() => {
    emitter.on("people:changed", handlePeopleRepositoryChanged);
    setPeople(null);

    peopleRepository
      .findByName(name)
      .then((people) => {
        setPeople(people);
      })
      .catch((error) => {
        throw error;
      });

    return () => {
      emitter.off("people:changed", handlePeopleRepositoryChanged);
    };
  }, [name, counter, handlePeopleRepositoryChanged]);

  return people;
};
