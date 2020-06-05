import parse from "./parse"
import fit from "./fit"
import predict from "./predict"

export default async function run_engine() {
  const d = await fetch_data();
  const p = parse(d);
  p.known = p.time_series.length;
  const coeffs = fit(p.time_series);
  
  predict(p.time_series,coeffs,10);

  p.status = "success";
  console.log(p);
  console.log(coeffs);
  return p;
}

async function fetch_data() {
  const d = await fetch('https://api.covid19india.org/data.json')
  const djson = await d.json();
  return djson;
}