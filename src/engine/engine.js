import parse from "./parse"
import fit from "./fit"
import predict from "./predict"
import {
fittingDuration,
shortTermStart,
shortTermEnd,
longTermDuration,
longTermSkip
} from "../components/constants"

export default async function run_engine() {
  const d = await fetch_data();
  const p = parse(d);
  
  const coeffs = fit(p.time_series.slice(p.known-fittingDuration));
  
  p.shortterm = p.time_series.slice(p.known-shortTermStart);
  predict(p.shortterm,coeffs,shortTermEnd);

  p.longterm = [...p.time_series];
  predict(p.longterm,coeffs,longTermDuration,longTermSkip);

  p.coeffs = {...coeffs};
  p.status = "success";

  return p;
}

async function fetch_data() {
  const d = await fetch('https://api.covid19india.org/data.json')
  const djson = await d.json();
  return djson;
}