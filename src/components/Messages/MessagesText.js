import { makeStyles } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import { Fragment, useEffect, useRef } from 'react';
import Message from './Message';

const useStyles= makeStyles(() => ({
  container:{
    overflow: 'auto',
    backgroundColor: '#F5F6F8',
    flexGrow: 4,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
  },
}))

const MessagesText = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const conversation = MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId);
  const messages = MessagesStore.userCons[0] ? conversation.messages : null;

  const dummyDiv = useRef(null)

  useEffect(() => {
    if (dummyDiv){
      dummyDiv.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages.length])

  const classes = useStyles()

  return (
    <div className={classes.container} >
        {messages && messages.map((m, index) => <Message key = {index} message = {m}/>)}
        <div ref={dummyDiv}></div>
    </div>
  )
}))

export default MessagesText;