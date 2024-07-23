export interface IPerson {
  name: string;
  age: number;
}

export interface IPeopleRepository {
  findByName(name: string): Promise<Person[]>;
  insert(person: Person): Promise<void>;
}
