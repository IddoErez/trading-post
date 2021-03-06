import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { Link, useHistory } from "react-router-dom";
import Buttons from './Buttons';
const moment = require('moment');

const useStyles = makeStyles(() => ({
  consHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  conAvatar: {
    height: 70,
    width: 70,
    cursor: 'pointer'
  }
}))

const ConHeader = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const conversation = MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId);
  const partner = MessagesStore.currentConId && MessagesStore.userCons[0] ? conversation.users.find(u => u._id !== MessagesStore.userId) : {};
  const profileAddress = `/profile/${partner._id}`;
  const status = MessagesStore.userCons[0] ? conversation.status : null;
  const numOfMessages = MessagesStore.userCons[0] ? conversation.messages.length - 1 : null;
  const firstSender = MessagesStore.userCons[0] && conversation.messages[0] ? conversation.messages[0].senderId : null;
  const activationDate = MessagesStore.userCons[0] && conversation.messages[1] ? moment(conversation.messages.find(m => m.senderId === 'sestem message')).format('DD/MM/YYYY') : null;
  const requestDate = MessagesStore.userCons[0] ? moment(conversation.messages[0].message_time).format('DD/MM/YYYY') : null;
  const endDate = MessagesStore.userCons[0] ? moment(conversation.messages[numOfMessages].message_time).format('DD/MM/YYYY') : null;

  let statusText = '';
  switch (status) {
    case 'Active': statusText = `Active barter since ${activationDate}`;
    break;
    case 'Pending': firstSender === MessagesStore.userId ? statusText = `Request from ${requestDate}` : statusText = `Offer from ${requestDate}`;
    break;
    case 'Completed': statusText = `Completed barter since ${endDate}`;
    break;
    case 'Cancelled': statusText = `Cancelled barter since ${endDate}`;
    break;
    default: statusText = ''
  }

  let history = useHistory();

  const redirectToProfile = () => {
    history.push(profileAddress)
  }

  const classes = useStyles()

  return (
    <div className={classes.consHeader}>
        <Avatar onClick={redirectToProfile} className={classes.conAvatar} alt={partner.firstName} src={partner.profilePic && partner.profilePic.imageUrl}/>
        <div style={{marginLeft: 15}}>
          <Typography variant='h5'>{`${partner.firstName} ${partner.lastName}`}</Typography>
          <Typography variant='subtitle2'>{statusText}</Typography>
        </div>
        {conversation.partnerTyping === true && <Typography style={{marginLeft: 15}}>{partner.firstName}`s typing...</Typography>}
        <Buttons />
    </div>
  )
}))

export default ConHeader;