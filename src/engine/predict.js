
export default function predict(data, coeffs, days) {
  const {as, bs, cs, Ns} = coeffs;

  [...Array(days)].forEach(() => {
    const I = data[data.length-1].curr.actv;
    const R = data[data.length-1].curr.recv;
    const D = data[data.length-1].curr.dead;
    const T = data[data.length-1].curr.conf;

    const S = Ns - T;
    
    const dI = as*S/Ns*I - bs*I - cs*I;
    const dR = bs*I;
    const dD = cs*I;
    const dS = -as*S/Ns*I;

    data.push({
      curr: {
        conf: T-dS,
        actv: I+dI,
        recv: R+dR,
        dead: D+dD
      },
      delt: {
        conf: -dS,
        actv: dI,
        recv: dR,
        dead: dD
      },
      date: data[data.length-1].date.clone().add(1,"days")
    })
  })
}