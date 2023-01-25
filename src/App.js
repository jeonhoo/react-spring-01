
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Navbar, Container, Nav} from 'react-bootstrap'
import {createContext, lazy, useState,Suspense} from "react";
import date from "./data/Date";

import {Route, Routes, useNavigate} from "react-router-dom";

import About from "./pages/About";
import axios from "axios";
import Cart from "./pages/Cart";
import {useQuery} from "@tanstack/react-query";



// import Detail from "./pages/Detail";
// import Card from "./pages/Card";

const Detail = lazy(()=>import("./pages/Detail"));
const Card = lazy(()=>import("./pages/Card"));


// 외부라이브러리 npm install react-bootstrap bootstrap 설치함
// 외부라이브러리 npm install react-router-dom@6 설치함
// 외부라이브러리 npm install styled-components 설치함
// 외부라이브러리 npm install axios  설치함
// 외부라이브러리 npm install @reduxjs/toolkit react-redux 설치함 *toolkit* 최신
// 외부라이브러리 npm install @tanstack/react-query 설치함 *tanstack* 최신 -> ['작명'] []필요

export let Context1 = createContext()

function App() {

    let [shoes, setShoes] = useState(date);
    let [재고] = useState([10,11,12]);
    let navigate = useNavigate();

    let result = useQuery(['작명'],()=>{
        return axios.get('https://codingapple1.github.io/userdata.json')
            .then((a)=>{return a.data})
    })



  return (
    <div className="App">



        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
                <Nav className="me-auto">

                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/detail">detail</Nav.Link>
                    <Nav.Link onClick={()=>{navigate('/about')}} >about</Nav.Link>
                    <Nav.Link onClick={()=>{navigate('/cart')}} >cart</Nav.Link>
                    <Nav.Link onClick={()=>{navigate('/detail/0')}} >장바구니</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <div>
                        { result.isLoading && '로딩중' }
                        { result.error && '에러남' }
                        { result.data && result.data.name }
                    </div>



                </Nav>
            </Container>
        </Navbar>


        <Suspense fallback={<div>로딩중입니다.</div>}>
        <Routes>
            <Route path="/" element={
                <>
                    <div className="main-bg"></div>
                    <div className="container">
                        <div className="row">
                            {
                                shoes.map((a,i)=>{
                                    return(
                                        <Card shoes={shoes[i]} i={i} key={i}></Card>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button onClick={()=>{
                    axios.get("https://codingapple1.github.io/shop/data2.json")
                        .then(result =>{
                            let copy = [...shoes, ...result.data]
                            setShoes(copy);
                        })
                        .catch(()=>{console.log("데이터 요청실패")})

                    }}>더보기</button>
                </>
            }/>
            <Route path="/detail/:id" element={

                <Context1.Provider value={{재고,shoes}}>
                <Detail shoes={shoes} />
                </Context1.Provider>
                }/>
            <Route path="/*" element={<div>없는페이지에요</div>}/>
            <Route path="/about" element={<About/>}>
                <Route path="member" element={<div>맴버임</div>}/>
                <Route path="location" element={<div>location</div>}/>
            </Route>

            <Route path="/cart" element={<Cart/>}/>

        </Routes>
        </Suspense>


    </div>
  );
}





export default App;
