export class LanguageClient {
  constructor() {
    this.initialize = jest.fn().mockResolvedValue(true);
    this.sendRequest = jest.fn();
  }
}

export default {
  LanguageClient
}
