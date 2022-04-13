import { BuildHook } from './BuildHook';

export type THooks = {
  build: BuildHook;
};

export {
  BuildHook,
  BuildHookContext,
  BUILD_COMPILE_SUB_HOOK_NAME,
  BUILD_FINISHED_SUB_HOOK_NAME,
  BUILD_HOOK_NAME,
  BUILD_START_SUB_HOOK_NAME,
  BUILD_WATCH_RE_COMPILE_SUB_HOOK_NAME,
  BuildCompileSubHook,
  BuildCompileSubHookContext,
  BuildFinishedSubHook,
  BuildFinishedSubHookContext,
  BuildStartSubHook,
  BuildStartSubHookContext,
  BuildReCompileSubHook,
  BuildReCompileSubHookContext
} from './BuildHook';
