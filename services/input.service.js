import { fetchWrapper } from "../helpers/fetch-wrapper";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const inputService = {
    createStockTrade,
    registerBankAccount,
    registerDematAccount,
    registerNcdTrade,
    registerUnlistedNcdTrade,
    registerFd,
    registerMfTrade
}

function createStockTrade(formData) {
    return fetchWrapper.postForm(`${baseUrl}register-trade/stock`,formData)
}

function registerBankAccount(formData) {
    return fetchWrapper.postForm(`${baseUrl}register-account/bank`,formData)
}
function registerDematAccount(formData) {
    return fetchWrapper.postForm(`${baseUrl}register-account/demat`,formData)
}

function registerMfTrade(formData) {
    return fetchWrapper.postForm(`${baseUrl}register-trade/mf`,formData)
}
function registerNcdTrade(formData) {
    return fetchWrapper.postForm(`${baseUrl}register-trade/listed-ncd`,formData)
}
function registerUnlistedNcdTrade(formData) {
    return fetchWrapper.postForm(`${baseUrl}register-trade/unlisted-ncd`,formData)
}
function registerFd(formData) {
    return fetchWrapper.postForm(`${baseUrl}register-fd`,formData)
}