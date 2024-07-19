import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Input, InputGroup, Label, FormGroup, Card, CardBody, CardTitle, Col } from "reactstrap";
import api from "../../store/apps/airplane/api";



const AirportDBUpdate = () => {

    const [rangeValue, setRangeValue] = useState(10);
    const [apiData, setapiData] = useState([]);
    const [buttonStatus, setbuttonStatus] = useState(true);
    console.log(apiData);
    const apiURI = import.meta.env.VITE_storeApi;
    console.log(apiURI)
    
        // api.post(`${apiURI}${rangeValue}`)
    
    
    const onClickHandler = () => {
        axios.get(`${apiURI}${rangeValue}`)
          .then(res=> res.data)
          .then(data => {
            setapiData(data.response.body.items)
            setbuttonStatus(false);
          })
          .catch(error => {
            alert('다시 시도해주세요')
            console.error('error : ', error)
          })
    }

    const onClickDB = () => {
        api.post('/api/v1/store/insertapi',apiData)
        .then(res => {
            alert('등록성공')
        })
        .catch(error => {
            console.error(error)
        })
    }

    return(
        <>
        <FormGroup>
      <Label for="rangeInput"> 불러올 데이터 개수: {rangeValue}</Label>
      <Input
        type="range"
        id="rangeInput"
        min={10}
        max={750}
        value={rangeValue}
        onChange={(e) => setRangeValue(e.target.value)}
      />
      <Col className="d-flex justify-content-center">
      <Button color="success" onClick={onClickHandler}>가져오기</Button>
      </Col>
    </FormGroup>
    <Col className="d-flex justify-content-center">
    <Button color="primary" disabled={buttonStatus} onClick={onClickDB}>DB에 저장하기</Button>
    </Col>
        </>
    )
}

export default AirportDBUpdate;