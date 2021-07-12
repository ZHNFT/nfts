/**
 *  @description build phases
 * */

export enum BuildPhase {
  finished = "FINISHED",
}

export enum BuildEvent {
  log = "LOG",
}

export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL",
}
