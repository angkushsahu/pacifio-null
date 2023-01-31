class ApiFeatures {
    query = {} as any;
    queryString = {} as any;
    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }

    searchOrders() {
        const item = this.queryString?.order
            ? {
                  id: { $regex: this.queryString.order, $options: "i" },
              }
            : {};

        this.query = this.query.find({ ...item });
        return this;
    }

    filterOrders() {
        const tempQuery = { ...this.queryString };
        const removeFields = ["order", "page", "limit"];
        removeFields.forEach((field) => delete tempQuery[field]);

        let queryStr = JSON.stringify(tempQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    searchProducts() {
        const item = this.queryString?.type
            ? {
                  $or: [
                      {
                          id: { $regex: this.queryString.type, $options: "i" },
                      },
                      {
                          name: { $regex: this.queryString.type, $options: "i" },
                      },
                      {
                          category: { $regex: this.queryString.type, $options: "i" },
                      },
                  ],
              }
            : {};

        this.query = this.query.find({ ...item });
        return this;
    }

    filterProducts() {
        const tempQuery = { ...this.queryString };
        const removeFields = ["type", "page", "limit"];
        removeFields.forEach((field) => delete tempQuery[field]);

        let queryStr = JSON.stringify(tempQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    searchUsers() {
        const item = this.queryString?.user
            ? {
                  $or: [
                      {
                          id: { $regex: this.queryString.user, $options: "i" },
                      },
                      {
                          name: { $regex: this.queryString.user, $options: "i" },
                      },
                      {
                          email: { $regex: this.queryString.user, $options: "i" },
                      },
                  ],
              }
            : {};

        this.query = this.query.find({ ...item });
        return this;
    }

    filterUsers() {
        const tempQuery = { ...this.queryString };
        const removeFields = ["user", "page", "limit"];
        removeFields.forEach((field) => delete tempQuery[field]);

        let queryStr = JSON.stringify(tempQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage: number) {
        const currentPage = Number(this.queryString?.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.skip(skip).limit(resultPerPage);
        return this;
    }
}

export default ApiFeatures;
