/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useDataContext } from '../context/DataContext';
import { css } from '@emotion/react';
import { useTheme } from '../context/ThemeContext';
import searchIcon from '../assets/search.png';
import ListItem from '../components/ListItem';
import Header from '../components/Header';
import Splash from '../components/Splash';

const Home: React.FC = () => {
  const { themeVars } = useTheme();
  const id = localStorage.getItem('id') === 'guest' ? 'guest' : Number(localStorage.getItem('id'));

  const { timezones, loading, error, getTimeZones } = useDataContext();

  const [search, setSearch] = React.useState('');
  const [visibleTimezones, setVisibleTimezones] = useState<string[]>([]); // Görünen zaman dilimleri
  const [itemsToShow, setItemsToShow] = useState(10); // İlk başta gösterilecek öğe sayısı

  useEffect(() => {
    getTimeZones();
  }, []);

  useEffect(() => {
    // Filtrelenmiş zaman dilimlerini güncelle
    const filteredTimezones = timezones.filter((tz) =>
      tz.toLowerCase().includes(search.toLowerCase())
    );
    setVisibleTimezones(filteredTimezones.slice(0, itemsToShow));
  }, [timezones, search, itemsToShow]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setItemsToShow((prev) => prev + 10); // 10 öğe daha yükle
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const searchWrapperCss = css`
    display: flex;
    align-items: center;
    background: ${themeVars.inputBg};
    border-radius: 32px;
    margin: -24px auto 24px auto;
    width: 310px;
    max-width: 310px;
    height: 44px;
    padding: 0 24px;
  `;
  const searchInputCss = css`
    border: none;
    outline: none;
    font-size: 12px;
    color: ${themeVars.inputText};
    background: transparent;
    flex: 1;
    margin-left: 10px;
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    font-weight: 300;
  `;
  const listCss = css`
    width: 348px;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position:relative;
  `;

  if (loading) {
    return <Splash />;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red' }}>Hata: {error}</div>;
  }

  return (
    <div style={{ background: themeVars.background, minHeight: '100vh' }}>
<Header userId={id} />
      <div css={searchWrapperCss}>
        <img src={searchIcon} alt="Ara" style={{ width: 20, height: 20, color:'#000000' }} />
        <input
          css={searchInputCss}
          type="text"
          placeholder="Arama"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div css={listCss}>
        {visibleTimezones.map((tz) => (
          <ListItem key={tz} timezone={tz} />
        ))}
      </div>
    </div>
  );
};

export default Home;







