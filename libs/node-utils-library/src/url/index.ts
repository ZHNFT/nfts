import { createServer } from 'net';

export const DEFAULT_PORT = 8080;

/* 返回可用的端口号。默认 80 端口 */
export async function chosePort(port: number | string = DEFAULT_PORT): Promise<number> {
  port = Number(port);

  const portUse = (_port: number): Promise<number | Error> => {
    return new Promise<number | Error>((resolve, reject) => {
      const server = createServer()
        .listen(_port)
        .on('listening', () => {
          server.close(() => resolve(_port));
        })
        .on('error', (err: Error) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (err.code == 'EADDRINUSE') {
            resolve(err);
            return;
          }

          reject(err);
        });
    });
  };

  let res = await portUse(DEFAULT_PORT);

  while (typeof res !== 'number') {
    port++;
    res = await portUse(port);
  }

  return res;
}
