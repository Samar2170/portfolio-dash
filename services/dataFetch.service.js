import { fetchWrapper } from "../helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const dataFetchService = {
    getStockSymbols,
    getDematAccounts,
    searchMutualFunds,
    getNCDSymbols,
    getUNCDSymbols,
    getTemplateFile,
}

function getStockSymbols() {
    return fetchWrapper.get(`${baseUrl}securities/stocks-list`);
}
function getDematAccounts() {
    return fetchWrapper.get(`${baseUrl}view-accounts`);
}
function searchMutualFunds(symbol) {
    return fetchWrapper.get(`${baseUrl}securities/mutual-funds/search?symbol=${symbol}`)
}

function getNCDSymbols() {
    return fetchWrapper.get(`${baseUrl}securities/ncd-list`)
}
function getUNCDSymbols() {
    return fetchWrapper.get(`${baseUrl}securities/unlisted-ncd-list`)
}
function getTemplateFile(security) {
    return fetchWrapper.get(`${baseUrl}bulk-upload-template/${security}`)
}