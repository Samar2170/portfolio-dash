import { useState, useEffect } from "react";
import { dataFetchService } from "../../services/dataFetch.service";
import { decodeToken } from "../../helpers/token-utils";
import Link from "next/link";
import Loader from "../../components/loader";

const categoryChoices = [
     "FD",
     "Listed-Ncd",
    "Stock",
    "MF",
]


export default function ViewPaymentRequests(props) {

    const [category, setCategory] = useState("");
    const [holdings, setHoldings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);
    // const decodedToken = decodeToken(localStorage.getItem("token"));
    const [action, setAction] = useState({});
    
    const token = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        let ctgQuery = "";
        if (category === "") {
            ctgQuery="";
        }
        else {
            ctgQuery=`category=${category}`;
        }
        const queryString = ctgQuery ;
        const response = dataFetchService.getHoldings(queryString).then( res => {
            console.log(res);
            if (res.Data!=null) {
                setHoldings(res.Data);
            } else {
                alert("No holdings found for this category")
              setHoldings([]);  
            }
        })
        setLoading(false);
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleCategoryChange = (e) => {
        setCategory(e);
    }

    const handleReset = () => {
        setLoading(true);
        setCategory("");
        setLastPage(false);
    }
    
    return (
    <div>
        
<div className="max-w-full mx-auto px-4 py-4">

</div>


            <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div className="sm:flex items-center justify-between">
                    <div className="flex items-center">
                        {categoryChoices.map((category, index) => (
                            <button className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" onClick={() => {handleCategoryChange(category)}}>
                                <div className="py-2 px-8 mx-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-gray-200 rounded-full" >
                                {category}
                                </div>
                            </button>
                        ))}
                    </div>
                    <button onClick={handleReset} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                        <p className="text-sm font-medium leading-none text-white">Reset</p>
                    </button>
                </div>
                </div>

                <div class="mt-7 overflow-x-auto">
                    <table class="w-full whitespace-nowrap">
                        <thead>
                            <tr class="text-xs font-medium tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th class="px-4 py-3">Name</th>
                                <th class="px-4 py-3">Invested</th>
                                <th class="px-4 py-3">Current Value</th>
                                <th className="px-4 py-3">Category</th>
                                {/* <th class="px-4 py-3">Invoice Date</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Paid Amount</th>
                                <th className="px-4 py-3">Action</th> */}
                            </tr>

                        </thead>
                        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {holdings.length>0 ? holdings.map((item, index) => (
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <div>
                                                <p class="font-semibold">{item.Name}</p>
                                            </div>
                                        </div>
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            <Link href={`/data-view/${item.id}`} className="text-indigo-600 hover:text-indigo-900" legacyBehavior>
                                                <a>{item.Invested}</a>
                                            </Link>
                                            {/* {item.vendor_name} */}
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            {item.CurrentValue}
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            {item.Category}
                                        </td>
                                        {/* <td class="px-4 py-3 text-sm">
                                            {item.invoice_date}
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            {item.status}
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            {item.paid_amount}
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            <button className="bg-indigo-700 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-white">
                                                <a href={action.key + item.id}>
                                                    {action.value}
                                                </a>
                                            </button>
                                        </td> */}
                                </tr>
                            ))
                            
                            : <Loader />}
                        </tbody>
                    </table>
                    </div>




    </div>
)
}