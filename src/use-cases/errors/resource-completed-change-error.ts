export class ResourceCompletedChangeError extends Error {
  constructor() {
    super('Resource cannot be changed after completion.')
  }
}
