type Id = String | null;

export default class Todo {
  id: Id = null;
  title: String;

  constructor(title: String) {
    this.title = title;
  }
}