import { useState } from "react";
import { usePeopleByName } from "../hooks/index";

export function PeopleList() {
  const [name, setName] = useState<string>("");
  const people = usePeopleByName(name);

  return (
    <div>
      <h1>People List</h1>

      <label>
        Find by name
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>

      {people === null ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {people.map((person, i) => (
            <li key={i}>
              {person.name}, {person.age}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
