import * as React from 'react';
import './ScheduleToday.css';

// Components
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'

// Material-UI
import LocationOnIcon from '@material-ui/icons/LocationOnRounded';
import ClassIcon from '@material-ui/icons/ClassRounded';

type Lesson = {
  Class: string | null,
  Date: Date,
  DayNumber: string,
  EndTime: string,
  LSID: string,
  PeriodEnd: string,
  PeriodStart: string,
  StartTime: string,
  StartFlags: string | null,
  Subject: string,
  Teacher: string,
  Text: string,
  room: Room
}

type Room = {
  building: string,
  code: string,
  latitude: string,
  longitude: string
}

type Props = {
  code: string
  type: number
}

type State = {
  code: string,
  schedule: Array<Lesson> | null
}

const api: string | undefined = process.env.REACT_APP_API;

class ScheduleToday extends React.Component<Props, State> {
  state: State = {
    code: this.props.code,
    schedule: []
  };

  componentWillReceiveProps = (nextProps: Readonly<Props>) => {
    let today: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    let url: string = `https://cors-anywhere.herokuapp.com/${api}${nextProps.code}&type=${this.props.type}&startDate=${today}&endDate=${today}&json`
    console.log(url)
    fetch(url, {headers: {'Origin': '',}}).then(res => res.json())
      .then(data => {
        console.log(data.lesson)
        if (data.lesson == null) {
          console.log(`no schedule for today`)
          this.setState({
            schedule: null
          })
        } else {
          this.setState({
            schedule: data.lesson
          })
        }
      })
      .catch(err => console.log(err))
  }

  getTime = (time: string) => {
    if(time.length < 4) {
      return `${time.substring(0,1)}:${time.substring(1,3)}`
    } else {
      return `${time.substring(0,2)}:${time.substring(2,4)}`
    }
  }

  isCurrentLesson = (s: string, e: string) => {
    let start: number = parseInt(s);
    let end: number = parseInt(e);
    let currentTime: number = parseInt(`${new Date().getHours()}${new Date().getMinutes()}`);
    if (start <= currentTime && currentTime <= end) {
      return "Item--container-current"
    } else {
      return ""
    }
  }

  public render() {
    return (
      <div style={{ width: '-webkit-fill-available' }}>
        <span className="ScheduleToday--title">{this.props.code.toUpperCase()}</span>
        {this.state.schedule != null ? (
            <div>
              {this.state.schedule.length > 0 ? (
                <div className="ScheduleToday--container">
                  {this.state.schedule.map(item => (
                    <div key={item.LSID} className={`Item--container ${this.isCurrentLesson(item.StartTime, item.EndTime)}`}>
                      <div className="Item--time">
                        <div className="Item--time-start">
                          <span className="Item--time-start-period">{item.PeriodStart} - </span>
                          <span className="Item--time-start-time">{this.getTime(item.StartTime)}</span>
                        </div>
                        <div className="Item--time-end">
                          <span className="Item--time-end-period">{item.PeriodEnd} - </span>
                          <span className="Item--time-end-time">{this.getTime(item.EndTime)}</span>
                        </div>
                      </div>
                      <div>
                        <div className="Item--line"></div>
                      </div>
                      <div className="Item--details">
                        <span className="Item--details-subject">{item.Subject}</span>
                        {item.Class == undefined ? (
                          <span className="Item--details-class-teacher">{item.Teacher.toUpperCase()}</span>
                        ) : (
                          <span className="Item--details-class-teacher"><ClassIcon className="Item--details-icon" />{item.Class.toUpperCase()} - {item.Teacher.toUpperCase()}</span>
                        )}
                        <span className="Item--details-room"><LocationOnIcon className="Item--details-icon" />{item.room.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <Loader />}
            </div>
          ) :
          <EmptyState kind='no-schedule' />}
      </div>
    )
  }
}

export default ScheduleToday as any;