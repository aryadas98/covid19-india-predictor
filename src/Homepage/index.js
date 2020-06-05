import React from "react"
import Layout from "../components/layout"
import Banner from "./banner"
import PredTable from "./predTable"
import Chart from "./chart"
import Buttons from "./buttons"
import Ack from "../components/ack"
import { Fetching, Failed } from "../components/messages"

export default function Homepage({data}) {
  return (
    <Layout>
      {
        data.status === "success" ?
          <>
            <Banner data={data.today}/>
            <PredTable data={data.time_series} known={data.known}/>
            <Chart data={data.time_series} known={data.known}/>
            <Ack/>
            <Buttons/>
          </> :
        data.status === "fetching" ?
          <Fetching/> :
        <Failed/>
      }
    </Layout>
  );
}
