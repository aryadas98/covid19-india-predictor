
export default function fit(data) {
  const alpha1 = 0.3;
  const alpha2 = 0.1;
  const epsilon = 5e-4;

  const initCoeffs = {
    dIs: 0,
    dRs: 0,
    dDs: 0,
    aSNs: 0,
    bs: 0,
    cs: 0,
    pI: 0,
    d2s: 0,
    Ss: 0,
    Ns: 0,
  }

  const fc = data.reduce((coeffs, item) => {
    const epActv = Math.max(item.curr.actv,epsilon);

    const dI = item.delt.actv;
    const dR = item.delt.recv;
    const dD = item.delt.dead;
    
    const dIs = alpha1*item.delt.actv + (1-alpha1)*coeffs.dIs;
    const dRs = alpha1*item.delt.recv + (1-alpha1)*coeffs.dRs;
    const dDs = alpha1*item.delt.dead + (1-alpha1)*coeffs.dDs;
    
    const aSNs = alpha1*((dI + dR + dD)/epActv) + (1-alpha1)*coeffs.aSNs;
    const bs   = alpha1*(dR/epActv) + (1-alpha1)*coeffs.bs;
    const cs   = alpha1*(dD/epActv) + (1-alpha1)*coeffs.cs;
    const d2s  = alpha2*(dIs - coeffs.pI) + (1-alpha2)*coeffs.d2s;
    const pI   = dIs

    const S  = aSNs**2/Math.max((aSNs-bs-cs)**2-d2s/epActv, epsilon)*item.curr.actv;
    const Ss = alpha1*coeffs.Ss + (1-alpha1)*S;
    const Ns = alpha1*coeffs.Ns + (1-alpha1)*(item.curr.conf + Ss);

    return { dIs, dRs, dDs, aSNs, bs, cs, d2s, pI, Ss, Ns }

  },initCoeffs);

  fc.as = fc.aSNs*fc.Ns/Math.max(fc.Ss, epsilon);

  return {
    as: fc.as,
    bs: fc.bs,
    cs: fc.cs,
    Ns: fc.Ns,
    Ss: fc.Ss
  }
}