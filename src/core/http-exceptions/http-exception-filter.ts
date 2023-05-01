import {
  ArgumentsHost,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common"
import { Catch } from "@nestjs/common"
import { MustBeUniqueException } from "./must-be-unique.exception"
import { BaseExceptionFilter } from "@nestjs/core"
import { Response } from "express"
import { Prisma } from "@prisma/client"
import { Exceptions } from "src/phrases/exception.phrases"

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const res: Response = ctx.getResponse()

    const findText = (target: string, message: string): string => {
      const matched = message.indexOf(target)
      const sliced = message.slice(matched)
      return matched === -1 ? undefined : sliced
    }

    try {
      if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        if (exception.code === "P2002") {
          throw new MustBeUniqueException(findText("Unique", exception.message))
        }

        if (exception.code === "P2003") {
          throw new NotFoundException(findText("Foreign", exception.message))
        }

        if (exception.code === "P2014") {
          throw new NotFoundException(
            findText("The change you are trying", exception.message)
          )
        }
      }

      if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(exception)
        throw new BadRequestException(Exceptions.INTERNAL_SERVER_ERROR)
      }

      if (exception instanceof BadRequestException) {
        const res = exception.getResponse() as any
        throw new BadRequestException(res.message)
      }

      throw new BadRequestException(
        "Oops... Unhandler error. Maybe you specified something wrong?"
      )
    } catch (e) {
      const statusCode: number = e.status | e.statusCode ?? 400
      const message: unknown = e.response.message || e.message

      this.applicationRef.reply(
        res,
        {
          statusCode,
          error: `Cannot ${res.req.method} ${res.req.originalUrl}`,
          message,
        },
        statusCode
      )
    }
  }
}
