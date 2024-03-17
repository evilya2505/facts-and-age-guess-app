import { TAge, TFact } from "./types";

class MainApi {
  private _factUrl: string;
  private _ageUrl: string;
  private _headers: Record<string, string>;
  constructor(options: {
    ageUrl: string;
    factUrl: string;
    headers: Record<string, string>;
  }) {
    this._factUrl = options.factUrl;
    this._ageUrl = options.ageUrl;
    this._headers = options.headers;
  }

  private _getRequestResult<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getFact(): Promise<TFact> {
    return fetch(`${this._factUrl}`, {
      headers: this._headers,
    }).then((res) => this._getRequestResult<TFact>(res));
  }

  getAge(name: string): Promise<TAge> {
    const queryParams = new URLSearchParams();
    queryParams.append("name", name);
    return fetch(`${this._ageUrl}?${queryParams.toString()}`, {
      headers: this._headers,
    }).then((res) => this._getRequestResult<TAge>(res));
  }
}

const mainApi = new MainApi({
  factUrl: "https://catfact.ninja/fact",
  ageUrl: "https://api.agify.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
