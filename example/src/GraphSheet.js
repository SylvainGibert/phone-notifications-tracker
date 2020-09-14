import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleSheets } from '../../dist';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';
import '../node_modules/react-vis/dist/style.css'; // css styling from the react-vis node module
import './App.css';


/**
 *
 * the below is for running the example in the context of this repo.
 *
 * for your app, use:
 *
 * import { withGoogleSheets } from 'react-db-google-sheets';
 *
 */

 // build string date format 'dd/mm/YYYY H:m' from dirty like this 'September 11, 2020 at 01:13AM'
const dateformat = (string) => {
  const months = {
    January: '01',
    Februrary: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12'
  };

  const month = parseInt(months[string.split(' ')[0]]);
  const day = parseInt(string.substr(10,2));
  const year = parseInt(string.substr(14,4));

  const dirtyHour = string.split(' ')[string.split(' ').length - 1];

  let hour = parseInt(dirtyHour.substr(0,2));
  const amPm = dirtyHour.substr(5,2);

  if (amPm === 'PM') {
    hour = parseInt(hour) +12
  }


  return {year: year, month: month, day: day, hour: hour};
}

 let hourByHourStats = [];

 const getStatFromToDayFormattedArray = (hourByHourStats) => {
   const today = new Date();
   console.log(today);
   const year = parseInt(today.getFullYear());
   const month = parseInt(today.getMonth()) + 1;
   const day = parseInt(today.getDate());

   const todayArray = hourByHourStats[year][month][day];

   let formattedArray = [];

   let id = 0;
   todayArray.map((data) => {
     formattedArray.push({ x: id, y: data });
     id++
   });

   console.log(formattedArray);

   return formattedArray;
 }


const GraphSheet = (props) => (
  <div>
    {props.db.tracker.map((data) => {
      const timeDatas = dateformat(data.date);
      if (hourByHourStats[timeDatas.year] === undefined) {
        hourByHourStats[timeDatas.year] = [];
      } 
      if (hourByHourStats[timeDatas.year][timeDatas.month] === undefined) {
        hourByHourStats[timeDatas.year][timeDatas.month] = [];
      }
      if (hourByHourStats[timeDatas.year][timeDatas.month][timeDatas.day] === undefined) {
        hourByHourStats[timeDatas.year][timeDatas.month][timeDatas.day] = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

        ];
      }
      if (hourByHourStats[timeDatas.year][timeDatas.month][timeDatas.day][timeDatas.hour] === undefined) {
        hourByHourStats[timeDatas.year][timeDatas.month][timeDatas.day][timeDatas.hour] = 0;
      }

      if (hourByHourStats[timeDatas.year] !== undefined &&
        hourByHourStats[timeDatas.year][timeDatas.month] !== undefined &&
        hourByHourStats[timeDatas.year][timeDatas.month][timeDatas.day] !== undefined &&
        hourByHourStats[timeDatas.year][timeDatas.month][timeDatas.day][timeDatas.hour] !== undefined) {

      }
      hourByHourStats[timeDatas.year][timeDatas.month][timeDatas.day][timeDatas.hour] ++
    })}
    <XYPlot
  width={1000}
  height={300}>
  <VerticalGridLines />
  <HorizontalGridLines />
  <XAxis />
  <YAxis />
  <LineSeries data={getStatFromToDayFormattedArray(hourByHourStats)}/>
</XYPlot>
    <button className="btn btn-primary" onClick={props.refetch}>
      Refresh
    </button>
  </div>
);

GraphSheet.propTypes = {
  db: PropTypes.shape({
    tracker: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default withGoogleSheets('tracker')(GraphSheet);
