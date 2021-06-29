import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './Table.css';   

import numeral from 'numeral';

function Table() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get("https://disease.sh/v3/covid-19/countries");
            res.data.sort((a,b) => a.cases>b.cases? -1 : 1);
            setTableData(res.data);
        }

        fetchData();
    }, []);


    return (
        <div className="table">
            { tableData.map(info => (
                <tr>
                    <td> {info.country} </td>
                    <td><strong>{numeral(info.cases).format()}</strong></td>
                </tr>
                ))
            }
        </div>
    )
}

export default Table;
