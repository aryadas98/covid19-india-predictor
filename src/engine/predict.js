
export default function predict(data, coeffs, days, skip=1) {

  function mul(h,s) {
    const tmp = {};
    for (let p in s)
      tmp[p] = h*s[p];
    return tmp;
  }

  function add(x,y) {
    const tmp = {};
    for(let p in x)
      tmp[p] = x[p] + y[p];
    return tmp;
  }

  function dS(s) {
    const {as, bs, cs, Ns} = coeffs;
    const {I,T} = s;
    const S = Ns - T;

    return {
      I: as*S/Ns*I - bs*I - cs*I,
      R: bs*I,
      D: cs*I,
      T: as*S/Ns*I
    }
  }

  let S = {
    I: data[data.length-1].curr.actv,
    R: data[data.length-1].curr.recv,
    D: data[data.length-1].curr.dead,
    T: data[data.length-1].curr.conf,
  }

  for(let i=0; i<days; i+=skip) {
    const k1 = dS(S);
    const k2 = dS(add(S,mul(skip/2,k1)));
    const k3 = dS(add(S,mul(skip/2,k2)));
    const k4 = dS(add(S,mul(skip,k3)));

    const delt = mul(skip/6,add(k1,add(mul(2,k2),add(mul(2,k3),k4))));
    
    S = add(S,delt);

    data.push({
      curr: {
        conf: S.T,
        actv: S.I,
        recv: S.R,
        dead: S.D
      },
      delt: {
        conf: delt.T,
        actv: delt.I,
        recv: delt.R,
        dead: delt.D
      },
      sdelt: {
        conf: delt.T/skip,
        actv: delt.I/skip,
        recv: delt.R/skip,
        dead: delt.D/skip
      },
      date: data[data.length-1].date.clone().add(skip,"days")
    })
  }
}