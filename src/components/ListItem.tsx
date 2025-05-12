/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import arrowRight from '../assets/arrow-right.png';
import { useTheme } from '../context/ThemeContext';

interface ListItemProps {
  timezone: string;
}

const ListItem: React.FC<ListItemProps> = ({ timezone }) => {

const { themeVars } = useTheme();

const listItemCss = css`
  background: ${themeVars.card};
  border-radius: 8px;
  padding: 18px 20px;
  font-size: 15px;
  font-weight: 400;
  color: ${themeVars.cardText};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #d1d8f6;
  }
`;

const arrowRightCss = css`
  color: ${themeVars.cardText};
`;
const arrowCss = css`
  background: ${themeVars.card};
  position: absolute;
  right: -15px;
  border: 4px solid ${themeVars.background};
  border-radius: 25px;
  display: flex;
  padding: 4px;
`;
  const navigate = useNavigate();
  return (
    <div
      css={listItemCss}
      onClick={() => navigate(`/world-time-detail/${encodeURIComponent(timezone)}`)}
    >
      {timezone.replace('/', ', ')}
      <div css={arrowCss}>
        <img src={arrowRight} alt="Detay" css={arrowRightCss} />
      </div>
    </div>
  );
};

export default ListItem; 