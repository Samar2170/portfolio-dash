import { useState, useEffect } from 'react';
import { dataFetchService } from '../services/dataFetch.service';
import Loader from '../components/loader';

import { PieChart } from 'react-minimal-pie-chart';

export default function DashboardHead(props) {
    const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    if (data.length <= 0 ) {
        const response = dataFetchService.getHoldingAggregates()
        setLoading(true)
        response.then((res) => {
            let newData = []
            Object.keys(res.Data).forEach(function(key,val){
                if (key.toLowerCase()!='total') {
                    var randomColor = Math.floor(Math.random()*16777215).toString(16);
                    newData.push({title:key,value:res.Data[key],color:'#'+randomColor})    
                }
            })
            console.log(newData);
          setData(newData)
          console.log(res)
          setLoading(false)
        })    
    } 
  }, [data]);
    return ( 
        <div className="container">
        { loading ? <Loader /> : 
        <div className="px-6 pt-6 pb-6 2xl:container" >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-1" >
                <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                    <PieChart data={data}/>

                </div>
            </div>
            <div>
                <div className="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
                </div>
            </div>
            <div>
                <div className="lg:h-full py-8 px-6 text-gray-600 rounded-xl border border-gray-200 bg-white">
                </div>
            </div>
        </div>
    </div>
        }
</div>
    )
}