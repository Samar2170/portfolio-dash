import { fetchWrapper } from "../helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const dataFetchService = {
    getStockSymbols,
    getDematAccounts,
    searchMutualFunds,
    getNCDSymbols,
    getUNCDSymbols,
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