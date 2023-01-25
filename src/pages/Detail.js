
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import {Context1} from "../App";
import {useDispatch} from "react-redux";
import {addItem} from "../data/store";

 let YellowBtn = styled.button
    `
      background : ${ props => props.bg };
      color: ${ props => props.bg === 'blue'? 'white': 'black'};
      padding : 10px;
    `
  let Box = styled.div
    `
      background: grey;
      padding : 20px;
    `

export default function Detail(props){

    let {재고,shoes}=useContext(Context1)
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [탭, 탭변경] = useState(0);
    let dispatch = useDispatch()


    let {id} = useParams();
    let 찾은상품 = props.shoes.find((x) => x.id == id )


    useEffect(()=>{
        setTimeout(()=>{setAlert(false)},5000)
        console.log("1")
    },[])


    return (
        <div className="container">
            { alert === true?
                <div className="alert alert-warning">
                    <p>2초이내 구매시 할인</p>
                </div>
                :null
            }
            {count}
            <button onClick={()=>{setCount(count+1)}}>버튼</button>

            <Box>
            <YellowBtn bg="blue">버튼</YellowBtn>
            <YellowBtn bg="orange">버튼</YellowBtn>
            </Box>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt="" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger"onClick={()=>{
                        dispatch(addItem({id : 1, name : 'Red Knit', count : 1}))
                    }}>주문하기</button>

                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{탭변경(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent shoes={props.shoes} 탭={탭}/>

        </div>
    )
}

function TabContent({탭,shoes}) {

    let {재고}=useContext(Context1)

     let [fade, setFade] = useState("")

     useEffect(()=>{
         setTimeout(()=>{setFade('end')},10)
         return ()=>{
             setFade('')
         }
     },[탭])

     return (<div className={"start "+ fade}>
            {[
            <div>{shoes[0].title}</div>,
            <div>{재고[0]}</div>,
            <div>내용2</div>
            ][탭]}
            </div>)
}