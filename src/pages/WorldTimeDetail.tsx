/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme } from '../context/ThemeContext';
import { useDataContext } from '../context/DataContext';
import arrowLeft from '../assets/arrow-left.png';
import Splash from '../components/Splash';

const WorldTimeDetail: React.FC = () => {
  const { themeVars } = useTheme();
  const { fetchTimeDetail } = useDataContext();
  const { timezone } = useParams<{ timezone: string }>();
  const decodedTimezone = timezone ? decodeURIComponent(timezone) : '';
  const navigate = useNavigate();

  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!decodedTimezone) return;
      try {
        setLoading(true);
        const data = await fetchTimeDetail(decodedTimezone);
        if (data) {
          setTimeData(data);
        } else {
          setError('Veri alınamadı.');
        }
      } catch (err) {
        setError('Bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedTimezone, fetchTimeDetail]);

  if (loading) {
    return <Splash />;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;
  }

  if (!timeData) {
    return null;
  }

  const headerCss = css`
    background: ${themeVars.header};
    border-bottom-left-radius: 48px;
    border-bottom-right-radius: 48px;
    padding: 24px 0 32px 0;
    text-align: center;
    position: relative;
  `;
  const backCss = css`
    position: absolute;
    left: 24px;
    top: 32px;
    font-size: 28px;
    cursor: pointer;
    background: none;
    border: none;
    color: ${themeVars.text};
  `;
  const titleCss = css`
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-top: 8px;
    color: ${themeVars.text};
  `;
  const clockRowCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0 0 0;
  `;
  const clockBoxCss = css`
    border: 2px solid ${themeVars.clockBoxBorder};
    border-radius: 16px;
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 79px;
    font-weight: 700;
    margin: 0 8px;
    background: ${themeVars.clockBoxBackground};
    color: ${themeVars.cardText};
  `;
  const colonCss = css`
    font-size: 48px;
    font-weight: 700;
    margin: 0 8px;
    color: ${themeVars.text};
  `;
  const cityCss = css`
    font-size: 24px;
    font-weight: 600;
    margin-top: 28px;
    text-align: center;
    line-height: 1.5;
    color: ${themeVars.text};
  `;
  const countryCss = css`
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    line-height: 1.5;
    color: ${themeVars.text};
  `;
  const infoCss = css`
    font-size: 18px;
    font-weight: 500;
    margin-top: 10px;
    line-height: 1.5;
    text-align: center;
    color: ${themeVars.text};
    display: flex;
    flex-direction: column;
    gap: 4px;
  `;

  function getCityCountry(timezone: string) {
    const [country, city] = timezone.split('/');
    const cityParts = city.split('_');
    if (cityParts.length > 1) {
      return { country, city: cityParts.join(' ') };
    }
    if (cityParts.length === 1) {
      return { country, city: cityParts[0] };
    }
    if (cityParts.length === 0) {
      return { country, city: '' };
    }
  }

  const { country, city } = getCityCountry(decodedTimezone);

  return (
    <div style={{ background: themeVars.background, minHeight: '100vh' }}>
      <div css={headerCss}>
        <button css={backCss} onClick={() => navigate(-1)}>
          <img src={arrowLeft} alt="Geri" style={{ width: 24, height: 24 }} />
        </button>
        <div css={titleCss}>WORLD TIME</div>
      </div>
      <div css={clockRowCss}>
        <div css={clockBoxCss}>{timeData.timeStr.split(':')[0]}</div>
        <div css={colonCss}>:</div>
        <div css={clockBoxCss}>{timeData.timeStr.split(':')[1]}</div>
      </div>
      <div css={cityCss}>{city}</div>
      <div css={countryCss}>{country}</div>
      <div css={infoCss}>
        <p>
          {timeData.dayStr}
        </p>
        <p>
          {timeData.dateStr}
        </p>
      </div>
    </div>
  );
};

export default WorldTimeDetail;