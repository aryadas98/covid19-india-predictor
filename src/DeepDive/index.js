import React from "react"
import Layout from "../components/layout"
import { Fetching, Failed } from "../components/messages"

export default function DeepDive(props) {
  return (
    <Layout title="Deep Dive">
      {
        props.data.status === "success" ?
          <>
            <h1>Deep Dive</h1>
          </> :
        props.data.status === "fetching" ?
          <Fetching/> :
        <Failed/>
      }
    </Layout>
  )
}
