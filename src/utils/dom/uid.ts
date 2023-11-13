let count = 0;

export class Id {
  id: string;
  href: string;

  constructor(id: string) {
    this.id = id;
    this.href = new URL(`#${id}`, window.location.href).toString();
  }

  toString() {
    return `url(${this.href})`;
  }
}

export function uid(name?: string): Id {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}
