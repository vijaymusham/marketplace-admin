export type ApiEnvelope<T> = {
    success: boolean;
    message: string;
    data: T;
};

export type NamedRef = {
    id: string;
    name: string;
};

export type AdItem = {
    id: string;
    title: string;
    price: number;
    category: NamedRef;
    subCategory: NamedRef;
    state: NamedRef;
    city: NamedRef;
    sellerName: string;
    mobileNumber: string;
    status: string;
};

export type GetAdsParams = {
    categoryId?: string;
    subCategoryId?: string;
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
};

export type GetAdsResponse = {
    items: AdItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};


export type GetUsersParams = {
    page: number;
    limit: number;
    search?: string;
    status?: string;
}

export type GetUsersResponse = {
    items: {
        id: string;
        firstName: string;
        lastName: string;
        profilePhoto: string;
        email: string;
        phone: string;
        lastActiveAt: string;
        status: string;
        role: string;
    }[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}


export type Category = {
    id: string;
    name: string;
    slug: string;
    sortOrder: number;
    isActive: boolean;
}

export type GetCategoriesParams = {
    page: number;
    limit: number;
}

export type GetCategoriesResponse = {
    items: Category[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type GetSubCategoriesParams = {
    categoryId?: string;
    page?: number;
    limit?: number;
}

export type SubCategory = {
    id: string;
    name: string;
    categoryName: string;
    slug: string;
    sortOrder: number;
    isActive: boolean;
}

export type GetSubCategoriesResponse = {
    items: SubCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type GetReportsParams = {
    search?: string;
    page: number;
    limit: number;
    status?: string;
    targetType?: string;
}

export type GetReportsResponse = {
    items: Report[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type Report = {
    id: string;
    targetType: string;
    targetId: string;
    reason: string;
    remarks: string;
    status: string;
    moderatorId: string;
    moderatorAction: string;
    createdAt: string;
    resolvedAt: string;
    reporter: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }
}


export type GetCitiesParams = {
    page: number;
    limit: number;
    search?: string;
}

export type GetCitiesResponse = {
    items: City[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type City = {
    id: string;
    name: string;
    type: string;
    state: string;
    code: string;
    isActive: boolean;
}
