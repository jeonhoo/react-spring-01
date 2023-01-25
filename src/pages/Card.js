

function Card(props) {
    return(
        <div className="col-md-4">

            {/*<img src={process.env.PUBLIC_URL + '/shoes1.jpg'} width="80%"/>*/}
            <img src={'https://codingapple1.github.io/shop/shoes'+(props.i+1) +'.jpg'} width="80%"/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
            <p>{props.shoes.price}</p>

            <button className="btn btn-danger" >주문하기</button>

        </div>
    )
}

export default Card;