import React, { PropTypes } from 'react';
import { connect } from 'react-refetch'

import moment from 'moment';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

class Runkeeper extends React.Component {

  componentWillMount() {
    if (!this.context.didMount) {
      return;
    }
    const { activities } = this.props;
    this.context.shareLoading(activities.loading);
  }

  render() {
    const { activities } = this.props;
    const styles = {
      margin: 32,
      width: 300

    };
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {activities.fulfilled && activities.value.items
          // .sort((a, b) => {
          //   return (a.duration / a.total_distance) - (b.duration / b.total_distance)
          // })
          .map(activity => {
            const totalDistance = (activity.total_distance / 1000).toFixed(1);
            const totalDuration = moment.duration(activity.duration, 'seconds');
            const totalMins = Math.floor(totalDuration.asMinutes());
            const totalSecs = Math.floor(totalDuration.asSeconds()) - totalMins * 60;
            const averageSec = moment.duration(activity.duration / totalDistance, 'seconds');
            const mins = Math.floor(averageSec.asMinutes());
            const secs = Math.floor(averageSec.asSeconds()) - mins * 60;
            return (
              <Card key={activity.uri} style={styles}>
                <CardTitle
                  title={`${mins}分${secs}秒/kmのペースの${activity.type}`}
                  subtitle={activity.start_time}
                />
                <CardText>
                  {`距離: ${totalDistance}km, 時間: ${totalMins}分${totalSecs}秒`}
                </CardText>
              </Card>
            );
          })}
      </div>
    );
  }

  static get contextTypes() {
    return {
      shareLoading: PropTypes.func,
      didMount: PropTypes.bool
    };
  }
}

export default connect(props => ({
  activities: '/api/healthgraph/activities',
}))(Runkeeper);
