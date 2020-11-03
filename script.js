"use strict";
// ● ⭐⚡😀🦄👻👽🍉🍒🌈🔥


// 🦄36 장바구니 기능 완성하기 - 일단 지나쳤던 코딩 마무리
// →→ 캡쳐 확인
// →→ index.js
// →→ Detail35.js
// →→ Cart36.js

// ⚡(1) 메인페이지의 <Card>를 클릭, 상세페이지 이동시키자
// 이거 어떻게 합니까. 그냥 router 시간에 배웠던거 활용하면 되겠죠?
// history.push(‘/detail’) 이런거 쓰면 페이지 이동된다고 했으니

// 1. <Card> 써있는 곳에다가 onClick 일 때 저거 동작시키면 되겠네요? - 안됨
// 왜냐면 <컴포넌트>는 div가 아니라 JS이라서, onClick 속성을 달아도 동작안됨

// 2. 그냥 <Card> 컴포넌트를 정의한 곳으로 가서 div에 직접 onClick을 사용.

// 3. 근데 지금은 모든 <Card> 컴포넌트를 클릭하면 /detail/0 으로 이동시키라고 하드코딩 해놨는데

// 4. 이걸 약간 동적으로 바꾸면.. /detail 뒷부분에 props.shoes.id를 더했습니다.
// Card 컴포넌트에서 쓰는 props 중에 shoes라는 이름의 props, 거기에 저장된 id 항목을 더해주세요
// 정해진 id따라서 페이지 이동

// 현재 사용중인 3개의 <Card>에 보내지는 props.shoes.id는 각각 0,1,2 이런 식으로 될테니
// 그럼 이제 각각 /detail/0, /detail/1 이렇게 다른 페이지로 이동시켜주겠군요.
// ⭐뭔말 하는지 모르겠으면 위의 코드해석하려하지말고, <Card>안에 있는 props부터 콘솔창에 출력해봅시다.

//(1) Apps.js

<Card36  onClick={}></Card36>  → ⊗

function Card(props){
  let history = useHistory();
  return(
    <div onClick={()=>{ history.push('/detail/'+ props.shoes.id) }}>gogo</div>
  )
}


// ⚡(2) 장바구니에 있는 + 버튼을 누르면 지금 맨 위의 첫째 상품의 수량만 ++ 되고 있습니다.
// 고쳐보도록 합시다. 
// redux를 사용하고 있다면 여러분이 고쳐야할 곳은 … 90% 확률로 reducer 내부입니다.

// (2)-1  Cart.js
// 버튼에서 dispatch할 때 {데이터 : a.id } 라는 오브젝트도 함께 전달되게 만들어놨습니다.
// a.id는 그냥 버튼 주변에 있던 상품의 id입니다. (전체코드는 영상 6:18 참고)

// (2)-1
<button onClick={ ()=>{ props.dispatch(type : '수량증가' , 데이터: a:id)} }> + </button>

// (2)-2 index.js
// 이제 보낸 데이터를 가지고 아까 하려던거 이거 
// copy[방금 누른 +버튼 옆의 상품번호].quan++
// 이렇게 reducer 내부를 수정해봅시다.

function reducer(state = 초기값, 액션){
  if (액션.type === '수량증가') {
    let copy = [...state];
// (2)-2
    copy[액션.데이터].quan++;
    return copy
  } }


//⚡(3). 주문하기버튼 누르면 진짜 페이지 내의 상품을 장바구니에 추가하기
//(3)-2 이제 주문하기를 누를 때 마다 , 찾은상품.id / 찾은상품.name이라는 실제 페이지내의 상품데이터가 redux store에 저장됩니다.

//(3)-2  Detail.js
<button onClick={()=>{ props.dispatch( {type:'항목추가',데이터:{id:찾은상품.1, name:찾은상품, quan:1}} )}}>주문하기</button>

//⚡(4). 같은 상품을 계속 주문하면 항목추가 X 수량증가 O
// “{액션.데이터}이거 안의 id를 기존 state에 있던 상품들의 id와 비교해서.. id가 같은게 이미 있다면 push() 하지말고 그 상품의 quan만 1 증가시켜주세요”

// (4)-2
// 특정 값이 array 안에 있는지 찾고 싶으면 자바스크립트 기본함수 중에 findIndex() 라는게 있습니다.
// state라는 array 자료에 액션.데이터에 있던 id가 있는지 찾고 싶으면
// let 몇번째있니 = state.findIndex( (a)=>{ return a.id === 액션.데이터.id } )
// a는 state 안에 있던 하나하나의 자료 {} 를 의미하고
// 이 자료안의 id를 === 액션.데이터.id와 비교하는겁니다.
// 그래서 맞는게 있으면 그게 몇번째인지를 이 자리에 남겨줍니다.
// (그 숫자를 변수에 저장해서 쓰시면 됩니다)

// (4)-3 “id가 이미 있으면 그거의 상품수량만 1 증가시켜주세요~” 라는 간단한 if/else 문. 

// index.js
let 초기값 =
[ {id : 0, name : '멋진신발', quan : 2}, 
{ id : 1, name : '멋진신발22', quan : 3 } ];

function reducer(state = 초기값, 액션){
if(액션.type ==="항목추가"){
// (4)-2
  let found = state.findIndex((a)=>{return a.id === 액션.데이터.id});
// (4)-3
  if(found >=0){
    let copy = [...state];
    copy[found].quan++;
    return copy

  }else{
    let copy = [...state];
copy.push(액션.데이터);
return copy

  }


}else if(){
  let copy = [...state];
  copy[액션.데이터].quan++;
  return copy
}else if(){
  let copy = [...state];
  copy[액션.데이터].quan--;
  return copy

}else{
  return state
}

}

// 🦄37.리액트에서 자주쓰는 if문 작성패턴 5개
// 1. 컴포넌트 안에서 쓰는 if/else

return () 안의 JSX 내에서는 사용 불가능합니다. 

function Component() {
  if ( true ) {
    return <p>참이면 보여줄 HTML</p>;
  } else {
    return null;
  }
} 

// (참고) 근데 이렇게 쓰시려면 else 생략이 가능합니다
// 깔끔한 코드를 위해 한번 생략해보십시오.

function Component() {
  if ( true ) {
    return <p>참이면 보여줄 HTML</p>;
  } 
  return null;
} 

//2. JSX안에서 쓰는 ternary operator 

function Component() {
  return (
    <div>
      {
        1 === 1
        ? <p>참이면 보여줄 HTML</p>
        : null
      }
    </div>
  )
} 

// 3. && 연산자로 if 역할 대신하기
// if문 쓰실 때 이런 경우가 많습니다.
// “만약에 이 변수가 참이면 <p></p>를 이 자리에 뱉고 참이 아니면 null 뱉고”
// 더 쉽게 축약할 수 있습니다. && 연산자를 쓰면 됩니다.

// 예제 두개는 동일한 역할을 합니다.
// “만약에 이 변수가 참이면 <p></p>를 이 자리에 뱉고, 참이 아니면 null 뱉고”

// (1)
function Component() {
  return (
    <div>
      {
        1 === 1
        ? <p>참이면 보여줄 HTML</p>
        : null
      }
    </div>
  )
} 

// (2)
function Component() {
  return (
    <div>
      {
        1 === 1 && <p>참이면 보여줄 HTML</p>
      }
    </div>
  )
}

// 4. switch / case 조건문
// 장점은 … if문 연달아쓸 때 코드가 약간 줄어들 수 있습니다. 괄호도 줄고요.
// 예제 두개는 동일한 역할을 합니다.

// (1)
function reducer(state, 액션){  
  if (액션.type === '수량증가'){
    return 수량증가된state
  } else if (액션.type === '수량감소'){
    return 수량감소된state
  } else {
    return state
  }
}

// (2)
// 1. switch(검사할변수명){} 이거부터 작성하고
// 2. 그 안에 case 검사할변수명이 이거랑 일치하냐 : 를 넣어줍니다. 이게 if문입니다. 
// 3. 그래서 이게 일치하면 case : 밑에 있는 코드를 실행해줍니다.
// 4. default : 는 그냥 맨 마지막에 쓰는 else문과 동일합니다.

function reducer(state, 액션){
    switch (액션.type) {
    case '수량증가' :
      return 수량증가된state;
    case '수량감소' : 
      return 수량감소된state;
    default : 
      return state
  }
}

// ???
// 5. 오브젝트 자료형을 응용한 enum

// 예를 들면 쇼핑몰에서 상품설명부분을 탭으로 만든다고 합시다.
// 탭안에는 뭐 경우에 따라서 상품정보 /배송정보 /환불약관 이런걸 보여줘야합니다.

// 그니까 현재 state가 info면 <p>상품정보</p>
// 현재 state가 shipping이면 <p>배송정보</p>

// 이런걸 보여주자는겁니다.
// state를 만들어놓고 if문으로 state를 검사하는 문법을 써야할 것 같지만
// 이번엔 if문이 아니라 자바스크립트 오브젝트자료형에 내가 보여주고 싶은 HTML을 다 담습니다.

function Component() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        { 
           info : <p>상품정보</p>,
           shipping : <p>배송관련</p>,
           refund : <p>환불약관</p>
        }[현재상태]
      }
    </div>
  )
} 

// ▲ 원래 JSX는 저렇게 오브젝트에 담든, 어레이에 담든 아무 상관없습니다.
// 암튼 이렇게 object 자료형으로 HTML을 다 정리해서 담은 다음
// 마지막에 object{} 뒤에 [] 대괄호를 붙여서 “key값이 현재상태인 자료를 뽑겠습니다” 라고 써놓는겁니다.
 
// 그럼 이제 현재상태라는 변수의 값에 따라서 원하는 HTML을 보여줄 수 있습니다. 
// 만약에 var 현재상태가 ‘info’면 info 항목에 저장된 <p>태그가 보여질 것이고
// 만약에 var 현재상태가 ‘refund’면 refund 항목에 저장된 <p>태그가 보여지겠죠? 

// 아주 간단하고 직관적인 if문이 완성되었습니다.
// 이제 if/else 몰라도 코딩이 가능하겠군요

var 탭UI = { 
  info : <p>상품정보</p>,
  shipping : <p>배송관련</p>,
  refund : <p>환불약관</p>
}

function Component() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        탭UI[현재상태]
      }
    </div>
  )
} 
// ▲ 뭔가 매우 깔끔해졌습니다.