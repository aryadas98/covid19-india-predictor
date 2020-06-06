import moment from "moment"

export default function parse(data) {
  const today = {
    curr: {
      conf: +data.statewise[0].confirmed,
      recv: +data.statewise[0].recovered,
      dead: +data.statewise[0].deaths,
      actv: +data.statewise[0].confirmed -
        +data.statewise[0].recovered -
        +data.statewise[0].deaths
    },
    delt: {
      conf: +data.statewise[0].deltaconfirmed,
      recv: +data.statewise[0].deltarecovered,
      dead: +data.statewise[0].deltadeaths,
      actv: +data.statewise[0].deltaconfirmed -
        +data.statewise[0].deltarecovered -
        +data.statewise[0].deltadeaths
    },
    lastUp: moment(data.statewise[0].lastupdatedtime, "DD/MM/YYYY HH:mm:ss")
  }

  const time_series = data.cases_time_series.map(v => (
    {
      curr: {
        conf: +v.totalconfirmed,
        recv: +v.totalrecovered,
        dead: +v.totaldeceased,
        actv: +v.totalconfirmed - +v.totalrecovered - +v.totaldeceased
      },
      delt: {
        conf: +v.dailyconfirmed,
        recv: +v.dailyrecovered,
        dead: +v.dailydeceased,
        actv: +v.dailyconfirmed - +v.dailyrecovered - +v.dailydeceased
      },
      date: moment(v.date, "DD MMMM")
    }
  ))

  const known = time_series.length;

  return { today, time_series, known }
}