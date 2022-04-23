import { BuildHook } from './BuildHook';

export type THooks = {
  build: BuildHook;
};

export {
  BuildHook,
  BuildHookContext,
  // Compile Phase Start
  BuildCompileSubHook,
  BuildCompileSubHookContext,
  BuildCompileEmitSubHook,
  BuildCompileEmitSubHookContext,
  BuildCompileRunSubHook,
  BuildCompileRunSubHookContext,
  BuildCompileReStartSubHook,
  BuildCompileReStartSubHookContext
} from './BuildHook';
