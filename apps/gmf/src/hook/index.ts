import { BuildHook } from './BuildHook';

export type THooks = {
  build: BuildHook;
};

export {
  BUILD_HOOK_NAME,
  BUILD_COMPILE_SUB_HOOK_NAME,
  BUILD_FINISHED_SUB_HOOK_NAME,
  BUILD_START_SUB_HOOK_NAME,
  BUILD_WATCH_RE_COMPILE_SUB_HOOK_NAME,
  BUILD_COMPILE_EMIT_HOOK_NAME,
  BUILD_COMPILE_RUN_HOOK_NAME,
  BuildHook,
  BuildHookContext,
  BuildCompileSubHook,
  BuildCompileSubHookContext,
  BuildFinishedSubHook,
  BuildFinishedSubHookContext,
  BuildStartSubHook,
  BuildStartSubHookContext,
  BuildReCompileSubHook,
  BuildReCompileSubHookContext,
  BuildCompileEmitSubHook,
  BuildCompileEmitSubHookContext,
  BuildCompileRunSubHook,
  BuildCompileRunSubHookContext
} from './BuildHook';
