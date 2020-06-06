import React from "react"
import Layout from "../components/layout"
import Banner from "./banner"
import PredTable from "./predTable"
import Chart from "./chart"
import Buttons from "./buttons"
import Ack from "../components/ack"
import { Fetching, Failed } from "../components/messages"

export default function Homepage({data,term,setTerm}) {
  return (
    <Layout>
      {
        data.status === "success" ?
          <>
            <Banner data={data.today}/>
            <PredTable
              shortTermData={data.shortterm}
              longTermData={data.longterm}
              term={term}
              setTerm={setTerm}
            />
            <Chart
              shortTermData={data.shortterm}
              longTermData={data.longterm}
              term={term}
            />
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
