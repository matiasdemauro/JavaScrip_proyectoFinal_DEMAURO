
  




let buttonLogin = document.getElementById('login');
buttonLogin.addEventListener('click' , ()=> {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;
    console.log(email);
    console.log(pass);
    login(email,pass);
});

const login = async (email,pass) =>
{
    try
    {
        const response = await fetch('https://fakestoreapi.com/users/')
        const users = await response.json();
        //console.log('users from json:', users);
        let found = false;
        for (const user of users) 
        {
           if(email.toLowerCase() === user.email && pass=== user.password){
                 console.log('login correcto');
                 localStorage.setItem('user' , JSON.stringify(user));
                 found = true;
                 window.location.href = "products.html";
           }
           
        }
        if (!found) {
            Toastify({
                style: {
                    width: "200px",
                    background: "#000",
                    color: "white",
                },
                text: "Usuario inexistente, vuelva a intentar.",
                
                duration: 1000
                
                }).showToast();
          } 
        
    }
    catch(error) {
        console.log(error);
    }
}



