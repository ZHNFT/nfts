import { BuildHook } from './BuildHook';

export type THooks = {
  build: BuildHook;
};

export {
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
