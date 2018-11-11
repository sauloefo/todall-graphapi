export default interface IStorage {
  save(record: any): void;
  retrieve(): any;
}