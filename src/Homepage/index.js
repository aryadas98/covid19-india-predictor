import React from "react"
import Layout from "../components/layout"
import Banner from "./banner"
import PredTable from "./predTable"
import Chart from "./chart"
import Buttons from "./buttons"
import Ack from "../components/ack"

export default function Homepage() {
  return (
    <Layout>
      <Banner/>
      <PredTable/>
      <Chart/>
      <Buttons/>
      <Ack/>
    </Layout>
  );
}
