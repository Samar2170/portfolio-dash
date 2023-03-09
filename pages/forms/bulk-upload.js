import FormLayout from "../../components/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { inputService } from "../../services/input.service";
import { func } from "prop-types";
import { dataFetchService } from "../../services/dataFetch.service";

const validSecurities = ["fd","stock","mf","ncd"]
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CreateTaxInvoice() {
    const router = useRouter();
    const [file, setFile] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [security,setSecurity] = useState(validSecurities[0]);
    const [templateFile,setTemplateFile] = useState([]);

    // const downloadTemplateFile = () =>  {
    //     return dataFetchService.getTemplateFile(security)
    // }

    const handleSecurityChange = (event) => {
        setSecurity(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSubmitted(true);
        const form = new FormData();
        form.append("file",file)
        const response  = await inputService.createBulkUpload(form,security).then((res) => {
            setLoading(false);
            router.push('/data-view/view-payment-requests')
            })
            .catch((err) => {
                setLoading(false);
                console.log(err)
            })
    }

    const handleFileChange= (event) => {
        // const { name, files } = event.target;
        // setQuery(prevState => ({
        //     ...prevState,
        //     [name]: files[0]
        // }));
        const i = event.target.files[0];
        setInvoiceFile(i);
    }
    return (
        <FormLayout name={"Bulk Upload"}>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type=""
                        disabled={loading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    > <a href={`${baseUrl}bulk-upload-template/${security}`} target="_blank" download>
                        {loading ? 'Loading...' : 'Download'}
                        </a>
                    </button>
                </div>

            <form onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-3 sm:col-span-3">
                            <label htmlFor="security" className="block text-sm font-medium text-gray-700">
                                Security
                                </label>
                                <select id="security" name="security" value={security} onChange={handleSecurityChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">                                    
                                <option value="">Select Security</option>
                                    {validSecurities.map((sec) => {
                                        return (
                                            <option key={sec} value={sec}>{sec}</option>
                                        )
                                    })}
                                </select>
                                {submitted && !security &&
                                    <div className="text-red-500">Security is required</div>
                                }

                        </div>
                        <div className="col-span-3 sm:col-span-3">
                            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
                                Attachments
                                </label>
                                <input type="file" name="file"  onChange={handleFileChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
