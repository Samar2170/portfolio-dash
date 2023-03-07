import FormLayout from "../../components/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { inputService } from "../../services/input.service";
import { dataFetchService } from "../../services/dataFetch.service";

export default function CreateStockTrade() {
    const router = useRouter();
    const [query,setQuery] = useState({
        symbol:'',
        demat:'',
        quantity:0,
        price:0,
        tradeType:'',
        tradeDate:'',
    });
    const [submitted,setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [symbols,setSymbols] = useState([]);
    const [dematAcs,setDematAcs] = useState([]);

    useEffect(() => {
        const getDematAccounts = async () => {
            const resp = await dataFetchService.getDematAccounts();
            setDematAcs(resp.Data.demat_accounts);
        }
        const getSymbols = async () => {

            const resp = await dataFetchService.getNCDSymbols();
            setSymbols(resp.Data.data);
        }
        getDematAccounts();
        getSymbols();
    },[])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setQuery(prevState => ({
            ...prevState,
            [name]:value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSubmitted(true);
        const form = new FormData();
        form.append("symbol",query.symbol);
        form.append("demat",query.demat);
        form.append("quantity",query.quantity);
        form.append("price",query.price);
        // form.append("trade_type",query.tradeType);
        form.append("trade_date",query.tradeDate);
        const response = await inputService.createStockTrade(form).then((res) => {
            setLoading(false);
            router.push('/')
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }
    return (
        <FormLayout name="NCD Trade ">
        <form onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                            Symbol
                            </label>
                            <select id="symbol" name="symbol" value={query.symbol} onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">                                    <option value="">Select Vendor</option>
                                {symbols ? symbols.map((symbol) => {
                                    return (
                                        <option key={symbol} value={symbol}>{symbol}</option>
                                    )
                                }) : ""}
                            </select>
                            {submitted && !symbol &&
                                <div className="text-red-500">Symbol is required</div>
                            }

                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="demat" className="block text-sm font-medium text-gray-700">
                            Demat Account
                            </label>
                            <select id="demat" name="demat" value={query.demat} onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <option value="">Select Demat Account</option>
                                {dematAcs.map((bankAccount) => {
                                    return (
                                        <option key={bankAccount.Code} value={bankAccount.Code}>{bankAccount.Code} {bankAccount.Broker}</option>
                                    )
                                })}
                            </select>
                            {submitted && !demat &&
                                <div className="text-red-500">Demat Account is required</div>
                            }
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                            </label>
                            <input type="number" name="quantity" id="quantity" value={query.quantity} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            {submitted && !quantity &&
                                <div className="text-red-500">Quantity is required</div>
                            }
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                            </label>
                            <input type="number" name="price" id="price" value={query.price} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            {submitted && !price &&
                                <div className="text-red-500">Price is required</div>
                            }
                    </div>

                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="tradeDate" className="block text-sm font-medium text-gray-700">
                            Trade Date
                            </label>
                            <input type="date" name="tradeDate" id="tradeDate" value={query.tradeDate} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>    
                {/* <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="tradeType" className="block text-sm font-medium text-gray-700">
                            Trade Type
                            </label>
                            <select id="tradeType" name="tradeType" value={query.tradeType} onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">                                    <option value="">Select Vendor</option>
                                <option key="BUY" value="BUY">BUY</option>
                                <option key="SELL" value="SELL">SELL</option>
                            </select>
                            {submitted && !tradeType &&
                                <div className="text-red-500">Trade Type is required</div>
                            }

                    </div> */}

            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {loading ? 'Loading...' : 'Create'}
                </button>
            </div>
        </div>
        </form>
    </FormLayout>

    )
}