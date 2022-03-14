import { QueryPlugin, useEffect, useState } from '..';

export class InputPlugin extends QueryPlugin {
	apply(): void {
		const value = useState('');
	}
}
