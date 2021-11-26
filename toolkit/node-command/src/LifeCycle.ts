export abstract class LifeCycle {
	// 所有子类必须实现的默认hook point
	abstract before(): void;
	abstract after(): void;
}
