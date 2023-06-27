import React from 'react'
import { NavLink, Card, CardBody,  CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';


const Category = (props) => {
    const {category} = props
  return (
        <Card style={{ width: '12rem' ,margin:'10px'}}>
            <NavLink tag={Link} to={`categories/${category.url}`}>     
                    <img width={130} height={150} className='categoryImg' alt={category.name}    src={category.image}/>
                    <CardBody>
                        <CardTitle tag="h5">
                            {category.name}
                        </CardTitle>
                    </CardBody>
            </NavLink>
        </Card>
    )
}

export default Category