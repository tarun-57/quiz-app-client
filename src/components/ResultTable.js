import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'


export default function ResultTable() {

  const [data, setData] = useState([])

  useEffect(() => {
    //Fetch results
    async function fetchData() {
      try {
        let res = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`);
        setData(res);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  });

  return (
    <div>
      <table>
        <thead className='table-header'>
          <tr className='table-row'>
            <td>Name</td>
            <td>Attemps</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>

        <tbody>
          { !data ?? <div>No Data Found </div>}
          {
            data.map((v, i) => (
              <tr className='table-body' key={i}>
                <td>{v?.username || ''}</td>
                <td>{v?.attempts || 0}</td>
                <td>{v?.points || 0}</td>
                <td>{v?.achieved || ""}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
