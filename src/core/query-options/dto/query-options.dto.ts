export class Entities {
  category: string | number | boolean
  urls: string | number | boolean
  user: string | number | boolean
  products: string | number | boolean
  basket: string | number | boolean

  constructor(value: string | number | boolean) {
    this.category = value
    this.urls = value
    this.user = value
    this.products = value
    this.basket = value
  }
}


export class QueryDto {
  include: Map<string, boolean> = new Map(Object.entries(new Entities(false)))
  take: Map<string, number> = new Map(Object.entries(new Entities(0)))
  all: Map<string, string> = new Map()
}
