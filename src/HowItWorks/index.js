import React from "react"
import Layout from "../components/layout"
import { Fetching, Failed } from "../components/messages"
import Buttons from "../components/buttons"
import Ack from "../components/ack"

import Content from "./content"

export default function HowItWorks({coeffs, status}) {
  return (
    <Layout title="How it works">
      {
        status === "success" ?
          <>
            <Content coeffs={coeffs}/>
            <Ack/>
            <Buttons/>
          </> :
        status === "fetching" ?
          <Fetching/> :
        <Failed/>
      }
    </Layout>
  )
}
