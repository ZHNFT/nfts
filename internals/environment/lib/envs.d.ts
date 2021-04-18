export declare type IObject<T> = {
    [key: string]: T;
};
export declare type PackageJSONSchema = {
    dependencies: IObject<string>;
    devDependencies: IObject<string>;
    peerDependencies: IObject<string>;
};
/**
 * @method shouldUseTypescript
 *
 * @return {boolean}
 * @public
 */
export declare function shouldUseTypescript(): boolean;
/**
 * @method shouldUseReact
 *
 * @return {boolean}
 * @public
 */
export declare function shouldUseReact(): boolean;
/**
 * @method isDevelopment
 *
 * @return {boolean}
 * @public
 */
export declare function isDevelopment(): boolean;
