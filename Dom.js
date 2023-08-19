function ongetacall(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;


//Storing Data

    user = {
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time
    }
    let key = document.getElementById('email').value;
    let uesrJSON = JSON.stringify(user);
    localStorage.setItem(key,uesrJSON);
    
    axios.post('https://crudcrud.com/api/770b9ab235f74fbe972c53ad9299cb1d/appointmentData', user)
    .then(response => {
        showUserOnScreen(response.data)
        console.log(response)
    })
    .catch(err => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>"
        console.log(err);
    })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/770b9ab235f74fbe972c53ad9299cb1d/appointmentData')
    .then(response => {
        console.log(response)

        for(let i=0;i<response.data.length;i++){
            showUserOnScreen(response.data[i]);
        }
    })
    .catch(err => {
        console.log(err);
    })
})

//Show User On Screen Function
function showUserOnScreen(user){
    let parentElement = document.getElementById('listOfItems');
    let childElement = document.createElement('li');
    childElement.textContent = user.name+ '-' + user.email+ '-' + user.phone + '-' + user.date + '-' + user.time;
    
//Delete Button
    var deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.style.backgroundColor = 'orange';
    deleteBtn.value = 'Delete';

        //localStorage.removeItem(user.email);
       // parentElement.removeChild(childElement);
       deleteBtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/770b9ab235f74fbe972c53ad9299cb1d/appointmentData/${user._id}`)
            .then((response) => {
                removeUserFromScreen(user._id); // Pass user._id to the function
            })
            .catch((err) => {
                console.log(err)
            }) 
    }

    
//Edit Button
    var edit = document.createElement('input');
    edit.type = 'button';
    edit.style.backgroundColor = 'orange';
    edit.value = 'Edit';

    edit.onclick = () => {
        let edituser = JSON.parse(localStorage.getItem(user.email));
        document.getElementById('name').value=edituser.name;
        document.getElementById('email').value=edituser.email;
        document.getElementById('phone').value=edituser.phone;
        document.getElementById('time').value.edituser.time;
        document.getElementById('date').value.edituser.date;

        localStorage.removeItem(user.email);
        parentElement.removeChild(childElement);
        removeUserFromScreen(user._id);
    }

    childElement.appendChild(edit);
    childElement.appendChild(deleteBtn);
    childElement.id = user._id;
    parentElement.appendChild(childElement);
}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('listOfItems');
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}
