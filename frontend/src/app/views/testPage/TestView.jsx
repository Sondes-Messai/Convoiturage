import React, { useState } from 'react';
import ChatRoom from './../../components/ChatRoom';

const TestView = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1>Chat App</h1>
      <ChatRoom/>
    </div>
  );
};

export default TestView;
