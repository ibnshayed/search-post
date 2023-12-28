/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PaginateModel, PopulateOptions } from 'mongoose';
import { GenericRepository } from './generic-repository.abstract';
import { MongoDBQueryOptions } from './mongodb-query-option.interface';

export class MongoDBGenericRepository<T> implements GenericRepository<T> {
  private _repository: PaginateModel<T>;
  private readonly _populateOnFind:
    | PopulateOptions
    | PopulateOptions[]
    | string
    | string[]
    | undefined;

  constructor(
    repository: PaginateModel<T>,
    populateOnFind:
      | PopulateOptions
      | PopulateOptions[]
      | string
      | string[]
      | undefined = [],
  ) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }
  count(queryOptions?: Partial<MongoDBQueryOptions<T>>): Promise<any> {
    const { filter } = queryOptions;
    const query = this._repository.countDocuments(filter);
    return Promise.resolve(query);
  }

  findOne(queryOptions: Partial<MongoDBQueryOptions<T>> = {}): Promise<T> {
    const { filter, projection = null, options = {} } = queryOptions;
    options.populate = options.populate ?? this._populateOnFind;

    const query = this._repository.findOne(filter, projection, options);
    // @ts-ignore
    return Promise.resolve(query.lean());
  }

  findOneById(
    id: any,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T> {
    const { filter, projection, options = {} } = queryOptions;

    options.populate = options.populate ?? this._populateOnFind;

    const query = this._repository.findOne(
      { ...filter, _id: id },
      projection,
      options,
    );
    // @ts-ignore
    return Promise.resolve(query.lean());
  }
  findMany(queryOptions: Partial<MongoDBQueryOptions<T>> = {}): Promise<T[]> {
    const { filter, projection = null, options = {} } = queryOptions;
    options.strictQuery = options.strictQuery ?? true;
    options.populate = options.populate ?? this._populateOnFind;

    const query = this._repository.find(filter, projection, options);
    // @ts-ignore
    return Promise.resolve(query.lean());
  }
  distinct(
    field: string,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T[]> {
    // const field = '';
    const { filter = {} } = queryOptions;

    const query = this._repository.distinct(field, filter);
    // @ts-ignore
    return Promise.resolve(query.lean());
  }
  findManyWithPaginate(
    page: number,
    limit: number,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T[]> {
    const { filter, paginateOptions = {} } = queryOptions;

    paginateOptions.populate = paginateOptions.populate ?? this._populateOnFind;
    paginateOptions.lean = paginateOptions.lean ?? true;
    const query = this._repository.paginate(filter, {
      ...paginateOptions,
      page,
      limit,
    });
    // @ts-ignore
    return Promise.resolve(query);
  }
  async createOne(
    item: T,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T> {
    // const newItem = await this._repository.create(item);
    // return this.findOneById(newItem._id);
    const { options = {} } = queryOptions;
    const newItem = await new this._repository(item).save(options);
    return (await newItem.populate(this._populateOnFind)).toObject();
  }
  createMany(
    items: T[],
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T[]> {
    const query = this._repository.insertMany(items, {
      populate: this._populateOnFind,
      ...queryOptions.insertManyOptions,
    });
    // @ts-ignore
    return Promise.resolve(query);
  }
  updateOne(
    id: any,
    partialData: Partial<T>,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T> {
    const { filter, options = {}, update = null } = queryOptions;
    options.populate = options.populate ?? this._populateOnFind;
    options.new = options.new ?? true;

    const updateObject = update ? update : partialData;

    const query = this._repository.findOneAndUpdate(
      { ...filter, _id: id },
      updateObject,
      options,
    );
    // @ts-ignore

    return Promise.resolve(query.lean());
  }
  updateMany(
    partialData: T,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T[]> {
    const { filter, options = {}, update = null } = queryOptions;
    options.populate = options.populate ?? this._populateOnFind;
    options.new = options.new ?? true;

    const updateObject = update ? update : partialData;

    const query = this._repository.updateMany(filter, updateObject, options);
    // @ts-ignore
    return Promise.resolve(query);
  }
  bulkWrite(
    partialData: any,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T[]> {
    // options.populate = options.populate ?? this._populateOnFind;
    const { bulkWiteOptions = {} } = queryOptions;

    const query = this._repository.bulkWrite(partialData, bulkWiteOptions);
    // @ts-ignore
    return Promise.resolve(query);
  }
  deleteOne(
    id: any,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T> {
    const { filter, options = {} } = queryOptions;
    options.populate = options.populate ?? this._populateOnFind;

    const query = this._repository.findOneAndDelete(
      { ...filter, _id: id },
      options,
    );
    // @ts-ignore
    return Promise.resolve(query);
  }
  deleteMany(queryOptions: Partial<MongoDBQueryOptions<T>> = {}): Promise<T[]> {
    const { filter, options } = queryOptions;
    const query = this._repository.deleteMany(filter, options);
    // @ts-ignore
    return Promise.resolve(query);
  }
  aggregation(
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<any> {
    const { pipeline, aggregateOptions } = queryOptions;
    const query = this._repository.aggregate(pipeline, aggregateOptions);
    // @ts-ignore
    return Promise.resolve(query);
  }
}
