type CacheItem<T> = {
  data: T;
  expiresAt: number;
};

export class CacheDataSource {
  static readonly items = {} as Record<string, CacheItem<any>>;

  static set<T>(key: string, item: CacheItem<T>) {
    this.items[key] = item;
  }

  static get<T>(key: string, defaultValue: T = null) {
    // Delete if expired
    if (
      this.items[key] &&
      this.items[key].expiresAt > 0 &&
      this.items[key].expiresAt < new Date().valueOf()
    ) {
      delete this.items[key];
    }
    return this.items[key] ? this.items[key].data : defaultValue;
  }

  /**
   * Delete all expired data.
   */
  static clean() {
    Object.entries(this.items).forEach(([key, item]) => {
      if (item.expiresAt > 0 && item.expiresAt < new Date().valueOf()) {
        delete this.items[key];
      }
    });
  }

  /**
   * Delete all data.
   */
  static purge() {
    Object.keys(this.items).forEach((key) => {
      delete this.items[key];
    });
  }
}
