import { fetchWrapper } from "../helpers/fetch-wrapper";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const inputService = {
    createStockTrade,
    registerBankAccount,
    registerDematAccount,
    registerNcdTrade,
    registerUnlistedNcdTrade,
    registerFd,
    registerMfTrade,
    createBulkUpload
}

function createStockTrade(formData) {
    return fetchWrapper.postForm(`${baseUrl}portfolio/stock-trades/`,formData)
}

function registerBankAccount(formData) {
    return fetchWrapper.postForm(`${baseUrl}portfolio/bank-accounts/`,formData)
}
function registerDematAccount(formData) {
    return fetchWrapper.postForm(`${baseUrl}portfolio/demat-accounts/`,formData)
}

function registerMfTrade(formData) {
    return fetchWrapper.postForm(`${baseUrl}portfolio/mutual-fund-trades/`,formData)
}
function registerNcdTrade(formData) {
    return fetchWrapper.postForm(`${baseUrl}portfolio/bond-trades/`,formData)
}
function registerUnlistedNcdTrade(formData) {
    return fetchWrapper.postForm(`${baseUrl}portfolio/bond-trades/`,formData)
}
function registerFd(formData) {
    return fetchWrapper.postForm(`${baseUrl}portfolio/fd-holdings/`,formData)
}
function createBulkUpload(formData, security) {
    return fetchWrapper.postForm(`${baseUrl}bulk-upload/${security}`,formData)
}