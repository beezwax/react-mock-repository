import { useState } from "react";
import { peopleRepository } from "../hooks/index";

export function PeopleForm() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    peopleRepository.insert({ name, age });
    setName("");
    setAge(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Person</h1>

      <label>
        Name
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>

      <label>
        Age
        <input
          type="number"
          value={age}
          onChange={(e) => {
            setAge(+e.target.value);
          }}
        />
      </label>

      <button>Create</button>
    </form>
  );
}
