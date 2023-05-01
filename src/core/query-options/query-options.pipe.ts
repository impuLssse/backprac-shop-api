import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common"
import { QueryDto } from "./dto/query-options.dto"

@Injectable()
export class QueryPipe implements PipeTransform {
  transform(queries: object, metadata: ArgumentMetadata): QueryDto {
    const dto = new QueryDto()

    for (const query in queries) {
      const value = queries[query]
      const num = Number(value)

      const isBoolean = value === "true" || value === "false"
      const isNumber = !isNaN(num) && num !== 0

      if (isBoolean) {
        dto.include.set(query, value === "true")
      }

      if (isNumber) {
        dto.take.set(query, num)
      }

      if (!(dto.include.has(query) && dto.take.has(query))) {
        dto.all.set(query, value)
      }
    }

    dto.all.delete('include')
    dto.all.delete('take')
    dto.all.delete('all')

    return dto
  }
}
