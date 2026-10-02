
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Dentist
 * 
 */
export type Dentist = $Result.DefaultSelection<Prisma.$DentistPayload>
/**
 * Model Treatment
 * 
 */
export type Treatment = $Result.DefaultSelection<Prisma.$TreatmentPayload>
/**
 * Model BusinessHours
 * Horario laboral semanal de un dentista. Un registro por día.
 * dayOfWeek usa la convención de JS: 0 = domingo ... 6 = sábado.
 */
export type BusinessHours = $Result.DefaultSelection<Prisma.$BusinessHoursPayload>
/**
 * Model Appointment
 * Reserva de una hora. `date` usa formato YYYY-MM-DD y `time` HH:mm.
 * El par único (dentistId, date, time, clinicaId) impide reservas duplicadas en la BD por clínica.
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model Clinica
 * 
 */
export type Clinica = $Result.DefaultSelection<Prisma.$ClinicaPayload>
/**
 * Model AdminUser
 * 
 */
export type AdminUser = $Result.DefaultSelection<Prisma.$AdminUserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AppointmentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]

}

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Dentists
 * const dentists = await prisma.dentist.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Dentists
   * const dentists = await prisma.dentist.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.dentist`: Exposes CRUD operations for the **Dentist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dentists
    * const dentists = await prisma.dentist.findMany()
    * ```
    */
  get dentist(): Prisma.DentistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.treatment`: Exposes CRUD operations for the **Treatment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Treatments
    * const treatments = await prisma.treatment.findMany()
    * ```
    */
  get treatment(): Prisma.TreatmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.businessHours`: Exposes CRUD operations for the **BusinessHours** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessHours
    * const businessHours = await prisma.businessHours.findMany()
    * ```
    */
  get businessHours(): Prisma.BusinessHoursDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinica`: Exposes CRUD operations for the **Clinica** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clinicas
    * const clinicas = await prisma.clinica.findMany()
    * ```
    */
  get clinica(): Prisma.ClinicaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminUser`: Exposes CRUD operations for the **AdminUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUser.findMany()
    * ```
    */
  get adminUser(): Prisma.AdminUserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Dentist: 'Dentist',
    Treatment: 'Treatment',
    BusinessHours: 'BusinessHours',
    Appointment: 'Appointment',
    Clinica: 'Clinica',
    AdminUser: 'AdminUser'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "dentist" | "treatment" | "businessHours" | "appointment" | "clinica" | "adminUser"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Dentist: {
        payload: Prisma.$DentistPayload<ExtArgs>
        fields: Prisma.DentistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DentistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DentistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload>
          }
          findFirst: {
            args: Prisma.DentistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DentistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload>
          }
          findMany: {
            args: Prisma.DentistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload>[]
          }
          create: {
            args: Prisma.DentistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload>
          }
          createMany: {
            args: Prisma.DentistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DentistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload>[]
          }
          delete: {
            args: Prisma.DentistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload>
          }
          update: {
            args: Prisma.DentistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload>
          }
          deleteMany: {
            args: Prisma.DentistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DentistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DentistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload>[]
          }
          upsert: {
            args: Prisma.DentistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentistPayload>
          }
          aggregate: {
            args: Prisma.DentistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDentist>
          }
          groupBy: {
            args: Prisma.DentistGroupByArgs<ExtArgs>
            result: $Utils.Optional<DentistGroupByOutputType>[]
          }
          count: {
            args: Prisma.DentistCountArgs<ExtArgs>
            result: $Utils.Optional<DentistCountAggregateOutputType> | number
          }
        }
      }
      Treatment: {
        payload: Prisma.$TreatmentPayload<ExtArgs>
        fields: Prisma.TreatmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreatmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreatmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          findFirst: {
            args: Prisma.TreatmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreatmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          findMany: {
            args: Prisma.TreatmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
          }
          create: {
            args: Prisma.TreatmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          createMany: {
            args: Prisma.TreatmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TreatmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
          }
          delete: {
            args: Prisma.TreatmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          update: {
            args: Prisma.TreatmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          deleteMany: {
            args: Prisma.TreatmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TreatmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TreatmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
          }
          upsert: {
            args: Prisma.TreatmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          aggregate: {
            args: Prisma.TreatmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTreatment>
          }
          groupBy: {
            args: Prisma.TreatmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TreatmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreatmentCountArgs<ExtArgs>
            result: $Utils.Optional<TreatmentCountAggregateOutputType> | number
          }
        }
      }
      BusinessHours: {
        payload: Prisma.$BusinessHoursPayload<ExtArgs>
        fields: Prisma.BusinessHoursFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessHoursFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessHoursFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload>
          }
          findFirst: {
            args: Prisma.BusinessHoursFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessHoursFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload>
          }
          findMany: {
            args: Prisma.BusinessHoursFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload>[]
          }
          create: {
            args: Prisma.BusinessHoursCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload>
          }
          createMany: {
            args: Prisma.BusinessHoursCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessHoursCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload>[]
          }
          delete: {
            args: Prisma.BusinessHoursDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload>
          }
          update: {
            args: Prisma.BusinessHoursUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload>
          }
          deleteMany: {
            args: Prisma.BusinessHoursDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessHoursUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessHoursUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload>[]
          }
          upsert: {
            args: Prisma.BusinessHoursUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessHoursPayload>
          }
          aggregate: {
            args: Prisma.BusinessHoursAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessHours>
          }
          groupBy: {
            args: Prisma.BusinessHoursGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessHoursGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessHoursCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessHoursCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      Clinica: {
        payload: Prisma.$ClinicaPayload<ExtArgs>
        fields: Prisma.ClinicaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload>
          }
          findFirst: {
            args: Prisma.ClinicaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload>
          }
          findMany: {
            args: Prisma.ClinicaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload>[]
          }
          create: {
            args: Prisma.ClinicaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload>
          }
          createMany: {
            args: Prisma.ClinicaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload>[]
          }
          delete: {
            args: Prisma.ClinicaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload>
          }
          update: {
            args: Prisma.ClinicaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload>
          }
          deleteMany: {
            args: Prisma.ClinicaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload>[]
          }
          upsert: {
            args: Prisma.ClinicaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicaPayload>
          }
          aggregate: {
            args: Prisma.ClinicaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinica>
          }
          groupBy: {
            args: Prisma.ClinicaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicaCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicaCountAggregateOutputType> | number
          }
        }
      }
      AdminUser: {
        payload: Prisma.$AdminUserPayload<ExtArgs>
        fields: Prisma.AdminUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findFirst: {
            args: Prisma.AdminUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findMany: {
            args: Prisma.AdminUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          create: {
            args: Prisma.AdminUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          createMany: {
            args: Prisma.AdminUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          delete: {
            args: Prisma.AdminUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          update: {
            args: Prisma.AdminUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          deleteMany: {
            args: Prisma.AdminUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          upsert: {
            args: Prisma.AdminUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          aggregate: {
            args: Prisma.AdminUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUser>
          }
          groupBy: {
            args: Prisma.AdminUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUserCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    dentist?: DentistOmit
    treatment?: TreatmentOmit
    businessHours?: BusinessHoursOmit
    appointment?: AppointmentOmit
    clinica?: ClinicaOmit
    adminUser?: AdminUserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DentistCountOutputType
   */

  export type DentistCountOutputType = {
    appointments: number
    businessHours: number
  }

  export type DentistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | DentistCountOutputTypeCountAppointmentsArgs
    businessHours?: boolean | DentistCountOutputTypeCountBusinessHoursArgs
  }

  // Custom InputTypes
  /**
   * DentistCountOutputType without action
   */
  export type DentistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentistCountOutputType
     */
    select?: DentistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DentistCountOutputType without action
   */
  export type DentistCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * DentistCountOutputType without action
   */
  export type DentistCountOutputTypeCountBusinessHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessHoursWhereInput
  }


  /**
   * Count Type TreatmentCountOutputType
   */

  export type TreatmentCountOutputType = {
    appointments: number
  }

  export type TreatmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | TreatmentCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * TreatmentCountOutputType without action
   */
  export type TreatmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreatmentCountOutputType
     */
    select?: TreatmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TreatmentCountOutputType without action
   */
  export type TreatmentCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type ClinicaCountOutputType
   */

  export type ClinicaCountOutputType = {
    appointments: number
    admins: number
  }

  export type ClinicaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | ClinicaCountOutputTypeCountAppointmentsArgs
    admins?: boolean | ClinicaCountOutputTypeCountAdminsArgs
  }

  // Custom InputTypes
  /**
   * ClinicaCountOutputType without action
   */
  export type ClinicaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicaCountOutputType
     */
    select?: ClinicaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClinicaCountOutputType without action
   */
  export type ClinicaCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * ClinicaCountOutputType without action
   */
  export type ClinicaCountOutputTypeCountAdminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Dentist
   */

  export type AggregateDentist = {
    _count: DentistCountAggregateOutputType | null
    _avg: DentistAvgAggregateOutputType | null
    _sum: DentistSumAggregateOutputType | null
    _min: DentistMinAggregateOutputType | null
    _max: DentistMaxAggregateOutputType | null
  }

  export type DentistAvgAggregateOutputType = {
    id: number | null
    experienceYears: number | null
  }

  export type DentistSumAggregateOutputType = {
    id: number | null
    experienceYears: number | null
  }

  export type DentistMinAggregateOutputType = {
    id: number | null
    name: string | null
    role: string | null
    specialty: string | null
    description: string | null
    experienceYears: number | null
    imageUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DentistMaxAggregateOutputType = {
    id: number | null
    name: string | null
    role: string | null
    specialty: string | null
    description: string | null
    experienceYears: number | null
    imageUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DentistCountAggregateOutputType = {
    id: number
    name: number
    role: number
    specialty: number
    description: number
    experienceYears: number
    imageUrl: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DentistAvgAggregateInputType = {
    id?: true
    experienceYears?: true
  }

  export type DentistSumAggregateInputType = {
    id?: true
    experienceYears?: true
  }

  export type DentistMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    specialty?: true
    description?: true
    experienceYears?: true
    imageUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DentistMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    specialty?: true
    description?: true
    experienceYears?: true
    imageUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DentistCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    specialty?: true
    description?: true
    experienceYears?: true
    imageUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DentistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dentist to aggregate.
     */
    where?: DentistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dentists to fetch.
     */
    orderBy?: DentistOrderByWithRelationInput | DentistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DentistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dentists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dentists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dentists
    **/
    _count?: true | DentistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DentistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DentistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DentistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DentistMaxAggregateInputType
  }

  export type GetDentistAggregateType<T extends DentistAggregateArgs> = {
        [P in keyof T & keyof AggregateDentist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDentist[P]>
      : GetScalarType<T[P], AggregateDentist[P]>
  }




  export type DentistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DentistWhereInput
    orderBy?: DentistOrderByWithAggregationInput | DentistOrderByWithAggregationInput[]
    by: DentistScalarFieldEnum[] | DentistScalarFieldEnum
    having?: DentistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DentistCountAggregateInputType | true
    _avg?: DentistAvgAggregateInputType
    _sum?: DentistSumAggregateInputType
    _min?: DentistMinAggregateInputType
    _max?: DentistMaxAggregateInputType
  }

  export type DentistGroupByOutputType = {
    id: number
    name: string
    role: string
    specialty: string
    description: string
    experienceYears: number
    imageUrl: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: DentistCountAggregateOutputType | null
    _avg: DentistAvgAggregateOutputType | null
    _sum: DentistSumAggregateOutputType | null
    _min: DentistMinAggregateOutputType | null
    _max: DentistMaxAggregateOutputType | null
  }

  type GetDentistGroupByPayload<T extends DentistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DentistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DentistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DentistGroupByOutputType[P]>
            : GetScalarType<T[P], DentistGroupByOutputType[P]>
        }
      >
    >


  export type DentistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    specialty?: boolean
    description?: boolean
    experienceYears?: boolean
    imageUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    appointments?: boolean | Dentist$appointmentsArgs<ExtArgs>
    businessHours?: boolean | Dentist$businessHoursArgs<ExtArgs>
    _count?: boolean | DentistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dentist"]>

  export type DentistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    specialty?: boolean
    description?: boolean
    experienceYears?: boolean
    imageUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dentist"]>

  export type DentistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    specialty?: boolean
    description?: boolean
    experienceYears?: boolean
    imageUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dentist"]>

  export type DentistSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    specialty?: boolean
    description?: boolean
    experienceYears?: boolean
    imageUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DentistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "role" | "specialty" | "description" | "experienceYears" | "imageUrl" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["dentist"]>
  export type DentistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | Dentist$appointmentsArgs<ExtArgs>
    businessHours?: boolean | Dentist$businessHoursArgs<ExtArgs>
    _count?: boolean | DentistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DentistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DentistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DentistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dentist"
    objects: {
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      businessHours: Prisma.$BusinessHoursPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      role: string
      specialty: string
      description: string
      experienceYears: number
      imageUrl: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dentist"]>
    composites: {}
  }

  type DentistGetPayload<S extends boolean | null | undefined | DentistDefaultArgs> = $Result.GetResult<Prisma.$DentistPayload, S>

  type DentistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DentistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DentistCountAggregateInputType | true
    }

  export interface DentistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dentist'], meta: { name: 'Dentist' } }
    /**
     * Find zero or one Dentist that matches the filter.
     * @param {DentistFindUniqueArgs} args - Arguments to find a Dentist
     * @example
     * // Get one Dentist
     * const dentist = await prisma.dentist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DentistFindUniqueArgs>(args: SelectSubset<T, DentistFindUniqueArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dentist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DentistFindUniqueOrThrowArgs} args - Arguments to find a Dentist
     * @example
     * // Get one Dentist
     * const dentist = await prisma.dentist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DentistFindUniqueOrThrowArgs>(args: SelectSubset<T, DentistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dentist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentistFindFirstArgs} args - Arguments to find a Dentist
     * @example
     * // Get one Dentist
     * const dentist = await prisma.dentist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DentistFindFirstArgs>(args?: SelectSubset<T, DentistFindFirstArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dentist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentistFindFirstOrThrowArgs} args - Arguments to find a Dentist
     * @example
     * // Get one Dentist
     * const dentist = await prisma.dentist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DentistFindFirstOrThrowArgs>(args?: SelectSubset<T, DentistFindFirstOrThrowArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dentists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dentists
     * const dentists = await prisma.dentist.findMany()
     * 
     * // Get first 10 Dentists
     * const dentists = await prisma.dentist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dentistWithIdOnly = await prisma.dentist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DentistFindManyArgs>(args?: SelectSubset<T, DentistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dentist.
     * @param {DentistCreateArgs} args - Arguments to create a Dentist.
     * @example
     * // Create one Dentist
     * const Dentist = await prisma.dentist.create({
     *   data: {
     *     // ... data to create a Dentist
     *   }
     * })
     * 
     */
    create<T extends DentistCreateArgs>(args: SelectSubset<T, DentistCreateArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dentists.
     * @param {DentistCreateManyArgs} args - Arguments to create many Dentists.
     * @example
     * // Create many Dentists
     * const dentist = await prisma.dentist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DentistCreateManyArgs>(args?: SelectSubset<T, DentistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dentists and returns the data saved in the database.
     * @param {DentistCreateManyAndReturnArgs} args - Arguments to create many Dentists.
     * @example
     * // Create many Dentists
     * const dentist = await prisma.dentist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dentists and only return the `id`
     * const dentistWithIdOnly = await prisma.dentist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DentistCreateManyAndReturnArgs>(args?: SelectSubset<T, DentistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dentist.
     * @param {DentistDeleteArgs} args - Arguments to delete one Dentist.
     * @example
     * // Delete one Dentist
     * const Dentist = await prisma.dentist.delete({
     *   where: {
     *     // ... filter to delete one Dentist
     *   }
     * })
     * 
     */
    delete<T extends DentistDeleteArgs>(args: SelectSubset<T, DentistDeleteArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dentist.
     * @param {DentistUpdateArgs} args - Arguments to update one Dentist.
     * @example
     * // Update one Dentist
     * const dentist = await prisma.dentist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DentistUpdateArgs>(args: SelectSubset<T, DentistUpdateArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dentists.
     * @param {DentistDeleteManyArgs} args - Arguments to filter Dentists to delete.
     * @example
     * // Delete a few Dentists
     * const { count } = await prisma.dentist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DentistDeleteManyArgs>(args?: SelectSubset<T, DentistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dentists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dentists
     * const dentist = await prisma.dentist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DentistUpdateManyArgs>(args: SelectSubset<T, DentistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dentists and returns the data updated in the database.
     * @param {DentistUpdateManyAndReturnArgs} args - Arguments to update many Dentists.
     * @example
     * // Update many Dentists
     * const dentist = await prisma.dentist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dentists and only return the `id`
     * const dentistWithIdOnly = await prisma.dentist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DentistUpdateManyAndReturnArgs>(args: SelectSubset<T, DentistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dentist.
     * @param {DentistUpsertArgs} args - Arguments to update or create a Dentist.
     * @example
     * // Update or create a Dentist
     * const dentist = await prisma.dentist.upsert({
     *   create: {
     *     // ... data to create a Dentist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dentist we want to update
     *   }
     * })
     */
    upsert<T extends DentistUpsertArgs>(args: SelectSubset<T, DentistUpsertArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dentists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentistCountArgs} args - Arguments to filter Dentists to count.
     * @example
     * // Count the number of Dentists
     * const count = await prisma.dentist.count({
     *   where: {
     *     // ... the filter for the Dentists we want to count
     *   }
     * })
    **/
    count<T extends DentistCountArgs>(
      args?: Subset<T, DentistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DentistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dentist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DentistAggregateArgs>(args: Subset<T, DentistAggregateArgs>): Prisma.PrismaPromise<GetDentistAggregateType<T>>

    /**
     * Group by Dentist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DentistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DentistGroupByArgs['orderBy'] }
        : { orderBy?: DentistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DentistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDentistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dentist model
   */
  readonly fields: DentistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dentist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DentistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    appointments<T extends Dentist$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Dentist$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    businessHours<T extends Dentist$businessHoursArgs<ExtArgs> = {}>(args?: Subset<T, Dentist$businessHoursArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dentist model
   */
  interface DentistFieldRefs {
    readonly id: FieldRef<"Dentist", 'Int'>
    readonly name: FieldRef<"Dentist", 'String'>
    readonly role: FieldRef<"Dentist", 'String'>
    readonly specialty: FieldRef<"Dentist", 'String'>
    readonly description: FieldRef<"Dentist", 'String'>
    readonly experienceYears: FieldRef<"Dentist", 'Int'>
    readonly imageUrl: FieldRef<"Dentist", 'String'>
    readonly isActive: FieldRef<"Dentist", 'Boolean'>
    readonly createdAt: FieldRef<"Dentist", 'DateTime'>
    readonly updatedAt: FieldRef<"Dentist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Dentist findUnique
   */
  export type DentistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
    /**
     * Filter, which Dentist to fetch.
     */
    where: DentistWhereUniqueInput
  }

  /**
   * Dentist findUniqueOrThrow
   */
  export type DentistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
    /**
     * Filter, which Dentist to fetch.
     */
    where: DentistWhereUniqueInput
  }

  /**
   * Dentist findFirst
   */
  export type DentistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
    /**
     * Filter, which Dentist to fetch.
     */
    where?: DentistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dentists to fetch.
     */
    orderBy?: DentistOrderByWithRelationInput | DentistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dentists.
     */
    cursor?: DentistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dentists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dentists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dentists.
     */
    distinct?: DentistScalarFieldEnum | DentistScalarFieldEnum[]
  }

  /**
   * Dentist findFirstOrThrow
   */
  export type DentistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
    /**
     * Filter, which Dentist to fetch.
     */
    where?: DentistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dentists to fetch.
     */
    orderBy?: DentistOrderByWithRelationInput | DentistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dentists.
     */
    cursor?: DentistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dentists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dentists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dentists.
     */
    distinct?: DentistScalarFieldEnum | DentistScalarFieldEnum[]
  }

  /**
   * Dentist findMany
   */
  export type DentistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
    /**
     * Filter, which Dentists to fetch.
     */
    where?: DentistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dentists to fetch.
     */
    orderBy?: DentistOrderByWithRelationInput | DentistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dentists.
     */
    cursor?: DentistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dentists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dentists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dentists.
     */
    distinct?: DentistScalarFieldEnum | DentistScalarFieldEnum[]
  }

  /**
   * Dentist create
   */
  export type DentistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
    /**
     * The data needed to create a Dentist.
     */
    data: XOR<DentistCreateInput, DentistUncheckedCreateInput>
  }

  /**
   * Dentist createMany
   */
  export type DentistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dentists.
     */
    data: DentistCreateManyInput | DentistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dentist createManyAndReturn
   */
  export type DentistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * The data used to create many Dentists.
     */
    data: DentistCreateManyInput | DentistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dentist update
   */
  export type DentistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
    /**
     * The data needed to update a Dentist.
     */
    data: XOR<DentistUpdateInput, DentistUncheckedUpdateInput>
    /**
     * Choose, which Dentist to update.
     */
    where: DentistWhereUniqueInput
  }

  /**
   * Dentist updateMany
   */
  export type DentistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dentists.
     */
    data: XOR<DentistUpdateManyMutationInput, DentistUncheckedUpdateManyInput>
    /**
     * Filter which Dentists to update
     */
    where?: DentistWhereInput
    /**
     * Limit how many Dentists to update.
     */
    limit?: number
  }

  /**
   * Dentist updateManyAndReturn
   */
  export type DentistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * The data used to update Dentists.
     */
    data: XOR<DentistUpdateManyMutationInput, DentistUncheckedUpdateManyInput>
    /**
     * Filter which Dentists to update
     */
    where?: DentistWhereInput
    /**
     * Limit how many Dentists to update.
     */
    limit?: number
  }

  /**
   * Dentist upsert
   */
  export type DentistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
    /**
     * The filter to search for the Dentist to update in case it exists.
     */
    where: DentistWhereUniqueInput
    /**
     * In case the Dentist found by the `where` argument doesn't exist, create a new Dentist with this data.
     */
    create: XOR<DentistCreateInput, DentistUncheckedCreateInput>
    /**
     * In case the Dentist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DentistUpdateInput, DentistUncheckedUpdateInput>
  }

  /**
   * Dentist delete
   */
  export type DentistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
    /**
     * Filter which Dentist to delete.
     */
    where: DentistWhereUniqueInput
  }

  /**
   * Dentist deleteMany
   */
  export type DentistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dentists to delete
     */
    where?: DentistWhereInput
    /**
     * Limit how many Dentists to delete.
     */
    limit?: number
  }

  /**
   * Dentist.appointments
   */
  export type Dentist$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Dentist.businessHours
   */
  export type Dentist$businessHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    where?: BusinessHoursWhereInput
    orderBy?: BusinessHoursOrderByWithRelationInput | BusinessHoursOrderByWithRelationInput[]
    cursor?: BusinessHoursWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessHoursScalarFieldEnum | BusinessHoursScalarFieldEnum[]
  }

  /**
   * Dentist without action
   */
  export type DentistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dentist
     */
    select?: DentistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dentist
     */
    omit?: DentistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentistInclude<ExtArgs> | null
  }


  /**
   * Model Treatment
   */

  export type AggregateTreatment = {
    _count: TreatmentCountAggregateOutputType | null
    _avg: TreatmentAvgAggregateOutputType | null
    _sum: TreatmentSumAggregateOutputType | null
    _min: TreatmentMinAggregateOutputType | null
    _max: TreatmentMaxAggregateOutputType | null
  }

  export type TreatmentAvgAggregateOutputType = {
    id: number | null
    durationMinutes: number | null
    price: number | null
    sortOrder: number | null
  }

  export type TreatmentSumAggregateOutputType = {
    id: number | null
    durationMinutes: number | null
    price: number | null
    sortOrder: number | null
  }

  export type TreatmentMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    shortDescription: string | null
    description: string | null
    durationMinutes: number | null
    price: number | null
    imageUrl: string | null
    isFeatured: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TreatmentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    shortDescription: string | null
    description: string | null
    durationMinutes: number | null
    price: number | null
    imageUrl: string | null
    isFeatured: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TreatmentCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    shortDescription: number
    description: number
    benefits: number
    durationMinutes: number
    price: number
    imageUrl: number
    isFeatured: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TreatmentAvgAggregateInputType = {
    id?: true
    durationMinutes?: true
    price?: true
    sortOrder?: true
  }

  export type TreatmentSumAggregateInputType = {
    id?: true
    durationMinutes?: true
    price?: true
    sortOrder?: true
  }

  export type TreatmentMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    shortDescription?: true
    description?: true
    durationMinutes?: true
    price?: true
    imageUrl?: true
    isFeatured?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TreatmentMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    shortDescription?: true
    description?: true
    durationMinutes?: true
    price?: true
    imageUrl?: true
    isFeatured?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TreatmentCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    shortDescription?: true
    description?: true
    benefits?: true
    durationMinutes?: true
    price?: true
    imageUrl?: true
    isFeatured?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TreatmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Treatment to aggregate.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Treatments
    **/
    _count?: true | TreatmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TreatmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TreatmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreatmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreatmentMaxAggregateInputType
  }

  export type GetTreatmentAggregateType<T extends TreatmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTreatment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreatment[P]>
      : GetScalarType<T[P], AggregateTreatment[P]>
  }




  export type TreatmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreatmentWhereInput
    orderBy?: TreatmentOrderByWithAggregationInput | TreatmentOrderByWithAggregationInput[]
    by: TreatmentScalarFieldEnum[] | TreatmentScalarFieldEnum
    having?: TreatmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreatmentCountAggregateInputType | true
    _avg?: TreatmentAvgAggregateInputType
    _sum?: TreatmentSumAggregateInputType
    _min?: TreatmentMinAggregateInputType
    _max?: TreatmentMaxAggregateInputType
  }

  export type TreatmentGroupByOutputType = {
    id: number
    name: string
    slug: string
    shortDescription: string
    description: string
    benefits: JsonValue
    durationMinutes: number
    price: number
    imageUrl: string
    isFeatured: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: TreatmentCountAggregateOutputType | null
    _avg: TreatmentAvgAggregateOutputType | null
    _sum: TreatmentSumAggregateOutputType | null
    _min: TreatmentMinAggregateOutputType | null
    _max: TreatmentMaxAggregateOutputType | null
  }

  type GetTreatmentGroupByPayload<T extends TreatmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreatmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreatmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreatmentGroupByOutputType[P]>
            : GetScalarType<T[P], TreatmentGroupByOutputType[P]>
        }
      >
    >


  export type TreatmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    shortDescription?: boolean
    description?: boolean
    benefits?: boolean
    durationMinutes?: boolean
    price?: boolean
    imageUrl?: boolean
    isFeatured?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    appointments?: boolean | Treatment$appointmentsArgs<ExtArgs>
    _count?: boolean | TreatmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treatment"]>

  export type TreatmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    shortDescription?: boolean
    description?: boolean
    benefits?: boolean
    durationMinutes?: boolean
    price?: boolean
    imageUrl?: boolean
    isFeatured?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["treatment"]>

  export type TreatmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    shortDescription?: boolean
    description?: boolean
    benefits?: boolean
    durationMinutes?: boolean
    price?: boolean
    imageUrl?: boolean
    isFeatured?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["treatment"]>

  export type TreatmentSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    shortDescription?: boolean
    description?: boolean
    benefits?: boolean
    durationMinutes?: boolean
    price?: boolean
    imageUrl?: boolean
    isFeatured?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TreatmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "shortDescription" | "description" | "benefits" | "durationMinutes" | "price" | "imageUrl" | "isFeatured" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["treatment"]>
  export type TreatmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | Treatment$appointmentsArgs<ExtArgs>
    _count?: boolean | TreatmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TreatmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TreatmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TreatmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Treatment"
    objects: {
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      shortDescription: string
      description: string
      benefits: Prisma.JsonValue
      durationMinutes: number
      price: number
      imageUrl: string
      isFeatured: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["treatment"]>
    composites: {}
  }

  type TreatmentGetPayload<S extends boolean | null | undefined | TreatmentDefaultArgs> = $Result.GetResult<Prisma.$TreatmentPayload, S>

  type TreatmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TreatmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TreatmentCountAggregateInputType | true
    }

  export interface TreatmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Treatment'], meta: { name: 'Treatment' } }
    /**
     * Find zero or one Treatment that matches the filter.
     * @param {TreatmentFindUniqueArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TreatmentFindUniqueArgs>(args: SelectSubset<T, TreatmentFindUniqueArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Treatment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TreatmentFindUniqueOrThrowArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TreatmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TreatmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Treatment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentFindFirstArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TreatmentFindFirstArgs>(args?: SelectSubset<T, TreatmentFindFirstArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Treatment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentFindFirstOrThrowArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TreatmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TreatmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Treatments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Treatments
     * const treatments = await prisma.treatment.findMany()
     * 
     * // Get first 10 Treatments
     * const treatments = await prisma.treatment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treatmentWithIdOnly = await prisma.treatment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TreatmentFindManyArgs>(args?: SelectSubset<T, TreatmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Treatment.
     * @param {TreatmentCreateArgs} args - Arguments to create a Treatment.
     * @example
     * // Create one Treatment
     * const Treatment = await prisma.treatment.create({
     *   data: {
     *     // ... data to create a Treatment
     *   }
     * })
     * 
     */
    create<T extends TreatmentCreateArgs>(args: SelectSubset<T, TreatmentCreateArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Treatments.
     * @param {TreatmentCreateManyArgs} args - Arguments to create many Treatments.
     * @example
     * // Create many Treatments
     * const treatment = await prisma.treatment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TreatmentCreateManyArgs>(args?: SelectSubset<T, TreatmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Treatments and returns the data saved in the database.
     * @param {TreatmentCreateManyAndReturnArgs} args - Arguments to create many Treatments.
     * @example
     * // Create many Treatments
     * const treatment = await prisma.treatment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Treatments and only return the `id`
     * const treatmentWithIdOnly = await prisma.treatment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TreatmentCreateManyAndReturnArgs>(args?: SelectSubset<T, TreatmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Treatment.
     * @param {TreatmentDeleteArgs} args - Arguments to delete one Treatment.
     * @example
     * // Delete one Treatment
     * const Treatment = await prisma.treatment.delete({
     *   where: {
     *     // ... filter to delete one Treatment
     *   }
     * })
     * 
     */
    delete<T extends TreatmentDeleteArgs>(args: SelectSubset<T, TreatmentDeleteArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Treatment.
     * @param {TreatmentUpdateArgs} args - Arguments to update one Treatment.
     * @example
     * // Update one Treatment
     * const treatment = await prisma.treatment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TreatmentUpdateArgs>(args: SelectSubset<T, TreatmentUpdateArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Treatments.
     * @param {TreatmentDeleteManyArgs} args - Arguments to filter Treatments to delete.
     * @example
     * // Delete a few Treatments
     * const { count } = await prisma.treatment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TreatmentDeleteManyArgs>(args?: SelectSubset<T, TreatmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Treatments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Treatments
     * const treatment = await prisma.treatment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TreatmentUpdateManyArgs>(args: SelectSubset<T, TreatmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Treatments and returns the data updated in the database.
     * @param {TreatmentUpdateManyAndReturnArgs} args - Arguments to update many Treatments.
     * @example
     * // Update many Treatments
     * const treatment = await prisma.treatment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Treatments and only return the `id`
     * const treatmentWithIdOnly = await prisma.treatment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TreatmentUpdateManyAndReturnArgs>(args: SelectSubset<T, TreatmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Treatment.
     * @param {TreatmentUpsertArgs} args - Arguments to update or create a Treatment.
     * @example
     * // Update or create a Treatment
     * const treatment = await prisma.treatment.upsert({
     *   create: {
     *     // ... data to create a Treatment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Treatment we want to update
     *   }
     * })
     */
    upsert<T extends TreatmentUpsertArgs>(args: SelectSubset<T, TreatmentUpsertArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Treatments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentCountArgs} args - Arguments to filter Treatments to count.
     * @example
     * // Count the number of Treatments
     * const count = await prisma.treatment.count({
     *   where: {
     *     // ... the filter for the Treatments we want to count
     *   }
     * })
    **/
    count<T extends TreatmentCountArgs>(
      args?: Subset<T, TreatmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreatmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Treatment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TreatmentAggregateArgs>(args: Subset<T, TreatmentAggregateArgs>): Prisma.PrismaPromise<GetTreatmentAggregateType<T>>

    /**
     * Group by Treatment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TreatmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreatmentGroupByArgs['orderBy'] }
        : { orderBy?: TreatmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TreatmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreatmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Treatment model
   */
  readonly fields: TreatmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Treatment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreatmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    appointments<T extends Treatment$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Treatment$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Treatment model
   */
  interface TreatmentFieldRefs {
    readonly id: FieldRef<"Treatment", 'Int'>
    readonly name: FieldRef<"Treatment", 'String'>
    readonly slug: FieldRef<"Treatment", 'String'>
    readonly shortDescription: FieldRef<"Treatment", 'String'>
    readonly description: FieldRef<"Treatment", 'String'>
    readonly benefits: FieldRef<"Treatment", 'Json'>
    readonly durationMinutes: FieldRef<"Treatment", 'Int'>
    readonly price: FieldRef<"Treatment", 'Int'>
    readonly imageUrl: FieldRef<"Treatment", 'String'>
    readonly isFeatured: FieldRef<"Treatment", 'Boolean'>
    readonly sortOrder: FieldRef<"Treatment", 'Int'>
    readonly createdAt: FieldRef<"Treatment", 'DateTime'>
    readonly updatedAt: FieldRef<"Treatment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Treatment findUnique
   */
  export type TreatmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment findUniqueOrThrow
   */
  export type TreatmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment findFirst
   */
  export type TreatmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Treatments.
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Treatments.
     */
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Treatment findFirstOrThrow
   */
  export type TreatmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Treatments.
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Treatments.
     */
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Treatment findMany
   */
  export type TreatmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatments to fetch.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Treatments.
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Treatments.
     */
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Treatment create
   */
  export type TreatmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Treatment.
     */
    data: XOR<TreatmentCreateInput, TreatmentUncheckedCreateInput>
  }

  /**
   * Treatment createMany
   */
  export type TreatmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Treatments.
     */
    data: TreatmentCreateManyInput | TreatmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Treatment createManyAndReturn
   */
  export type TreatmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * The data used to create many Treatments.
     */
    data: TreatmentCreateManyInput | TreatmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Treatment update
   */
  export type TreatmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Treatment.
     */
    data: XOR<TreatmentUpdateInput, TreatmentUncheckedUpdateInput>
    /**
     * Choose, which Treatment to update.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment updateMany
   */
  export type TreatmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Treatments.
     */
    data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyInput>
    /**
     * Filter which Treatments to update
     */
    where?: TreatmentWhereInput
    /**
     * Limit how many Treatments to update.
     */
    limit?: number
  }

  /**
   * Treatment updateManyAndReturn
   */
  export type TreatmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * The data used to update Treatments.
     */
    data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyInput>
    /**
     * Filter which Treatments to update
     */
    where?: TreatmentWhereInput
    /**
     * Limit how many Treatments to update.
     */
    limit?: number
  }

  /**
   * Treatment upsert
   */
  export type TreatmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Treatment to update in case it exists.
     */
    where: TreatmentWhereUniqueInput
    /**
     * In case the Treatment found by the `where` argument doesn't exist, create a new Treatment with this data.
     */
    create: XOR<TreatmentCreateInput, TreatmentUncheckedCreateInput>
    /**
     * In case the Treatment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreatmentUpdateInput, TreatmentUncheckedUpdateInput>
  }

  /**
   * Treatment delete
   */
  export type TreatmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter which Treatment to delete.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment deleteMany
   */
  export type TreatmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Treatments to delete
     */
    where?: TreatmentWhereInput
    /**
     * Limit how many Treatments to delete.
     */
    limit?: number
  }

  /**
   * Treatment.appointments
   */
  export type Treatment$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Treatment without action
   */
  export type TreatmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
  }


  /**
   * Model BusinessHours
   */

  export type AggregateBusinessHours = {
    _count: BusinessHoursCountAggregateOutputType | null
    _avg: BusinessHoursAvgAggregateOutputType | null
    _sum: BusinessHoursSumAggregateOutputType | null
    _min: BusinessHoursMinAggregateOutputType | null
    _max: BusinessHoursMaxAggregateOutputType | null
  }

  export type BusinessHoursAvgAggregateOutputType = {
    id: number | null
    dentistId: number | null
    dayOfWeek: number | null
  }

  export type BusinessHoursSumAggregateOutputType = {
    id: number | null
    dentistId: number | null
    dayOfWeek: number | null
  }

  export type BusinessHoursMinAggregateOutputType = {
    id: number | null
    dentistId: number | null
    dayOfWeek: number | null
    openTime: string | null
    closeTime: string | null
  }

  export type BusinessHoursMaxAggregateOutputType = {
    id: number | null
    dentistId: number | null
    dayOfWeek: number | null
    openTime: string | null
    closeTime: string | null
  }

  export type BusinessHoursCountAggregateOutputType = {
    id: number
    dentistId: number
    dayOfWeek: number
    openTime: number
    closeTime: number
    _all: number
  }


  export type BusinessHoursAvgAggregateInputType = {
    id?: true
    dentistId?: true
    dayOfWeek?: true
  }

  export type BusinessHoursSumAggregateInputType = {
    id?: true
    dentistId?: true
    dayOfWeek?: true
  }

  export type BusinessHoursMinAggregateInputType = {
    id?: true
    dentistId?: true
    dayOfWeek?: true
    openTime?: true
    closeTime?: true
  }

  export type BusinessHoursMaxAggregateInputType = {
    id?: true
    dentistId?: true
    dayOfWeek?: true
    openTime?: true
    closeTime?: true
  }

  export type BusinessHoursCountAggregateInputType = {
    id?: true
    dentistId?: true
    dayOfWeek?: true
    openTime?: true
    closeTime?: true
    _all?: true
  }

  export type BusinessHoursAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessHours to aggregate.
     */
    where?: BusinessHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessHours to fetch.
     */
    orderBy?: BusinessHoursOrderByWithRelationInput | BusinessHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessHours
    **/
    _count?: true | BusinessHoursCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BusinessHoursAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BusinessHoursSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessHoursMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessHoursMaxAggregateInputType
  }

  export type GetBusinessHoursAggregateType<T extends BusinessHoursAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessHours]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessHours[P]>
      : GetScalarType<T[P], AggregateBusinessHours[P]>
  }




  export type BusinessHoursGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessHoursWhereInput
    orderBy?: BusinessHoursOrderByWithAggregationInput | BusinessHoursOrderByWithAggregationInput[]
    by: BusinessHoursScalarFieldEnum[] | BusinessHoursScalarFieldEnum
    having?: BusinessHoursScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessHoursCountAggregateInputType | true
    _avg?: BusinessHoursAvgAggregateInputType
    _sum?: BusinessHoursSumAggregateInputType
    _min?: BusinessHoursMinAggregateInputType
    _max?: BusinessHoursMaxAggregateInputType
  }

  export type BusinessHoursGroupByOutputType = {
    id: number
    dentistId: number
    dayOfWeek: number
    openTime: string
    closeTime: string
    _count: BusinessHoursCountAggregateOutputType | null
    _avg: BusinessHoursAvgAggregateOutputType | null
    _sum: BusinessHoursSumAggregateOutputType | null
    _min: BusinessHoursMinAggregateOutputType | null
    _max: BusinessHoursMaxAggregateOutputType | null
  }

  type GetBusinessHoursGroupByPayload<T extends BusinessHoursGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessHoursGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessHoursGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessHoursGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessHoursGroupByOutputType[P]>
        }
      >
    >


  export type BusinessHoursSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dentistId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessHours"]>

  export type BusinessHoursSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dentistId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessHours"]>

  export type BusinessHoursSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dentistId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessHours"]>

  export type BusinessHoursSelectScalar = {
    id?: boolean
    dentistId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
  }

  export type BusinessHoursOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dentistId" | "dayOfWeek" | "openTime" | "closeTime", ExtArgs["result"]["businessHours"]>
  export type BusinessHoursInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
  }
  export type BusinessHoursIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
  }
  export type BusinessHoursIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
  }

  export type $BusinessHoursPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessHours"
    objects: {
      dentist: Prisma.$DentistPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dentistId: number
      dayOfWeek: number
      openTime: string
      closeTime: string
    }, ExtArgs["result"]["businessHours"]>
    composites: {}
  }

  type BusinessHoursGetPayload<S extends boolean | null | undefined | BusinessHoursDefaultArgs> = $Result.GetResult<Prisma.$BusinessHoursPayload, S>

  type BusinessHoursCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessHoursFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessHoursCountAggregateInputType | true
    }

  export interface BusinessHoursDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessHours'], meta: { name: 'BusinessHours' } }
    /**
     * Find zero or one BusinessHours that matches the filter.
     * @param {BusinessHoursFindUniqueArgs} args - Arguments to find a BusinessHours
     * @example
     * // Get one BusinessHours
     * const businessHours = await prisma.businessHours.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessHoursFindUniqueArgs>(args: SelectSubset<T, BusinessHoursFindUniqueArgs<ExtArgs>>): Prisma__BusinessHoursClient<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BusinessHours that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessHoursFindUniqueOrThrowArgs} args - Arguments to find a BusinessHours
     * @example
     * // Get one BusinessHours
     * const businessHours = await prisma.businessHours.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessHoursFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessHoursFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessHoursClient<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessHoursFindFirstArgs} args - Arguments to find a BusinessHours
     * @example
     * // Get one BusinessHours
     * const businessHours = await prisma.businessHours.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessHoursFindFirstArgs>(args?: SelectSubset<T, BusinessHoursFindFirstArgs<ExtArgs>>): Prisma__BusinessHoursClient<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessHours that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessHoursFindFirstOrThrowArgs} args - Arguments to find a BusinessHours
     * @example
     * // Get one BusinessHours
     * const businessHours = await prisma.businessHours.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessHoursFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessHoursFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessHoursClient<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BusinessHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessHoursFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessHours
     * const businessHours = await prisma.businessHours.findMany()
     * 
     * // Get first 10 BusinessHours
     * const businessHours = await prisma.businessHours.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessHoursWithIdOnly = await prisma.businessHours.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessHoursFindManyArgs>(args?: SelectSubset<T, BusinessHoursFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BusinessHours.
     * @param {BusinessHoursCreateArgs} args - Arguments to create a BusinessHours.
     * @example
     * // Create one BusinessHours
     * const BusinessHours = await prisma.businessHours.create({
     *   data: {
     *     // ... data to create a BusinessHours
     *   }
     * })
     * 
     */
    create<T extends BusinessHoursCreateArgs>(args: SelectSubset<T, BusinessHoursCreateArgs<ExtArgs>>): Prisma__BusinessHoursClient<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BusinessHours.
     * @param {BusinessHoursCreateManyArgs} args - Arguments to create many BusinessHours.
     * @example
     * // Create many BusinessHours
     * const businessHours = await prisma.businessHours.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessHoursCreateManyArgs>(args?: SelectSubset<T, BusinessHoursCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BusinessHours and returns the data saved in the database.
     * @param {BusinessHoursCreateManyAndReturnArgs} args - Arguments to create many BusinessHours.
     * @example
     * // Create many BusinessHours
     * const businessHours = await prisma.businessHours.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BusinessHours and only return the `id`
     * const businessHoursWithIdOnly = await prisma.businessHours.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessHoursCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessHoursCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BusinessHours.
     * @param {BusinessHoursDeleteArgs} args - Arguments to delete one BusinessHours.
     * @example
     * // Delete one BusinessHours
     * const BusinessHours = await prisma.businessHours.delete({
     *   where: {
     *     // ... filter to delete one BusinessHours
     *   }
     * })
     * 
     */
    delete<T extends BusinessHoursDeleteArgs>(args: SelectSubset<T, BusinessHoursDeleteArgs<ExtArgs>>): Prisma__BusinessHoursClient<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BusinessHours.
     * @param {BusinessHoursUpdateArgs} args - Arguments to update one BusinessHours.
     * @example
     * // Update one BusinessHours
     * const businessHours = await prisma.businessHours.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessHoursUpdateArgs>(args: SelectSubset<T, BusinessHoursUpdateArgs<ExtArgs>>): Prisma__BusinessHoursClient<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BusinessHours.
     * @param {BusinessHoursDeleteManyArgs} args - Arguments to filter BusinessHours to delete.
     * @example
     * // Delete a few BusinessHours
     * const { count } = await prisma.businessHours.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessHoursDeleteManyArgs>(args?: SelectSubset<T, BusinessHoursDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessHoursUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessHours
     * const businessHours = await prisma.businessHours.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessHoursUpdateManyArgs>(args: SelectSubset<T, BusinessHoursUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessHours and returns the data updated in the database.
     * @param {BusinessHoursUpdateManyAndReturnArgs} args - Arguments to update many BusinessHours.
     * @example
     * // Update many BusinessHours
     * const businessHours = await prisma.businessHours.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BusinessHours and only return the `id`
     * const businessHoursWithIdOnly = await prisma.businessHours.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BusinessHoursUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessHoursUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BusinessHours.
     * @param {BusinessHoursUpsertArgs} args - Arguments to update or create a BusinessHours.
     * @example
     * // Update or create a BusinessHours
     * const businessHours = await prisma.businessHours.upsert({
     *   create: {
     *     // ... data to create a BusinessHours
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessHours we want to update
     *   }
     * })
     */
    upsert<T extends BusinessHoursUpsertArgs>(args: SelectSubset<T, BusinessHoursUpsertArgs<ExtArgs>>): Prisma__BusinessHoursClient<$Result.GetResult<Prisma.$BusinessHoursPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BusinessHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessHoursCountArgs} args - Arguments to filter BusinessHours to count.
     * @example
     * // Count the number of BusinessHours
     * const count = await prisma.businessHours.count({
     *   where: {
     *     // ... the filter for the BusinessHours we want to count
     *   }
     * })
    **/
    count<T extends BusinessHoursCountArgs>(
      args?: Subset<T, BusinessHoursCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessHoursCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessHoursAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessHoursAggregateArgs>(args: Subset<T, BusinessHoursAggregateArgs>): Prisma.PrismaPromise<GetBusinessHoursAggregateType<T>>

    /**
     * Group by BusinessHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessHoursGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessHoursGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessHoursGroupByArgs['orderBy'] }
        : { orderBy?: BusinessHoursGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessHoursGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessHoursGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessHours model
   */
  readonly fields: BusinessHoursFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessHours.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessHoursClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dentist<T extends DentistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DentistDefaultArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusinessHours model
   */
  interface BusinessHoursFieldRefs {
    readonly id: FieldRef<"BusinessHours", 'Int'>
    readonly dentistId: FieldRef<"BusinessHours", 'Int'>
    readonly dayOfWeek: FieldRef<"BusinessHours", 'Int'>
    readonly openTime: FieldRef<"BusinessHours", 'String'>
    readonly closeTime: FieldRef<"BusinessHours", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BusinessHours findUnique
   */
  export type BusinessHoursFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    /**
     * Filter, which BusinessHours to fetch.
     */
    where: BusinessHoursWhereUniqueInput
  }

  /**
   * BusinessHours findUniqueOrThrow
   */
  export type BusinessHoursFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    /**
     * Filter, which BusinessHours to fetch.
     */
    where: BusinessHoursWhereUniqueInput
  }

  /**
   * BusinessHours findFirst
   */
  export type BusinessHoursFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    /**
     * Filter, which BusinessHours to fetch.
     */
    where?: BusinessHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessHours to fetch.
     */
    orderBy?: BusinessHoursOrderByWithRelationInput | BusinessHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessHours.
     */
    cursor?: BusinessHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessHours.
     */
    distinct?: BusinessHoursScalarFieldEnum | BusinessHoursScalarFieldEnum[]
  }

  /**
   * BusinessHours findFirstOrThrow
   */
  export type BusinessHoursFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    /**
     * Filter, which BusinessHours to fetch.
     */
    where?: BusinessHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessHours to fetch.
     */
    orderBy?: BusinessHoursOrderByWithRelationInput | BusinessHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessHours.
     */
    cursor?: BusinessHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessHours.
     */
    distinct?: BusinessHoursScalarFieldEnum | BusinessHoursScalarFieldEnum[]
  }

  /**
   * BusinessHours findMany
   */
  export type BusinessHoursFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    /**
     * Filter, which BusinessHours to fetch.
     */
    where?: BusinessHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessHours to fetch.
     */
    orderBy?: BusinessHoursOrderByWithRelationInput | BusinessHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessHours.
     */
    cursor?: BusinessHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessHours.
     */
    distinct?: BusinessHoursScalarFieldEnum | BusinessHoursScalarFieldEnum[]
  }

  /**
   * BusinessHours create
   */
  export type BusinessHoursCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    /**
     * The data needed to create a BusinessHours.
     */
    data: XOR<BusinessHoursCreateInput, BusinessHoursUncheckedCreateInput>
  }

  /**
   * BusinessHours createMany
   */
  export type BusinessHoursCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessHours.
     */
    data: BusinessHoursCreateManyInput | BusinessHoursCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessHours createManyAndReturn
   */
  export type BusinessHoursCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * The data used to create many BusinessHours.
     */
    data: BusinessHoursCreateManyInput | BusinessHoursCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusinessHours update
   */
  export type BusinessHoursUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    /**
     * The data needed to update a BusinessHours.
     */
    data: XOR<BusinessHoursUpdateInput, BusinessHoursUncheckedUpdateInput>
    /**
     * Choose, which BusinessHours to update.
     */
    where: BusinessHoursWhereUniqueInput
  }

  /**
   * BusinessHours updateMany
   */
  export type BusinessHoursUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessHours.
     */
    data: XOR<BusinessHoursUpdateManyMutationInput, BusinessHoursUncheckedUpdateManyInput>
    /**
     * Filter which BusinessHours to update
     */
    where?: BusinessHoursWhereInput
    /**
     * Limit how many BusinessHours to update.
     */
    limit?: number
  }

  /**
   * BusinessHours updateManyAndReturn
   */
  export type BusinessHoursUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * The data used to update BusinessHours.
     */
    data: XOR<BusinessHoursUpdateManyMutationInput, BusinessHoursUncheckedUpdateManyInput>
    /**
     * Filter which BusinessHours to update
     */
    where?: BusinessHoursWhereInput
    /**
     * Limit how many BusinessHours to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusinessHours upsert
   */
  export type BusinessHoursUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    /**
     * The filter to search for the BusinessHours to update in case it exists.
     */
    where: BusinessHoursWhereUniqueInput
    /**
     * In case the BusinessHours found by the `where` argument doesn't exist, create a new BusinessHours with this data.
     */
    create: XOR<BusinessHoursCreateInput, BusinessHoursUncheckedCreateInput>
    /**
     * In case the BusinessHours was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessHoursUpdateInput, BusinessHoursUncheckedUpdateInput>
  }

  /**
   * BusinessHours delete
   */
  export type BusinessHoursDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
    /**
     * Filter which BusinessHours to delete.
     */
    where: BusinessHoursWhereUniqueInput
  }

  /**
   * BusinessHours deleteMany
   */
  export type BusinessHoursDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessHours to delete
     */
    where?: BusinessHoursWhereInput
    /**
     * Limit how many BusinessHours to delete.
     */
    limit?: number
  }

  /**
   * BusinessHours without action
   */
  export type BusinessHoursDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessHours
     */
    select?: BusinessHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessHours
     */
    omit?: BusinessHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessHoursInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    id: number | null
    dentistId: number | null
    treatmentId: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    id: number | null
    dentistId: number | null
    treatmentId: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: number | null
    patientName: string | null
    patientLastName: string | null
    patientEmail: string | null
    patientPhone: string | null
    date: string | null
    time: string | null
    comment: string | null
    status: $Enums.AppointmentStatus | null
    dentistId: number | null
    treatmentId: number | null
    clinicaId: string | null
    createdAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: number | null
    patientName: string | null
    patientLastName: string | null
    patientEmail: string | null
    patientPhone: string | null
    date: string | null
    time: string | null
    comment: string | null
    status: $Enums.AppointmentStatus | null
    dentistId: number | null
    treatmentId: number | null
    clinicaId: string | null
    createdAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    patientName: number
    patientLastName: number
    patientEmail: number
    patientPhone: number
    date: number
    time: number
    comment: number
    status: number
    dentistId: number
    treatmentId: number
    clinicaId: number
    createdAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    id?: true
    dentistId?: true
    treatmentId?: true
  }

  export type AppointmentSumAggregateInputType = {
    id?: true
    dentistId?: true
    treatmentId?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    patientName?: true
    patientLastName?: true
    patientEmail?: true
    patientPhone?: true
    date?: true
    time?: true
    comment?: true
    status?: true
    dentistId?: true
    treatmentId?: true
    clinicaId?: true
    createdAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    patientName?: true
    patientLastName?: true
    patientEmail?: true
    patientPhone?: true
    date?: true
    time?: true
    comment?: true
    status?: true
    dentistId?: true
    treatmentId?: true
    clinicaId?: true
    createdAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    patientName?: true
    patientLastName?: true
    patientEmail?: true
    patientPhone?: true
    date?: true
    time?: true
    comment?: true
    status?: true
    dentistId?: true
    treatmentId?: true
    clinicaId?: true
    createdAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: number
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment: string | null
    status: $Enums.AppointmentStatus
    dentistId: number
    treatmentId: number
    clinicaId: string
    createdAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientName?: boolean
    patientLastName?: boolean
    patientEmail?: boolean
    patientPhone?: boolean
    date?: boolean
    time?: boolean
    comment?: boolean
    status?: boolean
    dentistId?: boolean
    treatmentId?: boolean
    clinicaId?: boolean
    createdAt?: boolean
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientName?: boolean
    patientLastName?: boolean
    patientEmail?: boolean
    patientPhone?: boolean
    date?: boolean
    time?: boolean
    comment?: boolean
    status?: boolean
    dentistId?: boolean
    treatmentId?: boolean
    clinicaId?: boolean
    createdAt?: boolean
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientName?: boolean
    patientLastName?: boolean
    patientEmail?: boolean
    patientPhone?: boolean
    date?: boolean
    time?: boolean
    comment?: boolean
    status?: boolean
    dentistId?: boolean
    treatmentId?: boolean
    clinicaId?: boolean
    createdAt?: boolean
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    patientName?: boolean
    patientLastName?: boolean
    patientEmail?: boolean
    patientPhone?: boolean
    date?: boolean
    time?: boolean
    comment?: boolean
    status?: boolean
    dentistId?: boolean
    treatmentId?: boolean
    clinicaId?: boolean
    createdAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientName" | "patientLastName" | "patientEmail" | "patientPhone" | "date" | "time" | "comment" | "status" | "dentistId" | "treatmentId" | "clinicaId" | "createdAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dentist?: boolean | DentistDefaultArgs<ExtArgs>
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      dentist: Prisma.$DentistPayload<ExtArgs>
      treatment: Prisma.$TreatmentPayload<ExtArgs>
      clinica: Prisma.$ClinicaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patientName: string
      patientLastName: string
      patientEmail: string
      patientPhone: string
      date: string
      time: string
      comment: string | null
      status: $Enums.AppointmentStatus
      dentistId: number
      treatmentId: number
      clinicaId: string
      createdAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dentist<T extends DentistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DentistDefaultArgs<ExtArgs>>): Prisma__DentistClient<$Result.GetResult<Prisma.$DentistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    treatment<T extends TreatmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TreatmentDefaultArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clinica<T extends ClinicaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicaDefaultArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'Int'>
    readonly patientName: FieldRef<"Appointment", 'String'>
    readonly patientLastName: FieldRef<"Appointment", 'String'>
    readonly patientEmail: FieldRef<"Appointment", 'String'>
    readonly patientPhone: FieldRef<"Appointment", 'String'>
    readonly date: FieldRef<"Appointment", 'String'>
    readonly time: FieldRef<"Appointment", 'String'>
    readonly comment: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly dentistId: FieldRef<"Appointment", 'Int'>
    readonly treatmentId: FieldRef<"Appointment", 'Int'>
    readonly clinicaId: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model Clinica
   */

  export type AggregateClinica = {
    _count: ClinicaCountAggregateOutputType | null
    _min: ClinicaMinAggregateOutputType | null
    _max: ClinicaMaxAggregateOutputType | null
  }

  export type ClinicaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicaCountAggregateOutputType = {
    id: number
    nombre: number
    slug: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicaMinAggregateInputType = {
    id?: true
    nombre?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicaMaxAggregateInputType = {
    id?: true
    nombre?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicaCountAggregateInputType = {
    id?: true
    nombre?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinica to aggregate.
     */
    where?: ClinicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinicas to fetch.
     */
    orderBy?: ClinicaOrderByWithRelationInput | ClinicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clinicas
    **/
    _count?: true | ClinicaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicaMaxAggregateInputType
  }

  export type GetClinicaAggregateType<T extends ClinicaAggregateArgs> = {
        [P in keyof T & keyof AggregateClinica]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinica[P]>
      : GetScalarType<T[P], AggregateClinica[P]>
  }




  export type ClinicaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicaWhereInput
    orderBy?: ClinicaOrderByWithAggregationInput | ClinicaOrderByWithAggregationInput[]
    by: ClinicaScalarFieldEnum[] | ClinicaScalarFieldEnum
    having?: ClinicaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicaCountAggregateInputType | true
    _min?: ClinicaMinAggregateInputType
    _max?: ClinicaMaxAggregateInputType
  }

  export type ClinicaGroupByOutputType = {
    id: string
    nombre: string
    slug: string
    createdAt: Date
    updatedAt: Date
    _count: ClinicaCountAggregateOutputType | null
    _min: ClinicaMinAggregateOutputType | null
    _max: ClinicaMaxAggregateOutputType | null
  }

  type GetClinicaGroupByPayload<T extends ClinicaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicaGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicaGroupByOutputType[P]>
        }
      >
    >


  export type ClinicaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    appointments?: boolean | Clinica$appointmentsArgs<ExtArgs>
    admins?: boolean | Clinica$adminsArgs<ExtArgs>
    _count?: boolean | ClinicaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinica"]>

  export type ClinicaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinica"]>

  export type ClinicaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinica"]>

  export type ClinicaSelectScalar = {
    id?: boolean
    nombre?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClinicaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "slug" | "createdAt" | "updatedAt", ExtArgs["result"]["clinica"]>
  export type ClinicaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | Clinica$appointmentsArgs<ExtArgs>
    admins?: boolean | Clinica$adminsArgs<ExtArgs>
    _count?: boolean | ClinicaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClinicaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClinicaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClinicaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Clinica"
    objects: {
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      admins: Prisma.$AdminUserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      slug: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinica"]>
    composites: {}
  }

  type ClinicaGetPayload<S extends boolean | null | undefined | ClinicaDefaultArgs> = $Result.GetResult<Prisma.$ClinicaPayload, S>

  type ClinicaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicaCountAggregateInputType | true
    }

  export interface ClinicaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clinica'], meta: { name: 'Clinica' } }
    /**
     * Find zero or one Clinica that matches the filter.
     * @param {ClinicaFindUniqueArgs} args - Arguments to find a Clinica
     * @example
     * // Get one Clinica
     * const clinica = await prisma.clinica.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicaFindUniqueArgs>(args: SelectSubset<T, ClinicaFindUniqueArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clinica that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicaFindUniqueOrThrowArgs} args - Arguments to find a Clinica
     * @example
     * // Get one Clinica
     * const clinica = await prisma.clinica.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicaFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinica that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicaFindFirstArgs} args - Arguments to find a Clinica
     * @example
     * // Get one Clinica
     * const clinica = await prisma.clinica.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicaFindFirstArgs>(args?: SelectSubset<T, ClinicaFindFirstArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinica that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicaFindFirstOrThrowArgs} args - Arguments to find a Clinica
     * @example
     * // Get one Clinica
     * const clinica = await prisma.clinica.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicaFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clinicas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clinicas
     * const clinicas = await prisma.clinica.findMany()
     * 
     * // Get first 10 Clinicas
     * const clinicas = await prisma.clinica.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicaWithIdOnly = await prisma.clinica.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicaFindManyArgs>(args?: SelectSubset<T, ClinicaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clinica.
     * @param {ClinicaCreateArgs} args - Arguments to create a Clinica.
     * @example
     * // Create one Clinica
     * const Clinica = await prisma.clinica.create({
     *   data: {
     *     // ... data to create a Clinica
     *   }
     * })
     * 
     */
    create<T extends ClinicaCreateArgs>(args: SelectSubset<T, ClinicaCreateArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clinicas.
     * @param {ClinicaCreateManyArgs} args - Arguments to create many Clinicas.
     * @example
     * // Create many Clinicas
     * const clinica = await prisma.clinica.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicaCreateManyArgs>(args?: SelectSubset<T, ClinicaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clinicas and returns the data saved in the database.
     * @param {ClinicaCreateManyAndReturnArgs} args - Arguments to create many Clinicas.
     * @example
     * // Create many Clinicas
     * const clinica = await prisma.clinica.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clinicas and only return the `id`
     * const clinicaWithIdOnly = await prisma.clinica.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicaCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Clinica.
     * @param {ClinicaDeleteArgs} args - Arguments to delete one Clinica.
     * @example
     * // Delete one Clinica
     * const Clinica = await prisma.clinica.delete({
     *   where: {
     *     // ... filter to delete one Clinica
     *   }
     * })
     * 
     */
    delete<T extends ClinicaDeleteArgs>(args: SelectSubset<T, ClinicaDeleteArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clinica.
     * @param {ClinicaUpdateArgs} args - Arguments to update one Clinica.
     * @example
     * // Update one Clinica
     * const clinica = await prisma.clinica.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicaUpdateArgs>(args: SelectSubset<T, ClinicaUpdateArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clinicas.
     * @param {ClinicaDeleteManyArgs} args - Arguments to filter Clinicas to delete.
     * @example
     * // Delete a few Clinicas
     * const { count } = await prisma.clinica.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicaDeleteManyArgs>(args?: SelectSubset<T, ClinicaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinicas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clinicas
     * const clinica = await prisma.clinica.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicaUpdateManyArgs>(args: SelectSubset<T, ClinicaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinicas and returns the data updated in the database.
     * @param {ClinicaUpdateManyAndReturnArgs} args - Arguments to update many Clinicas.
     * @example
     * // Update many Clinicas
     * const clinica = await prisma.clinica.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clinicas and only return the `id`
     * const clinicaWithIdOnly = await prisma.clinica.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClinicaUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Clinica.
     * @param {ClinicaUpsertArgs} args - Arguments to update or create a Clinica.
     * @example
     * // Update or create a Clinica
     * const clinica = await prisma.clinica.upsert({
     *   create: {
     *     // ... data to create a Clinica
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clinica we want to update
     *   }
     * })
     */
    upsert<T extends ClinicaUpsertArgs>(args: SelectSubset<T, ClinicaUpsertArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clinicas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicaCountArgs} args - Arguments to filter Clinicas to count.
     * @example
     * // Count the number of Clinicas
     * const count = await prisma.clinica.count({
     *   where: {
     *     // ... the filter for the Clinicas we want to count
     *   }
     * })
    **/
    count<T extends ClinicaCountArgs>(
      args?: Subset<T, ClinicaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clinica.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClinicaAggregateArgs>(args: Subset<T, ClinicaAggregateArgs>): Prisma.PrismaPromise<GetClinicaAggregateType<T>>

    /**
     * Group by Clinica.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClinicaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicaGroupByArgs['orderBy'] }
        : { orderBy?: ClinicaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClinicaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Clinica model
   */
  readonly fields: ClinicaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Clinica.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    appointments<T extends Clinica$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Clinica$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    admins<T extends Clinica$adminsArgs<ExtArgs> = {}>(args?: Subset<T, Clinica$adminsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Clinica model
   */
  interface ClinicaFieldRefs {
    readonly id: FieldRef<"Clinica", 'String'>
    readonly nombre: FieldRef<"Clinica", 'String'>
    readonly slug: FieldRef<"Clinica", 'String'>
    readonly createdAt: FieldRef<"Clinica", 'DateTime'>
    readonly updatedAt: FieldRef<"Clinica", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Clinica findUnique
   */
  export type ClinicaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
    /**
     * Filter, which Clinica to fetch.
     */
    where: ClinicaWhereUniqueInput
  }

  /**
   * Clinica findUniqueOrThrow
   */
  export type ClinicaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
    /**
     * Filter, which Clinica to fetch.
     */
    where: ClinicaWhereUniqueInput
  }

  /**
   * Clinica findFirst
   */
  export type ClinicaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
    /**
     * Filter, which Clinica to fetch.
     */
    where?: ClinicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinicas to fetch.
     */
    orderBy?: ClinicaOrderByWithRelationInput | ClinicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinicas.
     */
    cursor?: ClinicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinicas.
     */
    distinct?: ClinicaScalarFieldEnum | ClinicaScalarFieldEnum[]
  }

  /**
   * Clinica findFirstOrThrow
   */
  export type ClinicaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
    /**
     * Filter, which Clinica to fetch.
     */
    where?: ClinicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinicas to fetch.
     */
    orderBy?: ClinicaOrderByWithRelationInput | ClinicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinicas.
     */
    cursor?: ClinicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinicas.
     */
    distinct?: ClinicaScalarFieldEnum | ClinicaScalarFieldEnum[]
  }

  /**
   * Clinica findMany
   */
  export type ClinicaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
    /**
     * Filter, which Clinicas to fetch.
     */
    where?: ClinicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinicas to fetch.
     */
    orderBy?: ClinicaOrderByWithRelationInput | ClinicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clinicas.
     */
    cursor?: ClinicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinicas.
     */
    distinct?: ClinicaScalarFieldEnum | ClinicaScalarFieldEnum[]
  }

  /**
   * Clinica create
   */
  export type ClinicaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
    /**
     * The data needed to create a Clinica.
     */
    data: XOR<ClinicaCreateInput, ClinicaUncheckedCreateInput>
  }

  /**
   * Clinica createMany
   */
  export type ClinicaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clinicas.
     */
    data: ClinicaCreateManyInput | ClinicaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinica createManyAndReturn
   */
  export type ClinicaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * The data used to create many Clinicas.
     */
    data: ClinicaCreateManyInput | ClinicaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinica update
   */
  export type ClinicaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
    /**
     * The data needed to update a Clinica.
     */
    data: XOR<ClinicaUpdateInput, ClinicaUncheckedUpdateInput>
    /**
     * Choose, which Clinica to update.
     */
    where: ClinicaWhereUniqueInput
  }

  /**
   * Clinica updateMany
   */
  export type ClinicaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clinicas.
     */
    data: XOR<ClinicaUpdateManyMutationInput, ClinicaUncheckedUpdateManyInput>
    /**
     * Filter which Clinicas to update
     */
    where?: ClinicaWhereInput
    /**
     * Limit how many Clinicas to update.
     */
    limit?: number
  }

  /**
   * Clinica updateManyAndReturn
   */
  export type ClinicaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * The data used to update Clinicas.
     */
    data: XOR<ClinicaUpdateManyMutationInput, ClinicaUncheckedUpdateManyInput>
    /**
     * Filter which Clinicas to update
     */
    where?: ClinicaWhereInput
    /**
     * Limit how many Clinicas to update.
     */
    limit?: number
  }

  /**
   * Clinica upsert
   */
  export type ClinicaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
    /**
     * The filter to search for the Clinica to update in case it exists.
     */
    where: ClinicaWhereUniqueInput
    /**
     * In case the Clinica found by the `where` argument doesn't exist, create a new Clinica with this data.
     */
    create: XOR<ClinicaCreateInput, ClinicaUncheckedCreateInput>
    /**
     * In case the Clinica was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicaUpdateInput, ClinicaUncheckedUpdateInput>
  }

  /**
   * Clinica delete
   */
  export type ClinicaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
    /**
     * Filter which Clinica to delete.
     */
    where: ClinicaWhereUniqueInput
  }

  /**
   * Clinica deleteMany
   */
  export type ClinicaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinicas to delete
     */
    where?: ClinicaWhereInput
    /**
     * Limit how many Clinicas to delete.
     */
    limit?: number
  }

  /**
   * Clinica.appointments
   */
  export type Clinica$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Clinica.admins
   */
  export type Clinica$adminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    cursor?: AdminUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * Clinica without action
   */
  export type ClinicaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinica
     */
    select?: ClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinica
     */
    omit?: ClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicaInclude<ExtArgs> | null
  }


  /**
   * Model AdminUser
   */

  export type AggregateAdminUser = {
    _count: AdminUserCountAggregateOutputType | null
    _avg: AdminUserAvgAggregateOutputType | null
    _sum: AdminUserSumAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  export type AdminUserAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminUserSumAggregateOutputType = {
    id: number | null
  }

  export type AdminUserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    nombre: string | null
    clinicaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    nombre: string | null
    clinicaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    nombre: number
    clinicaId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminUserAvgAggregateInputType = {
    id?: true
  }

  export type AdminUserSumAggregateInputType = {
    id?: true
  }

  export type AdminUserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nombre?: true
    clinicaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nombre?: true
    clinicaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nombre?: true
    clinicaId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUser to aggregate.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUserMaxAggregateInputType
  }

  export type GetAdminUserAggregateType<T extends AdminUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUser[P]>
      : GetScalarType<T[P], AggregateAdminUser[P]>
  }




  export type AdminUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithAggregationInput | AdminUserOrderByWithAggregationInput[]
    by: AdminUserScalarFieldEnum[] | AdminUserScalarFieldEnum
    having?: AdminUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUserCountAggregateInputType | true
    _avg?: AdminUserAvgAggregateInputType
    _sum?: AdminUserSumAggregateInputType
    _min?: AdminUserMinAggregateInputType
    _max?: AdminUserMaxAggregateInputType
  }

  export type AdminUserGroupByOutputType = {
    id: number
    email: string
    password: string
    nombre: string
    clinicaId: string
    createdAt: Date
    updatedAt: Date
    _count: AdminUserCountAggregateOutputType | null
    _avg: AdminUserAvgAggregateOutputType | null
    _sum: AdminUserSumAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  type GetAdminUserGroupByPayload<T extends AdminUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
        }
      >
    >


  export type AdminUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    nombre?: boolean
    clinicaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    nombre?: boolean
    clinicaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    nombre?: boolean
    clinicaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    nombre?: boolean
    clinicaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "nombre" | "clinicaId" | "createdAt" | "updatedAt", ExtArgs["result"]["adminUser"]>
  export type AdminUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }
  export type AdminUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }
  export type AdminUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinica?: boolean | ClinicaDefaultArgs<ExtArgs>
  }

  export type $AdminUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUser"
    objects: {
      clinica: Prisma.$ClinicaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      nombre: string
      clinicaId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminUser"]>
    composites: {}
  }

  type AdminUserGetPayload<S extends boolean | null | undefined | AdminUserDefaultArgs> = $Result.GetResult<Prisma.$AdminUserPayload, S>

  type AdminUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminUserCountAggregateInputType | true
    }

  export interface AdminUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUser'], meta: { name: 'AdminUser' } }
    /**
     * Find zero or one AdminUser that matches the filter.
     * @param {AdminUserFindUniqueArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUserFindUniqueArgs>(args: SelectSubset<T, AdminUserFindUniqueArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminUserFindUniqueOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUserFindFirstArgs>(args?: SelectSubset<T, AdminUserFindFirstArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUser.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminUserFindManyArgs>(args?: SelectSubset<T, AdminUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminUser.
     * @param {AdminUserCreateArgs} args - Arguments to create a AdminUser.
     * @example
     * // Create one AdminUser
     * const AdminUser = await prisma.adminUser.create({
     *   data: {
     *     // ... data to create a AdminUser
     *   }
     * })
     * 
     */
    create<T extends AdminUserCreateArgs>(args: SelectSubset<T, AdminUserCreateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminUsers.
     * @param {AdminUserCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUserCreateManyArgs>(args?: SelectSubset<T, AdminUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminUsers and returns the data saved in the database.
     * @param {AdminUserCreateManyAndReturnArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminUser.
     * @param {AdminUserDeleteArgs} args - Arguments to delete one AdminUser.
     * @example
     * // Delete one AdminUser
     * const AdminUser = await prisma.adminUser.delete({
     *   where: {
     *     // ... filter to delete one AdminUser
     *   }
     * })
     * 
     */
    delete<T extends AdminUserDeleteArgs>(args: SelectSubset<T, AdminUserDeleteArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminUser.
     * @param {AdminUserUpdateArgs} args - Arguments to update one AdminUser.
     * @example
     * // Update one AdminUser
     * const adminUser = await prisma.adminUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUserUpdateArgs>(args: SelectSubset<T, AdminUserUpdateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUserDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUserDeleteManyArgs>(args?: SelectSubset<T, AdminUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUserUpdateManyArgs>(args: SelectSubset<T, AdminUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers and returns the data updated in the database.
     * @param {AdminUserUpdateManyAndReturnArgs} args - Arguments to update many AdminUsers.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUserUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminUser.
     * @param {AdminUserUpsertArgs} args - Arguments to update or create a AdminUser.
     * @example
     * // Update or create a AdminUser
     * const adminUser = await prisma.adminUser.upsert({
     *   create: {
     *     // ... data to create a AdminUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUser we want to update
     *   }
     * })
     */
    upsert<T extends AdminUserUpsertArgs>(args: SelectSubset<T, AdminUserUpsertArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUser.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUserCountArgs>(
      args?: Subset<T, AdminUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminUserAggregateArgs>(args: Subset<T, AdminUserAggregateArgs>): Prisma.PrismaPromise<GetAdminUserAggregateType<T>>

    /**
     * Group by AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUserGroupByArgs['orderBy'] }
        : { orderBy?: AdminUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUser model
   */
  readonly fields: AdminUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinica<T extends ClinicaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicaDefaultArgs<ExtArgs>>): Prisma__ClinicaClient<$Result.GetResult<Prisma.$ClinicaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminUser model
   */
  interface AdminUserFieldRefs {
    readonly id: FieldRef<"AdminUser", 'Int'>
    readonly email: FieldRef<"AdminUser", 'String'>
    readonly password: FieldRef<"AdminUser", 'String'>
    readonly nombre: FieldRef<"AdminUser", 'String'>
    readonly clinicaId: FieldRef<"AdminUser", 'String'>
    readonly createdAt: FieldRef<"AdminUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminUser findUnique
   */
  export type AdminUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findUniqueOrThrow
   */
  export type AdminUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findFirst
   */
  export type AdminUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findFirstOrThrow
   */
  export type AdminUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findMany
   */
  export type AdminUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser create
   */
  export type AdminUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminUser.
     */
    data: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
  }

  /**
   * AdminUser createMany
   */
  export type AdminUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser createManyAndReturn
   */
  export type AdminUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminUser update
   */
  export type AdminUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminUser.
     */
    data: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
    /**
     * Choose, which AdminUser to update.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser updateMany
   */
  export type AdminUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUser updateManyAndReturn
   */
  export type AdminUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminUser upsert
   */
  export type AdminUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminUser to update in case it exists.
     */
    where: AdminUserWhereUniqueInput
    /**
     * In case the AdminUser found by the `where` argument doesn't exist, create a new AdminUser with this data.
     */
    create: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
    /**
     * In case the AdminUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
  }

  /**
   * AdminUser delete
   */
  export type AdminUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter which AdminUser to delete.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser deleteMany
   */
  export type AdminUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to delete.
     */
    limit?: number
  }

  /**
   * AdminUser without action
   */
  export type AdminUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DentistScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    specialty: 'specialty',
    description: 'description',
    experienceYears: 'experienceYears',
    imageUrl: 'imageUrl',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DentistScalarFieldEnum = (typeof DentistScalarFieldEnum)[keyof typeof DentistScalarFieldEnum]


  export const TreatmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    shortDescription: 'shortDescription',
    description: 'description',
    benefits: 'benefits',
    durationMinutes: 'durationMinutes',
    price: 'price',
    imageUrl: 'imageUrl',
    isFeatured: 'isFeatured',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TreatmentScalarFieldEnum = (typeof TreatmentScalarFieldEnum)[keyof typeof TreatmentScalarFieldEnum]


  export const BusinessHoursScalarFieldEnum: {
    id: 'id',
    dentistId: 'dentistId',
    dayOfWeek: 'dayOfWeek',
    openTime: 'openTime',
    closeTime: 'closeTime'
  };

  export type BusinessHoursScalarFieldEnum = (typeof BusinessHoursScalarFieldEnum)[keyof typeof BusinessHoursScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    patientName: 'patientName',
    patientLastName: 'patientLastName',
    patientEmail: 'patientEmail',
    patientPhone: 'patientPhone',
    date: 'date',
    time: 'time',
    comment: 'comment',
    status: 'status',
    dentistId: 'dentistId',
    treatmentId: 'treatmentId',
    clinicaId: 'clinicaId',
    createdAt: 'createdAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const ClinicaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    slug: 'slug',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClinicaScalarFieldEnum = (typeof ClinicaScalarFieldEnum)[keyof typeof ClinicaScalarFieldEnum]


  export const AdminUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    nombre: 'nombre',
    clinicaId: 'clinicaId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus[]'
   */
  export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DentistWhereInput = {
    AND?: DentistWhereInput | DentistWhereInput[]
    OR?: DentistWhereInput[]
    NOT?: DentistWhereInput | DentistWhereInput[]
    id?: IntFilter<"Dentist"> | number
    name?: StringFilter<"Dentist"> | string
    role?: StringFilter<"Dentist"> | string
    specialty?: StringFilter<"Dentist"> | string
    description?: StringFilter<"Dentist"> | string
    experienceYears?: IntFilter<"Dentist"> | number
    imageUrl?: StringFilter<"Dentist"> | string
    isActive?: BoolFilter<"Dentist"> | boolean
    createdAt?: DateTimeFilter<"Dentist"> | Date | string
    updatedAt?: DateTimeFilter<"Dentist"> | Date | string
    appointments?: AppointmentListRelationFilter
    businessHours?: BusinessHoursListRelationFilter
  }

  export type DentistOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    specialty?: SortOrder
    description?: SortOrder
    experienceYears?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    appointments?: AppointmentOrderByRelationAggregateInput
    businessHours?: BusinessHoursOrderByRelationAggregateInput
  }

  export type DentistWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DentistWhereInput | DentistWhereInput[]
    OR?: DentistWhereInput[]
    NOT?: DentistWhereInput | DentistWhereInput[]
    name?: StringFilter<"Dentist"> | string
    role?: StringFilter<"Dentist"> | string
    specialty?: StringFilter<"Dentist"> | string
    description?: StringFilter<"Dentist"> | string
    experienceYears?: IntFilter<"Dentist"> | number
    imageUrl?: StringFilter<"Dentist"> | string
    isActive?: BoolFilter<"Dentist"> | boolean
    createdAt?: DateTimeFilter<"Dentist"> | Date | string
    updatedAt?: DateTimeFilter<"Dentist"> | Date | string
    appointments?: AppointmentListRelationFilter
    businessHours?: BusinessHoursListRelationFilter
  }, "id">

  export type DentistOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    specialty?: SortOrder
    description?: SortOrder
    experienceYears?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DentistCountOrderByAggregateInput
    _avg?: DentistAvgOrderByAggregateInput
    _max?: DentistMaxOrderByAggregateInput
    _min?: DentistMinOrderByAggregateInput
    _sum?: DentistSumOrderByAggregateInput
  }

  export type DentistScalarWhereWithAggregatesInput = {
    AND?: DentistScalarWhereWithAggregatesInput | DentistScalarWhereWithAggregatesInput[]
    OR?: DentistScalarWhereWithAggregatesInput[]
    NOT?: DentistScalarWhereWithAggregatesInput | DentistScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Dentist"> | number
    name?: StringWithAggregatesFilter<"Dentist"> | string
    role?: StringWithAggregatesFilter<"Dentist"> | string
    specialty?: StringWithAggregatesFilter<"Dentist"> | string
    description?: StringWithAggregatesFilter<"Dentist"> | string
    experienceYears?: IntWithAggregatesFilter<"Dentist"> | number
    imageUrl?: StringWithAggregatesFilter<"Dentist"> | string
    isActive?: BoolWithAggregatesFilter<"Dentist"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Dentist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Dentist"> | Date | string
  }

  export type TreatmentWhereInput = {
    AND?: TreatmentWhereInput | TreatmentWhereInput[]
    OR?: TreatmentWhereInput[]
    NOT?: TreatmentWhereInput | TreatmentWhereInput[]
    id?: IntFilter<"Treatment"> | number
    name?: StringFilter<"Treatment"> | string
    slug?: StringFilter<"Treatment"> | string
    shortDescription?: StringFilter<"Treatment"> | string
    description?: StringFilter<"Treatment"> | string
    benefits?: JsonFilter<"Treatment">
    durationMinutes?: IntFilter<"Treatment"> | number
    price?: IntFilter<"Treatment"> | number
    imageUrl?: StringFilter<"Treatment"> | string
    isFeatured?: BoolFilter<"Treatment"> | boolean
    sortOrder?: IntFilter<"Treatment"> | number
    createdAt?: DateTimeFilter<"Treatment"> | Date | string
    updatedAt?: DateTimeFilter<"Treatment"> | Date | string
    appointments?: AppointmentListRelationFilter
  }

  export type TreatmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    benefits?: SortOrder
    durationMinutes?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    isFeatured?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type TreatmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: TreatmentWhereInput | TreatmentWhereInput[]
    OR?: TreatmentWhereInput[]
    NOT?: TreatmentWhereInput | TreatmentWhereInput[]
    name?: StringFilter<"Treatment"> | string
    shortDescription?: StringFilter<"Treatment"> | string
    description?: StringFilter<"Treatment"> | string
    benefits?: JsonFilter<"Treatment">
    durationMinutes?: IntFilter<"Treatment"> | number
    price?: IntFilter<"Treatment"> | number
    imageUrl?: StringFilter<"Treatment"> | string
    isFeatured?: BoolFilter<"Treatment"> | boolean
    sortOrder?: IntFilter<"Treatment"> | number
    createdAt?: DateTimeFilter<"Treatment"> | Date | string
    updatedAt?: DateTimeFilter<"Treatment"> | Date | string
    appointments?: AppointmentListRelationFilter
  }, "id" | "slug">

  export type TreatmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    benefits?: SortOrder
    durationMinutes?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    isFeatured?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TreatmentCountOrderByAggregateInput
    _avg?: TreatmentAvgOrderByAggregateInput
    _max?: TreatmentMaxOrderByAggregateInput
    _min?: TreatmentMinOrderByAggregateInput
    _sum?: TreatmentSumOrderByAggregateInput
  }

  export type TreatmentScalarWhereWithAggregatesInput = {
    AND?: TreatmentScalarWhereWithAggregatesInput | TreatmentScalarWhereWithAggregatesInput[]
    OR?: TreatmentScalarWhereWithAggregatesInput[]
    NOT?: TreatmentScalarWhereWithAggregatesInput | TreatmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Treatment"> | number
    name?: StringWithAggregatesFilter<"Treatment"> | string
    slug?: StringWithAggregatesFilter<"Treatment"> | string
    shortDescription?: StringWithAggregatesFilter<"Treatment"> | string
    description?: StringWithAggregatesFilter<"Treatment"> | string
    benefits?: JsonWithAggregatesFilter<"Treatment">
    durationMinutes?: IntWithAggregatesFilter<"Treatment"> | number
    price?: IntWithAggregatesFilter<"Treatment"> | number
    imageUrl?: StringWithAggregatesFilter<"Treatment"> | string
    isFeatured?: BoolWithAggregatesFilter<"Treatment"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Treatment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Treatment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Treatment"> | Date | string
  }

  export type BusinessHoursWhereInput = {
    AND?: BusinessHoursWhereInput | BusinessHoursWhereInput[]
    OR?: BusinessHoursWhereInput[]
    NOT?: BusinessHoursWhereInput | BusinessHoursWhereInput[]
    id?: IntFilter<"BusinessHours"> | number
    dentistId?: IntFilter<"BusinessHours"> | number
    dayOfWeek?: IntFilter<"BusinessHours"> | number
    openTime?: StringFilter<"BusinessHours"> | string
    closeTime?: StringFilter<"BusinessHours"> | string
    dentist?: XOR<DentistScalarRelationFilter, DentistWhereInput>
  }

  export type BusinessHoursOrderByWithRelationInput = {
    id?: SortOrder
    dentistId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    dentist?: DentistOrderByWithRelationInput
  }

  export type BusinessHoursWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    dentistId_dayOfWeek?: BusinessHoursDentistIdDayOfWeekCompoundUniqueInput
    AND?: BusinessHoursWhereInput | BusinessHoursWhereInput[]
    OR?: BusinessHoursWhereInput[]
    NOT?: BusinessHoursWhereInput | BusinessHoursWhereInput[]
    dentistId?: IntFilter<"BusinessHours"> | number
    dayOfWeek?: IntFilter<"BusinessHours"> | number
    openTime?: StringFilter<"BusinessHours"> | string
    closeTime?: StringFilter<"BusinessHours"> | string
    dentist?: XOR<DentistScalarRelationFilter, DentistWhereInput>
  }, "id" | "dentistId_dayOfWeek">

  export type BusinessHoursOrderByWithAggregationInput = {
    id?: SortOrder
    dentistId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    _count?: BusinessHoursCountOrderByAggregateInput
    _avg?: BusinessHoursAvgOrderByAggregateInput
    _max?: BusinessHoursMaxOrderByAggregateInput
    _min?: BusinessHoursMinOrderByAggregateInput
    _sum?: BusinessHoursSumOrderByAggregateInput
  }

  export type BusinessHoursScalarWhereWithAggregatesInput = {
    AND?: BusinessHoursScalarWhereWithAggregatesInput | BusinessHoursScalarWhereWithAggregatesInput[]
    OR?: BusinessHoursScalarWhereWithAggregatesInput[]
    NOT?: BusinessHoursScalarWhereWithAggregatesInput | BusinessHoursScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BusinessHours"> | number
    dentistId?: IntWithAggregatesFilter<"BusinessHours"> | number
    dayOfWeek?: IntWithAggregatesFilter<"BusinessHours"> | number
    openTime?: StringWithAggregatesFilter<"BusinessHours"> | string
    closeTime?: StringWithAggregatesFilter<"BusinessHours"> | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: IntFilter<"Appointment"> | number
    patientName?: StringFilter<"Appointment"> | string
    patientLastName?: StringFilter<"Appointment"> | string
    patientEmail?: StringFilter<"Appointment"> | string
    patientPhone?: StringFilter<"Appointment"> | string
    date?: StringFilter<"Appointment"> | string
    time?: StringFilter<"Appointment"> | string
    comment?: StringNullableFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    dentistId?: IntFilter<"Appointment"> | number
    treatmentId?: IntFilter<"Appointment"> | number
    clinicaId?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    dentist?: XOR<DentistScalarRelationFilter, DentistWhereInput>
    treatment?: XOR<TreatmentScalarRelationFilter, TreatmentWhereInput>
    clinica?: XOR<ClinicaScalarRelationFilter, ClinicaWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    patientName?: SortOrder
    patientLastName?: SortOrder
    patientEmail?: SortOrder
    patientPhone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    comment?: SortOrderInput | SortOrder
    status?: SortOrder
    dentistId?: SortOrder
    treatmentId?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
    dentist?: DentistOrderByWithRelationInput
    treatment?: TreatmentOrderByWithRelationInput
    clinica?: ClinicaOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    dentistId_date_time_clinicaId?: AppointmentDentistIdDateTimeClinicaIdCompoundUniqueInput
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    patientName?: StringFilter<"Appointment"> | string
    patientLastName?: StringFilter<"Appointment"> | string
    patientEmail?: StringFilter<"Appointment"> | string
    patientPhone?: StringFilter<"Appointment"> | string
    date?: StringFilter<"Appointment"> | string
    time?: StringFilter<"Appointment"> | string
    comment?: StringNullableFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    dentistId?: IntFilter<"Appointment"> | number
    treatmentId?: IntFilter<"Appointment"> | number
    clinicaId?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    dentist?: XOR<DentistScalarRelationFilter, DentistWhereInput>
    treatment?: XOR<TreatmentScalarRelationFilter, TreatmentWhereInput>
    clinica?: XOR<ClinicaScalarRelationFilter, ClinicaWhereInput>
  }, "id" | "dentistId_date_time_clinicaId">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    patientName?: SortOrder
    patientLastName?: SortOrder
    patientEmail?: SortOrder
    patientPhone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    comment?: SortOrderInput | SortOrder
    status?: SortOrder
    dentistId?: SortOrder
    treatmentId?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Appointment"> | number
    patientName?: StringWithAggregatesFilter<"Appointment"> | string
    patientLastName?: StringWithAggregatesFilter<"Appointment"> | string
    patientEmail?: StringWithAggregatesFilter<"Appointment"> | string
    patientPhone?: StringWithAggregatesFilter<"Appointment"> | string
    date?: StringWithAggregatesFilter<"Appointment"> | string
    time?: StringWithAggregatesFilter<"Appointment"> | string
    comment?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    dentistId?: IntWithAggregatesFilter<"Appointment"> | number
    treatmentId?: IntWithAggregatesFilter<"Appointment"> | number
    clinicaId?: StringWithAggregatesFilter<"Appointment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type ClinicaWhereInput = {
    AND?: ClinicaWhereInput | ClinicaWhereInput[]
    OR?: ClinicaWhereInput[]
    NOT?: ClinicaWhereInput | ClinicaWhereInput[]
    id?: StringFilter<"Clinica"> | string
    nombre?: StringFilter<"Clinica"> | string
    slug?: StringFilter<"Clinica"> | string
    createdAt?: DateTimeFilter<"Clinica"> | Date | string
    updatedAt?: DateTimeFilter<"Clinica"> | Date | string
    appointments?: AppointmentListRelationFilter
    admins?: AdminUserListRelationFilter
  }

  export type ClinicaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    appointments?: AppointmentOrderByRelationAggregateInput
    admins?: AdminUserOrderByRelationAggregateInput
  }

  export type ClinicaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ClinicaWhereInput | ClinicaWhereInput[]
    OR?: ClinicaWhereInput[]
    NOT?: ClinicaWhereInput | ClinicaWhereInput[]
    nombre?: StringFilter<"Clinica"> | string
    createdAt?: DateTimeFilter<"Clinica"> | Date | string
    updatedAt?: DateTimeFilter<"Clinica"> | Date | string
    appointments?: AppointmentListRelationFilter
    admins?: AdminUserListRelationFilter
  }, "id" | "slug">

  export type ClinicaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicaCountOrderByAggregateInput
    _max?: ClinicaMaxOrderByAggregateInput
    _min?: ClinicaMinOrderByAggregateInput
  }

  export type ClinicaScalarWhereWithAggregatesInput = {
    AND?: ClinicaScalarWhereWithAggregatesInput | ClinicaScalarWhereWithAggregatesInput[]
    OR?: ClinicaScalarWhereWithAggregatesInput[]
    NOT?: ClinicaScalarWhereWithAggregatesInput | ClinicaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Clinica"> | string
    nombre?: StringWithAggregatesFilter<"Clinica"> | string
    slug?: StringWithAggregatesFilter<"Clinica"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Clinica"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Clinica"> | Date | string
  }

  export type AdminUserWhereInput = {
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    id?: IntFilter<"AdminUser"> | number
    email?: StringFilter<"AdminUser"> | string
    password?: StringFilter<"AdminUser"> | string
    nombre?: StringFilter<"AdminUser"> | string
    clinicaId?: StringFilter<"AdminUser"> | string
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    clinica?: XOR<ClinicaScalarRelationFilter, ClinicaWhereInput>
  }

  export type AdminUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clinica?: ClinicaOrderByWithRelationInput
  }

  export type AdminUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    clinicaId_email?: AdminUserClinicaIdEmailCompoundUniqueInput
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    password?: StringFilter<"AdminUser"> | string
    nombre?: StringFilter<"AdminUser"> | string
    clinicaId?: StringFilter<"AdminUser"> | string
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    clinica?: XOR<ClinicaScalarRelationFilter, ClinicaWhereInput>
  }, "id" | "email" | "clinicaId_email">

  export type AdminUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminUserCountOrderByAggregateInput
    _avg?: AdminUserAvgOrderByAggregateInput
    _max?: AdminUserMaxOrderByAggregateInput
    _min?: AdminUserMinOrderByAggregateInput
    _sum?: AdminUserSumOrderByAggregateInput
  }

  export type AdminUserScalarWhereWithAggregatesInput = {
    AND?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    OR?: AdminUserScalarWhereWithAggregatesInput[]
    NOT?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AdminUser"> | number
    email?: StringWithAggregatesFilter<"AdminUser"> | string
    password?: StringWithAggregatesFilter<"AdminUser"> | string
    nombre?: StringWithAggregatesFilter<"AdminUser"> | string
    clinicaId?: StringWithAggregatesFilter<"AdminUser"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
  }

  export type DentistCreateInput = {
    name: string
    role: string
    specialty: string
    description: string
    experienceYears: number
    imageUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutDentistInput
    businessHours?: BusinessHoursCreateNestedManyWithoutDentistInput
  }

  export type DentistUncheckedCreateInput = {
    id?: number
    name: string
    role: string
    specialty: string
    description: string
    experienceYears: number
    imageUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDentistInput
    businessHours?: BusinessHoursUncheckedCreateNestedManyWithoutDentistInput
  }

  export type DentistUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    experienceYears?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutDentistNestedInput
    businessHours?: BusinessHoursUpdateManyWithoutDentistNestedInput
  }

  export type DentistUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    experienceYears?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutDentistNestedInput
    businessHours?: BusinessHoursUncheckedUpdateManyWithoutDentistNestedInput
  }

  export type DentistCreateManyInput = {
    id?: number
    name: string
    role: string
    specialty: string
    description: string
    experienceYears: number
    imageUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DentistUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    experienceYears?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DentistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    experienceYears?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreatmentCreateInput = {
    name: string
    slug: string
    shortDescription: string
    description: string
    benefits: JsonNullValueInput | InputJsonValue
    durationMinutes: number
    price: number
    imageUrl: string
    isFeatured?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    shortDescription: string
    description: string
    benefits: JsonNullValueInput | InputJsonValue
    durationMinutes: number
    price: number
    imageUrl: string
    isFeatured?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    benefits?: JsonNullValueInput | InputJsonValue
    durationMinutes?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    benefits?: JsonNullValueInput | InputJsonValue
    durationMinutes?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentCreateManyInput = {
    id?: number
    name: string
    slug: string
    shortDescription: string
    description: string
    benefits: JsonNullValueInput | InputJsonValue
    durationMinutes: number
    price: number
    imageUrl: string
    isFeatured?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TreatmentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    benefits?: JsonNullValueInput | InputJsonValue
    durationMinutes?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreatmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    benefits?: JsonNullValueInput | InputJsonValue
    durationMinutes?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessHoursCreateInput = {
    dayOfWeek: number
    openTime: string
    closeTime: string
    dentist: DentistCreateNestedOneWithoutBusinessHoursInput
  }

  export type BusinessHoursUncheckedCreateInput = {
    id?: number
    dentistId: number
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type BusinessHoursUpdateInput = {
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    dentist?: DentistUpdateOneRequiredWithoutBusinessHoursNestedInput
  }

  export type BusinessHoursUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dentistId?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessHoursCreateManyInput = {
    id?: number
    dentistId: number
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type BusinessHoursUpdateManyMutationInput = {
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessHoursUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dentistId?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type AppointmentCreateInput = {
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    dentist: DentistCreateNestedOneWithoutAppointmentsInput
    treatment: TreatmentCreateNestedOneWithoutAppointmentsInput
    clinica: ClinicaCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: number
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    dentistId: number
    treatmentId: number
    clinicaId: string
    createdAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dentist?: DentistUpdateOneRequiredWithoutAppointmentsNestedInput
    treatment?: TreatmentUpdateOneRequiredWithoutAppointmentsNestedInput
    clinica?: ClinicaUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    dentistId?: IntFieldUpdateOperationsInput | number
    treatmentId?: IntFieldUpdateOperationsInput | number
    clinicaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: number
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    dentistId: number
    treatmentId: number
    clinicaId: string
    createdAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    dentistId?: IntFieldUpdateOperationsInput | number
    treatmentId?: IntFieldUpdateOperationsInput | number
    clinicaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicaCreateInput = {
    id?: string
    nombre: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutClinicaInput
    admins?: AdminUserCreateNestedManyWithoutClinicaInput
  }

  export type ClinicaUncheckedCreateInput = {
    id?: string
    nombre: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClinicaInput
    admins?: AdminUserUncheckedCreateNestedManyWithoutClinicaInput
  }

  export type ClinicaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutClinicaNestedInput
    admins?: AdminUserUpdateManyWithoutClinicaNestedInput
  }

  export type ClinicaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClinicaNestedInput
    admins?: AdminUserUncheckedUpdateManyWithoutClinicaNestedInput
  }

  export type ClinicaCreateManyInput = {
    id?: string
    nombre: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateInput = {
    email: string
    password: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clinica: ClinicaCreateNestedOneWithoutAdminsInput
  }

  export type AdminUserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    nombre: string
    clinicaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinica?: ClinicaUpdateOneRequiredWithoutAdminsNestedInput
  }

  export type AdminUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    clinicaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateManyInput = {
    id?: number
    email: string
    password: string
    nombre: string
    clinicaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    clinicaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type BusinessHoursListRelationFilter = {
    every?: BusinessHoursWhereInput
    some?: BusinessHoursWhereInput
    none?: BusinessHoursWhereInput
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BusinessHoursOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DentistCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    specialty?: SortOrder
    description?: SortOrder
    experienceYears?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DentistAvgOrderByAggregateInput = {
    id?: SortOrder
    experienceYears?: SortOrder
  }

  export type DentistMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    specialty?: SortOrder
    description?: SortOrder
    experienceYears?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DentistMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    specialty?: SortOrder
    description?: SortOrder
    experienceYears?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DentistSumOrderByAggregateInput = {
    id?: SortOrder
    experienceYears?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TreatmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    benefits?: SortOrder
    durationMinutes?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    isFeatured?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TreatmentAvgOrderByAggregateInput = {
    id?: SortOrder
    durationMinutes?: SortOrder
    price?: SortOrder
    sortOrder?: SortOrder
  }

  export type TreatmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    durationMinutes?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    isFeatured?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TreatmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    durationMinutes?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    isFeatured?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TreatmentSumOrderByAggregateInput = {
    id?: SortOrder
    durationMinutes?: SortOrder
    price?: SortOrder
    sortOrder?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DentistScalarRelationFilter = {
    is?: DentistWhereInput
    isNot?: DentistWhereInput
  }

  export type BusinessHoursDentistIdDayOfWeekCompoundUniqueInput = {
    dentistId: number
    dayOfWeek: number
  }

  export type BusinessHoursCountOrderByAggregateInput = {
    id?: SortOrder
    dentistId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
  }

  export type BusinessHoursAvgOrderByAggregateInput = {
    id?: SortOrder
    dentistId?: SortOrder
    dayOfWeek?: SortOrder
  }

  export type BusinessHoursMaxOrderByAggregateInput = {
    id?: SortOrder
    dentistId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
  }

  export type BusinessHoursMinOrderByAggregateInput = {
    id?: SortOrder
    dentistId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
  }

  export type BusinessHoursSumOrderByAggregateInput = {
    id?: SortOrder
    dentistId?: SortOrder
    dayOfWeek?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type TreatmentScalarRelationFilter = {
    is?: TreatmentWhereInput
    isNot?: TreatmentWhereInput
  }

  export type ClinicaScalarRelationFilter = {
    is?: ClinicaWhereInput
    isNot?: ClinicaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AppointmentDentistIdDateTimeClinicaIdCompoundUniqueInput = {
    dentistId: number
    date: string
    time: string
    clinicaId: string
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    patientName?: SortOrder
    patientLastName?: SortOrder
    patientEmail?: SortOrder
    patientPhone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    dentistId?: SortOrder
    treatmentId?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    id?: SortOrder
    dentistId?: SortOrder
    treatmentId?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    patientName?: SortOrder
    patientLastName?: SortOrder
    patientEmail?: SortOrder
    patientPhone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    dentistId?: SortOrder
    treatmentId?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    patientName?: SortOrder
    patientLastName?: SortOrder
    patientEmail?: SortOrder
    patientPhone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    dentistId?: SortOrder
    treatmentId?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    id?: SortOrder
    dentistId?: SortOrder
    treatmentId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type AdminUserListRelationFilter = {
    every?: AdminUserWhereInput
    some?: AdminUserWhereInput
    none?: AdminUserWhereInput
  }

  export type AdminUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClinicaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserClinicaIdEmailCompoundUniqueInput = {
    clinicaId: string
    email: string
  }

  export type AdminUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    clinicaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AppointmentCreateNestedManyWithoutDentistInput = {
    create?: XOR<AppointmentCreateWithoutDentistInput, AppointmentUncheckedCreateWithoutDentistInput> | AppointmentCreateWithoutDentistInput[] | AppointmentUncheckedCreateWithoutDentistInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDentistInput | AppointmentCreateOrConnectWithoutDentistInput[]
    createMany?: AppointmentCreateManyDentistInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type BusinessHoursCreateNestedManyWithoutDentistInput = {
    create?: XOR<BusinessHoursCreateWithoutDentistInput, BusinessHoursUncheckedCreateWithoutDentistInput> | BusinessHoursCreateWithoutDentistInput[] | BusinessHoursUncheckedCreateWithoutDentistInput[]
    connectOrCreate?: BusinessHoursCreateOrConnectWithoutDentistInput | BusinessHoursCreateOrConnectWithoutDentistInput[]
    createMany?: BusinessHoursCreateManyDentistInputEnvelope
    connect?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutDentistInput = {
    create?: XOR<AppointmentCreateWithoutDentistInput, AppointmentUncheckedCreateWithoutDentistInput> | AppointmentCreateWithoutDentistInput[] | AppointmentUncheckedCreateWithoutDentistInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDentistInput | AppointmentCreateOrConnectWithoutDentistInput[]
    createMany?: AppointmentCreateManyDentistInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type BusinessHoursUncheckedCreateNestedManyWithoutDentistInput = {
    create?: XOR<BusinessHoursCreateWithoutDentistInput, BusinessHoursUncheckedCreateWithoutDentistInput> | BusinessHoursCreateWithoutDentistInput[] | BusinessHoursUncheckedCreateWithoutDentistInput[]
    connectOrCreate?: BusinessHoursCreateOrConnectWithoutDentistInput | BusinessHoursCreateOrConnectWithoutDentistInput[]
    createMany?: BusinessHoursCreateManyDentistInputEnvelope
    connect?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AppointmentUpdateManyWithoutDentistNestedInput = {
    create?: XOR<AppointmentCreateWithoutDentistInput, AppointmentUncheckedCreateWithoutDentistInput> | AppointmentCreateWithoutDentistInput[] | AppointmentUncheckedCreateWithoutDentistInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDentistInput | AppointmentCreateOrConnectWithoutDentistInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDentistInput | AppointmentUpsertWithWhereUniqueWithoutDentistInput[]
    createMany?: AppointmentCreateManyDentistInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDentistInput | AppointmentUpdateWithWhereUniqueWithoutDentistInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDentistInput | AppointmentUpdateManyWithWhereWithoutDentistInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type BusinessHoursUpdateManyWithoutDentistNestedInput = {
    create?: XOR<BusinessHoursCreateWithoutDentistInput, BusinessHoursUncheckedCreateWithoutDentistInput> | BusinessHoursCreateWithoutDentistInput[] | BusinessHoursUncheckedCreateWithoutDentistInput[]
    connectOrCreate?: BusinessHoursCreateOrConnectWithoutDentistInput | BusinessHoursCreateOrConnectWithoutDentistInput[]
    upsert?: BusinessHoursUpsertWithWhereUniqueWithoutDentistInput | BusinessHoursUpsertWithWhereUniqueWithoutDentistInput[]
    createMany?: BusinessHoursCreateManyDentistInputEnvelope
    set?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
    disconnect?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
    delete?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
    connect?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
    update?: BusinessHoursUpdateWithWhereUniqueWithoutDentistInput | BusinessHoursUpdateWithWhereUniqueWithoutDentistInput[]
    updateMany?: BusinessHoursUpdateManyWithWhereWithoutDentistInput | BusinessHoursUpdateManyWithWhereWithoutDentistInput[]
    deleteMany?: BusinessHoursScalarWhereInput | BusinessHoursScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutDentistNestedInput = {
    create?: XOR<AppointmentCreateWithoutDentistInput, AppointmentUncheckedCreateWithoutDentistInput> | AppointmentCreateWithoutDentistInput[] | AppointmentUncheckedCreateWithoutDentistInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDentistInput | AppointmentCreateOrConnectWithoutDentistInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDentistInput | AppointmentUpsertWithWhereUniqueWithoutDentistInput[]
    createMany?: AppointmentCreateManyDentistInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDentistInput | AppointmentUpdateWithWhereUniqueWithoutDentistInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDentistInput | AppointmentUpdateManyWithWhereWithoutDentistInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type BusinessHoursUncheckedUpdateManyWithoutDentistNestedInput = {
    create?: XOR<BusinessHoursCreateWithoutDentistInput, BusinessHoursUncheckedCreateWithoutDentistInput> | BusinessHoursCreateWithoutDentistInput[] | BusinessHoursUncheckedCreateWithoutDentistInput[]
    connectOrCreate?: BusinessHoursCreateOrConnectWithoutDentistInput | BusinessHoursCreateOrConnectWithoutDentistInput[]
    upsert?: BusinessHoursUpsertWithWhereUniqueWithoutDentistInput | BusinessHoursUpsertWithWhereUniqueWithoutDentistInput[]
    createMany?: BusinessHoursCreateManyDentistInputEnvelope
    set?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
    disconnect?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
    delete?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
    connect?: BusinessHoursWhereUniqueInput | BusinessHoursWhereUniqueInput[]
    update?: BusinessHoursUpdateWithWhereUniqueWithoutDentistInput | BusinessHoursUpdateWithWhereUniqueWithoutDentistInput[]
    updateMany?: BusinessHoursUpdateManyWithWhereWithoutDentistInput | BusinessHoursUpdateManyWithWhereWithoutDentistInput[]
    deleteMany?: BusinessHoursScalarWhereInput | BusinessHoursScalarWhereInput[]
  }

  export type AppointmentCreateNestedManyWithoutTreatmentInput = {
    create?: XOR<AppointmentCreateWithoutTreatmentInput, AppointmentUncheckedCreateWithoutTreatmentInput> | AppointmentCreateWithoutTreatmentInput[] | AppointmentUncheckedCreateWithoutTreatmentInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTreatmentInput | AppointmentCreateOrConnectWithoutTreatmentInput[]
    createMany?: AppointmentCreateManyTreatmentInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutTreatmentInput = {
    create?: XOR<AppointmentCreateWithoutTreatmentInput, AppointmentUncheckedCreateWithoutTreatmentInput> | AppointmentCreateWithoutTreatmentInput[] | AppointmentUncheckedCreateWithoutTreatmentInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTreatmentInput | AppointmentCreateOrConnectWithoutTreatmentInput[]
    createMany?: AppointmentCreateManyTreatmentInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AppointmentUpdateManyWithoutTreatmentNestedInput = {
    create?: XOR<AppointmentCreateWithoutTreatmentInput, AppointmentUncheckedCreateWithoutTreatmentInput> | AppointmentCreateWithoutTreatmentInput[] | AppointmentUncheckedCreateWithoutTreatmentInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTreatmentInput | AppointmentCreateOrConnectWithoutTreatmentInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutTreatmentInput | AppointmentUpsertWithWhereUniqueWithoutTreatmentInput[]
    createMany?: AppointmentCreateManyTreatmentInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutTreatmentInput | AppointmentUpdateWithWhereUniqueWithoutTreatmentInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutTreatmentInput | AppointmentUpdateManyWithWhereWithoutTreatmentInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutTreatmentNestedInput = {
    create?: XOR<AppointmentCreateWithoutTreatmentInput, AppointmentUncheckedCreateWithoutTreatmentInput> | AppointmentCreateWithoutTreatmentInput[] | AppointmentUncheckedCreateWithoutTreatmentInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTreatmentInput | AppointmentCreateOrConnectWithoutTreatmentInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutTreatmentInput | AppointmentUpsertWithWhereUniqueWithoutTreatmentInput[]
    createMany?: AppointmentCreateManyTreatmentInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutTreatmentInput | AppointmentUpdateWithWhereUniqueWithoutTreatmentInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutTreatmentInput | AppointmentUpdateManyWithWhereWithoutTreatmentInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type DentistCreateNestedOneWithoutBusinessHoursInput = {
    create?: XOR<DentistCreateWithoutBusinessHoursInput, DentistUncheckedCreateWithoutBusinessHoursInput>
    connectOrCreate?: DentistCreateOrConnectWithoutBusinessHoursInput
    connect?: DentistWhereUniqueInput
  }

  export type DentistUpdateOneRequiredWithoutBusinessHoursNestedInput = {
    create?: XOR<DentistCreateWithoutBusinessHoursInput, DentistUncheckedCreateWithoutBusinessHoursInput>
    connectOrCreate?: DentistCreateOrConnectWithoutBusinessHoursInput
    upsert?: DentistUpsertWithoutBusinessHoursInput
    connect?: DentistWhereUniqueInput
    update?: XOR<XOR<DentistUpdateToOneWithWhereWithoutBusinessHoursInput, DentistUpdateWithoutBusinessHoursInput>, DentistUncheckedUpdateWithoutBusinessHoursInput>
  }

  export type DentistCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<DentistCreateWithoutAppointmentsInput, DentistUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: DentistCreateOrConnectWithoutAppointmentsInput
    connect?: DentistWhereUniqueInput
  }

  export type TreatmentCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<TreatmentCreateWithoutAppointmentsInput, TreatmentUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: TreatmentCreateOrConnectWithoutAppointmentsInput
    connect?: TreatmentWhereUniqueInput
  }

  export type ClinicaCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ClinicaCreateWithoutAppointmentsInput, ClinicaUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClinicaCreateOrConnectWithoutAppointmentsInput
    connect?: ClinicaWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type DentistUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<DentistCreateWithoutAppointmentsInput, DentistUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: DentistCreateOrConnectWithoutAppointmentsInput
    upsert?: DentistUpsertWithoutAppointmentsInput
    connect?: DentistWhereUniqueInput
    update?: XOR<XOR<DentistUpdateToOneWithWhereWithoutAppointmentsInput, DentistUpdateWithoutAppointmentsInput>, DentistUncheckedUpdateWithoutAppointmentsInput>
  }

  export type TreatmentUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<TreatmentCreateWithoutAppointmentsInput, TreatmentUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: TreatmentCreateOrConnectWithoutAppointmentsInput
    upsert?: TreatmentUpsertWithoutAppointmentsInput
    connect?: TreatmentWhereUniqueInput
    update?: XOR<XOR<TreatmentUpdateToOneWithWhereWithoutAppointmentsInput, TreatmentUpdateWithoutAppointmentsInput>, TreatmentUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClinicaUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<ClinicaCreateWithoutAppointmentsInput, ClinicaUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClinicaCreateOrConnectWithoutAppointmentsInput
    upsert?: ClinicaUpsertWithoutAppointmentsInput
    connect?: ClinicaWhereUniqueInput
    update?: XOR<XOR<ClinicaUpdateToOneWithWhereWithoutAppointmentsInput, ClinicaUpdateWithoutAppointmentsInput>, ClinicaUncheckedUpdateWithoutAppointmentsInput>
  }

  export type AppointmentCreateNestedManyWithoutClinicaInput = {
    create?: XOR<AppointmentCreateWithoutClinicaInput, AppointmentUncheckedCreateWithoutClinicaInput> | AppointmentCreateWithoutClinicaInput[] | AppointmentUncheckedCreateWithoutClinicaInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicaInput | AppointmentCreateOrConnectWithoutClinicaInput[]
    createMany?: AppointmentCreateManyClinicaInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AdminUserCreateNestedManyWithoutClinicaInput = {
    create?: XOR<AdminUserCreateWithoutClinicaInput, AdminUserUncheckedCreateWithoutClinicaInput> | AdminUserCreateWithoutClinicaInput[] | AdminUserUncheckedCreateWithoutClinicaInput[]
    connectOrCreate?: AdminUserCreateOrConnectWithoutClinicaInput | AdminUserCreateOrConnectWithoutClinicaInput[]
    createMany?: AdminUserCreateManyClinicaInputEnvelope
    connect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutClinicaInput = {
    create?: XOR<AppointmentCreateWithoutClinicaInput, AppointmentUncheckedCreateWithoutClinicaInput> | AppointmentCreateWithoutClinicaInput[] | AppointmentUncheckedCreateWithoutClinicaInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicaInput | AppointmentCreateOrConnectWithoutClinicaInput[]
    createMany?: AppointmentCreateManyClinicaInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AdminUserUncheckedCreateNestedManyWithoutClinicaInput = {
    create?: XOR<AdminUserCreateWithoutClinicaInput, AdminUserUncheckedCreateWithoutClinicaInput> | AdminUserCreateWithoutClinicaInput[] | AdminUserUncheckedCreateWithoutClinicaInput[]
    connectOrCreate?: AdminUserCreateOrConnectWithoutClinicaInput | AdminUserCreateOrConnectWithoutClinicaInput[]
    createMany?: AdminUserCreateManyClinicaInputEnvelope
    connect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
  }

  export type AppointmentUpdateManyWithoutClinicaNestedInput = {
    create?: XOR<AppointmentCreateWithoutClinicaInput, AppointmentUncheckedCreateWithoutClinicaInput> | AppointmentCreateWithoutClinicaInput[] | AppointmentUncheckedCreateWithoutClinicaInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicaInput | AppointmentCreateOrConnectWithoutClinicaInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClinicaInput | AppointmentUpsertWithWhereUniqueWithoutClinicaInput[]
    createMany?: AppointmentCreateManyClinicaInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClinicaInput | AppointmentUpdateWithWhereUniqueWithoutClinicaInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClinicaInput | AppointmentUpdateManyWithWhereWithoutClinicaInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AdminUserUpdateManyWithoutClinicaNestedInput = {
    create?: XOR<AdminUserCreateWithoutClinicaInput, AdminUserUncheckedCreateWithoutClinicaInput> | AdminUserCreateWithoutClinicaInput[] | AdminUserUncheckedCreateWithoutClinicaInput[]
    connectOrCreate?: AdminUserCreateOrConnectWithoutClinicaInput | AdminUserCreateOrConnectWithoutClinicaInput[]
    upsert?: AdminUserUpsertWithWhereUniqueWithoutClinicaInput | AdminUserUpsertWithWhereUniqueWithoutClinicaInput[]
    createMany?: AdminUserCreateManyClinicaInputEnvelope
    set?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    disconnect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    delete?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    connect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    update?: AdminUserUpdateWithWhereUniqueWithoutClinicaInput | AdminUserUpdateWithWhereUniqueWithoutClinicaInput[]
    updateMany?: AdminUserUpdateManyWithWhereWithoutClinicaInput | AdminUserUpdateManyWithWhereWithoutClinicaInput[]
    deleteMany?: AdminUserScalarWhereInput | AdminUserScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutClinicaNestedInput = {
    create?: XOR<AppointmentCreateWithoutClinicaInput, AppointmentUncheckedCreateWithoutClinicaInput> | AppointmentCreateWithoutClinicaInput[] | AppointmentUncheckedCreateWithoutClinicaInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicaInput | AppointmentCreateOrConnectWithoutClinicaInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClinicaInput | AppointmentUpsertWithWhereUniqueWithoutClinicaInput[]
    createMany?: AppointmentCreateManyClinicaInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClinicaInput | AppointmentUpdateWithWhereUniqueWithoutClinicaInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClinicaInput | AppointmentUpdateManyWithWhereWithoutClinicaInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AdminUserUncheckedUpdateManyWithoutClinicaNestedInput = {
    create?: XOR<AdminUserCreateWithoutClinicaInput, AdminUserUncheckedCreateWithoutClinicaInput> | AdminUserCreateWithoutClinicaInput[] | AdminUserUncheckedCreateWithoutClinicaInput[]
    connectOrCreate?: AdminUserCreateOrConnectWithoutClinicaInput | AdminUserCreateOrConnectWithoutClinicaInput[]
    upsert?: AdminUserUpsertWithWhereUniqueWithoutClinicaInput | AdminUserUpsertWithWhereUniqueWithoutClinicaInput[]
    createMany?: AdminUserCreateManyClinicaInputEnvelope
    set?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    disconnect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    delete?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    connect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    update?: AdminUserUpdateWithWhereUniqueWithoutClinicaInput | AdminUserUpdateWithWhereUniqueWithoutClinicaInput[]
    updateMany?: AdminUserUpdateManyWithWhereWithoutClinicaInput | AdminUserUpdateManyWithWhereWithoutClinicaInput[]
    deleteMany?: AdminUserScalarWhereInput | AdminUserScalarWhereInput[]
  }

  export type ClinicaCreateNestedOneWithoutAdminsInput = {
    create?: XOR<ClinicaCreateWithoutAdminsInput, ClinicaUncheckedCreateWithoutAdminsInput>
    connectOrCreate?: ClinicaCreateOrConnectWithoutAdminsInput
    connect?: ClinicaWhereUniqueInput
  }

  export type ClinicaUpdateOneRequiredWithoutAdminsNestedInput = {
    create?: XOR<ClinicaCreateWithoutAdminsInput, ClinicaUncheckedCreateWithoutAdminsInput>
    connectOrCreate?: ClinicaCreateOrConnectWithoutAdminsInput
    upsert?: ClinicaUpsertWithoutAdminsInput
    connect?: ClinicaWhereUniqueInput
    update?: XOR<XOR<ClinicaUpdateToOneWithWhereWithoutAdminsInput, ClinicaUpdateWithoutAdminsInput>, ClinicaUncheckedUpdateWithoutAdminsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type AppointmentCreateWithoutDentistInput = {
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    treatment: TreatmentCreateNestedOneWithoutAppointmentsInput
    clinica: ClinicaCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutDentistInput = {
    id?: number
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    treatmentId: number
    clinicaId: string
    createdAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutDentistInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutDentistInput, AppointmentUncheckedCreateWithoutDentistInput>
  }

  export type AppointmentCreateManyDentistInputEnvelope = {
    data: AppointmentCreateManyDentistInput | AppointmentCreateManyDentistInput[]
    skipDuplicates?: boolean
  }

  export type BusinessHoursCreateWithoutDentistInput = {
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type BusinessHoursUncheckedCreateWithoutDentistInput = {
    id?: number
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type BusinessHoursCreateOrConnectWithoutDentistInput = {
    where: BusinessHoursWhereUniqueInput
    create: XOR<BusinessHoursCreateWithoutDentistInput, BusinessHoursUncheckedCreateWithoutDentistInput>
  }

  export type BusinessHoursCreateManyDentistInputEnvelope = {
    data: BusinessHoursCreateManyDentistInput | BusinessHoursCreateManyDentistInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentUpsertWithWhereUniqueWithoutDentistInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutDentistInput, AppointmentUncheckedUpdateWithoutDentistInput>
    create: XOR<AppointmentCreateWithoutDentistInput, AppointmentUncheckedCreateWithoutDentistInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutDentistInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutDentistInput, AppointmentUncheckedUpdateWithoutDentistInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutDentistInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutDentistInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: IntFilter<"Appointment"> | number
    patientName?: StringFilter<"Appointment"> | string
    patientLastName?: StringFilter<"Appointment"> | string
    patientEmail?: StringFilter<"Appointment"> | string
    patientPhone?: StringFilter<"Appointment"> | string
    date?: StringFilter<"Appointment"> | string
    time?: StringFilter<"Appointment"> | string
    comment?: StringNullableFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    dentistId?: IntFilter<"Appointment"> | number
    treatmentId?: IntFilter<"Appointment"> | number
    clinicaId?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type BusinessHoursUpsertWithWhereUniqueWithoutDentistInput = {
    where: BusinessHoursWhereUniqueInput
    update: XOR<BusinessHoursUpdateWithoutDentistInput, BusinessHoursUncheckedUpdateWithoutDentistInput>
    create: XOR<BusinessHoursCreateWithoutDentistInput, BusinessHoursUncheckedCreateWithoutDentistInput>
  }

  export type BusinessHoursUpdateWithWhereUniqueWithoutDentistInput = {
    where: BusinessHoursWhereUniqueInput
    data: XOR<BusinessHoursUpdateWithoutDentistInput, BusinessHoursUncheckedUpdateWithoutDentistInput>
  }

  export type BusinessHoursUpdateManyWithWhereWithoutDentistInput = {
    where: BusinessHoursScalarWhereInput
    data: XOR<BusinessHoursUpdateManyMutationInput, BusinessHoursUncheckedUpdateManyWithoutDentistInput>
  }

  export type BusinessHoursScalarWhereInput = {
    AND?: BusinessHoursScalarWhereInput | BusinessHoursScalarWhereInput[]
    OR?: BusinessHoursScalarWhereInput[]
    NOT?: BusinessHoursScalarWhereInput | BusinessHoursScalarWhereInput[]
    id?: IntFilter<"BusinessHours"> | number
    dentistId?: IntFilter<"BusinessHours"> | number
    dayOfWeek?: IntFilter<"BusinessHours"> | number
    openTime?: StringFilter<"BusinessHours"> | string
    closeTime?: StringFilter<"BusinessHours"> | string
  }

  export type AppointmentCreateWithoutTreatmentInput = {
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    dentist: DentistCreateNestedOneWithoutAppointmentsInput
    clinica: ClinicaCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutTreatmentInput = {
    id?: number
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    dentistId: number
    clinicaId: string
    createdAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutTreatmentInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutTreatmentInput, AppointmentUncheckedCreateWithoutTreatmentInput>
  }

  export type AppointmentCreateManyTreatmentInputEnvelope = {
    data: AppointmentCreateManyTreatmentInput | AppointmentCreateManyTreatmentInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentUpsertWithWhereUniqueWithoutTreatmentInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutTreatmentInput, AppointmentUncheckedUpdateWithoutTreatmentInput>
    create: XOR<AppointmentCreateWithoutTreatmentInput, AppointmentUncheckedCreateWithoutTreatmentInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutTreatmentInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutTreatmentInput, AppointmentUncheckedUpdateWithoutTreatmentInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutTreatmentInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutTreatmentInput>
  }

  export type DentistCreateWithoutBusinessHoursInput = {
    name: string
    role: string
    specialty: string
    description: string
    experienceYears: number
    imageUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutDentistInput
  }

  export type DentistUncheckedCreateWithoutBusinessHoursInput = {
    id?: number
    name: string
    role: string
    specialty: string
    description: string
    experienceYears: number
    imageUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDentistInput
  }

  export type DentistCreateOrConnectWithoutBusinessHoursInput = {
    where: DentistWhereUniqueInput
    create: XOR<DentistCreateWithoutBusinessHoursInput, DentistUncheckedCreateWithoutBusinessHoursInput>
  }

  export type DentistUpsertWithoutBusinessHoursInput = {
    update: XOR<DentistUpdateWithoutBusinessHoursInput, DentistUncheckedUpdateWithoutBusinessHoursInput>
    create: XOR<DentistCreateWithoutBusinessHoursInput, DentistUncheckedCreateWithoutBusinessHoursInput>
    where?: DentistWhereInput
  }

  export type DentistUpdateToOneWithWhereWithoutBusinessHoursInput = {
    where?: DentistWhereInput
    data: XOR<DentistUpdateWithoutBusinessHoursInput, DentistUncheckedUpdateWithoutBusinessHoursInput>
  }

  export type DentistUpdateWithoutBusinessHoursInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    experienceYears?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutDentistNestedInput
  }

  export type DentistUncheckedUpdateWithoutBusinessHoursInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    experienceYears?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutDentistNestedInput
  }

  export type DentistCreateWithoutAppointmentsInput = {
    name: string
    role: string
    specialty: string
    description: string
    experienceYears: number
    imageUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    businessHours?: BusinessHoursCreateNestedManyWithoutDentistInput
  }

  export type DentistUncheckedCreateWithoutAppointmentsInput = {
    id?: number
    name: string
    role: string
    specialty: string
    description: string
    experienceYears: number
    imageUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    businessHours?: BusinessHoursUncheckedCreateNestedManyWithoutDentistInput
  }

  export type DentistCreateOrConnectWithoutAppointmentsInput = {
    where: DentistWhereUniqueInput
    create: XOR<DentistCreateWithoutAppointmentsInput, DentistUncheckedCreateWithoutAppointmentsInput>
  }

  export type TreatmentCreateWithoutAppointmentsInput = {
    name: string
    slug: string
    shortDescription: string
    description: string
    benefits: JsonNullValueInput | InputJsonValue
    durationMinutes: number
    price: number
    imageUrl: string
    isFeatured?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TreatmentUncheckedCreateWithoutAppointmentsInput = {
    id?: number
    name: string
    slug: string
    shortDescription: string
    description: string
    benefits: JsonNullValueInput | InputJsonValue
    durationMinutes: number
    price: number
    imageUrl: string
    isFeatured?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TreatmentCreateOrConnectWithoutAppointmentsInput = {
    where: TreatmentWhereUniqueInput
    create: XOR<TreatmentCreateWithoutAppointmentsInput, TreatmentUncheckedCreateWithoutAppointmentsInput>
  }

  export type ClinicaCreateWithoutAppointmentsInput = {
    id?: string
    nombre: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    admins?: AdminUserCreateNestedManyWithoutClinicaInput
  }

  export type ClinicaUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    nombre: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    admins?: AdminUserUncheckedCreateNestedManyWithoutClinicaInput
  }

  export type ClinicaCreateOrConnectWithoutAppointmentsInput = {
    where: ClinicaWhereUniqueInput
    create: XOR<ClinicaCreateWithoutAppointmentsInput, ClinicaUncheckedCreateWithoutAppointmentsInput>
  }

  export type DentistUpsertWithoutAppointmentsInput = {
    update: XOR<DentistUpdateWithoutAppointmentsInput, DentistUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<DentistCreateWithoutAppointmentsInput, DentistUncheckedCreateWithoutAppointmentsInput>
    where?: DentistWhereInput
  }

  export type DentistUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: DentistWhereInput
    data: XOR<DentistUpdateWithoutAppointmentsInput, DentistUncheckedUpdateWithoutAppointmentsInput>
  }

  export type DentistUpdateWithoutAppointmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    experienceYears?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessHours?: BusinessHoursUpdateManyWithoutDentistNestedInput
  }

  export type DentistUncheckedUpdateWithoutAppointmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    experienceYears?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessHours?: BusinessHoursUncheckedUpdateManyWithoutDentistNestedInput
  }

  export type TreatmentUpsertWithoutAppointmentsInput = {
    update: XOR<TreatmentUpdateWithoutAppointmentsInput, TreatmentUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<TreatmentCreateWithoutAppointmentsInput, TreatmentUncheckedCreateWithoutAppointmentsInput>
    where?: TreatmentWhereInput
  }

  export type TreatmentUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: TreatmentWhereInput
    data: XOR<TreatmentUpdateWithoutAppointmentsInput, TreatmentUncheckedUpdateWithoutAppointmentsInput>
  }

  export type TreatmentUpdateWithoutAppointmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    benefits?: JsonNullValueInput | InputJsonValue
    durationMinutes?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreatmentUncheckedUpdateWithoutAppointmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    benefits?: JsonNullValueInput | InputJsonValue
    durationMinutes?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicaUpsertWithoutAppointmentsInput = {
    update: XOR<ClinicaUpdateWithoutAppointmentsInput, ClinicaUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ClinicaCreateWithoutAppointmentsInput, ClinicaUncheckedCreateWithoutAppointmentsInput>
    where?: ClinicaWhereInput
  }

  export type ClinicaUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ClinicaWhereInput
    data: XOR<ClinicaUpdateWithoutAppointmentsInput, ClinicaUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClinicaUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admins?: AdminUserUpdateManyWithoutClinicaNestedInput
  }

  export type ClinicaUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admins?: AdminUserUncheckedUpdateManyWithoutClinicaNestedInput
  }

  export type AppointmentCreateWithoutClinicaInput = {
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    dentist: DentistCreateNestedOneWithoutAppointmentsInput
    treatment: TreatmentCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutClinicaInput = {
    id?: number
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    dentistId: number
    treatmentId: number
    createdAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutClinicaInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutClinicaInput, AppointmentUncheckedCreateWithoutClinicaInput>
  }

  export type AppointmentCreateManyClinicaInputEnvelope = {
    data: AppointmentCreateManyClinicaInput | AppointmentCreateManyClinicaInput[]
    skipDuplicates?: boolean
  }

  export type AdminUserCreateWithoutClinicaInput = {
    email: string
    password: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUncheckedCreateWithoutClinicaInput = {
    id?: number
    email: string
    password: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserCreateOrConnectWithoutClinicaInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutClinicaInput, AdminUserUncheckedCreateWithoutClinicaInput>
  }

  export type AdminUserCreateManyClinicaInputEnvelope = {
    data: AdminUserCreateManyClinicaInput | AdminUserCreateManyClinicaInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentUpsertWithWhereUniqueWithoutClinicaInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutClinicaInput, AppointmentUncheckedUpdateWithoutClinicaInput>
    create: XOR<AppointmentCreateWithoutClinicaInput, AppointmentUncheckedCreateWithoutClinicaInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutClinicaInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutClinicaInput, AppointmentUncheckedUpdateWithoutClinicaInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutClinicaInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutClinicaInput>
  }

  export type AdminUserUpsertWithWhereUniqueWithoutClinicaInput = {
    where: AdminUserWhereUniqueInput
    update: XOR<AdminUserUpdateWithoutClinicaInput, AdminUserUncheckedUpdateWithoutClinicaInput>
    create: XOR<AdminUserCreateWithoutClinicaInput, AdminUserUncheckedCreateWithoutClinicaInput>
  }

  export type AdminUserUpdateWithWhereUniqueWithoutClinicaInput = {
    where: AdminUserWhereUniqueInput
    data: XOR<AdminUserUpdateWithoutClinicaInput, AdminUserUncheckedUpdateWithoutClinicaInput>
  }

  export type AdminUserUpdateManyWithWhereWithoutClinicaInput = {
    where: AdminUserScalarWhereInput
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyWithoutClinicaInput>
  }

  export type AdminUserScalarWhereInput = {
    AND?: AdminUserScalarWhereInput | AdminUserScalarWhereInput[]
    OR?: AdminUserScalarWhereInput[]
    NOT?: AdminUserScalarWhereInput | AdminUserScalarWhereInput[]
    id?: IntFilter<"AdminUser"> | number
    email?: StringFilter<"AdminUser"> | string
    password?: StringFilter<"AdminUser"> | string
    nombre?: StringFilter<"AdminUser"> | string
    clinicaId?: StringFilter<"AdminUser"> | string
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
  }

  export type ClinicaCreateWithoutAdminsInput = {
    id?: string
    nombre: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutClinicaInput
  }

  export type ClinicaUncheckedCreateWithoutAdminsInput = {
    id?: string
    nombre: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClinicaInput
  }

  export type ClinicaCreateOrConnectWithoutAdminsInput = {
    where: ClinicaWhereUniqueInput
    create: XOR<ClinicaCreateWithoutAdminsInput, ClinicaUncheckedCreateWithoutAdminsInput>
  }

  export type ClinicaUpsertWithoutAdminsInput = {
    update: XOR<ClinicaUpdateWithoutAdminsInput, ClinicaUncheckedUpdateWithoutAdminsInput>
    create: XOR<ClinicaCreateWithoutAdminsInput, ClinicaUncheckedCreateWithoutAdminsInput>
    where?: ClinicaWhereInput
  }

  export type ClinicaUpdateToOneWithWhereWithoutAdminsInput = {
    where?: ClinicaWhereInput
    data: XOR<ClinicaUpdateWithoutAdminsInput, ClinicaUncheckedUpdateWithoutAdminsInput>
  }

  export type ClinicaUpdateWithoutAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutClinicaNestedInput
  }

  export type ClinicaUncheckedUpdateWithoutAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClinicaNestedInput
  }

  export type AppointmentCreateManyDentistInput = {
    id?: number
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    treatmentId: number
    clinicaId: string
    createdAt?: Date | string
  }

  export type BusinessHoursCreateManyDentistInput = {
    id?: number
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type AppointmentUpdateWithoutDentistInput = {
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    treatment?: TreatmentUpdateOneRequiredWithoutAppointmentsNestedInput
    clinica?: ClinicaUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutDentistInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    treatmentId?: IntFieldUpdateOperationsInput | number
    clinicaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutDentistInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    treatmentId?: IntFieldUpdateOperationsInput | number
    clinicaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessHoursUpdateWithoutDentistInput = {
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessHoursUncheckedUpdateWithoutDentistInput = {
    id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessHoursUncheckedUpdateManyWithoutDentistInput = {
    id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type AppointmentCreateManyTreatmentInput = {
    id?: number
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    dentistId: number
    clinicaId: string
    createdAt?: Date | string
  }

  export type AppointmentUpdateWithoutTreatmentInput = {
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dentist?: DentistUpdateOneRequiredWithoutAppointmentsNestedInput
    clinica?: ClinicaUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutTreatmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    dentistId?: IntFieldUpdateOperationsInput | number
    clinicaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutTreatmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    dentistId?: IntFieldUpdateOperationsInput | number
    clinicaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyClinicaInput = {
    id?: number
    patientName: string
    patientLastName: string
    patientEmail: string
    patientPhone: string
    date: string
    time: string
    comment?: string | null
    status?: $Enums.AppointmentStatus
    dentistId: number
    treatmentId: number
    createdAt?: Date | string
  }

  export type AdminUserCreateManyClinicaInput = {
    id?: number
    email: string
    password: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateWithoutClinicaInput = {
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dentist?: DentistUpdateOneRequiredWithoutAppointmentsNestedInput
    treatment?: TreatmentUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutClinicaInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    dentistId?: IntFieldUpdateOperationsInput | number
    treatmentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutClinicaInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    patientLastName?: StringFieldUpdateOperationsInput | string
    patientEmail?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    dentistId?: IntFieldUpdateOperationsInput | number
    treatmentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUpdateWithoutClinicaInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateWithoutClinicaInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyWithoutClinicaInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}