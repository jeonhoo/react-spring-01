import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changeAge, changeName} from "../data/userSlice";
import {addCount} from "../data/store";
import {memo, useState} from "react";


    let  Child = memo(function(){
    console.log('재랜더링안됨')
    return <div>자식입니다.</div>
    })


export default function Cart(){

    let state = useSelector((state)=>{return state})
    let dispatch = useDispatch()
    let [count, setCount] = useState(0)

    console.log('--------------------------------------------------------')

    return(
        <>
            <Child/>
            <button onClick={()=>{setCount(count+1)}}>+</button>
           <h6> {state.user.name} {state.user.age}의 장바구니 </h6>
            <button onClick={()=>{
                dispatch(changeAge(2))
            }}>버튼</button>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    state.cart.map((a,i)=>
                <tr key={i}>
                    <td>{state.cart[i].id}</td>
                    <td>{state.cart[i].name}</td>
                    <td>{state.cart[i].count}</td>
                    <td>
                        <button onClick={()=>{
                            dispatch(addCount(state.cart[i].id))
                        }}>+</button>
                    </td>
                </tr>
                    )
                }
                </tbody>
            </Table>
        </>
    )
}