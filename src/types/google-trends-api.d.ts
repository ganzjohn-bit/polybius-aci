declare module 'google-trends-api' {
  interface InterestOverTimeOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    timezone?: number;
    category?: number;
  }

  function interestOverTime(options: InterestOverTimeOptions): Promise<string>;
  function interestByRegion(options: InterestOverTimeOptions): Promise<string>;
  function relatedQueries(options: InterestOverTimeOptions): Promise<string>;
  function relatedTopics(options: InterestOverTimeOptions): Promise<string>;

  export default {
    interestOverTime,
    interestByRegion,
    relatedQueries,
    relatedTopics
  };
}
