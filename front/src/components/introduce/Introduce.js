import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Container} from "react-bootstrap";


import '../css/introduce.css';

import CarbonChart1 from "../chart/CarbonChart1.js";
import CarbonChart2 from "../chart/CarbonChart2.js";
import CarbonChart3 from "../chart/CarbonChart3.js";


function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography align='left'>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function Introduce() {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      {/* <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'fixed', height: 224 }}> */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered>
          {/* <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      > */}
              <Tab label="증가하는 탄소배출량" {...a11yProps(0)} />
            

           
              <Tab label="탄소로 인한 가뭄과 기온이상" {...a11yProps(1)} />
            

            
            <Tab label="증가하는 탄소농도" {...a11yProps(2)} />
           
          </Tabs>
        </Box>

          
            <TabPanel value={value} index={0}>
              <div className='Container'>
                <div className='textContainer'>
                  <p className='text1'>증가하는 탄소배출량</p>
                  <p className='text2'>한국은 2018~2020년 온실가스 감축 목표를 이행하지 못하였습니다.
                  <br/>
                  2018년 배출량이 정점을 찍은데다 
                  <br/>
                  2020년에는 코로나19 확산에 따른 경제성장 둔화까지 겹쳐
                  <br/>
                  전체 배출량은 줄었으나, 
                  <br/>
                  에너지전환·건물·수송 등 주요 부문에서 감축 목표 이행에 실패하면서
                  <br/>
                  전체 목표도 채우지 못하였습니다
                  </p>
                  <p className='text2'>환경부에서 받은 ‘2018~2020 온실가스 감축 이행실적 평가’를 보면,
                  <br/>
                  이 기간 우리나라에서 배출된 온실가스는 연평균 6억9230만톤으로 
                  <br/>
                  목표치 6억9090만톤보다 140만톤(0.2%) 많았다.
                  <br/>
                    2019년과 2020년에는 각각 전년보다 3.5%와 7.5% 줄며 
                    <br/>
                  감축 목표를 달성했으나, 
                  <br/>
                  2018년 배출량이 역대 최고인 7억2700만톤에 달하면서 
                  <br/>
                  결과적으로 연평균 감축 목표치를 이루는데는 실패했습니다</p>
                </div>

                <div className='chartDeliver'>
                  <CarbonChart1 />
                </div>
              </div>  
            </TabPanel>
            

         
          
            
          

        

        
          <TabPanel value={value} index={1}>
              <div className='Container'>
                <div className='textContainer'>
                  <p className='text1'>탄소로 인한 가뭄과 기온이상</p>
                  <p className='text2'>한국은 2018~2020년 온실가스 감축 목표를 이행하지 못하였습니다.
                  <br/>
                  2018년 배출량이 정점을 찍은데다 
                  <br/>
                  2020년에는 코로나19 확산에 따른 경제성장 둔화까지 겹쳐
                  <br/>
                  전체 배출량은 줄었으나, 
                  <br/>
                  에너지전환·건물·수송 등 주요 부문에서 감축 목표 이행에 실패하면서
                  <br/>
                  전체 목표도 채우지 못하였습니다
                  </p>
                  <p className='text2'>환경부에서 받은 ‘2018~2020 온실가스 감축 이행실적 평가’를 보면,
                  <br/>
                  이 기간 우리나라에서 배출된 온실가스는 연평균 6억9230만톤으로 
                  <br/>
                  목표치 6억9090만톤보다 140만톤(0.2%) 많았다.
                  <br/>
                    2019년과 2020년에는 각각 전년보다 3.5%와 7.5% 줄며 
                    <br/>
                  감축 목표를 달성했으나, 
                  <br/>
                  2018년 배출량이 역대 최고인 7억2700만톤에 달하면서 
                  <br/>
                  결과적으로 연평균 감축 목표치를 이루는데는 실패했습니다</p>
                </div>
                
                <div className='chartDeliver'>
                  <CarbonChart2 />
                </div>
              </div>  
          </TabPanel>
        

        
          <TabPanel value={value} index={2}>
          <div className='Container'>
                <div className='textContainer'>
                  <p className='text1'>증가하는 탄소농도</p>
                  <p className='text2'>한국은 2018~2020년 온실가스 감축 목표를 이행하지 못하였습니다.
                  <br/>
                  2018년 배출량이 정점을 찍은데다 
                  <br/>
                  2020년에는 코로나19 확산에 따른 경제성장 둔화까지 겹쳐
                  <br/>
                  전체 배출량은 줄었으나, 
                  <br/>
                  에너지전환·건물·수송 등 주요 부문에서 감축 목표 이행에 실패하면서
                  <br/>
                  전체 목표도 채우지 못하였습니다
                  </p>
                  <p className='text2'>환경부에서 받은 ‘2018~2020 온실가스 감축 이행실적 평가’를 보면,
                  <br/>
                  이 기간 우리나라에서 배출된 온실가스는 연평균 6억9230만톤으로 
                  <br/>
                  목표치 6억9090만톤보다 140만톤(0.2%) 많았다.
                  <br/>
                    2019년과 2020년에는 각각 전년보다 3.5%와 7.5% 줄며 
                    <br/>
                  감축 목표를 달성했으나, 
                  <br/>
                  2018년 배출량이 역대 최고인 7억2700만톤에 달하면서 
                  <br/>
                  결과적으로 연평균 감축 목표치를 이루는데는 실패했습니다</p>
                </div>
                
                <div className='chartDeliver'>
                  <CarbonChart3 />
                </div>
              </div>  
          </TabPanel>
  
      </Box>
    </Container>
    
    ); 
}
