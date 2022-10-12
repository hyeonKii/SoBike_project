const userMock1 = {
    id: "abcde-1",
    email: "ktkim@elicer.com",
    name: "튜터",
    description: "안녕하세요!",
}
const userMock2 = {
    id: "abcde-12",
    email: "ironman@avengers.com",
    name: "아이언맨",
    description: "I, am, Ironman",
}
const userMock3 = {
    id: "abcde-123",
    email: "captain_america@avengers.com",
    name: "캡틴아메리카",
    description: "I can do this all day",
}
const userMock4 = {
    id: "abcde-1234",
    email: "thor@avengers.com",
    name: "토르",
    description: "Strongest Avenger",
}
const userMock5 = {
    id: "abcde-12345",
    email: "natasha@avengers.com",
    name: "나타샤",
    description: "Strongest Agent",
}

let userlist = [userMock1, userMock2, userMock3, userMock4, userMock5]

async function get(endpoint, params = "") {
  console.log(
    `%cGET 요청 ${"/" + endpoint + "/" + params}`,
    "color: #a25cd1;"
  );
  
  if (endpoint === "users") {
    const matchingUser = userlist.find(user => user.id === params)
    return {data: matchingUser}
  }
  
  
  if (endpoint === "userlist") {
    const data = userlist
    return {data}
  }

  return 
}

async function post(endpoint, data) {
 
  console.log(
    `%cPOST 요청 ${"/" + endpoint + "/"}, 데이터: ${JSON.stringify(data)}`,
    "color: blue;"
  );
  
  if (endpoint === "user/register") {
    const newUser = {...data}
    newUser.description = "설명이 없습니다. 설명을 추가해 주세요."
    const random = Math.random()
    newUser.id = `abcde-${random}`
    
    userlist.push(newUser)
    return {data: newUser}
  }
  
  if (endpoint === "user/login") {
    const matchingUser = userlist.find(user => user.email === data.email)
    matchingUser.token = "temp-token"
    console.dir(matchingUser)
    return {data: matchingUser}
  }
  
  return 
}

async function put(endpoint, data) {

  console.log(
    `%cPUT 요청 ${"/" + endpoint + "/"}, 데이터: ${JSON.stringify(data)}`,
    "color: green;"
  );

  const urlAndId = endpoint.split("/")
  const userId = urlAndId[1]
  data.id = userId
  userlist = userlist.filter(user => user.id !== userId)
  userlist.push(data)

  const response = {data}
  return response
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.put 로 쓸 수 있음.
export { get, post, put };