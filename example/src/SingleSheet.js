import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';


/**
 *
 * the below is for running the example in the context of this repo.
 *
 * for your app, use:
 *
 * import { withGoogleSheets } from 'react-db-google-sheets';
 *
 */
import { withGoogleSheets } from '../../dist';


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

  const month = months[string.split(' ')[0]];
  const day = string.substr(10,2);
  const year = string.substr(14,4) ;

  const dirtyHour = string.split(' ')[string.split(' ').length - 1];

  let hour = dirtyHour.substr(0,2);
  const amPm = dirtyHour.substr(5,2);

  if (amPm === 'PM') {
    hour = parseInt(hour) +12
  }

  const minutes = dirtyHour.substr(3,2);

  return day + '/' + month + '/' + year + ' ' + hour + ':' + minutes;
}

const SingleSheet = (props) => (
  <div>
    <Table striped bordered hover>
      <thead className='d-flex'>
        <th className='col-2'>Date</th>
        <th className='col-2'>Application</th>
        <th className='col-3'>Description</th>
        <th className='col-5'>Contenu</th>
      </thead>
      {props.db.tracker.reverse().map((data) => (
        <tbody  className='d-flex'>
          <td className="col-2">{dateformat(data.date)}</td>
          <td className="col-2">{data.application}</td>
          <td className="col-3">{data.description}</td>
          <td className="col-5">{data.content}</td>
        </tbody>  
      ))}
    </Table>
    <button className="btn btn-primary" onClick={props.refetch}>
      Refresh
    </button>
  </div>
);

SingleSheet.propTypes = {
  db: PropTypes.shape({
    tracker: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default withGoogleSheets('tracker')(SingleSheet);
