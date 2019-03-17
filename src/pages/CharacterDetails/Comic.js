/**
 *  Comic `card` displayed in the character details page
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import ZoomIcon from '@material-ui/icons/ZoomIn';
import * as PropTypes from 'prop-types';

const Comic = memo(({
  thumbnail,
  description,
  title
}) => {
  const thumbnailUrl = `${thumbnail.path}.${thumbnail.extension}`;

  return (
    <Container>
      <Cover
        url={thumbnailUrl}
        alt={title}
      >
        <ZoomOverlayLink href={thumbnailUrl}>
          <ZoomIcon/>
        </ZoomOverlayLink>
      </Cover>
      <Information>
        <Typography
          variant='headline'
          gutterBottom
          noWrap
        >
          {title}
        </Typography>
        <Typography>
          {`${(description || '').substring(0, 200)}...`}
        </Typography>
        <ReadMore>Read more</ReadMore>
      </Information>
    </Container>
  );
});

/* STYLES */
const Container = styled.div`
  display: flex;
  height: 250px;
  width: 100%;
  margin-bottom: 20px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

const ZoomOverlayLink = styled.a.attrs({
  target: '_blank'
})`
  text-decoration: none;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  transition: all 0.2s ease-in-out;
`;

const Cover = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  width: 200px;
  background-image: url(${p => p.url});
  background-size: cover;
  background-position: center;
  
  &:hover ${ZoomOverlayLink} {
    opacity: 1;
  }
`;

const Information = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ReadMore = styled(Typography).attrs({
  component: 'a'
})`
  flex-grow: 1;
  display: flex !important;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  text-decoration: underline;
`;

/* PROP-TYPES */
Comic.propTypes = {
  thumbnail: PropTypes.shape({
    extension: PropTypes.string,
    path: PropTypes.string
  }),
  description: PropTypes.string,
  title: PropTypes.string
};

export default Comic;