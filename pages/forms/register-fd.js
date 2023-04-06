import FormLayout from "../../components/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { inputService } from "../../services/input.service";
import { dataFetchService } from "../../services/dataFetch.service";

class IpFrequency {
    constructor(name,def) {
        this.name=name
        this.def=def
    }
}

const ipFrequency = [
    new IpFrequency("A", "Annual"),
	new IpFrequency("M",  "Monthly"),
	new IpFrequency("MT", "Maturity"),
	new IpFrequency("Q","Quarterly"),
	new IpFrequency("SA", "Semi annually"),
]

export default function CreateStockTrade() {
    const router = useRouter();
    const [query,setQuery] = useState({
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
            const resp = await dataFetchService.getBankAccounts();
            setBankAcs(resp);
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
        form.append("amount",query.amount);
        form.append("maturity_amount",query.maturity_amount);
        form.append("ip_freq",query.ip_frequency)
        form.append("ip_rate",query.ip_rate);
        form.append("start_date",query.start_date);
        form.append("ip_date",query.ip_date);
        form.append("maturity_date",query.maturity_date);
        form.append("account_number",query.account_number);

        const response = await inputService.registerFd(form).then((res) => {
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
                        <label htmlFor="account_number" className="block text-sm font-medium text-gray-700">
                            Bank Account
                            </label>
                            <select id="account_number" name="account_number" value={query.account_number} onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <option value="">Select Bank Account</option>
                                {bankAcs.map((bankAccount) => {
                                    return (
                                        <option key={bankAccount.account_no} value={bankAccount.account_no}>{bankAccount.account_no} {bankAccount.bank}</option>
                                    )
                                })}
                            </select>
                            {submitted && !account_number &&
                                <div className="text-red-500">Bank Account is required</div>
                            }
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount 
                            </label>
                            <input type="number" name="amount" id="amount" value={query.amount} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            {submitted && !amount &&
                                <div className="text-red-500">Amount is required</div>
                            }
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="maturity_amount" className="block text-sm font-medium text-gray-700">
                        Maturity Amount
                            </label>
                            <input type="number" name="maturity_amount" id="maturity_amount" value={query.maturity_amount} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            {submitted && !maturity_amount &&
                                <div className="text-red-500">Maturity Amount is required</div>
                            }
                    </div>

                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                            Start Date
                            </label>
                            <input type="date" name="start_date" id="start_date" value={query.start_date} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="maturity_date" className="block text-sm font-medium text-gray-700">
                        Maturity Date 
                            </label>
                            <input type="date" name="maturity_date" id="maturity_date" value={query.maturity_date} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="ip_date" className="block text-sm font-medium text-gray-700">
                        IP Date 
                            </label>
                            <input type="date" name="ip_date" id="ip_date" value={query.ip_date} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="ip_rate" className="block text-sm font-medium text-gray-700">
                        IP Rate 
                            </label>
                            <input type="number" name="ip_rate" id="ip_rate" value={query.ip_rate} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />                 
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="ip_frequency" className="block text-sm font-medium text-gray-700">
                            IP Frequency
                            </label>
                            <select id="ip_frequency" name="ip_frequency" value={query.ip_frequency} onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <option value="">Select IP Frequency</option>
                                {ipFrequency.map((ipf) => {
                                    return (
                                        <option key={ipf.name} value={ipf.name}>{ipf.name} {ipf.def}</option>
                                    )
                                })}
                            </select>
                            {submitted && !ip_frequency &&
                                <div className="text-red-500">Bank Account is required</div>
                            }
                    </div>

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