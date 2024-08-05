 import React, {useEffect, useState} from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import {setVisibilityFilter} from "src/store/apps/equipment/equipmentSlice.js";
import {useDispatch} from "react-redux";

 const EcoSidebar = () => {
     const dispatch = useDispatch();
    const [category , setCategory] = useState('');
    console.log('category',category)
    useEffect(() => {
        dispatch(setVisibilityFilter(category));
    }, [category]);
    const handleCategoryChange = (event) => {
        dispatch(setCategory(event.target.value));
    };
  return (
    <div className="p-4">
      <h5 className="mb-4">Category</h5>

        <FormGroup>
            <Label className="cursor-pointer">
                <Input type="radio" name="category" className="me-2" value="show_all" onChange={handleCategoryChange}  /> 전체
            </Label>
        </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="category" className="me-2" value="항공기정비장비" onChange={handleCategoryChange}/> 항공기정비장비
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="category" className="me-2" value="활주로및계류장유지보수장비" onChange={handleCategoryChange}/> 활주로및계류장유지보수장비
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="category" className="me-2" value="전기및전자장비" onChange={handleCategoryChange}/> 전기및전자장비
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="category" className="me-2" value="통신및네트워크장비" onChange={handleCategoryChange}/> 통신및네트워크장비
        </Label>
      </FormGroup>
        <FormGroup>
            <Label className="cursor-pointer">
                <Input type="radio" name="category" className="me-2" value="화재및안전장비" onChange={handleCategoryChange}/> 화재및안전장비
            </Label>
        </FormGroup>
        <FormGroup>
            <Label className="cursor-pointer">
                <Input type="radio" name="category" className="me-2" value="청소및환경관리장비" onChange={handleCategoryChange} /> 청소및환경관리장비
            </Label>
        </FormGroup>
        <FormGroup>
            <Label className="cursor-pointer">
                <Input type="radio" name="category" className="me-2" value="건설및건축장비" onChange={handleCategoryChange}/> 건설및건축장비
            </Label>
        </FormGroup>
        <FormGroup>
            <Label className="cursor-pointer">
                <Input type="radio" name="category" className="me-2" value="운송및물류장비" onChange={handleCategoryChange} /> 운송및물류장비
            </Label>
        </FormGroup>
      <br />
      <h5 className="mb-4">Sort By</h5>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio2" className="me-2"  /> Price Low- High
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio2" className="me-2" /> Price High - Low
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio2" className="me-2" /> Popular
        </Label>
      </FormGroup>
      <FormGroup>
        <Label className="cursor-pointer">
          <Input type="radio" name="radio2" className="me-2" /> Brand
        </Label>
      </FormGroup>
      <br />
      <h5 className="mb-4">Price Range</h5>
      <FormGroup>
        <Input id="exampleRange" name="range" type="range" />
      </FormGroup>
    </div>
  );
};

export default EcoSidebar;
