export interface IPerson {
  name: string;
  age: number;
}

export interface IPeopleRepository {
  findByName(name: string): Promise<IPerson[]>;
  insert(person: IPerson): Promise<void>;
}
