export class LocalStorageService {
  /**
   * Storage
   */
  private readonly storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }

  openPanel(name: string): void {
    return this.storage.setItem(name, 'true');
  }

  closePanel(name: string): void {
    return this.storage.setItem(name, 'false');
  }

  shouldBeExpanded(name: string): boolean {
    const item = this.storage.getItem(name);
    return item === 'true';
  }
}
