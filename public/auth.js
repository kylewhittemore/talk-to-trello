const auth = document.querySelector('#auth')
auth.onclick = () => {
    console.log('ready to auth');
    const url = 'https://trello.com/1/authorize?&return_url=http://127.0.0.1:8080&expiration=never&name=MyPersonalToken&scope=read,write&response_type=token&key=f71f1f010a54918a21bfb5a89743f01e'
    window.location.href = url
}

const url = window.location.href;
console.log(url)
if (url.indexOf('#token=') != -1) {
    let token = url.split('=')[1]
    console.log(token)
    localStorage.setItem('token', token)
}

