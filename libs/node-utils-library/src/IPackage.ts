import { IPackageJson } from './IPackageJson';
import { SourceFile } from 'typescript';

/**
 * 包类型
 */
export enum PackageType {
  Private,
  Public
}

/**
 * 一个 package 的基本信息；
 */
export interface IPackage {
  version: string;
  packageType: PackageType;
  packageName: string;
  packagePath: string;
  packageJson: IPackageJson;
  sourceFiles: SourceFile[];
}
