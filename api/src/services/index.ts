export * from "./email-service";
// export * from "./file-service";
export * from "./knex-user-service";
export * from "./directory-service";

export interface QueryStatement {
  field: string;
  fields: [];
  operator: string;
  value: any;
}

export interface SortStatement {
  field: string;
  direction: SortDirection;
}

export enum SortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
}
