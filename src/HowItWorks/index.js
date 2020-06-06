import React from "react"
import Layout from "../components/layout"
import { Fetching, Failed } from "../components/messages"

export default function HowItWorks({data}) {
  return (
    <Layout title="How it works">
      {
        data.status === "success" ?
          <>
            <h1>How it works</h1>
            <p>Under construction</p>
          </> :
        data.status === "fetching" ?
          <Fetching/> :
        <Failed/>
      }
    </Layout>
  )
}
