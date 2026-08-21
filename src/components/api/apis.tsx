import {
    GetCategoriesParams,
    GetCategoriesResponse,
    GetCitiesParams,
    GetCitiesResponse,
    GetReportsParams,
    GetReportsResponse,
    GetSubCategoriesParams,
    GetSubCategoriesResponse,
    GetUsersResponse,
    type ApiEnvelope,
    type GetAdsParams,
    type GetAdsResponse,
    type GetUsersParams,
} from "../types/type";
import customAxios from "./customAxios";

function rethrow(label: string, error: unknown): never {
    console.log(`====== Error ${label} ===> `, error);
    throw error;
}

export const getUser = async () => {
    try {
        const { data } = await customAxios.get("/auth/me");
        return data;
    } catch (error) {
        rethrow("getUser", error);
    }
};

export const login = async (payload: { email: string, password: string }) => {
    try {
        const { data } = await customAxios.post("admin/login", payload);
        return data;
    } catch (error) {
        rethrow("login", error);
    }

}

export const getAds = async (params: GetAdsParams) => {
    try {
        const { data } = await customAxios.get<ApiEnvelope<GetAdsResponse>>(
            "admin/ads",
            { params },
        );
        return data.data;
    } catch (error) {
        rethrow("getAds", error);
    }
};

export const getCategories = async (params: GetCategoriesParams) => {
    try {
        const { data } = await customAxios.get<ApiEnvelope<GetCategoriesResponse>>("admin/categories", { params });
        return data;
    } catch (error) {
        rethrow("getCategories", error);
    }
}

export const getSubCategories = async (params: GetSubCategoriesParams) => {
    try {
        const { data } = await customAxios.get<ApiEnvelope<GetSubCategoriesResponse>>(`admin/sub-categories`, { params: params });
        return data;
    } catch (error) {
        rethrow("getSubCategories", error);
    }
}

export const getUsers = async (params: GetUsersParams) => {
    try {
        const { data } = await customAxios.get<ApiEnvelope<GetUsersResponse>>(`admin/users`, { params: params });
        return data;
    } catch (error) {
        rethrow("getUsers", error);
    }
}

export const getReports = async (params: GetReportsParams) => {
    try {
        const { data } = await customAxios.get<ApiEnvelope<GetReportsResponse>>(`admin/reports`, { params: params });
        return data;
    } catch (error) {
        rethrow("getReports", error);
    }
}

export const getCities = async (params: GetCitiesParams) => {
    try {
        const { data } = await customAxios.get<ApiEnvelope<GetCitiesResponse>>(`admin/cities`, { params: params });
        return data;
    } catch (error) {
        rethrow("getCities", error);
    }
}
