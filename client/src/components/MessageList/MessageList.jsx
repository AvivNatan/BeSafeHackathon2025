import { useEffect, useRef, useState } from 'react';
import Message from "../Message/Message";
import "./MessageList.css";
import PropTypes from 'prop-types';

const MessageList = ({ messages }) => {
  const containerRef = useRef(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only auto-scroll if we're near the bottom or if shouldAutoScroll is true
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages]);

  // Handle scroll events to determine if user has manually scrolled up
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;
    
    // Update auto-scroll behavior based on scroll direction and position
    if (scrollTop < lastScrollTop.current) {
      // Scrolling up
      setShouldAutoScroll(false);
    } else if (isNearBottom) {
      // Scrolling down and near bottom
      setShouldAutoScroll(true);
    }
    
    lastScrollTop.current = scrollTop;
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight;
      const height = containerRef.current.clientHeight;
      containerRef.current.scrollTop = scrollHeight - height;
    }
  };

  return (
    <div 
      className="messages-container"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message.message}
          timestamp={message.timestamp}
          isUserMessage={message.isUserMessage}
          isSuspicious={message.isSuspicious}
        />
      ))}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
      isUserMessage: PropTypes.bool.isRequired,
      isSuspicious: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default MessageList;