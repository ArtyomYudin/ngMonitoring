export class Inventory {
  fetch(start, size) {
    console.log('FETCH!');
  }
}

export interface FetchResult {
  users: User[];
  length: number;
}
