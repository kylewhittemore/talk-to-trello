const auth = document.querySelector('#auth')
auth.onclick = () => {
    console.log('ready to auth');
    const url = 'https://trello.com/1/authorize?&return_url=http://127.0.0.1:8080&expiration=never&name=MyPersonalToken&scope=read,write,account&response_type=token&key=f71f1f010a54918a21bfb5a89743f01e'
    //   axios.get(url).then(result => console.log(result))
    window.location.href = url
}

const url = window.location.href;
console.log(url)
if (url.indexOf('#token=') != -1) {
    let token = url.split('=')[1]
    console.log(token)
    axios.get(`https://api.trello.com/1/members/me/boards?fields=name,url&key=f71f1f010a54918a21bfb5a89743f01e&token=${token}`).then(response => console.log(response))
}