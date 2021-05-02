/**
 * A thin wrapper around Fetch API, supports only get and post
 * Supports only json response as 'themoviedb' returns only JSON responses.
 */

type HttpClientOptions = Omit<RequestInit, 'method' | 'body'> & {
  body?: unknown;
};
type method = 'GET' | 'POST';

class HttpClient {
  get<T> (url: string, options?: HttpClientOptions): Promise<T> {
    return this.request(url, 'GET', options);
  }

  post<T> (url: string, options?: HttpClientOptions): Promise<T> {
    return this.request(url, 'POST', options);
  }

  private request (url: Request | string, method: method, options: any = {}) {
    options.method = method;

    if (options.body) {
      options.body = JSON.stringify(options.body);
      options.headers = options.headers || {};
      options.headers['Content-Type'] = 'application/json';
    }

    return fetch(url, options).then(async (d) => {
      const contentType = d.headers.get('content-type');

      if (!contentType?.includes('application/json')) {
        return Promise.reject({
          message: await d.text() || 'An unknown error occurred',
          status: d.status
        });
      }

      const response = await d.json();

      if (d.status >= 400) {
        return Promise.reject({ ...response, status: d.status });
      }

      return response;
    });
  }
}

export default new HttpClient();
