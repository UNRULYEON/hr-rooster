import * as React from 'react';
import './ScheduleWeek.css';

//Components
import Loader from '../../components/Loader'

// Material-UI
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// Material UI Pickers
import { InlineDatePicker } from "material-ui-pickers";

type Props = {
  code: string,
  type: number,
}

type State = {
  monday: Array<any>,
  tuesday: Array<any>,
  wednesday: Array<any>,
  thursday: Array<any>,
  friday: Array<any>,
  loading: boolean,
  currentDate: Date,
}

const api: string | undefined = process.env.REACT_APP_API;

class ScheduleWeek extends React.Component<Props, State> {
  state: State = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    loading: true,
    currentDate: new Date(),
  };

  componentDidMount = () => {
    if (this.props.code != "") {this.getDate(new Date())}
  }

  getDate = (date: Date) => {
    let dates: Array<string> = this.getWeekDates(date)
    let url: string = `https://cors-anywhere.herokuapp.com/${api}${this.props.code}&type=${this.props.type}&startDate=${dates[0]}&endDate=${dates[1]}&json`
    fetch(url, {headers: {'Origin': '',}}).then(res => res.json())
      .then(data => {
        let monday: Array<any> = [];
        let tuesday: Array<any> = [];
        let wednesday: Array<any> = [];
        let thursday: Array<any> = [];
        let friday: Array<any> = [];
        if (data.lesson != null) {
          for (let i = 0; i < data.lesson.length; i++) {
            switch (data.lesson[i].DayNumber) {
              case "1":
                monday.push(data.lesson[i])
                break;
              case "2":
                tuesday.push(data.lesson[i])
                break;
              case "3":
                wednesday.push(data.lesson[i])
                break;
              case "4":
                thursday.push(data.lesson[i])
                break;
              case "5":
                friday.push(data.lesson[i])
                break;
            }
          }
          this.setState({
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            loading: false,
          })
        } else {
          this.setState({
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            loading: false,
          })
        }
      })
      .catch(err => console.log(err))
  }

  // componentWillReceiveProps = (nextProps: Readonly<Props>) => {
  //   console.log(nextProps.code)
  //   let dates: Array<string> = this.getWeekDates(new Date())
  //   let url: string = `https://cors-anywhere.herokuapp.com/${api}${nextProps.code}&type=${this.props.type}&startDate=${dates[0]}&endDate=${dates[1]}&json`
  //   fetch(url, {headers: {'Origin': '',}}).then(res => res.json())
  //     .then(data => {
  //       console.log(data.lesson)
  //       let monday: Array<any> = [];
  //       let tuesday: Array<any> = [];
  //       let wednesday: Array<any> = [];
  //       let thursday: Array<any> = [];
  //       let friday: Array<any> = [];
  //       for (let i = 0; i < data.lesson.length; i++) {
  //         switch (data.lesson[i].DayNumber) {
  //           case 1:
  //             monday.push(data.lesson[i])
  //             break;
  //           case 2:
  //             tuesday.push(data.lesson[i])
  //             break;
  //           case 3:
  //             wednesday.push(data.lesson[i])
  //             break;
  //           case 4:
  //             thursday.push(data.lesson[i])
  //             break;
  //           case 5:
  //             friday.push(data.lesson[i])
  //             break;
  //         }
  //       }
  //       console.log(monday)
  //       console.log(tuesday)
  //       console.log(wednesday)
  //       console.log(thursday)
  //       console.log(friday)
  //       if (data.lesson == null) {
  //         console.log(`no schedule for today`)
  //       } else if (this.state.monday != [] || this.state.tuesday != [] || this.state.wednesday != [] || this.state.thursday != [] || this.state.friday != []){
  //         this.setState({
  //           monday,
  //           tuesday,
  //           wednesday,
  //           thursday,
  //           friday,
  //         })
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }

  getWeekDates = (date: Date) => {
    let weekday: number = date.getDay()
    let startDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (weekday - 1));
    let endDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (weekday - 5));
    let startDateString: string = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    let endDateString: string = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    return [startDateString, endDateString];
  }

  getWeekNumbers = (date: Date, pos: number) => {
    let weekday: number = date.getDay()
    let newDate: Date = new Date(date.getFullYear(), date.getMonth(), (date.getDate() - (weekday - 1)) + pos)
    return (
      <div className={`ScheduleWeek--week-view-header-date ${newDate.getFullYear() == new Date().getFullYear() && newDate.getMonth() == new Date().getMonth() && newDate.getDate() == new Date().getDate() ? 'ScheduleWeek--week-view-header-date-current' : ''}`}>{newDate.getDate()}</div>
    )
  }

  getRandomEmoji = () => {
    let emojis: Array<any> = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"]
    let item = emojis[Math.floor(Math.random() * emojis.length)];
    return item
  }

  isCurrentLesson = (s: string, e: string) => {
    let start: number = parseInt(s);
    let end: number = parseInt(e);
    let currentTime: number = parseInt(`${new Date().getHours()}${new Date().getMinutes() < 10 ? "0" +  new Date().getMinutes() : new Date().getMinutes() }`);
    if (start <= currentTime && currentTime <= end) {
      return "ScheduleWeek--week-view-item-current"
    } else {
      return ""
    }
  }

  getSched = () => {
    let res: Array<any> = [];
    let week: Array<any> = [this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday]
    for (let i = 0; i < week.length; i++) {
      for(let j = 0; j < week[i].length; j++) {
        let same: number = 0
        for (let k = 0; k < week[i].length; k++) {
          if (week[i][j].DayNumber == week[i][k].DayNumber &&
              week[i][j].StartTime == week[i][k].StartTime &&
              week[i][j].EndTime == week[i][k].EndTime) {
                same = same + 1
              }
        }
        res.push(
          <div
            key={week[i][j].LSID + week[i][j].Date}
            className={`
              ScheduleWeek--week-view-item sw-d${i + 1}
              ${new Date(week[i][j].Date).getDate() == new Date().getDate() ? this.isCurrentLesson(week[i][j].StartTime, week[i][j].EndTime) : ''}
            `}
            style={{
              gridColumnStart: parseInt(week[i][j].DayNumber) + 1,
              gridColumnEnd: parseInt(week[i][j].DayNumber) + 1,
              gridRowStart: parseInt(week[i][j].PeriodStart) + 1,
              gridRowEnd: parseInt(week[i][j].PeriodEnd) + 2,
            }}
          >
            {week[i][j].Subject != null ? (
              <span className="ScheduleWeek--week-view-item-subject">{week[i][j].Subject} {same > 1 ? `+${same}` : null}</span>
            ) : null}
            {/* {week[i][j].Text != null ? (
              <span className="ScheduleWeek--week-view-item-text">{week[i][j].Text}</span>
            ) : null} */}
            <span className="ScheduleWeek--week-view-item-class-teacher">
              {week[i][j].Class != null ? (
                week[i][j].Class
              ) : null}
              {week[i][j].Teacher != null ? (
                ` - ${week[i][j].Teacher}`
              ) : null}
            </span>
            {/* <span className="ScheduleWeek--week-view-item-class-teacher">{week[i][j].Class} - {week[i][j].Teacher}</span> */}
            {week[i][j].room != null ? (
              <span className="ScheduleWeek--week-view-item-room">{week[i][j].room.code}</span>
            ) : null }
          </div>
        )
      }
    }
    return res;
  }

  getSchedBorders = () => {
    let arr: Array<any> = []
    for (let i = 1; i < 7; i++) {
      for (let j = 1; j < 17; j++) {
        arr.push(
          <div
            key={`c${i}-p${j}`}
            className={`ScheduleWeek--week-view-background c${i}-r${j} ${j == 16 ? 'sw-bg-b' : ''} ${i == 6 ? 'sw-bg-r' : ''} ${j == 1 ? 'sw-bg-header' : ''} ${i == 1 ? 'sw-bg-time' : ''}`}
            style={{gridColumnStart: i, gridColumnEnd: i, gridRowStart: j, gridRowEnd: j
          }}></div>
        )
      }
    }
    return arr
  }

  handleDateChange = (date: any) => {
    this.setState({
      currentDate: new Date(date),
      loading: true,
    })
    this.getDate(new Date(date))
  }

  handleDateChangePrev = () => {
    let newDate: Date = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), this.state.currentDate.getDate() - 7);
    this.setState({
      currentDate: newDate,
      loading: true,
    })
    this.getDate(newDate)
  }

  handleDateChangeNext = () => {
    let newDate: Date = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), this.state.currentDate.getDate() + 7);
    this.setState({
      currentDate: newDate,
      loading: true,
    })
    this.getDate(newDate)
  }

  public render() {
    return (
      <div className="ScheduleWeek--container">
        <div className="ScheduleWeek--top-bar">
          <Button className="ScheduleWeek--previous-week-button" onClick={this.handleDateChangePrev} disabled={this.state.loading}><KeyboardArrowLeft /></Button>
          <InlineDatePicker
            onlyCalendar
            variant="outlined"
            className="ScheduleWeek--current-date-button"
            value={this.state.currentDate}
            onChange={this.handleDateChange}
            disabled={this.state.loading}
          />
          <Button className="ScheduleWeek--next-week-button" onClick={this.handleDateChangeNext} disabled={this.state.loading}><KeyboardArrowRight /></Button>
        </div>
        <div className="ScheduleWeek--week-view-container">
          {this.getSchedBorders()}
          <div className="ScheduleWeek--week-view-header sw-empty"></div>
          <div className="ScheduleWeek--week-view-header sw-day1">
            <div className="ScheduleWeek--week-view-header-day">M</div>
            {this.getWeekNumbers(this.state.currentDate, 0)}
          </div>
          <div className="ScheduleWeek--week-view-header sw-day2">
            <div className="ScheduleWeek--week-view-header-day">T</div>
            {this.getWeekNumbers(this.state.currentDate, 1)}
          </div>
          <div className="ScheduleWeek--week-view-header sw-day3">
            <div className="ScheduleWeek--week-view-header-day">W</div>
            {this.getWeekNumbers(this.state.currentDate, 2)}
          </div>
          <div className="ScheduleWeek--week-view-header sw-day4">
            <div className="ScheduleWeek--week-view-header-day">T</div>
            {this.getWeekNumbers(this.state.currentDate, 3)}
          </div>
          <div className="ScheduleWeek--week-view-header sw-day5">
            <div className="ScheduleWeek--week-view-header-day">F</div>
            {this.getWeekNumbers(this.state.currentDate, 4)}
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p1">
            1
            <div className="ScheduleWeek--week-view-time">
              <span>8:30</span>
              <span>9:20</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p2">
            2
            <div className="ScheduleWeek--week-view-time">
              <span>9:20</span>
              <span>10:10</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p3">
            3
            <div className="ScheduleWeek--week-view-time">
              <span>10:30</span>
              <span>11:20</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p4">
            4
            <div className="ScheduleWeek--week-view-time">
              <span>11:20</span>
              <span>12:10</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p5">
            5
            <div className="ScheduleWeek--week-view-time">
              <span>12:10</span>
              <span>13:00</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p6">
            6
            <div className="ScheduleWeek--week-view-time">
              <span>13:00</span>
              <span>13:50</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p7">
            7
            <div className="ScheduleWeek--week-view-time">
              <span>13:50</span>
              <span>14:40</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p8">
            8
            <div className="ScheduleWeek--week-view-time">
              <span>15:00</span>
              <span>15:50</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p9">
            9
            <div className="ScheduleWeek--week-view-time">
              <span>15:50</span>
              <span>16:40</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p10">
            10
            <div className="ScheduleWeek--week-view-time">
              <span>17:00</span>
              <span>17:50</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p11">
            11
            <div className="ScheduleWeek--week-view-time">
              <span>17:50</span>
              <span>18:40</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p12">
            12
            <div className="ScheduleWeek--week-view-time">
              <span>18:40</span>
              <span>19:30</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p13">
            13
            <div className="ScheduleWeek--week-view-time">
              <span>19:30</span>
              <span>20:20</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p14">
            14
            <div className="ScheduleWeek--week-view-time">
              <span>20:20</span>
              <span>21:10</span>
            </div>
          </div>
          <div className="ScheduleWeek--week-view-time-container sw-c0-p15">
            15
            <div className="ScheduleWeek--week-view-time">
              <span>21:10</span>
              <span>22:00</span>
            </div>
          </div>
          {this.getSched()}
        </div>
        {this.state.loading ? (
          <div className="ScheduleWeek--week-view-loading">
            <Loader />
          </div>
        ) : null}
      </div>
    )
  }
}

export default ScheduleWeek as any;