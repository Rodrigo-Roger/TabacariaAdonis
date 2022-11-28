import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    nome: schema.string([
      rules.maxLength(50),
      rules.regex(/^[a-zA-Z0-9]+$/)
    ]),
    CPF: schema.string({}, [
      rules.unique({ table: 'clientes', column: 'CPF' })
    ]),
    telefone: schema.number(),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'clientes', column: 'email' })
    ])

  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
  unique:"Valor exitente:Insira Outro",
  string:'insira um valor do Tipo:String ',
  number:'insira um valor do Tipo:Number(numerico) ',
  regex:'Esse capo deve ter apenas letras!'
  }
}
