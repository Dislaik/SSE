import { LogType } from "./log-type";

export class Log {
  id: number;
  description: string;
  createdAt: Date;
  logType: LogType;

  constructor(description: string, createdAt: Date, logType: LogType) {
    this.description = description;
    this.createdAt = createdAt;
    this.logType = logType;
  }
}
