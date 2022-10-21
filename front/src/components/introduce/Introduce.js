import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Container, Row, Col} from "react-bootstrap";
import Bike_introduce from "./Bike_introduce.png";

import './introduce.css';

import CarbonChart1 from "../chart/CarbonChart1.js";
import CarbonChart2 from "../chart/CarbonChart2.js";
import CarbonChart3 from "../chart/CarbonChart3.js";
import CarbonChart4 from "../chart/CarbonChart4.js";
import GlobalStyle from "../GlobalStyle";


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
    <>
    <GlobalStyle />
    <div class="RegisterDiv"></div>
    <Container fluid className="container">
      
      <Box sx={{ width: '100%',marginTop: "50px"}}>
        <Box sx={{ borderBottom: 1, borderColor: '#999' }}>
          <Tabs value={value} onChange={handleChange} centered >
          
              <Tab label="🌁탄소배출과 가뭄 및 기온 이상" {...a11yProps(0)} style={{color: "black", fontSize: "18px", fontWeight: "bold"}}/>
            

           
              <Tab label="🚗교통부문에서의 탄소배출" {...a11yProps(1)} style={{color: "black", fontSize: "18px", fontWeight: "bold"}}/>
            

            
              <Tab label="🚲탄소배출을 줄일 수 있는 방법" {...a11yProps(2)} style={{color: "black", fontSize: "18px", fontWeight: "bold"}}/>
           
          </Tabs>
        </Box>

          
            <TabPanel value={value} index={0}>
              <div className='Container'>
                <div className='textContainer'>
                  <br/>
                  <br/>
                  <p className='text2'>
                  <p className='text1'>탄소배출 현황</p>
                  환경부에서 받은 ‘2018~2020 온실가스 감축 이행실적 평가’를 보면,
                  <br/>
                  이 기간 우리나라에서 배출된 온실가스는 
                  <span style={{
                      fontWeight: "bold"
                      }}>
                    연평균 6억9230만톤
                    </span>
                    으로
                  <br/>
                  목표치 6억9090만톤보다 140만톤(0.2%) 많았습니다
                  <br/>
                    2019년과 2020년에는 각각 전년보다 3.5%와 7.5% 줄며 
                    <br/>
                  감축 목표를 달성했으나, 
                  <br/>
                  2018년 배출량이 {""}
                  <span style={{fontWeight: "bold"}}>역대 최고인 7억2700만톤</span>
                  에 달하면서 
                  <br/>
                  결과적으로 연평균 탄소 배출이 더욱 증가했습니다
                  <br/>
                  <span 
                    style={{
                      fontWeight: "bold",
                      fontSize:"15px",
                      color: "#999999"
                      }}>
                    (환경부)
                  </span>
                  </p>

                  <br/>
                  <br/>
                  <br/>
                  <br/>

                  <p className='text1'>탄소농도로 인한 가뭄과 기온이상</p>
                  <p className='text2'>산업혁명을 통해 인류가 석탄, 석유 등 화석에너지를 사용하기 시작하면서, 대기 중에 배출되는 이산화탄소가 급증하기 시작했습니다
                  <br/>
                  <span style={{
                      fontWeight: "bold"
                      }}>
                    오늘날 대기 중 이산화탄소의 양은 19세기에 비해 33% 증가하였고 지구의 평균 온도도 0.6~0.7도 이상 상승했습니다
                  </span>
                  <br/>
                  <br/>
                  이산화탄소 농도 증가 영향은 한반도에서 특히 강하게 나타나고 있습니다 
                  <br/>
                  한국 기후변화 평가 보고서에 따르면, {""}
                  <span style={{
                      fontWeight: "bold"
                      }}>
                    
                    우리나라에 가뭄, 집중호우, 기상현상 증가, 폭염 사망자와 알레르기 환자 증가 {""}
                  </span>
                  등의 피해를 가져오리라 예측되고 있습니다
                  <br/>
                  <span 
                    style={{
                      fontWeight: "bold",
                      fontSize:"15px",
                      color: "#999999"
                      }}>
                    (기상청)
                  </span>
                  </p>
                </div>

                <Row>
                  <Col>
                    <div className='chartDeliver'>
                      <CarbonChart1 />
                    </div>
                    <div className='chartDeliver'>
                    <CarbonChart2 />
                    </div>
                  </Col>
                </Row>
              </div>  
            </TabPanel>
            

        
          <TabPanel value={value} index={1}>
          <div className='Container1'>
                <div className='textContainer1'>
                  <br/>
                  <br/>
                  <p className='text1'>교통부문에서의 탄소배출</p>
                  <p className='text2'>우리나라 온실가스를 배출하는 분야 중
                  <br/>
                  가장 많이 차지하는 분야는 
                  <span style={{
                      fontWeight: "bold"
                      }}>교통부문</span>
                  입니다
                  <br/>
                  교통부문 중에서도 {""}
                  <span style={{
                      fontWeight: "bold"
                      }}>도로의 온실가스 배출비율은 무려 96%이며,
                  </span>
                  <br/>
                  사람들이 타고 다니는 승용차는 전체 교통부문 탄소 배출 중 
                  <br/>
                  <span style={{
                      fontWeight: "bold"
                      }}>47%</span>
                  를 차지하고 있습니다                               
                  <br/>
                  <span 
                    style={{
                      fontWeight: "bold",
                      fontSize:"15px",
                      color: "#999999"
                      }}>
                    (환경부)
                  </span>
                  </p>
                </div>
 
                <div className='chartDeliver1'>
                  <CarbonChart3 />
                </div>
               
              </div>  
          </TabPanel>


          <TabPanel value={value} index={2}>
          <div className='Container'>
                <div className='textContainer'>
                  
                  
                  <p className='main'>
                    우리도 자전거 타기를 일상화하면서
                    <br/>
                    같이 탄소배출을 줄여 보면 어떨까요?
                  </p>

                  <br/>
                  
                  <p className='text1'>탄소배출을 줄일 수 있는 방법</p>
    
                  <p className='text2'>
                  국제학술지 (환경연구회보)(Environment Research Letters)에 게재된
                  논문에서 연구팀은 자동차를 이용하지 않으면 
                  
                  한 사람이 {""} 
                  <span style={{
                      fontWeight: "bold"
                      }}>
                    연간 2.04톤CO₂eq
                  </span>
                  을 줄일 수 있다고 분석결과를 도출했습니다. 
                  <br/> 
          
                  </p>
                  <p className='text2'>
                  논문의 주저자는 {""}
                  <span style={{
                      fontWeight: "bold"
                      }}>탄소배출로 인한 환경오염이 지속되고 있다는 상황을 인식한다면
                  </span> {""}
                  이를 막기 위해서 사람들은 차량을 이용하는 대신
                  <br/> 
                  <span style={{
                      fontWeight: "bold"
                      }}>
                    대중교통 이용이나, 걷기, 자전거 타기
                  </span> 
                  등의 행동적 변화가 이루어질 수 있다’ 라고 말했습니다.
                  <br/>
                  <span 
                    style={{
                      fontWeight: "bold",
                      fontSize:"15px",
                      color: "#999999"
                      }}>
                    (환경연구회보)
                  </span>
                  </p>

                  <br/>
                  <br/>

                  <p className='text1'>자전거를 통해 탄소배출량 줄이기</p>
                  <p className='text2'> 네덜란드 국민들은 하루 평균 2.6㎞를 자전거로 이동할 만큼 자전거를 일상적으로 타고 있습니다.
                  <br/>
                  자전거를 교통수단으로 쓰는 생활방식이 전 세계적으로 확산될 경우
                  <br/> 
                  <span style={{
                      fontWeight: "bold"
                      }}>연간 탄소배출량이 약 6억8600만t 감소
                   </span>   
                  할 수 있다고 합니다
                  <br/>


                  

                  <br/>
                  </p>
                </div>
                
                <Row>
                  <Col>
                    <div className='chartDeliver2'>
                      <CarbonChart4 />
                    </div>
                    <div className='chartDeliver2'>
                      <img src={Bike_introduce} 
                      style={{
                        width: "250px",
                        marginLeft: "120px"
                        }}/>
                    </div>
                  </Col>
                </Row>
              </div>  
          </TabPanel>
  
      </Box>
    </Container>
    </>
    ); 
}
