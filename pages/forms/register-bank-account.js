import FormLayout from "../../components/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { inputService } from "../../services/input.service";

export default function RegisterBankAccount() {
    const router = useRouter();
    const [bankAccount, setBankAccount] = useState({
        account_no:"",
        bank:"",
    })
    const [loading, setLoading] = useState(true);
    const [submitted,setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankAccount({ ...bankAccount, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSubmitted(true);
        const form = new FormData();
        form.append("account_number",bankAccount.account_no);
        form.append("bank",bankAccount.bank);
        const response = await inputService.registerBankAccount(form).then((res) => {
            setLoading(false);
            router.push('/')
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }
    return (
        <FormLayout name="Create Bank Account">
        <form onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="account_no" className="block text-sm font-medium text-gray-700">
                            Account No
                        </label>
                        <input type="text" name="account_no" id="account_no" value={bankAccount.account_no} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="bank" className="block text-sm font-medium text-gray-700">
                            Bank
                        </label>
                        <input type="text" name="bank" id="bank" value={bankAccount.bank} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>

                </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create
                </button>
            </div>
        </div>
        </form>
    </FormLayout>

    )

}