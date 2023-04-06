import { fetchWrapper } from "../helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const dataFetchService = {
    getStockSymbols,
    getDematAccounts,
    getBankAccounts,
    searchMutualFunds,
    getNCDSymbols,
    getUNCDSymbols,
    getTemplateFile,
    getHoldings,
    getHoldingAggregates
}

function getStockSymbols() {
    return fetchWrapper.get(`${baseUrl}securities/stocks-list/`);
}
function getDematAccounts() {
    return fetchWrapper.get(`${baseUrl}portfolio/demat-accounts/`);
}
function getBankAccounts() {
    return fetchWrapper.get(`${baseUrl}portfolio/bank-accounts/`);
}
function searchMutualFunds(symbol) {
    return fetchWrapper.get(`${baseUrl}securities/mutual-funds/?search=${symbol}`)
}

function getNCDSymbols() {
    return fetchWrapper.get(`${baseUrl}securities/bonds-list/`)
}
function getUNCDSymbols() {
    return fetchWrapper.get(`${baseUrl}securities/bonds-list/`)
}
function getTemplateFile(security) {
    return fetchWrapper.get(`${baseUrl}bulk-upload-template/${security}`)
}

function getHoldings(queryString) {
    return fetchWrapper.get(`${baseUrl}portfolio/get-holdings?${queryString}`)
}
function getHoldingAggregates() {
    return fetchWrapper.get(`${baseUrl}portfolio/get-holdings-aggregates`)
}
