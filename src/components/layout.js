import React, {useEffect} from "react"
import Header from "./header"
import Footer from "./footer"
import "./App.scss";

export default function Layout(props) {
  const appName = "COVID-19 India Predictor";
  const title = props.title?`${props.title} | ${appName}`:appName;

  useEffect(() =>  {document.title = title},[title]);

  return (
    <>
      <Header/>
      <main className="section">
        <div className="container content">
          {props.children}
        </div>
      </main>
      <Footer/>
    </>
  )
}