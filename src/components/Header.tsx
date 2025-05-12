/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useTheme } from '../context/ThemeContext';
import { useDataContext } from '../context/DataContext';
import moon from '../assets/moon.png';
import sun from '../assets/sun.png';
import usersData from '../users.json';

interface HeaderProps {
  userId: number | 'guest';
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  const { theme, setTheme, themeVars } = useTheme();
  const { fetchTimeData } = useDataContext();
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [userName, setUserName] = useState('Misafir');

  useEffect(() => {
    const fetchData = async () => {
      const { timeStr, dateStr } = await fetchTimeData(userId);
      setTimeStr(timeStr);
      setDateStr(dateStr);

      if (userId === 'guest') {
        setUserName('Misafir');
      } else {
        const user = (usersData as any[]).find((u) => u.id === userId);
        if (user) setUserName(user.name);
      }
    };

    fetchData();
  }, []);

  const headerCss = css`
    background: ${themeVars.header};
    border-bottom-left-radius: 48px;
    border-bottom-right-radius: 48px;
    padding: 32px 32px 60px 32px;
    display: flex;
    justify-content: space-between;
  `;
  const headerLeftCss = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
  `;
  const headerRightCss = css`
    display: flex;
    align-items: start;
    justify-content: end;
  `;
  const timeCss = css`
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 4px;
    margin: 8px 0 0 0;
    color: ${themeVars.text};
  `;
  const dateTextCss = css`
    font-size: 15px;
    font-weight: 600;
    margin-top: 4px;
    color: ${themeVars.text};
  `;
  const greetingCss = css`
    font-size: 15px;
    font-weight: 600;
    margin-top: 16px;
    color: ${themeVars.text};
  `;
  const themeButtonCss = css`
    background: ${themeVars.modeButton};
    outline: 4px solid ${themeVars.modeButtonBorder};
    border-radius: 50%;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `;

  return (
    <div css={headerCss}>
      <div css={headerLeftCss}>
        <div css={greetingCss}>Günaydın, {userName}!</div>
        <div css={timeCss}>{timeStr}</div>
        <div css={dateTextCss}>{dateStr}</div>
      </div>
      <div css={headerRightCss}>
        <button css={themeButtonCss} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          <img src={theme === 'light' ? moon : sun} alt="Tema" style={{ width: 20, height: 20 }} />
        </button>
      </div>
    </div>
  );
};

export default Header;