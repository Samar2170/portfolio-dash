import FormLayout from "../../components/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { inputService } from "../../services/input.service";
import { dataFetchService } from "../../services/dataFetch.service";
// type FD struct {
// 	Bank        string `json:"bank" form:"bank"`
// 	Amount      string `json:"amount" form:"amount"`
// 	MtAmount    string `json:"maturity_amount" form:"maturity_amount"`
// 	IpRate      string `json:"ip_rate" form:"ip_rate"`
// 	IpFrequency string `json:"ip_frequency" form:"ip_frequency"`
// 	IpDate      string `json:"ip_date" form:"ip_date"`
// 	StartDate   string `json:"start_date" form:"start_date"`
// 	MtDate      string `json:"maturity_date" form:"maturity_date"`
// 	AccNumber   string `json:"account_number" form:"account_number"`
// }

export default function CreateStockTrade() {
    const router = useRouter();
    const [query,setQuery] = useState({
        bank:'',
        amount:'',
        maturity_amount:0,
        ip_rate:0,
        ip_frequency:'',
        start_date:'',
        ip_date:'',
        maturity_date:'',
        account_number:'',
    });
    const [submitted,setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bankAcs,setBankAcs] = useState([]);

    useEffect(() => {
        const getBankAccounts = async () => {
            const resp = await dataFetchService.getDematAccounts();
            setBankAcs(resp.Data.bank_accounts);
        }
        getBankAccounts();
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
        form.append("bank",query.bank);
        form.append("amount",query.amount);
        form.append("maturity_amount",query.maturity_amount);
        form.append("ip_frequency",query.ip_frequency)
        form.append("ip_rate",query.ip_rate);
        form.append("start_date",query.start_date);
        form.append("ip_date",query.ip_date);
        form.append("maturity_date",query.maturity_date);
        form.append("account_number",query.account_number);

        const response = await inputService.createStockTrade(form).then((res) => {
            setLoading(false);
            router.push('/')
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }
    return (
        <FormLayout name="Fixed Deposit">
        <form onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                    
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="demat" className="block text-sm font-medium text-gray-700">
                            Demat Account
                            </label>
                            <select id="demat" name="demat" value={query.demat} onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <option value="">Select Bank Account</option>
                                {bankAcs.map((bankAccount) => {
                                    return (
                                        <option key={bankAccount.AccountNo} value={bankAccount.AccountNo}>{bankAccount.AccountNo} {bankAccount.Bank}</option>
                                    )
                                })}
                            </select>
                            {submitted && !demat &&
                                <div className="text-red-500">Bank Account is required</div>
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
                <div className="col-span-3 sm:col-span-3">
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

                    </div>

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