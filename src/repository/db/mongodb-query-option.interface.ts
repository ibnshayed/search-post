import mongodb from 'mongodb';
import {
  AggregateOptions,
  FilterQuery,
  InsertManyOptions,
  MongooseBulkWriteOptions,
  PaginateOptions,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';

export interface MongoDBQueryOptions<T> {
  filter: FilterQuery<T>;
  projection: ProjectionType<T> | null | undefined;
  options: QueryOptions<T> | null | undefined;
  saveOptions: SaveOptions;
  paginateOptions: PaginateOptions;
  insertManyOptions: InsertManyOptions;
  update: UpdateQuery<T> | UpdateWithAggregationPipeline;
  pipeline: PipelineStage[];
  aggregateOptions: AggregateOptions;
  bulkWiteOptions: mongodb.BulkWriteOptions & MongooseBulkWriteOptions;
}
