import { Dictionary } from './block';

export class Store {
  private state: Dictionary = {};

  public getState() {
    return this.state;
  }

  public setState(newValue: any) {
    Object.assign(this.state, newValue);
  }

  public setStateAndPersist(newValue: Dictionary, withoutStringify?: boolean) {
    Object.assign(this.state, newValue);
    const entries = Object.entries(newValue)[0];
    const key = entries[0];
    const value = withoutStringify ? entries[1] : JSON.stringify(entries[1]);
    localStorage.setItem(key.toString(), value);
  }
}
